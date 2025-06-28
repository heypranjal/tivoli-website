/**
 * Specialized Hook for Tivoli Royal Palace
 * Comprehensive data fetching with enhanced features for the royal palace property
 */

import { useState, useEffect, useMemo } from 'react';
import { useHotel, useHotelMedia, transformHotelData } from './useSupabase';
import { useCachedData } from './useClientCache';
import { Hotel } from '@/types/hotel';

// Enhanced types specific to Tivoli Royal Palace
export interface RoyalSpace {
  id: string;
  name: string;
  capacity: number | string;
  area: string;
  image: string;
  features: string[];
  description?: string;
}

export interface RoyalDiningVenue {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  hours: string;
  dressCode: string;
  image: string;
  specialties?: string[];
}

export interface RoyalExperience {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  category: string;
}

export interface EnhancedRoyalPalaceData extends Hotel {
  // Additional specific data for Tivoli Royal Palace
  spaces: RoyalSpace[];
  diningVenues: RoyalDiningVenue[];
  experiences: RoyalExperience[];
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

// Static enhanced data for Tivoli Royal Palace
const ROYAL_PALACE_ENHANCED_DATA = {
  spaces: [
    {
      id: 'grand-ballroom',
      name: 'Grand Ballroom',
      capacity: 1200,
      area: '10,000 sq ft',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/hotel-images/hotels/tivoli-lotus-court/gallery/3.jpg',
      features: [
        'Majestic crystal chandeliers',
        'Royal-grade acoustics system',
        'Professional LED lighting',
        'Private royal entrance',
        'Premium catering facilities',
        'Heritage architecture details'
      ],
      description: 'Our magnificent grand ballroom with royal architecture and crystal chandeliers for the most prestigious events'
    },
    {
      id: 'royal-court',
      name: 'Royal Court',
      capacity: 800,
      area: '8,000 sq ft',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/hotel-images/hotels/tivoli-lotus-court/gallery/5.jpg',
      features: [
        'Open-air royal courtyard',
        'Heritage stone architecture',
        'Traditional royal lighting',
        'Landscaped royal gardens',
        'Perfect for traditional ceremonies',
        'Natural royal ambiance'
      ],
      description: 'Breathtaking outdoor royal courtyard surrounded by heritage architecture and manicured royal gardens'
    },
    {
      id: 'imperial-hall',
      name: 'Imperial Hall',
      capacity: 600,
      area: '6,000 sq ft',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/hotel-images/hotels/tivoli-lotus-court/gallery/6.jpg',
      features: [
        'Climate-controlled royal ambiance',
        'Premium sound system',
        'Royal LED lighting setup',
        'Private imperial entrance',
        'Elegant setting for royal celebrations',
        'Heritage-inspired interiors'
      ],
      description: 'Elegant imperial venue with heritage-inspired interiors perfect for royal celebrations'
    },
    {
      id: 'palace-gardens',
      name: 'Palace Gardens',
      capacity: 400,
      area: '12,000 sq ft',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/hotel-images/hotels/tivoli-lotus-court/gallery/2.jpg',
      features: [
        'Sprawling royal gardens',
        'Heritage landscaping',
        'Royal fountain centerpiece',
        'Traditional lighting arrangements',
        'Perfect for day ceremonies',
        'Natural royal setting'
      ],
      description: 'Magnificent royal gardens with heritage landscaping and fountain centerpiece for outdoor royal events'
    }
  ],

  diningVenues: [
    {
      id: 'maharaja-dining',
      name: 'Maharaja Dining Hall',
      description: 'Royal Indian cuisine served in a magnificent hall with traditional royal ambiance and heritage recipes',
      cuisine: 'Royal Indian',
      hours: '7:00 AM - 11:00 PM',
      dressCode: 'Royal Formal',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/hotel-images/hotels/tivoli-grand-palace/dining/2.jpg',
      specialties: ['Heritage Royal Recipes', 'Traditional Royal Thali', 'Royal Banquet Service']
    },
    {
      id: 'royal-terrace',
      name: 'Royal Terrace',
      description: 'Elegant outdoor dining experience with panoramic views and contemporary royal cuisine',
      cuisine: 'Contemporary Royal',
      hours: '6:00 PM - 11:30 PM',
      dressCode: 'Smart Royal',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/hotel-images/hotels/tivoli-lotus-court/dining/1.jpg',
      specialties: ['Royal Fusion Cuisine', 'Panoramic Views', 'Sunset Dining']
    },
    {
      id: 'palace-cafe',
      name: 'Palace Café',
      description: 'Casual royal dining with heritage-inspired dishes and traditional royal tea service',
      cuisine: 'Heritage Casual',
      hours: '6:00 AM - 11:00 PM',
      dressCode: 'Smart Casual',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/hotel-images/hotels/tivoli-bijwasan/dining/1.jpg',
      specialties: ['Royal Tea Service', 'Heritage Snacks', 'Traditional Sweets']
    },
    {
      id: 'royal-bar',
      name: 'Royal Bar & Lounge',
      description: 'Premium royal bar featuring rare spirits, royal cocktails, and heritage-inspired ambiance',
      cuisine: 'Bar & Royal Bites',
      hours: '5:00 PM - 12:00 AM',
      dressCode: 'Royal Smart',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/hotel-images/hotels/tivoli-bijwasan/gallery/2.jpg',
      specialties: ['Rare Royal Spirits', 'Heritage Cocktails', 'Royal Bar Bites']
    }
  ],

  experiences: [
    {
      id: 'royal-weddings',
      title: 'Royal Weddings',
      subtitle: 'Majestic Celebrations',
      description: 'Experience the grandeur of royal wedding ceremonies in our heritage venues with traditional royal service and magnificent decor',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/hotel-images/hotels/tivoli-bijwasan/gallery/3.jpg',
      category: 'Wedding'
    },
    {
      id: 'heritage-events',
      title: 'Heritage Corporate Events',
      subtitle: 'Royal Business Excellence',
      description: 'Conduct prestigious corporate events in royal settings with state-of-the-art facilities and heritage ambiance',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//zunn.jpg',
      category: 'Business'
    },
    {
      id: 'royal-suites',
      title: 'Royal Suite Experience',
      subtitle: 'Luxury Accommodation',
      description: 'Stay in our magnificent royal suites featuring heritage decor, modern amenities, and personalized royal service',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/hotel-images/hotels/tivoli-grand-palace/rooms/11.jpg',
      category: 'Accommodation'
    },
    {
      id: 'palace-tours',
      title: 'Heritage Palace Tours',
      subtitle: 'Royal Architecture',
      description: 'Explore the magnificent architecture and rich heritage of our royal palace with guided historical tours',
      image: 'https://oawudxprjjgsdtsvroqt.supabase.co/storage/v1/object/public/royalpalacepalwal//Palace%20Tour.jpg',
      category: 'Experience'
    },
    {
      id: 'royal-dining',
      title: 'Royal Dining Experiences',
      subtitle: 'Culinary Royalty',
      description: 'Indulge in royal culinary traditions with heritage recipes and regal dining experiences fit for royalty',
      image: 'https://oawudxprjjgsdtsvroqt.supabase.co/storage/v1/object/public/royalpalacepalwal//Royal%20Dining%20Experience.jpg',
      category: 'Dining'
    },
    {
      id: 'cultural-celebrations',
      title: 'Cultural Royal Celebrations',
      subtitle: 'Heritage Traditions',
      description: 'Celebrate cultural festivals and traditions in royal style with authentic ceremonies and royal hospitality',
      image: 'https://oawudxprjjgsdtsvroqt.supabase.co/storage/v1/object/public/royalpalacepalwal//Cultural%20Celebration.jpg',
      category: 'Cultural'
    }
  ],

  galleryImages: [
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/hotel-images/hotels/tivoli-grand-palace/rooms/1.jpg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/hotel-images/hotels/tivoli-grand-palace/rooms/2.jpg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/hotel-images/hotels/tivoli-grand-palace/rooms/11.jpg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/hotel-images/hotels/tivoli-grand-palace/dining/2.jpg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/hotel-images/hotels/tivoli-lotus-court/gallery/2.jpg'
  ],

  virtualTour: {
    url: 'https://spalba.com/properties/royal-palace-tour?share=true&play=0&nt=1',
    provider: 'spalba' as const,
    thumbnail: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/hotel-images/hotels/tivoli-grand-palace/rooms/1.jpg'
  },

  quickStats: {
    rooms: 200,
    diningVenues: 4,
    eventCapacity: 1200,
    conciergeHours: '24/7'
  },

  socialMedia: {
    instagram: 'https://www.instagram.com/tivoliroyalpalace/',
    facebook: 'https://www.facebook.com/tivoliroyalpalace'
  }
};

/**
 * Custom hook for Tivoli Royal Palace data with caching and optimization
 * Combines database data with enhanced static information
 */
export function useTivoliRoyalPalace(slug: string = 'tivoli-royal-palace') {
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
      key: `royal-palace-hotel-${slug}`,
      ttl: 10 * 60 * 1000, // 10 minutes cache
      storage: 'session'
    }
  );

  // Memoize the media filters to prevent infinite re-renders
  const mediaFilters = useMemo(() => ({ 
    media_type: 'gallery' as const 
  }), []);

  // Memoize the media options to prevent infinite re-renders
  const mediaOptions = useMemo(() => ({ 
    enabled: !!hotelData?.id 
  }), [hotelData?.id]);

  // Fetch media data from database (with stable object references)
  const { data: mediaData, loading: mediaLoading } = useHotelMedia(
    hotelData?.id || '', 
    mediaFilters,
    mediaOptions
  );

  // Faster timeout for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeoutReached(true);
    }, 10000); // Increased to 10 seconds for testing API tracking

    return () => clearTimeout(timer);
  }, []);

  // Use fallback if:
  // 1. Database queries timeout (1.5 seconds)
  // 2. There's an error
  // 3. No data after loading completes and no cache
  const useFallback = timeoutReached || error || (!loading && !hotelData && !hasCache);

  const enhancedData: EnhancedRoyalPalaceData | null = useMemo(() => {
    // Fallback data if database is not configured
    if (useFallback) {
      return {
        id: 'tivoli-royal-palace',
        name: 'Tivoli Royal Palace',
        brand: 'tivoli',
        location: 'palwal',
        slug: 'tivoli-royal-palace',
        description: 'Experience majestic luxury at Tivoli Royal Palace, where royal heritage meets modern grandeur. This magnificent palace hotel offers an extraordinary blend of regal architecture, traditional royal hospitality, and contemporary comfort in the heart of Palwal.',
        images: ROYAL_PALACE_ENHANCED_DATA.galleryImages,
        rating: 5,
        address: {
          street: 'Royal Palace Road, Heritage District',
          city: 'Palwal',
          state: 'Haryana',
          country: 'India',
          postalCode: '121102',
          coordinates: {
            lat: 28.1447,
            lng: 77.3313
          }
        },
        contact: {
          phone: '+91 9999 888 777, +91 8888 777 666',
          email: 'reservations@tivoliroyalpalace.com'
        },
        amenities: [
          { id: 'heritage', name: 'Heritage Architecture', description: 'Magnificent royal architecture with traditional craftsmanship', icon: 'Building' },
          { id: 'royal-spa', name: 'Royal Spa', description: 'Traditional royal wellness treatments and modern spa facilities', icon: 'Spa' },
          { id: 'palace-gardens', name: 'Palace Gardens', description: 'Beautifully landscaped royal gardens with heritage fountains', icon: 'Garden' },
          { id: 'royal-dining', name: 'Royal Dining', description: 'Multiple heritage dining venues with royal cuisine', icon: 'Utensils' }
        ],
        rooms: [
          {
            id: 'royal-suite',
            name: 'Royal Suite',
            description: 'Magnificent 80 sq.m. royal suite with heritage decor and panoramic palace views',
            size: '80 sq.m.',
            maxOccupancy: 4,
            bedType: 'Royal King',
            images: [],
            amenities: ['Palace Views', 'Royal Bath', 'Mini Palace Bar', 'Heritage Decor', '24/7 Royal Service'],
            price: { currency: 'INR', amount: 45000 }
          }
        ],
        dining: [],
        features: ['Royal Heritage', 'Palace Architecture', 'Royal Gardens', 'Heritage Spa'],
        policies: {
          checkIn: '2:00 PM',
          checkOut: '12:00 PM',
          cancellation: '24 hours before arrival',
          pets: 'Royal pets welcome with prior arrangement'
        },
        ...ROYAL_PALACE_ENHANCED_DATA,
      };
    }

    if (!hotelData) return null;

    // Transform database data to legacy format
    const baseHotel = transformHotelData(hotelData);

    // Merge with enhanced static data
    return {
      ...baseHotel,
      ...ROYAL_PALACE_ENHANCED_DATA,
      // Override with any database-sourced images if available
      galleryImages: mediaData?.length 
        ? mediaData.map(m => m.media.public_url)
        : ROYAL_PALACE_ENHANCED_DATA.galleryImages,
    };
  }, [hotelData, mediaData, useFallback]);

  return {
    data: enhancedData,
    loading: useFallback ? false : (loading || mediaLoading),
    error: useFallback ? null : error,
    // Expose individual sections for component-level usage
    spaces: ROYAL_PALACE_ENHANCED_DATA.spaces,
    diningVenues: ROYAL_PALACE_ENHANCED_DATA.diningVenues,
    experiences: ROYAL_PALACE_ENHANCED_DATA.experiences,
    galleryImages: enhancedData?.galleryImages || ROYAL_PALACE_ENHANCED_DATA.galleryImages,
    virtualTour: ROYAL_PALACE_ENHANCED_DATA.virtualTour,
    quickStats: ROYAL_PALACE_ENHANCED_DATA.quickStats,
    socialMedia: ROYAL_PALACE_ENHANCED_DATA.socialMedia,
    // Performance metrics
    hasCache,
    useFallback,
  };
}

export default useTivoliRoyalPalace;