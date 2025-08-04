/**
 * Specialized Hook for Omnia By Tivoli - Dwarka Expressway
 * Fixed version without circular dependencies
 */

import { useState, useEffect, useMemo } from 'react';
import { useHotel, useHotelMedia } from './useSupabase';
import { Hotel } from '@/types/hotel';

// Enhanced types specific to Omnia Dwarka Expressway
export interface OmniaSpace {
  id: string;
  name: string;
  capacity: number | string;
  area: string;
  image: string;
  features: string[];
  description?: string;
}

export interface OmniaDiningVenue {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  hours: string;
  dressCode: string;
  image: string;
  specialties?: string[];
}

export interface OmniaExperience {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  category: string;
}

export interface EnhancedOmniaData extends Hotel {
  // Additional specific data for Omnia Dwarka Expressway
  spaces: OmniaSpace[];
  diningVenues: OmniaDiningVenue[];
  experiences: OmniaExperience[];
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

// Real factual data for Omnia By Tivoli - Dwarka Expressway
const OMNIA_DWARKA_ENHANCED_DATA = {
  spaces: [
    {
      id: '360-hall',
      name: '360 Hall',
      capacity: '300',
      area: '1900 sq ft',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/omniativolidwarka/banner/DSC03291_optimized_200.jpg',
      features: [
        'State-of-the-art climate control',
        'Professional audio-visual systems',
        'LED intelligent lighting',
        'Flexible seating configurations',
        'Dedicated service entrances',
        'Premium catering facilities'
      ],
      description: 'A stunning 1900 sq. ft. indoor hall perfect for intimate celebrations and events'
    },
    {
      id: 'mansion-hall',
      name: 'Mansion Hall',
      capacity: '1200',
      area: '5400 sq ft',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/omniativolidwarka/banner/DSC03284_optimized_200.jpg',
      features: [
        'Sprawling outdoor space',
        'Lush landscaped gardens',
        'Weather protection available',
        'Professional lighting systems',
        'Multiple entry points',
        'Flexible layout options'
      ],
      description: 'Elegant 5400 sq. ft. hall complementing the 360 Hall for grand celebrations'
    }
  ],

  diningVenues: [],

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
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/omniativolidwarka/banner/DSC03284_optimized_200.jpg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/omniativolidwarka/banner/DSC03291_optimized_200.jpg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/omniativolidwarka/banner/Mansion_Hall_optimized_200.jpg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/omniativolidwarka/banner/DSC03280_optimized_200.jpg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/omniativolidwarka/banner/DSC_4004_optimized_200.jpg'
  ],

  quickStats: {
    rooms: 0,
    diningVenues: 0,
    eventCapacity: 1200,
    conciergeHours: 'Event Services Available'
  },

  socialMedia: {
    instagram: 'https://www.instagram.com/omniabytivoli/',
    facebook: 'https://www.facebook.com/people/Omnia-By-Tivoli/61572671411929/'
  }
};

/**
 * Fixed hook for Omnia Dwarka Expressway data
 */
export function useOmniaDwarkaExpressway(slug: string = 'omnia-dwarka-expressway') {
  const [timeoutReached, setTimeoutReached] = useState(false);
  
  // Use actual Supabase data fetching
  const { data: hotelData, loading, error } = useHotel(slug);
  
  // Stable references for media hook
  const hotelId = hotelData?.id || '';
  const hasHotelId = !!hotelData?.id;
  
  // Memoize the media filters to prevent infinite re-renders
  const mediaFilters = useMemo(() => ({ 
    media_type: 'gallery' as const 
  }), []);

  // Memoize the media options to prevent infinite re-renders
  const mediaOptions = useMemo(() => ({ 
    enabled: hasHotelId 
  }), [hasHotelId]);

  // Fetch media data from database (with stable object references)
  const { data: mediaData, loading: mediaLoading } = useHotelMedia(
    hotelId, 
    mediaFilters,
    mediaOptions
  );

  // Faster timeout for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeoutReached(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  // Use fallback if database queries timeout or error
  const useFallback = timeoutReached || error || (!loading && !hotelData);

  // Create the enhanced data
  const enhancedData: EnhancedOmniaData | null = useMemo(() => {
    // Fallback data if database is not configured
    if (useFallback) {
      return {
        id: '55f959f2-aec2-415a-bb08-2469bb787542',
        name: 'Omnia by Tivoli Dwarka Expressway',
        brand: 'omnia',
        location: 'delhi',
        slug: 'omnia-dwarka-expressway',
        description: 'Transform your special moments into timeless memories at Omnia by Tivoli, an enchanting venue perfectly situated along Main Bijwasan Road near the Dwarka Expressway.',
        images: OMNIA_DWARKA_ENHANCED_DATA.galleryImages,
        rating: 5,
        address: {
          street: 'Main, Bijwasan Road, near Northern Peripheral Road, Isapur Khera',
          city: 'Dwarka',
          state: 'New Delhi',
          country: 'India',
          postalCode: '110061',
          coordinates: {
            lat: 28.539062,
            lng: 77.029944
          }
        },
        contact: {
          phone: '+917065053046',
          email: 'salesbijwasan@tivolihotels.co.in',
          whatsapp: ['7065053046', '9818553333']
        },
        amenities: [
          { id: 'business', name: 'Business Centre', description: 'Modern business facilities for corporate events', icon: 'Building' },
          { id: 'parking', name: 'Valet Parking', description: 'Valet parking service for 300 vehicles', icon: 'Car' }
        ],
        rooms: [],
        dining: [],
        features: ['Event Venue Specialist', 'The Mansion Hall (15,000 sq ft)', 'Beautiful Lawn Areas', 'Business Centre', 'Valet Parking (300 cars)', 'Premium Bijwasan Location'],
        policies: {
          checkIn: '3:00 PM',
          checkOut: '12:00 PM',
          cancellation: '24 hours before arrival',
          pets: 'Not allowed'
        },
        ...OMNIA_DWARKA_ENHANCED_DATA,
      };
    }

    if (!hotelData) return null;

    // Return simple data structure
    return {
      ...hotelData,
      ...OMNIA_DWARKA_ENHANCED_DATA,
    };
  }, [hotelData, useFallback]);

  // Calculate gallery images separately to avoid circular dependency
  const finalGalleryImages = useMemo(() => {
    if (mediaData?.length) {
      return mediaData
        .filter((m: any) => m.media?.public_url)
        .map((m: any) => m.media.public_url);
    }
    return OMNIA_DWARKA_ENHANCED_DATA.galleryImages;
  }, [mediaData]);

  return {
    data: enhancedData,
    loading: useFallback ? false : (loading || mediaLoading),
    error: useFallback ? null : error,
    // Expose individual sections for component-level usage
    spaces: OMNIA_DWARKA_ENHANCED_DATA.spaces,
    diningVenues: OMNIA_DWARKA_ENHANCED_DATA.diningVenues,
    experiences: OMNIA_DWARKA_ENHANCED_DATA.experiences,
    galleryImages: finalGalleryImages,
    quickStats: OMNIA_DWARKA_ENHANCED_DATA.quickStats,
    socialMedia: OMNIA_DWARKA_ENHANCED_DATA.socialMedia,
    // Performance metrics
    hasCache: false,
    useFallback,
  };
}

export default useOmniaDwarkaExpressway;