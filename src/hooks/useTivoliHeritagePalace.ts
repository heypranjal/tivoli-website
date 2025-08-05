/**
 * Specialized Hook for Tivoli Heritage Palace
 * Comprehensive data fetching with enhanced features for the heritage property
 */

import { useState, useEffect, useMemo } from 'react';
import { useHotel, useHotelMedia, transformHotelData } from './useSupabase';
import { useCachedData } from './useClientCache';
import { Hotel } from '@/types/hotel';

// Enhanced types specific to Tivoli Heritage Palace
export interface HeritageSpace {
  id: string;
  name: string;
  capacity: number | string;
  area: string;
  image: string;
  features: string[];
  description?: string;
}

export interface HeritageDiningVenue {
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

export interface HeritageExperience {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  category: string;
}

export interface EnhancedHeritageData extends Hotel {
  // Additional specific data for Heritage Palace
  spaces: HeritageSpace[];
  diningVenues: HeritageDiningVenue[];
  experiences: HeritageExperience[];
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

// Static enhanced data for Tivoli Heritage Palace
const HERITAGE_ENHANCED_DATA = {
  heroImages: [
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/banner%20images/Entrance_optimized_200.jpeg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/banner%20images/IMG_optimized_200.jpeg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/banner%20images/Lobby_optimized_200.jpeg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/banner%20images/Lobby3_optimized_200.jpeg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/banner%20images/Reception_optimized_200.jpeg'
  ],

  spaces: [
    {
      id: 'glasshouse-banquet',
      name: 'Glass House Banquet Hall',
      capacity: '200-250 guests',
      area: 'Signature venue',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/eventspace/Glass%20House%20inside.jpeg',
      features: ['Fully Air-Conditioned', 'Signature Design', 'Premium Setup', 'Professional Lighting'],
      description: 'Our signature GlassHouse banquet hall offering elegant ambiance for the most important celebrations'
    },
    {
      id: 'banquet-hall-2',
      name: 'Royal Affair Banquet',
      capacity: '400-500 guests',
      area: 'Additional hall',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/eventspace/Glass%20House.jpeg',
      features: ['Fully Air-Conditioned', 'Flexible Setup', 'Modern Amenities', 'Professional Staff'],
      description: 'Additional banquet hall with versatile configuration options for medium to large events'
    },
    {
      id: 'banquet-hall-3',
      name: 'Ocean Pavilion',
      capacity: '100-150 guests',
      area: 'Intimate venue',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/eventspace/OCEAN%20PAVILION.jpeg',
      features: ['Fully Air-Conditioned', 'Intimate Setting', 'Corporate Ready', 'Audio/Visual Support'],
      description: 'Perfect for smaller gatherings, corporate meetings, and intimate celebrations'
    },
    {
      id: 'outdoor-lawns',
      name: 'Ocean Garden',
      capacity: '300-400 guests',
      area: 'Two expansive lawns',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/eventspace/ROYAL%20AFFAIR.jpeg',
      features: ['Natural Setting', 'Weather Backup', 'Garden Views', 'Outdoor Ceremonies'],
      description: 'Two beautiful outdoor lawns surrounded by lush landscaping, perfect for destination weddings'
    }
  ],

  diningVenues: [
    {
      id: 'multi-cuisine-restaurant',
      name: 'The Royal Restaurant',
      description: 'Experience royal dining with our multi-cuisine restaurant offering Indian, Continental, and Chinese delicacies.',
      cuisine: 'Multi-cuisine',
      hours: '7:00 AM - 11:00 PM',
      dressCode: 'Smart Casual',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/dinning%20experience/IMG_1511_optimized_200.jpeg',
      specialties: ['Indian Cuisine', 'Continental Dishes', 'Chinese Specialties']
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
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/dinning%20experience/IMG_1504_optimized_200.jpeg',
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
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/Gallary/Facade_optimized_200.jpeg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/Gallary/Garden_optimized_200.jpeg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/Gallary/IMG_optimized_200.jpeg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/Gallary/Lobby_Entrance_optimized_200.jpeg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/Gallary/Pool_optimized_200.jpeg'
  ],

  virtualTour: {
    url: 'https://heritage-palace-virtual-tour.com',
    provider: 'spalba' as const,
    thumbnail: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/mainpagephoto5.jpg'
  },

  quickStats: {
    rooms: 90,
    diningVenues: 1,
    eventCapacity: 1800,
    conciergeHours: '24/7'
  },

  socialMedia: {
    instagram: 'https://www.instagram.com/tivoliheritagepalace/',
    facebook: 'https://www.facebook.com/tivoliheritagepalace'
  }
};

/**
 * Custom hook for Tivoli Heritage Palace data with caching and optimization
 * Combines database data with enhanced static information
 */
export function useTivoliHeritagePalace(slug: string = 'tivoli-heritage-palace') {
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
      key: `heritage-hotel-${slug}`,
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

  const enhancedData: EnhancedHeritageData | null = useMemo(() => {
    // Fallback data if database is not configured
    if (useFallback) {
      return {
        id: 'tivoli-heritage-palace',
        name: 'Tivoli Heritage Palace',
        brand: 'tivoli',
        location: 'rewari',
        slug: 'tivoli-heritage-palace',
        description: 'Experience the grandeur of Tivoli Heritage Palace, where royal heritage meets contemporary luxury. Set amidst lush landscapes in Rewari, our palace offers an extraordinary blend of traditional architecture, modern amenities, and impeccable hospitality for weddings, corporate events, and leisure stays.',
        images: HERITAGE_ENHANCED_DATA.galleryImages,
        rating: 4.5,
        address: {
          street: 'Kanhawas, 5PF3+53X Kanhawas',
          city: 'Rewari',
          state: 'Haryana',
          country: 'India',
          postalCode: '123401',
          coordinates: {
            lat: 28.1935,
            lng: 77.3092
          }
        },
        contact: {
          phone: '+91-9818553333',
          email: 'reservations@tivoliheritagepalace.com'
        },
        amenities: [
          { id: 'wifi', name: 'High-Speed WiFi', description: 'Complimentary high-speed internet access throughout the property', icon: 'Signal' },
          { id: 'pool', name: 'Swimming Pool', description: 'Outdoor pool with heritage views', icon: 'Pool' },
          { id: 'fitness', name: 'Fitness Center', description: 'Well-equipped fitness facility', icon: 'Dumbbell' },
          { id: 'dining', name: 'Multi-Cuisine Dining', description: 'The Royal Restaurant with multi-cuisine offerings', icon: 'Utensils' },
          { id: 'parking', name: 'Ample Parking', description: 'Spacious parking area for all guests', icon: 'Car' },
          { id: 'banquet', name: 'Event Spaces', description: 'Multiple banquet halls and outdoor lawns', icon: 'Building' }
        ],
        rooms: [
          {
            id: 'standard',
            name: 'Standard Room',
            description: 'Comfortable rooms with modern amenities and heritage charm',
            size: '250 sq.ft.',
            maxOccupancy: 2,
            bedType: 'King or Twin',
            images: [
              'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/room%20images/Standard_Room2_optimized_200.jpeg',
              'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/room%20images/Standard_Washroom_optimized_200.jpeg'
            ],
            amenities: ['Air Conditioning', 'LED TV', 'Mini Bar', 'Tea/Coffee Maker', '24/7 Room Service']
          },
          {
            id: 'Superior',
            name: ' Superior Room',
            description: 'Spacious deluxe rooms with enhanced comfort and luxury',
            size: '350 sq.ft.',
            maxOccupancy: 3,
            bedType: 'King',
            images: [
              'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/room%20images/Superior_Room_optimized.jpeg',
              'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/room%20images/Superior_Room_Washroom_optimized_200.jpeg',
              'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/room%20images/Superior_Room2_optimized_200.jpeg'
            ],
            amenities: ['Air Conditioning', 'LED TV', 'Mini Bar', 'Tea/Coffee Maker', '24/7 Room Service', 'Garden View']
          },
         
        ],
        dining: [],
        features: ['Heritage Architecture', 'Multiple Event Spaces', 'Outdoor Pool', 'Wedding Destination'],
        policies: {
          checkIn: '2:00 PM',
          checkOut: '12:00 PM',
          cancellation: '24 hours before arrival',
          pets: 'Not allowed'
        },
        ...HERITAGE_ENHANCED_DATA,
      };
    }

    if (!hotelData) return null;

    // Transform database data to legacy format
    const baseHotel = transformHotelData(hotelData);

    // Merge with enhanced static data
    return {
      ...baseHotel,
      ...HERITAGE_ENHANCED_DATA,
      // Override with any database-sourced images if available
      galleryImages: mediaData?.length 
        ? mediaData
            .filter(m => m.media?.public_url)
            .map(m => m.media.public_url)
        : HERITAGE_ENHANCED_DATA.galleryImages,
    };
  }, [hotelData, mediaData, useFallback]);

  // Transform rooms to match AccommodationsSection format
  const formattedRooms = enhancedData?.rooms?.map((room, index) => ({
    id: room.id,
    hotel_id: enhancedData.id,
    name: room.name,
    description: room.description,
    size_sqm: null,
    size_display: room.size || '',
    max_occupancy: room.maxOccupancy || 2,
    bed_type: room.bedType || '',
    price_inr: typeof room.price === 'object' ? room.price.amount : room.price || 0,
    sort_order: index,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    // Add amenities as a simple string array for compatibility
    amenities: room.amenities?.map(amenity => 
      typeof amenity === 'string' ? amenity : amenity.name
    ) || [],
    // Add images as RoomImage array
    images: room.images?.map((image, idx) => ({
      id: `${room.id}-image-${idx}`,
      url: image,
      alt: `${room.name} - Image ${idx + 1}`,
      isPrimary: idx === 0,
      sortOrder: idx
    })) || [],
    // Keep the detailed formats as well
    room_amenities: room.amenities?.map((amenity, idx) => ({
      id: `${room.id}-amenity-${idx}`,
      room_id: room.id,
      amenity_id: `amenity-${idx}`,
      amenity: { 
        id: `amenity-${idx}`, 
        name: typeof amenity === 'string' ? amenity : amenity.name,
        icon: null 
      }
    })) || [],
    room_images: room.images?.map((image, idx) => ({
      id: `${room.id}-image-${idx}`,
      room_id: room.id,
      media_id: `media-${idx}`,
      display_order: idx,
      media: { id: `media-${idx}`, public_url: image }
    })) || []
  })) || [];

  return {
    data: enhancedData,
    loading: useFallback ? false : (loading || mediaLoading),
    error: useFallback ? null : error,
    // Expose individual sections for component-level usage
    spaces: HERITAGE_ENHANCED_DATA.spaces,
    diningVenues: HERITAGE_ENHANCED_DATA.diningVenues,
    experiences: HERITAGE_ENHANCED_DATA.experiences,
    galleryImages: enhancedData?.galleryImages || HERITAGE_ENHANCED_DATA.galleryImages,
    virtualTour: HERITAGE_ENHANCED_DATA.virtualTour,
    quickStats: HERITAGE_ENHANCED_DATA.quickStats,
    socialMedia: HERITAGE_ENHANCED_DATA.socialMedia,
    rooms: formattedRooms,
    // Performance metrics
    hasCache,
    useFallback,
  };
}

export default useTivoliHeritagePalace;