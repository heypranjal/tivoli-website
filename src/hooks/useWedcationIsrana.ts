/**
 * Specialized Hook for Wedcation by Tivoli-Israna
 * Comprehensive data fetching with enhanced features for the wedding destination property
 */

import { useState, useEffect, useMemo } from 'react';
import { useHotel, useHotelMedia, transformHotelData } from './useSupabase';
import { Hotel } from '@/types/hotel';

// Enhanced types specific to Wedcation by Tivoli-Israna
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

// Static enhanced data for Wedcation by Tivoli-Israna
const WEDCATION_ENHANCED_DATA = {
  spaces: [
    {
      id: 'the-castle',
      name: 'The Castle',
      capacity: '1,000 pax (Theatre Style)',
      area: '12,000 sq ft',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      features: [
        'Grand 12,000 sq ft banquet hall',
        'Theatre style seating for 1,000 guests',
        'Classroom style seating for 600 guests',
        'U-Shape seating for 200 guests',
        'Stage, LED screens, AV equipment, projector',
        'Custom décor capabilities'
      ],
      description: 'The magnificent Castle - our grand banquet hall designed for spectacular weddings and events'
    },
    {
      id: 'open-lawn',
      name: 'Open Lawn',
      capacity: '1,000+ pax',
      area: '22,000 sq ft',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
      features: [
        'Expansive 22,000 sq ft outdoor space',
        'Flexible seating arrangements',
        'Perfect for large weddings and events',
        'Professional lighting setup',
        'Beautiful garden surroundings'
      ],
      description: 'Spectacular open lawn venue offering the largest outdoor space for grand celebrations'
    },
    {
      id: 'poolside-glasshouse',
      name: 'Pool Side & Glass House',
      capacity: 'Flexible',
      area: 'Outdoor Features',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      features: [
        'Beautiful poolside area',
        'Elegant Glass House structure',
        'Perfect for cocktail hours',
        'Romantic water features',
        'Unique photogenic settings'
      ],
      description: 'Stunning poolside and Glass House areas for unique ceremony experiences and receptions'
    },
    {
      id: 'meeting-rooms',
      name: 'Meeting Rooms',
      capacity: 'Business Events',
      area: 'Corporate Facilities',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      features: [
        '1 dedicated meeting room',
        'State-of-the-art AV equipment',
        'Professional setup',
        'Perfect for corporate events',
        'Business-friendly environment'
      ],
      description: 'Professional meeting room facilities for corporate events and business gatherings'
    }
  ],

  diningVenues: [
    {
      id: 'plum-cafe',
      name: 'Plum Café',
      description: 'Multi-cuisine café specializing in Pizza & Pasta, Grilled Sandwiches, and international favorites',
      cuisine: 'Multi-Cuisine Café',
      hours: 'Breakfast: 7:00 AM - 11:00 AM, Lunch: 11:30 AM - 3:00 PM, Dinner: 7:00 PM - 11:00 PM',
      dressCode: 'Casual',
      image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      specialties: ['Pizza & Pasta', 'Grilled Sandwiches', 'Continental Favorites', 'Quick Bites']
    },
    {
      id: 'glass-house-restaurant',
      name: 'Glass House Restaurant & Bar',
      description: 'Elegant multi-cuisine restaurant with bar offering signature dishes and premium beverages',
      cuisine: 'Multi-Cuisine with Bar',
      hours: 'Lunch: 11:30 AM - 3:00 PM, Dinner: 7:00 PM - 11:00 PM, Night Special: 11:00 PM - 7:00 AM',
      dressCode: 'Smart Casual',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      specialties: ['Tivoli Special Dal Makhani', 'Paneer ki Khurchan', 'Gulab ki Kheer', 'Premium Bar Service']
    },
    {
      id: 'banquet-catering',
      name: 'Banquet Catering Services',
      description: 'Comprehensive catering services for weddings and events with customizable menus and live counters',
      cuisine: 'Event Catering',
      hours: 'Event Based',
      dressCode: 'Event Appropriate',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      specialties: ['Wedding Banquets', 'Buffet Service', 'Pre-Plated Service', 'Custom Menus', 'Live Counters']
    }
  ],

  experiences: [
    {
      id: 'destination-weddings',
      title: 'Destination Weddings',
      subtitle: '4-Star Luxury Property',
      description: 'Comprehensive destination wedding packages with 46 rooms (18 operational, 28 under construction) and world-class venues including The Castle',
      image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      category: 'Wedding'
    },
    {
      id: 'pre-wedding-shoots',
      title: 'Pre-Wedding Photography',
      subtitle: 'Castle & Gardens',
      description: 'Stunning settings including The Castle, 22,000 sq ft open lawn, Glass House, and poolside areas for memorable photo sessions',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      category: 'Photography'
    },
    {
      id: 'corporate-events',
      title: 'Corporate Events',
      subtitle: 'Major Corporate Clients',
      description: 'Professional venues serving major clients like Mahindra, Adani Group, Microtek, and NC Medical College',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      category: 'Business'
    },
    {
      id: 'luxury-accommodation',
      title: '46 Premium Rooms',
      subtitle: 'Deluxe to Suite Rooms',
      description: '5 Deluxe (230 sq ft), 10 Super Deluxe (250 sq ft), 3 Suite Rooms (480 sq ft), plus 28 villas under construction',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      category: 'Accommodation'
    },
    {
      id: 'special-packages',
      title: 'Stay + Event Packages',
      subtitle: 'Complete Experience',
      description: 'Special packages combining luxury accommodation with event venues and comprehensive catering services',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      category: 'Packages'
    },
    {
      id: 'recreational-facilities',
      title: 'Recreation & Wellness',
      subtitle: 'Comprehensive Facilities',
      description: 'Swimming pool, badminton court, cycling track, with spa, gym, and kids play area under construction',
      image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      category: 'Recreation'
    }
  ],

  galleryImages: [
    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
    'https://images.unsplash.com/photo-1465929639680-64ee080eb3ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  ],

  virtualTour: {
    url: 'https://example.com/wedcation-israna-virtual-tour',
    provider: 'spalba' as const,
    thumbnail: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  },

  quickStats: {
    rooms: 18,
    diningVenues: 3,
    eventCapacity: 1000,
    conciergeHours: '24/7'
  },

  socialMedia: {
    instagram: 'https://www.instagram.com/wedcationbytivoli/',
    facebook: 'https://www.facebook.com/wedcationbytivoliisrana/',
    website: 'https://tivolibanquets.com/'
  }
};

/**
 * Custom hook for Wedcation by Tivoli-Israna data with caching and optimization
 * Combines database data with enhanced static information
 */
export function useWedcationIsrana(slug: string = 'wedcation-by-tivoli-israna') {
  const [timeoutReached, setTimeoutReached] = useState(false);
  
  // Fetch hotel data from Supabase
  const { data: hotelData, loading, error } = useHotel(slug);
  
  // Fetch media data for the hotel
  const { data: mediaData, loading: mediaLoading } = useHotelMedia(
    hotelData?.id || '3fe2d3a7-c69d-4a90-88db-30523c8b1e4a', 
    { media_type: 'gallery' },
    { enabled: !!hotelData?.id }
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
        id: '3fe2d3a7-c69d-4a90-88db-30523c8b1e4a',
        name: 'Wedcation by Tivoli - Israna',
        brand: 'wedcation',
        location: 'israna',
        slug: 'wedcation-by-tivoli-israna',
        description: 'Wedcation by Tivoli, Israna is an expanding luxury hospitality destination currently offering 18 operational rooms with 28 additional villas under construction. The property features "The Castle" - a grand 12,000 sq. ft. banquet hall, along with a 22,000 sq. ft. open lawn and multiple venue options. With comprehensive dining facilities including Plum Café and Glass House restaurant, the property caters to weddings, conferences, corporate events, and social gatherings with capacity for up to 1,000 guests.',
        images: WEDCATION_ENHANCED_DATA.galleryImages,
        rating: 4,
        address: {
          street: 'Main Panipat Rohtak Road, Near Hanuman Mandir',
          city: 'Israna',
          state: 'Haryana',
          country: 'India',
          postalCode: '132107',
          coordinates: {
            lat: 29.267752875323822,
            lng: 76.8317695755244
          }
        },
        contact: {
          phone: '+917075970555',
          email: 'gm.israna@wedcationbytivoli.com',
          bookingEmail: 'sales.israna@wedcationbytivoli.com',
          whatsapp: '+917075970555',
          website: 'https://tivolibanquets.com/'
        },
        amenities: [
          { id: 'wifi', name: 'Wi-Fi', description: 'Complimentary Wi-Fi access in all rooms and public areas', icon: 'Signal' },
          { id: 'pool', name: 'Swimming Pool', description: 'Outdoor swimming pool with poolside event area', icon: 'Pool' },
          { id: 'business', name: 'Business Centre', description: 'Professional business services and meeting facilities', icon: 'Briefcase' },
          { id: 'parking', name: 'Parking Facility', description: 'Parking capacity for 400 cars with valet service', icon: 'Car' },
          { id: 'recreation', name: 'Recreation', description: 'Badminton court and cycling track available', icon: 'Users' },
          { id: 'concierge', name: 'Concierge Services', description: 'Professional concierge services', icon: 'Clock' },
          { id: 'spa-construction', name: 'Spa & Wellness', description: 'Spa, gym, and kids play area under construction', icon: 'Building' },
          { id: 'laundry', name: 'Laundry Service', description: 'Professional laundry services available', icon: 'Shirt' }
        ],
        rooms: [
          {
            id: 'deluxe-standard',
            name: 'Deluxe Room (Standard)',
            description: 'Comfortable deluxe rooms with standard amenities and 1 Queen Bed. 230 sq.ft (21 sq.mt).',
            size: '230 sq.ft (21 sq.mt)',
            maxOccupancy: 2,
            bedType: '1 Queen Bed',
            images: [],
            amenities: ['Mineral Water', 'Air Conditioning', 'Bathroom', 'Iron/Ironing Board', 'Closet', 'Chair', 'Tea Kettle', 'Minibar', 'Safe', 'Shaving Kit', 'Dental Kit', 'Slippers', 'Shampoo', 'Body Moisturizer', 'Shower Gel', 'Shower Cap', 'Sewing Kit', 'Laundry Service', 'Wi-Fi']
          },
          {
            id: 'deluxe-balcony',
            name: 'Deluxe Room with Balcony',
            description: 'Deluxe rooms with beautiful garden view and private balcony. 230 sq.ft (21 sq.mt).',
            size: '230 sq.ft (21 sq.mt)',
            maxOccupancy: 2,
            bedType: '1 Queen Bed',
            images: [],
            amenities: ['Mineral Water', 'Air Conditioning', 'Room Service', 'Free Wi-Fi', 'Heater', 'Garden View', 'Balcony', 'Tea Kettle', 'Minibar', 'Safe', 'Shaving Kit', 'Dental Kit', 'Slippers', 'Shampoo', 'Body Moisturizer', 'Shower Gel', 'Shower Cap', 'Sewing Kit', 'Laundry Service']
          },
          {
            id: 'queen-suite',
            name: 'Queen Suite Room',
            description: 'Spacious suite with garden view and premium amenities. 480 sq.ft (45 sq.mt).',
            size: '480 sq.ft (45 sq.mt)',
            maxOccupancy: 3,
            bedType: '1 Queen Bed',
            images: [],
            amenities: ['Mineral Water', 'Air Conditioning', 'Bathroom', 'Iron/Ironing Board', 'Closet', 'Chair', 'Garden View', 'Tea Kettle', 'Minibar', 'Safe', 'Shaving Kit', 'Dental Kit', 'Slippers', 'Shampoo', 'Body Moisturizer', 'Shower Gel', 'Shower Cap', 'Sewing Kit', 'Laundry Service', 'Wi-Fi']
          },
          {
            id: 'de-salvador-suite',
            name: 'De Salvador Suite Room',
            description: 'Luxury suite with palace view and telephone facilities. 480 sq.ft (45 sq.mt).',
            size: '480 sq.ft (45 sq.mt)',
            maxOccupancy: 3,
            bedType: '1 Queen Bed',
            images: [],
            amenities: ['Mineral Water (additional charge)', 'Air Conditioning', 'Bathroom', 'Closet', 'Chair', 'Telephone', 'Palace View', 'Tea Kettle', 'Minibar', 'Safe', 'Shaving Kit', 'Dental Kit', 'Slippers', 'Shampoo', 'Body Moisturizer', 'Shower Gel', 'Shower Cap', 'Sewing Kit', 'Laundry Service', 'Wi-Fi']
          },
          {
            id: 'casa-de-cancun-suite',
            name: 'Casa De Cancun Suite Room',
            description: 'Premium suite with palace view, jacuzzi, and bathtub. 480 sq.ft (45 sq.mt).',
            size: '480 sq.ft (45 sq.mt)',
            maxOccupancy: 3,
            bedType: '1 Queen Bed',
            images: [],
            amenities: ['Jacuzzi', 'Bathtub', 'Palace View', 'Tea Kettle', 'Minibar', 'Safe', 'Shaving Kit', 'Dental Kit', 'Slippers', 'Shampoo', 'Body Moisturizer', 'Shower Gel', 'Shower Cap', 'Sewing Kit', 'Laundry Service', 'Wi-Fi']
          },
          {
            id: 'villas-construction',
            name: 'Villas (Under Construction)',
            description: 'Luxurious villas currently under construction. 28 villas will be available upon completion.',
            size: 'Villa',
            maxOccupancy: 6,
            bedType: 'Private Villa',
            images: [],
            amenities: ['Under Construction']
          }
        ],
        dining: [],
        features: ['Wedding Venues', 'Garden Spaces', 'Royal Ballrooms', 'Terrace Events'],
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
        ? mediaData.map(m => m.media.public_url)
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

export default useWedcationIsrana;