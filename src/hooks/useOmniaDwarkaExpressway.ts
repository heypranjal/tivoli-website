/**
 * Specialized Hook for Omnia By Tivoli - Dwarka Expressway
 * Comprehensive data fetching with enhanced features for the Dwarka Expressway property
 */

import { useState, useEffect, useMemo } from 'react';
import { useHotel, useHotelMedia, transformHotelData } from './useSupabase';
import { useCachedData } from './useClientCache';
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
      id: 'mansion-hall',
      name: 'The Mansion Hall',
      capacity: '500-1200',
      area: '15,000 sq ft',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2098&q=80',
      features: [
        'State-of-the-art climate control',
        'Professional audio-visual systems',
        'LED intelligent lighting',
        'Flexible seating configurations',
        'Dedicated service entrances',
        'Premium catering facilities'
      ],
      description: 'A stunning 15,000 sq. ft. indoor hall perfect for grand celebrations and events'
    },
    {
      id: 'mansion-lawn',
      name: 'The Mansion Lawn',
      capacity: '500-1200',
      area: '30,000 sq ft',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      features: [
        'Sprawling outdoor space',
        'Lush landscaped gardens',
        'Weather protection available',
        'Professional lighting systems',
        'Multiple entry points',
        'Flexible layout options'
      ],
      description: 'Sprawling 30,000 sq. ft. lush lawn area complementing The Mansion Hall for grand outdoor celebrations'
    },
    {
      id: 'venue-360-hall',
      name: '360 Banquet Hall',
      capacity: '200-400',
      area: '5,000 sq ft',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=2126&q=80',
      features: [
        'Elegant interior design',
        'High-speed WiFi connectivity',
        'Smart presentation technology',
        'Climate-controlled environment',
        'Professional catering service',
        'Flexible seating arrangements'
      ],
      description: 'Elegant 5,000 sq. ft. banquet hall perfect for intimate celebrations and corporate events'
    },
    {
      id: 'venue-360-lawn',
      name: '360 Lawn',
      capacity: '200-400',
      area: '18,000 sq ft',
      image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      features: [
        'Beautiful outdoor setting',
        'Landscaped garden areas',
        'Ambient evening lighting',
        'Modern irrigation systems',
        'Cocktail reception setup',
        'Weather contingency planning'
      ],
      description: 'Beautiful 18,000 sq. ft. lawn area perfect for intimate outdoor gatherings and pre-function events'
    },
    {
      id: 'pool-side',
      name: 'Pool Side',
      capacity: '50-150',
      area: '2,000 sq ft',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80',
      features: [
        'Scenic poolside location',
        'Open-air ambiance',
        'Ambient lighting',
        'Bar setup available',
        'Lounge seating options',
        'Photography-friendly backdrop'
      ],
      description: 'Scenic poolside area perfect for cocktail parties and intimate gatherings'
    },
    {
      id: 'glasshouse',
      name: 'Glasshouse',
      capacity: '100-300',
      area: '3,000 sq ft',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      features: [
        'Modern glass architecture',
        'Climate-controlled environment',
        'Natural light throughout the day',
        'Garden views',
        'Indoor-outdoor feel',
        'Unique architectural design'
      ],
      description: 'Elegant glass pavilion offering a unique blend of indoor comfort with outdoor ambiance'
    }
  ],

  diningVenues: [
    // Note: No restaurant or coffee shop available as per factual data
    // Catering services available for events: Buffet and Pre-Plated Service
  ],

  experiences: [
    {
      id: 'destination-weddings',
      title: 'Destination Weddings',
      subtitle: 'Exquisite Celebrations',
      description: 'Transform your special moments into timeless memories with our comprehensive wedding packages and stunning venues',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      category: 'Wedding'
    },
    {
      id: 'corporate-events',
      title: 'Corporate Events',
      subtitle: 'Business Excellence',
      description: 'Modern conference facilities and event spaces perfect for corporate meetings, conferences, and business gatherings',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
      category: 'Business'
    },
    {
      id: 'birthday-celebrations',
      title: 'Birthday Celebrations',
      subtitle: 'Milestone Moments',
      description: 'Celebrate life\'s special milestones with personalized birthday celebrations in our elegant venues',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      category: 'Event'
    },
    {
      id: 'cocktail-parties',
      title: 'Cocktail Events',
      subtitle: 'Social Gatherings',
      description: 'Sophisticated cocktail venues including poolside and glasshouse settings for memorable social events',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80',
      category: 'Event'
    },
    {
      id: 'pre-wedding-shoots',
      title: 'Pre-Wedding Shoots',
      subtitle: 'Capture Beautiful Moments',
      description: 'Picture-perfect venues and settings for pre-wedding photography sessions in our stunning locations',
      image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      category: 'Wedding'
    },
    {
      id: 'special-packages',
      title: 'Special Packages',
      subtitle: 'Loyalty Programs',
      description: 'Exclusive special packages and loyalty programs designed to make your events more memorable and affordable',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      category: 'Business'
    }
  ],

  galleryImages: [
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=2232&q=80',
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2098&q=80',
    'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  ],

  quickStats: {
    rooms: 57,
    diningVenues: 0, // No restaurant/coffee shop as per factual data
    eventCapacity: 1200,
    conciergeHours: 'Event Services Available'
  },

  socialMedia: {
    instagram: 'https://www.instagram.com/omniabytivoli/',
    facebook: 'https://www.facebook.com/omniabytivoli/'
  }
};

/**
 * Custom hook for Omnia Dwarka Expressway data with caching and optimization
 * Combines database data with enhanced static information
 */
export function useOmniaDwarkaExpressway(slug: string = 'omnia-dwarka-expressway') {
  const [timeoutReached, setTimeoutReached] = useState(false);
  
  // Use actual Supabase data fetching
  const { data: hotelData, loading, error } = useHotel(slug);
  
  // Backup cached data approach for fallback
  const { 
    data: cachedData, 
    loading: cachedLoading, 
    error: cachedError,
    hasCache 
  } = useCachedData(
    async () => {
      try {
        // This could fetch from an alternative source if needed
        return null;
      } catch (err) {
        console.error('Error in cached data fallback:', err);
        return null;
      }
    },
    {
      key: `omnia-dwarka-expressway-${slug}`,
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
    }, 1500); // Reduced to 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

  // Use fallback if:
  // 1. Database queries timeout (1.5 seconds)
  // 2. There's an error
  // 3. No data after loading completes
  const useFallback = timeoutReached || error || (!loading && !hotelData);

  const enhancedData: EnhancedOmniaData | null = useMemo(() => {
    // Fallback data if database is not configured
    if (useFallback) {
      return {
        id: '55f959f2-aec2-415a-bb08-2469bb787542',
        name: 'Omnia by Tivoli Dwarka Expressway',
        brand: 'omnia',
        location: 'delhi',
        slug: 'omnia-dwarka-expressway',
        description: 'Transform your special moments into timeless memories at Omnia by Tivoli, an enchanting venue perfectly situated along Main Bijwasan Road near the Dwarka Expressway. Experience grandeur at The Mansion, featuring a stunning 15,000 sq. ft. indoor hall complemented by a sprawling 30,000 sq. ft. lawn, accommodating 500 to 1,200 guests.',
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
          phone: '+919818553333',
          email: 'reservations@thetivolihotels.com',
          whatsapp: ['8588850354', '9818553333']
        },
        amenities: [
          { id: 'business', name: 'Business Centre', description: 'Modern business facilities for corporate events', icon: 'Building' },
          { id: 'parking', name: 'Valet Parking', description: 'Valet parking service for 300 vehicles', icon: 'Car' },
          { id: 'shuttle', name: 'Shuttle Service', description: 'Convenient shuttle service available', icon: 'Car' },
          { id: 'catering', name: 'Catering Services', description: 'Buffet and pre-plated service options', icon: 'Utensils' },
          { id: 'events', name: 'Event Services', description: 'Weddings, conferences, and special events', icon: 'Calendar' },
          { id: 'lawn', name: 'Outdoor Venues', description: 'Beautiful lawn areas and outdoor spaces', icon: 'MapPin' }
        ],
        rooms: [
          // Note: 57 rooms available as per factual data
          // Primarily event venue with accommodation facilities
        ],
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

    // Transform database data to legacy format
    const baseHotel = transformHotelData(hotelData);

    // Merge with enhanced static data
    return {
      ...baseHotel,
      ...OMNIA_DWARKA_ENHANCED_DATA,
      // Override with any database-sourced images if available
      galleryImages: mediaData?.length 
        ? mediaData.map(m => m.media.public_url)
        : OMNIA_DWARKA_ENHANCED_DATA.galleryImages,
    };
  }, [hotelData, mediaData, useFallback]);

  return {
    data: enhancedData,
    loading: useFallback ? false : (loading || mediaLoading),
    error: useFallback ? null : error,
    // Expose individual sections for component-level usage
    spaces: OMNIA_DWARKA_ENHANCED_DATA.spaces,
    diningVenues: OMNIA_DWARKA_ENHANCED_DATA.diningVenues,
    experiences: OMNIA_DWARKA_ENHANCED_DATA.experiences,
    galleryImages: enhancedData?.galleryImages || OMNIA_DWARKA_ENHANCED_DATA.galleryImages,
    quickStats: OMNIA_DWARKA_ENHANCED_DATA.quickStats,
    socialMedia: OMNIA_DWARKA_ENHANCED_DATA.socialMedia,
    // Performance metrics
    hasCache,
    useFallback,
  };
}

export default useOmniaDwarkaExpressway;