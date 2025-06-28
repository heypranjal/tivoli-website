/**
 * Hero Section Component
 * Displays main hero image carousel with hotel name and location
 */

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroSectionProps {
  hotelName: string;
  location: string;
  state: string;
  images: string[];
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  hotelName,
  location,
  state,
  images,
  className = '',
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) {
    return (
      <div className={`relative h-[80vh] bg-gray-200 ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500">No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative h-[80vh] overflow-hidden ${className}`}>
      <div className="relative w-full h-full">
        <img
          src={images[activeImageIndex]}
          alt={`${hotelName} - Image ${activeImageIndex + 1}`}
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Hotel Title Overlay */}
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <div>
            <h1 className="font-serif text-4xl md:text-6xl mb-4">{hotelName}</h1>
            <p className="text-xl md:text-2xl font-light">{location}, {state}</p>
          </div>
        </div>
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Indicators */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeImageIndex 
                      ? 'bg-white' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HeroSection;