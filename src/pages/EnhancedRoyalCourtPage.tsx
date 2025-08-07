/**
 * Enhanced Royal Court Page with Premium Design
 * Matches The Tivoli page design quality for event venue showcase
 * Features: Venue-focused content, event spaces, banquet halls, premium UX
 */

import React, { useEffect, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import VenueBookingForm from '@/components/VenueBookingForm';
import { useHotelRooms } from '@/hooks/useHotelRooms';
import { useProgressiveLoading } from '@/hooks/useProgressiveLoading';
import { useCachedData } from '@/hooks/useClientCache';
import { useHotel } from '@/hooks/useSupabase';
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

const EnhancedRoyalCourtPage: React.FC = () => {
  const { hotelSlug } = useParams<{ hotelSlug: string }>();
  
  // Progressive loading configuration
  const { shouldLoad } = useProgressiveLoading({
    immediate: ['navigation', 'hero'],
    priority: ['overview'],
    secondary: ['accommodations', 'virtual-tour'],
    tertiary: ['experiences', 'spaces', 'dining', 'gallery'],
    background: ['wedding', 'contact', 'booking-form']
  });

  // Fetch Royal Court data from Supabase
  const { data: hotelData, loading, error } = useHotel('tivoli-royal-court-okhla');

  // Fetch room data for accommodations section
  const { rooms: roomsData, loading: roomsLoading, error: roomsError } = useHotelRooms(hotelData?.id || '');

  // Transform venue data for event-focused components
  const venueSpaces = [
    {
      id: 'astoria',
      name: 'Astoria',
      description: 'Elegant banquet hall perfect for grand celebrations and corporate events',
      capacity: 300,
      area: '5000 sq ft',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivolilotuscourt/banner%20images/Astoria_optimized_200.jpg',
      features: ['State-of-the-art Audio/Visual', 'Stage Setup', 'Dance Floor', 'Premium Lighting']
    },
    {
      id: 'regency',
      name: 'Regency',
      description: 'Sophisticated event space ideal for weddings and social gatherings',
      capacity: 250,
      area: '4000 sq ft',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivolilotuscourt/banner%20images/Regency%20Pre%20Function%20Area%20(2).jpeg',
      features: ['Elegant Decor', 'Natural Lighting', 'Pre-function Area', 'Modern Amenities']
    }
  ];

  // Event experiences for Royal Court - Updated with Tivoli New Delhi images and content
  const experiences = [
    {
      id: 'corporate-events',
      title: 'Corporate Events',
      subtitle: 'Pre-wedding Rituals',
      description: 'Traditional, joyful, colorful, sacred, festive, cultural, musical, emotional, celebratory events.',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal//corporate%20events%20(1).png',
      category: 'business'
    },
    {
      id: 'poolside-soirees',
      title: 'Poolside Soirées',
      subtitle: 'Heritage Architecture',
      description: 'Exclusive retreats with private pools perfect for magical poolside weddings',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//heroimage4.jpg',
      category: 'luxury'
    },
    {
      id: 'grand-celebrations',
      title: 'Grand Celebrations',
      subtitle: 'Royal Events',
      description: 'Magnificent venues for unforgettable events',
      image: 'https://oawudxprjjgsdtsvroqt.supabase.co/storage/v1/object/public/tivoliheritagerewari//grand%20celebrations%20rewari.jpg',
      category: 'celebration'
    },
    {
      id: 'premium-rooms',
      title: '130 Premium Rooms',
      subtitle: 'Cultural Activities',
      description: 'Our property features 130 stylish Premium Rooms designed for your comfort',
      image: 'https://oawudxprjjgsdtsvroqt.supabase.co/storage/v1/object/public/tivoliheritagerewari//standard%20room.jpg',
      category: 'accommodation'
    },
    {
      id: 'dining-hall',
      title: 'Dinning Hall',
      subtitle: 'Wellness',
      description: 'Elegant. Ambient. Refined. A dining experience like no other.',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/dinning%20experience/IMG_1511_optimized_200.jpeg',
      category: 'dining'
    },
    {
      id: 'pre-wedding-rituals',
      title: 'Pre Wedding Rituals',
      subtitle: 'Wellness',
      description: 'Experience flawless corporate events hosted at elegant, serene retreats',
      image: 'https://oawudxprjjgsdtsvroqt.supabase.co/storage/v1/object/public/tivoliheritagerewari//pre%20wedding.jpg',
      category: 'wedding'
    }
  ];

  // Dining/Catering services for events
  const diningVenues = [
    {
      id: 'catering',
      name: 'In-house Catering',
      description: 'Exquisite culinary experiences with custom menus and live counters for all events',
      cuisine: 'Multi-cuisine',
      hours: 'Event Hours',
      dressCode: 'Event Appropriate',
      specialties: ['Indian Cuisine', 'Continental', 'Chinese', 'Live Chat Counter', 'Dessert Station'],
      image: hotelData?.images?.[0] || ''
    }
  ];

  // Quick stats for overview - compatible with OverviewSection component
  const quickStats = {
    rooms: 0, // Event spaces instead of hotel rooms
    diningVenues: 0,
    eventCapacity: 600,
    conciergeHours: "24/7",
  };

  // Virtual tour data
  const virtualTour = {
    url: 'https://royal-court-virtual-tour.com',
    thumbnail: hotelData?.images?.[0] || '',
    provider: 'spalba' as const
  };

  // Hero section images - Updated with new Supabase URLs
  const heroImages = [
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivolilotuscourt/banner%20images/Entrance_optimized_200.jpg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivolilotuscourt/banner%20images/Astoria_optimized_200.jpg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivolilotuscourt/banner%20images/Facade_optimized_200.jpg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivolilotuscourt/banner%20images/Lobby_optimized_200.jpg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivolilotuscourt/banner%20images/Regency%20Pre%20Function%20Area%20(2).jpeg'
  ];

  // Gallery images - Updated with new Supabase URLs
  const galleryImages = [
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivolilotuscourt/gallary/170A7856_1_optimized_200.jpg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivolilotuscourt/gallary/170A7960_optimized_200.jpg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivolilotuscourt/gallary/170A7989_1_optimized_200.jpg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivolilotuscourt/gallary/170A8004_1_optimized_200.jpg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivolilotuscourt/gallary/Facade_2_optimized_200.jpg'
  ];

  // Social media links
  const socialMedia = {
    instagram: 'https://instagram.com/tivolihotels',
    facebook: 'https://facebook.com/tivolihotels',
    twitter: 'https://twitter.com/tivolihotels'
  };

  // Set page metadata
  useEffect(() => {
    if (hotelData) {
      document.title = `${hotelData.name} - Premier Event Venue | Tivoli`;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 
          `${hotelData.description} Premier event venue in ${hotelData.address?.city} featuring Astoria Hall and REGENCY halls, outdoor venues, and comprehensive event services.`
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
            <h1 className="text-2xl font-serif text-neutral-800 mb-4">Unable to Load Venue</h1>
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

  // Venue not found
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
              href="/locations"
              className="bg-[#CD9F59] text-white px-6 py-2 rounded-lg hover:bg-[#CD9F59]/90 transition-colors duration-200 inline-block"
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
            location={hotelData.address?.city || 'Delhi'}
            state={hotelData.address?.state || 'Delhi'}
            images={heroImages}
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
              location={hotelData.address?.city || 'Delhi'}
              additionalDescription={`Located in the dynamic Okhla Industrial Area, ${hotelData.name} specializes in creating unforgettable celebrations. Our sophisticated venue features multiple banquet halls, outdoor spaces, and comprehensive event services designed to make every occasion a masterpiece.`}
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
              rooms={roomsData || []}
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

          {/* Event Spaces Section - Tertiary Loading */}
          {showSkeletonUI ? (
            <SkeletonSpaces />
          ) : shouldLoad('spaces') ? (
            <SpacesSection 
              spaces={venueSpaces}
            />
          ) : (
            <SkeletonSpaces />
          )}

          {/* Experiences Section - Tertiary Loading */}
          {showSkeletonUI ? (
            <SkeletonExperiences />
          ) : shouldLoad('experiences') ? (
            <ExperiencesSection 
              experiences={experiences}
            />
          ) : (
            <SkeletonExperiences />
          )}

          {/* Catering Section - Tertiary Loading */}
          {showSkeletonUI ? (
            <SkeletonDining />
          ) : shouldLoad('dining') ? (
            <DiningSection 
              venues={diningVenues}
            />
          ) : (
            <SkeletonDining />
          )}

          {/* Gallery Section - Tertiary Loading */}
          {showSkeletonUI ? (
            <SkeletonGallery />
          ) : shouldLoad('gallery') ? (
            <GallerySection 
              images={galleryImages}
              hotelName="Tivoli Royal Court"
            />
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
              address={hotelData.address}
              contact={hotelData.contact}
              socialMedia={socialMedia}
              mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.4962656381234!2d77.25258767549746!3d28.545599175742816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3cbf5555555%3A0x1234567890abcdef!2sOkhla%20Phase%20I%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1710934800000!5m2!1sen!2sin"
            />
          ) : (
            <SkeletonContact />
          )}
        </div>
      </div>

      {/* Venue Booking Form Section - Background Loading */}
      {shouldLoad('booking-form') && hotelData && (
        <div className="bg-[#F8F9FA] py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="font-serif text-3xl text-neutral-800 mb-4">Plan Your Special Event</h2>
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
    </div>
  );
};

export default EnhancedRoyalCourtPage;