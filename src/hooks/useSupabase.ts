/**
 * Supabase Integration Hooks
 * Custom React hooks for type-safe database operations
 * Designed for optimal performance and error handling
 */

import { useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js';
import { Database, HotelWithRelations, HotelFilters, MediaFilters } from '@/types/supabase';
import { Hotel } from '@/types/hotel';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are available
if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️ Supabase environment variables not found. Some features may not work.');
  console.warn('Please create a .env.local file with your Supabase credentials.');
  console.warn('See .env.example for reference.');
}

export const supabase = supabaseUrl && supabaseKey 
  ? createClient<Database>(supabaseUrl, supabaseKey)
  : null;

// React Query wrapper for Supabase queries - eliminates infinite loops
export function useSupabaseQuery<T>(
  queryKey: (string | number | boolean | object)[],
  queryFn: () => Promise<T>,
  options: {
    enabled?: boolean;
    staleTime?: number;
    gcTime?: number;
    refetchOnMount?: boolean;
  } = {}
) {
  const { enabled = true, staleTime = 5 * 60 * 1000, gcTime = 10 * 60 * 1000, refetchOnMount = false } = options;

  const query = useQuery({
    queryKey,
    queryFn: async () => {
      if (!supabase) {
        throw new Error('Supabase not configured. Please check environment variables.');
      }
      return await queryFn();
    },
    enabled: enabled && !!supabase,
    staleTime,
    gcTime,
    refetchOnMount,
    retry: (failureCount, error: any) => {
      if (error?.status === 404 || error?.status === 401) return false;
      return failureCount < 2;
    }
  });

  return {
    data: query.data || null,
    loading: query.isLoading,
    error: query.error ? (query.error instanceof Error ? query.error.message : 'An error occurred') : null,
    refetch: query.refetch
  };
}

// Hook for fetching a single hotel with all relations
export function useHotel(slug: string) {
  const queryFn = useCallback(async (): Promise<HotelWithRelations | null> => {
    if (!supabase) {
      throw new Error('Supabase not configured. Please check environment variables.');
    }
    
    const { data, error } = await supabase
      .from('hotels')
      .select(`
        *,
        brand:brands(*),
        location:locations(*),
        featured_image:media!hotels_featured_image_id_fkey(*),
        images:hotel_media(
          media_type,
          sort_order,
          is_primary,
          media:media(*)
        ),
        amenities:hotel_amenities(
          custom_description,
          sort_order,
          amenity:amenities(*)
        ),
        rooms(*),
        dining(*),
        features:hotel_features(feature_name, sort_order),
        policies:hotel_policies(*)
      `)
      .eq('slug', slug)
      .eq('is_active', true)
      .maybeSingle();

    if (error) throw error;
    return data;
  }, [slug]);

  return useSupabaseQuery(['hotel', slug], queryFn, { enabled: !!slug });
}

// Hook for fetching multiple hotels with filters
export function useHotels(filters: HotelFilters = {}) {
  const queryFn = useCallback(async (): Promise<HotelWithRelations[]> => {
    let query = supabase
      .from('hotels')
      .select(`
        *,
        brand:brands(*),
        location:locations(*),
        featured_image:media!hotels_featured_image_id_fkey(*)
      `)
      .eq('is_active', true);

    if (filters.brand) {
      query = query.eq('brand.slug', filters.brand);
    }
    if (filters.location) {
      query = query.eq('location.slug', filters.location);
    }
    if (filters.featured !== undefined) {
      query = query.eq('is_featured', filters.featured);
    }

    query = query.order('sort_order', { ascending: true });

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }, [filters]);

  return useSupabaseQuery(['hotels', filters], queryFn);
}

// Hook for fetching hotel media/images
export function useHotelMedia(hotelId: string, filters: MediaFilters = {}, options: { enabled?: boolean } = {}) {
  const queryFn = useCallback(async () => {
    if (!supabase) {
      throw new Error('Supabase not configured. Please check environment variables.');
    }
    
    let query = supabase
      .from('hotel_media')
      .select(`
        media_type,
        sort_order,
        is_primary,
        media:media(*)
      `)
      .eq('hotel_id', hotelId);

    if (filters.media_type) {
      query = query.eq('media_type', filters.media_type);
    }

    query = query.order('sort_order', { ascending: true });

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }, [hotelId, filters]);

  return useSupabaseQuery(['hotel-media', hotelId, filters], queryFn, {
    enabled: options.enabled !== undefined ? (options.enabled && !!hotelId) : !!hotelId,
    staleTime: 10 * 60 * 1000 // Media queries cached for 10 minutes
  });
}

// Hook for fetching brands
export function useBrands() {
  const queryFn = useCallback(async () => {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return data || [];
  }, []);

  return useSupabaseQuery(['brands'], queryFn, {
    staleTime: 30 * 60 * 1000 // Brands rarely change, cache for 30 minutes
  });
}

// Hook for fetching locations
export function useLocations() {
  const queryFn = useCallback(async () => {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data || [];
  }, []);

  return useSupabaseQuery(['locations'], queryFn, {
    staleTime: 30 * 60 * 1000 // Locations rarely change, cache for 30 minutes  
  });
}

// Utility function to convert Supabase hotel data to legacy Hotel interface
export function transformHotelData(supabaseHotel: HotelWithRelations): Hotel {
  return {
    id: supabaseHotel.slug, // Use slug as ID for backward compatibility
    name: supabaseHotel.name,
    brand: supabaseHotel.brand?.slug || '',
    location: supabaseHotel.location?.slug || '',
    slug: supabaseHotel.slug,
    description: supabaseHotel.description || '',
    images: supabaseHotel.images?.map(img => img.media.public_url) || [],
    rating: supabaseHotel.rating,
    address: {
      street: supabaseHotel.street || '',
      city: supabaseHotel.city || '',
      state: supabaseHotel.state || '',
      country: 'India', // Default
      postalCode: supabaseHotel.postal_code || '',
      coordinates: {
        lat: supabaseHotel.latitude || 0,
        lng: supabaseHotel.longitude || 0,
      },
    },
    contact: {
      phone: supabaseHotel.phone || '',
      email: supabaseHotel.email || '',
    },
    amenities: supabaseHotel.amenities?.map(ha => ({
      id: ha.amenity.id,
      name: ha.amenity.name,
      description: ha.custom_description || ha.amenity.description || '',
      icon: ha.amenity.icon_name || '',
    })) || [],
    rooms: supabaseHotel.rooms?.map(room => ({
      id: room.id,
      name: room.name,
      description: room.description || '',
      size: room.size_display || '',
      maxOccupancy: room.max_occupancy || 2,
      bedType: room.bed_type || '',
      images: [], // Would need additional query for room images
      amenities: [], // Would need additional query for room amenities
      price: {
        currency: 'INR',
        amount: room.price_inr || 0,
      },
    })) || [],
    dining: supabaseHotel.dining?.map(dining => ({
      id: dining.id,
      name: dining.name,
      description: dining.description || '',
      cuisine: dining.cuisine || '',
      hours: dining.hours || '',
      dress: dining.dress_code || '',
      image: '', // Would need to resolve image_id
    })) || [],
    features: supabaseHotel.features?.map(f => f.feature_name) || [],
    policies: {
      checkIn: supabaseHotel.policies?.check_in || '2:00 PM',
      checkOut: supabaseHotel.policies?.check_out || '12:00 PM',
      cancellation: supabaseHotel.policies?.cancellation || '24 hours before arrival',
      pets: supabaseHotel.policies?.pets || 'Not allowed',
    },
  };
}

// Image URL utility functions
export function getImageUrl(supabasePath: string): string {
  return `${supabaseUrl}/storage/v1/object/public/${supabasePath}`;
}

export function getOptimizedImageUrl(
  supabasePath: string,
  options: { width?: number; height?: number; quality?: number } = {}
): string {
  const baseUrl = getImageUrl(supabasePath);
  const params = new URLSearchParams();
  
  if (options.width) params.append('width', options.width.toString());
  if (options.height) params.append('height', options.height.toString());
  if (options.quality) params.append('quality', options.quality.toString());
  
  return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
}

export default supabase;