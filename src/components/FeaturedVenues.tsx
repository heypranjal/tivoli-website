import React, { useState } from 'react';
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getVenueThumbnail } from '@/utils/image-catalog';

// Function to get proper route for each venue in Featured Venues
const getFeaturedVenueRoute = (venue: any): string => {
  const venueRoutes: Record<string, string> = {
    // Tivoli Properties
    'tivoli-grand-palace': '/delhi/tivoli-grand-palace',
    'tivoli-royal-suite': '/palwal-haryana/tivoli-royal-palace', 
    'tivoli-lake-palace': '/rewari-haryana/tivoli-heritage-palace',
    'tivoli-riviera-palace': '/delhi/bijwasan',
    'tivoli-mountain-resort': '/delhi/royal-court-okhla',
    'tivoli-beach-villa': '/noida/tivoli-lotus-court',
    // Upper HSE Properties
    'upper-1': '/delhi/upper-hse-sultanpur',
    // Wedcation Properties  
    'w1': '/ambala/wedcation-ambala',
    'w2': '/israna/wedcation-israna',
    // Omnia Properties
    'o1': '/delhi/omnia-dwarka-expressway',
    'o2': '/greater-noida/omnia-greater-noida',
  };
  
  return venueRoutes[venue.id] || '#';
};

// Extend the existing venues array with more items
const venues = [
  // TIVOLI Properties
  {
    id: 'tivoli-grand-palace',
    name: 'The Tivoli',
    location: 'Delhi',
    image: getVenueThumbnail('tivoli-grand-palace'),
    brand: 'tivoli'
  },
  {
    id: 'tivoli-royal-suite',
    name: 'Tivoli Royal Palace',
    location: 'Palwal-Haryana',
    image: getVenueThumbnail('tivoli-royal-palace'),
    brand: 'tivoli'
  },
  {
    id: 'tivoli-lake-palace',
    name: 'Tivoli Heritage Palalce',
    location: 'Rewari-Haryana',
    image: getVenueThumbnail('tivoli-heritage-palace'),
    brand: 'tivoli'
  },
  {
    id: 'tivoli-riviera-palace',
    name: 'Tivoli Bijwasan',
    location: 'Delhi',
    image: getVenueThumbnail('tivoli-bijwasan'),
    brand: 'tivoli'
  },
  {
    id: 'tivoli-mountain-resort',
    name: 'Tivoli Royal Court-Okhla',
    location: 'Delhi',
    image: getVenueThumbnail('tivoli-royal-court'),
    brand: 'tivoli'
  },
  {
    id: 'tivoli-beach-villa',
    name: 'Tivoli Lotus Court-Noida',
    location: 'Noida',
    image: getVenueThumbnail('tivoli-lotus-court'),
    brand: 'tivoli'
  },
  // THE UPPER HSE Properties
  {
    id: 'upper-1',
    name: 'The Upper HSE by Tivoli-Sultanpur',
    location: 'Delhi',
    image: getVenueThumbnail('upper-hse-sultanpur'),
    brand: 'upper-hse'
  },
  
  // WEDCATION Properties
  {
    id: 'w1',
    name: 'Wedcation by Tivoli-Ambala',
    location: 'Ambala',
    image: 'https://pbkxpylwatscfjzbmwur.supabase.co/storage/v1/object/public/homepage_image//ambala-wedcation-hp-thumbnail.JPG',
    brand: 'wedcation'
  },
  {
    id: 'w2',
    name: 'Wedcation by Tivoli-Israna',
    location: 'Israna',
    image: 'https://pbkxpylwatscfjzbmwur.supabase.co/storage/v1/object/public/homepage_image//Israna-Wedcation-hp-thumbnail.jpg',
    brand: 'wedcation'
  },
  
  // OMNIA Properties
  {
    id: 'o1',
    name: 'Omnia by Tivoli-Dwarka Expressway',
    location: 'Delhi',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    brand: 'omnia'
  },
  {
    id: 'o2',
    name: 'Omnia by Tivoli-Noida',
    location: 'Noida',
    image: 'https://pbkxpylwatscfjzbmwur.supabase.co/storage/v1/object/public/homepage_image//omnia-noida-hp-thumbnail.jpg',
    brand: 'omnia'
  },
  {
    id: 'o3',
    name: 'Omnia by Tivoli-Greater Noida',
    location: 'Abu Dhabi, UAE',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    brand: 'omnia'
  }
];

const brands = [
  { id: 'tivoli', name: 'THE TIVOLI', description: 'Timeless Luxury & Sophistication' },
  { id: 'wedcation', name: 'WEDCATION', description: 'Extraordinary Venues for Unforgettable Moments' },
  { id: 'upper-hse', name: 'THE UPPER HSE', description: 'Elevated Living, Refined Experiences' },
  { id: 'omnia', name: 'OMNIA', description: 'Where Nature Meets Opulence' }
];

export default function FeaturedVenues() {
  const [activeBrand, setActiveBrand] = useState('tivoli');
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const itemsPerPage = 3;

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredVenues = venues.filter(venue => venue.brand === activeBrand);
  const totalPages = Math.ceil(filteredVenues.length / itemsPerPage);
  
  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };
  
  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };
  
  const currentVenues = filteredVenues.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <section className="py-6 md:py-12">
      <div className="container mx-auto px-4">
        {/* Decorative Golden Lines */}
        <div className="flex items-center justify-center mb-4 md:mb-6">
          <div className="w-12 h-[1px] bg-[#CD9F59]" />
          <div className="w-2 h-2 rotate-45 border border-[#CD9F59] mx-3" />
          <div className="w-12 h-[1px] bg-[#CD9F59]" />
        </div>

        <h2 className="font-serif text-3xl md:text-4xl text-center mb-2 text-neutral-700">Our Hotels</h2>
        <p className="elegant-text text-center max-w-2xl mx-auto mb-6">
          Discover our collection of extraordinary destinations, where every moment becomes a cherished memory
        </p>

        {/* Brand Tabs */}
        <div className="flex justify-center mb-4 px-4 md:px-0">
          <div className="w-full max-w-full md:max-w-fit overflow-x-auto scrollbar-hide">
            <div className="inline-flex border-b border-neutral-200 min-w-full md:min-w-0 pb-1">
              {brands.map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => setActiveBrand(brand.id)}
                  className={`px-4 md:px-6 py-2 text-sm tracking-widest font-sans transition-all duration-300 relative whitespace-nowrap
                    ${activeBrand === brand.id 
                      ? 'text-[#CD9F59] font-medium' 
                      : 'text-neutral-400 hover:text-neutral-600'
                    }`}
                >
                  {brand.name}
                  {activeBrand === brand.id && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#CD9F59]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Brand Description */}
        <div className="text-center mb-6">
          <p className="text-neutral-600 font-serif text-base">
            {brands.find(b => b.id === activeBrand)?.description}
          </p>
        </div>

        {/* Venues Grid with Hover Overlay */}
        <div className="relative px-2 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {currentVenues.map((venue) => (
              <Link 
                key={venue.id} 
                to={getFeaturedVenueRoute(venue)}
                className="group cursor-pointer block"
              >
                <div className="relative overflow-hidden mb-2 md:mb-3 rounded-lg shadow-lg aspect-[4/5]">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 transition-opacity duration-700 group-hover:bg-black/50" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="px-6 py-2 bg-white/95 text-neutral-900 text-sm uppercase tracking-wider hover:bg-white transition-colors rounded-lg">
                      Explore
                    </span>
                  </div>
                </div>
                <h3 className="font-serif text-lg md:text-xl text-neutral-800 mb-1 group-hover:text-[#CD9F59] transition-colors">
                  {venue.name}
                </h3>
                <p className="elegant-text flex items-center text-sm">
                  <MapPin className="w-3 h-3 mr-1" />
                  {venue.location}
                </p>
              </Link>
            ))}
          </div>
          
          {/* Carousel Navigation Buttons */}
          {!isMobile && (
            <>
              <button 
                onClick={handlePrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#CD9F59] hover:bg-[#B88D47] text-white p-2 rounded-full transition-colors shadow-lg z-10"
                aria-label="Previous venues"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#CD9F59] hover:bg-[#B88D47] text-white p-2 rounded-full transition-colors shadow-lg z-10"
                aria-label="Next venues"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
          
          {/* Page Indicators */}
          <div className="absolute -bottom-4 md:-bottom-6 left-1/2 -translate-x-1/2 flex space-x-1">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  currentPage === index ? 'bg-[#CD9F59]' : 'bg-neutral-300'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}