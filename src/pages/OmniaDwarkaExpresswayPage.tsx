/**
 * Omnia By Tivoli - Dwarka Expressway Page with Progressive Loading
 * Comprehensive, database-driven detail page following The Tivoli design patterns
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
import { useOmniaDwarkaExpressway } from '@/hooks/useOmniaDwarkaExpresswayFixed';

const OmniaDwarkaExpresswayPage: React.FC = () => {
  const { hotelSlug } = useParams<{ hotelSlug: string }>();
  
  
  try {
  // Progressive loading configuration - same as Tivoli pattern
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
  } = useOmniaDwarkaExpressway(hotelSlug || 'omnia-dwarka-expressway');

  // Rooms data with progressive loading and caching
  const { 
    rooms, 
    loading: roomsLoading, 
    error: roomsError 
  } = useHotelRooms('55f959f2-aec2-415a-bb08-2469bb787542');

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

  // Add early return if still loading to prevent errors
  if (loading && !hotelData) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-serif text-neutral-800 mb-4">Loading...</h1>
          </div>
        </div>
      </div>
    );
  }

  // Error state - same pattern as Tivoli
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

      {/* Main Content Container - Exact same structure as Tivoli */}
      <div className="container mx-auto px-4 py-8 below-fold">
        <div className="max-w-6xl mx-auto space-y-16">
          
          {/* Overview Section - Priority Loading */}
          {showSkeletonUI ? (
            <SkeletonOverview />
          ) : shouldLoad('overview') && hotelData ? (
            <OverviewSection
              hotelName={hotelData.name}
              description="Welcome to Omnia by Tivoli, the premier celebration destination in Dwarka. Whether you're hosting a wedding, anniversary, birthday, or corporate event, our sophisticated banquet space provides the perfect backdrop for every occasion."
              location={hotelData.address.city}
              additionalDescription="With expert event planning, gourmet cuisine, and state-of-the-art amenities, we turn your vision into a seamless and stylish reality. Designed to accommodate everything from intimate gatherings to lavish celebrations, Omnia combines modern elegance with impeccable service. Centrally located in Dwarka with excellent connectivity to all parts of Delhi NCR, Omnia by Tivoli is where unforgettable memories are made."
              quickStats={quickStats}
              hideStats={true}
            />
          ) : (
            <SkeletonOverview />
          )}

          {/* Accommodations Section - Removed as no rooms available */}

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
          {/* Temporarily disabled - checking if this causes the error
          {showSkeletonUI ? (
            <SkeletonDining />
          ) : shouldLoad('dining') ? (
            <DiningSection diningVenues={diningVenues} />
          ) : (
            <SkeletonDining />
          )}
          */}

          {/* Gallery Section - Tertiary Loading */}
          {showSkeletonUI ? (
            <SkeletonGallery />
          ) : shouldLoad('gallery') && galleryImages ? (
            <GallerySection 
              images={galleryImages}
              hotelName={hotelData?.name || 'Omnia By Tivoli'}
            />
          ) : (
            <SkeletonGallery />
          )}

          {/* Wedding Destination Section - Background Loading */}
          {showSkeletonUI ? (
            <SkeletonWedding />
          ) : shouldLoad('wedding') && hotelData ? (
            <WeddingDestinationSection 
              hotelName={hotelData.name} 
              heroImage="https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/omniativolidwarka//wedding.jpg"
            />
          ) : (
            <SkeletonWedding />
          )}

          {/* Contact Section - Background Loading */}
          {shouldLoad('contact') && hotelData && (
            <ContactSection 
              address={hotelData.address}
              contact={hotelData.contact}
              socialMedia={socialMedia}
              mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.021852610181!2d77.02719617549735!3d28.539062875715874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1b67382dfcff%3A0x154300e1107068bc!2sOmnia%20by%20Tivoli%20Dwarka!5e0!3m2!1sen!2sin!4v1750654233027!5m2!1sen!2sin"
            />
          )}

        </div>
      </div>

      {/* Booking Form - Loads in background, outside main container */}
      {/* Temporarily disabled to check if this is causing the issue
      {shouldLoad('booking-form') && hotelData && (
        <Suspense fallback={<div className="h-64" />}>
          <VenueBookingForm 
            hotelName={hotelData.name}
            hotelId={hotelData.id}
            spaces={spaces}
          />
        </Suspense>
      )}
      */}
    </div>
  );
  } catch (error) {
    console.error('Error in OmniaDwarkaExpresswayPage:', error);
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-serif text-neutral-800 mb-4">Something went wrong</h1>
            <p className="text-neutral-600 mb-6">Please check the console for error details</p>
            <pre className="text-left bg-gray-100 p-4 rounded max-w-2xl mx-auto overflow-auto">
              {String(error)}
            </pre>
          </div>
        </div>
      </div>
    );
  }
};

export default OmniaDwarkaExpresswayPage;