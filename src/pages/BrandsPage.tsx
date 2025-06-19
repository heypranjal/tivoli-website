import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Crown, Star, Heart, Sparkles } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { hotels } from '@/data/hotels';

// Group hotels by brand
const groupedHotels = hotels.reduce((acc, hotel) => {
  const brand = hotel.brand.toLowerCase();
  if (!acc[brand]) {
    acc[brand] = [];
  }
  acc[brand].push(hotel);
  return acc;
}, {} as Record<string, typeof hotels>);

const brandInfo = {
  tivoli: {
    name: 'THE TIVOLI',
    description: 'Timeless Luxury & Sophistication',
    longDescription: 'Experience the epitome of luxury hospitality with our flagship brand. Each Tivoli property is a masterpiece of architectural elegance and refined service.',
    icon: Crown,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    color: '#CD9F59'
  },
  'upper-hse': {
    name: 'THE UPPER HSE',
    description: 'Elevated Living, Refined Experiences',
    longDescription: 'Modern luxury meets sophisticated design in our Upper HSE collection. Perfect for the discerning traveler who appreciates contemporary elegance.',
    icon: Star,
    image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
    color: '#1E3A8A'
  },
  wedcation: {
    name: 'WEDCATION',
    description: 'Extraordinary Venues for Unforgettable Moments',
    longDescription: 'Curated specifically for celebrations and romantic getaways, our Wedcation properties offer enchanting settings for life\'s most precious moments.',
    icon: Heart,
    image: 'https://images.unsplash.com/photo-1464808322410-1a934aab61e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    color: '#BE185D'
  },
  omnia: {
    name: 'OMNIA',
    description: 'Where Nature Meets Opulence',
    longDescription: 'Discover the perfect harmony of natural beauty and luxurious comfort in our Omnia collection, featuring stunning properties in breathtaking locations.',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    color: '#047857'
  }
};

export default function BrandsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-[#001d3d]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] opacity-20" />
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
        {Object.entries(brandInfo).map(([brandId, brand], index) => {
          const IconComponent = brand.icon;
          const hotels = groupedHotels[brandId] || [];
          const isEven = index % 2 === 0;

          return (
            <div key={brandId} className="mb-32 last:mb-0">
              {/* Brand Header */}
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center ${isEven ? '' : 'md:flex-row-reverse'}`}>
                <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ${isEven ? '' : 'md:order-2'}`}>
                  <img
                    src={brand.image}
                    alt={brand.name}
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
                      {brand.name}
                    </h2>
                    <div className="w-20 h-1" style={{ backgroundColor: brand.color }} />
                  </div>
                  <p className="text-xl font-serif text-neutral-600 mb-4">
                    {brand.description}
                  </p>
                  <p className="text-neutral-600 leading-relaxed">
                    {brand.longDescription}
                  </p>
                </div>
              </div>

              {/* Hotels Grid */}
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                {hotels.map((hotel) => (
                  <Link
                    key={hotel.id}
                    to={`/${brandId}/${hotel.slug}`}
                    className="group"
                  >
                    <div className="relative overflow-hidden rounded-lg shadow-lg aspect-[4/3] mb-4">
                      <img
                        src={hotel.images[0]}
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
                      {hotel.address.city}, {hotel.address.country}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}