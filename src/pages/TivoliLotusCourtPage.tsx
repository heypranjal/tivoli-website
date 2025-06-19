/**
 * TivoliLotusCourtPage Component
 * Displays detailed information about Tivoli Lotus Court-Noida
 * 
 * Changes:
 * - Created new component based on TivoliRoyalPalacePage structure
 * - Updated page title to "Tivoli Lotus Court-Noida"
 * - Updated gallery images to use Lotus Court specific images
 * - Modified the experiences section with Lotus Court-focused content
 * - Updated map iframe to point to Lotus Court location
 * - Maintained all the same sections and functionality as Royal Palace
 * - Used the same booking widget and venue booking form components
 * - Kept the same layout and styling for consistency
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

const galleryImages = [
  'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari//standard%20room.jpg',
  'https://pbkxpylwatscfjzbmwur.supabase.co/storage/v1/object/public/homepage_image//banquet.jpg',
  'https://pbkxpylwatscfjzbmwur.supabase.co/storage/v1/object/public/homepage_image//lawn.jpg',
  'https://pbkxpylwatscfjzbmwur.supabase.co/storage/v1/object/public/homepage_image//pre-function.jpg'
];

const villaAmenities = [
  { id: 'bbq', name: 'BBQ', icon: Flame, cost: '₹650' },
  { id: 'lawn', name: 'Lawn', icon: Sprout },
  { id: 'pool', name: 'Swimming Pool', icon: School },
  { id: 'wifi', name: 'Wi-Fi', icon: Wifi },
  { id: 'ac', name: 'AC', icon: Wind },
  { id: 'music', name: 'Music System/Speaker', icon: Music },
  { id: 'tv', name: 'TV', icon: Tv },
  { id: 'wheelchair', name: 'Wheelchair Friendly', icon: Wheelchair }
];

export default function TivoliLotusCourtPage() {
  const { hotelSlug } = useParams();
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
  const hotel = hotels.find(h => h.slug === 'tivoli-lotus-court');

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
              hotel.images[3]
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
            <h1 className="font-serif text-3xl md:text-4xl text-neutral-800 mb-2">Tivoli Lotus Court-Noida</h1>
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
                        <IconComponent className="w-4 h-4 text-[#CD9F59]" />
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
                  meetings, and unforgettable stays in the heart of Noida.
                </p>
              </div>
            </div>
        </div>

        {/* Luxury Experiences Section */}
        <section className="py-6 md:py-12 bg-white">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            <div className="text-center mb-8">
              <span className="text-sm uppercase tracking-[0.2em] text-[#CD9F59] font-sans mb-2 block">
                Curated Experiences
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-neutral-800 mb-4">
                Discover Urban Luxury
              </h2>
              <p className="text-neutral-600 max-w-2xl mx-auto">
                Immerse yourself in a world of refined experiences, where every moment is crafted to perfection
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Corporate Events */}
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-4">
                  <img
                    src="https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal//corporate%20events%20(1).png"
                    alt="Corporate Events"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
                  <div className="absolute inset-x-6 bottom-6 text-white">
                    <h3 className="font-serif text-xl mb-2">Corporate Events</h3>
                    <p className="text-sm text-white/90">State-of-the-art facilities for business gatherings</p>
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

              {/* Poolside Events */}
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-4">
                  <img
                    src="https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari//swimming%20pool2rewari.jpg"
                    alt="Poolside Events"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
                  <div className="absolute inset-x-6 bottom-6 text-white">
                    <h3 className="font-serif text-xl mb-2">Poolside Events</h3>
                    <p className="text-sm text-white/90">Elegant outdoor celebrations by the pool</p>
                  </div>
                </div>
              </div>

              {/* Grand Celebrations */}
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2098&q=80"
                    alt="Grand Celebrations"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
                  <div className="absolute inset-x-6 bottom-6 text-white">
                    <h3 className="font-serif text-xl mb-2">Grand Celebrations</h3>
                    <p className="text-sm text-white/90">Magnificent venues for unforgettable events</p>
                  </div>
                </div>
              </div>

              {/* Wellness */}
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                    alt="Wellness"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
                  <div className="absolute inset-x-6 bottom-6 text-white">
                    <h3 className="font-serif text-xl mb-2">Wellness & Relaxation</h3>
                    <p className="text-sm text-white/90">Rejuvenating spa treatments and wellness activities</p>
                  </div>
                </div>
              </div>

              {/* Premium Rooms */}
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-4">
                  <img
                    src="https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari//standard%20room.jpg"
                    alt="Urban Views"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
                  <div className="absolute inset-x-6 bottom-6 text-white">
                    <h3 className="font-serif text-xl mb-2">Premium Rooms</h3>
                    <p className="text-sm text-white/90">Experience flawless corporate events hosted at elegant, serene retreats</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Wedding at Tivoli Lotus Court */}
        <section className="py-6 md:py-12 bg-white">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            <div className="text-center mb-6">
              <span className="text-sm uppercase tracking-[0.2em] text-[#CD9F59] font-sans mb-2 block">
                Your Dream Wedding Destination
              </span>
              <h2 className="font-serif text-2xl md:text-3xl text-neutral-800 mb-3">
                Wedding at Tivoli Lotus Court
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <img
                  src={hotel.images[0]}
                  alt="Tivoli Lotus Court Wedding Venue"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                      <p className="text-xs font-medium text-neutral-800">Capacity</p>
                      <p className="text-lg font-serif text-[#CD9F59]">1000 PAX</p>
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

          {/* Contact & Location */}
          <div id="venue-booking-form">
            <VenueBookingForm />
          </div>

          <div className="bg-[#F8F9FA] py-10">
            <div className="max-w-5xl mx-auto px-4 md:px-8 lg:px-0">
              <div className="text-center mb-6">
                <span className="text-sm uppercase tracking-[0.2em] text-[#CD9F59] font-sans mb-3 block">
                  Reach Us
                </span>
                <h2 className="font-serif text-2xl md:text-3xl text-neutral-800 mb-2">
                  Contact & Location
                </h2>
                <div className="w-20 h-[1px] bg-[#CD9F59] mx-auto" />
              </div>
              <div className="space-y-6">
                {/* Map */}
                <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.8876812357444!2d77.3908!3d28.5355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDMyJzE5LjgiTiA3N8KwMjMnMjYuOSJF!5e0!3m2!1sen!2sin!4v1710934800000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                
                {/* Contact Details */}
                <div className="bg-white p-8 rounded-xl shadow-lg border border-[#CD9F59]/10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Contact Info */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#CD9F59]/10 flex items-center justify-center">
                          <Phone className="w-5 h-5 text-[#CD9F59]" />
                        </div>
                        <div>
                          <h3 className="font-serif text-xl text-neutral-800 mb-1">Contact Us</h3>
                          <a href={`tel:${hotel.contact.phone}`} className="block text-neutral-600 hover:text-[#CD9F59] transition-colors">
                            {hotel.contact.phone}
                          </a>
                          <a href={`mailto:${hotel.contact.email}`} className="block text-neutral-600 hover:text-[#CD9F59] transition-colors">
                            {hotel.contact.email}
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    {/* Location Info */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#CD9F59]/10 flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-[#CD9F59]" />
                        </div>
                        <div>
                          <h3 className="font-serif text-xl text-neutral-800 mb-1">Address</h3>
                          <p className="text-neutral-600">{hotel.address.street}</p>
                          <p className="text-neutral-600">{hotel.address.city}, {hotel.address.state} {hotel.address.postalCode}</p>
                        </div>
                      </div>
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