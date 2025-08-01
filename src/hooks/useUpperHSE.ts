/**
 * Specialized Hook for The Upper HSE - Sultanpur by Tivoli
 * Delhi's Ultra Luxury Oval Glass House
 * Comprehensive data fetching with enhanced features for the premium venue
 */

import { useState, useEffect, useMemo } from 'react';
import { useHotel, useHotelMedia, transformHotelData } from './useSupabase';
import { useCachedData } from './useClientCache';
import { Hotel } from '@/types/hotel';

// Enhanced types specific to The Upper HSE
export interface UpperHSESpace {
  id: string;
  name: string;
  capacity: { min: number; max: number } | string;
  area: string;
  image: string;
  features: string[];
  description?: string;
  type?: string;
  configurations?: Array<{
    style: string;
    capacity: number;
  }>;
}

export interface UpperHSEDiningVenue {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  hours: string;
  dressCode: string;
  image: string;
  features?: string[];
}

export interface UpperHSEExperience {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  category: string;
}

export interface EnhancedUpperHSEData extends Hotel {
  // Additional specific data for The Upper HSE
  spaces: UpperHSESpace[];
  diningVenues: UpperHSEDiningVenue[];
  experiences: UpperHSEExperience[];
  galleryImages: string[];
  virtualTour?: {
    url: string;
    provider: 'spalba' | 'matterport';
    thumbnail: string;
  };
  quickStats: {
    rooms: number;
    eventCapacity: number;
    parkingCapacity: number;
    venueArea: string;
  };
  transportation: {
    airport: string;
    railway: Record<string, string>;
    metro: string;
    landmark: string;
  };
  nearbyAttractions: string[];
  socialMedia: {
    instagram: string;
    facebook: string;
  };
  mapEmbedUrl: string;
}

// Static enhanced data for The Upper HSE - Sultanpur by Tivoli
const UPPER_HSE_ENHANCED_DATA = {
  spaces: [
    {
      id: 'oval-glass-house',
      name: 'Ultra Luxury Oval Glass House',
      capacity: { min: 200, max: 1000 },
      area: '10,000 sq.ft',
      type: 'Banquet Hall',
      image: 'https://images.unsplash.com/photo-1519167758481-83f29c7c8756?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80',
      features: [
        'Sound Proof Glasses',
        'AC Hall', 
        'Audio Visual Equipment',
        'Professional Lighting',
        'Pre-function Area',
        'VIP Entrance'
      ],
      description: 'Delhi\'s premier ultra-luxury venue featuring an iconic oval-shaped glass house with sound proof glasses and climate control',
      configurations: [
        { style: 'Classroom', capacity: 600 },
        { style: 'U-Shape', capacity: 200 },
        { style: 'Theatre', capacity: 1000 },
        { style: 'Cocktail', capacity: 1000 }
      ]
    },
    {
      id: 'open-lush-garden',
      name: 'Open Lush Garden',
      capacity: { min: 200, max: 1000 },
      area: '30,000 sq.ft',
      type: 'Outdoor Lawn',
      image: 'https://images.unsplash.com/photo-1549294413-26f195200c16?ixlib=rb-4.0.3&auto=format&fit=crop&w=1932&q=80',
      features: [
        'Garden Setting',
        'Open Air',
        'Lawn Area', 
        'Scenic Views',
        'Landscaped Gardens',
        'Professional Lighting'
      ],
      description: 'Expansive outdoor lawn area complementing the glass house, perfect for outdoor ceremonies and receptions',
      configurations: [
        { style: 'Wedding Setup', capacity: 800 },
        { style: 'Corporate Event', capacity: 600 },
        { style: 'Reception', capacity: 1000 }
      ]
    }
  ],

  diningVenues: [
    {
      id: 'catering-service',
      name: 'Catering Services',
      description: 'Professional catering services with custom menus, live counters, and flexible dining options',
      cuisine: 'Multi-Cuisine',
      hours: 'As per event requirements',
      dressCode: 'As per event theme',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      features: ['In-house Catering', 'Outside Catering Allowed', 'Custom Menus', 'Live Counters']
    }
  ],

  experiences: [
    {
      id: 'destination-weddings',
      title: 'Destination Weddings',
      subtitle: 'Grand Celebrations',
      description: 'Create unforgettable wedding memories with our iconic oval glass house, expansive gardens, and world-class hospitality services',
      image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      category: 'Wedding'
    },
    {
      id: 'pre-wedding-shoots',
      title: 'Pre-Wedding Shoots',
      subtitle: 'Romantic Settings',
      description: 'Capture beautiful moments with our stunning oval glass house and lush gardens as the perfect backdrop',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      category: 'Photography'
    },
    {
      id: 'corporate-events',
      title: 'Corporate Events',
      subtitle: 'Professional Excellence',
      description: 'Host successful business events with our state-of-the-art glass house, professional service, and modern amenities',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      category: 'Business'
    },
    {
      id: 'social-celebrations',
      title: 'Social Celebrations',
      subtitle: 'Memorable Occasions',
      description: 'Celebrate life\'s special moments with elegant venues, gourmet catering, and personalized event planning',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      category: 'Event'
    },
    {
      id: 'mice-events',
      title: 'MICE Events',
      subtitle: 'Corporate Solutions',
      description: 'Professional meetings, incentives, conferences, and exhibitions with comprehensive event management',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      category: 'Business'
    },
    {
      id: 'birthday-celebrations',
      title: 'Birthday Celebrations',
      subtitle: 'Special Moments',
      description: 'Make birthdays memorable with our unique venues and personalized celebration packages',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      category: 'Celebration'
    }
  ],

  galleryImages: [
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/upper-hse-venues/sultanpur-upperhse-hp-thumbnail.jpg',
    'https://images.unsplash.com/photo-1519167758481-83f29c7c8756?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80',
    'https://images.unsplash.com/photo-1549294413-26f195200c16?ixlib=rb-4.0.3&auto=format&fit=crop&w=1932&q=80',
    'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  ],

  virtualTour: {
    url: '#',
    provider: 'spalba' as const,
    thumbnail: 'https://images.unsplash.com/photo-1519167758481-83f29c7c8756?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80'
  },

  quickStats: {
    rooms: 4,
    diningVenues: 1,
    eventCapacity: 1000,
    conciergeHours: '24/7'
  },

  transportation: {
    airport: '15 km',
    railway: {
      'New Delhi Railway Station': '21 km',
      'Old Delhi Railway Station': '26 km'
    },
    metro: 'Sultanpur Metro Station',
    landmark: 'Near Iconic Chattarpur Temple'
  },

  nearbyAttractions: [
    'Iconic Chhatarpur Temple',
    'Garden of Five Senses', 
    'Qutub Minar'
  ],

  socialMedia: {
    instagram: 'https://www.instagram.com/theupperhousebytivoli/',
    facebook: 'https://www.facebook.com/theupperhousebytivoli/'
  },

  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.6049320382813!2d77.1632989!3d28.491442099999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1fdbcba0b08b%3A0xb6cea74e5c7dfb37!2sThe%20Upper%20HSE%20by%20Tivoli!5e0!3m2!1sen!2sin!4v1750683207349!5m2!1sen!2sin'
};

/**
 * Custom hook for The Upper HSE data with caching and optimization
 * Combines database data with enhanced static information
 */
export function useUpperHSE(slug: string = 'upper-hse-sultanpur') {
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
      key: `upper-hse-hotel-${slug}`,
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

  const enhancedData: EnhancedUpperHSEData | null = useMemo(() => {
    // Fallback data if database is not configured
    if (useFallback) {
      return {
        id: 'upper-hse-sultanpur',
        name: 'The Upper HSE - Sultanpur by Tivoli',
        brand: 'upper-hse',
        location: 'delhi',
        slug: 'upper-hse-sultanpur',
        description: 'Delhi\'s Ultra Luxury Oval Glass House. Welcome to "The Upper HSE" by Tivoli, Delhi\'s premier ultra-luxury venue, boasting an iconic oval-shaped glass house. This exquisite property can comfortably accommodate 200 to 1000 guests, making it an ideal choice for weddings, pre-wedding ceremonies, and corporate events. The venue features a singular glass house complemented by a lush lawn area, offering versatility and elegance.',
        images: UPPER_HSE_ENHANCED_DATA.galleryImages,
        rating: 5,
        address: {
          street: 'Farm No.1, Sultanpur Estate, Mandi Rd, DLF Farms',
          city: 'New Delhi',
          state: 'Delhi',
          country: 'India',
          postalCode: '110030',
          coordinates: {
            lat: 28.491442099999997,
            lng: 77.1632989
          }
        },
        contact: {
          phone: '9818553333',
          email: 'reservations@thetivolihotels.com',
          whatsapp: '8588850354',
          website: 'https://tivolibanquets.com/'
        },
        amenities: [
          { id: 'parking', name: 'Valet Parking', description: 'Parking for 200 vehicles with valet service', icon: 'Car' },
          { id: 'glass-house', name: 'Ultra Luxury Oval Glass House', description: '10,000 sq.ft iconic oval-shaped glass house', icon: 'Building' },
          { id: 'lawn', name: 'Open Lush Garden', description: '30,000 sq.ft outdoor lawn area', icon: 'Trees' },
          { id: 'catering', name: 'In-house & Outside Catering', description: 'Flexible catering options with custom menus', icon: 'Utensils' },
          { id: 'rooms', name: 'Complimentary Accommodation', description: '4 complimentary rooms for event guests', icon: 'Bed' },
          { id: 'soundproof', name: 'Sound Proof Glasses', description: 'Professional sound isolation for events', icon: 'Volume2' },
          { id: 'ac-hall', name: 'AC Hall', description: 'Climate-controlled event spaces', icon: 'Wind' },
          { id: 'pre-function', name: 'Pre-function Area', description: 'Dedicated pre-event gathering space', icon: 'Users' }
        ],
        rooms: [
          {
            id: 'complimentary-1',
            name: 'Complimentary Room 1',
            description: 'Comfortable accommodation for event guests with modern amenities',
            size: 'Standard',
            maxOccupancy: 2,
            bedType: 'Queen Bed',
            images: [],
            amenities: ['Air Conditioning', 'Attached Bathroom', 'Basic Amenities'],
            price: { currency: 'INR', amount: 0, note: 'Complimentary with event booking' }
          },
          {
            id: 'complimentary-2',
            name: 'Complimentary Room 2',
            description: 'Comfortable accommodation for event guests with modern amenities',
            size: 'Standard',
            maxOccupancy: 2,
            bedType: 'Queen Bed',
            images: [],
            amenities: ['Air Conditioning', 'Attached Bathroom', 'Basic Amenities'],
            price: { currency: 'INR', amount: 0, note: 'Complimentary with event booking' }
          },
          {
            id: 'complimentary-3',
            name: 'Complimentary Room 3',
            description: 'Comfortable accommodation for event guests with modern amenities',
            size: 'Standard',
            maxOccupancy: 2,
            bedType: 'Queen Bed',
            images: [],
            amenities: ['Air Conditioning', 'Attached Bathroom', 'Basic Amenities'],
            price: { currency: 'INR', amount: 0, note: 'Complimentary with event booking' }
          },
          {
            id: 'complimentary-4',
            name: 'Complimentary Room 4',
            description: 'Comfortable accommodation for event guests with modern amenities',
            size: 'Standard',
            maxOccupancy: 2,
            bedType: 'Queen Bed',
            images: [],
            amenities: ['Air Conditioning', 'Attached Bathroom', 'Basic Amenities'],
            price: { currency: 'INR', amount: 0, note: 'Complimentary with event booking' }
          }
        ],
        dining: [],
        features: [
          'Ultra Luxury Oval Glass House (10,000 sq.ft)',
          'Open Lush Garden (30,000 sq.ft)', 
          'Parking for 200 vehicles with Valet Service',
          'Pre-function Area',
          'Sound Proof Glasses',
          'AC Hall',
          '4 Complimentary Rooms',
          'In-house & Outside Catering',
          'Destination Weddings',
          'Pre-Wedding Shoots'
        ],
        policies: {
          checkIn: 'Event-based arrival',
          checkOut: 'Event completion',
          cancellation: 'As per event contract terms',
          pets: 'Not allowed'
        },
        ...UPPER_HSE_ENHANCED_DATA,
      };
    }

    if (!hotelData) return null;

    // Transform database data to legacy format
    const baseHotel = transformHotelData(hotelData);

    // Merge with enhanced static data
    return {
      ...baseHotel,
      ...UPPER_HSE_ENHANCED_DATA,
      // Override with any database-sourced images if available
      galleryImages: mediaData?.length 
        ? mediaData
            .filter(m => m.media?.public_url)
            .map(m => m.media.public_url)
        : UPPER_HSE_ENHANCED_DATA.galleryImages,
    };
  }, [hotelData, mediaData, useFallback]);

  return {
    data: enhancedData,
    loading: useFallback ? false : (loading || mediaLoading),
    error: useFallback ? null : error,
    // Expose individual sections for component-level usage
    spaces: UPPER_HSE_ENHANCED_DATA.spaces,
    diningVenues: UPPER_HSE_ENHANCED_DATA.diningVenues,
    experiences: UPPER_HSE_ENHANCED_DATA.experiences,
    galleryImages: enhancedData?.galleryImages || UPPER_HSE_ENHANCED_DATA.galleryImages,
    virtualTour: UPPER_HSE_ENHANCED_DATA.virtualTour,
    quickStats: UPPER_HSE_ENHANCED_DATA.quickStats,
    socialMedia: UPPER_HSE_ENHANCED_DATA.socialMedia,
    transportation: UPPER_HSE_ENHANCED_DATA.transportation,
    nearbyAttractions: UPPER_HSE_ENHANCED_DATA.nearbyAttractions,
    mapEmbedUrl: UPPER_HSE_ENHANCED_DATA.mapEmbedUrl,
    // Performance metrics
    hasCache,
    useFallback,
  };
}

export default useUpperHSE;