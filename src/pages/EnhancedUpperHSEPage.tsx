/**
 * Enhanced Upper HSE Page with Progressive Loading
 * Delhi's Ultra Luxury Oval Glass House
 * Features: Progressive loading, modular components, skeleton states, performance optimization
 */

import React, { useEffect, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import VenueBookingForm from '@/components/VenueBookingForm';
import { useProgressiveLoading } from '@/hooks/useProgressiveLoading';
import { useCachedData } from '@/hooks/useClientCache';
import { 
  HeroSection,
  OverviewSection,
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
  SkeletonExperiences,
  SkeletonSpaces,
  SkeletonDining,
  SkeletonGallery,
  SkeletonWedding,
  SkeletonContact
} from '@/components/ui/SkeletonComponents';
import { upperHseVenues } from '@/data/venues/upper-hse-venues';

const EnhancedUpperHSEPage: React.FC = () => {
  const { hotelSlug } = useParams<{ hotelSlug: string }>();
  
  // Progressive loading configuration
  const { shouldLoad } = useProgressiveLoading({
    immediate: ['navigation', 'hero'],
    priority: ['overview'],
    secondary: [],
    tertiary: ['experiences', 'spaces', 'dining', 'gallery'],
    background: ['wedding', 'contact', 'booking-form']
  });

  // Get hotel data from our updated venue file with caching
  const { data: hotelData, isLoading: loading, error } = useCachedData(
    () => Promise.resolve(upperHseVenues.find(hotel => hotel.slug === (hotelSlug || 'upper-hse-sultanpur'))),
    { key: 'upper-hse-data', ttl: 300000 } // 5 minute cache
  );

  // Set page title and meta description
  useEffect(() => {
    if (hotelData) {
      document.title = `${(hotelData as any).name} - Delhi's Ultra Luxury Oval Glass House`;
      
      // Set meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 
          `Delhi's Ultra Luxury Oval Glass House. ${(hotelData as any).description} Located in ${(hotelData as any).address.city}, featuring iconic oval-shaped glass house, expansive gardens, and exceptional event spaces.`
        );
      }
    }
  }, [hotelData]);

  // Show skeleton UI while data loads
  const showSkeletonUI = loading && !hotelData;

  // Transform hotel data to component format
  const quickStats = hotelData ? {
    rooms: 0,
    diningVenues: 0,
    eventCapacity: 1200,
    conciergeHours: '24/7'
  } : {
    rooms: 4,
    diningVenues: 1,
    eventCapacity: 1000,
    conciergeHours: '24/7'
  };

  // Upper HSE-specific gallery images in MediaItem format
  const upperHSEGalleryImages = [
    {
      id: 'hse-img-1',
      type: 'image' as const,
      url: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/hsesultanpur/gallary/Screenshot%202025-07-25%20144527.png',
      title: 'Oval Glass House Interior',
      description: 'Elegant interior view of the iconic oval-shaped glass house venue'
    },
    {
      id: 'hse-img-2',
      type: 'image' as const,
      url: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/hsesultanpur/gallary/Screenshot%202025-07-25%20144409.png',
      title: 'Garden Landscape View',
      description: 'Beautiful outdoor garden space with lush green landscaping'
    },
    {
      id: 'hse-img-3',
      type: 'image' as const,
      url: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/hsesultanpur/gallary/Screenshot%202025-07-25%20144608.png',
      title: 'Venue Architecture',
      description: 'Stunning architectural details of the ultra-luxury venue'
    },
    {
      id: 'hse-img-4',
      type: 'image' as const,
      url: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/hsesultanpur/gallary/Screenshot%202025-07-25%20144720.png',
      title: 'Event Setup View',
      description: 'Professional event setup in the glass house venue'
    },
    {
      id: 'hse-img-5',
      type: 'image' as const,
      url: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/hsesultanpur/gallary/Screenshot%202025-07-25%20144817.png',
      title: 'Luxury Seating Area',
      description: 'Premium seating arrangements with elegant décor'
    },
    {
      id: 'hse-img-6',
      type: 'image' as const,
      url: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/hsesultanpur/gallary/Screenshot%202025-07-25%20144747.png',
      title: 'Venue Ambiance',
      description: 'Sophisticated ambiance and lighting of the venue space'
    }
  ];

  // Use the MediaItem format for gallery
  const galleryImages = upperHSEGalleryImages;
  
  // Create string array for components that need just URLs
  const imageUrls = upperHSEGalleryImages.map(img => img.url);
  // Upper HSE-specific event spaces
  const upperHSESpaces = [
    {
      id: '1',
      name: 'Oval Glass House',
      capacity: { min: 200, max: 600 },
      area: '10000 Sq ft',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/hsesultanpur/banner/Screenshot%202025-07-25%20144527.jpg',
      features: ['Iconic Oval Architecture', 'Fully Air-Conditioned', 'Premium Setup', 'Professional Lighting'],
      description: 'Our signature oval-shaped glass house venue offering elegant ambiance for the most important celebrations'
    },
    {
      id: '2',
      name: 'Open Lush Garden',
      capacity: { min: 650, max: 1800 },
      area: '30000 Sq ft',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/hsesultanpur/banner/Screenshot%202025-07-25%20144720.jpg',
      features: ['Expansive Outdoor Space', 'Lush Green Gardens', 'Natural Ambiance', 'Flexible Layout'],
      description: 'Expansive outdoor garden space perfect for large gatherings, outdoor ceremonies, and celebrations under the open sky'
    }
  ];
  const diningVenues = (hotelData as any)?.amenities?.filter((amenity: any) => amenity.name.toLowerCase().includes('dining')) || [];
  // Upper HSE-specific experiences - Updated with factual content
  const upperHSEExperiences = [
    {
      id: '1',
      title: 'Grand Weddings',
      subtitle: 'Royal Celebrations',
      description: 'Seamless royal wedding experiences in our iconic oval-shaped glass house, outdoor ceremonies on lush lawns, and sophisticated pre-wedding events.',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/hsesultanpur/banner/Screenshot%202025-07-25%20144720.jpg',
      category: 'wedding'
    },
    {
      id: '2',
      title: 'Oval Glass House Events',
      subtitle: 'Signature Venue',
      description: 'Our signature oval-shaped glass house provides an elegant, fully air-conditioned venue for your most important celebrations with capacity for up to 1000 guests.',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/hsesultanpur/banner/Screenshot%202025-07-25%20144527.jpg',
      category: 'venue'
    },
    {
      id: '3',
      title: 'Corporate Conferences',
      subtitle: 'Business Excellence',
      description: 'Ultra-luxury venue with modern amenities, 200-car parking with valet service, and pre-function areas perfect for business events and conferences.',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/hsesultanpur/banner/Screenshot%202025-07-25%20144817.jpg',
      category: 'business'
    },
    {
      id: '4',
      title: 'Social Gatherings',
      subtitle: 'Milestone Moments',
      description: 'Milestone celebrations, family reunions, and festive gatherings in our beautiful glass house setting with serene garden spaces and luxury amenities.',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/hsesultanpur/banner/Screenshot%202025-07-25%20144846.jpg',
      category: 'social'
    },
    {
      id: '5',
      title: 'Pre-Wedding Shoots',
      subtitle: 'Captured Memories',
      description: 'Capture your special moments in our picturesque ultra-luxury setting with iconic oval glass architecture and beautiful outdoor garden spaces.',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/hsesultanpur/banner/Screenshot%202025-07-25%20144409.jpg',
      category: 'photography'
    },
    {
      id: '6',
      title: 'Luxury Events',
      subtitle: 'Exclusive Occasions',
      description: 'Host exclusive luxury events with premium catering, personalized service, and bespoke arrangements in our ultra-luxury glass house venue with world-class amenities.',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/hsesultanpur/banner/Screenshot%202025-07-25%20144720.jpg',
      category: 'luxury'
    }
  ];
  const socialMedia = (hotelData as any)?.socialMedia || {};

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
            hotelName={(hotelData as any).name}
            location={(hotelData as any).address.city}
            state={(hotelData as any).address.state}
            images={imageUrls}
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
              hotelName={(hotelData as any).name}
              description={(hotelData as any).description}
              location={(hotelData as any).address.city}
              additionalDescription={``}
              quickStats={quickStats}
              hideStats={true}
            />
          ) : (
            <SkeletonOverview />
          )}

          {/* Video Section - After Overview */}
          <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl p-6 md:p-8">
            <div className="text-center mb-6">
              <h3 className="font-serif text-2xl text-neutral-800 mb-2">Experience The Upper HSE</h3>
              <p className="text-neutral-600">Take a virtual tour of Delhi's Ultra Luxury Oval Glass House</p>
            </div>
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src="https://drive.google.com/file/d/1j86jpmFfQJnTTfSda2OWPSfBW_yx_sJu/preview"
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="The Upper HSE - Virtual Experience"
              />
            </div>
          </div>

          {/* Experiences Section - Tertiary Loading */}
          {showSkeletonUI ? (
            <SkeletonExperiences />
          ) : shouldLoad('experiences') ? (
            <ExperiencesSection experiences={upperHSEExperiences} />
          ) : (
            <SkeletonExperiences />
          )}

          {/* Spaces Section - Tertiary Loading */}
          {showSkeletonUI ? (
            <SkeletonSpaces />
          ) : shouldLoad('spaces') ? (
            <SpacesSection spaces={upperHSESpaces} />
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
            <GallerySection 
              images={galleryImages}
              hotelName={(hotelData as any)?.name || 'The Upper HSE - Sultanpur by Tivoli'}
            />
          ) : (
            <SkeletonGallery />
          )}

        </div>
      </div>


      {/* Corporate Event Destination Section - Background Loading */}
      {showSkeletonUI ? (
        <SkeletonWedding />
      ) : shouldLoad('wedding') && hotelData ? (
        <WeddingDestinationSection hotelName={(hotelData as any).name} />
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
              address={(hotelData as any).address}
              contact={(hotelData as any).contact}
              socialMedia={socialMedia}
              mapEmbedUrl={(hotelData as any).mapEmbedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.6733831702897!2d77.18273957549579!3d28.496635075739174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1e25a8f714c1%3A0x9bc15e7b965ec179!2sThe%20Upper%20HSE!5e0!3m2!1sen!2sin!4v1710934800000!5m2!1sen!2sin"}
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
                  Let our expert team help you create unforgettable memories at {(hotelData as any).name}. 
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
            "@type": "LodgingBusiness",
            "name": (hotelData as any).name,
            "description": (hotelData as any).description,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": (hotelData as any).address.street,
              "addressLocality": (hotelData as any).address.city,
              "addressRegion": (hotelData as any).address.state,
              "postalCode": (hotelData as any).address.postalCode,
              "addressCountry": (hotelData as any).address.country
            },
            "geo": (hotelData as any).address.coordinates ? {
              "@type": "GeoCoordinates",
              "latitude": (hotelData as any).address.coordinates.lat,
              "longitude": (hotelData as any).address.coordinates.lng
            } : undefined,
            "telephone": (hotelData as any).contact.phone,
            "email": (hotelData as any).contact.email,
            "starRating": {
              "@type": "Rating",
              "ratingValue": (hotelData as any).rating
            },
            "amenityFeature": (hotelData as any).amenities?.map((amenity: any) => ({
              "@type": "LocationFeatureSpecification",
              "name": amenity.name,
              "value": true
            })),
            "hasMap": `https://www.google.com/maps/search/?api=1&query=${(hotelData as any).address.coordinates?.lat},${(hotelData as any).address.coordinates?.lng}`,
            "url": window.location.href,
            "image": galleryImages[0]?.url
          })}
        </script>
      )}
    </div>
  );
};

export default EnhancedUpperHSEPage;