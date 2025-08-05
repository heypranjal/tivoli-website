/**
 * Spaces Section Component
 * Displays event spaces and venues with capacity and features in a carousel
 */

import React, { useState, useEffect } from 'react';
import { Users, Calendar, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

interface Space {
  id: string;
  name: string;
  capacity: number | string | { min: number; max: number };
  area: string;
  image: string;
  features: string[];
  description?: string;
}

interface SpacesSectionProps {
  spaces: Space[];
  className?: string;
}

export const SpacesSection: React.FC<SpacesSectionProps> = ({
  spaces,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  if (!spaces || spaces.length === 0) {
    return null;
  }

  // Create extended array for infinite scroll effect
  const extendedSpaces = [...spaces, ...spaces, ...spaces]; // Triple the array for smooth rotation
  const centerOffset = spaces.length; // Start from the middle set

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Reset to center when reaching boundaries
  useEffect(() => {
    // When we've scrolled past the second set, reset to first set
    if (currentIndex >= spaces.length + 1) {
      setTimeout(() => setCurrentIndex(1), 50);
    } 
    // When we've scrolled before the first set, reset to second set
    else if (currentIndex < -spaces.length + 1) {
      setTimeout(() => setCurrentIndex(currentIndex + spaces.length), 50);
    }
  }, [currentIndex, spaces.length]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(currentIndex - 1);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(currentIndex + 1);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  return (
    <section className={`space-y-8 ${className}`}>
      <div className="text-center">
        <h2 className="font-serif text-3xl text-neutral-800 mb-4">Event Spaces</h2>
        <p className="text-neutral-600 leading-relaxed max-w-2xl mx-auto">
          Discover our exceptional venues designed to host memorable events of every scale
        </p>
      </div>
      
      {/* Carousel Container */}
      <div className="relative">
        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-[#CD9F59] rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 group"
          aria-label="Previous spaces"
        >
          <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
        
        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-[#CD9F59] rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 group"
          aria-label="Next spaces"
        >
          <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>

        {/* Carousel Track */}
        <div className="overflow-hidden px-12">
          <div 
            className={`flex gap-6 ${(currentIndex === 1 || currentIndex === spaces.length + 1 || currentIndex === -spaces.length + 1) ? '' : 'transition-transform duration-500 ease-in-out'}`}
            style={{ 
              transform: `translateX(calc(-${(currentIndex + centerOffset - 1) * 20}% - ${(currentIndex + centerOffset - 1) * 1.5}rem))`
            }}
          >
            {extendedSpaces.map((space, index) => (
              <div key={`${space.id}-${index}`} className="w-1/4 flex-shrink-0">
                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="relative">
                    <img
                      src={space.image}
                      alt={space.name}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full">
                      <span className="text-xs font-medium flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {typeof space.capacity === 'object' && 'min' in space.capacity 
                          ? `${space.capacity.min}-${space.capacity.max}` 
                          : space.capacity}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-serif text-xl text-neutral-800 mb-2">{space.name}</h3>
                    
                    {/* Area Information */}
                    <div className="flex items-center text-sm text-neutral-600 mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{space.area}</span>
                    </div>

                    {/* Description if available */}
                    {space.description && (
                      <p className="text-sm text-neutral-600 mb-4 line-clamp-2">{space.description}</p>
                    )}
                    
                    {/* Features */}
                    <ul className="space-y-2 text-sm text-neutral-600">
                      {space.features.slice(0, 4).map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <span className="mr-2 text-[#CD9F59]">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                      {space.features.length > 4 && (
                        <li className="text-xs text-neutral-500 italic">
                          +{space.features.length - 4} more features
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  <div className="px-6 pb-6">
                    <button className="w-full py-2 px-4 bg-gradient-to-r from-[#CD9F59] to-[#CD9F59]/80 text-white rounded-lg hover:from-[#CD9F59]/90 hover:to-[#CD9F59]/70 transition-all duration-200 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {spaces.map((_, index) => {
            // Calculate actual position considering the circular nature
            const actualPosition = ((currentIndex - 1) % spaces.length + spaces.length) % spaces.length;
            return (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index + 1);
                  setTimeout(() => setIsAutoPlaying(true), 8000);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  actualPosition === index 
                    ? 'bg-[#CD9F59] scale-125' 
                    : 'bg-neutral-300 hover:bg-[#CD9F59]/50'
                }`}
                aria-label={`Go to space ${index + 1}`}
              />
            );
          })}
        </div>

        {/* Auto-play indicator */}
        <div className="text-center mt-4">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="text-xs text-neutral-500 hover:text-[#CD9F59] transition-colors duration-200"
          >
            {isAutoPlaying ? '⏸️ Pause' : '▶️ Play'} Auto-scroll
          </button>
        </div>
      </div>
    </section>
  );
};

export default SpacesSection;