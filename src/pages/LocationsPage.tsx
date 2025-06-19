import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { hotels } from '@/data/hotels';

// Group hotels by location and brand
const groupedHotels = hotels.reduce((acc, hotel) => {
  const location = hotel.location.toLowerCase();
  const brand = hotel.brand.toLowerCase();
  
  if (!acc[location]) {
    acc[location] = {};
  }
  
  if (!acc[location][brand]) {
    acc[location][brand] = [];
  }
  
  acc[location][brand].push(hotel);
  return acc;
}, {} as Record<string, Record<string, typeof hotels>>);

const brands = {
  tivoli: 'THE TIVOLI',
  'upper-hse': 'THE UPPER HSE',
  wedcation: 'WEDCATION',
  omnia: 'OMNIA'
};

// Define locations array from grouped hotels
const locationsList = [
  { id: 'delhi', name: 'Delhi' }, 
  { id: 'noida', name: 'Noida' }, 
  { id: 'greater-noida', name: 'Greater Noida' }, 
  { id: 'ambala', name: 'Ambala' }, 
  { id: 'israna', name: 'Israna' }, 
  { id: 'palwal-haryana', name: 'Palwal Haryana' }, 
  { id: 'rewari-haryana', name: 'Rewari Haryana' }
];

export default function LocationsPage() {
  const { brand, location: locationParam } = useParams();
  const locationPath = useLocation();
  const [activeLocation, setActiveLocation] = useState(locationParam || 'delhi');
  const [activeBrand, setActiveBrand] = useState(brand || 'all');
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const itemsPerPage = 3;

  useEffect(() => {
    const checkLayout = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkLayout();
    window.addEventListener('resize', checkLayout);
    return () => window.removeEventListener('resize', checkLayout);
  }, []);

  useEffect(() => {
    if (locationParam) {
      setActiveLocation(locationParam);
    }
    if (brand) {
      setActiveBrand(brand);
    }
  }, [locationParam, brand]);

  const filteredHotels = hotels.filter(hotel => {
    const locationMatch = activeLocation === 'all' || hotel.location.toLowerCase() === activeLocation;
    const brandMatch = activeBrand === 'all' || hotel.brand.toLowerCase() === activeBrand;
    return locationMatch && brandMatch;
  });

  const totalPages = Math.ceil(filteredHotels.length / itemsPerPage);
  
  const handlePrevious = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };
  
  const handleNext = () => {
    setCurrentPage(prev => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-[#001d3d]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photos/brown-wooden-house-on-blue-water-under-blue-sky-during-daytime-egCye6ngbmA')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <span className="text-sm uppercase tracking-[0.2em] text-[#CD9F59] font-sans mb-4 block">
              {brand ? brands[brand as keyof typeof brands] : 'Discover Our Properties'}
            </span>
            <h1 className="font-serif text-3xl md:text-4xl mb-4 text-white">Our Locations</h1>
            <p className="text-white/80 text-sm md:text-base max-w-2xl mx-auto">
              Discover our collection of luxury hotels and resorts across prestigious destinations
            </p>
          </div>
        </div>
      </div>

      {/* Locations Content */}
      <div className="container mx-auto px-4 py-20">
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
              {Object.entries(brands).map(([id, name]) => (
                <button
                  key={id}
                  onClick={() => setActiveBrand(id)}
                  className={`px-4 md:px-8 py-2 text-sm tracking-widest font-sans transition-all duration-300 relative whitespace-nowrap
                    ${activeBrand === id 
                      ? 'text-[#CD9F59] font-medium' 
                      : 'text-neutral-400'
                    }`}
                >
                  {name}
                  {activeBrand === id && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#CD9F59]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-6 md:mb-10 px-4 md:px-0">
          <div className="w-full max-w-full md:max-w-fit overflow-x-auto scrollbar-hide">
            <div className="inline-flex border-b border-neutral-200 min-w-max pb-1">
              <button
                onClick={() => setActiveLocation('all')}
                className={`px-4 md:px-8 py-2 text-sm tracking-widest font-sans transition-all duration-300 relative whitespace-nowrap
                  ${activeLocation === 'all' 
                    ? 'text-[#CD9F59] font-medium' 
                    : 'text-neutral-400'
                  }`}
              >
                ALL LOCATIONS
                {activeLocation === 'all' && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#CD9F59]" />
                )}
              </button>
              {locationsList.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setActiveLocation(loc.id)}
                  className={`px-4 md:px-8 py-2 text-sm tracking-widest font-sans transition-all duration-300 relative whitespace-nowrap
                    ${activeLocation === loc.id 
                      ? 'text-[#CD9F59] font-medium' 
                      : 'text-neutral-400'
                    }`}
                >
                  {loc.name.toUpperCase()}
                  {activeLocation === loc.id && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#CD9F59]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Venues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {filteredHotels.map((hotel) => (
            <Link key={hotel.id} to={
              hotel.id === 'omnia-dwarka' 
                ? '/delhi/omnia-dwarka-expressway'
                : `/${hotel.location.toLowerCase()}/${hotel.slug}`
            } className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg shadow-lg aspect-[4/3] mb-4">
                <img
                  src={hotel.images[0]}
                  alt={hotel.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/50">
                  <button className="px-6 py-2 bg-white/95 text-neutral-900 text-sm uppercase tracking-wider hover:bg-white transition-colors rounded-lg">
                    View Details
                  </button>
                </div>
              </div>
              <h3 className="font-serif text-xl text-neutral-800 mb-2 group-hover:text-[#CD9F59] transition-colors">
                {hotel.name}
              </h3>
              <div className="flex items-center justify-between">
                <p className="flex items-center text-neutral-600 text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  {hotel.address.city}, {hotel.address.country}
                </p> 
                <span className="text-xs uppercase tracking-wider text-[#CD9F59] font-sans">
                  {brands[hotel.brand.toLowerCase() as keyof typeof brands]}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredHotels.length === 0 && 
          <div className="text-center py-16 bg-neutral-50 rounded-lg">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-100 flex items-center justify-center">
              <MapPin className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="font-serif text-xl text-neutral-700 mb-2">No Properties Found</h3>
            <p className="text-neutral-500 max-w-md mx-auto">
              We couldn't find any properties matching your current filters. Please try different criteria.
            </p>
          </div>
        }
      </div>
    </div>
  );
}