/**
 * Specialized Hook for The Tivoli-New Delhi
 * Comprehensive data fetching with enhanced features for the flagship property
 */

import { useState, useEffect, useMemo } from 'react';
import { useHotel, useHotelMedia, transformHotelData } from './useSupabase';
import { useCachedData } from './useClientCache';
import { Hotel } from '@/types/hotel';

// Enhanced types specific to The Tivoli-New Delhi
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
  image?: string;
  images?: string[];
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
  // Additional specific data for The Tivoli
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

// Static enhanced data for The Tivoli-New Delhi
const TIVOLI_ENHANCED_DATA = {
  spaces: [
    {
      id: 'oyster-greens',
      name: 'Oyster Greens',
      capacity: 800,
      area: '6,000 sq ft',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//oyster%20hall.jpg',
      features: [
        'Fully air-conditioned space',
        'Professional sound system', 
        'LED lighting setup',
        'Dedicated entrance',
        'Premium catering capabilities'
      ],
      description: 'Our premium banquet hall with sophisticated lighting and acoustics'
    },
    {
      id: 'ntb-hall',
      name: 'NTB Hall',
      capacity: 300,
      area: '2,500 sq ft',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//Ntb%20hall.jpg',
      features: [
        'Fully air-conditioned space',
        'Professional sound system',
        'LED lighting setup', 
        'Dedicated entrance',
        'Intimate setting perfect for celebrations'
      ],
      description: 'Elegant medium-sized venue ideal for intimate gatherings'
    },
    {
      id: 'emperors-court',
      name: "Emperor's Court",
      capacity: 200,
      area: '4,000 sq ft',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//Emperor\'s%20Court.png',
      features: [
        'Sprawling outdoor space',
        'Perfect for day events',
        'Landscaped gardens',
        'Outdoor lighting available',
        'Natural ambiance'
      ],
      description: 'Breathtaking outdoor venue surrounded by manicured gardens'
    },
    {
      id: 'oakwood-hall',
      name: 'Oakwood Hall',
      capacity: 1000,
      area: '8,000 sq ft',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//Oakwood%20hall.jpg',
      features: [
        'Fully air-conditioned space',
        'Professional sound system',
        'LED lighting setup',
        'Dedicated entrance',
        'Grand celebration venue'
      ],
      description: 'Our largest and most magnificent banquet hall for grand celebrations'
    }
  ],

  diningVenues: [
    {
      id: 'blue-grotto',
      name: 'Blue Grotto',
      description: 'A luxurious poolside cafe that draws inspiration from the iconic Blue Grotto Cave in Italy, famous for its enchanting blue waters and serene ambience',
      cuisine: 'International Cafe',
      hours: '24 Hours',
      images: [
        'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//Blue%20Grotto-4.png',
        'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//Blue%20Grotto-1.png',
        'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//Blue%20Grotto-3.png',
        'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//Blue%20Grotto-2.png',
        'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//Blue%20Grotto-5.png'
      ],
      specialties: ['Poolside Dining', 'Italian Inspired', 'All-Day Service']
    },
    {
      id: 'zuun',
      name: 'Zunn',
      description: 'Where tradition meets innovation on your plate. Experience the essence of Asia with a modern twist, offering a unique culinary journey to delight your senses',
      cuisine: 'Modern Asian',
      hours: '7:00 PM - 11:00 PM',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      specialties: ['Traditional Asian', 'Modern Innovation', 'Culinary Journey']
    },
    {
      id: 'aria',
      name: 'Aria',
      description: 'An all-day dining cafe experience with a serene view of the poolside. Indulge in fresh flavorful dishes while you soak in the tranquil sunshine',
      cuisine: 'International Cuisine',
      hours: '12:00 PM - 6:00 PM',
      images: [
        'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//Aria-2.png',
        'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//Aria-1.png'
      ],
      specialties: ['Poolside Views', 'Fresh Dishes', 'Tranquil Atmosphere']
    },
    {
      id: 'trafalgars',
      name: "Trafalgar's",
      description: 'A jazzy speakeasy where vintage charm meets modern mixology. Tucked away in an intimate setting, it boasts soulful music and expertly crafted cocktails',
      cuisine: 'Cocktail Bar',
      hours: '6:00 PM - 1:00 AM',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//Trafalgar%20bar.jpg',
      specialties: ['Vintage Charm', 'Craft Cocktails', 'Soulful Music']
    }
  ],

  experiences: [
    {
      id: 'corporate-events',
      title: 'Corporate Events',
      subtitle: 'Professional Excellence',
      description: 'Experience flawless corporate events hosted at elegant, sophisticated venues with state-of-the-art facilities',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//zunn.jpg',
      category: 'Business'
    },
    {
      id: 'poolside-soirees',
      title: 'Poolside Soirées',
      subtitle: 'Heritage Architecture',
      description: 'Exclusive retreats with private pools perfect for magical poolside weddings and intimate celebrations',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//heroimage4.jpg',
      category: 'Wedding'
    },
    {
      id: 'grand-celebrations',
      title: 'Grand Celebrations',
      subtitle: 'Royal Events',
      description: 'Magnificent venues for unforgettable events with royal ambiance and impeccable service',
      image: 'https://oawudxprjjgsdtsvroqt.supabase.co/storage/v1/object/public/tivoliheritagerewari//grand%20celebrations%20rewari.jpg',
      category: 'Event'
    },
    {
      id: 'premium-rooms',
      title: '130 Premium Rooms',
      subtitle: 'Luxury Accommodation',
      description: 'Our property features 130 stylish Premium Rooms designed for your comfort and elegance',
      image: 'https://oawudxprjjgsdtsvroqt.supabase.co/storage/v1/object/public/tivoliheritagerewari//standard%20room.jpg',
      category: 'Accommodation'
    },
    {
      id: 'dining-hall',
      title: 'Dining Experiences',
      subtitle: 'Culinary Excellence',
      description: 'Elegant. Ambient. Refined. A dining experience like no other with world-class cuisine',
      image: 'https://oawudxprjjgsdtsvroqt.supabase.co/storage/v1/object/public/tivoliheritagerewari//dinningorg.jpg',
      category: 'Dining'
    },
    {
      id: 'pre-wedding-rituals',
      title: 'Pre Wedding Rituals',
      subtitle: 'Sacred Traditions',
      description: 'Traditional, joyful, colorful, sacred, festive, cultural, musical, emotional, celebratory events',
      image: 'https://oawudxprjjgsdtsvroqt.supabase.co/storage/v1/object/public/tivoliheritagerewari//pre%20wedding.jpg',
      category: 'Wedding'
    }
  ],

  galleryImages: [
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//The%20Tivoli%20facade%20hero2.png',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//The%20Tivoli%20Main%20Gate%20Hero-3.png',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//The%20Tivoli%20Pool%20Hero6.png',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//The%20Tivoli%20Porch%20Hero-1.png',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//The%20Tivoli-Lobby%20hero-5.png',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//lobby-1.png',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//lobby-2.png'
  ],

  virtualTour: {
    url: 'https://spalba.com/properties/51dvYlEQCd?share=true&play=0&nt=1',
    provider: 'spalba' as const,
    thumbnail: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//The%20Tivoli%20Main%20Gate%20Hero-3.png'
  },

  quickStats: {
    rooms: 130,
    diningVenues: 5,
    eventCapacity: 3000,
    conciergeHours: '24/7'
  },

  socialMedia: {
    instagram: 'https://www.instagram.com/thetivoli.newdelhi/',
    facebook: 'https://www.facebook.com/thetivolinewdelhi1'
  }
};

/**
 * Custom hook for The Tivoli-New Delhi data with caching and optimization
 * Combines database data with enhanced static information
 */
export function useTivoliNewDelhi(slug: string = 'the-tivoli') {
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

  const enhancedData: EnhancedTivoliData | null = useMemo(() => {
    // Fallback data if database is not configured
    if (useFallback) {
      return {
        id: 'tivoli-grand-palace',
        name: 'The Tivoli-New Delhi',
        brand: 'tivoli',
        location: 'delhi',
        slug: 'tivoli-grand-palace',
        description: 'Experience unparalleled luxury at Tivoli Grand Palace, where timeless elegance meets modern sophistication. Nestled in the heart of Delhi, this architectural masterpiece offers a perfect blend of traditional Indian hospitality and contemporary comfort.',
        images: TIVOLI_ENHANCED_DATA.galleryImages,
        rating: 5,
        address: {
          street: '1, Chattarpur',
          city: 'New Delhi',
          state: 'Delhi',
          country: 'India',
          postalCode: '110074',
          coordinates: {
            lat: 28.5921,
            lng: 77.1691
          }
        },
        contact: {
          phone: '+91858885035,981855333, 011-47479999',
          email: 'reservations@thetivolihotels.com'
        },
        amenities: [
          { id: 'wifi', name: 'High-Speed WiFi', description: 'Complimentary high-speed internet access throughout the property', icon: 'Signal' },
          { id: 'pool', name: 'Swimming Pool', description: 'Temperature-controlled outdoor pool', icon: 'Pool' },
          { id: 'fitness', name: 'Fitness Center', description: '24/7 state-of-the-art fitness center with personal training', icon: 'Dumbbell' },
          { id: 'dining', name: 'Fine Dining', description: 'Multiple award-winning restaurants and bars', icon: 'Utensils' }
        ],
        rooms: [
          {
            id: 'deluxe',
            name: 'Deluxe Room',
            description: 'Elegant 45 sq.m. room with city views and luxury amenities',
            size: '45 sq.m.',
            maxOccupancy: 2,
            bedType: 'King or Twin',
            images: [],
            amenities: ['City View', 'Rain Shower', 'Mini Bar', 'Smart TV', '24/7 Room Service']
          }
        ],
        dining: [],
        features: ['Heritage Architecture', 'Luxury Spa', 'Multiple Restaurants', 'Outdoor Pool'],
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

export default useTivoliNewDelhi;