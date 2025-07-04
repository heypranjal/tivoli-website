/**
 * Room Image Carousel Component
 * Displays categorized room images with luxury carousel navigation
 */

import React, { useState, useEffect, useCallback } from 'react';
import { SmartImage } from '../ui/SmartImage';
import { Home, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import type { RoomImage } from '../../hooks/useHotelRooms';
import '../../styles/room-carousel.css';

interface RoomImageCarouselProps {
  images: RoomImage[];
  roomName: string;
  roomSize: string;
  className?: string;
  autoAdvance?: boolean;
  autoAdvanceInterval?: number;
}

export const RoomImageCarousel: React.FC<RoomImageCarouselProps> = ({
  images,
  roomName,
  roomSize,
  className = '',
  autoAdvance = true,
  autoAdvanceInterval = 4000
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoAdvance);
  const [isHovered, setIsHovered] = useState(false);

  // Sort images by primary first, then by sort order
  const sortedImages = [...images].sort((a, b) => {
    if (a.isPrimary && !b.isPrimary) return -1;
    if (!a.isPrimary && b.isPrimary) return 1;
    return a.sortOrder - b.sortOrder;
  });

  // Get current image
  const currentImage = sortedImages[activeImageIndex];

  // Auto-advance functionality
  useEffect(() => {
    if (!isPlaying || isHovered || sortedImages.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setActiveImageIndex(prev => {
        const nextIndex = prev + 1;
        return nextIndex >= sortedImages.length ? 0 : nextIndex;
      });
    }, autoAdvanceInterval);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, activeImageIndex, sortedImages.length, autoAdvanceInterval]);

  // Navigation functions
  const goToImage = useCallback((imageIndex: number) => {
    setActiveImageIndex(imageIndex);
  }, []);

  const nextImage = useCallback(() => {
    setActiveImageIndex(prev => {
      const nextIndex = prev + 1;
      return nextIndex >= sortedImages.length ? 0 : nextIndex;
    });
  }, [sortedImages.length]);

  const prevImage = useCallback(() => {
    setActiveImageIndex(prev => {
      const prevIndex = prev - 1;
      return prevIndex < 0 ? sortedImages.length - 1 : prevIndex;
    });
  }, [sortedImages.length]);

  const togglePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);


  // If no images, return empty
  if (!images || images.length === 0) {
    return null;
  }

  // Debug logging
  console.log(`🎠 Carousel Debug - Room: ${roomName}`, {
    totalImages: images.length,
    sortedImages: sortedImages.map(img => ({ url: img.url, alt: img.alt, isPrimary: img.isPrimary })),
    activeIndex: activeImageIndex
  });

  // Single image fallback for rooms with only one image
  if (images.length === 1) {
    const singleImage = images[0];
    return (
      <div className={`relative ${className} h-full`}>
        <SmartImage
          src={singleImage.url}
          alt={singleImage.alt}
          className="w-full h-full object-cover rounded-lg"
          lazy={true}
          placeholder="blur"
          optimize={{
            width: 500,
            height: 375,
            quality: 90,
            format: 'webp'
          }}
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-md shadow-sm">
          <div className="flex items-center text-sm text-neutral-700 font-medium">
            <Home className="w-4 h-4 mr-1.5" />
            {roomSize}
          </div>
        </div>

        {/* Luxury Lightbox */}
      </div>
    );
  }

  return (
    <div 
      className={`room-carousel relative ${className} h-full`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Image Display */}
      <div className="room-carousel-image relative overflow-hidden rounded-lg h-full group">
        {currentImage && (
          <SmartImage
            src={currentImage.url}
            alt={currentImage.alt}
            className="w-full h-full object-cover transition-opacity duration-500"
            lazy={true}
            placeholder="blur"
            optimize={{
              width: 500,
              height: 375,
              quality: 95,
              format: 'webp'
            }}
          />
        )}

        {/* Luxury Gradient Overlay */}
        <div className="room-carousel-overlay" />

        {/* Room Size Indicator */}
        <div className="absolute top-3 right-3 room-size-indicator">
          <div className="flex items-center text-sm text-neutral-700 font-medium">
            <Home className="w-4 h-4 mr-1.5" />
            {roomSize}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className={`carousel-nav-button absolute left-3 top-1/2 w-5 h-5 ${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}
          style={{ transform: 'translateY(-50%)' }}
          aria-label="Previous image"
        >
          <ChevronLeft className="w-3 h-3 text-neutral-700" />
        </button>

        <button
          onClick={nextImage}
          className={`carousel-nav-button absolute right-3 top-1/2 w-5 h-5 ${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}
          style={{ transform: 'translateY(-50%)' }}
          aria-label="Next image"
        >
          <ChevronRight className="w-3 h-3 text-neutral-700" />
        </button>

        {/* Play/Pause Button */}
        {autoAdvance && (
          <button
            onClick={togglePlayPause}
            className={`play-pause-button absolute bottom-3 right-3 ${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-white" />
            ) : (
              <Play className="w-4 h-4 text-white ml-0.5" />
            )}
          </button>
        )}

        {/* Image Counter */}
        <div className={`image-counter absolute bottom-3 left-3 ${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
          <span className="text-white text-sm font-medium">
            {activeImageIndex + 1} of {sortedImages.length}
          </span>
        </div>
      </div>


      {/* Image Dots */}
      {sortedImages.length > 1 && (
        <div className="carousel-dots">
          {sortedImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`carousel-dot ${index === activeImageIndex ? 'active' : ''}`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}

    </div>
  );
};

RoomImageCarousel.displayName = 'RoomImageCarousel';

export default RoomImageCarousel;