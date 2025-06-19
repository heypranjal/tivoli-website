/**
 * TivoliGrandPalacePage Component
 * Comprehensive detail page for The Tivoli Grand Palace
 * Features: Spalba 3D tour, dining options, event spaces, amenities, gallery
 */
import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { MapPin, Phone, Mail, Star, Users, Calendar, Share2, Heart, Wifi, School, Dumbbell, Utensils, Car, Wine, Space, Coffee, ChevronLeft, ChevronRight, Flame, Wind, Music, Tv, Armchair as Wheelchair, Sprout, Clock, ExternalLink, Play, Eye, Camera } from 'lucide-react';
import Navigation from '@/components/Navigation';
import VenueBookingForm from '@/components/VenueBookingForm';
import { hotels } from '@/data/hotels';

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

// Gallery images for The Tivoli - Updated with working URLs
const galleryImages = [
  'https://pbkxpylwatscfjzbmwur.supabase.co/storage/v1/object/public/homepage_image//maingate_thetivoli.jpg',
  'https://pbkxpylwatscfjzbmwur.supabase.co/storage/v1/object/public/homepage_image//foodblue_thetivoli.jpg',
  'https://pbkxpylwatscfjzbmwur.supabase.co/storage/v1/object/public/homepage_image//banquet.jpg',
  'https://pbkxpylwatscfjzbmwur.supabase.co/storage/v1/object/public/homepage_image//delhi-hp.jpg',
  'https://pbkxpylwatscfjzbmwur.supabase.co/storage/v1/object/public/homepage_image//wedding.jpg',
  'https://pbkxpylwatscfjzbmwur.supabase.co/storage/v1/object/public/homepage_image//cocktail-aprty.jpg',
  'https://pbkxpylwatscfjzbmwur.supabase.co/storage/v1/object/public/homepage_image//corporate-hp.jpg',
  'https://pbkxpylwatscfjzbmwur.supabase.co/storage/v1/object/public/homepage_image//spa.jpg'
];

// Dining venues at The Tivoli - Updated with actual venue data
const diningVenues = [
  {
    id: 'blue-grotto',
    name: 'Blue Grotto',
    description: 'Exquisite Pan-Asian cuisine in an elegant underwater-themed setting with fresh seafood and signature cocktails',
    cuisine: 'Pan-Asian',
    hours: '12:30 PM - 11:30 PM',
    dressCode: 'Smart Casual',
    image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/dining-venues/blue grotto.webp'
  },
  {
    id: 'zuun',
    name: 'Zuun',
    description: 'Contemporary Pan-Asian fusion restaurant offering innovative dishes with a modern twist',
    cuisine: 'Pan-Asian',
    hours: '12:30 PM - 11:30 PM',
    dressCode: 'Smart Casual',
    image: 'https://pbkxpylwatscfjzbmwur.supabase.co/storage/v1/object/public/homepage_image//foodblue_thetivoli.jpg'
  },
  {
    id: 'aria',
    name: 'Aria',
    description: 'Sophisticated Modern Indian cuisine showcasing regional flavors with contemporary presentation',
    cuisine: 'Modern Indian',
    hours: '7:00 PM - 11:00 PM',
    dressCode: 'Formal',
    image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/dining-venues/aria.jpg'
  },
  {
    id: 'trafalgars',
    name: "Trafalgar's",
    description: 'Upscale bar and lounge featuring premium spirits, craft cocktails, and Pan-Asian bar bites',
    cuisine: 'Bar & Pan-Asian',
    hours: '12:30 PM - 11:30 PM',
    dressCode: 'Smart Casual',
    image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/dining-venues/Trafalgar bar.jpg'
  }
];

// Event spaces at The Tivoli
const eventSpaces = [
  {
    id: 'banquet',
    name: 'Grand Banquet Hall',
    capacity: '1000 guests',
    area: '8,000 sq ft',
    image: 'https://pbkxpylwatscfjzbmwur.supabase.co/storage/v1/object/public/homepage_image//banquet.jpg',
    features: ['Air-conditioned', 'Professional sound system', 'LED lighting', 'Dedicated entrance', 'Premium catering']
  },
  {
    id: 'lawn',
    name: 'Tivoli Grand Lawn',
    capacity: '2000+ guests',
    area: '15,000 sq ft',
    image: 'https://pbkxpylwatscfjzbmwur.supabase.co/storage/v1/object/public/homepage_image//wedding.jpg',
    features: ['Outdoor space', 'Landscaped gardens', 'Stage area', 'Weather protection', 'Wedding setups']
  },
  {
    id: 'corporate',
    name: 'Corporate Meeting Spaces',
    capacity: '50-500 guests',
    area: '2,000-5,000 sq ft',
    image: 'https://pbkxpylwatscfjzbmwur.supabase.co/storage/v1/object/public/homepage_image//corporate-hp.jpg',
    features: ['Business center', 'AV equipment', 'High-speed internet', 'Catering services', 'Executive amenities']
  },
  {
    id: 'cocktail',
    name: 'Cocktail & Reception Area',
    capacity: '300 guests',
    area: '3,000 sq ft',
    image: 'https://pbkxpylwatscfjzbmwur.supabase.co/storage/v1/object/public/homepage_image//cocktail-aprty.jpg',
    features: ['Premium bar setup', 'Elegant lighting', 'Live entertainment area', 'VIP sections', 'Custom decor']
  }
];

export default function TivoliGrandPalacePage() {
  // State management
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);

  // Find hotel by slug
  const hotel = hotels.find(h => h.slug === 'tivoli-grand-palace');
  
  // Handle case where hotel is not found
  if (!hotel) {
    return (
      <div className="min-h-screen bg-red-100 p-8">
        <h1>Hotel not found!</h1>
        <p>No hotel found with slug: tivoli-grand-palace</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Gallery Section */}
      <div className="relative h-[70vh] overflow-hidden mt-16">
        <div className="relative w-full h-full">
          <img
            src={galleryImages[activeImageIndex]}
            alt={`${hotel.name} - Image ${activeImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
          
          {/* Hotel Title Overlay */}
          <div className="absolute inset-0 flex items-center justify-center text-center text-white">
            <div>
              <h1 className="font-serif text-4xl md:text-6xl mb-4">{hotel.name}</h1>
              <p className="text-xl md:text-2xl font-light">{hotel.address.city}, {hotel.address.state}</p>
            </div>
          </div>
          
          {/* Navigation Arrows */}
          <button 
            onClick={() => setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={() => setActiveImageIndex((prev) => (prev + 1) % galleryImages.length)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-16">
            
          {/* Overview Section */}
          <section className="space-y-8">
            <div>
              <h2 className="font-serif text-3xl text-neutral-800 mb-4">About {hotel.name}</h2>
              <p className="text-neutral-600 leading-relaxed text-lg mb-6">
                {hotel.description}
              </p>
              <p className="text-neutral-600 leading-relaxed">
                Located in the prestigious area of {hotel.address.city}, The Tivoli offers an unmatched blend of luxury and comfort. 
                Our hotel features elegantly appointed rooms, world-class dining venues, spectacular event spaces, and 
                comprehensive amenities designed to exceed every expectation.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="font-serif text-2xl text-[#CD9F59] mb-1">150+</div>
                <div className="text-sm text-neutral-600">Luxurious Rooms</div>
              </div>
              <div className="text-center">
                <div className="font-serif text-2xl text-[#CD9F59] mb-1">5</div>
                <div className="text-sm text-neutral-600">Dining Venues</div>
              </div>
              <div className="text-center">
                <div className="font-serif text-2xl text-[#CD9F59] mb-1">3000</div>
                <div className="text-sm text-neutral-600">Event Capacity</div>
              </div>
              <div className="text-center">
                <div className="font-serif text-2xl text-[#CD9F59] mb-1">24/7</div>
                <div className="text-sm text-neutral-600">Concierge Service</div>
              </div>
            </div>
          </section>

          {/* Experience the Space - Virtual Tour Section */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="font-serif text-3xl text-neutral-800 mb-4">Experience the Space</h2>
              <p className="text-neutral-600 leading-relaxed max-w-2xl mx-auto">
                Take a comprehensive virtual tour of The Tivoli and explore every corner of our magnificent property 
                through our interactive 3D experience.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#CD9F59]/5 to-[#CD9F59]/10 rounded-2xl p-8">
              <div 
                className="aspect-video bg-white rounded-xl overflow-hidden shadow-xl cursor-pointer group relative"
                onClick={() => window.open('https://spalba.com/properties/51dvYlEQCd?share=true&play=0&nt=1', '_blank')}
              >
                {/* Preview Image */}
                <div 
                  className="w-full h-full bg-cover bg-center relative"
                  style={{
                    backgroundImage: 'url("https://pbkxpylwatscfjzbmwur.supabase.co/storage/v1/object/public/homepage_image//maingate_thetivoli.jpg")'
                  }}
                >
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/30"></div>
                  
                  {/* Hotel Title */}
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
                    <h3 className="text-white text-2xl md:text-3xl font-serif text-center">The Tivoli</h3>
                  </div>
                  
                  {/* Play Button and Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="bg-white/90 rounded-full p-4 md:p-6 group-hover:bg-white transition-colors duration-300 mb-4">
                      <Play className="w-8 h-8 md:w-12 md:h-12 text-neutral-800 ml-1" />
                    </div>
                    <p className="text-white font-medium text-lg">Explore 3D Space</p>
                  </div>
                  
                  {/* Matterport Branding */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="flex items-center space-x-2 text-white/80 text-sm">
                      <span>POWERED BY</span>
                      <div className="bg-white/20 px-2 py-1 rounded text-xs font-medium">
                        Matterport
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-6">
                <p className="text-neutral-600 mb-4">
                  Take an immersive virtual tour of our magnificent property and discover every stunning detail
                </p>
              </div>
            </div>
          </section>

          {/* Curated Experiences Section */}
          <section className="space-y-8">
            <div className="text-center">
              <span className="text-sm uppercase tracking-[0.2em] text-[#CD9F59] font-sans mb-2 block">
                Curated Experiences
              </span>
              <h2 className="font-serif text-3xl text-neutral-800 mb-4">Discover Heritage Luxury</h2>
              <p className="text-neutral-600 leading-relaxed max-w-2xl mx-auto">
                Immerse yourself in a world of refined experiences, where every moment is crafted to perfection
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Corporate Events */}
              <div className="relative rounded-xl overflow-hidden group cursor-pointer">
                <div className="aspect-[4/3] bg-gray-200 relative">
                  <img
                    src="https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal//corporate%20events%20(1).png"
                    alt="Corporate Events"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40"></div>
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    <h3 className="text-xl font-serif mb-2">Corporate Events</h3>
                    <p className="text-sm opacity-90">Pre-wedding Rituals</p>
                    <p className="text-xs opacity-80 mt-1">Traditional, joyful, colorful, sacred, festive, cultural, musical, emotional, celebratory events.</p>
                  </div>
                </div>
              </div>

              {/* Poolside Soirées */}
              <div className="relative rounded-xl overflow-hidden group cursor-pointer">
                <div className="aspect-[4/3] bg-gray-200 relative">
                  <img
                    src="https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//heroimage4.jpg"
                    alt="Poolside Soirées"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40"></div>
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    <h3 className="text-xl font-serif mb-2">Poolside Soirées</h3>
                    <p className="text-sm opacity-90">Heritage Architecture</p>
                    <p className="text-xs opacity-80 mt-1">Exclusive retreats with private pools perfect for magical poolside weddings</p>
                  </div>
                </div>
              </div>

              {/* Grand Celebrations */}
              <div className="relative rounded-xl overflow-hidden group cursor-pointer">
                <div className="aspect-[4/3] bg-gray-200 relative">
                  <img
                    src="https://oawudxprjjgsdtsvroqt.supabase.co/storage/v1/object/public/tivoliheritagerewari//grand%20celebrations%20rewari.jpg"
                    alt="Grand Celebrations"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40"></div>
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    <h3 className="text-xl font-serif mb-2">Grand Celebrations</h3>
                    <p className="text-sm opacity-90">Royal Events</p>
                    <p className="text-xs opacity-80 mt-1">Magnificent venues for unforgettable events</p>
                  </div>
                </div>
              </div>

              {/* 130 Premium Rooms */}
              <div className="relative rounded-xl overflow-hidden group cursor-pointer">
                <div className="aspect-[4/3] bg-gray-200 relative">
                  <img
                    src="https://oawudxprjjgsdtsvroqt.supabase.co/storage/v1/object/public/tivoliheritagerewari//standard%20room.jpg"
                    alt="130 Premium Rooms"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40"></div>
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    <h3 className="text-xl font-serif mb-2">130 Premium Rooms</h3>
                    <p className="text-sm opacity-90">Cultural Activities</p>
                    <p className="text-xs opacity-80 mt-1">Our property features 130 stylish Premium Rooms designed for your comfort</p>
                  </div>
                </div>
              </div>

              {/* Dining Hall */}
              <div className="relative rounded-xl overflow-hidden group cursor-pointer">
                <div className="aspect-[4/3] bg-gray-200 relative">
                  <img
                    src="https://oawudxprjjgsdtsvroqt.supabase.co/storage/v1/object/public/tivoliheritagerewari//dinningorg.jpg"
                    alt="Dining Hall"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40"></div>
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    <h3 className="text-xl font-serif mb-2">Dinning Hall</h3>
                    <p className="text-sm opacity-90">Wellness</p>
                    <p className="text-xs opacity-80 mt-1">Elegant. Ambient. Refined. A dining experience like no other.</p>
                  </div>
                </div>
              </div>

              {/* Pre Wedding Rituals */}
              <div className="relative rounded-xl overflow-hidden group cursor-pointer">
                <div className="aspect-[4/3] bg-gray-200 relative">
                  <img
                    src="https://oawudxprjjgsdtsvroqt.supabase.co/storage/v1/object/public/tivoliheritagerewari//pre%20wedding.jpg"
                    alt="Pre Wedding Rituals"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40"></div>
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    <h3 className="text-xl font-serif mb-2">Pre Wedding Rituals</h3>
                    <p className="text-sm opacity-90">Wellness</p>
                    <p className="text-xs opacity-80 mt-1">Experience flawless corporate events hosted at elegant, serene retreats</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Spaces Section */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="font-serif text-3xl text-neutral-800 mb-4">Spaces</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Oyster Greens */}
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="relative">
                  <img
                    src="https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//oyster%20hall.jpg"
                    alt="Oyster Greens"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full">
                    <span className="text-xs font-medium">Capacity 800</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-neutral-800 mb-4">Oyster Greens</h3>
                  <ul className="space-y-2 text-sm text-neutral-600">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Fully air-conditioned space</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Professional sound system</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>LED lighting setup</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Dedicated entrance</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* NTB Hall */}
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="relative">
                  <img
                    src="https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//Ntb%20hall.jpg"
                    alt="NTB Hall"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full">
                    <span className="text-xs font-medium">Capacity 300</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-neutral-800 mb-4">NTB Hall</h3>
                  <ul className="space-y-2 text-sm text-neutral-600">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Fully air-conditioned space</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Professional sound system</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>LED lighting setup</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Dedicated entrance</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Emperor's Court */}
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="relative">
                  <img
                    src="https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//emperor%20court.jpg"
                    alt="Emperor's Court"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full">
                    <span className="text-xs font-medium">Capacity 200</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-neutral-800 mb-4">Emperor's Court</h3>
                  <ul className="space-y-2 text-sm text-neutral-600">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Sprawling outdoor space</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Perfect for day events</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Landscaped gardens</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Outdoor lighting available</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Oakwood Hall */}
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="relative">
                  <img
                    src="https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//Oakwood%20hall.jpg"
                    alt="Oakwood Hall"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full">
                    <span className="text-xs font-medium">Capacity 1000</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-neutral-800 mb-4">Oakwood Hall</h3>
                  <ul className="space-y-2 text-sm text-neutral-600">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Fully air-conditioned space</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Professional sound system</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>LED lighting setup</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Dedicated entrance</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Dining Section */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="font-serif text-3xl text-neutral-800 mb-4">Dining</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Blue Grotto */}
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="relative">
                  <img
                    src="https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//blue%20grotto.webp"
                    alt="Blue Grotto"
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-neutral-800 mb-3">Blue Grotto</h3>
                  <p className="text-sm text-neutral-600 mb-4">Award-winning restaurant featuring pan-Asian cuisine</p>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-neutral-800 text-sm">Cuisine:</h4>
                      <p className="text-sm text-neutral-600">Pan-Asian</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-neutral-800 text-sm">Hours:</h4>
                      <p className="text-sm text-neutral-600">12:30 PM - 11:30 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Zuun */}
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                    alt="Zuun"
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-neutral-800 mb-3">Zuun</h3>
                  <p className="text-sm text-neutral-600 mb-4">Award-winning restaurant featuring pan-Asian cuisine</p>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-neutral-800 text-sm">Hours:</h4>
                      <p className="text-sm text-neutral-600">12:30 PM - 11:30 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Aria */}
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="relative">
                  <img
                    src="https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//aria.jpg"
                    alt="Aria"
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-neutral-800 mb-3">Aria</h3>
                  <p className="text-sm text-neutral-600 mb-4">Fine dining restaurant serving modern Indian cuisine</p>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-neutral-800 text-sm">Cuisine:</h4>
                      <p className="text-sm text-neutral-600">Modern Indian</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-neutral-800 text-sm">Hours:</h4>
                      <p className="text-sm text-neutral-600">7:00 PM - 11:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trafalgar's */}
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="relative">
                  <img
                    src="https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//Trafalgar%20bar.jpg"
                    alt="Trafalgar's"
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-neutral-800 mb-3">Trafalgar's</h3>
                  <p className="text-sm text-neutral-600 mb-4">Award-winning restaurant featuring pan-Asian cuisine</p>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-neutral-800 text-sm">Cuisine:</h4>
                      <p className="text-sm text-neutral-600">Pan-Asian</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-neutral-800 text-sm">Hours:</h4>
                      <p className="text-sm text-neutral-600">12:30 PM - 11:30 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="font-serif text-3xl text-neutral-800 mb-4">Location & Contact</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-neutral-800 mb-1">Address</h4>
                  <p className="text-neutral-600">
                    {hotel.address.street}<br />
                    {hotel.address.city}, {hotel.address.state} {hotel.address.postalCode}<br />
                    {hotel.address.country}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-neutral-800 mb-1">Phone</h4>
                  <p className="text-neutral-600">{hotel.contact.phone}</p>
                </div>
                <div>
                  <h4 className="font-medium text-neutral-800 mb-1">Email</h4>
                  <p className="text-neutral-600">{hotel.contact.email}</p>
                </div>
              </div>
              <div className="bg-neutral-100 rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.6733831702897!2d77.18273957549579!3d28.496635075739174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1e25a8f714c1%3A0x9bc15e7b965ec179!2sThe%20Tivoli!5e0!3m2!1sen!2sin!4v1710934800000!5m2!1sen!2sin"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-[300px]"
                ></iframe>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* Plan Your Special Occasion Section */}
      <div className="bg-[#F8F9FA] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div id="venue-booking-form">
              <VenueBookingForm />
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery Modal */}
      {showAllImages && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setShowAllImages(false)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full z-10"
            >
              <span className="sr-only">Close</span>
              ✕
            </button>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[80vh] overflow-y-auto">
              {galleryImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${hotel.name} - ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => {
                    setActiveImageIndex(index);
                    setShowAllImages(false);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
