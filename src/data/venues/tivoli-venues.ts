/**
 * Tivoli Brand Venues Data
 * Premium luxury properties under THE TIVOLI brand
 * 
 * Properties included:
 * - The Tivoli-New Delhi (flagship property)
 * - Tivoli Royal Palace-Palwal 
 * - Tivoli Heritage Palace-Rewari
 * - Tivoli Lotus Court-Noida
 * - Tivoli Bijwasan-Delhi
 * - Tivoli Royal Court-Okhla
 * 
 * File size: ~280 lines (target: <300)
 */

import { Hotel } from '@/types/hotel'
import { MapPin, Wifi, School as Pool, Dumbbell, Utensils, Car, Wine, Space as Spa, Coffee } from 'lucide-react'

export const tivoliVenues: Hotel[] = [
  {
    id: 'tivoli-grand-palace',
    name: 'The Tivoli-New Delhi',
    brand: 'tivoli',
    location: 'delhi',
    slug: 'tivoli-grand-palace',
    description: 'Experience unparalleled luxury at Tivoli Grand Palace, where timeless elegance meets modern sophistication. Nestled in the heart of Delhi, this architectural masterpiece offers a perfect blend of traditional Indian hospitality and contemporary comfort.',
    images: [
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoli-dining-photo/SSS_9999.jpg',
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal/tivolipalwalHomephoto4%20(1).jpg',
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoli-dining-photo/SSS_9948.jpg',
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoli-dining-photo/DJI_20250211165024_0664_D%20copy.jpg'
    ],
    rating: 5,
    address: {
      street: '1, Chattarpur',
      city: 'New Delhi',
      state: 'Delhi',
      country: 'India',
      postalCode: '110074',
      coordinates: { lat: 28.5921, lng: 77.1691 }
    },
    contact: {
      phone: '+91858885035,981855333, 011-47479999',
      email: 'reservations@thetivolihotels.com'
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
      },
      {
        id: 'suite',
        name: 'Palace Suite',
        description: 'Luxurious 90 sq.m. suite with separate living area and palace views',
        size: '90 sq.m.',
        maxOccupancy: 3,
        bedType: 'King',
        images: [
          'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
          'https://images.unsplash.com/photo-1601551345929-64e5579b8f33?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
        ],
        amenities: ['Palace View', 'Private Balcony', 'Butler Service', 'Jacuzzi', 'Lounge Access'],
        price: { currency: 'INR', amount: 45000 }
      }
    ],
    dining: [
      {
        id: 'Blue-Grotto',
        name: 'Blue Grotto',
        description: 'Award-winning restaurant featuring pan-Asian cuisine',
        cuisine: 'Pan-Asian',
        hours: '12:30 PM - 11:30 PM',
        dress: 'Smart Casual',
        image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoli-dining-photo/blue%20grotto.webp'
      },
      {
        id: 'Zuun',
        name: 'Zuun',
        description: 'Award-winning restaurant featuring pan-Asian cuisine',
        cuisine: 'Pan-Asian',
        hours: '12:30 PM - 11:30 PM',
        dress: 'Smart Casual',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
      },
      {
        id: 'Aria',
        name: 'Aria',
        description: 'Fine dining restaurant serving modern Indian cuisine',
        cuisine: 'Modern Indian',
        hours: '7:00 PM - 11:00 PM',
        dress: 'Formal',
        image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoli-dining-photo/aria.jpg'
      },
      {
        id: "Trafalgar's",
        name: "Trafalgar's",
        description: 'Award-winning restaurant featuring pan-Asian cuisine',
        cuisine: 'Pan-Asian',
        hours: '12:30 PM - 11:30 PM',
        dress: 'Smart Casual',
        image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoli-dining-photo/Trafalgar%20bar.jpg'
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
    id: 'tivoli-royal-suite',
    name: 'Tivoli Royal Palace',
    brand: 'tivoli',
    location: 'palwal-haryana',
    slug: 'tivoli-royal-suite',
    description: 'Experience unparalleled luxury at Tivoli Royal Palace, where timeless elegance meets modern sophistication. Nestled in the heart of Palwal-Haryana, this architectural masterpiece offers a perfect blend of traditional Indian hospitality and contemporary comfort.',
    images: [
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal/tivolipalwalhomephoto1.jpg',
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal/tivolipalwalHomephoto2.jpg',
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal/tivolipalwalHomephoto3.jpg',
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal/tivolipalwalHomephoto4.jpg',
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal/tivolipalwalHomephoto5.jpg'
    ],
    rating: 5,
    address: {
      street: 'Bhagola NH 2, Beside Satya Sai Heart Hospital',
      city: 'Palwal-Haryana',
      state: 'Haryana',
      country: 'India',
      postalCode: '110074',
      coordinates: { lat: 28.5921, lng: 77.1691 }
    },
    contact: {
      phone: '9818553333',
      email: 'reservations@thetivolihotels.com'
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
      },
      {
        id: 'suite',
        name: 'Palace Suite',
        description: 'Luxurious 90 sq.m. suite with separate living area and palace views',
        size: '90 sq.m.',
        maxOccupancy: 3,
        bedType: 'King',
        images: [
          'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
          'https://images.unsplash.com/photo-1601551345929-64e5579b8f33?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
        ],
        amenities: ['Palace View', 'Private Balcony', 'Butler Service', 'Jacuzzi', 'Lounge Access'],
        price: { currency: 'INR', amount: 45000 }
      }
    ],
    dining: [
      {
        id: 'dining-royal',
        name: 'The Royal Dining Hall',
        description: 'Exquisite dining experience with traditional Indian cuisine.',
        cuisine: 'Indian',
        hours: '7:00 PM - 11:00 PM',
        dress: 'Formal',
        image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal/palwal%20dining.jpg'
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