/**
 * TivoliRoyalPalacePage Component
 * Displays detailed information about Tivoli Royal Palace-Palwal
 * 
 * Changes:
 * - Added missing Clock icon import from lucide-react
 * - Fixed component name from WedcationAmbalaPage to TivoliRoyalPalacePage
 * - Fixed array syntax error by adding missing comma between image URLs
 * - Fixed missing closing h2 tag in dining section
 * - Updated address to "Satya Sai Heart Hospital, Bhagola NH-2 Besides NH-19, Palwal, Haryana, 121102, India"
 * - Fixed unclosed div tag in venue-booking-form section
 */
import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { MapPin, Phone, Mail, Star, Users, Calendar, Share2, Heart, Signal, School, Dumbbell, Utensils, Car, Wine, Space, Coffee, ChevronLeft, ChevronRight, Flame, Wind, Music, Tv, Armchair as Wheelchair, Sprout, Clock, ExternalLink, Play, Eye, Camera } from 'lucide-react';
import Navigation from '@/components/Navigation';
import VenueBookingForm from '@/components/VenueBookingForm';
import { hotels } from '@/data/hotels';

const amenityIcons = {
  Wifi: Signal,
  Pool: School,
  Dumbbell,
  Utensils,
  Car,
  Wine,
  Spa: Space,
  Coffee
};


export default function TivoliRoyalPalacePage() {
  const [isWishlist, setIsWishlist] = useState(false);


  // Find hotel by slug
  const hotel = hotels.find(h => h.slug === 'tivoli-royal-suite');

  // If no hotel found, redirect to home
  if (!hotel) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="container mx-auto px-4 md:px-8 lg:px-12 pt-16 md:pt-20 relative">
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
            {[
              hotel.images[1],
              hotel.images[2],
              hotel.images[3],
              hotel.images[4]
            ].map((image, index) => (
              <div key={index} className="relative h-[190px] md:h-[240px] rounded-lg overflow-hidden border border-neutral-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                <img
                  src={image}
                  alt={`${hotel.name} - ${index + 2}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Hotel Title Section */}
        <div className="max-w-4xl mx-auto px-4 md:px-0 space-y-4">
            <h1 className="font-serif text-3xl md:text-4xl text-neutral-800 mb-2">Tivoli Royal Palace-Palwal</h1>
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
              <h3 className="font-serif text-xl text-neutral-800 mb-2">Key Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {hotel.amenities.slice(0, 8).map((amenity) => {
                  const IconComponent = amenityIcons[amenity.icon as keyof typeof amenityIcons];
                  return (
                    <div key={amenity.id} className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#CD9F59]/10 flex items-center justify-center">
                        {IconComponent ? (
                          <IconComponent className="w-4 h-4 text-[#CD9F59]" />
                        ) : (
                          <Heart className="w-4 h-4 text-[#CD9F59]" />
                        )}
                      </div>
                      <span className="text-neutral-600 text-xs">{amenity.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Highlights Section */}
            <div className="mt-4">
              <h3 className="font-serif text-xl text-neutral-800 mb-2">Hotel Highlights</h3>
              <div className="bg-neutral-50 rounded-lg p-6">
                <p className="text-neutral-600 leading-relaxed">
                  Experience luxury and elegance at {hotel.name}, where timeless sophistication 
                  meets modern comfort. Our venue offers spectacular spaces for celebrations, 
                  meetings, and unforgettable stays.
                </p>
              </div>
            </div>
        </div>

        {/* Luxury Image Gallery */}
        {/* <section className="py-6 md:py-12 bg-neutral-50">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            <div className="text-center mb-4">
              <span className="text-sm uppercase tracking-[0.2em] text-[#CD9F59] font-sans mb-2 block">
                Experience Luxury
              </span>
              <h2 className="font-serif text-2xl md:text-3xl text-neutral-800 mb-3">
                Gallery
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {galleryImages.map((image, index) => (
                <div 
                  key={index}
                  className="group relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer"
                  onClick={() => setActiveImageIndex(index)}
                >s
                  <img
                    src={image}
                    alt={`Luxury Gallery ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <span className="text-white text-sm font-medium">View Image</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Luxury Experiences Section */}
        <section className="py-6 md:py-12 bg-white">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            <div className="text-center mb-8">
              <span className="text-sm uppercase tracking-[0.2em] text-[#CD9F59] font-sans mb-2 block">
                Curated Experiences
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-neutral-800 mb-4">
                Discover Royal Luxury
              </h2>
              <p className="text-neutral-600 max-w-2xl mx-auto">
                Immerse yourself in a world of refined experiences, where every moment is crafted to perfection
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* corporate events*/}
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-4">
                  <img
                    src="https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal//corporate%20events.png"
                    alt="Luxury Spa"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
                  <div className="absolute inset-x-6 bottom-6 text-white">
                    <h3 className="font-serif text-xl mb-2">Corporate Events</h3>
                    <p className="text-sm text-white/90">Experience flawless corporate events hosted at elegant, serene retreats</p>
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
                    <h3 className="font-serif text-xl mb-2">Culinary Excellence</h3>
                    <p className="text-sm text-white/90">Exquisite dining experiences with master chefs</p>
                  </div>
                </div>
              </div>

              {/* Private Pool */}
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-4">
                  <img
                    src="https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal//swimming%20pool.jpg"
                    alt="Private Pool"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
                  <div className="absolute inset-x-6 bottom-6 text-white">
                    <h3 className="font-serif text-xl mb-2">Swimming Pool</h3>
                    <p className="text-sm text-white/90">Exclusive retreats with private pools perfect for magical poolside weddings</p>
                  </div>
                </div>
              </div>

              {/* Royal Events */}
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-4">
                  <img
                    src="https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal//Grand%20Celebrations%20(1).jpg"
                    alt="Royal Events"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
                  <div className="absolute inset-x-6 bottom-6 text-white">
                    <h3 className="font-serif text-xl mb-2">Grand Celebrations</h3>
                    <p className="text-sm text-white/90">Magnificent venues for unforgettable events</p>
                  </div>
                </div>
              </div>

              {/* Pre-Wedding rituals */}
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-4">
                  <img
                    src="https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal//pre%20wedding(Mehndi).jpg"
                    alt="Cultural Activities"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
                  <div className="absolute inset-x-6 bottom-6 text-white">
                    <h3 className="font-serif text-xl mb-2">Pre-Wedding Rituals</h3>
                    <p className="text-sm text-white/90">Traditional, joyful, colorful, sacred, festive, cultural, musical, emotional, celebratory events.</p>
                  </div>
                </div>
              </div>

              {/* Premium Rooms */}
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-4">
                  <img
                    src="https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal//floral.jpg"
                    alt="Recreation"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
                  <div className="absolute inset-x-6 bottom-6 text-white">
                    <h3 className="font-serif text-xl mb-2">45 Premium Rooms</h3>
                    <p className="text-sm text-white/90">Our property features 45 stylish Premium Rooms designed for your comfort.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Wedding at Tivoli Royal Palace */}
        <section className="py-6 md:py-12 bg-white">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            <div className="text-center mb-6">
              <span className="text-sm uppercase tracking-[0.2em] text-[#CD9F59] font-sans mb-2 block">
                Your Dream Wedding Destination
              </span>
              <h2 className="font-serif text-2xl md:text-3xl text-neutral-800 mb-3">
                Wedding at Tivoli Royal Palace
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <img
                  src="https://pbkxpylwatscfjzbmwur.supabase.co/storage/v1/object/public/homepage_image//thumbnail-royalpalace-hp.jpg"
                  alt="Tivoli Royal Palace Wedding Venue"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                      <p className="text-xs font-medium text-neutral-800">Capacity</p>
                      <p className="text-lg font-serif text-[#CD9F59]">1500 PAX</p>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                      <p className="text-xs font-medium text-neutral-800">Lawn Area</p>
                      <p className="text-lg font-serif text-[#CD9F59]">Lush Green</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-neutral-50 p-4 rounded-xl">
                    <Car className="w-6 h-6 text-[#CD9F59] mb-2" />
                    <h3 className="font-serif text-lg text-neutral-800 mb-2">Ample Parking</h3>
                    <p className="text-sm text-neutral-600">Spacious parking area for all your guests</p>
                  </div>
                  <div className="bg-neutral-50 p-4 rounded-xl">
                    <School className="w-6 h-6 text-[#CD9F59] mb-2" />
                    <h3 className="font-serif text-lg text-neutral-800 mb-2">Pool Access</h3>
                    <p className="text-sm text-neutral-600">Beautiful poolside setting for events</p>
                  </div>
                </div>
                
                <div className="bg-neutral-50 p-4 rounded-xl">
                  <Utensils className="w-6 h-6 text-[#CD9F59] mb-2" />
                  <h3 className="font-serif text-lg text-neutral-800 mb-2">Exquisite Cuisine</h3>
                  <p className="text-sm text-neutral-600">
                    Our master chefs craft personalized menus featuring both traditional delicacies 
                    and international cuisine, ensuring a memorable culinary experience for your guests.
                  </p>
                </div>
                
                <button 
                  onClick={() => document.querySelector('#venue-booking-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full py-3 bg-[#CD9F59] text-white rounded-lg hover:bg-[#B88D47] transition-colors duration-300 font-medium tracking-wide"
                >
                  Plan Your Wedding
                </button>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-b border-[#CD9F59]/20 my-8" />
          
        {/* Main Content */}
        <div className="container mx-auto px-4 md:px-8 lg:px-12 py-6 md:py-12">
          {/* Dining */}
          <div className="mb-12 max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-sm uppercase tracking-[0.2em] text-[#CD9F59] font-sans mb-2 block">
                Culinary Excellence
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-neutral-800 mb-4">
                Fine Dining
              </h2>
              <p className="text-neutral-600 max-w-2xl mx-auto">
                Experience exquisite culinary journeys crafted by our master chefs
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {hotel.dining.map((restaurant) => (
                <div key={restaurant.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
                  <div className="relative h-72 lg:h-96">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="font-serif text-2xl md:text-3xl mb-2">
                        {restaurant.name}
                      </h3>
                      <p className="text-white/90 text-sm">
                        {restaurant.description}
                      </p>
                    </div>
                  </div>
                  <div className="p-6 bg-white flex-1">
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-neutral-200">
                      <div className="flex items-center">
                        <Utensils className="w-5 h-5 text-[#CD9F59] mr-2" />
                        <span className="text-neutral-800 font-medium">{restaurant.cuisine}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-[#CD9F59] mr-2" />
                        <span className="text-neutral-800">{restaurant.hours}</span>
                      </div>
                    </div>
                    <button className="w-full py-3 border-2 border-[#CD9F59] text-[#CD9F59] rounded-lg hover:bg-[#CD9F59] hover:text-white transition-colors duration-300 font-medium tracking-wide">
                      View Menu
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cuisine & Specialties */}
          <div className="mb-20 max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-sm uppercase tracking-[0.2em] text-[#CD9F59] font-sans mb-2 block">
                Gastronomic Journey
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-neutral-800 mb-4">
                Our Culinary Heritage
              </h2>
              <p className="text-neutral-600 max-w-2xl mx-auto">
                Embark on a culinary journey through traditional flavors and contemporary innovations
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Traditional Indian Cuisine */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative h-64">
                  <img
                    src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=2036&q=80"
                    alt="Traditional Indian Cuisine"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="font-serif text-2xl mb-2">Traditional Indian Delicacies</h3>
                    <p className="text-white/90 text-sm">
                      Authentic recipes passed down through generations
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-3 text-neutral-600">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#CD9F59] rounded-full mr-3" />
                      Royal Mughlai Cuisine
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#CD9F59] rounded-full mr-3" />
                      Traditional Clay Oven Specialties
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#CD9F59] rounded-full mr-3" />
                      Regional Delicacies
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* International Flavors */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative h-64">
                  <img
                    src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                    alt="International Cuisine"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="font-serif text-2xl mb-2">International Flavors</h3>
                    <p className="text-white/90 text-sm">
                      Global cuisine crafted with local ingredients
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-3 text-neutral-600">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#CD9F59] rounded-full mr-3" />
                      Continental Specialties
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#CD9F59] rounded-full mr-3" />
                      Pan-Asian Delights
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#CD9F59] rounded-full mr-3" />
                      Mediterranean Favorites
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Culinary Highlights */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-neutral-50 p-6 rounded-xl">
                <h4 className="font-serif text-lg text-neutral-800 mb-3">Master Chefs</h4>
                <p className="text-neutral-600 text-sm">
                  Our culinary team brings decades of experience from renowned kitchens worldwide,
                  ensuring every dish meets the highest standards of excellence.
                </p>
              </div>
              
              <div className="bg-neutral-50 p-6 rounded-xl">
                <h4 className="font-serif text-lg text-neutral-800 mb-3">Fresh Ingredients</h4>
                <p className="text-neutral-600 text-sm">
                  We source the finest local and imported ingredients, working closely with trusted
                  suppliers to maintain exceptional quality in every dish.
                </p>
              </div>
              
              <div className="bg-neutral-50 p-6 rounded-xl">
                <h4 className="font-serif text-lg text-neutral-800 mb-3">Dietary Options</h4>
                <p className="text-neutral-600 text-sm">
                  Our menus accommodate various dietary preferences with vegetarian, vegan,
                  and gluten-free options crafted with the same attention to detail.
                </p>
              </div>
            </div>
          </div>

          {/* Contact & Location */}
          <div id="venue-booking-form">
            <VenueBookingForm />
          </div>
        </div>
      </div>
    </div>
  );
}