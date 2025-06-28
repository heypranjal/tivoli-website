/**
 * Locations Page - Refactored for Supabase
 * Phase 4: Component Refactoring
 * Updated: 2025-06-20
 * 
 * Now uses dynamic data from Supabase with React Query
 */

import React, { useState, useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { MapPin, Loader2, Star } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { useHotelsForLocationPage } from '@/hooks/useHotels';
import { useBrands } from '@/hooks/useBrands';
import { useLocations } from '@/hooks/useLocations';
import { SmartImage } from '@/components/ui/SmartImage';
import type { HotelFilters } from '@/types/supabase';

export default function LocationsPage() {
  const { brand, location: locationParam } = useParams();
  const [searchParams] = useSearchParams();
  
  // Get query parameters for brand and location filtering
  const queryBrand = searchParams.get('brand');
  const queryLocation = searchParams.get('location');
  
  const [activeLocation, setActiveLocation] = useState(
    queryLocation || locationParam || 'all'
  );
  const [activeBrand, setActiveBrand] = useState(
    queryBrand || brand || 'all'
  );
  const [isMobile, setIsMobile] = useState(false);

  // Build filters for hotel query
  const filters: HotelFilters = {};
  if (activeBrand !== 'all') filters.brand = activeBrand;
  if (activeLocation !== 'all') filters.location = activeLocation;

  // Fetch data using hooks
  const { data: hotels, isLoading: hotelsLoading, error: hotelsError } = useHotelsForLocationPage(filters);
  const { data: brands, isLoading: brandsLoading } = useBrands();
  const { data: locations, isLoading: locationsLoading } = useLocations();

  const isLoading = hotelsLoading || brandsLoading || locationsLoading;

  useEffect(() => {
    const checkLayout = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkLayout();
    window.addEventListener('resize', checkLayout);
    return () => window.removeEventListener('resize', checkLayout);
  }, []);

  useEffect(() => {
    // Handle path parameters (for backward compatibility)
    if (locationParam) {
      setActiveLocation(locationParam);
    }
    if (brand) {
      setActiveBrand(brand);
    }
    
    // Handle query parameters (primary method from navigation)
    if (queryLocation) {
      setActiveLocation(queryLocation);
    }
    if (queryBrand) {
      setActiveBrand(queryBrand);
    }
  }, [locationParam, brand, queryLocation, queryBrand]);

  // Get current brand display name
  const getCurrentBrandName = () => {
    if (activeBrand === 'all') return 'Discover Our Properties';
    const currentBrand = brands?.find(b => b.slug === activeBrand);
    return currentBrand?.display_name || 'Our Properties';
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="relative h-[40vh] bg-[#001d3d]">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photos/brown-wooden-house-on-blue-water-under-blue-sky-during-daytime-egCye6ngbmA')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <span className="text-sm uppercase tracking-[0.2em] text-[#CD9F59] font-sans mb-4 block">
                Loading...
              </span>
              <h1 className="font-serif text-3xl md:text-4xl mb-4 text-white">Our Locations</h1>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-20 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#CD9F59] mx-auto" />
          <p className="text-neutral-600 mt-4">Loading properties...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (hotelsError) {
    console.error('Hotels loading error:', hotelsError);
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="relative h-[40vh] bg-[#001d3d]">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photos/brown-wooden-house-on-blue-water-under-blue-sky-during-daytime-egCye6ngbmA')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <span className="text-sm uppercase tracking-[0.2em] text-[#CD9F59] font-sans mb-4 block">
                Error
              </span>
              <h1 className="font-serif text-3xl md:text-4xl mb-4 text-white">Our Locations</h1>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-neutral-600">Unable to load properties. Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-[#001d3d]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photos/brown-wooden-house-on-blue-water-under-blue-sky-during-daytime-egCye6ngbmA')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <span className="text-sm uppercase tracking-[0.2em] text-[#CD9F59] font-sans mb-4 block">
              {getCurrentBrandName()}
            </span>
            <h1 className="font-serif text-3xl md:text-4xl mb-4 text-white">Our Locations</h1>
            <p className="text-white/80 text-sm md:text-base max-w-2xl mx-auto">
              Discover our collection of luxury hotels and resorts across prestigious destinations
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-20">
        {/* Brand Filter */}
        {brands && brands.length > 0 && (
          <div className="flex justify-center mb-6 md:mb-10 px-4 md:px-0">
            <div className="w-full max-w-full md:max-w-fit overflow-x-auto scrollbar-hide">
              <div className="inline-flex border-b border-neutral-200 min-w-max pb-1">
                {!brand && (
                  <button
                    onClick={() => setActiveBrand('all')}
                    className={`px-4 md:px-8 py-2 text-sm tracking-widest font-sans transition-all duration-300 relative whitespace-nowrap
                      ${activeBrand === 'all' 
                        ? 'text-[#CD9F59] font-medium' 
                        : 'text-neutral-400'
                      }`}
                  >
                    ALL BRANDS
                    {activeBrand === 'all' && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#CD9F59]" />
                    )}
                  </button>
                )}
                {brands.map((brandItem) => (
                  <button
                    key={brandItem.slug}
                    onClick={() => setActiveBrand(brandItem.slug)}
                    className={`px-4 md:px-8 py-2 text-sm tracking-widest font-sans transition-all duration-300 relative whitespace-nowrap
                      ${activeBrand === brandItem.slug 
                        ? 'text-[#CD9F59] font-medium' 
                        : 'text-neutral-400'
                      }`}
                  >
                    {brandItem.display_name}
                    {activeBrand === brandItem.slug && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#CD9F59]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Location Filter */}
        {locations && locations.length > 0 && (
          <div className="flex justify-center mb-10 md:mb-16 px-4 md:px-0">
            <div className="w-full max-w-full md:max-w-fit overflow-x-auto scrollbar-hide">
              <div className="inline-flex border-b border-neutral-200 min-w-max pb-1">
                {!locationParam && (
                  <button
                    onClick={() => setActiveLocation('all')}
                    className={`px-4 md:px-6 py-2 text-sm font-sans transition-all duration-300 relative whitespace-nowrap
                      ${activeLocation === 'all' 
                        ? 'text-[#CD9F59] font-medium' 
                        : 'text-neutral-500'
                      }`}
                  >
                    All Locations
                    {activeLocation === 'all' && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#CD9F59]" />
                    )}
                  </button>
                )}
                {locations.map((location) => (
                  <button
                    key={location.slug}
                    onClick={() => setActiveLocation(location.slug)}
                    className={`px-4 md:px-6 py-2 text-sm font-sans transition-all duration-300 relative whitespace-nowrap
                      ${activeLocation === location.slug 
                        ? 'text-[#CD9F59] font-medium' 
                        : 'text-neutral-500'
                      }`}
                  >
                    {location.name}
                    {activeLocation === location.slug && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#CD9F59]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Hotels Grid */}
        {hotels && hotels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.map((hotel) => (
              <Link
                key={hotel.id}
                to={hotel.href}
                className="group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <SmartImage
                    src={hotel.image}
                    alt={hotel.name}
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
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center text-sm text-neutral-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      {hotel.location}
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-neutral-600 ml-1">{hotel.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-serif text-neutral-800 mb-2 group-hover:text-[#CD9F59] transition-colors">
                    {hotel.name}
                  </h3>
                  <p className="text-[#CD9F59] text-sm font-medium uppercase tracking-wider mb-3">
                    {hotel.brand}
                  </p>
                  <p className="text-neutral-600 text-sm line-clamp-2">
                    {hotel.description}
                  </p>
                  {hotel.isFeatured && (
                    <div className="mt-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#CD9F59] text-white">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-neutral-600 text-lg">No properties found matching your criteria.</p>
            <p className="text-neutral-500 text-sm mt-2">Try adjusting your filters to see more results.</p>
          </div>
        )}
      </div>
    </div>
  );
}