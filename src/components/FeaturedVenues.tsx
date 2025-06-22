/**
 * Our Hotels Component - Refactored for Supabase
 * Phase 4: Component Refactoring
 * Updated: 2025-06-20
 * 
 * Now uses dynamic data from Supabase instead of static arrays
 * Displays featured hotels from the database
 */

import React, { useState } from 'react';
import { MapPin, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useHotelsForFeaturedVenuesFixed } from '@/hooks/useHotelsFixed';
import { SmartImage } from '@/components/ui/SmartImage';

export default function OurHotels() {
  const { data: venues, isLoading, error } = useHotelsForFeaturedVenuesFixed();
  const [currentIndex, setCurrentIndex] = useState(0);


  // Determine how many venues to show based on screen size
  const getItemsPerSlide = () => {
    if (typeof window === 'undefined') return 3;
    return window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
  };

  const [itemsPerSlide, setItemsPerSlide] = useState(getItemsPerSlide);

  React.useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(getItemsPerSlide());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4 md:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-neutral-800 mb-4">
              Our Hotels
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Discover our collection of luxury properties across India
            </p>
          </div>
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#CD9F59]" />
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    console.error('Featured venues error:', error);
    return (
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4 md:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-neutral-800 mb-4">
              Our Hotels
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Discover our collection of luxury properties across India
            </p>
          </div>
          <div className="text-center py-20 text-neutral-600">
            <p>Unable to load our hotels at this time.</p>
            <p className="text-sm mt-2">Please try refreshing the page.</p>
          </div>
        </div>
      </section>
    );
  }

  // No venues found
  if (!venues || venues.length === 0) {
    return (
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4 md:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-neutral-800 mb-4">
              Our Hotels
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Discover our collection of luxury properties across India
            </p>
          </div>
          <div className="text-center py-20 text-neutral-600">
            <p>No hotels available.</p>
          </div>
        </div>
      </section>
    );
  }

  const totalSlides = Math.ceil(venues.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentVenues = () => {
    const start = currentIndex * itemsPerSlide;
    return venues.slice(start, start + itemsPerSlide);
  };

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4 md:px-16">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-neutral-800 mb-4">
            Our Hotels
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Discover our collection of luxury properties across India, each offering unique experiences 
            and unparalleled hospitality in stunning locations.
          </p>
        </div>

        {/* Venues Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getCurrentVenues().map((venue) => (
              <Link
                key={venue.id}
                to={venue.href}
                className="group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <SmartImage
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    optimize={{
                      width: 400,
                      height: 300,
                      quality: 85,
                      format: 'webp'
                    }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-neutral-500 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {venue.location}
                  </div>
                  <h3 className="text-xl font-serif text-neutral-800 mb-2 group-hover:text-[#CD9F59] transition-colors">
                    {venue.name}
                  </h3>
                  <p className="text-[#CD9F59] text-sm font-medium uppercase tracking-wider">
                    {venue.brand === 'tivoli' ? 'THE TIVOLI' : 
                     venue.brand === 'omnia' ? 'OMNIA' :
                     venue.brand === 'upper-hse' ? 'THE UPPER HSE' :
                     venue.brand === 'wedcation' ? 'WEDCATION' : venue.brand}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Navigation Arrows - Only show if more than one slide */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-neutral-50 transition-colors z-10"
                aria-label="Previous venues"
              >
                <ChevronLeft className="w-6 h-6 text-neutral-600" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-neutral-50 transition-colors z-10"
                aria-label="Next venues"
              >
                <ChevronRight className="w-6 h-6 text-neutral-600" />
              </button>
            </>
          )}
        </div>

        {/* Pagination Dots - Only show if more than one slide */}
        {totalSlides > 1 && (
          <div className="flex justify-center mt-12 space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-[#CD9F59]' : 'bg-neutral-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/locations"
            className="inline-flex items-center px-8 py-3 bg-[#CD9F59] text-white rounded-lg hover:bg-[#B88D47] transition-colors font-medium"
          >
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  );
}