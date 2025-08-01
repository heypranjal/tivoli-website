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
  AccommodationsSection,
  VirtualTourSection,
  ExperiencesSection,
  SpacesSection,
  DiningSection,
  GallerySection,
  DiginitariesSection,
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
import { upperHseVenues } from '@/data/venues/upper-hse-venues';

const EnhancedUpperHSEPage: React.FC = () => {
  const { hotelSlug } = useParams<{ hotelSlug: string }>();
  
  // Progressive loading configuration
  const { shouldLoad } = useProgressiveLoading({
    immediate: ['navigation', 'hero'],
    priority: ['overview'],
    secondary: ['accommodations', 'virtual-tour'],
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
    rooms: 4,
    diningVenues: 1,
    eventCapacity: 1000,
    conciergeHours: '24/7'
  } : {
    rooms: 4,
    diningVenues: 1,
    eventCapacity: 1000,
    conciergeHours: '24/7'
  };

  const galleryImages = (hotelData as any)?.images || [];
  const spaces = (hotelData as any)?.spaces || [];
  const diningVenues = (hotelData as any)?.amenities?.filter((amenity: any) => amenity.name.toLowerCase().includes('dining')) || [];
  const experiences = (hotelData as any)?.amenities?.map((amenity: any) => ({
    id: amenity.id,
    name: amenity.name,
    description: amenity.description,
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'luxury'
  })) || [];
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
              hotelName={(hotelData as any).name}
              description={(hotelData as any).description}
              location={(hotelData as any).address.city}
              additionalDescription={`Located in the prestigious Sultanpur Estate area of ${(hotelData as any).address.city}, The Upper HSE offers Delhi's most iconic ultra-luxury venue featuring an oval-shaped glass house complemented by expansive lush gardens. Our property accommodates 200 to 1000 guests, making it perfect for grand weddings, pre-wedding ceremonies, and corporate events with unmatched elegance and sophistication.`}
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
              rooms={(hotelData as any)?.rooms || []}
              loading={false}
              error={null}
            />
          ) : (
            <SkeletonAccommodations />
          )}

          {/* Virtual Tour Section - Secondary Loading */}
          {shouldLoad('virtual-tour') && hotelData && (
            <VirtualTourSection
              hotelName={(hotelData as any).name}
              tourUrl="#virtual-tour"
              thumbnailImage={galleryImages[0]}
              provider="spalba"
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

      {/* Dignitaries Section - Tertiary Loading */}
      {shouldLoad('gallery') && hotelData && (
        <DiginitariesSection hotelName={(hotelData as any).name} />
      )}

      {/* Wedding Destination Section - Background Loading */}
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
            "image": galleryImages[0]
          })}
        </script>
      )}
    </div>
  );
};

export default EnhancedUpperHSEPage;