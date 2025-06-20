/**
 * Image Migration Utilities
 * Phase 3: Image Migration
 * Created: 2025-06-20
 * 
 * Utilities to help transition from static to dynamic images
 */

// URL mapping will be populated after image migration
let urlMapping: Record<string, string> = {}

// Load URL mapping if it exists
try {
  // This will be populated after running the migration script
  urlMapping = {}
} catch (error) {
  console.warn('URL mapping not available yet - using original URLs')
}

/**
 * Get the migrated URL for an image, fallback to original
 */
export function getMigratedImageUrl(originalUrl: string): string {
  return urlMapping[originalUrl] || originalUrl
}

/**
 * Get multiple migrated URLs
 */
export function getMigratedImageUrls(originalUrls: string[]): string[] {
  return originalUrls.map(url => getMigratedImageUrl(url))
}

/**
 * Check if an image has been migrated
 */
export function isImageMigrated(originalUrl: string): boolean {
  return originalUrl in urlMapping
}

/**
 * Get image source type
 */
export function getImageSource(url: string): 'supabase' | 'external' {
  return url.includes('supabase.co') ? 'supabase' : 'external'
}

/**
 * Generate optimized image URL (for Supabase images)
 */
export function getOptimizedImageUrl(
  url: string, 
  options?: {
    width?: number
    height?: number
    quality?: number
    format?: 'webp' | 'jpg' | 'png'
  }
): string {
  // Only optimize Supabase images
  if (!url.includes('supabase.co')) {
    return url
  }

  const urlObj = new URL(url)
  
  if (options?.width) {
    urlObj.searchParams.set('width', options.width.toString())
  }
  
  if (options?.height) {
    urlObj.searchParams.set('height', options.height.toString())
  }
  
  if (options?.quality) {
    urlObj.searchParams.set('quality', options.quality.toString())
  }
  
  if (options?.format) {
    urlObj.searchParams.set('format', options.format)
  }
  
  return urlObj.toString()
}

/**
 * Get responsive image URLs
 */
export function getResponsiveImageUrls(url: string) {
  return {
    thumbnail: getOptimizedImageUrl(url, { width: 300, quality: 80 }),
    small: getOptimizedImageUrl(url, { width: 600, quality: 85 }),
    medium: getOptimizedImageUrl(url, { width: 1200, quality: 90 }),
    large: getOptimizedImageUrl(url, { width: 1920, quality: 95 }),
    original: url
  }
}

/**
 * Load URL mapping after migration (called after migration script runs)
 */
export function loadUrlMapping(mapping: Record<string, string>) {
  urlMapping = mapping
  console.log(`Loaded ${Object.keys(mapping).length} image URL mappings`)
}

/**
 * Migration status utilities
 */
export const migrationUtils = {
  /**
   * Get migration statistics
   */
  getStats() {
    const totalMapped = Object.keys(urlMapping).length
    const supabaseImages = Object.values(urlMapping).filter(url => 
      url.includes('supabase.co')
    ).length
    
    return {
      totalMapped,
      supabaseImages,
      externalImages: totalMapped - supabaseImages
    }
  },

  /**
   * Check if migration is complete
   */
  isMigrationComplete() {
    return Object.keys(urlMapping).length > 0
  },

  /**
   * Get unmigrated URLs from a list
   */
  getUnmigratedUrls(urls: string[]) {
    return urls.filter(url => !isImageMigrated(url) && getImageSource(url) === 'external')
  }
}