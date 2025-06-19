/**
 * Upper HSE Brand Venues Data
 * Contemporary urban hotels under THE UPPER HSE brand
 * 
 * Properties included:
 * - The Upper HSE by Tivoli-Sultanpur
 * 
 * File size: ~120 lines (target: <300)
 */

import { Hotel } from '@/types/hotel'
import { MapPin, Wifi, School as Pool, Dumbbell, Utensils, Car, Wine, Space as Spa, Coffee } from 'lucide-react'

export const upperHseVenues: Hotel[] = [
  {
    id: 'upper-hse-sultanpur',
    name: 'The Upper HSE by Tivoli-Sultanpur',
    brand: 'upper-hse',
    location: 'delhi',
    slug: 'upper-hse-sultanpur',
    description: 'Experience contemporary luxury at The Upper HSE by Tivoli-Sultanpur, where modern sophistication meets urban comfort. Located in the prestigious Sultanpur area, this modern masterpiece offers an unparalleled blend of urban elegance and refined hospitality.',
    images: [
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/upper-hse-venues/sultanpur-upperhse-hp-thumbnail.jpg',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1932&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    ],
    rating: 5,
    address: {
      street: 'MG Road, Sultanpur',
      city: 'New Delhi',
      state: 'Delhi',
      country: 'India',
      postalCode: '110030',
      coordinates: { lat: 28.4916, lng: 77.2097 }
    },
    contact: {
      phone: '+919811553333',
      email: 'sultanpur@upperhsehotels.com'
    },
    amenities: [
      { id: 'wifi', name: 'High-Speed WiFi', description: 'Complimentary high-speed internet access throughout the property', icon: 'Wifi' },
      { id: 'pool', name: 'Swimming Pool', description: 'Temperature-controlled rooftop pool', icon: 'Pool' },
      { id: 'fitness', name: 'Fitness Center', description: '24/7 state-of-the-art fitness center with personal training', icon: 'Dumbbell' },
      { id: 'dining', name: 'Urban Dining', description: 'Contemporary urban dining experiences', icon: 'Utensils' },
      { id: 'parking', name: 'Valet Parking', description: 'Complimentary valet parking for hotel guests', icon: 'Car' },
      { id: 'bar', name: 'Rooftop Bar', description: 'Stylish rooftop bar with city views', icon: 'Wine' },
      { id: 'spa', name: 'Urban Spa', description: 'Modern urban spa with wellness treatments', icon: 'Spa' },
      { id: 'lounge', name: 'Executive Lounge', description: 'Contemporary executive lounge with co-working facilities', icon: 'Coffee' }
    ],
    rooms: [
      {
        id: 'deluxe',
        name: 'Urban Deluxe Room',
        description: 'Contemporary 42 sq.m. room with urban sophistication',
        size: '42 sq.m.',
        maxOccupancy: 2,
        bedType: 'King or Twin',
        images: [
          'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
        ],
        amenities: ['City View', 'Rain Shower', 'Smart TV', 'Mini Bar', '24/7 Room Service'],
        price: { currency: 'INR', amount: 24000 }
      },
      {
        id: 'suite',
        name: 'Urban Suite',
        description: 'Luxurious 80 sq.m. suite with separate living area and city views',
        size: '80 sq.m.',
        maxOccupancy: 3,
        bedType: 'King',
        images: [
          'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
          'https://images.unsplash.com/photo-1601551345929-64e5579b8f33?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
        ],
        amenities: ['City Skyline View', 'Private Balcony', 'Butler Service', 'Jacuzzi', 'Executive Lounge Access'],
        price: { currency: 'INR', amount: 42000 }
      }
    ],
    dining: [
      {
        id: 'hse-kitchen',
        name: 'HSE Kitchen',
        description: 'Contemporary urban dining with fusion cuisine',
        cuisine: 'Fusion',
        hours: '6:00 AM - 12:00 AM',
        dress: 'Smart Casual',
        image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/upper-hse-venues/sultanpur-dining.jpg'
      },
      {
        id: 'rooftop-bar',
        name: 'Sky Lounge',
        description: 'Rooftop bar with panoramic city views',
        cuisine: 'Bar & Grill',
        hours: '5:00 PM - 1:00 AM',
        dress: 'Smart Casual',
        image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/upper-hse-venues/sultanpur-rooftop.jpg'
      }
    ],
    features: [
      'Contemporary Architecture', 'Urban Spa', 'Rooftop Dining', 'Swimming Pool',
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