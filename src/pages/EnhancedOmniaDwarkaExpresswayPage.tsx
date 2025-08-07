/**
 * Enhanced Omnia Dwarka Expressway Page with Progressive Loading
 * Comprehensive, database-driven detail page for Omnia by Tivoli Dwarka Expressway
 * Features: Complete data integration, modular components, progressive UX, performance optimization
 */

import React, { useEffect, Suspense } from 'react';
import { useParams } from 'react-router-dom';
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
  SpacesSection,
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
import { useOmniaDwarkaExpressway } from '@/hooks/useOmniaDwarkaExpressway';

const EnhancedOmniaDwarkaExpresswayPage: React.FC = () => {
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
  const {
    data: hotelData,
    loading,
    error,
    spaces,
    diningVenues,
    experiences,
    galleryImages,
    virtualTour,
    quickStats,
    socialMedia,
  } = useOmniaDwarkaExpressway(hotelSlug || 'omnia-dwarka-expressway');

  // Rooms data with progressive loading and caching
  const { 
    rooms, 
    loading: roomsLoading, 
    error: roomsError 
  } = useHotelRooms('omnia-dwarka-expressway-rooms-id'); // Will be updated with actual ID

  // Set page title and meta description
  useEffect(() => {
    if (hotelData) {
      document.title = `${hotelData.name} - Premier Venue & Event Space in ${hotelData.address.city}`;
      
      // Set meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 
          `${hotelData.description} Located in ${hotelData.address.city}, featuring premium event spaces, world-class dining, and exceptional venue facilities for corporate events and celebrations.`
        );
      }
    }
  }, [hotelData]);

  // Show skeleton UI while data loads (much faster than full loading screen)
  const showSkeletonUI = loading && !hotelData;

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-2xl font-serif text-neutral-800 mb-4">Unable to Load Venue</h1>
            <p className="text-neutral-600 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-[#2C3E50] text-white px-6 py-2 rounded-lg hover:bg-[#2C3E50]/90 transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Hotel not found
  if (!hotelData) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-2xl font-serif text-neutral-800 mb-4">Venue Not Found</h1>
            <p className="text-neutral-600 mb-6">
              We couldn't find the venue you're looking for. It may have been moved or doesn't exist.
            </p>
            <a 
              href="/hotels"
              className="bg-[#2C3E50] text-white px-6 py-2 rounded-lg hover:bg-[#2C3E50]/90 transition-colors duration-200 inline-block"
            >
              View All Venues
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
      <div className="above-fold">
        {showSkeletonUI ? (
          <SkeletonHero />
        ) : shouldLoad('hero') && hotelData ? (
          <HeroSection
            hotelName={hotelData.name}
            location={hotelData.address.city}
            state={hotelData.address.state}
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
              description={hotelData.description}
              location={hotelData.address.city}
              additionalDescription={`Located in the heart of ${hotelData.address.city}, Omnia by Tivoli Dwarka Expressway offers an exceptional blend of modern sophistication and premium hospitality. Our venue features thoughtfully designed event spaces, excellent dining options, versatile meeting facilities, and comprehensive amenities crafted to provide an outstanding experience for corporate events, celebrations, and special occasions.`}
              quickStats={quickStats}
              hideStats={true}
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

          {/* Virtual Tour Section - Secondary Loading */}
          {shouldLoad('virtual-tour') && virtualTour && hotelData && (
            <VirtualTourSection
              hotelName={hotelData.name}
              tourUrl={virtualTour.url}
              thumbnailImage={virtualTour.thumbnail}
              provider={virtualTour.provider}
            />
          )}

          {/* Experiences Section - Tertiary Loading */}
          {showSkeletonUI ? (
            <SkeletonExperiences />
          ) : shouldLoad('experiences') ? (
            <ExperiencesSection experiences={experiences} />
          ) : (
            <SkeletonExperiences />
          )}

          {/* Spaces Section - Tertiary Loading */}
          {showSkeletonUI ? (
            <SkeletonSpaces />
          ) : shouldLoad('spaces') ? (
            <SpacesSection spaces={spaces} />
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
              address={hotelData.address}
              contact={hotelData.contact}
              socialMedia={socialMedia}
              mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.5!2d76.9933!3d28.5705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d47f8c7c5b0e7%3A0x12345678901234!2sOmnia%20by%20Tivoli%20Dwarka%20Expressway!5e0!3m2!1sen!2sin!4v1710934800000!5m2!1sen!2sin"
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
                <h2 className="font-serif text-3xl text-neutral-800 mb-4">Plan Your Special Event</h2>
                <p className="text-neutral-600 leading-relaxed max-w-2xl mx-auto">
                  Let our expert team help you create unforgettable experiences at {hotelData.name}. 
                  From corporate events to grand celebrations, we ensure every detail is perfect.
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
            "@type": "EventVenue",
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
            "geo": hotelData.address.coordinates ? {
              "@type": "GeoCoordinates",
              "latitude": hotelData.address.coordinates.lat,
              "longitude": hotelData.address.coordinates.lng
            } : {
              "@type": "GeoCoordinates",
              "latitude": 28.5705,
              "longitude": 76.9933
            },
            "telephone": hotelData.contact.phone,
            "email": hotelData.contact.email,
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": hotelData.rating,
              "reviewCount": "50"
            },
            "amenityFeature": hotelData.amenities.map(amenity => ({
              "@type": "LocationFeatureSpecification",
              "name": amenity.name,
              "value": true
            })),
            "hasMap": `https://www.google.com/maps/search/?api=1&query=28.5705,76.9933`,
            "url": window.location.href,
            "image": galleryImages[0],
            "maximumAttendeeCapacity": 500,
            "eventType": ["Corporate Events", "Weddings", "Conferences", "Social Gatherings"]
          })}
        </script>
      )}
    </div>
  );
};

export default EnhancedOmniaDwarkaExpresswayPage;