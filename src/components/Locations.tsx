import React, { useState } from 'react';
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';


const locations = [
  { id: 'delhi', name: 'Delhi' }, 
  { id: 'noida', name: 'Noida' }, 
  { id: 'greater-noida', name: 'Greater Noida' },
  { id: 'ambala', name: 'Ambala' }, 
  { id: 'israna', name: 'Israna' }
];

// Function to get proper route for each venue
const getVenueRoute = (venue: { id: string }): string => {
  // Map venue IDs to their correct routes based on App.tsx routing
  const venueRoutes: Record<string, string> = {
    'delhi-1': '/delhi/tivoli-grand-palace', // The Tivoli-New Delhi
    'delhi-2': '/delhi/upper-hse-sultanpur', // Upper HSE Sultanpur  
    'delhi-3': '/delhi/tivoli-bijwasan', // Tivoli Bijwasan
    'delhi-4': '/delhi/royal-court-okhla', // Tivoli Royal Court-Okhla
    'delhi-5': '/rewari-haryana/tivoli-lake-palace', // Tivoli Heritage Palace-Rewari
    'noida-1': '/noida/tivoli-lotus-court', // Tivoli Lotus Court-Noida
    'noida-2': '/noida/omnia-noida', // Omnia by Tivoli-Noida
    'greater-noida-1': '/greater-noida/omnia-greater-noida', // Omnia Greater Noida
    'ambala-1': '/ambala/wedcation-ambala', // Wedcation Ambala
    'israna-1': '/israna/wedcation-israna', // Wedcation Israna
  };
  
  return venueRoutes[venue.id] || '#';
};

// Using the same venues data but with updated locations
const venues = [
  {
    id: 'delhi-1',
    name: 'The Tivoli-New Delhi',
    location: 'Delhi',
    image: 'https://pbkxpylwatscfjzbmwur.supabase.co/storage/v1/object/public/homepage_image//swimmingpool_thetivoli.jpg',
    brand: 'tivoli'
  },
  {
    id: 'delhi-2',
    name: 'The Upper HSE by Tivoli-Sultanpur',
    location: 'Delhi',
    image: 'https://pbkxpylwatscfjzbmwur.supabase.co/storage/v1/object/public/homepage_image//sultanpur-upperhse-hp-thumbnail.jpg',
    brand: 'tivoli'
  },
  {
    id: 'delhi-3',
    name: 'Tivoli Bijwasan',
    location: 'Delhi',
    image: 'https://pbkxpylwatscfjzbmwur.supabase.co/storage/v1/object/public/homepage_image//bijwasan-hp-thumbnail.jpg',
    brand: 'tivoli'
  },
  {
    id: 'delhi-4',
    name: 'Tivoli Royal Court-Okhla',
    location: 'Delhi',
    image: 'https://pbkxpylwatscfjzbmwur.supabase.co/storage/v1/object/public/homepage_image//RoyalCourt-hp-thumbnail.jpg',
    brand: 'tivoli'
  },
  {
    id: 'delhi-5',
    name: 'Tivoli Heritage Palace-Rewari',
    location: 'Delhi',
    image: 'https://pbkxpylwatscfjzbmwur.supabase.co/storage/v1/object/public/homepage_image//heritage-hp-thumbnail.jpg',
    brand: 'tivoli'
  },
  {
    id: 'noida-1',
    name: 'Tivoli Lotus Court-Noida',
    location: 'Noida',
    image: 'https://pbkxpylwatscfjzbmwur.supabase.co/storage/v1/object/public/homepage_image//lotuscourt-hp-thumbnail.webp',
    brand: 'tivoli'
  },
  {
    id: 'noida-2',
    name: 'Omnia by Tivoli-Noida',
    location: 'Noida', 
    image: 'https://pbkxpylwatscfjzbmwur.supabase.co/storage/v1/object/public/homepage_image//omnia-noida-hp-thumbnail.jpg',
    brand: 'omnia'
  },
  {
    id: 'greater-noida-1',
    name: 'Omnia by Tivoli-Greater Noida',
    location: 'Greater Noida',
    image: 'https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    brand: 'omnia'
  },
  
  {
    id: 'ambala-1',
    name: 'Wedcation by Tivoli-Ambala',
    location: 'Ambala',
    image: 'https://pbkxpylwatscfjzbmwur.supabase.co/storage/v1/object/public/homepage_image//ambala-wedcation-hp-thumbnail.JPG',
    brand: 'wedcation'
  },
  
  {
    id: 'israna-1',
    name: 'Wedcation by Tivoli-Israna',
    location: 'Israna',
    image: 'https://pbkxpylwatscfjzbmwur.supabase.co/storage/v1/object/public/homepage_image//Israna-Wedcation-hp-thumbnail.jpg',
    brand: 'wedcation'
  },
  
];

export default function Locations() {
  const [activeLocation, setActiveLocation] = useState('delhi');
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const itemsPerPage = 3;

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredVenues = venues.filter(venue => venue.location.toLowerCase() === activeLocation);
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
    <section className="py-6 md:py-12 bg-neutral-50 relative">
      {/* Decorative Golden Pattern */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#CD9F59]/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#CD9F59]/30 to-transparent" />
      <div className="container mx-auto px-4 md:px-12">
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-10">
          {/* Decorative Crown Element */}
          <div className="flex items-center justify-center mb-4 md:mb-6">
            <div className="w-10 h-[1px] bg-[#CD9F59]/40 transform -rotate-45" />
            <div className="w-2 h-2 bg-[#CD9F59] mx-2 transform rotate-45" />
            <div className="w-10 h-[1px] bg-[#CD9F59]/40 transform rotate-45" />
          </div>
          <span className="text-sm uppercase tracking-[0.2em] text-[#CD9F59] font-sans mb-2 block">
            Discover Our Properties
          </span>
          <h2 className="font-serif text-3xl md:text-4xl mb-3 text-neutral-600">Our Locations</h2>
          <p className="elegant-text text-sm md:text-base">
            Experience luxury across India's most prestigious destinations
          </p>
        </div>

        {/* Location Tabs */}
        <div className="flex justify-center mb-6 md:mb-10 px-4 md:px-0">
          <div className="w-full max-w-full md:max-w-fit overflow-x-auto scrollbar-hide">
            <div className="inline-flex border-b border-neutral-200 min-w-full md:min-w-0 pb-1">
            {locations.map((location) => (
              <button
                key={location.id}
                onClick={() => setActiveLocation(location.id)}
                className={`px-4 md:px-8 py-2 text-sm tracking-widest font-sans transition-all duration-300 relative whitespace-nowrap
                  ${activeLocation === location.id 
                    ? 'text-[#CD9F59] font-medium' 
                    : 'text-neutral-400 hover:text-neutral-600'
                  }`}
              >
                {location.name}
                {activeLocation === location.id && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#CD9F59]" />
                )}
              </button>
            ))}
            </div>
          </div>
        </div>

        {/* Venues Grid */}
        <div className="relative px-2 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {currentVenues.map((venue) => (
            <Link 
              key={venue.id} 
              to={getVenueRoute(venue)}
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
                    View Details
                  </span>
                </div>
              </div>
              <h3 className="font-serif text-base md:text-lg text-neutral-800 mb-1 group-hover:text-[#CD9F59] transition-colors">
                {venue.name}
              </h3>
              <div className="flex items-center justify-between">
                <p className="elegant-text flex items-center text-sm">
                  <MapPin className="w-3 h-3 mr-1" />
                  {venue.location}
                </p>
                <span className="text-xs uppercase tracking-wider text-[#CD9F59] font-sans">
                  {venue.brand}
                </span>
              </div>
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