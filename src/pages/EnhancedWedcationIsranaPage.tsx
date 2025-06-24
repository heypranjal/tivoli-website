/**
 * Enhanced Wedcation by Tivoli Israna Page with Progressive Loading
 * Comprehensive, database-driven detail page for Wedcation by Tivoli-Israna
 * Features: Complete data integration, modular components, progressive UX, performance optimization
 */

import React, { useEffect, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import VenueBookingForm from '@/components/VenueBookingForm';
import { useHotelRooms } from '@/hooks/useHotelRooms';
import { useProgressiveLoading } from '@/hooks/useProgressiveLoading';
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
import { useWedcationIsrana } from '@/hooks/useWedcationIsrana';

const EnhancedWedcationIsranaPage: React.FC = () => {
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
  } = useWedcationIsrana(hotelSlug || 'wedcation-by-tivoli-israna');

  // Rooms data with progressive loading and caching
  const { 
    rooms, 
    loading: roomsLoading, 
    error: roomsError 
  } = useHotelRooms('3fe2d3a7-c69d-4a90-88db-30523c8b1e4a');

  // Set page title and meta description
  useEffect(() => {
    if (hotelData) {
      document.title = `${hotelData.name} - Premier Wedding Destination in ${hotelData.address.city}`;
      
      // Set meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 
          `${hotelData.description} Located in ${hotelData.address.city}, featuring luxury wedding venues, elegant banquet halls, and comprehensive wedding services.`
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
              additionalDescription={`Located in the heart of ${hotelData.address.city}, Haryana, Wedcation by Tivoli offers an unmatched wedding destination experience. Our property features elegantly designed wedding venues, beautiful garden spaces, world-class dining facilities, and comprehensive wedding services designed to make your special day absolutely perfect.`}
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
              mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3480.496338238677!2d76.8317695755244!3d29.267752875323822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390dc39b9235cc9b%3A0xba4753d1862b5c45!2sWedcation%20by%20Tivoli%20Israna!5e0!3m2!1sen!2sin!4v1750746958780!5m2!1sen!2sin"
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
                <h2 className="font-serif text-3xl text-neutral-800 mb-4">Plan Your Dream Wedding</h2>
                <p className="text-neutral-600 leading-relaxed max-w-2xl mx-auto">
                  Let our expert wedding planners help you create the perfect celebration at {hotelData.name}. 
                  From intimate ceremonies to grand receptions, we ensure every detail of your special day is flawless.
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
            } : undefined,
            "telephone": hotelData.contact.phone,
            "email": hotelData.contact.email,
            "starRating": {
              "@type": "Rating",
              "ratingValue": hotelData.rating
            },
            "priceRange": "₹₹₹",
            "amenityFeature": hotelData.amenities.map(amenity => ({
              "@type": "LocationFeatureSpecification",
              "name": amenity.name,
              "value": true
            })),
            "hasMap": `https://www.google.com/maps/search/?api=1&query=${hotelData.address.coordinates?.lat},${hotelData.address.coordinates?.lng}`,
            "url": window.location.href,
            "image": galleryImages[0],
            "keywords": "wedding venue, destination wedding, banquet hall, wedding planning, Israna weddings"
          })}
        </script>
      )}
    </div>
  );
};

export default EnhancedWedcationIsranaPage;