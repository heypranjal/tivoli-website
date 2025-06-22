/**
 * Hotel Hooks
 * Phase 1: Foundation Setup
 * Created: 2025-06-20
 * 
 * React Query hooks for hotel data management
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { hotelService } from '@/lib/supabase-services'
import type { Database, HotelWithRelations, HotelFilters } from '@/types/supabase'

type Hotel = Database['public']['Tables']['hotels']['Row']
type HotelInsert = Database['public']['Tables']['hotels']['Insert']
type HotelUpdate = Database['public']['Tables']['hotels']['Update']

/**
 * Get hotels with optional filtering
 */
export function useHotels(filters?: HotelFilters) {
  return useQuery({
    queryKey: ['hotels', filters],
    queryFn: () => hotelService.getHotels(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  })
}

/**
 * Get a single hotel by slug with full relations
 */
export function useHotel(slug: string) {
  return useQuery({
    queryKey: ['hotel', slug],
    queryFn: () => hotelService.getHotelBySlug(slug),
    enabled: !!slug,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  })
}

/**
 * Get featured hotels for homepage
 */
export function useFeaturedHotels() {
  return useQuery({
    queryKey: ['hotels', { featured: true }],
    queryFn: hotelService.getFeaturedHotels,
    staleTime: 5 * 60 * 1000, // 5 minutes for featured content
    gcTime: 10 * 60 * 1000,
  })
}

/**
 * Get hotels by brand
 */
export function useHotelsByBrand(brandSlug: string) {
  return useQuery({
    queryKey: ['hotels', { brand: brandSlug }],
    queryFn: () => hotelService.getHotelsByBrand(brandSlug),
    enabled: !!brandSlug,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  })
}

/**
 * Get hotels by location
 */
export function useHotelsByLocation(locationSlug: string) {
  return useQuery({
    queryKey: ['hotels', { location: locationSlug }],
    queryFn: () => hotelService.getHotelsByLocation(locationSlug),
    enabled: !!locationSlug,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  })
}

/**
 * Create a new hotel (admin)
 */
export function useCreateHotel() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (hotel: HotelInsert) => hotelService.createHotel(hotel),
    onSuccess: () => {
      // Invalidate all hotel queries
      queryClient.invalidateQueries({ queryKey: ['hotels'] })
    },
  })
}

/**
 * Update a hotel (admin)
 */
export function useUpdateHotel() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: HotelUpdate }) => 
      hotelService.updateHotel(id, updates),
    onSuccess: (updatedHotel) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['hotels'] })
      queryClient.invalidateQueries({ queryKey: ['hotel', updatedHotel.slug] })
    },
  })
}

/**
 * Get hotels formatted for featured venues component
 */
export function useHotelsForFeaturedVenues() {
  const { data: hotels, ...rest } = useFeaturedHotels()
  
  const featuredVenues = hotels?.map(hotel => ({
    id: hotel.slug,
    name: hotel.name,
    location: hotel.location?.name || 'Unknown',
    brand: hotel.brand?.slug || 'unknown',
    image: hotel.featured_image?.public_url || hotel.images?.[0]?.media?.public_url || '',
    href: `/hotel/${hotel.slug}`
  })) || []

  return {
    data: featuredVenues,
    ...rest
  }
}

/**
 * Get hotels formatted for location page filtering
 */
export function useHotelsForLocationPage(filters?: HotelFilters) {
  const { data: hotels, ...rest } = useHotels(filters)
  
  const locationPageHotels = hotels?.map(hotel => ({
    id: hotel.id,
    slug: hotel.slug,
    name: hotel.name,
    location: hotel.location?.name || 'Unknown',
    brand: hotel.brand?.display_name || 'Unknown',
    brandSlug: hotel.brand?.slug || 'unknown',
    description: hotel.description || '',
    image: hotel.featured_image?.public_url || hotel.images?.[0]?.media?.public_url || '',
    href: `/hotel/${hotel.slug}`,
    rating: hotel.rating,
    isFeatured: hotel.is_featured
  })) || []

  return {
    data: locationPageHotels,
    ...rest
  }
}

/**
 * Get hotel statistics
 */
export function useHotelStats() {
  const { data: allHotels } = useHotels()
  
  if (!allHotels) {
    return {
      total: 0,
      featured: 0,
      byBrand: {},
      byLocation: {}
    }
  }

  const stats = {
    total: allHotels.length,
    featured: allHotels.filter(h => h.is_featured).length,
    byBrand: allHotels.reduce((acc, hotel) => {
      const brand = hotel.brand.display_name
      acc[brand] = (acc[brand] || 0) + 1
      return acc
    }, {} as Record<string, number>),
    byLocation: allHotels.reduce((acc, hotel) => {
      const location = hotel.location.name
      acc[location] = (acc[location] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  }

  return stats
}

/**
 * Search hotels
 */
export function useHotelSearch(query: string) {
  return useQuery({
    queryKey: ['hotels', 'search', query],
    queryFn: () => hotelService.searchHotels(query),
    enabled: query.length > 2, // Only search with 3+ characters
    staleTime: 1 * 60 * 1000, // 1 minute for search results
  })
}