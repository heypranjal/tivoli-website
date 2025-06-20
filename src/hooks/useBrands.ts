/**
 * Brand Hooks
 * Phase 1: Foundation Setup
 * Created: 2025-06-20
 * 
 * React Query hooks for brand data management
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { brandService } from '@/lib/supabase-services'
import type { Database } from '@/types/supabase'

type Brand = Database['public']['Tables']['brands']['Row']
type BrandInsert = Database['public']['Tables']['brands']['Insert']

/**
 * Get all active brands
 */
export function useBrands() {
  return useQuery({
    queryKey: ['brands'],
    queryFn: brandService.getAllBrands,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

/**
 * Get a single brand by slug
 */
export function useBrand(slug: string) {
  return useQuery({
    queryKey: ['brand', slug],
    queryFn: () => brandService.getBrandBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

/**
 * Create a new brand (admin)
 */
export function useCreateBrand() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (brand: BrandInsert) => brandService.createBrand(brand),
    onSuccess: () => {
      // Invalidate and refetch brands
      queryClient.invalidateQueries({ queryKey: ['brands'] })
    },
  })
}

/**
 * Get brands formatted for navigation menu
 */
export function useBrandsForNavigation() {
  const { data: brands, ...rest } = useBrands()
  
  const navigationBrands = brands?.map(brand => ({
    slug: brand.slug,
    name: brand.display_name,
    href: `/brands/${brand.slug}`,
    color: brand.brand_color
  })) || []

  return {
    data: navigationBrands,
    ...rest
  }
}

/**
 * Get brand options for forms/selects
 */
export function useBrandOptions() {
  const { data: brands, ...rest } = useBrands()
  
  const options = brands?.map(brand => ({
    value: brand.slug,
    label: brand.display_name,
    id: brand.id
  })) || []

  return {
    data: options,
    ...rest
  }
}