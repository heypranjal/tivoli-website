/**
 * Fixed Hotel Hooks - Direct Supabase Implementation with Static Fallback
 * Temporary fix to bypass service layer issues
 */

import { useQuery } from '@tanstack/react-query'
import { createClient } from '@supabase/supabase-js'

// Use centralized Supabase client from environment variables
import { supabase } from './useSupabase'
// Import static hotel data as fallback
import hotels from '@/data/hotels'

// Fallback for when Supabase is not configured
const createFallbackClient = () => null

// Static brand data for fallback
const staticBrands = [
  { slug: 'tivoli', display_name: 'THE TIVOLI', is_active: true, sort_order: 1 },
  { slug: 'omnia', display_name: 'OMNIA BY TIVOLI', is_active: true, sort_order: 2 },
  { slug: 'wedcation', display_name: 'WEDCATION BY TIVOLI', is_active: true, sort_order: 3 },
  { slug: 'upper-hse', display_name: 'THE UPPER HSE BY TIVOLI', is_active: true, sort_order: 4 }
]

// Helper function to get brand display name
const getBrandDisplayName = (brandSlug: string) => {
  const brandMap: Record<string, string> = {
    'tivoli': 'THE TIVOLI',
    'omnia': 'OMNIA BY TIVOLI',
    'wedcation': 'WEDCATION BY TIVOLI',
    'upper-hse': 'THE UPPER HSE BY TIVOLI'
  }
  return brandMap[brandSlug] || brandSlug.toUpperCase()
}

/**
 * Get all brands for tabs
 */
export function useBrands() {
  return useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      try {
        // Return static brands if Supabase not configured
        if (!supabase) {
          console.warn('Supabase not configured, using static brands');
          return staticBrands;
        }

        const { data: brands, error } = await supabase
          .from('brands')
          .select('*')
          .eq('is_active', true)
          .order('sort_order')
        
        if (error) {
          throw error
        }
        
        return brands || []
      } catch (error) {
        console.error('Brands query failed, using static fallback:', error);
        // Return static brands as fallback
        return staticBrands;
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000,
    retry: (failureCount, error) => {
      // Don't retry network errors excessively
      if (error?.message?.includes('fetch') || error?.message?.includes('network')) {
        return false;
      }
      return failureCount < 1; // Limit retries for brands
    },
  })
}

/**
 * Get hotels by brand for filtering
 */
export function useHotelsByBrand(brandSlug?: string) {
  return useQuery({
    queryKey: ['hotels', { brand: brandSlug }],
    queryFn: async () => {
      // Add timeout and circuit breaker for stability
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      try {
        // Return static data if Supabase not configured
        if (!supabase) {
          console.warn('Supabase not configured, using static fallback');
          const staticVenues = hotels
            .filter(hotel => !brandSlug || brandSlug === 'all' || hotel.brand === brandSlug)
            .map(hotel => ({
              id: hotel.slug,
              name: hotel.name,
              location: hotel.address?.city || 'India',
              brand: hotel.brand,
              brandName: getBrandDisplayName(hotel.brand),
              image: hotel.images?.[0] || '',
              href: `/hotel/${hotel.slug}`
            }));
          
          return staticVenues;
        }
      // First get the brand ID if we have a brandSlug
      let brandId = null;
      if (brandSlug && brandSlug !== 'all') {
        const { data: brand } = await supabase
          .from('brands')
          .select('id')
          .eq('slug', brandSlug)
          .single()
        
        brandId = brand?.id
      }
      
      let query = supabase
        .from('hotels')
        .select(`
          *,
          brand:brands(*),
          location:locations(*),
          featured_image:media(*),
          images:hotel_media(
            media_type,
            sort_order,
            is_primary,
            media:media(*)
          )
        `)
        .eq('is_active', true)
        .eq('is_featured', true)
        .order('sort_order')
      
      // Filter by brand if specified
      if (brandId) {
        query = query.eq('brand_id', brandId)
      }
      
      const { data: hotels, error } = await query
      
      if (error) {
        throw error
      }
      
      // Transform data safely
      const venues = hotels?.map(hotel => ({
        id: hotel.slug,
        name: hotel.name,
        location: hotel.location?.name || hotel.city || 'India',
        brand: hotel.brand?.slug || 'unknown',
        brandName: hotel.brand?.display_name || 'Unknown',
        image: hotel.featured_image?.public_url || hotel.images?.[0]?.media?.public_url || '',
        href: `/hotel/${hotel.slug}`
      })) || []
      
      return venues
      } catch (error) {
        clearTimeout(timeoutId);
        console.error('Hotel query failed, using static fallback:', error);
        
        // Return static hotels as fallback, filtered by brand
        const staticVenues = hotels
          .filter(hotel => !brandSlug || brandSlug === 'all' || hotel.brand === brandSlug)
          .map(hotel => ({
            id: hotel.slug,
            name: hotel.name,
            location: hotel.address?.city || 'India',
            brand: hotel.brand,
            brandName: getBrandDisplayName(hotel.brand),
            image: hotel.images?.[0] || '',
            href: `/hotel/${hotel.slug}`
          }));
        
        return staticVenues;
      } finally {
        clearTimeout(timeoutId);
      }
    },
    enabled: !!brandSlug,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: (failureCount, error) => {
      // Don't retry if it's a timeout or abort error
      if (error?.name === 'AbortError' || error?.message?.includes('timeout')) {
        return false;
      }
      return failureCount < 2; // Limit retries
    },
  })
}

/**
 * Get featured hotels directly from Supabase
 */
export function useHotelsForFeaturedVenuesFixed() {
  return useQuery({
    queryKey: ['hotels', { featured: true }],
    queryFn: async () => {
      // Add timeout and circuit breaker for stability
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      try {
        // Return empty array if Supabase not configured
        if (!supabase) {
          console.warn('Supabase not configured, returning empty array');
          return [];
        }

        const { data: hotels, error } = await supabase
          .from('hotels')
          .select(`
            *,
            brand:brands(*),
            location:locations(*),
            featured_image:media(*),
            images:hotel_media(
              media_type,
              sort_order,
              is_primary,
              media:media(*)
            )
          `)
          .eq('is_active', true)
          .eq('is_featured', true)
          .order('sort_order')
        
        if (error) {
          throw error
        }
        
        // Transform data safely
        const featuredVenues = hotels?.map(hotel => ({
          id: hotel.slug,
          name: hotel.name,
          location: hotel.location?.name || hotel.city || 'India',
          brand: hotel.brand?.slug || 'unknown',
          image: hotel.featured_image?.public_url || hotel.images?.[0]?.media?.public_url || '',
          href: `/hotel/${hotel.slug}`
        })) || []
        
        return featuredVenues
      } catch (error) {
        clearTimeout(timeoutId);
        console.error('Featured venues query failed:', error);
        
        // Return empty array instead of throwing to prevent crashes
        return [];
      } finally {
        clearTimeout(timeoutId);
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000,
    retry: (failureCount, error) => {
      // Don't retry if it's a timeout or abort error
      if (error?.name === 'AbortError' || error?.message?.includes('timeout')) {
        return false;
      }
      return failureCount < 2; // Limit retries
    },
  })
}