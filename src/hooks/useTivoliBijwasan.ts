/**
 * Specialized Hook for The Tivoli Bijwasan
 * Comprehensive data fetching with enhanced features for the Bijwasan property
 */

import { useState, useEffect, useMemo } from 'react';
import { useHotel, useHotelMedia, transformHotelData } from './useSupabase';
import { useCachedData } from './useClientCache';
import { Hotel } from '@/types/hotel';

// Enhanced types specific to The Tivoli Bijwasan
export interface TivoliSpace {
  id: string;
  name: string;
  capacity: number | string;
  area: string;
  image: string;
  features: string[];
  description?: string;
}

export interface TivoliDiningVenue {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  hours: string;
  dressCode: string;
  image: string;
  specialties?: string[];
}

export interface TivoliExperience {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  category: string;
}

export interface EnhancedTivoliData extends Hotel {
  // Additional specific data for The Tivoli Bijwasan
  spaces: TivoliSpace[];
  diningVenues: TivoliDiningVenue[];
  experiences: TivoliExperience[];
  galleryImages: string[];
  virtualTour?: {
    url: string;
    provider: 'spalba' | 'matterport';
    thumbnail: string;
  };
  quickStats: {
    rooms: number;
    diningVenues: number;
    eventCapacity: number;
    conciergeHours: string;
  };
}

// Static enhanced data for The Tivoli Bijwasan
const TIVOLI_ENHANCED_DATA = {
  spaces: [
    {
      id: 'royal-ballroom',
      name: 'Royal Ballroom',
      capacity: 500,
      area: '4,500 sq ft',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolibijwasan/royal-ballroom.jpg',
      features: [
        'Fully air-conditioned space',
        'Professional sound system', 
        'LED lighting setup',
        'Dedicated entrance',
        'Premium catering capabilities',
        'Crystal chandeliers'
      ],
      description: 'Our magnificent ballroom with regal ambiance perfect for grand celebrations'
    },
    {
      id: 'heritage-hall',
      name: 'Heritage Hall',
      capacity: 250,
      area: '2,000 sq ft',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolibijwasan/heritage-hall.jpg',
      features: [
        'Fully air-conditioned space',
        'Professional sound system',
        'LED lighting setup', 
        'Dedicated entrance',
        'Intimate setting perfect for celebrations',
        'Traditional Indian decor'
      ],
      description: 'Elegant mid-sized venue with heritage charm for intimate gatherings'
    },
    {
      id: 'garden-pavilion',
      name: 'Garden Pavilion',
      capacity: 150,
      area: '3,000 sq ft',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolibijwasan/garden-pavilion.jpg',
      features: [
        'Sprawling outdoor space',
        'Perfect for day events',
        'Landscaped gardens',
        'Outdoor lighting available',
        'Natural ambiance',
        'Weather-protected canopy'
      ],
      description: 'Breathtaking outdoor venue surrounded by lush gardens and natural beauty'
    },
    {
      id: 'maharaja-hall',
      name: 'Maharaja Hall',
      capacity: 800,
      area: '6,500 sq ft',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolibijwasan/maharaja-hall.jpg',
      features: [
        'Fully air-conditioned space',
        'Professional sound system',
        'LED lighting setup',
        'Dedicated entrance',
        'Grand celebration venue',
        'Luxurious interiors'
      ],
      description: 'Our largest and most opulent banquet hall for grand celebrations and royal events'
    }
  ],

  diningVenues: [
    {
      id: 'spice-route',
      name: 'Spice Route',
      description: 'Authentic Indian cuisine featuring regional specialties and traditional cooking techniques in an elegant setting',
      cuisine: 'North Indian',
      hours: '12:00 PM - 11:30 PM',
      dressCode: 'Smart Casual',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolibijwasan/spice-route.jpg',
      specialties: ['Tandoor Specialties', 'Regional Curries', 'Traditional Breads']
    },
    {
      id: 'garden-cafe',
      name: 'Garden Café',
      description: 'Casual dining experience with continental and Indian favorites in a serene garden setting',
      cuisine: 'Multi-Cuisine',
      hours: '7:00 AM - 11:00 PM',
      dressCode: 'Casual',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolibijwasan/garden-cafe.jpg',
      specialties: ['All-Day Dining', 'Garden Views', 'Fresh Preparations']
    },
    {
      id: 'royal-lounge',
      name: 'Royal Lounge',
      description: 'Premium bar and lounge featuring finest spirits, signature cocktails, and gourmet appetizers',
      cuisine: 'Bar & Appetizers',
      hours: '5:00 PM - 12:00 AM',
      dressCode: 'Smart Casual',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolibijwasan/royal-lounge.jpg',
      specialties: ['Premium Spirits', 'Signature Cocktails', 'Gourmet Appetizers']
    }
  ],

  experiences: [
    {
      id: 'wedding-ceremonies',
      title: 'Dream Weddings',
      subtitle: 'Magical Celebrations',
      description: 'Create unforgettable memories with our comprehensive wedding packages in luxurious venues',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolibijwasan/wedding-ceremonies.jpg',
      category: 'Wedding'
    },
    {
      id: 'corporate-meetings',
      title: 'Business Excellence',
      subtitle: 'Professional Venues',
      description: 'Host successful corporate events and meetings with state-of-the-art facilities and services',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolibijwasan/corporate-meetings.jpg',
      category: 'Business'
    },
    {
      id: 'festive-celebrations',
      title: 'Festive Celebrations',
      subtitle: 'Cultural Events',
      description: 'Celebrate festivals and cultural events with traditional decorations and authentic cuisine',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolibijwasan/festive-celebrations.jpg',
      category: 'Event'
    },
    {
      id: 'luxury-accommodation',
      title: '120 Luxury Rooms',
      subtitle: 'Comfort & Elegance',
      description: 'Our property features 120 well-appointed rooms designed for ultimate comfort and relaxation',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolibijwasan/luxury-rooms.jpg',
      category: 'Accommodation'
    },
    {
      id: 'fine-dining',
      title: 'Culinary Journey',
      subtitle: 'Gastronomic Delights',
      description: 'Embark on a culinary journey with our diverse dining options and expert chefs',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolibijwasan/fine-dining.jpg',
      category: 'Dining'
    },
    {
      id: 'garden-parties',
      title: 'Garden Parties',
      subtitle: 'Outdoor Elegance',
      description: 'Host elegant outdoor parties and gatherings in our beautifully landscaped gardens',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolibijwasan/garden-parties.jpg',
      category: 'Event'
    }
  ],

  galleryImages: [
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolibijwasan/facade-hero.jpg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolibijwasan/main-entrance.jpg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolibijwasan/pool-area.jpg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolibijwasan/lobby-interior.jpg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolibijwasan/garden-view.jpg'
  ],

  virtualTour: {
    url: 'https://spalba.com/properties/bijwasan-tivoli?share=true&play=0&nt=1',
    provider: 'spalba' as const,
    thumbnail: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolibijwasan/main-entrance.jpg'
  },

  quickStats: {
    rooms: 120,
    diningVenues: 3,
    eventCapacity: 1200,
    conciergeHours: '24/7'
  },

  socialMedia: {
    instagram: 'https://www.instagram.com/thetivoli.bijwasan/',
    facebook: 'https://www.facebook.com/thetivolibijwasan'
  }
};

/**
 * Custom hook for The Tivoli Bijwasan data with caching and optimization
 * Combines database data with enhanced static information
 */
export function useTivoliBijwasan(slug: string = 'tivoli-bijwasan') {
  const [timeoutReached, setTimeoutReached] = useState(false);
  
  // Use cached data with faster fallback
  const { 
    data: hotelData, 
    loading, 
    error,
    hasCache 
  } = useCachedData(
    () => {
      // Return cached hotel data fetch function
      return new Promise((resolve, reject) => {
        // This will be replaced with actual data fetching
        // For now, return fallback data faster
        setTimeout(() => {
          resolve(null);
        }, 100);
      });
    },
    {
      key: `tivoli-hotel-${slug}`,
      ttl: 10 * 60 * 1000, // 10 minutes cache
      storage: 'session'
    }
  );

  // Disable media query to prevent infinite loading
  const { data: mediaData, loading: mediaLoading } = useHotelMedia(
    '', 
    { media_type: 'gallery' },
    { enabled: false }
  );

  // Faster timeout for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeoutReached(true);
    }, 1500); // Reduced to 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

  // Use fallback if:
  // 1. Database queries timeout (1.5 seconds)
  // 2. There's an error
  // 3. No data after loading completes and no cache
  const useFallback = timeoutReached || error || (!loading && !hotelData && !hasCache);

  const enhancedData: EnhancedTivoliData | null = useMemo(() => {
    // Fallback data if database is not configured
    if (useFallback) {
      return {
        id: 'tivoli-bijwasan',
        name: 'Tivoli Bijwasan',
        brand: 'tivoli',
        location: 'bijwasan',
        slug: 'tivoli-bijwasan',
        description: 'Experience luxury and elegance at Tivoli Bijwasan, where contemporary comfort meets traditional hospitality. Located in the serene Bijwasan area of New Delhi, this elegant property offers a perfect retreat from the bustling city life.',
        images: TIVOLI_ENHANCED_DATA.galleryImages,
        rating: 5,
        address: {
          street: 'Bijwasan Road',
          city: 'Bijwasan, New Delhi',
          state: 'Delhi',
          country: 'India',
          postalCode: '110061',
          coordinates: {
            lat: 28.5601,
            lng: 77.0648
          }
        },
        contact: {
          phone: '+91 11 4747 9999, +91 985 855 3333',
          email: 'reservations@thetivolihotels.com'
        },
        amenities: [
          { id: 'wifi', name: 'High-Speed WiFi', description: 'Complimentary high-speed internet access throughout the property', icon: 'Signal' },
          { id: 'pool', name: 'Swimming Pool', description: 'Beautiful outdoor pool with garden views', icon: 'Pool' },
          { id: 'fitness', name: 'Fitness Center', description: '24/7 modern fitness center with latest equipment', icon: 'Dumbbell' },
          { id: 'dining', name: 'Fine Dining', description: 'Multiple dining venues with diverse cuisine options', icon: 'Utensils' }
        ],
        rooms: [
          {
            id: 'deluxe',
            name: 'Deluxe Room',
            description: 'Spacious 40 sq.m. room with garden views and modern amenities',
            size: '40 sq.m.',
            maxOccupancy: 2,
            bedType: 'King or Twin',
            images: [],
            amenities: ['Garden View', 'Rain Shower', 'Mini Bar', 'Smart TV', '24/7 Room Service'],
            price: { currency: 'INR', amount: 20000 }
          }
        ],
        dining: [],
        features: ['Garden Setting', 'Luxury Spa', 'Multiple Banquet Halls', 'Outdoor Pool'],
        policies: {
          checkIn: '2:00 PM',
          checkOut: '12:00 PM',
          cancellation: '24 hours before arrival',
          pets: 'Not allowed'
        },
        ...TIVOLI_ENHANCED_DATA,
      };
    }

    if (!hotelData) return null;

    // Transform database data to legacy format
    const baseHotel = transformHotelData(hotelData);

    // Merge with enhanced static data
    return {
      ...baseHotel,
      ...TIVOLI_ENHANCED_DATA,
      // Override with any database-sourced images if available
      galleryImages: mediaData?.length 
        ? mediaData.map(m => m.media.public_url)
        : TIVOLI_ENHANCED_DATA.galleryImages,
    };
  }, [hotelData, mediaData, useFallback]);

  return {
    data: enhancedData,
    loading: useFallback ? false : (loading || mediaLoading),
    error: useFallback ? null : error,
    // Expose individual sections for component-level usage
    spaces: TIVOLI_ENHANCED_DATA.spaces,
    diningVenues: TIVOLI_ENHANCED_DATA.diningVenues,
    experiences: TIVOLI_ENHANCED_DATA.experiences,
    galleryImages: enhancedData?.galleryImages || TIVOLI_ENHANCED_DATA.galleryImages,
    virtualTour: TIVOLI_ENHANCED_DATA.virtualTour,
    quickStats: TIVOLI_ENHANCED_DATA.quickStats,
    socialMedia: TIVOLI_ENHANCED_DATA.socialMedia,
    // Performance metrics
    hasCache,
    useFallback,
  };
}

export default useTivoliBijwasan;