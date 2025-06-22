/**
 * Hotel Page - Dynamic Hotel Detail Page
 * Phase 4: Component Refactoring
 * Created: 2025-06-20
 * 
 * Single dynamic component that replaces all individual hotel pages
 * Uses URL parameters to fetch hotel data from Supabase
 * 
 * Enhanced: Uses specialized enhanced page for The Tivoli-New Delhi
 */

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// Import the enhanced pages
import EnhancedTivoliNewDelhiPage from './EnhancedTivoliNewDelhiPage';
import EnhancedTivoliRoyalPalacePage from './EnhancedTivoliRoyalPalacePage';
import TivoliHeritagePalacePage from './TivoliHeritagePalacePage';
import EnhancedTivoliBijwasanPage from './EnhancedTivoliBijwasanPage';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Star, 
  Calendar,
  Clock,
  Users,
  Wifi,
  Car,
  Utensils,
  Dumbbell,
  Loader2,
  ArrowLeft,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import { useHotel } from '@/hooks/useSupabase'; // Updated to use our Supabase hook
import { SmartImage, SmartHeroImage } from '@/components/ui/SmartImage';
import BookingWidget from '@/components/BookingWidget';

// Icon mapping for amenities
const iconMap: Record<string, React.ElementType> = {
  Signal: Wifi,
  Car: Car,
  Utensils: Utensils,
  Dumbbell: Dumbbell,
  Coffee: Clock,
  // Add more mappings as needed
};

export default function HotelPage() {
  const { hotelSlug } = useParams();
  
  // Use enhanced page for The Tivoli-New Delhi
  if (hotelSlug === 'the-tivoli' || hotelSlug === 'tivoli-grand-palace') {
    return <EnhancedTivoliNewDelhiPage />;
  }
  
  // Use enhanced page for Tivoli Royal Palace
  if (hotelSlug === 'tivoli-royal-palace') {
    return <EnhancedTivoliRoyalPalacePage />;
  }
  
  // Use enhanced page for Tivoli Heritage Palace
  if (hotelSlug === 'tivoli-heritage-palace') {
    return <TivoliHeritagePalacePage />;
  }
  
  // Use enhanced page for Tivoli Bijwasan
  if (hotelSlug === 'tivoli-bijwasan') {
    return <EnhancedTivoliBijwasanPage />;
  }
  
  const { data: hotelData, loading: isLoading, error } = useHotel(hotelSlug || '');
  
  // Transform the data to match expected structure
  const hotel = hotelData;
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#CD9F59] mx-auto mb-4" />
            <p className="text-neutral-600">Loading hotel details...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !hotel) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <h1 className="text-2xl font-serif text-neutral-800 mb-4">Hotel Not Found</h1>
            <p className="text-neutral-600 mb-6">
              The hotel you're looking for doesn't exist or has been moved.
            </p>
            <Link
              to="/locations"
              className="inline-flex items-center px-6 py-3 bg-[#CD9F59] text-white rounded-lg hover:bg-[#B88D47] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Locations
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const galleryImages = hotel.images?.filter(img => img.media_type === 'gallery').map(img => img.media.public_url) || [];
  const heroImage = hotel.images?.find(img => img.media_type === 'hero')?.media.public_url || 
                   hotel.featured_image?.public_url || 
                   galleryImages[0] || '';

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <SmartHeroImage
          src={heroImage}
          alt={hotel.name}
          className="h-full"
        >
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <span className="text-sm uppercase tracking-[0.2em] text-[#CD9F59] font-sans mb-4 block">
                {hotel.brand?.display_name}
              </span>
              <h1 className="font-serif text-4xl md:text-6xl mb-4">{hotel.name}</h1>
              <div className="flex items-center justify-center text-white/90 mb-6">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{hotel.location?.name}, {hotel.location?.state}</span>
              </div>
              <div className="flex items-center justify-center mb-8">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(hotel.rating) ? 'text-yellow-400 fill-current' : 'text-white/30'
                    }`}
                  />
                ))}
                <span className="ml-2 text-white/90">{hotel.rating}</span>
              </div>
              <button
                onClick={() => setShowBookingModal(true)}
                className="px-8 py-3 bg-[#CD9F59] text-white rounded-lg hover:bg-[#B88D47] transition-colors font-medium"
              >
                Book Your Stay
              </button>
            </div>
          </div>
        </SmartHeroImage>
      </section>

      {/* Hotel Information */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif text-neutral-800 mb-6">
              Welcome to {hotel.name}
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed mb-8">
              {hotel.description}
            </p>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-4">
                <h3 className="text-xl font-serif text-neutral-800 mb-4">Contact Information</h3>
                {hotel.phone && (
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-[#CD9F59] mr-3" />
                    <a href={`tel:${hotel.phone}`} className="text-neutral-600 hover:text-[#CD9F59]">
                      {hotel.phone}
                    </a>
                  </div>
                )}
                {hotel.email && (
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-[#CD9F59] mr-3" />
                    <a href={`mailto:${hotel.email}`} className="text-neutral-600 hover:text-[#CD9F59]">
                      {hotel.email}
                    </a>
                  </div>
                )}
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-[#CD9F59] mr-3 mt-1" />
                  <div className="text-neutral-600">
                    {hotel.street && <p>{hotel.street}</p>}
                    <p>{hotel.city}, {hotel.state} {hotel.postal_code}</p>
                    <p>{hotel.location.country}</p>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              {hotel.amenities && hotel.amenities.length > 0 && (
                <div>
                  <h3 className="text-xl font-serif text-neutral-800 mb-4">Amenities</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {hotel.amenities.slice(0, 6).map((amenity) => {
                      const IconComponent = iconMap[amenity.amenity.icon_name || ''] || Wifi;
                      return (
                        <div key={amenity.amenity.id} className="flex items-center">
                          <IconComponent className="w-4 h-4 text-[#CD9F59] mr-3" />
                          <span className="text-neutral-600">{amenity.amenity.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      {galleryImages.length > 0 && (
        <section className="py-20 bg-neutral-50">
          <div className="container mx-auto px-4 md:px-16">
            <h2 className="text-3xl md:text-4xl font-serif text-neutral-800 text-center mb-12">
              Gallery
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <SmartImage
                  src={galleryImages[currentImageIndex]}
                  alt={`${hotel.name} gallery ${currentImageIndex + 1}`}
                  className="w-full h-96 object-cover rounded-lg"
                  optimize={{
                    width: 800,
                    height: 400,
                    quality: 90
                  }}
                />
                {galleryImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
              {galleryImages.length > 1 && (
                <div className="flex justify-center mt-6 space-x-2">
                  {galleryImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-[#CD9F59]' : 'bg-neutral-300'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Rooms */}
      {hotel.rooms && hotel.rooms.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-16">
            <h2 className="text-3xl md:text-4xl font-serif text-neutral-800 text-center mb-12">
              Accommodations
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {hotel.rooms.map((room) => (
                <div key={room.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-xl font-serif text-neutral-800 mb-2 mt-2">{room.name}</h3>
                    <p className="text-neutral-600 mb-4">{room.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm text-neutral-600 mb-4">
                      {room.size_display && (
                        <div className="flex items-center">
                          <span className="font-medium">Size:</span>
                          <span className="ml-2">{room.size_display}</span>
                        </div>
                      )}
                      {room.max_occupancy && (
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          <span>{room.max_occupancy} guests</span>
                        </div>
                      )}
                      {room.bed_type && (
                        <div className="flex items-center">
                          <span className="font-medium">Bed:</span>
                          <span className="ml-2">{room.bed_type}</span>
                        </div>
                      )}
                      {room.price_inr && (
                        <div className="flex items-center">
                          <span className="font-medium">From:</span>
                          <span className="ml-2 text-[#CD9F59] font-medium">₹{room.price_inr.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Dining */}
      {hotel.dining && hotel.dining.length > 0 && (
        <section className="py-20 bg-neutral-50">
          <div className="container mx-auto px-4 md:px-16">
            <h2 className="text-3xl md:text-4xl font-serif text-neutral-800 text-center mb-12">
              Dining
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {hotel.dining.map((restaurant) => (
                <div key={restaurant.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  {restaurant.image_id && (
                    <div className="aspect-[4/3]">
                      <SmartImage
                        src={restaurant.image_id}
                        alt={restaurant.name}
                        className="w-full h-full object-cover"
                        optimize={{
                          width: 400,
                          height: 300,
                          quality: 85
                        }}
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-serif text-neutral-800 mb-2">{restaurant.name}</h3>
                    <p className="text-neutral-600 mb-4">{restaurant.description}</p>
                    <div className="space-y-2 text-sm text-neutral-600">
                      {restaurant.cuisine && (
                        <div className="flex items-center">
                          <span className="font-medium">Cuisine:</span>
                          <span className="ml-2">{restaurant.cuisine}</span>
                        </div>
                      )}
                      {restaurant.hours && (
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{restaurant.hours}</span>
                        </div>
                      )}
                      {restaurant.dress_code && (
                        <div className="flex items-center">
                          <span className="font-medium">Dress Code:</span>
                          <span className="ml-2">{restaurant.dress_code}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Hotel Policies */}
      {hotel.policies && (
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif text-neutral-800 text-center mb-12">
                Policies
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <Calendar className="w-8 h-8 text-[#CD9F59] mx-auto mb-3" />
                  <h3 className="font-medium text-neutral-800 mb-2">Check-in</h3>
                  <p className="text-neutral-600">{hotel.policies.check_in}</p>
                </div>
                <div className="text-center">
                  <Calendar className="w-8 h-8 text-[#CD9F59] mx-auto mb-3" />
                  <h3 className="font-medium text-neutral-800 mb-2">Check-out</h3>
                  <p className="text-neutral-600">{hotel.policies.check_out}</p>
                </div>
                <div className="text-center">
                  <Clock className="w-8 h-8 text-[#CD9F59] mx-auto mb-3" />
                  <h3 className="font-medium text-neutral-800 mb-2">Cancellation</h3>
                  <p className="text-neutral-600">{hotel.policies.cancellation}</p>
                </div>
                <div className="text-center">
                  <Users className="w-8 h-8 text-[#CD9F59] mx-auto mb-3" />
                  <h3 className="font-medium text-neutral-800 mb-2">Pets</h3>
                  <p className="text-neutral-600">{hotel.policies.pets}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-serif text-neutral-800">Book Your Stay</h2>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="text-neutral-400 hover:text-neutral-600"
                >
                  ×
                </button>
              </div>
            </div>
            <BookingWidget />
          </div>
        </div>
      )}
    </div>
  );
}