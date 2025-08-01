/**
 * Brands Page - Refactored for Supabase
 * Phase 4: Component Refactoring
 * Updated: 2025-06-20
 * 
 * Now uses dynamic data from Supabase with React Query
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Crown, Star, Heart, Sparkles, Loader2 } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { useBrands } from '@/hooks/useBrands';
import { useHotels } from '@/hooks/useHotels';
import { SmartImage } from '@/components/ui/SmartImage';

// Icon mapping for brands
const brandIcons: Record<string, React.ElementType> = {
  tivoli: Crown,
  'upper-hse': Star,
  wedcation: Heart,
  omnia: Sparkles
};

// Default brand images for display
const brandImages: Record<string, string> = {
  tivoli: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'upper-hse': 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80',
  wedcation: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  omnia: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
};

export default function BrandsPage() {
  const { data: brands, isLoading: brandsLoading } = useBrands();
  const { data: allHotels, isLoading: hotelsLoading } = useHotels();
  
  const isLoading = brandsLoading || hotelsLoading;
  
  // Group hotels by brand
  const hotelsByBrand = React.useMemo(() => {
    if (!allHotels) return {};
    
    return allHotels.reduce((acc, hotel) => {
      const brandSlug = hotel.brand.slug;
      if (!acc[brandSlug]) {
        acc[brandSlug] = [];
      }
      acc[brandSlug].push(hotel);
      return acc;
    }, {} as Record<string, typeof allHotels>);
  }, [allHotels]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#CD9F59] mx-auto mb-4" />
            <p className="text-neutral-600">Loading brands...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-[#001d3d]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="font-serif text-[44px] mb-4">Our Brands</h1>
            <p className="text-lg font-light max-w-2xl mx-auto">
              Discover our distinctive collection of luxury hospitality brands
            </p>
          </div>
        </div>
      </div>

      {/* Brands Content */}
      <div className="container mx-auto px-4 py-20">
        {brands?.map((brand, index) => {
          const IconComponent = brandIcons[brand.slug] || Crown;
          const brandHotels = hotelsByBrand[brand.slug] || [];
          const isEven = index % 2 === 0;
          const brandImage = brandImages[brand.slug] || brandImages.tivoli;

          return (
            <div key={brand.id} className="mb-32 last:mb-0">
              {/* Brand Header */}
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center ${isEven ? '' : 'md:flex-row-reverse'}`}>
                <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ${isEven ? '' : 'md:order-2'}`}>
                  <SmartImage
                    src={brandImage}
                    alt={brand.display_name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20" />
                  <div className="absolute top-6 right-6">
                    <div className="w-16 h-16 rounded-full border-2 border-white/90 flex items-center justify-center bg-black/20">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
                
                <div className={`${isEven ? '' : 'md:order-1'}`}>
                  <div className="mb-6">
                    <h2 className="font-serif text-4xl text-neutral-800 mb-4">
                      {brand.display_name}
                    </h2>
                    <div className="w-20 h-1" style={{ backgroundColor: brand.brand_color || '#CD9F59' }} />
                  </div>
                  <p className="text-xl font-serif text-neutral-600 mb-4">
                    {brand.name}
                  </p>
                  <p className="text-neutral-600 leading-relaxed">
                    {brand.description || 'Discover our collection of exceptional properties that define luxury hospitality.'}
                  </p>
                </div>
              </div>

              {/* Hotels Grid */}
              {brandHotels.length > 0 && (
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                  {brandHotels.map((hotel) => (
                    <Link
                      key={hotel.id}
                      to={`/hotel/${hotel.slug}`}
                      className="group"
                    >
                      <div className="relative overflow-hidden rounded-lg shadow-lg aspect-[4/3] mb-4">
                        <SmartImage
                          src={hotel.featured_image?.public_url || hotel.images?.find(img => img.media?.public_url)?.media.public_url || brandImage}
                          alt={hotel.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/50">
                          <button className="px-6 py-2 bg-white text-neutral-900 rounded-lg text-sm uppercase tracking-wider">
                            View Details
                          </button>
                        </div>
                      </div>
                      <h3 className="font-serif text-xl text-neutral-800 mb-2 group-hover:text-[#CD9F59] transition-colors">
                        {hotel.name}
                      </h3>
                      <p className="flex items-center text-neutral-600 text-sm">
                        <MapPin className="w-4 h-4 mr-2" />
                        {hotel.city}, {hotel.location.country}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}