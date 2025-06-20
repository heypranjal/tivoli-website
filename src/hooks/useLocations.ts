/**
 * Location Hooks
 * Phase 1: Foundation Setup
 * Created: 2025-06-20
 * 
 * React Query hooks for location data management
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { locationService } from '@/lib/supabase-services'
import type { Database } from '@/types/supabase'

type Location = Database['public']['Tables']['locations']['Row']
type LocationInsert = Database['public']['Tables']['locations']['Insert']

/**
 * Get all active locations
 */
export function useLocations() {
  return useQuery({
    queryKey: ['locations'],
    queryFn: locationService.getAllLocations,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

/**
 * Get a single location by slug
 */
export function useLocation(slug: string) {
  return useQuery({
    queryKey: ['location', slug],
    queryFn: () => locationService.getLocationBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

/**
 * Create a new location (admin)
 */
export function useCreateLocation() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (location: LocationInsert) => locationService.createLocation(location),
    onSuccess: () => {
      // Invalidate and refetch locations
      queryClient.invalidateQueries({ queryKey: ['locations'] })
    },
  })
}

/**
 * Get locations formatted for navigation/filtering
 */
export function useLocationsForNavigation() {
  const { data: locations, ...rest } = useLocations()
  
  const navigationLocations = locations?.map(location => ({
    slug: location.slug,
    name: location.name,
    state: location.state,
    href: `/locations/${location.slug}`,
    displayName: location.state ? `${location.name}, ${location.state}` : location.name
  })) || []

  return {
    data: navigationLocations,
    ...rest
  }
}

/**
 * Get location options for forms/selects
 */
export function useLocationOptions() {
  const { data: locations, ...rest } = useLocations()
  
  const options = locations?.map(location => ({
    value: location.slug,
    label: location.state ? `${location.name}, ${location.state}` : location.name,
    id: location.id
  })) || []

  return {
    data: options,
    ...rest
  }
}

/**
 * Get grouped locations by state
 */
export function useLocationsByState() {
  const { data: locations, ...rest } = useLocations()
  
  const groupedLocations = locations?.reduce((acc, location) => {
    const state = location.state || 'Other'
    if (!acc[state]) {
      acc[state] = []
    }
    acc[state].push(location)
    return acc
  }, {} as Record<string, Location[]>) || {}

  return {
    data: groupedLocations,
    ...rest
  }
}