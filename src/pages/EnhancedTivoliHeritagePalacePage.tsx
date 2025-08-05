/**
 * Enhanced Tivoli Heritage Palace Page with Progressive Loading
 * Comprehensive, database-driven detail page for The Tivoli Heritage Palace
 * Features: Complete data integration, modular components, progressive UX, performance optimization
 */

import React, { useEffect, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import VenueBookingForm from '@/components/VenueBookingForm';
import { useProgressiveLoading } from '@/hooks/useProgressiveLoading';
import { 
  HeroSection,
  OverviewSection,
  AccommodationsSection,
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
import { useTivoliHeritagePalace } from '@/hooks/useTivoliHeritagePalace';

const EnhancedTivoliHeritagePalacePage: React.FC = () => {
  const { hotelSlug } = useParams<{ hotelSlug: string }>();
  
  // Progressive loading configuration
  const { shouldLoad } = useProgressiveLoading({
    immediate: ['navigation', 'hero'],
    priority: ['overview'],
    secondary: ['accommodations'],
    tertiary: ['dining', 'gallery'],
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
    rooms,
  } = useTivoliHeritagePalace(hotelSlug || 'tivoli-heritage-palace');

  // Use loading states from the hook
  const roomsLoading = loading;
  const roomsError = error;

  // Set page title and meta description
  useEffect(() => {
    if (hotelData) {
      document.title = `${hotelData.name} - Heritage Luxury Hotel in ${hotelData.address.city}`;
      
      // Set meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 
          `${hotelData.description} Located in ${hotelData.address.city}, featuring luxury accommodations, world-class dining, and exceptional heritage event spaces.`
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
              Try Again after some time
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
              additionalDescription={`Located in the prestigious heritage city of ${hotelData.address.city}, Tivoli Heritage Palace offers an unmatched blend of royal grandeur and modern luxury. Our palace features elegantly appointed rooms, world-class dining venues, spectacular event spaces, and comprehensive amenities designed to create unforgettable experiences.`}
              quickStats={quickStats}
              showHeritageVideo={true}
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

          {/* Event Spaces Section - Secondary Loading */}
          {showSkeletonUI ? (
            <SkeletonSpaces />
          ) : shouldLoad('accommodations') ? (
            <SpacesSection spaces={[
              {
                id: 'royal-affair',
                name: 'Royal Affair',
                capacity: 500,
                area: '11,000 sq ft',
                image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/eventspace/ROYAL%20AFFAIR.jpeg',
                features: [
                  'Grand ballroom setting',
                  'Crystal chandeliers',
                  'Premium audio-visual equipment',
                  'Dedicated bridal suite',
                  'Professional event coordination',
                  'Customizable lighting'
                ],
                description: 'Our magnificent banquet hall perfect for grand celebrations, corporate events, and royal banquets with premium amenities.'
              },
              {
                id: 'glass-house',
                name: 'Glass House',
                capacity: 250,
                area: '6,000 sq ft',
                image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/eventspace/Glass%20House%20inside.jpeg',
                features: [
                  'Contemporary glass architecture',
                  'Natural lighting throughout',
                  'Climate-controlled environment',
                  'Modern presentation facilities',
                  'Flexible seating arrangements',
                  'Garden views'
                ],
                description: 'Modern glass architecture with natural lighting, ideal for sophisticated gatherings and corporate functions.'
              },
              {
                id: 'ocean-pavilion',
                name: 'Ocean Pavilion',
                capacity: 150,
                area: '2,400 sq ft',
                image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/eventspace/OCEAN%20PAVILION.jpeg',
                features: [
                  'Intimate pavilion setting',
                  'Serene ambiance',
                  'Private entrance',
                  'Dedicated service staff',
                  'Customizable décor',
                  'Perfect for ceremonies'
                ],
                description: 'Serene pavilion setting perfect for intimate weddings, private parties, and exclusive events.'
              },
              {
                id: 'ocean-garden',
                name: 'Ocean Garden',
                capacity: 400,
                area: '8,000 sq ft',
                image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/Gallary/IMG_optimized_200.jpeg',
                features: [
                  'Beautiful landscaped gardens',
                  'Outdoor ceremony space',
                  'Weather-protected options',
                  'Romantic lighting',
                  'Natural photo opportunities',
                  'Seasonal floral displays'
                ],
                description: 'Beautiful garden venue with lush landscaping, perfect for outdoor ceremonies and receptions.'
              },
              {
                id: 'sapphire-coffee-shop',
                name: 'The Sapphire Coffee Shop',
                capacity: '40-60',
                area: 'Premium Café',
                image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/eventspace/Glass%20House.jpeg',
                features: [
                  'Elegant café atmosphere',
                  'Premium coffee selection',
                  'Business meeting facilities',
                  'Free Wi-Fi',
                  'Quiet environment',
                  'Light refreshments'
                ],
                description: 'Elegant coffee shop perfect for business meetings, casual gatherings, and premium coffee experiences.'
              }
            ]} />
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
              hotelName="Tivoli Heritage Palace"
            />
          ) : (
            <SkeletonGallery />
          )}

        </div>
      </div>

      {/* Dignitaries Section - Tertiary Loading */}
      {shouldLoad('gallery') && hotelData && (
        <DiginitariesSection hotelName={hotelData.name} />
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
      <div className="container mx-auto px-4 md:px-16 space-y-16">
        <div className="space-y-16">
          {showSkeletonUI ? (
            <SkeletonContact />
          ) : shouldLoad('contact') && hotelData ? (
            <ContactSection
              address={hotelData.address}
              contact={hotelData.contact}
              socialMedia={socialMedia}
              mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3517.1266842394166!2d76.6997375755364!3d28.173062475918776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396d4f5cc79c2e43%3A0x2d9f71ec3b71483!2sTivoli%20Heritage%20Palace!5e0!3m2!1sen!2sin!4v1754289566862!5m2!1sen!2sin"
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
            "amenityFeature": hotelData.amenities.map(amenity => ({
              "@type": "LocationFeatureSpecification",
              "name": amenity.name,
              "value": true
            })),
            "hasMap": `https://www.google.com/maps/search/?api=1&query=${hotelData.address.coordinates?.lat},${hotelData.address.coordinates?.lng}`,
            "url": window.location.href,
            "image": galleryImages[0]
          })}
        </script>
      )}
    </div>
  );
};

export default EnhancedTivoliHeritagePalacePage;