/**
 * Smart Image Component
 * Phase 3: Image Migration
 * Created: 2025-06-20
 * 
 * Intelligent image component that handles migration fallbacks and optimization
 */

import React, { useState } from 'react'
import { getMigratedImageUrl, getOptimizedImageUrl, getImageSource } from '@/utils/image-migration'

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  fallback?: string
  optimize?: {
    width?: number
    height?: number
    quality?: number
    format?: 'webp' | 'jpg' | 'png'
  }
  showMigrationStatus?: boolean
}

export function SmartImage({ 
  src, 
  alt, 
  fallback, 
  optimize,
  showMigrationStatus = false,
  className = '',
  ...props 
}: SmartImageProps) {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Get the best available URL
  const migratedUrl = getMigratedImageUrl(src)
  const optimizedUrl = optimize ? getOptimizedImageUrl(migratedUrl, optimize) : migratedUrl
  const finalUrl = imageError ? (fallback || src) : optimizedUrl

  const imageSource = getImageSource(finalUrl)
  const isMigrated = migratedUrl !== src

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setImageError(true)
    setIsLoading(false)
  }

  return (
    <div className="relative">
      <img
        src={finalUrl}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
      
      {/* Loading placeholder */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}

      {/* Migration status indicator (development only) */}
      {showMigrationStatus && process.env.NODE_ENV === 'development' && (
        <div className="absolute top-2 right-2 text-xs px-2 py-1 rounded text-white font-medium">
          {isMigrated ? (
            <span className="bg-green-500">Migrated</span>
          ) : (
            <span className="bg-yellow-500">Original</span>
          )}
          <span className={`ml-1 ${imageSource === 'supabase' ? 'bg-blue-500' : 'bg-red-500'}`}>
            {imageSource === 'supabase' ? 'SB' : 'EXT'}
          </span>
        </div>
      )}

      {/* Error state */}
      {imageError && !fallback && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
          Image unavailable
        </div>
      )}
    </div>
  )
}

/**
 * Gallery component with smart image loading
 */
interface SmartImageGalleryProps {
  images: string[]
  alt: string
  className?: string
  imageClassName?: string
  optimize?: SmartImageProps['optimize']
}

export function SmartImageGallery({ 
  images, 
  alt, 
  className = '',
  imageClassName = '',
  optimize
}: SmartImageGalleryProps) {
  return (
    <div className={`grid gap-4 ${className}`}>
      {images.map((src, index) => (
        <SmartImage
          key={src}
          src={src}
          alt={`${alt} ${index + 1}`}
          className={imageClassName}
          optimize={optimize}
        />
      ))}
    </div>
  )
}

/**
 * Hero image with responsive loading
 */
interface SmartHeroImageProps {
  src: string
  alt: string
  className?: string
  children?: React.ReactNode
}

export function SmartHeroImage({ src, alt, className = '', children }: SmartHeroImageProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <SmartImage
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        optimize={{
          width: 1920,
          quality: 90,
          format: 'webp'
        }}
      />
      {children && (
        <div className="absolute inset-0">
          {children}
        </div>
      )}
    </div>
  )
}