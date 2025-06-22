/**
 * Our Hotels Component - Carousel Design with Brand Tabs
 * Matches exact design from screenshot with golden underline tabs and landscape cards
 */

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBrands, useHotelsByBrand } from '@/hooks/useHotelsFixed';
import { SmartImage } from '@/components/ui/SmartImage';

export default function OurHotels() {
  const [selectedBrand, setSelectedBrand] = useState('tivoli'); // Default to THE TIVOLI
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  
  const { data: brands, isLoading: brandsLoading } = useBrands();
  const { data: hotels, isLoading: hotelsLoading, error } = useHotelsByBrand(selectedBrand);

  const isLoading = brandsLoading || hotelsLoading;

  // Responsive items per slide
  const getItemsPerSlide = () => {
    if (typeof window === 'undefined') return 3;
    return window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
  };

  React.useEffect(() => {
    const updateItemsPerSlide = () => {
      setItemsPerSlide(getItemsPerSlide());
    };

    updateItemsPerSlide();
    window.addEventListener('resize', updateItemsPerSlide);
    return () => window.removeEventListener('resize', updateItemsPerSlide);
  }, []);

  // Carousel logic
  const totalSlides = Math.ceil((hotels?.length || 0) / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentHotels = () => {
    if (!hotels) return [];
    const start = currentSlide * itemsPerSlide;
    return hotels.slice(start, start + itemsPerSlide);
  };

  // Reset slide when brand changes or items per slide changes
  React.useEffect(() => {
    setCurrentSlide(0);
  }, [selectedBrand, itemsPerSlide]);

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

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4 md:px-16">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-neutral-800 mb-4">
            Our Hotels
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto mb-8">
            Discover our collection of extraordinary destinations, where every moment becomes a cherished memory.
          </p>
        </div>

        {/* Brand Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-8">
            {brands?.map((brand) => (
              <button
                key={brand.slug}
                onClick={() => setSelectedBrand(brand.slug)}
                className={`px-2 py-3 text-sm font-medium transition-all duration-200 uppercase tracking-wider relative ${
                  selectedBrand === brand.slug
                    ? 'text-neutral-800'
                    : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                {brand.display_name}
                {selectedBrand === brand.slug && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#CD9F59]"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Subtitle */}
        <div className="text-center mb-12">
          <p className="text-neutral-600 font-medium">
            Timeless Luxury & Sophistication
          </p>
        </div>

        {/* Hotels Carousel */}
        {!hotels || hotels.length === 0 ? (
          <div className="text-center py-20 text-neutral-600">
            <p>No hotels available for this brand.</p>
          </div>
        ) : (
          <div className="relative">
            {/* Carousel Container */}
            <div className="overflow-hidden">
              <div className="flex gap-6 transition-transform duration-500 ease-in-out"
                   style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {hotels.map((hotel) => (
                  <div
                    className="group flex-shrink-0"
                    style={{ 
                      width: itemsPerSlide === 1 ? 'calc(100% - 1rem)' : 
                             itemsPerSlide === 2 ? 'calc(50% - 1rem)' : 
                             'calc(33.333% - 1rem)' 
                    }}
                  >
                    <Link
                      to={hotel.href}
                      className="block rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 aspect-[4/5] bg-gray-200"
                    >
                      <div className="w-full h-full">
                        <SmartImage
                          src={hotel.image}
                          alt={hotel.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 block"
                          optimize={{
                            width: 400,
                            height: 500,
                            quality: 85,
                            format: 'webp'
                          }}
                        />
                      </div>
                    </Link>
                    
                    {/* Hotel name and location outside the card */}
                    <div className="mt-4 text-center">
                      <Link to={hotel.href}>
                        <h3 className="text-lg font-serif text-neutral-800 group-hover:text-[#CD9F59] transition-colors">
                          {hotel.name}
                        </h3>
                      </Link>
                      <div className="flex items-center justify-center text-sm text-neutral-600 mt-1">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {hotel.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            {totalSlides > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-[#CD9F59] rounded-full shadow-lg flex items-center justify-center hover:bg-[#B88D47] transition-colors z-10"
                  aria-label="Previous hotels"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-[#CD9F59] rounded-full shadow-lg flex items-center justify-center hover:bg-[#B88D47] transition-colors z-10"
                  aria-label="Next hotels"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </>
            )}
          </div>
        )}

      </div>
    </section>
  );
}