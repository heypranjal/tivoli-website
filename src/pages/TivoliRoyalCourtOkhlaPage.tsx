/**
 * Tivoli Royal Court - Okhla Page
 * Dedicated page for the premier event venue with ASTORIA and REGENCY halls
 * Features comprehensive venue information and contact details
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  Camera,
  ArrowLeft,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import { SmartImage } from '@/components/ui/SmartImage';
import BookingWidget from '@/components/BookingWidget';

// Hotel data from our static hotels.ts
const hotelData = {
  id: 'tivoli-royal-court-okhla',
  name: 'Tivoli Royal Court - Okhla',
  brand: 'tivoli',
  location: 'delhi',
  slug: 'tivoli-royal-court-okhla',
  description: 'Experience premier banquet and event services at Tivoli Royal Court - Okhla, where every celebration becomes a masterpiece. Located in the dynamic Okhla Industrial Area, this sophisticated venue specializes in weddings, conferences, and corporate events with world-class facilities and catering services.',
  images: [
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/homepage_image//updated-homepagae-RoyalCourt-hp-thumbnail.jpg',
    'https://images.unsplash.com/photo-1464808322410-1a934aab61e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2098&q=80'
  ],
  rating: 4.5,
  address: {
    street: 'D-185, Pocket D, Okhla Phase I, Okhla Industrial Area',
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    postalCode: '110020',
    coordinates: {
      lat: 28.5456,
      lng: 77.2548
    }
  },
  contact: {
    phone: '8588850354, 9818553333',
    email: 'reservations@thetivolihotels.com',
    website: 'https://tivolibanquets.com/'
  },
  venues: [
    {
      id: 'astoria',
      name: 'ASTORIA',
      description: '1st & 2nd Floor Combined - Perfect for grand celebrations and large gatherings',
      size: '9,000 sq.ft',
      capacity: '350-450 guests',
      floor: '1st & 2nd Floor Combined',
      images: [
        'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2098&q=80',
        'https://images.unsplash.com/photo-1464808322410-1a934aab61e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
      ],
      amenities: [
        'Stage Setup',
        'Professional Lighting',
        'Sound System',
        'Air Conditioning',
        'Dance Floor'
      ],
      eventTypes: ['Weddings', 'Receptions', 'Corporate Events', 'Conferences']
    },
    {
      id: 'regency',
      name: 'REGENCY',
      description: 'Ground Floor venue ideal for intimate gatherings and corporate meetings',
      size: '8,000 sq.ft',
      capacity: '100-300 guests',
      floor: 'Ground Floor',
      images: [
        'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/homepage_image//updated-homepagae-RoyalCourt-hp-thumbnail.jpg'
      ],
      amenities: [
        'Flexible Seating',
        'Audio Visual Equipment',
        'Natural Lighting',
        'Direct Access',
        'Catering Kitchen'
      ],
      eventTypes: ['Meetings', 'Conferences', 'Small Weddings', 'Corporate Events']
    },
    {
      id: 'outdoor-venue',
      name: 'Outdoor Venue',
      description: 'Beautiful outdoor space for garden parties and outdoor ceremonies',
      size: 'Variable',
      capacity: '100-200 guests',
      floor: 'Ground Level',
      images: [
        'https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80'
      ],
      amenities: [
        'Garden Setting',
        'Weather Protection',
        'Scenic Backdrop',
        'Flexible Layout'
      ],
      eventTypes: ['Garden Parties', 'Outdoor Ceremonies', 'Cocktail Events']
    }
  ],
  amenities: [
    {
      id: 'wifi',
      name: 'High-Speed WiFi',
      description: 'Complimentary high-speed internet access throughout the property',
      icon: 'Wifi'
    },
    {
      id: 'parking',
      name: 'Valet Parking',
      description: 'Ample parking space for events and guests',
      icon: 'Car'
    },
    {
      id: 'catering',
      name: 'In-house Catering',
      description: 'Custom menus and live counters for all events',
      icon: 'Utensils'
    },
    {
      id: 'events',
      name: 'Event Services',
      description: 'Complete event planning and destination wedding services',
      icon: 'Calendar'
    },
    {
      id: 'photography',
      name: 'Pre-Wedding Shoots',
      description: 'Professional photography services and elegant backdrops',
      icon: 'Camera'
    }
  ],
  catering: {
    services: [
      'In-house Catering',
      'Outside Catering Allowed',
      'Custom Menus',
      'Live Counters',
      'Multi-cuisine Options'
    ],
    specialties: [
      'Indian Cuisine',
      'Continental',
      'Chinese',
      'Live Chat Counter',
      'Dessert Station'
    ],
    packageTypes: [
      'Wedding Packages',
      'Corporate Packages',
      'Conference Packages',
      'Stay + Event Packages'
    ]
  },
  features: [
    'Premier Event Venue',
    'Multiple Banquet Halls',
    'Outdoor Venue',
    'In-house Catering',
    'Destination Weddings',
    'Pre-Wedding Shoots',
    'Corporate Events',
    'Meeting Rooms',
    'Valet Parking',
    'Custom Event Planning',
    'Professional Photography',
    'Live Counters',
    'Loyalty Programs'
  ],
  specialServices: {
    destinationWeddings: true,
    preWeddingShoots: true,
    corporateEvents: true,
    customPackages: true,
    loyaltyPrograms: true
  },
  location: {
    airportDistance: '20 km from IGI Airport',
    accessibility: 'Easily accessible from major Delhi areas'
  }
};

// Icon mapping
const iconMap: Record<string, React.ElementType> = {
  Wifi: Wifi,
  Car: Car,
  Utensils: Utensils,
  Calendar: Calendar,
  Camera: Camera,
};

export default function TivoliRoyalCourtOkhlaPage() {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedVenue, setSelectedVenue] = useState(hotelData.venues[0]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % hotelData.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + hotelData.images.length) % hotelData.images.length);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        <SmartImage
          src={hotelData.images[currentImageIndex]}
          alt={hotelData.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <span className="text-sm uppercase tracking-[0.2em] text-[#CD9F59] font-sans mb-4 block">
              THE TIVOLI
            </span>
            <h1 className="font-serif text-4xl md:text-6xl mb-4">{hotelData.name}</h1>
            <div className="flex items-center justify-center text-white/90 mb-6">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{hotelData.address.city}, {hotelData.address.state}</span>
            </div>
            <div className="flex items-center justify-center mb-8">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(hotelData.rating) ? 'text-yellow-400 fill-current' : 'text-white/30'
                  }`}
                />
              ))}
              <span className="ml-2 text-white/90">{hotelData.rating}</span>
            </div>
            <button
              onClick={() => setShowBookingModal(true)}
              className="px-8 py-3 bg-[#CD9F59] text-white rounded-lg hover:bg-[#B88D47] transition-colors font-medium"
            >
              Book Your Event
            </button>
          </div>
        </div>
        
        {/* Image Navigation */}
        {hotelData.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </>
        )}
      </section>

      {/* Venue Information */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif text-neutral-800 mb-6">
              Welcome to {hotelData.name}
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed mb-12">
              {hotelData.description}
            </p>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="space-y-4">
                <h3 className="text-xl font-serif text-neutral-800 mb-4">Contact Information</h3>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-[#CD9F59] mr-3" />
                  <div>
                    <a href="tel:8588850354" className="text-neutral-600 hover:text-[#CD9F59] block">
                      8588850354
                    </a>
                    <a href="tel:9818553333" className="text-neutral-600 hover:text-[#CD9F59] block">
                      9818553333
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-[#CD9F59] mr-3" />
                  <a href={`mailto:${hotelData.contact.email}`} className="text-neutral-600 hover:text-[#CD9F59]">
                    {hotelData.contact.email}
                  </a>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-[#CD9F59] mr-3 mt-1" />
                  <div className="text-neutral-600">
                    <p>{hotelData.address.street}</p>
                    <p>{hotelData.address.city}, {hotelData.address.state} {hotelData.address.postalCode}</p>
                    <p>{hotelData.address.country}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-serif text-neutral-800 mb-4">Location Details</h3>
                <p className="text-neutral-600">{hotelData.location.airportDistance}</p>
                <p className="text-neutral-600">{hotelData.location.accessibility}</p>
                <a 
                  href={hotelData.contact.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block text-[#CD9F59] hover:text-[#B88D47] transition-colors"
                >
                  Visit Website
                </a>
              </div>
            </div>

            {/* Event Venues */}
            <h3 className="text-2xl md:text-3xl font-serif text-neutral-800 mb-8">Our Event Venues</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {hotelData.venues.map((venue) => (
                <div 
                  key={venue.id} 
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => setSelectedVenue(venue)}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <SmartImage 
                      src={venue.images[0]} 
                      alt={venue.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-neutral-800 mb-2">{venue.name}</h4>
                    <p className="text-neutral-600 mb-4 text-sm">{venue.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-sm text-neutral-500">
                        <Users className="w-4 h-4 mr-1" />
                        {venue.capacity}
                      </div>
                      <div className="text-sm text-neutral-500">
                        {venue.size}
                      </div>
                    </div>
                    <div className="space-y-1">
                      {venue.amenities.slice(0, 3).map((amenity, index) => (
                        <span key={index} className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded mr-2 mb-1">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Venue Details */}
            <div className="bg-gray-50 rounded-2xl p-8 mb-16">
              <h4 className="text-2xl font-serif text-neutral-800 mb-4">{selectedVenue.name} - Detailed Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-neutral-600 mb-4">{selectedVenue.description}</p>
                  <div className="space-y-2 mb-4">
                    <p><strong>Capacity:</strong> {selectedVenue.capacity}</p>
                    <p><strong>Size:</strong> {selectedVenue.size}</p>
                    <p><strong>Floor:</strong> {selectedVenue.floor}</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-neutral-800 mb-2">Perfect for:</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedVenue.eventTypes.map((type, index) => (
                        <span key={index} className="bg-[#CD9F59] text-white text-xs px-3 py-1 rounded-full">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-neutral-800 mb-2">Amenities:</h5>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedVenue.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-[#CD9F59] rounded-full mr-2"></div>
                        <span className="text-sm text-neutral-600">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Services & Amenities */}
            <h3 className="text-2xl md:text-3xl font-serif text-neutral-800 mb-8">Services & Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-16">
              {hotelData.amenities.map((amenity) => {
                const IconComponent = iconMap[amenity.icon] || Calendar;
                return (
                  <div key={amenity.id} className="text-center">
                    <div className="bg-[#CD9F59] bg-opacity-10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-[#CD9F59]" />
                    </div>
                    <h4 className="font-semibold text-neutral-800 mb-2">{amenity.name}</h4>
                    <p className="text-sm text-neutral-600">{amenity.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Catering Services */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-serif text-neutral-800 mb-6">Catering Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="font-semibold text-neutral-800 mb-3">Services Available</h4>
                  <ul className="space-y-2">
                    {hotelData.catering.services.map((service, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-[#CD9F59] rounded-full mr-2"></div>
                        <span className="text-neutral-600">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-800 mb-3">Cuisine Specialties</h4>
                  <ul className="space-y-2">
                    {hotelData.catering.specialties.map((specialty, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-[#CD9F59] rounded-full mr-2"></div>
                        <span className="text-neutral-600">{specialty}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-800 mb-3">Package Types</h4>
                  <ul className="space-y-2">
                    {hotelData.catering.packageTypes.map((packageType, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-[#CD9F59] rounded-full mr-2"></div>
                        <span className="text-neutral-600">{packageType}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-serif text-neutral-800">Contact Us for Booking</h3>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-neutral-500 hover:text-neutral-700"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-[#CD9F59] mr-3" />
                <div>
                  <a href="tel:8588850354" className="block text-neutral-600 hover:text-[#CD9F59]">
                    8588850354
                  </a>
                  <a href="tel:9818553333" className="block text-neutral-600 hover:text-[#CD9F59]">
                    9818553333
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-[#CD9F59] mr-3" />
                <a href={`mailto:${hotelData.contact.email}`} className="text-neutral-600 hover:text-[#CD9F59]">
                  {hotelData.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}