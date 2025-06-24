/**
 * Smart Image Component with Lazy Loading
 * Phase 3: Image Migration + Performance Optimization
 * Created: 2025-06-20, Enhanced: 2025-06-21
 * 
 * Intelligent image component that handles migration fallbacks, optimization, and lazy loading
 */

import React, { useState, useRef, useEffect } from 'react'
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
  lazy?: boolean
  priority?: boolean
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  aspectRatio?: number // width/height ratio for layout stability
  fixedHeight?: number // explicit height to prevent layout shifts
}

// Intersection Observer hook for lazy loading with anti-jitter settings
function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  { threshold = 0.05, root = null, rootMargin = '300px' } = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Debounce the intersection callback to prevent jitter
    let timeoutId: NodeJS.Timeout
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Small delay to prevent rapid fire loading during fast scroll
          timeoutId = setTimeout(() => {
            setIsIntersecting(true)
            observer.unobserve(element)
          }, 50)
        }
      },
      { 
        threshold, 
        root, 
        rootMargin // Increased to 300px for smoother preloading
      }
    )

    observer.observe(element)
    return () => {
      observer.unobserve(element)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [elementRef, threshold, root, rootMargin])

  return isIntersecting
}

export function SmartImage({ 
  src, 
  alt, 
  fallback, 
  optimize,
  showMigrationStatus = false,
  lazy = true,
  priority = false,
  placeholder = 'blur',
  blurDataURL,
  aspectRatio,
  fixedHeight,
  className = '',
  style,
  ...props 
}: SmartImageProps) {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [hasLoaded, setHasLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Lazy loading logic
  const shouldLoad = !lazy || priority || useIntersectionObserver(containerRef)

  // Get the best available URL
  const migratedUrl = getMigratedImageUrl(src)
  const optimizedUrl = optimize ? getOptimizedImageUrl(migratedUrl, optimize) : migratedUrl
  const finalUrl = imageError ? (fallback || src) : optimizedUrl

  const imageSource = getImageSource(finalUrl)
  const isMigrated = migratedUrl !== src

  // Generate blur placeholder if needed
  const blurPlaceholder = blurDataURL || `data:image/svg+xml;base64,${btoa(`
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#E5E7EB;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#F3F4F6;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
    </svg>
  `)}`

  const handleLoad = () => {
    setIsLoading(false)
    setHasLoaded(true)
  }

  const handleError = (error?: any) => {
    console.warn('Image loading failed:', finalUrl, error?.message || 'Unknown error')
    setImageError(true)
    setIsLoading(false)
    
    // Prevent ORB errors from propagating
    if (error?.target) {
      error.target.src = ''
    }
  }

  // Calculate container styles for layout stability
  const containerStyles: React.CSSProperties = {
    ...style,
    // Prevent layout shifts with proper dimensions
    ...(fixedHeight && { height: fixedHeight }),
    ...(aspectRatio && { aspectRatio: aspectRatio.toString() }),
    // CSS for scroll performance
    transform: 'translateZ(0)', // Hardware acceleration
    backfaceVisibility: 'hidden',
    perspective: 1000,
  }

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full"
      style={containerStyles}
    >
      {/* Blur placeholder */}
      {placeholder === 'blur' && !hasLoaded && (
        <img
          src={blurPlaceholder}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover ${className} filter blur-sm scale-105`}
          aria-hidden="true"
        />
      )}

      {/* Empty placeholder */}
      {placeholder === 'empty' && !hasLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-300 animate-pulse" />
      )}

      {/* Main image - only load when shouldLoad is true */}
      {shouldLoad && (
        <img
          ref={imgRef}
          src={finalUrl}
          alt={alt}
          className={`${className} ${
            hasLoaded ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-500 ease-out`}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          {...props}
        />
      )}

      {/* Loading state for non-blur placeholders */}
      {shouldLoad && isLoading && placeholder === 'empty' && (
        <div className="absolute inset-0 bg-neutral-200 animate-pulse" />
      )}

      {/* Migration status indicator (development only) */}
      {showMigrationStatus && process.env.NODE_ENV === 'development' && (
        <div className="absolute top-2 right-2 text-xs px-2 py-1 rounded text-white font-medium z-10">
          {isMigrated ? (
            <span className="bg-green-500 px-1 rounded">Migrated</span>
          ) : (
            <span className="bg-yellow-500 px-1 rounded">Original</span>
          )}
          <span className={`ml-1 px-1 rounded ${imageSource === 'supabase' ? 'bg-blue-500' : 'bg-red-500'}`}>
            {imageSource === 'supabase' ? 'SB' : 'EXT'}
          </span>
          {lazy && !priority && (
            <span className="ml-1 px-1 bg-purple-500 rounded">Lazy</span>
          )}
          {priority && (
            <span className="ml-1 px-1 bg-orange-500 rounded">Priority</span>
          )}
        </div>
      )}

      {/* Error state */}
      {imageError && !fallback && (
        <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center text-neutral-500 text-sm">
          <div className="text-center">
            <div className="text-neutral-400 mb-1">⚠️</div>
            <div>Image unavailable</div>
          </div>
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
        priority={true}
        lazy={false}
        placeholder="blur"
      />
      {children && (
        <div className="absolute inset-0">
          {children}
        </div>
      )}
    </div>
  )
}