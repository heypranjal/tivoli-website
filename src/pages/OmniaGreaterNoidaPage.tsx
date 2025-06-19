/**
 * OmniaGreaterNoidaPage Component
 * Displays detailed information about Omnia by Tivoli - Greater Noida
 */
import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { MapPin, Phone, Mail, Star, Users, Calendar, Share2, Heart, Wifi, School, Dumbbell, Utensils, Car, Wine, Space, Coffee, ChevronLeft, ChevronRight, Flame, Wind, Music, Tv, Armchair as Wheelchair, Sprout, Clock } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { hotels } from '@/data/hotels';
import VenueBookingForm from '@/components/VenueBookingForm';
import HotelBookingWidget from '@/components/HotelBookingWidget';

const amenityIcons = {
  Wifi,
  Pool: School,
  Dumbbell,
  Utensils,
  Car,
  Wine,
  Spa: Space,
  Coffee
};

export default function OmniaGreaterNoidaPage() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const checkLayout = () => {
      setIsMobile(window.innerWidth < 768);
      setIsPortrait(window.innerHeight > window.innerWidth);
    };
    checkLayout();
    window.addEventListener('resize', checkLayout);
    return () => window.removeEventListener('resize', checkLayout);
  }, []);

  // Find hotel by slug
  const hotel = hotels.find(h => h.id === 'omnia-greater-noida');

  // If no hotel found, redirect to home
  if (!hotel) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="container mx-auto px-4 pt-20 md:pt-24 relative ml-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Main Image */}
          <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
            <img
              src={hotel.images[0]}
              alt={hotel.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
          </div>
          
          {/* Secondary Images Grid */}
          <div className="grid grid-cols-2 gap-4">
            {hotel.images.slice(1, 5).map((image, index) => (
              <div key={index} className="relative h-[190px] md:h-[240px] rounded-lg overflow-hidden border border-neutral-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                <img
                  src={image}
                  alt={`${hotel.name} - ${index + 2}`}
                  className="w-full h-full object-cover"
                />
                {index === 3 && hotel.images.length > 5 && (
                  <button
                    onClick={() => setShowAllImages(true)}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-medium"
                  >
                    +{hotel.images.length - 5} More
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Hotel Title Section */}
        <div className={`flex justify-between items-start gap-8 ${isMobile ? 'flex-col' : ''}`}>
          <div className="flex-1 space-y-8">
            <h1 className="font-serif text-3xl md:text-4xl text-neutral-800 mb-2">{hotel.name}</h1> 
            <div className="flex items-center gap-4">
              <p className="flex items-center text-neutral-600">
                <MapPin className="w-4 h-4 mr-1" />
                {hotel.address.city}, {hotel.address.country}
              </p>
              <button className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                <Share2 className="w-5 h-5 text-neutral-600" />
              </button>
              <button 
                className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                onClick={() => setIsWishlist(!isWishlist)}
              >
                <Heart className={`w-5 h-5 ${isWishlist ? 'fill-[#CD9F59] text-[#CD9F59]' : 'text-neutral-600'}`} />
              </button>
            </div>

            <div>
              <h3 className="font-serif text-xl text-neutral-800 mb-4">Key Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {hotel.amenities.slice(0, 8).map((amenity) => {
                  const IconComponent = amenityIcons[amenity.icon as keyof typeof amenityIcons];
                  return (
                    <div key={amenity.id} className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#CD9F59]/10 flex items-center justify-center">
                        <IconComponent className="w-4 h-4 text-[#CD9F59]" />
                      </div>
                      <span className="text-neutral-600 text-xs">{amenity.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Highlights Section */}
            <div className="mt-8">
              <h3 className="font-serif text-xl text-neutral-800 mb-4">Hotel Highlights</h3>
              <div className="bg-neutral-50 rounded-lg p-6">
                <p className="text-neutral-600 leading-relaxed">
                  Experience contemporary luxury at {hotel.name}, where modern sophistication 
                  meets urban comfort. Our venue offers spectacular spaces for business meetings, 
                  social gatherings, and unforgettable stays in the heart of Greater Noida.
                </p>
              </div>
            </div>

            {/* Luxury Experiences Section */}
            <section className="py-6 md:py-12">
              <div className="text-center mb-8">
                <span className="text-sm uppercase tracking-[0.2em] text-[#CD9F59] font-sans mb-2 block">
                  Urban Experiences
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-neutral-800 mb-4">
                  Contemporary Luxury
                </h2>
                <p className="text-neutral-600 max-w-2xl mx-auto">
                  Discover a world of modern refinement and sophisticated experiences
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Rooftop Lounge */}
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                      alt="Rooftop Lounge"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
                    <div className="absolute inset-x-6 bottom-6 text-white">
                      <h3 className="font-serif text-xl mb-2">Rooftop Lounge</h3>
                      <p className="text-sm text-white/90">Panoramic city views and sophisticated ambiance</p>
                    </div>
                  </div>
                </div>

                {/* Business Center */}
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                      alt="Business Center"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
                    <div className="absolute inset-x-6 bottom-6 text-white">
                      <h3 className="font-serif text-xl mb-2">Business Center</h3>
                      <p className="text-sm text-white/90">State-of-the-art facilities for corporate needs</p>
                    </div>
                  </div>
                </div>

                {/* Infinity Pool */}
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80"
                      alt="Infinity Pool"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
                    <div className="absolute inset-x-6 bottom-6 text-white">
                      <h3 className="font-serif text-xl mb-2">Infinity Pool</h3>
                      <p className="text-sm text-white/90">Rooftop swimming with stunning city views</p>
                    </div>
                  </div>
                </div>

                {/* Fine Dining */}
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                      alt="Fine Dining"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
                    <div className="absolute inset-x-6 bottom-6 text-white">
                      <h3 className="font-serif text-xl mb-2">Fine Dining</h3>
                      <p className="text-sm text-white/90">Contemporary cuisine with a global perspective</p>
                    </div>
                  </div>
                </div>

                {/* Urban Spa */}
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                      alt="Urban Spa"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
                    <div className="absolute inset-x-6 bottom-6 text-white">
                      <h3 className="font-serif text-xl mb-2">Urban Spa</h3>
                      <p className="text-sm text-white/90">Modern wellness treatments and relaxation</p>
                    </div>
                  </div>
                </div>

                {/* Event Spaces */}
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2098&q=80"
                      alt="Event Spaces"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
                    <div className="absolute inset-x-6 bottom-6 text-white">
                      <h3 className="font-serif text-xl mb-2">Event Spaces</h3>
                      <p className="text-sm text-white/90">Versatile venues for memorable occasions</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          
          <div className={`${isMobile ? 'w-full' : 'w-[400px]'} relative`}>
            <HotelBookingWidget
              price={hotel.rooms[0].price.amount}
              roomCount={9}
              isMobile={isMobile}
              isPortrait={isPortrait}
            />
          </div>
        </div>

        <hr className="border-b border-[#CD9F59]/20 my-12" />
          
        {/* Main Content */}
        <div className="container mx-auto px-4 py-20">
          {/* Dining */}
          <div className="mb-20">
            <h2 className="font-serif text-3xl text-neutral-800 mb-12 text-center">
              Dining
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {hotel.dining.map((restaurant) => (
                <div key={restaurant.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="relative h-64">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-2xl text-neutral-800 mb-2">
                      {restaurant.name}
                    </h3>
                    <p className="text-neutral-600 mb-4">
                      {restaurant.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-neutral-500">Cuisine:</span>
                        <p className="font-medium">{restaurant.cuisine}</p>
                      </div>
                      <div>
                        <span className="text-neutral-500">Hours:</span>
                        <p className="font-medium">{restaurant.hours}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact & Location */}
          <div>
            <h2 className="font-serif text-3xl text-neutral-800 mb-12 text-center">
              Contact & Location
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="font-serif text-2xl text-neutral-800 mb-6">
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <a href={`tel:${hotel.contact.phone}`} className="flex items-center text-neutral-600 hover:text-[#CD9F59] transition-colors">
                      <Phone className="w-5 h-5 mr-3" />
                      <span>{hotel.contact.phone}</span>
                    </a>
                    <a href={`mailto:${hotel.contact.email}`} className="flex items-center text-neutral-600 hover:text-[#CD9F59] transition-colors">
                      <Mail className="w-5 h-5 mr-3" />
                      <span>{hotel.contact.email}</span>
                    </a>
                    <div className="flex items-start text-neutral-600">
                      <MapPin className="w-5 h-5 mr-3 mt-1" />
                      <div>
                        <p>{hotel.address.street}</p>
                        <p>{hotel.address.city}, {hotel.address.state} {hotel.address.postalCode}</p>
                        <p>{hotel.address.country}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="font-serif text-2xl text-neutral-800 mb-6">
                  Location Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start text-neutral-600">
                    <MapPin className="w-5 h-5 mr-3 mt-1" />
                    <div>
                      <p className="font-medium mb-2">Getting Here</p>
                      <p>Located in {hotel.address.city}, our hotel is easily accessible from major transportation hubs.</p>
                      <p className="mt-2">Coordinates: {hotel.address.coordinates.lat}, {hotel.address.coordinates.lng}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}