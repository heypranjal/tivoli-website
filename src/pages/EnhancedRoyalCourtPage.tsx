/**
 * Enhanced Royal Court Page with Premium Design
 * Matches The Tivoli page design quality for event venue showcase
 * Features: Venue-focused content, event spaces, banquet halls, premium UX
 */

import React, { useEffect, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import VenueBookingForm from '@/components/VenueBookingForm';
import { useProgressiveLoading } from '@/hooks/useProgressiveLoading';
import { useCachedData } from '@/hooks/useClientCache';
import { useHotel } from '@/hooks/useSupabase';
import { 
  HeroSection,
  OverviewSection,
  SpacesSection,
  ExperiencesSection,
  DiningSection,
  GallerySection,
  WeddingDestinationSection,
  ContactSection,
} from '@/components/hotel';
import { 
  SkeletonHero,
  SkeletonOverview,
  SkeletonSpaces,
  SkeletonExperiences,
  SkeletonDining,
  SkeletonGallery,
  SkeletonWedding,
  SkeletonContact
} from '@/components/ui/SkeletonComponents';

const EnhancedRoyalCourtPage: React.FC = () => {
  const { hotelSlug } = useParams<{ hotelSlug: string }>();
  
  // Progressive loading configuration for venue content
  const { shouldLoad } = useProgressiveLoading({
    immediate: ['navigation', 'hero'],
    priority: ['overview'],
    secondary: ['spaces'],
    tertiary: ['experiences', 'dining', 'gallery'],
    background: ['wedding', 'contact', 'booking-form']
  });

  // Fetch Royal Court data from Supabase
  const { data: hotelData, loading, error } = useHotel('tivoli-royal-court-okhla');

  // Transform venue data for event-focused components
  const venueSpaces = hotelData?.rooms?.map(room => ({
    id: room.id,
    name: room.name,
    description: room.description,
    size: room.size,
    capacity: room.maxOccupancy || 0,
    type: room.bedType === 'Event Hall' ? 'banquet' : 'outdoor',
    features: room.amenities || [],
    images: hotelData.images || [],
    pricing: {
      starting: room.price?.amount || 0,
      currency: room.price?.currency || 'INR'
    }
  })) || [];

  // Event experiences for Royal Court
  const experiences = [
    {
      id: 'weddings',
      title: 'Dream Weddings',
      description: 'Create magical moments with our comprehensive wedding services and stunning venues',
      image: hotelData?.images?.[0] || '',
      features: ['Custom Planning', 'Destination Weddings', 'Pre-Wedding Shoots', 'Live Counters']
    },
    {
      id: 'corporate',
      title: 'Corporate Events',
      description: 'Professional conferences and corporate gatherings with state-of-the-art facilities',
      image: hotelData?.images?.[1] || '',
      features: ['Meeting Rooms', 'Conference Facilities', 'Audio Visual Equipment', 'Catering Services']
    },
    {
      id: 'celebrations',
      title: 'Special Celebrations',
      description: 'Birthday parties, anniversaries, and milestone celebrations in elegant settings',
      image: hotelData?.images?.[2] || '',
      features: ['Flexible Layouts', 'Custom Decorations', 'Entertainment Options', 'Photography Services']
    }
  ];

  // Dining/Catering services for events
  const diningVenues = [
    {
      id: 'catering',
      name: 'In-house Catering',
      description: 'Exquisite culinary experiences with custom menus and live counters for all events',
      cuisine: 'Multi-cuisine',
      specialties: ['Indian Cuisine', 'Continental', 'Chinese', 'Live Chat Counter', 'Dessert Station'],
      image: hotelData?.images?.[0] || '',
      features: ['Custom Menus', 'Live Counters', 'Outside Catering Allowed']
    }
  ];

  // Quick stats for overview - compatible with OverviewSection component
  const quickStats = {
    rooms: 3, // Event spaces instead of hotel rooms
    diningVenues: 1,
    eventCapacity: 450,
    conciergeHours: '24/7'
  };

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
          `${hotelData.description} Premier event venue in ${hotelData.address?.city} featuring ASTORIA and REGENCY halls, outdoor venues, and comprehensive event services.`
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
            images={hotelData.images || []}
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

          {/* Event Spaces Section - Secondary Loading */}
          {showSkeletonUI ? (
            <SkeletonSpaces />
          ) : shouldLoad('spaces') ? (
            <SpacesSection 
              spaces={venueSpaces}
              title="Event Venues"
              subtitle="Elegant spaces designed for every celebration"
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
              title="Event Services"
              subtitle="Comprehensive solutions for every occasion"
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
              title="Catering Services"
              subtitle="Exquisite culinary experiences for your events"
            />
          ) : (
            <SkeletonDining />
          )}

          {/* Gallery Section - Tertiary Loading */}
          {showSkeletonUI ? (
            <SkeletonGallery />
          ) : shouldLoad('gallery') ? (
            <GallerySection images={hotelData.images || []} />
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