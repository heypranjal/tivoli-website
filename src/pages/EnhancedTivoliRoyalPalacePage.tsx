/**
 * Enhanced Tivoli Royal Palace Page with Progressive Loading
 * Comprehensive, database-driven detail page for Tivoli Royal Palace Palwal
 * Features: Complete data integration, modular components, progressive UX, performance optimization
 */

import React, { useEffect, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { Users, MapPin } from 'lucide-react';
import Navigation from '@/components/Navigation';
import VenueBookingForm from '@/components/VenueBookingForm';
import { useHotelRooms } from '@/hooks/useHotelRooms';
import { useProgressiveLoading } from '@/hooks/useProgressiveLoading';
import { useCachedData } from '@/hooks/useClientCache';
import { 
  HeroSection,
  OverviewSection,
  AccommodationsSection,
  VirtualTourSection,
  ExperiencesSection,
  DiningSection,
  GallerySection,
  WeddingDestinationSection,
  ContactSection,
} from '@/components/hotel';
import { 
  SkeletonHero,
  SkeletonOverview,
  SkeletonAccommodations,
  SkeletonExperiences,
  SkeletonSpaces,
  SkeletonDining,
  SkeletonGallery,
  SkeletonWedding,
  SkeletonContact
} from '@/components/ui/SkeletonComponents';
import { useHotel } from '@/hooks/useSupabase';

const EnhancedTivoliRoyalPalacePage: React.FC = () => {
  const { hotelSlug } = useParams<{ hotelSlug: string }>();
  
  // Progressive loading configuration
  const { shouldLoad } = useProgressiveLoading({
    immediate: ['navigation', 'hero'],
    priority: ['overview'],
    secondary: ['accommodations', 'virtual-tour'],
    tertiary: ['experiences', 'spaces', 'dining', 'gallery'],
    background: ['wedding', 'contact', 'booking-form']
  });

  // Hotel data with caching
  const { data: hotelData, loading, error } = useHotel('tivoli-royal-palace');

  // Rooms data with progressive loading and caching
  const { 
    rooms, 
    loading: roomsLoading, 
    error: roomsError 
  } = useHotelRooms('fd50d2a7-2a4b-48da-b8ed-e12403bc6cbe');

  // Mock data for sections not yet in database
  const galleryImages = [
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoli-royal-palace/hero-image.jpg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoli-royal-palace/exterior-view.jpg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoli-royal-palace/banquet-hall.jpg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoli-royal-palace/lawn-area.jpg'
  ];

  const spaces = [
    {
      id: '1',
      name: 'Royal Ballroom',
      description: 'Magnificent main ballroom perfect for grand celebrations and weddings',
      capacity: '800-1,200 guests',
      area: '12,000 sq.ft',
      features: ['Air Conditioning', 'Stage Setup', 'Audio/Visual Equipment', 'Dedicated Bridal Room']
    },
    {
      id: '2',
      name: 'Orchid Lawns',
      description: 'Serene outdoor venue ideal for garden parties and outdoor celebrations',
      capacity: '200-500 guests',
      area: '8,000 sq.ft',
      features: ['Garden Setting', 'Open Air', 'Natural Lighting', 'Landscaped Gardens']
    },
    {
      id: '3',
      name: 'Executive Hall',
      description: 'Sophisticated indoor venue for corporate events and intimate gatherings',
      capacity: '100-300 guests',
      area: '4,000 sq.ft',
      features: ['Air Conditioning', 'Projection Facilities', 'Conference Setup', 'Sound System']
    }
  ];

  const diningVenues = [
    {
      id: '1',
      name: 'The Palace Restaurant',
      description: 'Multi-cuisine restaurant serving an array of delicious cuisines with impeccable service',
      cuisine: 'Multi-Cuisine',
      hours: 'All Day Dining',
      features: ['Buffet Service', 'À la carte Menu', 'Live Counters', 'Custom Menus']
    }
  ];

  const experiences = [
    {
      id: '1',
      name: 'Wedding Celebrations',
      description: 'Create unforgettable wedding memories with our comprehensive wedding services',
      highlights: ['Customized Decor', 'Expert Planning', 'Photography Services', 'Bridal Suite']
    },
    {
      id: '2',
      name: 'Corporate Events',
      description: 'Professional event management for conferences, seminars, and corporate gatherings',
      highlights: ['Business Centre', 'AV Equipment', 'Catering Services', 'Parking Facilities']
    },
    {
      id: '3',
      name: 'Destination Events',
      description: 'Comprehensive destination event planning with accommodation and venue management',
      highlights: ['45 Guest Rooms', 'Multiple Venues', 'Event Coordination', 'Transportation']
    }
  ];

  const quickStats = {
    rooms: 45,
    diningVenues: 1,
    eventCapacity: 1500,
    conciergeHours: '24/7'
  };

  const socialMedia = {
    instagram: 'https://www.instagram.com/tivoliroyalpalace/',
    facebook: '',
    website: 'https://tivolibanquets.com/'
  };

  // Set page title and meta description
  useEffect(() => {
    if (hotelData) {
      document.title = `${hotelData.name} - Luxury Venue for Weddings & Events in Palwal`;
      
      // Set meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 
          `${hotelData.description} Experience luxury at Tivoli Royal Palace Palwal with 45 rooms, multiple event spaces for 200-1,500 guests, and world-class amenities.`
        );
      }
    }
  }, [hotelData]);

  // Show skeleton UI while data loads
  const showSkeletonUI = loading && !hotelData;

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-2xl font-serif text-neutral-800 mb-4">Unable to Load Hotel</h1>
            <p className="text-neutral-600 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-[#CD9F59] text-white px-6 py-2 rounded-lg hover:bg-[#CD9F59]/90 transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Hotel not found
  if (!hotelData && !loading) {
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
              href="/locations"
              className="bg-[#CD9F59] text-white px-6 py-2 rounded-lg hover:bg-[#CD9F59]/90 transition-colors duration-200 inline-block"
            >
              View All Locations
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white scroll-optimized">
      {/* Navigation loads immediately */}
      <Navigation />
      
      {/* Hero Section - Priority Loading */}
      <div className="mt-16 above-fold">
        {showSkeletonUI ? (
          <SkeletonHero />
        ) : shouldLoad('hero') && hotelData ? (
          <HeroSection
            hotelName={hotelData.name}
            location={hotelData.city || 'Palwal'}
            state={hotelData.state || 'Haryana'}
            images={galleryImages}
          />
        ) : (
          <SkeletonHero />
        )}
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 py-8 below-fold">
        <div className="max-w-6xl mx-auto space-y-16">
          
          {/* Overview Section - Priority Loading */}
          {showSkeletonUI ? (
            <SkeletonOverview />
          ) : shouldLoad('overview') && hotelData ? (
            <OverviewSection
              hotelName={hotelData.name}
              description={hotelData.description || ''}
              location={hotelData.city || 'Palwal'}
              additionalDescription={`Located conveniently beside Satya Sai Heart Hospital on NH 2, ${hotelData.name} combines accessibility with elegance. Our venue features 45 well-appointed guest rooms, multiple event spaces accommodating 200-1,500 guests, and comprehensive amenities designed to exceed every expectation for your special occasions.`}
              quickStats={quickStats}
            />
          ) : (
            <SkeletonOverview />
          )}

          {/* Accommodations Section - Secondary Loading */}
          {showSkeletonUI ? (
            <SkeletonAccommodations />
          ) : shouldLoad('accommodations') ? (
            <AccommodationsSection
              rooms={rooms}
              loading={roomsLoading}
              error={roomsError}
            />
          ) : (
            <SkeletonAccommodations />
          )}

          {/* Experiences Section - Tertiary Loading */}
          {showSkeletonUI ? (
            <SkeletonExperiences />
          ) : shouldLoad('experiences') ? (
            <ExperiencesSection experiences={experiences} />
          ) : (
            <SkeletonExperiences />
          )}

          {/* Event Spaces Section - Tertiary Loading - Custom Layout */}
          {showSkeletonUI ? (
            <SkeletonSpaces />
          ) : shouldLoad('spaces') ? (
            <section className="space-y-8">
              <div className="text-center">
                <h2 className="font-serif text-3xl text-neutral-800 mb-4">Event Spaces</h2>
                <p className="text-neutral-600 leading-relaxed max-w-2xl mx-auto">
                  Discover our exceptional venues designed to host memorable events of every scale, from intimate gatherings to grand celebrations
                </p>
              </div>
              
              {/* Three spaces in a row with better layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {spaces.map((space) => (
                  <div key={space.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                    <div className="relative">
                      <img
                        src={`https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoli-royal-palace/${space.name.toLowerCase().replace(/\s+/g, '-')}.jpg`}
                        alt={space.name}
                        className="w-full h-56 object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoli-royal-palace/event-space-placeholder.jpg`;
                        }}
                      />
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm">
                        <div className="flex items-center text-xs font-medium text-neutral-700">
                          <Users className="w-3 h-3 mr-1.5" />
                          {space.capacity}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col h-full">
                      <div className="flex-grow">
                        <h3 className="font-serif text-xl text-neutral-800 mb-2">{space.name}</h3>
                        
                        <div className="flex items-center text-neutral-600 mb-3">
                          <MapPin className="w-3 h-3 mr-1.5" />
                          <span className="text-sm">{space.area}</span>
                        </div>
                        
                        <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                          {space.description}
                        </p>
                        
                        <div className="mb-4">
                          <h4 className="text-xs font-medium text-neutral-700 uppercase tracking-wide mb-2">Key Features</h4>
                          <ul className="space-y-1.5">
                            {space.features.slice(0, 3).map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-start text-sm">
                                <span className="mr-2 text-[#CD9F59] text-sm">•</span>
                                <span className="text-neutral-600 text-sm">{feature}</span>
                              </li>
                            ))}
                            {space.features.length > 3 && (
                              <li className="text-xs text-neutral-500 italic">
                                +{space.features.length - 3} more features
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="mt-auto pt-2">
                        <button className="w-full py-2.5 px-4 bg-gradient-to-r from-[#CD9F59] to-[#CD9F59]/80 text-white rounded-lg hover:from-[#CD9F59]/90 hover:to-[#CD9F59]/70 transition-all duration-200 text-sm font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : (
            <SkeletonSpaces />
          )}

          {/* Dining Section - Tertiary Loading */}
          {showSkeletonUI ? (
            <SkeletonDining />
          ) : shouldLoad('dining') ? (
            <DiningSection venues={diningVenues} />
          ) : (
            <SkeletonDining />
          )}

          {/* Gallery Section - Tertiary Loading */}
          {showSkeletonUI ? (
            <SkeletonGallery />
          ) : shouldLoad('gallery') ? (
            <GallerySection />
          ) : (
            <SkeletonGallery />
          )}

        </div>
      </div>

      {/* Wedding Destination Section - Background Loading */}
      {showSkeletonUI ? (
        <SkeletonWedding />
      ) : shouldLoad('wedding') && hotelData ? (
        <WeddingDestinationSection hotelName={hotelData.name} />
      ) : (
        <SkeletonWedding />
      )}

      {/* Contact Section - Background Loading */}
      <div className="container mx-auto px-4 md:px-16 space-y-16">
        <div className="space-y-16">
          {showSkeletonUI ? (
            <SkeletonContact />
          ) : shouldLoad('contact') && hotelData ? (
            <ContactSection
              address={{
                street: hotelData.street || 'Bhagola NH 2, Beside Satya Sai Heart Hospital',
                city: hotelData.city || 'Palwal',
                state: hotelData.state || 'Haryana',
                postalCode: hotelData.postal_code || '121102',
                country: 'India',
                coordinates: {
                  lat: hotelData.latitude || 28.1461,
                  lng: hotelData.longitude || 77.3316
                }
              }}
              contact={{
                phone: hotelData.phone || '9818553333',
                email: hotelData.email || 'reservations@thetivolihotels.com',
                whatsapp: '8588850354',
                alternatePhone: '9818553242'
              }}
              socialMedia={socialMedia}
              mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3516.4514419371176!2d77.30918827548489!3d28.19359377590727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cd1fe467c304b%3A0x5d9583931a50cb3e!2sTivoli%20Royal%20Palace!5e0!3m2!1sen!2sin!4v1750533758732!5m2!1sen!2sin"
            />
          ) : (
            <SkeletonContact />
          )}
        </div>
      </div>

      {/* Booking Form Section - Background Loading */}
      {shouldLoad('booking-form') && hotelData && (
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
                <Suspense fallback={<div className="h-96 bg-neutral-100 animate-pulse rounded-lg" />}>
                  <VenueBookingForm />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schema.org Structured Data - Only when data is available */}
      {hotelData && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Hotel",
            "name": hotelData.name,
            "description": hotelData.description,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": hotelData.street || "Bhagola NH 2, Beside Satya Sai Heart Hospital",
              "addressLocality": hotelData.city || "Palwal",
              "addressRegion": hotelData.state || "Haryana",
              "postalCode": hotelData.postal_code || "121102",
              "addressCountry": "India"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": hotelData.latitude || 28.1461,
              "longitude": hotelData.longitude || 77.3316
            },
            "telephone": hotelData.phone || "9818553333",
            "email": hotelData.email || "reservations@thetivolihotels.com",
            "starRating": {
              "@type": "Rating",
              "ratingValue": hotelData.rating || 4.5
            },
            "priceRange": "₹₹₹",
            "hasMap": `https://www.google.com/maps/search/?api=1&query=${hotelData.latitude || 28.1461},${hotelData.longitude || 77.3316}`,
            "url": window.location.href,
            "image": galleryImages[0],
            "amenityFeature": [
              {
                "@type": "LocationFeatureSpecification",
                "name": "Event Spaces",
                "value": "200-1,500 guests capacity"
              },
              {
                "@type": "LocationFeatureSpecification", 
                "name": "Guest Rooms",
                "value": "45 well-appointed rooms"
              },
              {
                "@type": "LocationFeatureSpecification",
                "name": "Parking",
                "value": "Ample parking facilities"
              }
            ]
          })}
        </script>
      )}
    </div>
  );
};

export default EnhancedTivoliRoyalPalacePage;