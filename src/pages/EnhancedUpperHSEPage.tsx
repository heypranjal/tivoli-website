/**
 * Enhanced Upper HSE Page - Tivoli Design System (Fixed & Reliable)
 * Delhi's Ultra Luxury Oval Glass House
 * Features: Full Tivoli visual consistency, reliable rendering, no runtime errors
 */

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Star, 
  ChevronLeft,
  ChevronRight,
  Building,
  Utensils,
  Users,
  Clock,
  Car,
  Trees,
  Bed,
  Volume2,
  Wind,
  Instagram,
  Facebook,
  Navigation as NavigationIcon
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import VenueBookingForm from '@/components/VenueBookingForm';
import { upperHseVenues } from '@/data/venues/upper-hse-venues';

const EnhancedUpperHSEPage: React.FC = () => {
  const { hotelSlug } = useParams<{ hotelSlug: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Get hotel data from our updated venue file
  const hotelData = upperHseVenues.find(hotel => hotel.slug === (hotelSlug || 'upper-hse-sultanpur'));

  // Set page title and meta description
  useEffect(() => {
    if (hotelData) {
      document.title = `${hotelData.name} - Delhi's Ultra Luxury Oval Glass House`;
      
      // Set meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 
          `Delhi's Ultra Luxury Oval Glass House. ${hotelData.description} Located in ${hotelData.address.city}, featuring iconic oval-shaped glass house, expansive gardens, and exceptional event spaces.`
        );
      }
    }
  }, [hotelData]);

  // Image carousel functions
  const nextImage = () => {
    if (hotelData && hotelData.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % hotelData.images.length);
    }
  };

  const prevImage = () => {
    if (hotelData && hotelData.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + hotelData.images.length) % hotelData.images.length);
    }
  };

  // Show error state if hotel not found
  if (!hotelData) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-2xl font-serif text-neutral-800 mb-4">Hotel Not Found</h1>
            <p className="text-neutral-600 mb-6">
              We couldn't find the hotel you're looking for. It may have been moved or doesn't exist.
            </p>
            <a 
              href="/hotels"
              className="bg-[#CD9F59] text-white px-6 py-2 rounded-lg hover:bg-[#CD9F59]/90 transition-colors duration-200 inline-block"
            >
              View All Hotels
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Quick stats data in Tivoli format
  const quickStats = {
    rooms: 4,
    diningVenues: 1,
    eventCapacity: 1000,
    conciergeHours: '24/7'
  };

  return (
    <div className="min-h-screen bg-white scroll-optimized">
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section - Tivoli Style */}
      <div className="relative h-[70vh] overflow-hidden">
        <div className="relative w-full h-full">
          <img
            src={hotelData.images[currentImageIndex]}
            alt={`${hotelData.name} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/30"></div>
          
          {/* Hotel Title Overlay */}
          <div className="absolute inset-0 flex items-center justify-center text-center text-white">
            <div>
              <h1 className="font-serif text-4xl md:text-6xl mb-4">{hotelData.name}</h1>
              <p className="text-xl md:text-2xl font-light">{hotelData.address.city}, {hotelData.address.state}</p>
            </div>
          </div>
          
          {/* Navigation Arrows */}
          {hotelData.images.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Content Container - Tivoli Layout */}
      <div className="container mx-auto px-4 py-8 below-fold">
        <div className="max-w-6xl mx-auto space-y-16">
          
          {/* Overview Section - Tivoli Style */}
          <section className="space-y-8">
            <div>
              <h2 className="font-serif text-3xl text-neutral-800 mb-4">About {hotelData.name}</h2>
              <p className="text-neutral-600 leading-relaxed text-lg mb-6">
                {hotelData.description}
              </p>
              <p className="text-neutral-600 leading-relaxed">
                Located in the prestigious Sultanpur Estate area of {hotelData.address.city}, The Upper HSE offers Delhi's most iconic ultra-luxury venue featuring an oval-shaped glass house complemented by expansive lush gardens. Our property accommodates 200 to 1000 guests, making it perfect for grand weddings, pre-wedding ceremonies, and corporate events with unmatched elegance and sophistication.
              </p>
            </div>

            {/* Quick Stats - Tivoli Style */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center group">
                <div className="bg-[#CD9F59]/5 rounded-lg p-4 mb-3 group-hover:bg-[#CD9F59]/10 transition-colors duration-200">
                  <Building className="w-5 h-5 text-[#CD9F59] mx-auto" />
                </div>
                <div className="font-serif text-2xl text-[#CD9F59] mb-1">{quickStats.rooms}</div>
                <div className="text-sm text-neutral-600">Rooms</div>
              </div>
              
              <div className="text-center group">
                <div className="bg-[#CD9F59]/5 rounded-lg p-4 mb-3 group-hover:bg-[#CD9F59]/10 transition-colors duration-200">
                  <Utensils className="w-5 h-5 text-[#CD9F59] mx-auto" />
                </div>
                <div className="font-serif text-2xl text-[#CD9F59] mb-1">{quickStats.diningVenues}</div>
                <div className="text-sm text-neutral-600">Dining Venues</div>
              </div>
              
              <div className="text-center group">
                <div className="bg-[#CD9F59]/5 rounded-lg p-4 mb-3 group-hover:bg-[#CD9F59]/10 transition-colors duration-200">
                  <Users className="w-5 h-5 text-[#CD9F59] mx-auto" />
                </div>
                <div className="font-serif text-2xl text-[#CD9F59] mb-1">{quickStats.eventCapacity.toLocaleString()}</div>
                <div className="text-sm text-neutral-600">Event Capacity</div>
              </div>
              
              <div className="text-center group">
                <div className="bg-[#CD9F59]/5 rounded-lg p-4 mb-3 group-hover:bg-[#CD9F59]/10 transition-colors duration-200">
                  <Clock className="w-5 h-5 text-[#CD9F59] mx-auto" />
                </div>
                <div className="font-serif text-2xl text-[#CD9F59] mb-1">{quickStats.conciergeHours}</div>
                <div className="text-sm text-neutral-600">Concierge Service</div>
              </div>
            </div>
          </section>

          {/* Accommodations Section - Tivoli Style */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="font-serif text-3xl text-neutral-800 mb-4">Accommodations</h2>
              <p className="text-neutral-600 leading-relaxed max-w-2xl mx-auto">
                Complimentary accommodations for your event guests with modern amenities and comfort
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {hotelData.rooms?.map((room) => (
                <div key={room.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={room.images?.[0] || 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                    alt={room.name || 'Hotel Room'}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="p-4">
                    <h3 className="font-serif text-lg text-neutral-800 mb-2">{room.name || 'Complimentary Room'}</h3>
                    <p className="text-sm text-neutral-600 mb-3 line-clamp-2">{room.description || 'Comfortable accommodation for event guests'}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-[#CD9F59]" />
                        <span>Up to {room.maxOccupancy || 2} guests</span>
                      </div>
                      <div className="flex items-center">
                        <Bed className="w-4 h-4 mr-2 text-[#CD9F59]" />
                        <span>{room.bedType || 'Queen Bed'}</span>
                      </div>
                      <div className="text-[#CD9F59] font-semibold">Complimentary with event booking</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Event Spaces Section - Tivoli Style */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="font-serif text-3xl text-neutral-800 mb-4">Event Spaces</h2>
              <p className="text-neutral-600 leading-relaxed max-w-2xl mx-auto">
                Discover our exceptional venues designed to host memorable events of every scale
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {hotelData.spaces?.map((space) => (
                <div key={space.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="relative">
                    {space.image ? (
                      <img
                        src={space.image}
                        alt={space.name}
                        className="w-full h-64 object-cover"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                    ) : (
                      <div className="w-full h-64 bg-gradient-to-br from-[#CD9F59]/10 to-[#CD9F59]/20 flex items-center justify-center">
                        <div className="text-center text-[#CD9F59]">
                          <Building className="w-12 h-12 mx-auto mb-2" />
                          <p className="text-sm">Space Image</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full">
                      <span className="text-xs font-medium flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {typeof space.capacity === 'object' 
                          ? `${space.capacity.min}-${space.capacity.max}` 
                          : space.capacity}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-serif text-xl text-neutral-800 mb-2">{space.name}</h3>
                    
                    {/* Area Information */}
                    <div className="flex items-center text-sm text-neutral-600 mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{space.area}</span>
                    </div>

                    {/* Description */}
                    {space.description && (
                      <p className="text-sm text-neutral-600 mb-4 line-clamp-2">{space.description}</p>
                    )}
                    
                    {/* Features */}
                    <ul className="space-y-2 text-sm text-neutral-600">
                      {space.features.slice(0, 4).map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2 text-[#CD9F59]">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Amenities Section - Tivoli Style */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="font-serif text-3xl text-neutral-800 mb-4">Amenities & Features</h2>
              <p className="text-neutral-600 leading-relaxed max-w-2xl mx-auto">
                Premium facilities and services designed to exceed your expectations
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotelData.amenities?.map((amenity) => {
                const IconComponent = {
                  Car,
                  Building,
                  Trees,
                  Utensils,
                  Bed,
                  Volume2,
                  Wind,
                  Users
                }[amenity.icon] || Building;
                
                return (
                  <div key={amenity.id} className="bg-white rounded-lg p-6 shadow-sm border border-neutral-100 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-start space-x-4">
                      <div className="bg-[#CD9F59]/5 rounded-lg p-3">
                        <IconComponent className="w-6 h-6 text-[#CD9F59]" />
                      </div>
                      <div>
                        <h3 className="font-serif text-lg text-neutral-800 mb-2">{amenity.name}</h3>
                        <p className="text-sm text-neutral-600">{amenity.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Gallery Section - Tivoli Style */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="font-serif text-3xl text-neutral-800 mb-4">Gallery</h2>
              <p className="text-neutral-600 leading-relaxed max-w-2xl mx-auto">
                Explore our stunning venues and elegant spaces through our photo gallery
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotelData.images.map((image, index) => (
                <div 
                  key={index} 
                  className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img
                    src={image}
                    alt={`${hotelData.name} - Gallery Image ${index + 1}`}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="bg-white/0 group-hover:bg-white/90 rounded-full p-0 group-hover:p-3 transition-all duration-300">
                      <span className="text-transparent group-hover:text-neutral-800 font-medium text-sm transition-all duration-300">
                        View Image
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </section>

        </div>
      </div>

      {/* Location & Contact Section - Tivoli Style */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="font-serif text-3xl text-neutral-800 mb-4">Location & Contact</h2>
          <p className="text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            Find us at our prime location and get in touch for reservations or inquiries
          </p>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-xl text-neutral-800 mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-[#CD9F59] mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-neutral-800">{hotelData.address.street}</div>
                        <div className="text-neutral-600">{hotelData.address.city}, {hotelData.address.state} {hotelData.address.postalCode}</div>
                        <div className="text-neutral-600">{hotelData.address.country}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-[#CD9F59] flex-shrink-0" />
                      <a href={`tel:${hotelData.contact.phone}`} className="text-neutral-800 hover:text-[#CD9F59] transition-colors">
                        {hotelData.contact.phone}
                      </a>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-[#CD9F59] flex-shrink-0" />
                      <a href={`tel:${hotelData.contact.whatsapp}`} className="text-neutral-800 hover:text-[#CD9F59] transition-colors">
                        {hotelData.contact.whatsapp} (WhatsApp)
                      </a>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-[#CD9F59] flex-shrink-0" />
                      <a href={`mailto:${hotelData.contact.email}`} className="text-neutral-800 hover:text-[#CD9F59] transition-colors">
                        {hotelData.contact.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <h4 className="font-serif text-lg text-neutral-800 mb-4">Follow Us</h4>
                  <div className="flex space-x-4">
                    <a
                      href={hotelData.socialMedia?.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-[#CD9F59] hover:text-[#CD9F59]/80 transition-colors"
                    >
                      <Instagram className="w-5 h-5" />
                      <span>Instagram</span>
                    </a>
                    <a
                      href={hotelData.socialMedia?.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-[#CD9F59] hover:text-[#CD9F59]/80 transition-colors"
                    >
                      <Facebook className="w-5 h-5" />
                      <span>Facebook</span>
                    </a>
                  </div>
                </div>

                {/* Transportation */}
                <div>
                  <h4 className="font-serif text-lg text-neutral-800 mb-4">Transportation</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Airport Distance:</span>
                      <span className="font-medium text-[#CD9F59]">{hotelData.transportation?.airport}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Metro Station:</span>
                      <span className="font-medium text-[#CD9F59]">{hotelData.transportation?.metro}</span>
                    </div>
                    {Object.entries(hotelData.transportation?.railway || {}).map(([station, distance]) => (
                      <div key={station} className="flex justify-between">
                        <span className="text-neutral-600">{station}:</span>
                        <span className="font-medium text-[#CD9F59]">{distance}</span>
                      </div>
                    ))}
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Landmark:</span>
                      <span className="font-medium text-[#CD9F59]">{hotelData.transportation?.landmark}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div>
                <h3 className="font-serif text-xl text-neutral-800 mb-4">Find Us</h3>
                <div className="w-full h-96 bg-neutral-200 rounded-lg overflow-hidden shadow-sm">
                  <iframe
                    src={hotelData.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="The Upper HSE Location"
                  ></iframe>
                </div>
                
                <button
                  onClick={() => {
                    const url = `https://www.google.com/maps/dir/?api=1&destination=${hotelData.address.coordinates?.lat},${hotelData.address.coordinates?.lng}`;
                    window.open(url, '_blank', 'noopener,noreferrer');
                  }}
                  className="mt-4 w-full bg-[#CD9F59] text-white py-3 px-4 rounded-lg hover:bg-[#CD9F59]/90 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <NavigationIcon className="w-5 h-5" />
                  <span>Get Directions</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section - Tivoli Style */}
      <div className="bg-[#F8F9FA] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-serif text-3xl text-neutral-800 mb-4">Plan Your Special Occasion</h2>
              <p className="text-neutral-600 leading-relaxed max-w-2xl mx-auto">
                Let our expert team help you create unforgettable memories at {hotelData.name}. 
                From intimate gatherings to grand celebrations, we ensure every detail is perfect.
              </p>
            </div>
            <div id="venue-booking-form">
              <VenueBookingForm />
            </div>
          </div>
        </div>
      </div>

      {/* Schema.org Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LodgingBusiness",
          "name": hotelData.name,
          "description": hotelData.description,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": hotelData.address.street,
            "addressLocality": hotelData.address.city,
            "addressRegion": hotelData.address.state,
            "postalCode": hotelData.address.postalCode,
            "addressCountry": hotelData.address.country
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": hotelData.address.coordinates?.lat,
            "longitude": hotelData.address.coordinates?.lng
          },
          "telephone": hotelData.contact.phone,
          "email": hotelData.contact.email,
          "starRating": {
            "@type": "Rating",
            "ratingValue": hotelData.rating
          },
          "priceRange": "₹₹₹₹",
          "hasMap": `https://www.google.com/maps/search/?api=1&query=${hotelData.address.coordinates?.lat},${hotelData.address.coordinates?.lng}`,
          "url": window.location.href,
          "image": hotelData.images[0]
        })}
      </script>
    </div>
  );
};

export default EnhancedUpperHSEPage;