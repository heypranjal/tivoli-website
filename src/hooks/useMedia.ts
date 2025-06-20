/**
 * Media Hooks
 * Phase 1: Foundation Setup
 * Created: 2025-06-20
 * 
 * React Query hooks for media/image management
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { mediaService } from '@/lib/supabase-services'
import type { Database, MediaWithRelations } from '@/types/supabase'

type Media = Database['public']['Tables']['media']['Row']

/**
 * Get media for a specific hotel
 */
export function useHotelMedia(hotelId: string, mediaType?: string) {
  return useQuery({
    queryKey: ['media', 'hotel', hotelId, mediaType],
    queryFn: () => mediaService.getMediaByHotel(hotelId, mediaType),
    enabled: !!hotelId,
    staleTime: 5 * 60 * 1000, // 5 minutes for images
    gcTime: 10 * 60 * 1000,
  })
}

/**
 * Get hero images for a hotel
 */
export function useHotelHeroImages(hotelId: string) {
  return useHotelMedia(hotelId, 'hero')
}

/**
 * Get gallery images for a hotel
 */
export function useHotelGalleryImages(hotelId: string) {
  return useHotelMedia(hotelId, 'gallery')
}

/**
 * Get room images for a hotel
 */
export function useHotelRoomImages(hotelId: string) {
  return useHotelMedia(hotelId, 'room')
}

/**
 * Get dining images for a hotel
 */
export function useHotelDiningImages(hotelId: string) {
  return useHotelMedia(hotelId, 'dining')
}

/**
 * Upload media file (admin)
 */
export function useUploadMedia() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ file, path }: { file: File; path: string }) => 
      mediaService.uploadMedia(file, path),
    onSuccess: () => {
      // Invalidate media queries
      queryClient.invalidateQueries({ queryKey: ['media'] })
    },
  })
}

/**
 * Link media to hotel (admin)
 */
export function useLinkMediaToHotel() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ 
      mediaId, 
      hotelId, 
      mediaType, 
      sortOrder = 0 
    }: { 
      mediaId: string
      hotelId: string
      mediaType: string
      sortOrder?: number 
    }) => mediaService.linkMediaToHotel(mediaId, hotelId, mediaType, sortOrder),
    onSuccess: (_, variables) => {
      // Invalidate specific hotel media queries
      queryClient.invalidateQueries({ 
        queryKey: ['media', 'hotel', variables.hotelId] 
      })
    },
  })
}

/**
 * Upload and link media in one operation (admin)
 */
export function useUploadAndLinkMedia() {
  const uploadMutation = useUploadMedia()
  const linkMutation = useLinkMediaToHotel()
  
  return useMutation({
    mutationFn: async ({ 
      file, 
      hotelId, 
      mediaType, 
      sortOrder = 0 
    }: { 
      file: File
      hotelId: string
      mediaType: string
      sortOrder?: number 
    }) => {
      // Generate path based on hotel and media type
      const timestamp = Date.now()
      const extension = file.name.split('.').pop()
      const path = `hotels/${hotelId}/${mediaType}/${timestamp}.${extension}`
      
      // Upload media
      const media = await uploadMutation.mutateAsync({ file, path })
      
      // Link to hotel
      await linkMutation.mutateAsync({
        mediaId: media.id,
        hotelId,
        mediaType,
        sortOrder
      })
      
      return media
    },
  })
}

/**
 * Get optimized image URL with size parameters
 */
export function useOptimizedImageUrl(
  publicUrl: string | undefined, 
  options?: {
    width?: number
    height?: number
    quality?: number
    format?: 'webp' | 'jpg' | 'png'
  }
) {
  if (!publicUrl) return undefined
  
  // For Supabase Storage, we can add transformation parameters
  // This is a basic implementation - Supabase Pro has image transformations
  const url = new URL(publicUrl)
  
  if (options?.width) {
    url.searchParams.set('width', options.width.toString())
  }
  
  if (options?.height) {
    url.searchParams.set('height', options.height.toString())
  }
  
  if (options?.quality) {
    url.searchParams.set('quality', options.quality.toString())
  }
  
  if (options?.format) {
    url.searchParams.set('format', options.format)
  }
  
  return url.toString()
}

/**
 * Get responsive image URLs for different screen sizes
 */
export function useResponsiveImageUrls(publicUrl: string | undefined) {
  return {
    thumbnail: useOptimizedImageUrl(publicUrl, { width: 300, quality: 80 }),
    small: useOptimizedImageUrl(publicUrl, { width: 600, quality: 85 }),
    medium: useOptimizedImageUrl(publicUrl, { width: 1200, quality: 90 }),
    large: useOptimizedImageUrl(publicUrl, { width: 1920, quality: 95 }),
    original: publicUrl
  }
}

/**
 * Helper hook to get the primary image for a hotel media type
 */
export function useHotelPrimaryImage(hotelId: string, mediaType: string) {
  const { data: media, ...rest } = useHotelMedia(hotelId, mediaType)
  
  const primaryImage = media?.find(m => 
    m.hotel_media?.some(hm => hm.is_primary)
  ) || media?.[0]
  
  return {
    data: primaryImage,
    ...rest
  }
}

/**
 * Get hotel thumbnail for featured displays
 */
export function useHotelThumbnail(hotelId: string) {
  const { data: heroImage } = useHotelPrimaryImage(hotelId, 'hero')
  const { data: galleryImages } = useHotelMedia(hotelId, 'gallery')
  
  // Prefer hero image, fallback to first gallery image
  const thumbnailImage = heroImage || galleryImages?.[0]
  
  return useOptimizedImageUrl(thumbnailImage?.public_url, { 
    width: 400, 
    height: 300, 
    quality: 80 
  })
}