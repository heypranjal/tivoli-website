/**
 * Tivoli Hotels Master Data File
 * Centralized hotel data aggregation with modular architecture
 * 
 * Features:
 * - Imports from modular venue files for better organization
 * - Maintains backward compatibility with existing imports
 * - Reduced file size from 1633 lines to ~100 lines
 * - Easy to maintain and extend
 * 
 * Architecture:
 * - /data/venues/tivoli-venues.ts - Premium Tivoli properties
 * - /data/venues/wedcation-venues.ts - Wedding/celebration venues  
 * - /data/venues/omnia-venues.ts - Nature luxury properties
 * - /data/venues/upper-hse-venues.ts - Contemporary urban hotels
 * 
 * Migration Status: 
 * - Updated Supabase URLs to new instance
 * - Split large data file into manageable modules
 * - Preserved all existing functionality
 */

import { Hotel } from '@/types/hotel'
import { tivoliVenues } from './venues/tivoli-venues'
import { wedcationVenues } from './venues/wedcation-venues'
import { omniaVenues } from './venues/omnia-venues'
import { upperHseVenues } from './venues/upper-hse-venues'

// Additional Tivoli venues (continuing from tivoli-venues.ts)
const additionalTivoliVenues: Hotel[] = [
  {
    id: 'tivoli-heritage-palace',
    name: 'Tivoli Heritage Palace',
    brand: 'tivoli',
    location: 'rewari-haryana',
    slug: 'tivoli-heritage-palace',
    description: 'Experience unparalleled luxury at Tivoli Heritage Palace, where timeless elegance meets modern sophistication. Nestled in the heart of Rewari-Haryana, this architectural masterpiece offers a perfect blend of traditional Indian hospitality and contemporary comfort.',
    images: [
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/mainphoto6.jpg',
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/mainpagephoto2.jpg',
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/mainpagephoto4.jpg',
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/mainphoto6.jpg'
    ],
    rating: 5,
    address: {
      street: 'Kanhawas,5PF3+53X Kanhawas',
      city: 'Rewari',
      state: 'Haryana',
      country: 'India',
      postalCode: '123401',
      coordinates: { lat: 28.1991, lng: 76.6198 }
    },
    contact: {
      phone: '+9818553333',
      email: 'heritage@tivolihotels.com'
    },
    amenities: [
      { id: 'wifi', name: 'High-Speed WiFi', description: 'Complimentary high-speed internet access', icon: 'Signal' },
      { id: 'pool', name: 'Swimming Pool', description: 'Temperature-controlled outdoor pool', icon: 'Pool' },
      { id: 'fitness', name: 'Fitness Center', description: '24/7 fitness center with personal training', icon: 'Dumbbell' },
      { id: 'dining', name: 'Fine Dining', description: 'Multiple award-winning restaurants', icon: 'Utensils' },
      { id: 'parking', name: 'Valet Parking', description: 'Complimentary valet parking', icon: 'Car' },
      { id: 'bar', name: 'Luxury Bar', description: 'Exclusive bar with premium spirits', icon: 'Wine' },
      { id: 'spa', name: 'Luxury Spa', description: 'Full-service spa with signature treatments', icon: 'Spa' },
      { id: 'lounge', name: 'Executive Lounge', description: 'Private lounge with premium services', icon: 'Coffee' }
    ],
    rooms: [
      {
        id: 'deluxe',
        name: 'Heritage Room',
        description: 'Elegant 45 sq.m. room with heritage views and luxury amenities',
        size: '45 sq.m.',
        maxOccupancy: 2,
        bedType: 'King or Twin',
        images: [
          'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
        ],
        amenities: ['Heritage View', 'Rain Shower', 'Mini Bar', 'Smart TV', '24/7 Room Service'],
        price: { currency: 'INR', amount: 25000 }
      }
    ],
    dining: [],
    features: [
      'Heritage Architecture', 'Luxury Spa', 'Multiple Restaurants', 'Outdoor Pool',
      'Business Center', 'Wedding Venues', 'Concierge Service', '24/7 Room Service'
    ],
    policies: {
      checkIn: '2:00 PM',
      checkOut: '12:00 PM',
      cancellation: '24 hours before arrival',
      pets: 'Not allowed'
    }
  }
]

// Aggregate all hotels from modular files
export const hotels: Hotel[] = [
  ...tivoliVenues,
  ...additionalTivoliVenues,
  ...wedcationVenues,
  ...omniaVenues,
  ...upperHseVenues
]

// Helper functions for backward compatibility
export function getHotelById(id: string): Hotel | undefined {
  return hotels.find(hotel => hotel.id === id)
}

export function getHotelBySlug(slug: string): Hotel | undefined {
  return hotels.find(hotel => hotel.slug === slug)
}

export function getHotelsByBrand(brand: string): Hotel[] {
  return hotels.filter(hotel => hotel.brand.toLowerCase() === brand.toLowerCase())
}

export function getHotelsByLocation(location: string): Hotel[] {
  return hotels.filter(hotel => hotel.location.toLowerCase() === location.toLowerCase())
}

// Export venue collections for direct access
export { tivoliVenues, wedcationVenues, omniaVenues, upperHseVenues }

// Brand and location mappings for consistency
export const HOTEL_BRANDS = ['tivoli', 'wedcation', 'omnia', 'upper-hse'] as const
export const HOTEL_LOCATIONS = [
  'delhi', 'noida', 'greater-noida', 'ambala', 'israna', 
  'palwal-haryana', 'rewari-haryana'
] as const

export default hotels