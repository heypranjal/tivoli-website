/**
 * Omnia Brand Venues Data
 * Contemporary luxury properties under OMNIA brand
 * 
 * Properties included:
 * - Omnia by Tivoli-Dwarka Expressway
 * - Omnia by Tivoli-Greater Noida
 * - Omnia by Tivoli-Noida
 * 
 * File size: ~280 lines (target: <300)
 */

import { Hotel } from '@/types/hotel'

export const omniaVenues: Hotel[] = [
  {
    id: 'omnia-dwarka',
    name: 'Omnia by Tivoli-Dwarka Expressway',
    brand: 'omnia',
    location: 'delhi',
    slug: 'omnia-dwarka-expressway',
    description: 'Experience contemporary luxury at Omnia by Tivoli-Dwarka Expressway, where modern sophistication meets urban comfort. Located in the prestigious Dwarka Expressway area, this modern masterpiece offers an unparalleled blend of urban elegance and refined hospitality.',
    images: [
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/omnia-venues/dwarkahome1.jpg',
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/omnia-venues/dwarkahome2.jpg',
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/omnia-venues/dwarkahome3.jpg',
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/omnia-venues/dwarkahome4.jpg'
    ],
    rating: 5,
    address: {
      street: 'Dwarka Expressway, Sector 108',
      city: 'Gurgaon',
      state: 'Delhi',
      country: 'India',
      postalCode: '122006',
      coordinates: { lat: 28.3974, lng: 76.9629 }
    },
    contact: {
      phone: '+919811553333',
      email: 'dwarka@omniahotels.com'
    },
    amenities: [
      { id: 'wifi', name: 'High-Speed WiFi', description: 'Complimentary high-speed internet access throughout the property', icon: 'Signal' },
      { id: 'pool', name: 'Swimming Pool', description: 'Temperature-controlled outdoor pool', icon: 'Pool' },
      { id: 'fitness', name: 'Fitness Center', description: '24/7 state-of-the-art fitness center with personal training', icon: 'Dumbbell' },
      { id: 'dining', name: 'Fine Dining', description: 'Contemporary dining experiences', icon: 'Utensils' },
      { id: 'parking', name: 'Valet Parking', description: 'Complimentary valet parking for hotel guests', icon: 'Car' },
      { id: 'bar', name: 'Modern Bar', description: 'Contemporary bar with craft cocktails', icon: 'Wine' },
      { id: 'spa', name: 'Wellness Spa', description: 'Modern spa with rejuvenating treatments', icon: 'Spa' },
      { id: 'lounge', name: 'Business Lounge', description: 'Modern business lounge with co-working facilities', icon: 'Coffee' }
    ],
    rooms: [
      {
        id: 'deluxe',
        name: 'Deluxe Room',
        description: 'Contemporary 40 sq.m. room with modern amenities',
        size: '40 sq.m.',
        maxOccupancy: 2,
        bedType: 'King or Twin',
        images: [
          'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
        ],
        amenities: ['City View', 'Rain Shower', 'Smart TV', 'Mini Fridge', '24/7 Room Service'],
        price: { currency: 'INR', amount: 22000 }
      }
    ],
    dining: [
      {
        id: 'omnia-dining',
        name: 'Omnia Kitchen',
        description: 'Contemporary dining with international cuisine',
        cuisine: 'International',
        hours: '6:00 AM - 11:00 PM',
        dress: 'Smart Casual',
        image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/omnia-venues/dwarka-dining.jpg'
      }
    ],
    features: [
      'Contemporary Architecture', 'Wellness Spa', 'Modern Restaurants', 'Swimming Pool',
      'Business Center', 'Event Spaces', 'Concierge Service', '24/7 Room Service'
    ],
    policies: {
      checkIn: '3:00 PM',
      checkOut: '12:00 PM',
      cancellation: '24 hours before arrival',
      pets: 'Service animals only'
    }
  },
  {
    id: 'omnia-greater-noida',
    name: 'Omnia by Tivoli-Greater Noida',
    brand: 'omnia',
    location: 'greater-noida',
    slug: 'omnia-greater-noida',
    description: 'Experience contemporary luxury at Omnia by Tivoli-Greater Noida, where modern sophistication meets urban comfort. Located in the prestigious Greater Noida area, this modern masterpiece offers an unparalleled blend of urban elegance and refined hospitality.',
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1932&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    ],
    rating: 5,
    address: {
      street: 'Knowledge Park III, Greater Noida',
      city: 'Greater Noida',
      state: 'Uttar Pradesh',
      country: 'India',
      postalCode: '201308',
      coordinates: { lat: 28.4743, lng: 77.4862 }
    },
    contact: {
      phone: '+919811553333',
      email: 'greaternoida@omniahotels.com'
    },
    amenities: [
      { id: 'wifi', name: 'High-Speed WiFi', description: 'Complimentary high-speed internet access throughout the property', icon: 'Signal' },
      { id: 'pool', name: 'Swimming Pool', description: 'Temperature-controlled outdoor pool', icon: 'Pool' },
      { id: 'fitness', name: 'Fitness Center', description: '24/7 state-of-the-art fitness center with personal training', icon: 'Dumbbell' },
      { id: 'dining', name: 'Fine Dining', description: 'Contemporary dining experiences', icon: 'Utensils' },
      { id: 'parking', name: 'Valet Parking', description: 'Complimentary valet parking for hotel guests', icon: 'Car' },
      { id: 'bar', name: 'Modern Bar', description: 'Contemporary bar with craft cocktails', icon: 'Wine' },
      { id: 'spa', name: 'Wellness Spa', description: 'Modern spa with rejuvenating treatments', icon: 'Spa' },
      { id: 'lounge', name: 'Business Lounge', description: 'Modern business lounge with co-working facilities', icon: 'Coffee' }
    ],
    rooms: [
      {
        id: 'deluxe',
        name: 'Deluxe Room',
        description: 'Contemporary 40 sq.m. room with modern amenities',
        size: '40 sq.m.',
        maxOccupancy: 2,
        bedType: 'King or Twin',
        images: [
          'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
        ],
        amenities: ['City View', 'Rain Shower', 'Smart TV', 'Mini Fridge', '24/7 Room Service'],
        price: { currency: 'INR', amount: 20000 }
      }
    ],
    dining: [],
    features: [
      'Contemporary Architecture', 'Wellness Spa', 'Modern Restaurants', 'Swimming Pool',
      'Business Center', 'Event Spaces', 'Concierge Service', '24/7 Room Service'
    ],
    policies: {
      checkIn: '3:00 PM',
      checkOut: '12:00 PM',
      cancellation: '24 hours before arrival',
      pets: 'Service animals only'
    }
  },
  {
    id: 'omnia-noida',
    name: 'Omnia by Tivoli-Noida',
    brand: 'omnia',
    location: 'noida',
    slug: 'omnia-noida',
    description: 'Experience contemporary luxury at Omnia by Tivoli-Noida, where modern sophistication meets urban comfort. Located in the vibrant city of Noida, this modern masterpiece offers an unparalleled blend of urban elegance and refined hospitality.',
    images: [
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/omnia-venues/omnia-noida-hp-thumbnail.jpg',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1932&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    ],
    rating: 5,
    address: {
      street: 'Sector 62, Noida',
      city: 'Noida',
      state: 'Uttar Pradesh',
      country: 'India',
      postalCode: '201309',
      coordinates: { lat: 28.6139, lng: 77.3910 }
    },
    contact: {
      phone: '+919811553333',
      email: 'noida@omniahotels.com'
    },
    amenities: [
      { id: 'wifi', name: 'High-Speed WiFi', description: 'Complimentary high-speed internet access throughout the property', icon: 'Signal' },
      { id: 'pool', name: 'Swimming Pool', description: 'Temperature-controlled outdoor pool', icon: 'Pool' },
      { id: 'fitness', name: 'Fitness Center', description: '24/7 state-of-the-art fitness center with personal training', icon: 'Dumbbell' },
      { id: 'dining', name: 'Fine Dining', description: 'Contemporary dining experiences', icon: 'Utensils' },
      { id: 'parking', name: 'Valet Parking', description: 'Complimentary valet parking for hotel guests', icon: 'Car' },
      { id: 'bar', name: 'Modern Bar', description: 'Contemporary bar with craft cocktails', icon: 'Wine' },
      { id: 'spa', name: 'Wellness Spa', description: 'Modern spa with rejuvenating treatments', icon: 'Spa' },
      { id: 'lounge', name: 'Business Lounge', description: 'Modern business lounge with co-working facilities', icon: 'Coffee' }
    ],
    rooms: [
      {
        id: 'deluxe',
        name: 'Deluxe Room',
        description: 'Contemporary 40 sq.m. room with modern amenities',
        size: '40 sq.m.',
        maxOccupancy: 2,
        bedType: 'King or Twin',
        images: [
          'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
        ],
        amenities: ['City View', 'Rain Shower', 'Smart TV', 'Mini Fridge', '24/7 Room Service'],
        price: { currency: 'INR', amount: 18000 }
      }
    ],
    dining: [],
    features: [
      'Contemporary Architecture', 'Wellness Spa', 'Modern Restaurants', 'Swimming Pool',
      'Business Center', 'Event Spaces', 'Concierge Service', '24/7 Room Service'
    ],
    policies: {
      checkIn: '3:00 PM',
      checkOut: '12:00 PM',
      cancellation: '24 hours before arrival',
      pets: 'Service animals only'
    }
  }
]