/**
 * Enhanced Tivoli Heritage Palace Page
 * Feature-complete hotel detail page with progressive loading and full parity with The Tivoli page
 * Created: 2025-06-22
 */

import React, { useState, useEffect, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import VenueBookingForm from '@/components/VenueBookingForm';
import BookingWidget from '@/components/BookingWidget';
import { useHotel } from '@/hooks/useSupabase';
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

// Icon mapping for amenities
const iconMap: Record<string, React.ElementType> = {
  Signal: () => <div>📶</div>,
  Car: () => <div>🚗</div>,
  Utensils: () => <div>🍽️</div>,
  Dumbbell: () => <div>🏋️</div>,
  Coffee: () => <div>☕</div>,
  // Add more mappings as needed
};

export default function TivoliHeritagePalacePage() {
  const { hotelSlug } = useParams();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);
  
  // Progressive loading configuration
  const { shouldLoad } = useProgressiveLoading({
    immediate: ['navigation', 'hero'],
    priority: ['overview'],
    secondary: ['accommodations', 'virtual-tour'],
    tertiary: ['experiences', 'spaces', 'dining', 'gallery'],
    background: ['wedding', 'contact', 'booking-form']
  });
  
  // Use the slug from URL or default to heritage palace slug
  const slug = hotelSlug || 'tivoli-heritage-palace';
  const { data: hotelData, loading: isLoading, error } = useHotel(slug);
  
  // Transform the data to match expected structure
  const hotel = hotelData;
  
  // Set page title and meta description
  useEffect(() => {
    if (hotel) {
      document.title = `${hotel.name} - Heritage Luxury Hotel in ${hotel.city || 'Rewari'}`;
      
      // Set meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 
          `${hotel.description} Located in ${hotel.city || 'Rewari'}, featuring luxury accommodations, world-class dining, and exceptional heritage event spaces.`
        );
      }
    }
  }, [hotel]);
  
  // Show skeleton UI while data loads
  const showSkeletonUI = isLoading && !hotel;

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
  if (!isLoading && !hotel) {
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

  // Prepare data for components
  const galleryImages = hotel?.images?.filter(img => img.media_type === 'gallery').map(img => img.media.public_url) || [
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/swimming%20pool2rewari.jpg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/dinningorg.jpg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/grand%20celebrations%20rewari.jpg'
  ];
  const heroImages = hotel?.images?.filter(img => img.media_type === 'hero').map(img => img.media.public_url) || [
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/mainpagephoto5.jpg'
  ];
  const allImages = [...heroImages, ...galleryImages];
  
  // Quick stats for overview section - Updated with factual data
  const quickStats = {
    rooms: 90,
    diningVenues: 3,
    eventCapacity: 1000,
    conciergeHours: '24/7'
  };
  
  // Heritage-specific experiences - Updated with factual content
  const heritageExperiences = [
    {
      id: '1',
      title: 'Grand Weddings',
      description: 'Seamless royal wedding experiences with multiple versatile spaces, outdoor ceremonies on expansive lawns, and magical poolside venues.',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/pre%20wedding.jpg',
      category: 'wedding'
    },
    {
      id: '2',
      title: 'GlassHouse Banquet',
      description: 'Our signature GlassHouse banquet hall provides an elegant, fully air-conditioned venue for your most important celebrations.',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/swimming%20pool2rewari.jpg',
      category: 'venue'
    },
    {
      id: '3',
      title: 'Corporate Conferences',
      description: 'Three fully air-conditioned banquet halls with flexible configurations for 100-1000 attendees, perfect for business events.',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/grand%20celebrations%20rewari.jpg',
      category: 'business'
    },
    {
      id: '4',
      title: 'Social Gatherings',
      description: 'Milestone celebrations, family reunions, and festive gatherings in our beautiful heritage setting with modern amenities.',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/dinningorg.jpg',
      category: 'social'
    },
    {
      id: '5',
      title: 'Pre-Wedding Shoots',
      description: 'Capture your special moments in our picturesque heritage setting with royal architecture and beautiful outdoor spaces.',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal/corporate%20events.png',
      category: 'photography'
    }
  ];
  
  // Event spaces data - Updated with factual venue information
  const eventSpaces = [
    {
      id: '1',
      name: 'GlassHouse Banquet Hall',
      capacity: '500-1000 guests',
      area: 'Signature venue',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/grand%20celebrations%20rewari.jpg',
      features: ['Fully Air-Conditioned', 'Signature Design', 'Premium Setup', 'Professional Lighting'],
      description: 'Our signature GlassHouse banquet hall offering elegant ambiance for the most important celebrations'
    },
    {
      id: '2',
      name: 'Banquet Hall 2',
      capacity: '300-600 guests',
      area: 'Additional hall',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/mainpagephoto5.jpg',
      features: ['Fully Air-Conditioned', 'Flexible Setup', 'Modern Amenities', 'Professional Staff'],
      description: 'Additional banquet hall with versatile configuration options for medium to large events'
    },
    {
      id: '3',
      name: 'Banquet Hall 3',
      capacity: '100-400 guests',
      area: 'Intimate venue',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/swimming%20pool2rewari.jpg',
      features: ['Fully Air-Conditioned', 'Intimate Setting', 'Corporate Ready', 'Audio/Visual Support'],
      description: 'Perfect for smaller gatherings, corporate meetings, and intimate celebrations'
    },
    {
      id: '4',
      name: 'Outdoor Lawns',
      capacity: '500-800 guests',
      area: 'Two expansive lawns',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal/corporate%20events.png',
      features: ['Natural Setting', 'Weather Backup', 'Garden Views', 'Outdoor Ceremonies'],
      description: 'Two beautiful outdoor lawns surrounded by lush landscaping, perfect for destination weddings'
    }
  ];
  
  // Virtual tour data
  const virtualTour = {
    url: 'https://heritage-palace-virtual-tour.com',
    thumbnail: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/mainpagephoto5.jpg',
    provider: 'spalba' as const
  };

  return (
    <div className="min-h-screen bg-white scroll-optimized heritage-scroll-snap">
      {/* Navigation loads immediately */}
      <Navigation />
      
      {/* Hero Section - Priority Loading */}
      <section className="above-fold heritage-hero-overlay">
        {showSkeletonUI ? (
          <SkeletonHero />
        ) : shouldLoad('hero') ? (
          <div className="heritage-section-reveal">
            <HeroSection
              hotelName={hotel?.name || 'Tivoli Heritage Palace'}
              location={hotel?.location?.name || hotel?.city || 'Rewari'}
              state={hotel?.location?.state || hotel?.state || 'Haryana'}
              images={allImages}
            />
          </div>
        ) : (
          <SkeletonHero />
        )}
      </section>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 py-8 below-fold">
        <div className="max-w-6xl mx-auto space-y-16">
          
          {/* Overview Section - Priority Loading */}
          <section className="heritage-section-reveal">
            {showSkeletonUI ? (
              <SkeletonOverview />
            ) : shouldLoad('overview') ? (
              <OverviewSection
                hotelName={hotel?.name || 'Tivoli Heritage Palace'}
                description={hotel?.description || 'Experience the grandeur of Tivoli Heritage Palace, where royal heritage meets contemporary luxury. Set amidst lush landscapes in Rewari, our palace offers an extraordinary blend of traditional architecture, modern amenities, and impeccable hospitality for weddings, corporate events, and leisure stays.'}
                location={hotel?.city || 'Rewari'}
                additionalDescription={`Located in the prestigious heritage city of ${hotel?.city || 'Rewari'}, Tivoli Heritage Palace offers an unmatched blend of royal grandeur and modern luxury. Our palace features elegantly appointed rooms, world-class dining venues, spectacular event spaces, and comprehensive amenities designed to create unforgettable experiences.`}
                quickStats={quickStats}
              />
            ) : (
              <SkeletonOverview />
            )}
          </section>

          {/* Accommodations Section - Secondary Loading */}
          {showSkeletonUI ? (
            <SkeletonAccommodations />
          ) : shouldLoad('accommodations') ? (
            <AccommodationsSection
              rooms={hotel?.rooms?.map(room => ({
                id: room.id,
                name: room.name,
                description: room.description || '',
                size: room.size_display || '',
                maxOccupancy: room.max_occupancy || 2,
                bedType: room.bed_type || '',
                price: room.price_inr || 0,
                amenities: room.amenities?.map(a => a.amenity.name) || [],
                images: room.images?.map(img => img.media.public_url) || []
              })) || []}
            />
          ) : (
            <SkeletonAccommodations />
          )}

          {/* Virtual Tour Section - Secondary Loading */}
          {shouldLoad('virtual-tour') && (
            <VirtualTourSection
              hotelName={hotel?.name || 'Tivoli Heritage Palace'}
              tourUrl={virtualTour.url}
              thumbnailImage={virtualTour.thumbnail}
              provider={virtualTour.provider}
            />
          )}

          {/* Experiences Section - Tertiary Loading */}
          {showSkeletonUI ? (
            <SkeletonExperiences />
          ) : shouldLoad('experiences') ? (
            <ExperiencesSection
              experiences={heritageExperiences}
              title="Discover Heritage Luxury"
              subtitle="Curated Experiences"
              description="Immerse yourself in a world of refined experiences, where every moment is crafted to perfection"
            />
          ) : (
            <SkeletonExperiences />
          )}

          {/* Spaces Section - Tertiary Loading */}
          {showSkeletonUI ? (
            <SkeletonSpaces />
          ) : shouldLoad('spaces') ? (
            <SpacesSection spaces={eventSpaces} />
          ) : (
            <SkeletonSpaces />
          )}

          {/* Dining Section - Tertiary Loading */}
          {showSkeletonUI ? (
            <SkeletonDining />
          ) : shouldLoad('dining') ? (
            <DiningSection
              venues={hotel?.dining?.map(restaurant => ({
                id: restaurant.id,
                name: restaurant.name,
                description: restaurant.description || '',
                cuisine: restaurant.cuisine || 'International',
                hours: restaurant.hours || '6:00 AM - 11:00 PM',
                image: restaurant.image_id || 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/dinningorg.jpg',
                priceRange: '₹₹₹',
                specialties: []
              })) || [
                {
                  id: '1',
                  name: 'Coffee Shop',
                  description: 'Our welcoming coffee shop offers freshly brewed beverages, light snacks, and quick bites in a comfortable setting.',
                  cuisine: 'Beverages, Snacks',
                  hours: '6:00 AM - 10:00 PM',
                  image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/dinningorg.jpg',
                  priceRange: '₹₹',
                  specialties: ['Fresh Coffee', 'Light Snacks', 'Quick Service']
                },
                {
                  id: '2',
                  name: 'Catering Services',
                  description: 'Professional catering services for all your events, from intimate gatherings to grand celebrations with customized menus.',
                  cuisine: 'Multi-cuisine Catering',
                  hours: 'By Appointment',
                  image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/grand%20celebrations%20rewari.jpg',
                  priceRange: '₹₹₹',
                  specialties: ['Event Catering', 'Custom Menus', 'Wedding Packages']
                }
              ]}
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
              title="Gallery"
              description="Explore the beauty and elegance of Tivoli Heritage Palace"
            />
          ) : (
            <SkeletonGallery />
          )}

        </div>
      </div>

      {/* Wedding Destination Section - Background Loading */}
      {showSkeletonUI ? (
        <SkeletonWedding />
      ) : shouldLoad('wedding') ? (
        <WeddingDestinationSection
          title="Wedding at Tivoli Heritage Palace"
          subtitle="Your Dream Wedding Destination"
          capacity={1500}
          features={[
            {
              title: 'Ample Parking',
              description: 'Spacious parking area for all your guests',
              icon: 'Car'
            },
            {
              title: 'Pool Access',
              description: 'Beautiful poolside setting for events',
              icon: 'Pool'
            },
            {
              title: 'Exquisite Cuisine',
              description: 'Our master chefs craft personalized menus featuring both traditional delicacies and international cuisine, ensuring a memorable culinary experience for your guests.',
              icon: 'Utensils'
            }
          ]}
          heroImage={allImages[0] || 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/mainpagephoto5.jpg'}
          onBookingClick={() => document.querySelector('#venue-booking-form')?.scrollIntoView({ behavior: 'smooth' })}
        />
      ) : (
        <SkeletonWedding />
      )}

      {/* Contact Section - Background Loading */}
      <div className="container mx-auto px-4 md:px-16 space-y-16">
        <div className="space-y-16">
          {showSkeletonUI ? (
            <SkeletonContact />
          ) : shouldLoad('contact') ? (
            <ContactSection
              address={{
                street: hotel?.street || 'Kanhawas, 5PF3+53X Kanhawas',
                city: hotel?.city || 'Rewari',
                state: hotel?.state || 'Haryana',
                postalCode: hotel?.postal_code || '123401',
                country: hotel?.location?.country || 'India'
              }}
              contact={{
                phone: hotel?.phone || '+91-9818553333',
                email: hotel?.email || 'reservations@tivoliheritagepalace.com'
              }}
              socialMedia={[]}
              mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3516.4514419371176!2d77.30918827548489!3d28.19359377590727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cd1fe467c304b%3A0x5d9583931a50cb3e!2sTivoli%20Royal%20Palace!5e0!3m2!1sen!2sin!4v1744945233833!5m2!1sen!2sin"
            />
          ) : (
            <SkeletonContact />
          )}
        </div>
      </div>

      {/* Booking Form Section - Background Loading */}
      {shouldLoad('booking-form') && (
        <div className="bg-[#F8F9FA] py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="font-serif text-3xl text-neutral-800 mb-4">Plan Your Special Occasion</h2>
                <p className="text-neutral-600 leading-relaxed max-w-2xl mx-auto">
                  Let our expert team help you create unforgettable memories at Tivoli Heritage Palace. 
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
      {hotel && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Hotel",
            "name": hotel.name,
            "description": hotel.description,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": hotel.street || "Kanhawas, 5PF3+53X Kanhawas",
              "addressLocality": hotel.city || "Rewari",
              "addressRegion": hotel.state || "Haryana",
              "postalCode": hotel.postal_code || "123401",
              "addressCountry": "India"
            },
            "telephone": hotel.phone,
            "email": hotel.email,
            "starRating": {
              "@type": "Rating",
              "ratingValue": hotel.rating || 4.5
            },
            "amenityFeature": hotel.amenities?.map(a => ({
              "@type": "LocationFeatureSpecification",
              "name": a.amenity.name
            })) || []
          })}
        </script>
      )}

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-serif text-neutral-800">Book Your Stay</h2>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="text-neutral-400 hover:text-neutral-600"
                >
                  ×
                </button>
              </div>
            </div>
            <BookingWidget />
          </div>
        </div>
      )}
    </div>
  );
}