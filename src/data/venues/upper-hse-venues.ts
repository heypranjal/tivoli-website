/**
 * Upper HSE Brand Venues Data
 * Delhi's Ultra Luxury Oval Glass House
 * 
 * Properties included:
 * - The Upper HSE - Sultanpur by Tivoli
 * 
 * Updated with factual information
 */

import { Hotel } from '@/types/hotel'

export const upperHseVenues: Hotel[] = [
  {
    id: 'upper-hse-sultanpur',
    name: 'The Upper HSE - Sultanpur by Tivoli',
    brand: 'upper-hse',
    location: 'delhi',
    slug: 'upper-hse-sultanpur',
    description: 'Welcome to "The Upper HSE" by Tivoli, Delhi\'s premier ultra-luxury venue, boasting an iconic oval-shaped glass house. This exquisite property can comfortably accommodate 200 to 1000 guests, making it an ideal choice for weddings, pre-wedding ceremonies, and corporate events. The venue features a singular glass house complemented by a lush lawn area, offering versatility and elegance. The venue includes ample parking for up to 200 cars with valet service, a pre-function area, and a serene garden setting. Discover the grandeur of "The Upper HSE" – where luxury meets legacy.\n\nThe combination of beautifully furnished infastructure, delectable dining options, beautiful setting and the excellent range of guest facilities offered by the luxury venue makes it a preferred conference and event destination, an ideal venue for social gatherings and wedding celebrations.',
    images: [
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/hsesultanpur/banner/Screenshot%202025-07-25%20144720.jpg',
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/hsesultanpur/banner/Screenshot%202025-07-25%20144527.jpg',
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/hsesultanpur/banner/Screenshot%202025-07-25%20144817.jpg',
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/hsesultanpur/banner/Screenshot%202025-07-25%20144846.jpg',
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/hsesultanpur/banner/Screenshot%202025-07-25%20144409.jpg'
    ],
    rating: 5,
    address: {
      street: 'Farm No.1, Sultanpur Estate, Mandi Rd, DLF Farms',
      city: 'New Delhi',
      state: 'Delhi',
      country: 'India',
      postalCode: '110030',
      coordinates: { lat: 28.491442099999997, lng: 77.1632989 }
    },
    contact: {
      phone: '8588850354, 981855333',
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
        images: [
          'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
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
        images: [
          'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
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
        images: [
          'https://images.unsplash.com/photo-1540518614846-7eded47bb47b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
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
        images: [
          'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        amenities: ['Air Conditioning', 'Attached Bathroom', 'Basic Amenities'],
        price: { currency: 'INR', amount: 0, note: 'Complimentary with event booking' }
      }
    ],
    dining: [
      {
        id: 'catering-service',
        name: 'Catering Services',
        description: 'Professional catering services with custom menus, live counters, and flexible dining options',
        cuisine: 'Multi-Cuisine',
        hours: 'As per event requirements',
        dress: 'As per event theme',
        features: ['In-house Catering', 'Outside Catering Allowed', 'Custom Menus', 'Live Counters'],
        image: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
      }
    ],
    spaces: [
      {
        id: 'oval-glass-house',
        name: 'Ultra Luxury Oval Glass House',
        description: 'Delhi\'s premier ultra-luxury venue featuring an iconic oval-shaped glass house with sound proof glasses and AC hall',
        capacity: { min: 200, max: 1000 },
        area: '10,000 sq.ft',
        type: 'Banquet Hall',
        image: 'https://images.unsplash.com/photo-1519167758481-83f29c7c8756?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        features: ['Sound Proof Glasses', 'AC Hall', 'Audio Visual Equipment', 'Professional Lighting'],
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
        description: 'Expansive outdoor lawn area complementing the glass house, perfect for outdoor ceremonies and receptions',
        capacity: { min: 200, max: 1000 },
        area: '30,000 sq.ft',
        type: 'Outdoor Lawn',
        image: 'https://images.unsplash.com/photo-1549294413-26f195200c16?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        features: ['Garden Setting', 'Open Air', 'Lawn Area', 'Scenic Views'],
        configurations: [
          { style: 'Wedding Setup', capacity: 800 },
          { style: 'Corporate Event', capacity: 600 },
          { style: 'Reception', capacity: 1000 }
        ]
      }
    ],
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
      'Pre-Wedding Shoots',
      'Corporate Events',
      'Social Gatherings'
    ],
    services: [
      'Destination Weddings',
      'Pre-Wedding Shoots', 
      'Corporate Events',
      'MICE Events',
      'Birthday Celebrations',
      'Cocktail Parties',
      'Social Gatherings',
      'Stay + Event Packages',
      'Loyalty Programs'
    ],
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
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.6049320382813!2d77.1632989!3d28.491442099999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1fdbcba0b08b%3A0xb6cea74e5c7dfb37!2sThe%20Upper%20HSE%20by%20Tivoli!5e0!3m2!1sen!2sin!4v1750683207349!5m2!1sen!2sin',
    policies: {
      checkIn: 'Event-based arrival',
      checkOut: 'Event completion',
      cancellation: 'As per event contract terms',
      pets: 'Not allowed'
    }
  }
]