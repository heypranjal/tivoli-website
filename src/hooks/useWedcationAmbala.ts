/**
 * Specialized Hook for Wedcation by Tivoli-Ambala
 * Comprehensive data fetching with enhanced features for the wedding destination property
 */

import { useState, useEffect, useMemo } from 'react';
import { useHotel, useHotelMedia, transformHotelData } from './useSupabase';
import { Hotel } from '@/types/hotel';

// Enhanced types specific to Wedcation by Tivoli-Ambala
export interface WedcationSpace {
  id: string;
  name: string;
  capacity: number | string;
  area: string;
  image: string;
  features: string[];
  description?: string;
}

export interface WedcationDiningVenue {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  hours: string;
  dressCode: string;
  image: string;
  specialties?: string[];
}

export interface WedcationExperience {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  category: string;
}

export interface EnhancedWedcationData extends Hotel {
  // Additional specific data for Wedcation by Tivoli
  spaces: WedcationSpace[];
  diningVenues: WedcationDiningVenue[];
  experiences: WedcationExperience[];
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

// Static enhanced data for Wedcation by Tivoli-Ambala
const WEDCATION_ENHANCED_DATA = {
  spaces: [
    {
      id: 'golden-crown-hall',
      name: 'Golden Crown Hall',
      capacity: '300-500 pax',
      area: 'Indoor Complex',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationambala/Event%20Space/Golden%20Crown%20Hall.png',
      features: [
        'Golden Crown Hall: 300 pax',
        'Combined with Conference Hall: 500 pax',
        'Fully air-conditioned',
        'Professional audio-visual equipment',
        'Elegant indoor setting'
      ],
      description: 'Premium indoor venue perfect for elegant receptions and ceremonies'
    },
    {
      id: 'orchid-hall',
      name: 'Orchid Hall',
      capacity: 'Flexible',
      area: 'Event Space',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationambala/Event%20Space/Orchid%20Hall.png',
      features: [
        'Versatile event space',
        'Modern amenities',
        'Flexible configuration options',
        'Professional lighting',
        'Climate controlled environment'
      ],
      description: 'Beautiful event space perfect for weddings and special occasions'
    }
  ],

  diningVenues: [
    {
      id: 'restaurant-main',
      name: 'Restaurant',
      description: 'Experience exquisite culinary delights in our elegant main restaurant with a diverse menu',
      cuisine: 'Multi-Cuisine',
      hours: 'Breakfast, Lunch & Dinner',
      dressCode: 'Smart Casual',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationambala/dinning%20experience/Restaurant.png',
      specialties: ['Indian Delicacies', 'Continental Cuisine', 'Local Specialties']
    },
    {
      id: 'restaurant-ambiance',
      name: 'Restaurant Ambiance',
      description: 'Immerse yourself in the sophisticated ambiance of our beautifully designed dining space',
      cuisine: 'Multi-Cuisine',
      hours: 'All Day Dining',
      dressCode: 'Smart Casual',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationambala/dinning%20experience/Restaurant%20Image2.png',
      specialties: ['Signature Dishes', 'Seasonal Menus', 'Chef Specials']
    },
    {
      id: 'poolside-dining',
      name: 'Poolside Dining',
      description: 'Enjoy al fresco dining by the pool with refreshing beverages and delightful cuisine',
      cuisine: 'Outdoor Dining',
      hours: 'Lunch & Evening Service',
      dressCode: 'Casual',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationambala/dinning%20experience/pool%20side%20.jpg',
      specialties: ['Grilled Delights', 'Fresh Beverages', 'Light Bites', 'Sunset Dining']
    }
  ],

  experiences: [
    {
      id: 'destination-weddings',
      title: 'Destination Weddings',
      subtitle: 'Complete Wedding Solutions',
      description: 'Comprehensive destination wedding packages with 40 luxury rooms and multiple venue options for the perfect celebration',
      image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      category: 'Wedding'
    },
    {
      id: 'pre-wedding-shoots',
      title: 'Pre-Wedding Photography',
      subtitle: 'Stunning Backdrops',
      description: 'Beautiful settings including 22,000 sq ft open lawn, poolside areas, and glasshouse for memorable photo sessions',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      category: 'Photography'
    },
    {
      id: 'corporate-events',
      title: 'Corporate Events',
      subtitle: 'Professional Venues',
      description: 'Conference halls, meeting rooms, and business facilities perfect for corporate events and conferences',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      category: 'Business'
    },
    {
      id: 'luxury-accommodation',
      title: '40 Premium Rooms',
      subtitle: 'Executive to Family Suites',
      description: '16 Executive, 16 Deluxe, 3 Family Rooms, and 3 Family Suites with modern amenities and elegant comfort',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      category: 'Accommodation'
    },
    {
      id: 'special-packages',
      title: 'Stay + Event Packages',
      subtitle: 'Complete Experience',
      description: 'Special packages combining luxury accommodation with event venues for weddings and celebrations',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      category: 'Packages'
    },
    {
      id: 'recreational-facilities',
      title: 'Wellness & Recreation',
      subtitle: 'Complete Relaxation',
      description: 'Swimming pool, spa & wellness center, fitness facilities, and kids play area for complete guest satisfaction',
      image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      category: 'Recreation'
    }
  ],

  galleryImages: [
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationambala/Gallary/Facade.png',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationambala/Gallary/Facade3.png',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationambala/Gallary/Lobby.png',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationambala/Gallary/Pool1.jpeg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationambala/Gallary/Reception.png'
  ],

  virtualTour: {
    url: 'https://example.com/wedcation-virtual-tour',
    provider: 'spalba' as const,
    thumbnail: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  },

  quickStats: {
    rooms: 40,
    diningVenues: 3,
    eventCapacity: 2000,
    conciergeHours: '24/7'
  },

  socialMedia: {
    instagram: 'https://www.instagram.com/wedcationbytivoliambala/',
    facebook: 'https://www.facebook.com/Adminpalmdale/',
    website: 'https://tivolibanquets.com/'
  }
};

/**
 * Custom hook for Wedcation by Tivoli-Ambala data with caching and optimization
 * Combines database data with enhanced static information
 */
export function useWedcationAmbala(slug: string = 'wedcation-by-tivoli-ambala') {
  const [timeoutReached, setTimeoutReached] = useState(false);
  
  // Fetch hotel data from database
  const { 
    data: hotelData, 
    loading, 
    error 
  } = useHotel(slug);

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
  // 3. No data after loading completes
  const useFallback = timeoutReached || error || (!loading && !hotelData);

  const enhancedData: EnhancedWedcationData | null = useMemo(() => {
    // Fallback data if database is not configured
    if (useFallback) {
      return {
        id: 'a86c7480-542b-4f5b-bd36-0c6aebef8f61',
        name: 'Wedcation by Tivoli - Ambala',
        brand: 'wedcation',
        location: 'ambala',
        slug: 'wedcation-by-tivoli-ambala',
        description: 'Wedcation by Tivoli, Ambala is a comprehensive hospitality destination offering 40 rooms across multiple categories and extensive event facilities. Located strategically on NH-65, the property features multiple indoor and outdoor venues including conference halls, banquet halls, meeting rooms, poolside areas, glasshouse, and a sprawling 22,000 sq. ft. open lawn. With a banquet capacity of up to 1,000 guests, it caters to weddings, conferences, corporate events, and social gatherings.',
        images: WEDCATION_ENHANCED_DATA.galleryImages,
        rating: 5,
        address: {
          street: 'NH-65, ambala - hissar rd, village durkhara',
          city: 'Ambala',
          state: 'Haryana',
          country: 'India',
          postalCode: '134003',
          coordinates: {
            lat: 30.3598,
            lng: 76.7821
          }
        },
        contact: {
          phone: '+917496969594',
          email: 'reservations.ambala@wedcationbytivoli.com',
          bookingPhone: '+917496969596',
          bookingEmail: 'reservations.ambala@wedcationbytivoli.com',
          marketing: '+917404033347',
          website: 'https://tivolibanquets.com/'
        },
        amenities: [
          { id: 'wifi', name: 'Free WiFi', description: 'Complimentary high-speed internet access in all rooms', icon: 'Signal' },
          { id: 'pool', name: 'Swimming Pool', description: 'Outdoor swimming pool with poolside event area', icon: 'Pool' },
          { id: 'spa', name: 'Spa & Wellness', description: 'Full-service spa and wellness facilities', icon: 'Spa' },
          { id: 'gym', name: 'Fitness Centre', description: 'Modern gym and fitness facilities', icon: 'Dumbbell' },
          { id: 'business', name: 'Business Centre', description: 'Professional business services and facilities', icon: 'Briefcase' },
          { id: 'parking', name: 'Valet Parking', description: 'Valet parking, self-parking, and shuttle service', icon: 'Car' },
          { id: 'kids', name: 'Kids Play Area', description: 'Dedicated play area for children', icon: 'Users' },
          { id: 'concierge', name: '24/7 Concierge', description: 'Round-the-clock concierge services', icon: 'Clock' }
        ],
        rooms: [
          {
            id: 'executive',
            name: 'Executive Room',
            description: 'Premium executive rooms with modern amenities and elegant décor. Perfect for business travelers and wedding guests seeking comfort and style.',
            size: 'Spacious',
            maxOccupancy: 3,
            bedType: 'King or Twin',
            images: [
              'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationambala/rooms%20images/Executive%20Room.jpeg',
              'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationambala/rooms%20images/Executive%20Room%20Washroom.png'
            ],
            amenities: ['Free WiFi', 'Smart TVs', 'Safe Locker', 'Slippers', 'Toiletries', 'Hair Dryer'],
            count: 16,
            price: { currency: 'INR', amount: 4500 }
          },
          {
            id: 'deluxe',
            name: 'Deluxe Room',
            description: 'Comfortable deluxe rooms with contemporary furnishings and all essential amenities. Ideal for couples and small families.',
            size: 'Comfortable',
            maxOccupancy: 3,
            bedType: 'King or Twin',
            images: [
              'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationambala/rooms%20images/Deluxe%20Room.jpeg',
              'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationambala/rooms%20images/Deluxe%20Washroom.jpeg'
            ],
            amenities: ['Free WiFi', 'Smart TVs', 'Safe Locker', 'Slippers', 'Toiletries', 'Hair Dryer'],
            count: 16,
            price: { currency: 'INR', amount: 3500 }
          },
          {
            id: 'super-deluxe',
            name: 'Super Deluxe Room',
            description: 'Elevated comfort with enhanced amenities and stylish interiors. Perfect for those seeking a premium experience with extra space and luxury.',
            size: 'Extra Comfortable',
            maxOccupancy: 3,
            bedType: 'King',
            images: [
              'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationambala/rooms%20images/Super%20Deluxe.jpeg',
              'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationambala/rooms%20images/Super%20Deluxe%20Washroom.jpeg'
            ],
            amenities: ['Free WiFi', 'Smart TVs', 'Safe Locker', 'Slippers', 'Toiletries', 'Hair Dryer', 'Premium Amenities'],
            count: 8,
            price: { currency: 'INR', amount: 5500 }
          },
          {
            id: 'family',
            name: 'Family Room',
            description: 'Spacious family rooms designed for larger groups and extended stays. Perfect for wedding parties and family gatherings.',
            size: 'Extra Spacious',
            maxOccupancy: 4,
            bedType: 'Multiple Beds',
            images: [],
            amenities: ['Free WiFi', 'Smart TVs', 'Safe Locker', 'Slippers', 'Toiletries', 'Hair Dryer'],
            count: 3,
            price: { currency: 'INR', amount: 6000 }
          },
          {
            id: 'family-suite',
            name: 'Family Suite',
            description: 'Luxurious family suites with separate living areas and premium amenities. The ultimate in comfort for special occasions and extended family stays.',
            size: 'Suite with Living Area',
            maxOccupancy: 6,
            bedType: 'Multiple Beds + Living Area',
            images: [
              'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationambala/rooms%20images/Family%20Suite%20Room.png',
              'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationambala/rooms%20images/Family%20%20Suite%20Room%20Washroom.jpeg'
            ],
            amenities: ['Free WiFi', 'Smart TVs', 'Safe Locker', 'Slippers', 'Toiletries', 'Hair Dryer', 'Separate Living Area'],
            count: 3,
            price: { currency: 'INR', amount: 8500 }
          }
        ],
        dining: [],
        features: ['Wedding Venues', 'Garden Spaces', 'Banquet Halls', 'Poolside Events'],
        policies: {
          checkIn: '2:00 PM',
          checkOut: '12:00 PM',
          cancellation: '48 hours before arrival',
          pets: 'Not allowed'
        },
        ...WEDCATION_ENHANCED_DATA,
      };
    }

    if (!hotelData) return null;

    // Transform database data to legacy format
    const baseHotel = transformHotelData(hotelData);

    // Merge with enhanced static data
    return {
      ...baseHotel,
      ...WEDCATION_ENHANCED_DATA,
      // Override with any database-sourced images if available
      galleryImages: mediaData?.length 
        ? mediaData
            .filter(m => m.media?.public_url)
            .map(m => m.media.public_url)
        : WEDCATION_ENHANCED_DATA.galleryImages,
    };
  }, [hotelData, mediaData, useFallback]);

  return {
    data: enhancedData,
    loading: useFallback ? false : (loading || mediaLoading),
    error: useFallback ? null : error,
    // Expose individual sections for component-level usage
    spaces: WEDCATION_ENHANCED_DATA.spaces,
    diningVenues: WEDCATION_ENHANCED_DATA.diningVenues,
    experiences: WEDCATION_ENHANCED_DATA.experiences,
    galleryImages: enhancedData?.galleryImages || WEDCATION_ENHANCED_DATA.galleryImages,
    virtualTour: WEDCATION_ENHANCED_DATA.virtualTour,
    quickStats: WEDCATION_ENHANCED_DATA.quickStats,
    socialMedia: WEDCATION_ENHANCED_DATA.socialMedia,
    // Performance metrics
    useFallback,
  };
}

export default useWedcationAmbala;