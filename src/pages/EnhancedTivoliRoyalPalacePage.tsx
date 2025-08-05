/**
 * Enhanced Tivoli Royal Palace Page with Progressive Loading
 * Comprehensive, database-driven detail page for Tivoli Royal Palace Palwal
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
  ExperiencesSection,
  DiningSection,
  GallerySection,
  WeddingDestinationSection,
  ContactSection,
} from '@/components/hotel';
import { useTivoliRoyalPalace } from '@/hooks/useTivoliRoyalPalace';
import { 
  SkeletonHero,
  SkeletonOverview,
  SkeletonAccommodations,
  SkeletonExperiences,
  SkeletonDining,
  SkeletonGallery,
  SkeletonWedding,
  SkeletonContact
} from '@/components/ui/SkeletonComponents';

const EnhancedTivoliRoyalPalacePage: React.FC = () => {
  const { hotelSlug } = useParams<{ hotelSlug: string }>();
  
  // Progressive loading configuration
  const { shouldLoad } = useProgressiveLoading({
    immediate: ['navigation', 'hero'],
    priority: ['overview'],
    secondary: ['accommodations'],
    tertiary: ['experiences', 'dining', 'gallery'],
    background: ['wedding', 'contact', 'booking-form']
  });


  // Rooms data with progressive loading and caching
  const { 
    rooms, 
    loading: roomsLoading, 
    error: roomsError 
  } = useHotelRooms('fd50d2a7-2a4b-48da-b8ed-e12403bc6cbe');

  // Hotel data with caching using Royal Palace hook
  const {
    data: hotelData,
    loading,
    error,
    diningVenues,
    experiences,
    galleryImages: hookGalleryImages,
    quickStats: hookQuickStats,
    socialMedia,
  } = useTivoliRoyalPalace('tivoli-royal-suite');

  // Use gallery images from hook or fallback
  const galleryImages = hookGalleryImages || [
    "https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal/Gallary/Facade_optimized_200.jpg", // Hotel Facade
    "https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal/Gallary/Main_Gate_optimized_200.jpg", // Main Gate
    "https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal/Gallary/pool.jpg", // Swimming Pool
    "https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal/Gallary/hotelporch.jpg", // Hotel Porch
    "https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal/Gallary/Lobby_optimized_200.jpg", // Hotel Lobby
  ];




  // Use quick stats from hook or fallback
  const quickStats = hookQuickStats || {
    rooms: 45,
    diningVenues: 1,
    eventCapacity: 1500,
    conciergeHours: '24/7'
  };

  // Use social media from hook or fallback
  const socialMediaData = socialMedia || {
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
      <div className="above-fold">
        {showSkeletonUI ? (
          <SkeletonHero />
        ) : shouldLoad('hero') && hotelData ? (
          <HeroSection
            hotelName={hotelData.name}
            location={hotelData.address?.city || 'Palwal'}
            state={hotelData.address?.state || 'Haryana'}
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
              location={hotelData.address?.city || 'Palwal'}
              additionalDescription={`Located conveniently beside Satya Sai Heart Hospital on NH 2, ${hotelData.name} combines accessibility with elegance. Our venue features 45 well-appointed guest rooms, multiple event spaces accommodating 200-1,500 guests, and comprehensive amenities designed to exceed every expectation for your special occasions.`}
              quickStats={quickStats}
            />
          ) : (
            <SkeletonOverview />
          )}

          {/* Video Section - After Overview */}
          <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl p-6 md:p-8">
            <div className="text-center mb-6">
              <h3 className="font-serif text-2xl text-neutral-800 mb-2">Experience Tivoli Royal Palace</h3>
              <p className="text-neutral-600">Discover luxury and elegance in the heart of Palwal</p>
            </div>
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src="https://drive.google.com/file/d/1XVGa-lH_KbgP5koAyeAWhTbStrAGlCNz/preview"
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Tivoli Royal Palace - Virtual Experience"
              />
            </div>
          </div>

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
            <GallerySection images={galleryImages} hotelName={hotelData?.name} />
          ) : (
            <SkeletonGallery />
          )}

        </div>
      </div>

      {/* Wedding Destination Section - Background Loading */}
      {showSkeletonUI ? (
        <SkeletonWedding />
      ) : shouldLoad('wedding') && hotelData ? (
        <WeddingDestinationSection 
          hotelName={hotelData.name} 
          heroImage="https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal//updated-swimming_pool.jpg"
        />
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
              address={hotelData.address || {
                street: 'Bhagola NH 2, Beside Satya Sai Heart Hospital',
                city: 'Palwal',
                state: 'Haryana',
                postalCode: '121102',
                country: 'India',
                coordinates: {
                  lat: 28.1461,
                  lng: 77.3316
                }
              }}
              contact={hotelData.contact || {
                phone: '9818553333',
                email: 'reservations@thetivolihotels.com'
              }}
              socialMedia={socialMediaData}
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
              "streetAddress": hotelData.address?.street || "Bhagola NH 2, Beside Satya Sai Heart Hospital",
              "addressLocality": hotelData.address?.city || "Palwal",
              "addressRegion": hotelData.address?.state || "Haryana",
              "postalCode": hotelData.address?.postalCode || "121102",
              "addressCountry": hotelData.address?.country || "India"
            },
            "geo": hotelData.address?.coordinates ? {
              "@type": "GeoCoordinates",
              "latitude": hotelData.address.coordinates.lat,
              "longitude": hotelData.address.coordinates.lng
            } : undefined,
            "telephone": hotelData.contact?.phone || "9818553333",
            "email": hotelData.contact?.email || "reservations@thetivolihotels.com",
            "starRating": {
              "@type": "Rating",
              "ratingValue": hotelData.rating || 4.5
            },
            "hasMap": `https://www.google.com/maps/search/?api=1&query=${hotelData.address?.coordinates?.lat || 28.1461},${hotelData.address?.coordinates?.lng || 77.3316}`,
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