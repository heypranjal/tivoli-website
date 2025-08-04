/**
 * Specialized Hook for Tivoli Lotus Court - Noida
 * Comprehensive data fetching with enhanced features for the Noida property
 */

import { useState, useEffect, useMemo } from 'react';
import { useHotel, useHotelMedia, transformHotelData } from './useSupabase';
import { useCachedData } from './useClientCache';
import { Hotel } from '@/types/hotel';

// Enhanced types specific to Tivoli Lotus Court
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
  // Additional specific data for Tivoli Lotus Court
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

// Static enhanced data for Tivoli Lotus Court - Noida (Based on Real Data)
const TIVOLI_LOTUS_COURT_ENHANCED_DATA = {
  spaces: [
    {
      id: 'lotus-court',
      name: 'Lotus Court',
      capacity: '500',
      area: '15,550 sq ft',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2098&q=80',
      features: [
        'Grand banquet hall',
        'AC with climate control',
        'Professional sound system', 
        'LED lighting setup',
        'Flexible seating arrangements',
        'Premium catering facilities'
      ],
      description: 'Our flagship venue with 15,550 sq ft of elegant space perfect for grand weddings and large corporate events'
    },
    {
      id: 'glass-house',
      name: 'Glass House',
      capacity: '120',
      area: '3,000 sq ft',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
      features: [
        'Glass-walled venue',
        'Natural light',
        'Climate controlled',
        'Intimate setting',
        'Perfect for cocktail events',
        'Garden views'
      ],
      description: 'Sophisticated glass-enclosed venue offering natural light and garden views for intimate celebrations'
    },
    {
      id: 'rooftop',
      name: 'Rooftop',
      capacity: '100',
      area: '3,000 sq ft',
      image: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80',
      features: [
        'Open-air venue',
        'Panoramic views',
        'Evening celebrations',
        'Romantic ambiance',
        'Weather backup available',
        'Lighting arrangements'
      ],
      description: 'Stunning rooftop venue with panoramic views, perfect for cocktail parties and evening receptions'
    },
    {
      id: 'lawn-1',
      name: 'Lawn 1',
      capacity: '150',
      area: '4,000 sq ft',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      features: [
        'Landscaped gardens',
        'Natural ambiance',
        'Perfect for day events',
        'Flexible setup options',
        'Outdoor celebrations',
        'Photo opportunities'
      ],
      description: 'Beautiful outdoor lawn ideal for mehendi ceremonies, day events, and garden parties'
    },
    {
      id: 'lawn-2',
      name: 'Lawn 2',
      capacity: '150',
      area: '4,000 sq ft',
      image: 'https://images.unsplash.com/photo-1522936643032-5f3cde4cad06?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      features: [
        'Garden setting',
        'Natural backdrop',
        'Versatile space',
        'Day and evening events',
        'Open-air celebrations',
        'Customizable decor'
      ],
      description: 'Picturesque lawn area perfect for outdoor ceremonies, receptions, and themed events'
    },
    {
      id: 'pool-side',
      name: 'Pool Side',
      capacity: '50',
      area: '2,500 sq ft',
      image: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      features: [
        'Poolside ambiance',
        'Intimate gatherings',
        'Evening parties',
        'Romantic setting',
        'Exclusive atmosphere',
        'Mood lighting'
      ],
      description: 'Exclusive poolside venue for intimate gatherings, cocktail parties, and private celebrations'
    }
  ],

  diningVenues: [
    {
      id: 'catering-services',
      name: 'Catering Services',
      description: 'Comprehensive catering services offering diverse menu options for all types of events',
      cuisine: 'Multi-Cuisine',
      hours: 'Event-based timing',
      dressCode: 'Event Appropriate',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      specialties: ['Buffet Service', 'Pre-Plated Service', 'Custom Menus', 'Live Counters']
    }
  ],

  experiences: [
    {
      id: 'destination-weddings',
      title: 'Destination Weddings',
      subtitle: 'Your Dream Wedding Venue',
      description: 'Complete destination wedding services with 15,000 sq ft of versatile space, outdoor lawns, and professional planning',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      category: 'Wedding'
    },
    {
      id: 'pre-wedding-shoots',
      title: 'Pre-Wedding Shoots',
      subtitle: 'Capture Perfect Moments',
      description: 'Beautiful outdoor spaces and elegant indoor venues providing the perfect backdrop for pre-wedding photography',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      category: 'Wedding'
    },
    {
      id: 'corporate-events',
      title: 'Corporate Events',
      subtitle: 'Professional Excellence',
      description: 'Modern meeting rooms, business centre facilities, and professional service for conferences and corporate gatherings',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
      category: 'Business'
    },
    {
      id: 'grand-celebrations',
      title: 'Grand Celebrations',
      subtitle: 'Unforgettable Moments',
      description: 'Create magical memories with our grand banquet halls, expert event planning, and customized celebrations for every occasion',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      category: 'Events'
    },
    {
      id: 'event-packages',
      title: 'Stay + Event Packages',
      subtitle: 'Complete Solutions',
      description: 'Special packages combining accommodation with event services, plus loyalty programs for returning guests',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
      category: 'Event'
    },
    {
      id: 'recreation-facilities',
      title: 'Recreation & Wellness',
      subtitle: 'Relax & Unwind',
      description: 'Swimming pool facilities and peaceful environment for relaxation during your stay',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      category: 'Wellness'
    }
  ],

  galleryImages: [
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivolilotuscourt/banner%20images/Entrance_optimized_200.jpg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivolilotuscourt/banner%20images/Astoria_optimized_200.jpg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivolilotuscourt/banner%20images/Facade_optimized_200.jpg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivolilotuscourt/banner%20images/Lobby_optimized_200.jpg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivolilotuscourt/banner%20images/Regency%20Pre%20Function%20Area%20(2).jpeg'
  ],

  quickStats: {
    rooms: 0,
    diningVenues: 0,
    eventCapacity: 1500,
    conciergeHours: '24/7'
  },

  socialMedia: {
    instagram: 'https://www.instagram.com/tivolilotuscourt/',
    facebook: 'https://www.facebook.com/tivolilotuscourt/'
  }
};

/**
 * Custom hook for Tivoli Lotus Court data with caching and optimization
 * Combines database data with enhanced static information
 */
export function useTivoliLotusCourtNoida(slug: string = 'tivoli-lotus-court') {
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
      key: `tivoli-lotus-court-${slug}`,
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
  // Only call useHotelMedia when we have a valid hotel ID
  const { data: mediaData, loading: mediaLoading } = useHotelMedia(
    hotelData?.id || 'temp-disable-query', 
    mediaFilters,
    { ...mediaOptions, enabled: !!hotelData?.id }
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
  // 3. No data after loading completes
  const useFallback = timeoutReached || error || (!loading && !hotelData);

  const enhancedData: EnhancedTivoliData | null = useMemo(() => {
    // Fallback data if database is not configured
    if (useFallback) {
      return {
        id: 'fa3d0cae-ccb5-45a1-9046-862a689b90fd',
        name: 'Tivoli Lotus Court - Noida',
        brand: 'tivoli',
        location: 'noida',
        slug: 'tivoli-lotus-court',
        description: 'Experience luxury and comfort at Tivoli Lotus Court, a premium hotel in Noida offering world-class amenities and exceptional service with 15,000 sq ft of venue space.',
        images: TIVOLI_LOTUS_COURT_ENHANCED_DATA.galleryImages,
        rating: 5,
        address: {
          street: '1, Sector 74 Main Rd, near Internal Capetown Society Road, Supertech Capetown, Sector 74',
          city: 'Noida',
          state: 'Uttar Pradesh',
          country: 'India',
          postalCode: '201009',
          coordinates: {
            lat: 28.581193975692788,
            lng: 77.39101077549897
          }
        },
        contact: {
          phone: '9266624389',
          email: 'Digital@thetivolihotels.com'
        },
        amenities: [
          { id: 'wifi', name: 'Wi-Fi', description: 'Complimentary wireless internet access', icon: 'Signal' },
          { id: 'swimming-pool', name: 'Swimming Pool', description: 'Outdoor swimming pool for relaxation', icon: 'Pool' },
          { id: 'business', name: 'Business Centre', description: 'Professional business facilities and meeting rooms', icon: 'Building' },
          { id: 'parking', name: 'Parking', description: 'Parking capacity for 500 vehicles with valet service', icon: 'Car' },
          { id: 'catering', name: 'Catering Services', description: 'Comprehensive catering with custom menus and live counters', icon: 'Utensils' },
          { id: 'room-service', name: '24-hour Room Service', description: 'Round-the-clock in-room dining and room service', icon: 'Clock' }
        ],
        rooms: [
          {
            id: 'standard',
            name: 'Standard Room',
            description: 'Comfortable and well-appointed room with essential amenities for a pleasant stay',
            size: '200 sq.ft (19 sq.mt)',
            maxOccupancy: 2,
            bedType: '1 Queen Bed',
            images: [],
            amenities: ['Wi-Fi', 'Mineral Water', 'Air Conditioning', '24-hour In-room Dining', '24-hour Room Service', 'Laundry Service'],
            price: { currency: 'INR', amount: 8000 }
          },
          {
            id: 'super-deluxe',
            name: 'Super Deluxe Room',
            description: 'Spacious room with garden view offering enhanced comfort and premium amenities',
            size: '260 sq.ft (24 sq.mt)',
            maxOccupancy: 2,
            bedType: '1 King Bed',
            images: [],
            amenities: ['Garden View', 'Wi-Fi', 'Mineral Water', 'Air Conditioning', 'Room Service', 'Daily Housekeeping', 'Laundry Service'],
            price: { currency: 'INR', amount: 12000 }
          }
        ],
        dining: [],
        features: ['15,000 Sq Ft Venue Space', 'Swimming Pool', 'Business Centre', 'Destination Weddings', 'Pre-Wedding Shoots', 'Parking for 500 Vehicles'],
        policies: {
          checkIn: '2:00 PM',
          checkOut: '12:00 PM',
          cancellation: '24 hours before arrival',
          pets: 'Not allowed'
        },
        ...TIVOLI_LOTUS_COURT_ENHANCED_DATA,
      };
    }

    if (!hotelData) return null;

    // Transform database data to legacy format - add null safety
    const baseHotel = hotelData ? transformHotelData(hotelData) : null;
    if (!baseHotel) return null;

    // Merge with enhanced static data
    return {
      ...baseHotel,
      ...TIVOLI_LOTUS_COURT_ENHANCED_DATA,
      // Override with any database-sourced images if available (with null safety)
      galleryImages: (mediaData && Array.isArray(mediaData) && mediaData.length > 0)
        ? mediaData
            .filter(m => m && m.media && m.media.public_url) // Filter out items without valid media
            .map(m => m.media.public_url)
        : TIVOLI_LOTUS_COURT_ENHANCED_DATA.galleryImages,
    };
  }, [hotelData, mediaData, useFallback]);

  return {
    data: enhancedData,
    loading: useFallback ? false : (loading || mediaLoading),
    error: useFallback ? null : error,
    // Expose individual sections for component-level usage
    spaces: TIVOLI_LOTUS_COURT_ENHANCED_DATA.spaces,
    diningVenues: TIVOLI_LOTUS_COURT_ENHANCED_DATA.diningVenues,
    experiences: TIVOLI_LOTUS_COURT_ENHANCED_DATA.experiences,
    galleryImages: enhancedData?.galleryImages || TIVOLI_LOTUS_COURT_ENHANCED_DATA.galleryImages,
    quickStats: TIVOLI_LOTUS_COURT_ENHANCED_DATA.quickStats,
    socialMedia: TIVOLI_LOTUS_COURT_ENHANCED_DATA.socialMedia,
    // Performance metrics
    hasCache,
    useFallback,
  };
}

export default useTivoliLotusCourtNoida;