/**
 * Image URL Utilities for Tivoli Hotels
 * Centralized image URL management with fallback support
 * 
 * Features:
 * - Dynamic Supabase URL generation
 * - Fallback to legacy URLs during migration
 * - Environment-based switching
 * - Bucket validation and error handling
 * 
 * Bucket Structure:
 * - homepage_image: Hero carousel and general site images
 * - royalpalacepalwal: Tivoli Royal Palace Palwal property images
 * - tivoliheritagerewari: Tivoli Heritage Palace Rewari images
 * - thetivolinewdelhi1: The Tivoli New Delhi flagship property images
 * - tivoli-dining-photo: Restaurant and dining images
 * - wedcationambala: Wedcation Ambala property images
 * - omniatiwolidwarka: Omnia Dwarka Expressway images
 * - wedcationisrana: Wedcation Israna property images
 * - lotuscourt: Lotus Court property images
 */

// Current Supabase configuration
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://sivirxabbuldqkckjwmu.supabase.co'

// Legacy URLs for fallback during migration
const LEGACY_URLS = {
  'oawudxprjjgsdtsvroqt': 'https://oawudxprjjgsdtsvroqt.supabase.co',
  'pbkxpylwatscfjzbmwur': 'https://pbkxpylwatscfjzbmwur.supabase.co'
}

// Valid bucket names in the system
export const VALID_BUCKETS = [
  'homepage_image',
  'royalpalacepalwal', 
  'tivoliheritagerewari',
  'thetivolinewdelhi1',
  'tivoli-dining-photo',
  'wedcationambala',
  'omniatiwolidwarka',
  'wedcationisrana',
  'lotuscourt'
] as const

export type BucketName = typeof VALID_BUCKETS[number]

/**
 * Generate Supabase storage URL for an image
 * @param bucket - The storage bucket name
 * @param imagePath - The path to the image within the bucket
 * @param useNew - Whether to use new Supabase instance (default: true)
 * @returns Complete image URL
 */
export function getImageUrl(bucket: BucketName, imagePath: string, useNew: boolean = true): string {
  // Validate bucket name
  if (!VALID_BUCKETS.includes(bucket)) {
    console.warn(`Invalid bucket name: ${bucket}. Using homepage_image as fallback.`)
    bucket = 'homepage_image'
  }

  // Clean image path (remove leading slash if present)
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath

  if (useNew) {
    // Use new Supabase instance
    return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${cleanPath}`
  } else {
    // Fallback to legacy URL (for migration period)
    // Default to first legacy URL if bucket not found
    const legacyUrl = LEGACY_URLS['oawudxprjjgsdtsvroqt']
    return `${legacyUrl}/storage/v1/object/public/${bucket}/${cleanPath}`
  }
}

/**
 * Convert legacy image URL to new format
 * @param legacyUrl - Full legacy Supabase URL
 * @returns New format URL or original if not a legacy URL
 */
export function migrateLegacyUrl(legacyUrl: string): string {
  // Check if it's a legacy Supabase URL
  const legacyMatch = legacyUrl.match(/https:\/\/(oawudxprjjgsdtsvroqt|pbkxpylwatscfjzbmwur)\.supabase\.co\/storage\/v1\/object\/public\/([^\/]+)\/(.+)/)
  
  if (legacyMatch) {
    const [, , bucket, imagePath] = legacyMatch
    return getImageUrl(bucket as BucketName, imagePath, true)
  }

  // Return original URL if not a legacy format
  return legacyUrl
}

/**
 * Get image URL with automatic fallback
 * Tries new URL first, falls back to legacy if needed
 * @param bucket - Storage bucket name
 * @param imagePath - Image path within bucket
 * @returns Promise that resolves to working URL
 */
export async function getImageUrlWithFallback(bucket: BucketName, imagePath: string): Promise<string> {
  const newUrl = getImageUrl(bucket, imagePath, true)
  
  try {
    // Test if new URL is accessible
    const response = await fetch(newUrl, { method: 'HEAD' })
    if (response.ok) {
      return newUrl
    }
  } catch (error) {
    console.warn(`New image URL failed for ${bucket}/${imagePath}, falling back to legacy`)
  }

  // Fallback to legacy URL
  return getImageUrl(bucket, imagePath, false)
}

/**
 * Batch convert multiple legacy URLs
 * @param urls - Array of legacy URLs to convert
 * @returns Array of converted URLs
 */
export function batchMigrateLegacyUrls(urls: string[]): string[] {
  return urls.map(url => migrateLegacyUrl(url))
}

/**
 * Extract bucket and path from any Supabase storage URL
 * @param url - Full Supabase storage URL
 * @returns Object with bucket and path, or null if invalid
 */
export function parseStorageUrl(url: string): { bucket: string; path: string } | null {
  const match = url.match(/\/storage\/v1\/object\/public\/([^\/]+)\/(.+)/)
  if (match) {
    const [, bucket, path] = match
    return { bucket, path }
  }
  return null
}

/**
 * Check if URL is a Supabase storage URL
 * @param url - URL to check
 * @returns Boolean indicating if it's a Supabase storage URL
 */
export function isSupabaseStorageUrl(url: string): boolean {
  return url.includes('/storage/v1/object/public/')
}

// Pre-built image URL helpers for common buckets
export const imageHelpers = {
  homepage: (imagePath: string) => getImageUrl('homepage_image', imagePath),
  royalPalace: (imagePath: string) => getImageUrl('royalpalacepalwal', imagePath),
  heritage: (imagePath: string) => getImageUrl('tivoliheritagerewari', imagePath),
  dining: (imagePath: string) => getImageUrl('tivoli-dining-photo', imagePath),
  wedcationAmbala: (imagePath: string) => getImageUrl('wedcationambala', imagePath),
  omniaDwarka: (imagePath: string) => getImageUrl('omniatiwolidwarka', imagePath),
  wedcationIsrana: (imagePath: string) => getImageUrl('wedcationisrana', imagePath),
  lotusCourt: (imagePath: string) => getImageUrl('lotuscourt', imagePath),
}

export default {
  getImageUrl,
  migrateLegacyUrl,
  getImageUrlWithFallback,
  batchMigrateLegacyUrls,
  parseStorageUrl,
  isSupabaseStorageUrl,
  imageHelpers,
  VALID_BUCKETS
}