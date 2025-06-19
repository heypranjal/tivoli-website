/**
 * Wedcation Brand Venues Data  
 * Celebration and wedding venues under WEDCATION brand
 * 
 * Properties included:
 * - Wedcation by Tivoli-Ambala
 * - Wedcation by Tivoli-Israna
 * 
 * File size: ~180 lines (target: <300)
 */

import { Hotel } from '@/types/hotel'
import { MapPin, Wifi, School as Pool, Dumbbell, Utensils, Car, Wine, Space as Spa, Coffee } from 'lucide-react'

export const wedcationVenues: Hotel[] = [
  {
    id: 'wedcation-ambala',
    name: 'Wedcation by Tivoli-Ambala',
    brand: 'wedcation',
    location: 'ambala',
    slug: 'wedcation-by-tivoli-ambala',
    description: 'Experience unparalleled luxury at Wedcation by Tivoli-Ambala, where timeless elegance meets modern sophistication. Nestled in the heart of Ambala, this architectural masterpiece offers a perfect blend of traditional Indian hospitality and contemporary comfort.',
    images: [
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationambala/ambalahome2.jpg',
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationambala/ambalahomeimage.jpg',
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationambala/ambalahomeimage.jpg',
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationambala/ambalahome5.JPG'
    ],
    rating: 5,
    address: {
      street: 'NH-65, ambala - hissar rd, village durkhara, ambala, haryana 134003',
      city: 'Ambala',
      state: 'Haryana',
      country: 'India',
      postalCode: '134003',
      coordinates: { lat: 30.3744, lng: 76.7763 }
    },
    contact: {
      phone: '+917075970555',
      email: 'info@wedcationbytivoli.com'
    },
    amenities: [
      { id: 'wifi', name: 'High-Speed WiFi', description: 'Complimentary high-speed internet access throughout the property', icon: 'Wifi' },
      { id: 'pool', name: 'Swimming Pool', description: 'Temperature-controlled outdoor pool', icon: 'Pool' },
      { id: 'fitness', name: 'Fitness Center', description: '24/7 state-of-the-art fitness center with personal training', icon: 'Dumbbell' },
      { id: 'dining', name: 'Fine Dining', description: 'Multiple award-winning restaurants and bars', icon: 'Utensils' },
      { id: 'parking', name: 'Valet Parking', description: 'Complimentary valet parking for hotel guests', icon: 'Car' },
      { id: 'bar', name: 'Luxury Bar', description: 'Exclusive bar with premium spirits and wines', icon: 'Wine' },
      { id: 'spa', name: 'Luxury Spa', description: 'Full-service spa with signature treatments', icon: 'Spa' },
      { id: 'lounge', name: 'Executive Lounge', description: 'Private lounge with premium services and refreshments', icon: 'Coffee' }
    ],
    rooms: [
      {
        id: 'deluxe',
        name: 'Deluxe Room',
        description: 'Elegant 45 sq.m. room with city views and luxury amenities',
        size: '45 sq.m.',
        maxOccupancy: 2,
        bedType: 'King or Twin',
        images: [
          'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
        ],
        amenities: ['City View', 'Rain Shower', 'Mini Bar', 'Smart TV', '24/7 Room Service'],
        price: { currency: 'INR', amount: 25000 }
      }
    ],
    dining: [
      {
        id: 'dining-wedcation',
        name: 'The Wedcation Dining Hall',
        description: 'Exquisite dining experience with traditional Indian cuisine.',
        cuisine: 'Indian',
        hours: '7:00 PM - 11:00 PM',
        dress: 'Formal',
        image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationambala/ambaladinning.jpg'
      }
    ],
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
  },
  {
    id: 'wedcation-israna',
    name: 'Wedcation by Tivoli-Israna',
    brand: 'wedcation',
    location: 'israna',
    slug: 'wedcation-by-tivoli-israna',
    description: 'Experience unparalleled luxury at Wedcation by Tivoli-Israna, where timeless elegance meets modern sophistication. Nestled in the heart of Israna, this architectural masterpiece offers a perfect blend of traditional Indian hospitality and contemporary comfort.',
    images: [
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationisrana/israna1.jpg',
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationisrana/israna2.jpg',
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationisrana/israna3.jpg',
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationisrana/israna4.jpg'
    ],
    rating: 5,
    address: {
      street: 'NH-44, Israna, Panipat, Haryana 132107',
      city: 'Israna',
      state: 'Haryana',
      country: 'India',
      postalCode: '132107',
      coordinates: { lat: 29.2744, lng: 76.9763 }
    },
    contact: {
      phone: '+917075970555',
      email: 'info@wedcationbytivoli.com'
    },
    amenities: [
      { id: 'wifi', name: 'High-Speed WiFi', description: 'Complimentary high-speed internet access throughout the property', icon: 'Wifi' },
      { id: 'pool', name: 'Swimming Pool', description: 'Temperature-controlled outdoor pool', icon: 'Pool' },
      { id: 'fitness', name: 'Fitness Center', description: '24/7 state-of-the-art fitness center with personal training', icon: 'Dumbbell' },
      { id: 'dining', name: 'Fine Dining', description: 'Multiple award-winning restaurants and bars', icon: 'Utensils' },
      { id: 'parking', name: 'Valet Parking', description: 'Complimentary valet parking for hotel guests', icon: 'Car' },
      { id: 'bar', name: 'Luxury Bar', description: 'Exclusive bar with premium spirits and wines', icon: 'Wine' },
      { id: 'spa', name: 'Luxury Spa', description: 'Full-service spa with signature treatments', icon: 'Spa' },
      { id: 'lounge', name: 'Executive Lounge', description: 'Private lounge with premium services and refreshments', icon: 'Coffee' }
    ],
    rooms: [
      {
        id: 'deluxe',
        name: 'Deluxe Room',
        description: 'Elegant 45 sq.m. room with city views and luxury amenities',
        size: '45 sq.m.',
        maxOccupancy: 2,
        bedType: 'King or Twin',
        images: [
          'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
        ],
        amenities: ['City View', 'Rain Shower', 'Mini Bar', 'Smart TV', '24/7 Room Service'],
        price: { currency: 'INR', amount: 25000 }
      }
    ],
    dining: [
      {
        id: 'dining-wedcation-israna',
        name: 'The Wedcation Dining Hall',
        description: 'Exquisite dining experience with traditional Indian cuisine.',
        cuisine: 'Indian',
        hours: '7:00 PM - 11:00 PM',
        dress: 'Formal',
        image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationisrana/israna-dining.jpg'
      }
    ],
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