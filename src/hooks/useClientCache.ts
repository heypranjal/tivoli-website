/**
 * Client-Side Caching Hook
 * Implements sessionStorage and memory caching for API responses
 */

import { useState, useEffect, useCallback } from 'react';

interface CacheConfig {
  key: string;
  ttl?: number; // Time to live in milliseconds (default: 5 minutes)
  storage?: 'session' | 'memory'; // Storage type
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

// In-memory cache for faster access
const memoryCache = new Map<string, CacheEntry<any>>();

export function useClientCache<T>(config: CacheConfig) {
  const { key, ttl = 5 * 60 * 1000, storage = 'session' } = config;
  const [cachedData, setCachedData] = useState<T | null>(null);
  const [isLoadingFromCache, setIsLoadingFromCache] = useState(true);

  // Get data from cache
  const getFromCache = useCallback((): T | null => {
    try {
      if (storage === 'memory') {
        const entry = memoryCache.get(key);
        if (entry && Date.now() - entry.timestamp < entry.ttl) {
          return entry.data;
        }
        memoryCache.delete(key);
        return null;
      }

      // Session storage
      const cached = sessionStorage.getItem(key);
      if (cached) {
        const entry: CacheEntry<T> = JSON.parse(cached);
        if (Date.now() - entry.timestamp < entry.ttl) {
          return entry.data;
        }
        sessionStorage.removeItem(key);
      }
      return null;
    } catch (error) {
      console.warn(`Cache read error for ${key}:`, error);
      return null;
    }
  }, [key, storage, ttl]);

  // Set data to cache
  const setToCache = useCallback((data: T): void => {
    try {
      const entry: CacheEntry<T> = {
        data,
        timestamp: Date.now(),
        ttl
      };

      if (storage === 'memory') {
        memoryCache.set(key, entry);
        return;
      }

      // Session storage
      sessionStorage.setItem(key, JSON.stringify(entry));
    } catch (error) {
      console.warn(`Cache write error for ${key}:`, error);
    }
  }, [key, storage, ttl]);

  // Clear cache
  const clearCache = useCallback((): void => {
    try {
      if (storage === 'memory') {
        memoryCache.delete(key);
      } else {
        sessionStorage.removeItem(key);
      }
      setCachedData(null);
    } catch (error) {
      console.warn(`Cache clear error for ${key}:`, error);
    }
  }, [key, storage]);

  // Initialize cache on mount
  useEffect(() => {
    const cached = getFromCache();
    if (cached) {
      setCachedData(cached);
    }
    setIsLoadingFromCache(false);
  }, [getFromCache]);

  // Cache management functions
  const setData = useCallback((data: T) => {
    setCachedData(data);
    setToCache(data);
  }, [setToCache]);

  const hasCache = cachedData !== null;

  return {
    cachedData,
    setData,
    clearCache,
    hasCache,
    isLoadingFromCache
  };
}

/**
 * Enhanced version that combines caching with data fetching
 */
export function useCachedData<T>(
  fetchFn: () => Promise<T>,
  config: CacheConfig,
  dependencies: any[] = []
) {
  const { cachedData, setData, hasCache, isLoadingFromCache } = useClientCache<T>(config);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (forceRefresh = false) => {
    // Return cached data if available and not forcing refresh
    if (hasCache && !forceRefresh) {
      return cachedData!;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchFn();
      setData(data);
      setIsLoading(false);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      setIsLoading(false);
      
      // Return cached data as fallback if available
      if (hasCache) {
        return cachedData!;
      }
      throw err;
    }
  }, [fetchFn, hasCache, cachedData, setData]);

  // Auto-fetch on mount or dependency change
  useEffect(() => {
    if (!isLoadingFromCache) {
      fetchData();
    }
  }, [isLoadingFromCache, ...dependencies]);

  return {
    data: cachedData,
    isLoading: isLoadingFromCache || isLoading,
    error,
    refetch: fetchData,
    hasCache
  };
}

/**
 * Utility to prefetch and cache data
 */
export function prefetchAndCache<T>(
  fetchFn: () => Promise<T>,
  cacheKey: string,
  options: { ttl?: number; storage?: 'session' | 'memory' } = {}
) {
  const { ttl = 5 * 60 * 1000, storage = 'session' } = options;
  
  return fetchFn().then(data => {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl
    };

    try {
      if (storage === 'memory') {
        memoryCache.set(cacheKey, entry);
      } else {
        sessionStorage.setItem(cacheKey, JSON.stringify(entry));
      }
    } catch (error) {
      console.warn(`Prefetch cache error for ${cacheKey}:`, error);
    }

    return data;
  });
}