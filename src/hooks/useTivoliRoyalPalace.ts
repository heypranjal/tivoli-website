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
      id: "diamond-hall",
      name: "Diamond Hall",
      capacity: 1200,
      area: "12,000 sq ft",
      image:
        "https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal//DIAMOND_HALL.jpg",
      features: [
        "Majestic crystal chandeliers",
        "Royal-grade acoustics system",
        "Professional LED lighting",
        "Private royal entrance",
        "Premium catering facilities",
        "Heritage architecture details",
      ],
      description:
        "Our magnificent Diamond Hall with royal architecture and crystal chandeliers for the most prestigious events",
    },
    {
      id: "emerald-hall",
      name: "Emerald Hall",
      capacity: 600,
      area: "15,000 sq ft",
      image:
        "https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal//EMRALDhall.jpg",
      features: [
        "Elegant emerald-themed decor",
        "Heritage stone architecture",
        "Traditional royal lighting",
        "Landscaped surroundings",
        "Perfect for traditional ceremonies",
        "Natural royal ambiance",
      ],
      description:
        "Breathtaking Emerald Hall surrounded by heritage architecture and elegant emerald-themed interiors",
    },
    {
      id: "glass-house",
      name: "Glass House",
      capacity: 200,
      area: "5,500 sq ft",
      image:
        "https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal//Glass_House.jpeg",
      features: [
        "Modern glass architecture",
        "Natural lighting",
        "Contemporary design",
        "Private entrance",
        "Elegant setting for modern celebrations",
        "Panoramic views",
      ],
      description:
        "Contemporary Glass House venue with modern architecture and panoramic views perfect for stylish celebrations",
    },
    {
      id: "poolside",
      name: "Poolside",
      capacity: 200,
      area: "7,000 sq ft",
      image:
        "https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal//Poolside0.jpg",
      features: [
        "Poolside venue",
        "Water feature ambiance",
        "Outdoor setting",
        "Natural lighting",
        "Perfect for day ceremonies",
        "Refreshing atmosphere",
      ],
      description:
        "Beautiful Poolside venue with water feature ambiance and refreshing outdoor atmosphere for memorable events",
    },
  ],

  diningVenues: [
    {
      id: "Sapphire",
      name: "Sapphire",
      description:
        "Sapphire: The multi-cuisine restaurant serving an array of culinary delights and sumptuous buffets, making it an ideal venue for a lunch meeting or a relaxed dinner. You can also choose from an extensive a la carte menu featuring the best of Indian, Continental, and Oriental delicacies.",
      cuisine: "Royal Indian",
      hours:
        "Breakfast - 7:30 AM - 10:30 AM, Lunch - 12:30 PM - 3:00 PM, Dinner - 7:30 PM - 12:30 AM",
      dressCode: "Royal Formal",
      image:
        "https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/hotel-images/hotels/tivoli-grand-palace/dining/2.jpg",
      specialties: [
        "Heritage Royal Recipes",
        "Traditional Royal Thali",
        "Royal Banquet Service",
      ],
    },
  ],

  experiences: [
    {
      id: "corporate-events",
      title: "Corporate Events",
      subtitle: "Professional Excellence",
      description:
        "Experience flawless corporate events hosted at elegant, sophisticated venues with state-of-the-art facilities",
      image:
        "https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//zunn.jpg",
      category: "Business",
    },
    {
      id: "poolside-soirees",
      title: "Poolside Soirées",
      subtitle: "Heritage Architecture",
      description:
        "Exclusive retreats with private pools perfect for magical poolside weddings and intimate celebrations",
      image:
        "https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//heroimage4.jpg",
      category: "Wedding",
    },
    {
      id: "grand-celebrations",
      title: "Grand Celebrations",
      subtitle: "Royal Events",
      description:
        "Magnificent venues for unforgettable events with royal ambiance and impeccable service",
      image:
        "https://oawudxprjjgsdtsvroqt.supabase.co/storage/v1/object/public/tivoliheritagerewari//grand%20celebrations%20rewari.jpg",
      category: "Event",
    },
    {
      id: "premium-rooms",
      title: "45 Premium Rooms",
      subtitle: "Luxury Accommodation",
      description:
        "Our property features 45 stylish Premium Rooms designed for your comfort and elegance",
      image:
        "https://oawudxprjjgsdtsvroqt.supabase.co/storage/v1/object/public/tivoliheritagerewari//standard%20room.jpg",
      category: "Accommodation",
    },
    {
      id: "dining-hall",
      title: "Dining Experiences",
      subtitle: "Culinary Excellence",
      description:
        "Elegant. Ambient. Refined. A dining experience like no other with world-class cuisine",
      image:
        "https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/dinning%20experience/IMG_1504_optimized_200.jpeg",
      category: "Dining",
    },
    {
      id: "pre-wedding-rituals",
      title: "Pre Wedding Rituals",
      subtitle: "Sacred Traditions",
      description:
        "Traditional, joyful, colorful, sacred, festive, cultural, musical, emotional, celebratory events",
      image:
        "https://oawudxprjjgsdtsvroqt.supabase.co/storage/v1/object/public/tivoliheritagerewari//pre%20wedding.jpg",
      category: "Wedding",
    },
  ],

  galleryImages: [
    "https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal/Gallary/Facade_optimized_200.jpg", // Hotel Facade
    "https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal/Gallary/Main_Gate_optimized_200.jpg", // Main Gate
    "https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal/Gallary/pool.jpg", // Swimming Pool
    "https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal/Gallary/hotelporch.jpg", // Hotel Porch
    "https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal/Gallary/Lobby_optimized_200.jpg", // Hotel Lobby
  ],

  virtualTour: {
    url: "https://spalba.com/properties/royal-palace-tour?share=true&play=0&nt=1",
    provider: "spalba" as const,
    thumbnail:
      "https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/hotel-images/hotels/tivoli-grand-palace/rooms/1.jpg",
  },

  quickStats: {
    rooms: 45,
    diningVenues: 1,
    eventCapacity: 2500,
    conciergeHours: "24*7",
  },

  socialMedia: {
    instagram: "https://www.instagram.com/tivoliroyalpalace/",
    facebook: "https://www.facebook.com/share/1CCA5vGEgc/",
  },
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
        id: "tivoli-royal-palace",
        name: "Tivoli Royal Palace",
        brand: "tivoli",
        location: "palwal",
        slug: "tivoli-royal-palace",
        description:
          "Experience majestic luxury at Tivoli Royal Palace, where royal heritage meets modern grandeur. This magnificent palace hotel offers an extraordinary blend of regal architecture, traditional royal hospitality, and contemporary comfort in the heart of Palwal.",
        images: ROYAL_PALACE_ENHANCED_DATA.galleryImages,
        rating: 5,
        address: {
          street: "Royal Palace Road, Heritage District",
          city: "Palwal",
          state: "Haryana",
          country: "India",
          postalCode: "121102",
          coordinates: {
            lat: 28.1447,
            lng: 77.3313,
          },
        },
        contact: {
          phone: "9138960805",
          email: "reservations@tivoliroyalpalace.com",
        },
        amenities: [
          {
            id: "heritage",
            name: "Heritage Architecture",
            description:
              "Magnificent royal architecture with traditional craftsmanship",
            icon: "Building",
          },
          {
            id: "royal-spa",
            name: "Royal Spa",
            description:
              "Traditional royal wellness treatments and modern spa facilities",
            icon: "Spa",
          },
          {
            id: "palace-gardens",
            name: "Palace Gardens",
            description:
              "Beautifully landscaped royal gardens with heritage fountains",
            icon: "Garden",
          },
          {
            id: "royal-dining",
            name: "Royal Dining",
            description: "Multiple heritage dining venues with royal cuisine",
            icon: "Utensils",
          },
        ],
        rooms: [
          {
            id: "standard-room",
            name: "Standard Room",
            description:
              "Comfortable and elegant room with modern amenities and traditional decor",
            size: "240 Sq. Foot",
            maxOccupancy: 2,
            bedType: "King Bed",
            images: [],
            amenities: [
              "Air Conditioning",
              "Wi-Fi",
              "Room Service",
              "Television",
              "In-room Dining",
              "24-hour Housekeeping",
            ],
            price: { currency: "INR", amount: 0 },
          },
          {
            id: "deluxe-room",
            name: "Deluxe Room",
            description:
              "Spacious deluxe room offering enhanced comfort and premium amenities",
            size: "250 Sq. Foot",
            maxOccupancy: 2,
            bedType: "King Bed",
            images: [],
            amenities: [
              "Air Conditioning",
              "Wi-Fi",
              "Room Service",
              "Television",
              "In-room Dining",
              "24-hour Housekeeping",
            ],
            price: { currency: "INR", amount: 0 },
          },
        ],
        dining: [],
        features: [
          "Royal Heritage",
          "Palace Architecture",
          "Royal Gardens",
          "Heritage Spa",
        ],
        policies: {
          checkIn: "2:00 PM",
          checkOut: "12:00 PM",
          cancellation: "24 hours before arrival",
          pets: "Royal pets welcome with prior arrangement",
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
        ? mediaData
            .filter(m => m.media?.public_url)
            .map(m => m.media.public_url)
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