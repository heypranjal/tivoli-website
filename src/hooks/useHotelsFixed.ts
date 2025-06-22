/**
 * Fixed Hotel Hooks - Direct Supabase Implementation
 * Temporary fix to bypass service layer issues
 */

import { useQuery } from '@tanstack/react-query'
import { createClient } from '@supabase/supabase-js'

// Direct Supabase client (bypassing the service layer temporarily)
const supabase = createClient(
  'https://sivirxabbuldqkckjwmu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpdmlyeGFiYnVsZHFrY2tqd211Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyMzk1NTcsImV4cCI6MjA2NTgxNTU1N30.gOX_CiexVuZsdrV8GqpAiO0qKtGev1cNIFZRwXjc1q4'
)

/**
 * Get all brands for tabs
 */
export function useBrands() {
  return useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      const { data: brands, error } = await supabase
        .from('brands')
        .select('*')
        .eq('is_active', true)
        .order('sort_order')
      
      if (error) {
        throw error
      }
      
      return brands || []
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000,
  })
}

/**
 * Get hotels by brand for filtering
 */
export function useHotelsByBrand(brandSlug?: string) {
  return useQuery({
    queryKey: ['hotels', { brand: brandSlug }],
    queryFn: async () => {
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
    },
    enabled: !!brandSlug,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

/**
 * Get featured hotels directly from Supabase
 */
export function useHotelsForFeaturedVenuesFixed() {
  return useQuery({
    queryKey: ['hotels', { featured: true }],
    queryFn: async () => {
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
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000,
  })
}