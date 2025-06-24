/**
 * API Interceptor Hook - Automatically tracks all API calls and performance
 * Features: Request/response interception, duration tracking, error capture
 * File size: ~250 lines | Lightweight interceptor with minimal overhead
 */

import { useEffect, useRef } from 'react';
import { addApiHit, updateApiHit, addError } from './useMonitoringStore';

interface OriginalFetch {
  (input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
}

interface OriginalXMLHttpRequest {
  new(): XMLHttpRequest;
}

// Track if interceptor is already installed
let isInterceptorInstalled = false;

export function useApiInterceptor() {
  const originalFetch = useRef<OriginalFetch | null>(null);
  const originalXHR = useRef<OriginalXMLHttpRequest | null>(null);

  useEffect(() => {
    // Only install interceptor once globally
    if (isInterceptorInstalled || typeof window === 'undefined') {
      return;
    }

    installFetchInterceptor();
    installXHRInterceptor();
    isInterceptorInstalled = true;

    return () => {
      // Don't uninstall on cleanup to maintain global monitoring
      // Uninstallation only happens on page unload
    };
  }, []);

  // Fetch API interceptor
  function installFetchInterceptor() {
    if (!window.fetch) return;

    originalFetch.current = window.fetch;
    
    window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
      const startTime = Date.now();
      const url = typeof input === 'string' ? input : input.toString();
      const method = init?.method || 'GET';

      // Only track meaningful API requests
      let requestId: string | null = null;
      if (shouldTrackRequest(url)) {
        requestId = addApiHit({
          url,
          method,
          source: determineSource(url)
        });
      }

      try {
        const response = await originalFetch.current!(input, init);
        const duration = Date.now() - startTime;

        // Update with response details only if we tracked this request
        if (requestId) {
          updateApiHit(requestId, {
            status: response.status,
            duration,
            error: response.ok ? undefined : `HTTP ${response.status}`
          });
        }

        return response;
      } catch (error) {
        const duration = Date.now() - startTime;
        const errorMessage = error instanceof Error ? error.message : 'Network error';

        // Update with error details only if we tracked this request
        if (requestId) {
          updateApiHit(requestId, {
            duration,
            error: errorMessage
          });

          // Log error to monitoring
          addError(`Fetch error: ${method} ${url} - ${errorMessage}`);
        }

        throw error;
      }
    };
  }

  // XMLHttpRequest interceptor
  function installXHRInterceptor() {
    if (!window.XMLHttpRequest) return;

    originalXHR.current = window.XMLHttpRequest;

    window.XMLHttpRequest = function() {
      const xhr = new originalXHR.current!();
      let startTime: number;
      let url: string;
      let method: string;
      let requestId: string | null = null;

      // Intercept open method
      const originalOpen = xhr.open;
      xhr.open = function(methodArg: string, urlArg: string | URL, ...args: any[]) {
        method = methodArg;
        url = urlArg.toString();
        return originalOpen.apply(this, [methodArg, urlArg, ...args]);
      };

      // Intercept send method
      const originalSend = xhr.send;
      xhr.send = function(...args: any[]) {
        startTime = Date.now();
        
        // Only track meaningful API requests
        if (shouldTrackRequest(url)) {
          requestId = addApiHit({
            url,
            method,
            source: determineSource(url)
          });
        }

        return originalSend.apply(this, args);
      };

      // Track response
      xhr.addEventListener('loadend', () => {
        const duration = Date.now() - startTime;
        
        // Only update if we tracked this request
        if (requestId) {
          updateApiHit(requestId, {
            status: xhr.status,
            duration,
            error: xhr.status >= 400 ? `HTTP ${xhr.status}` : undefined
          });

          if (xhr.status >= 400) {
            addError(`XHR error: ${method} ${url} - HTTP ${xhr.status}`);
          }
        }
      });

      // Track errors
      xhr.addEventListener('error', () => {
        const duration = Date.now() - startTime;
        const errorMessage = 'Network error';

        // Only update if we tracked this request
        if (requestId) {
          updateApiHit(requestId, {
            duration,
            error: errorMessage
          });

          addError(`XHR error: ${method} ${url} - ${errorMessage}`);
        }
      });

      return xhr;
    };

    // Copy static properties
    Object.setPrototypeOf(window.XMLHttpRequest, originalXHR.current);
    Object.getOwnPropertyNames(originalXHR.current).forEach(prop => {
      if (prop !== 'prototype' && prop !== 'name' && prop !== 'length') {
        try {
          (window.XMLHttpRequest as any)[prop] = (originalXHR.current as any)[prop];
        } catch (e) {
          // Ignore read-only properties
        }
      }
    });
  }

  // Helper functions
  function determineSource(url: string): 'supabase' | 'external' | 'internal' {
    if (url.includes('supabase.co')) return 'supabase';
    if (url.startsWith('http://localhost') || url.startsWith('http://127.0.0.1')) return 'internal';
    return 'external';
  }

  // Filter out noise - only track meaningful API requests
  function shouldTrackRequest(url: string): boolean {
    return (
      // Track Supabase API calls (actual database queries)
      url.includes('supabase.co/rest/v1/') ||
      // Track Supabase Edge Functions
      url.includes('supabase.co/functions/v1/') ||
      // Track internal API endpoints only
      (url.includes('/api/') && !url.includes('/api/health'))
    ) && (
      // Exclude all static assets and external resources
      !url.includes('chrome-extension://') &&
      !url.includes('webpack') &&
      !url.includes('.hot-update.') &&
      !url.includes('sockjs-node') &&
      !url.includes('__vite') &&
      !url.includes('.map') &&
      !url.endsWith('.js') &&
      !url.endsWith('.css') &&
      !url.endsWith('.png') &&
      !url.endsWith('.jpg') &&
      !url.endsWith('.jpeg') &&
      !url.endsWith('.gif') &&
      !url.endsWith('.webp') &&
      !url.endsWith('.svg') &&
      !url.endsWith('.ico') &&
      !url.endsWith('.woff') &&
      !url.endsWith('.woff2') &&
      !url.endsWith('.ttf') &&
      !url.includes('devtools') &&
      !url.includes('unsplash.com') &&
      !url.includes('images.unsplash.com') &&
      !url.includes('cdn.') &&
      !url.includes('fonts.') &&
      !url.includes('google') &&
      !url.includes('gstatic') &&
      !url.includes('facebook.com') &&
      !url.includes('instagram.com') &&
      !url.includes('youtube.com') &&
      !url.includes('twitter.com')
    );
  }


  return {
    isInstalled: isInterceptorInstalled,
    uninstall: () => {
      if (originalFetch.current) {
        window.fetch = originalFetch.current;
      }
      if (originalXHR.current) {
        window.XMLHttpRequest = originalXHR.current;
      }
      isInterceptorInstalled = false;
    }
  };
}

// Console error interceptor
export function installConsoleInterceptor() {
  const originalError = console.error;
  const originalWarn = console.warn;

  console.error = (...args: any[]) => {
    const message = args.map(arg => 
      typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
    ).join(' ');
    
    addError(`Console Error: ${message}`);
    originalError.apply(console, args);
  };

  console.warn = (...args: any[]) => {
    const message = args.map(arg => 
      typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
    ).join(' ');
    
    // Only log warnings that might indicate problems
    if (message.includes('Warning') || message.includes('deprecated') || message.includes('failed')) {
      addError(`Console Warning: ${message}`);
    }
    
    originalWarn.apply(console, args);
  };

  return () => {
    console.error = originalError;
    console.warn = originalWarn;
  };
}

// Window error interceptor
export function installWindowErrorInterceptor() {
  const errorHandler = (event: ErrorEvent) => {
    addError(`Window Error: ${event.message} at ${event.filename}:${event.lineno}`);
  };

  const unhandledRejectionHandler = (event: PromiseRejectionEvent) => {
    addError(`Unhandled Promise Rejection: ${event.reason}`);
  };

  window.addEventListener('error', errorHandler);
  window.addEventListener('unhandledrejection', unhandledRejectionHandler);

  return () => {
    window.removeEventListener('error', errorHandler);
    window.removeEventListener('unhandledrejection', unhandledRejectionHandler);
  };
}

// Auto-install all interceptors
export function installAllInterceptors() {
  if (typeof window === 'undefined') return () => {};

  const cleanupConsole = installConsoleInterceptor();
  const cleanupWindow = installWindowErrorInterceptor();

  return () => {
    cleanupConsole();
    cleanupWindow();
  };
}