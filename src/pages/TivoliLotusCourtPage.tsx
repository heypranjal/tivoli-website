/**
 * Tivoli Lotus Court Page with Progressive Loading
 * Comprehensive, database-driven detail page for Tivoli Lotus Court - Noida
 * Features: Complete data integration, modular components, progressive UX, performance optimization
 */

import React, { useEffect, Suspense, ErrorBoundary } from 'react';
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
import { useTivoliLotusCourtNoida } from '@/hooks/useTivoliLotusCourtNoida';

const TivoliLotusCourtPage: React.FC = () => {
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
    quickStats,
    socialMedia,
  } = useTivoliLotusCourtNoida(hotelSlug || 'tivoli-lotus-court');

  // Rooms data with progressive loading and caching
  const { 
    rooms, 
    loading: roomsLoading, 
    error: roomsError 
  } = useHotelRooms('fa3d0cae-ccb5-45a1-9046-862a689b90fd');

  // Set page title and meta description
  useEffect(() => {
    if (hotelData) {
      document.title = `${hotelData.name} - Luxury Hotel in ${hotelData.address.city}`;
      
      // Set meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 
          `${hotelData.description} Located in ${hotelData.address.city}, featuring luxury accommodations, world-class dining, and exceptional event spaces.`
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
              className="bg-[#CD9F59] text-white px-6 py-2 rounded hover:bg-[#B8934E] transition-colors"
            >
              Try Again
            </button>
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
              additionalDescription={`Located in the heart of ${hotelData.address.city}, Tivoli Lotus Court offers an exceptional blend of modern luxury and traditional hospitality. Our hotel features elegantly designed rooms, comprehensive event facilities, and professional services designed to exceed every expectation.`}
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
            <DiningSection diningVenues={diningVenues} />
          ) : (
            <SkeletonDining />
          )}

          {/* Gallery Section - Tertiary Loading */}
          {showSkeletonUI ? (
            <SkeletonGallery />
          ) : shouldLoad('gallery') && galleryImages ? (
            <GallerySection 
              images={galleryImages}
              hotelName={hotelData?.name || 'Tivoli Lotus Court'}
            />
          ) : (
            <SkeletonGallery />
          )}

          {/* Wedding Destination Section - Background Loading */}
          {showSkeletonUI ? (
            <SkeletonWedding />
          ) : shouldLoad('wedding') && hotelData ? (
            <WeddingDestinationSection hotelName={hotelData.name} />
          ) : (
            <SkeletonWedding />
          )}

          {/* Contact Section - Background Loading */}
          {shouldLoad('contact') && hotelData && (
            <ContactSection 
              address={hotelData.address}
              contact={hotelData.contact}
              socialMedia={socialMedia}
              mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.6192503180578!2d77.39101077549897!3d28.581193975692788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cefb0ab4e334d%3A0x39d3c10c3b3b55!2sTivoli%20Lotus%20Court%20Hotels%20%26%20Banquets!5e0!3m2!1sen!2sin!4v1750590260973!5m2!1sen!2sin"
            />
          )}

        </div>
      </div>

      {/* Booking Form - Loads in background, outside main container */}
      {shouldLoad('booking-form') && hotelData && (
        <Suspense fallback={<div className="h-64" />}>
          <VenueBookingForm 
            hotelName={hotelData.name}
            hotelId={hotelData.id}
            spaces={spaces}
          />
        </Suspense>
      )}
    </div>
  );
};

export default TivoliLotusCourtPage;