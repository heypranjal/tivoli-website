import { Hotel } from '@/types/hotel';
import { MapPin, Wifi, School as Pool, Dumbbell, Utensils, Car, Wine, Space as Spa, Coffee } from 'lucide-react';

export const hotels: Hotel[] = [
  {
    id: 'tivoli-grand-palace',
    name: 'The Tivoli-New Delhi',
    brand: 'tivoli',
    location: 'delhi',
    slug: 'tivoli-grand-palace',
    description: 'Experience unparalleled luxury at Tivoli Grand Palace, where timeless elegance meets modern sophistication. Nestled in the heart of Delhi, this architectural masterpiece offers a perfect blend of traditional Indian hospitality and contemporary comfort.',
    images: [
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoli-dining-photo//SSS_9999.jpg',
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal//tivolipalwalHomephoto4%20(1).jpg',
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoli-dining-photo//SSS_9948.jpg',
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoli-dining-photo//DJI_20250211165024_0664_D%20copy.jpg'
    ],
    rating: 5,
    address: {
      street: '1, Chattarpur',
      city: 'New Delhi',
      state: 'Delhi',
      country: 'India',
      postalCode: '110074',
      coordinates: {
        lat: 28.5921,
        lng: 77.1691
      }
    },
    contact: {
      phone: '+91858885035,981855333, 011-47479999 ',
      email: 'reservations@thetivolihotels.com'
    },
    amenities: [
      {
        id: 'wifi',
        name: 'High-Speed WiFi',
        description: 'Complimentary high-speed internet access throughout the property',
        icon: 'Wifi'
      },
      {
        id: 'pool',
        name: 'Swimming Pool',
        description: 'Temperature-controlled outdoor pool',
        icon: 'Pool'
      },
      {
        id: 'fitness',
        name: 'Fitness Center',
        description: '24/7 state-of-the-art fitness center with personal training',
        icon: 'Dumbbell'
      },
      {
        id: 'dining',
        name: 'Fine Dining',
        description: 'Multiple award-winning restaurants and bars',
        icon: 'Utensils'
      },
      {
        id: 'parking',
        name: 'Valet Parking',
        description: 'Complimentary valet parking for hotel guests',
        icon: 'Car'
      },
      {
        id: 'bar',
        name: 'Luxury Bar',
        description: 'Exclusive bar with premium spirits and wines',
        icon: 'Wine'
      },
      {
        id: 'spa',
        name: 'Luxury Spa',
        description: 'Full-service spa with signature treatments',
        icon: 'Spa'
      },
      {
        id: 'lounge',
        name: 'Executive Lounge',
        description: 'Private lounge with premium services and refreshments',
        icon: 'Coffee'
      }
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
        amenities: [
          'City View',
          'Rain Shower',
          'Mini Bar',
          'Smart TV',
          '24/7 Room Service'
        ],
        price: {
          currency: 'INR',
          amount: 25000
        }
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
        amenities: [
          'Palace View',
          'Private Balcony',
          'Butler Service',
          'Jacuzzi',
          'Lounge Access'
        ],
        price: {
          currency: 'INR',
          amount: 45000
        }
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
        image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoli-dining-photo//blue%20grotto.webp'
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
        id: ' Aria',
        name: ' Aria',
        description: 'Fine dining restaurant serving modern Indian cuisine',
        cuisine: 'Modern Indian',
        hours: '7:00 PM - 11:00 PM',
        dress: 'Formal',
        image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoli-dining-photo//aria.jpg'
      },
      {
        id: "Trafalgar's",
        name: "Trafalgar's",
        description: 'Award-winning restaurant featuring pan-Asian cuisine',
        cuisine: 'Pan-Asian',
        hours: '12:30 PM - 11:30 PM',
        dress: 'Smart Casual',
        image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoli-dining-photo//Trafalgar%20bar.jpg'
      }
    ],
    features: [
      'Heritage Architecture',
      'Luxury Spa',
      'Multiple Restaurants',
      'Outdoor Pool',
      'Business Center',
      'Wedding Venues',
      'Concierge Service',
      '24/7 Room Service'
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
                    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal//tivolipalwalhomephoto1.jpg',
              'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal//tivolipalwalHomephoto2.jpg',
              'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal//tivolipalwalHomephoto3.jpg',
              'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal//tivolipalwalHomephoto4.jpg',
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal//tivolipalwalHomephoto5.jpg'
    ],
    rating: 5,
    address: {
      street: 'Bhagola NH 2, Beside Satya Sai Heart Hospital',
      city: 'Palwal-Haryana',
      state: 'Haryana',
      country: 'India',
      postalCode: '110074',
      coordinates: {
        lat: 28.5921,
        lng: 77.1691
      }
    },
    contact: {
      phone: '9818553333',
      email: 'reservations@thetivolihotels.com'
    },
    amenities: [
      {
        id: 'wifi',
        name: 'High-Speed WiFi',
        description: 'Complimentary high-speed internet access throughout the property',
        icon: 'Wifi'
      },
      {
        id: 'pool',
        name: 'Swimming Pool',
        description: 'Temperature-controlled outdoor pool',
        icon: 'Pool'
      },
      {
        id: 'fitness',
        name: 'Fitness Center',
        description: '24/7 state-of-the-art fitness center with personal training',
        icon: 'Dumbbell'
      },
      {
        id: 'dining',
        name: 'Fine Dining',
        description: 'Multiple award-winning restaurants and bars',
        icon: 'Utensils'
      },
      {
        id: 'parking',
        name: 'Valet Parking',
        description: 'Complimentary valet parking for hotel guests',
        icon: 'Car'
      },
      {
        id: 'bar',
        name: 'Luxury Bar',
        description: 'Exclusive bar with premium spirits and wines',
        icon: 'Wine'
      },
      {
        id: 'spa',
        name: 'Luxury Spa',
        description: 'Full-service spa with signature treatments',
        icon: 'Spa'
      },
      {
        id: 'lounge',
        name: 'Executive Lounge',
        description: 'Private lounge with premium services and refreshments',
        icon: 'Coffee'
      }
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
        amenities: [
          'City View',
          'Rain Shower',
          'Mini Bar',
          'Smart TV',
          '24/7 Room Service'
        ],
        price: {
          currency: 'INR',
          amount: 25000
        }
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
        amenities: [
          'Palace View',
          'Private Balcony',
          'Butler Service',
          'Jacuzzi',
          'Lounge Access'
        ],
        price: {
          currency: 'INR',
          amount: 45000
        }
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
        image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal//palwal%20dining.jpg'
      }
    ],
    features: []
  },
  {
    id: 'tivoli-lake-palace',
    name: 'Tivoli Heritage Palace',
    brand: 'tivoli',
    location: 'rewari-haryana',
    slug: 'tivoli-lake-palace',
    description: 'Experience unparalleled luxury at Tivoli Heritage Palace, where timeless elegance meets modern sophistication. Nestled in the heart of Rewari-Haryana, this architectural masterpiece offers a perfect blend of traditional Indian hospitality and contemporary comfort.',
    images: [
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari//mainphoto6.jpg',
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari//mainpagephoto2.jpg',
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari//mainpagephoto4.jpg',
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari//mainphoto6.jpg',
    ],
    rating: 5,
    address: {
      street: 'Kanhawas,5PF3+53X Kanhawas',
      city: 'Rewari',
      state: 'Haryana',
      country: 'India',
      postalCode: '123401',
      coordinates: {
        lat: 28.1991,
        lng: 76.6198
      }
    },
    contact: {
      phone: '+9818553333',
      email: 'heritage@tivolihotels.com'
    },
    amenities: [
      {
        id: 'wifi',
        name: 'High-Speed WiFi',
        description: 'Complimentary high-speed internet access throughout the property',
        icon: 'Wifi'
      },
      {
        id: 'pool',
        name: 'Swimming Pool',
        description: 'Temperature-controlled outdoor pool',
        icon: 'Pool'
      },
      {
        id: 'fitness',
        name: 'Fitness Center',
        description: '24/7 state-of-the-art fitness center with personal training',
        icon: 'Dumbbell'
      },
      {
        id: 'dining',
        name: 'Fine Dining',
        description: 'Multiple award-winning restaurants and bars',
        icon: 'Utensils'
      },
      {
        id: 'parking',
        name: 'Valet Parking',
        description: 'Complimentary valet parking for hotel guests',
        icon: 'Car'
      },
      {
        id: 'bar',
        name: 'Luxury Bar',
        description: 'Exclusive bar with premium spirits and wines',
        icon: 'Wine'
      },
      {
        id: 'spa',
        name: 'Luxury Spa',
        description: 'Full-service spa with signature treatments',
        icon: 'Spa'
      },
      {
        id: 'lounge',
        name: 'Executive Lounge',
        description: 'Private lounge with premium services and refreshments',
        icon: 'Coffee'
      }
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
        amenities: [
          'Heritage View',
          'Rain Shower',
          'Mini Bar',
          'Smart TV',
          '24/7 Room Service'
        ],
        price: {
          currency: 'INR',
          amount: 25000
        }
      }
    ],
    dining: [],
    features: [
      'Heritage Architecture',
      'Luxury Spa',
      'Multiple Restaurants',
      'Outdoor Pool',
      'Business Center',
      'Wedding Venues',
      'Concierge Service',
      '24/7 Room Service'
    ],
    policies: {
      checkIn: '2:00 PM',
      checkOut: '12:00 PM',
      cancellation: '24 hours before arrival',
      pets: 'Not allowed'
    }
  }
];

const wedcationAmbalaHotel = {
  id: 'wedcation-ambala',
  name: 'Wedcation by Tivoli-Ambala',
  brand: 'wedcation',
  location: 'ambala',
  slug: 'wedcation-by-tivoli-ambala',
  description: 'Experience unparalleled luxury at Wedcation by Tivoli-Ambala, where timeless elegance meets modern sophistication. Nestled in the heart of Ambala, this architectural masterpiece offers a perfect blend of traditional Indian hospitality and contemporary comfort.',
  images: [
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationambala//ambalahome2.jpg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationambala//ambalahomeimage.jpg',
    
  'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationambala//ambalahomeimage.jpg',  
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationambala//ambalahome5.JPG'
  ],
  rating: 5,
  address: {
    street: 'NH-65, ambala - hissar rd, village durkhara, ambala, haryana 134003',
    city: 'Ambala',
    state: 'Haryana',
    country: 'India',
    postalCode: '134003',
    coordinates: {
      lat: 30.3744,
      lng: 76.7763
    }
  },
  contact: {
    phone: '+917075970555',
    email: 'info@wedcationbytivoli.com '
  },
  amenities: [
    {
      id: 'wifi',
      name: 'High-Speed WiFi',
      description: 'Complimentary high-speed internet access throughout the property',
      icon: 'Wifi'
    },
    {
      id: 'pool',
      name: 'Swimming Pool',
      description: 'Temperature-controlled outdoor pool',
      icon: 'Pool'
    },
    {
      id: 'fitness',
      name: 'Fitness Center',
      description: '24/7 state-of-the-art fitness center with personal training',
      icon: 'Dumbbell'
    },
    {
      id: 'dining',
      name: 'Fine Dining',
      description: 'Multiple award-winning restaurants and bars',
      icon: 'Utensils'
    },
    {
      id: 'parking',
      name: 'Valet Parking',
      description: 'Complimentary valet parking for hotel guests',
      icon: 'Car'
    },
    {
      id: 'bar',
      name: 'Luxury Bar',
      description: 'Exclusive bar with premium spirits and wines',
      icon: 'Wine'
    },
    {
      id: 'spa',
      name: 'Luxury Spa',
      description: 'Full-service spa with signature treatments',
      icon: 'Spa'
    },
    {
      id: 'lounge',
      name: 'Executive Lounge',
      description: 'Private lounge with premium services and refreshments',
      icon: 'Coffee'
    }
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
      amenities: [
        'City View',
        'Rain Shower',
        'Mini Bar',
        'Smart TV',
        '24/7 Room Service'
      ],
      price: {
        currency: 'INR',
        amount: 25000
      }
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
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationambala//ambaladinning.jpg'
    }
  ],
  features: [
    'Heritage Architecture',
    'Luxury Spa',
    'Multiple Restaurants',
    'Outdoor Pool',
    'Business Center',
    'Wedding Venues',
    'Concierge Service',
    '24/7 Room Service'
  ],
  policies: {
    checkIn: '2:00 PM',
    checkOut: '12:00 PM',
    cancellation: '24 hours before arrival',
    pets: 'Not allowed'
  }
};

hotels.push(wedcationAmbalaHotel);

const wedcationIsranaHotel = {
  id: 'wedcation-israna',
  name: 'Wedcation by Tivoli-Israna',
  brand: 'wedcation',
  location: 'israna',
  slug: 'wedcation-by-tivoli-israna',
  description: 'Experience unparalleled luxury at Wedcation by Tivoli-Israna, where timeless elegance meets modern sophistication. Nestled in the heart of Israna, this architectural masterpiece offers a perfect blend of traditional Indian hospitality and contemporary comfort.',
  images: [
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationisrana//israna1.jpg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationisrana//israna2.jpg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationisrana//israna3.jpg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationisrana//israna4.jpg'
  ],
  rating: 5,
  address: {
    street: 'NH-44, Israna, Panipat, Haryana 132107',
    city: 'Israna',
    state: 'Haryana',
    country: 'India',
    postalCode: '132107',
    coordinates: {
      lat: 29.2744,
      lng: 76.9763
    }
  },
  contact: {
    phone: '+917075970555',
    email: 'info@wedcationbytivoli.com'
  },
  amenities: [
    {
      id: 'wifi',
      name: 'High-Speed WiFi',
      description: 'Complimentary high-speed internet access throughout the property',
      icon: 'Wifi'
    },
    {
      id: 'pool',
      name: 'Swimming Pool',
      description: 'Temperature-controlled outdoor pool',
      icon: 'Pool'
    },
    {
      id: 'fitness',
      name: 'Fitness Center',
      description: '24/7 state-of-the-art fitness center with personal training',
      icon: 'Dumbbell'
    },
    {
      id: 'dining',
      name: 'Fine Dining',
      description: 'Multiple award-winning restaurants and bars',
      icon: 'Utensils'
    },
    {
      id: 'parking',
      name: 'Valet Parking',
      description: 'Complimentary valet parking for hotel guests',
      icon: 'Car'
    },
    {
      id: 'bar',
      name: 'Luxury Bar',
      description: 'Exclusive bar with premium spirits and wines',
      icon: 'Wine'
    },
    {
      id: 'spa',
      name: 'Luxury Spa',
      description: 'Full-service spa with signature treatments',
      icon: 'Spa'
    },
    {
      id: 'lounge',
      name: 'Executive Lounge',
      description: 'Private lounge with premium services and refreshments',
      icon: 'Coffee'
    }
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
      amenities: [
        'City View',
        'Rain Shower',
        'Mini Bar',
        'Smart TV',
        '24/7 Room Service'
      ],
      price: {
        currency: 'INR',
        amount: 25000
      }
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
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationisrana//israna-dining.jpg'
    }
  ],
  features: [
    'Heritage Architecture',
    'Luxury Spa',
    'Multiple Restaurants',
    'Outdoor Pool',
    'Business Center',
    'Wedding Venues',
    'Concierge Service',
    '24/7 Room Service'
  ],
  policies: {
    checkIn: '2:00 PM',
    checkOut: '12:00 PM',
    cancellation: '24 hours before arrival',
    pets: 'Not allowed'
  }
};

hotels.push(wedcationIsranaHotel);
const lotusCourtHotel = {
  id: 'tivoli-lotus-court',
  name: 'Tivoli Lotus Court',
  brand: 'tivoli',
  location: 'noida',
  slug: 'tivoli-lotus-court',
  description: 'Experience unparalleled luxury at Tivoli Lotus Court, where timeless elegance meets modern sophistication. Nestled in the heart of Noida, this architectural masterpiece offers a perfect blend of traditional Indian hospitality and contemporary comfort.',
  images: [
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/lotuscourt//lotushomeimage4.JPG',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/lotuscourt//lotushomeimage3.jpg',
    'https://pbkxpylwatscfjzbmwur.supabase.co/storage/v1/object/public/homepage_image//lawn.jpg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/lotuscourt//lotushomeimage2.JPG'
  ],
  rating: 5,
  address: {
    street: '1, Sector 74 Main Rd, near Internal Capetown Society Road, Supertech Capetown, Sector 74, Noida, Uttar Pradesh 201009',
    city: 'Noida',
    state: 'Uttar Pradesh',
    country: 'India',
    postalCode: '201301',
    coordinates: {
      lat: 28.5355,
      lng: 77.3910
    }
  },
  contact: {
    phone: '9212446306',
    email: 'lotuscourt@tivolihotels.com'
  },
  amenities: [
    {
      id: 'wifi',
      name: 'High-Speed WiFi',
      description: 'Complimentary high-speed internet access throughout the property',
      icon: 'Wifi'
    },
    {
      id: 'pool',
      name: 'Swimming Pool',
      description: 'Temperature-controlled outdoor pool',
      icon: 'Pool'
    },
    {
      id: 'fitness',
      name: 'Fitness Center',
      description: '24/7 state-of-the-art fitness center with personal training',
      icon: 'Dumbbell'
    },
    {
      id: 'dining',
      name: 'Fine Dining',
      description: 'Multiple award-winning restaurants and bars',
      icon: 'Utensils'
    },
    {
      id: 'parking',
      name: 'Valet Parking',
      description: 'Complimentary valet parking for hotel guests',
      icon: 'Car'
    },
    {
      id: 'bar',
      name: 'Luxury Bar',
      description: 'Exclusive bar with premium spirits and wines',
      icon: 'Wine'
    },
    {
      id: 'spa',
      name: 'Luxury Spa',
      description: 'Full-service spa with signature treatments',
      icon: 'Spa'
    },
    {
      id: 'lounge',
      name: 'Executive Lounge',
      description: 'Private lounge with premium services and refreshments',
      icon: 'Coffee'
    }
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
      amenities: [
        'City View',
        'Rain Shower',
        'Mini Bar',
        'Smart TV',
        '24/7 Room Service'
      ],
      price: {
        currency: 'INR',
        amount: 25000
      }
    }
  ],
  dining: [
    {
      id: 'dining-lotus',
      name: 'The Lotus Dining Hall',
      description: 'Exquisite dining experience with traditional Indian cuisine.',
      cuisine: 'Indian',
      hours: '7:00 PM - 11:00 PM',
      dress: 'Formal',
      image: ''
    }
  ],
  features: [
    'Heritage Architecture',
    'Luxury Spa',
    'Multiple Restaurants',
    'Outdoor Pool',
    'Business Center',
    'Wedding Venues',
    'Concierge Service',
    '24/7 Room Service'
  ],
  policies: {
    checkIn: '2:00 PM',
    checkOut: '12:00 PM',
    cancellation: '24 hours before arrival',
    pets: 'Not allowed'
  }
};

hotels.push(lotusCourtHotel);
const bijwasanHotel = {
  id: 'tivoli-bijwasan',
  name: 'Tivoli Bijwasan',
  brand: 'tivoli',
  location: 'delhi',
  slug: 'tivoli-bijwasan',
  description: 'Experience unparalleled luxury at Tivoli Bijwasan, where timeless elegance meets modern sophistication. Nestled in the heart of Delhi, this architectural masterpiece offers a perfect blend of traditional Indian hospitality and contemporary comfort.',
  images: [
    'https://pbkxpylwatscfjzbmwur.supabase.co/storage/v1/object/public/homepage_image//bijwasan-hp-thumbnail.jpg',
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80',
    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2098&q=80'
  ],
  rating: 5,
  address: {
    street: 'Bijwasan Road',
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    postalCode: '110061',
    coordinates: {
      lat: 28.5355,
      lng: 77.0910
    }
  },
  contact: {
    phone: '+91858885035',
    email: 'bijwasan@tivolihotels.com'
  },
  amenities: [
    {
      id: 'wifi',
      name: 'High-Speed WiFi',
      description: 'Complimentary high-speed internet access throughout the property',
      icon: 'Wifi'
    },
    {
      id: 'pool',
      name: 'Swimming Pool',
      description: 'Temperature-controlled outdoor pool',
      icon: 'Pool'
    },
    {
      id: 'fitness',
      name: 'Fitness Center',
      description: '24/7 state-of-the-art fitness center with personal training',
      icon: 'Dumbbell'
    },
    {
      id: 'dining',
      name: 'Fine Dining',
      description: 'Multiple award-winning restaurants and bars',
      icon: 'Utensils'
    },
    {
      id: 'parking',
      name: 'Valet Parking',
      description: 'Complimentary valet parking for hotel guests',
      icon: 'Car'
    },
    {
      id: 'bar',
      name: 'Luxury Bar',
      description: 'Exclusive bar with premium spirits and wines',
      icon: 'Wine'
    },
    {
      id: 'spa',
      name: 'Luxury Spa',
      description: 'Full-service spa with signature treatments',
      icon: 'Spa'
    },
    {
      id: 'lounge',
      name: 'Executive Lounge',
      description: 'Private lounge with premium services and refreshments',
      icon: 'Coffee'
    }
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
      amenities: [
        'City View',
        'Rain Shower',
        'Mini Bar',
        'Smart TV',
        '24/7 Room Service'
      ],
      price: {
        currency: 'INR',
        amount: 25000
      }
    }
  ],
  dining: [
    {
      id: 'dining-bijwasan',
      name: 'The Bijwasan Dining Hall',
      description: 'Exquisite dining experience with traditional Indian cuisine.',
      cuisine: 'Indian',
      hours: '7:00 PM - 11:00 PM',
      dress: 'Formal',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    }
  ],
  features: [
    'Heritage Architecture',
    'Luxury Spa',
    'Multiple Restaurants',
    'Outdoor Pool',
    'Business Center',
    'Wedding Venues',
    'Concierge Service',
    '24/7 Room Service'
  ],
  policies: {
    checkIn: '2:00 PM',
    checkOut: '12:00 PM',
    cancellation: '24 hours before arrival',
    pets: 'Not allowed'
  }
};

hotels.push(bijwasanHotel);
const royalCourtOkhlaHotel = {
  id: 'tivoli-royal-court-okhla',
  name: 'Tivoli Royal Court-Okhla',
  brand: 'tivoli',
  location: 'delhi',
  slug: 'royal-court-okhla',
  description: 'Experience the pinnacle of luxury and sophistication at Tivoli Royal Court, Okhla, where every wedding is a masterpiece crafted to perfection. Situated in the vibrant area of Okhla, this exquisite venue offers a stunning backdrop for your special day, combining elegance with modern amenities.',
  images: [
    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2098&q=80',
    'https://images.unsplash.com/photo-1464808322410-1a934aab61e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  ],
  rating: 4.5,
  address: {
    street: 'D-185, Main Road',
    city: 'Delhi',
    state: 'Delhi',
    country: 'India',
    postalCode: '110020',
    coordinates: {
      lat: 28.5456,
      lng: 77.2548
    }
  },
  contact: {
    phone: '+91858885035',
    email: 'okhla@tivolihotels.com'
  },
  amenities: [
    {
      id: 'wifi',
      name: 'High-Speed WiFi',
      description: 'Complimentary high-speed internet access throughout the property',
      icon: 'Wifi'
    },
    {
      id: 'parking',
      name: 'Valet Parking',
      description: 'Complimentary valet parking for hotel guests',
      icon: 'Car'
    },
    {
      id: 'dining',
      name: 'Fine Dining',
      description: 'Multiple award-winning restaurants and bars',
      icon: 'Utensils'
    },
    {
      id: 'lounge',
      name: 'Executive Lounge',
      description: 'Private lounge with premium services and refreshments',
      icon: 'Coffee'
    }
  ],
  rooms: [
    {
      id: 'deluxe',
      name: 'Deluxe Room',
      description: 'Elegant room with city views and luxury amenities',
      size: '350 sq. ft.',
      maxOccupancy: 2,
      bedType: 'King or Twin',
      images: [
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
      ],
      amenities: [
        'City View',
        'Mini Bar',
        'Smart TV',
        '24/7 Room Service'
      ],
      price: {
        currency: 'INR',
        amount: 15000
      }
    }
  ],
  dining: [
    {
      id: 'dining-royal-court',
      name: 'The Royal Court Dining Hall',
      description: 'Exquisite dining experience with traditional Indian cuisine.',
      cuisine: 'Indian',
      hours: '7:00 PM - 11:00 PM',
      dress: 'Formal',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    }
  ],
  features: [
    'Banquet Hall',
    'Terrace',
    'Valet Parking',
    'In-house Catering',
    'In-house Decor'
  ],
  policies: {
    checkIn: '2:00 PM',
    checkOut: '12:00 PM',
    cancellation: '24 hours before arrival',
    pets: 'Not allowed'
  }
} as Hotel;

hotels.push(royalCourtOkhlaHotel);
const omniaDwarkaHotel = {
  id: 'omnia-dwarka',
  name: 'Omnia by Tivoli-Dwarka Expressway',
  brand: 'omnia',
  location: 'delhi',
  slug: 'omnia-dwarka-expressway',
  description: 'Experience contemporary luxury at Omnia by Tivoli-Dwarka Expressway, where modern sophistication meets urban comfort. Located in the prestigious Dwarka Expressway area, this modern masterpiece offers an unparalleled blend of urban elegance and refined hospitality.',
  images: [
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/omniatiwolidwarka//dwarkahome1.jpg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/omniatiwolidwarka//dwarkahome2.jpg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/omniatiwolidwarka//dwarkahome3.jpg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/omniatiwolidwarka//dwarkahome4.jpg'
  ],
  rating: 5,
  address: {
    street: 'Dwarka Expressway',
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    postalCode: '110077',
    coordinates: {
      lat: 28.5921,
      lng: 77.1691
    }
  },
  contact: {
    phone: '+91858885035',
    email: 'dwarka@tivolihotels.com'
  },
  amenities: [
    {
      id: 'wifi',
      name: 'High-Speed WiFi',
      description: 'Complimentary high-speed internet access throughout the property',
      icon: 'Wifi'
    },
    {
      id: 'pool',
      name: 'Infinity Pool',
      description: 'Temperature-controlled rooftop infinity pool',
      icon: 'Pool'
    },
    {
      id: 'fitness',
      name: 'Fitness Center',
      description: '24/7 state-of-the-art fitness center with personal training',
      icon: 'Dumbbell'
    },
    {
      id: 'dining',
      name: 'Fine Dining',
      description: 'Multiple award-winning restaurants and bars',
      icon: 'Utensils'
    },
    {
      id: 'parking',
      name: 'Valet Parking',
      description: 'Complimentary valet parking for hotel guests',
      icon: 'Car'
    },
    {
      id: 'bar',
      name: 'Sky Bar',
      description: 'Rooftop bar with panoramic city views',
      icon: 'Wine'
    },
    {
      id: 'spa',
      name: 'Urban Spa',
      description: 'Modern spa with signature treatments',
      icon: 'Spa'
    },
    {
      id: 'lounge',
      name: 'Executive Lounge',
      description: 'Private lounge with premium services',
      icon: 'Coffee'
    }
  ],
  rooms: [
    {
      id: 'deluxe',
      name: 'Urban Suite',
      description: 'Contemporary 55 sq.m. suite with city views and modern amenities',
      size: '55 sq.m.',
      maxOccupancy: 2,
      bedType: 'King',
      images: [
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
      ],
      amenities: [
        'City View',
        'Rain Shower',
        'Smart Home Controls',
        'Smart TV',
        '24/7 Room Service'
      ],
      price: {
        currency: 'INR',
        amount: 35000
      }
    }
  ],
  dining: [
    {
      id: 'dining-omnia',
      name: 'Altitude',
      description: 'Modern rooftop restaurant with panoramic city views.',
      cuisine: 'Contemporary Global',
      hours: '12:00 PM - 12:00 AM',
      dress: 'Smart Casual',
      image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/omniatiwolidwarka//Dwarkadinning.jpg'
    }
  ],
  features: [
    'Contemporary Architecture',
    'Urban Spa',
    'Rooftop Restaurant',
    'Infinity Pool',
    'Business Center',
    'Event Spaces',
    'Concierge Service',
    '24/7 Room Service'
  ],
  policies: {
    checkIn: '2:00 PM',
    checkOut: '12:00 PM',
    cancellation: '24 hours before arrival',
    pets: 'Not allowed'
  }
};

hotels.push(omniaDwarkaHotel);
const omniaGreaterNoidaHotel = {
  id: 'omnia-greater-noida',
  name: 'Omnia by Tivoli-Greater Noida',
  brand: 'omnia',
  location: 'greater-noida',
  slug: 'omnia-greater-noida',
  description: 'Experience contemporary luxury at Omnia by Tivoli-Greater Noida, where modern sophistication meets urban comfort. Located in the prestigious Greater Noida area, this modern masterpiece offers an unparalleled blend of urban elegance and refined hospitality.',
  images: [
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80',
    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2098&q=80',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  ],
  rating: 5,
  address: {
    street: 'Knowledge Park III',
    city: 'Greater Noida',
    state: 'Uttar Pradesh',
    country: 'India',
    postalCode: '201310',
    coordinates: {
      lat: 28.4744,
      lng: 77.5040
    }
  },
  contact: {
    phone: '+91858885035',
    email: 'greaternoida@tivolihotels.com'
  },
  amenities: [
    {
      id: 'wifi',
      name: 'High-Speed WiFi',
      description: 'Complimentary high-speed internet access throughout the property',
      icon: 'Wifi'
    },
    {
      id: 'pool',
      name: 'Infinity Pool',
      description: 'Temperature-controlled rooftop infinity pool',
      icon: 'Pool'
    },
    {
      id: 'fitness',
      name: 'Fitness Center',
      description: '24/7 state-of-the-art fitness center with personal training',
      icon: 'Dumbbell'
    },
    {
      id: 'dining',
      name: 'Fine Dining',
      description: 'Multiple award-winning restaurants and bars',
      icon: 'Utensils'
    },
    {
      id: 'parking',
      name: 'Valet Parking',
      description: 'Complimentary valet parking for hotel guests',
      icon: 'Car'
    },
    {
      id: 'bar',
      name: 'Sky Bar',
      description: 'Rooftop bar with panoramic city views',
      icon: 'Wine'
    },
    {
      id: 'spa',
      name: 'Urban Spa',
      description: 'Modern spa with signature treatments',
      icon: 'Spa'
    },
    {
      id: 'lounge',
      name: 'Executive Lounge',
      description: 'Private lounge with premium services',
      icon: 'Coffee'
    }
  ],
  rooms: [
    {
      id: 'deluxe',
      name: 'Urban Suite',
      description: 'Contemporary 55 sq.m. suite with city views and modern amenities',
      size: '55 sq.m.',
      maxOccupancy: 2,
      bedType: 'King',
      images: [
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
      ],
      amenities: [
        'City View',
        'Rain Shower',
        'Smart Home Controls',
        'Smart TV',
        '24/7 Room Service'
      ],
      price: {
        currency: 'INR',
        amount: 35000
      }
    }
  ],
  dining: [
    {
      id: 'dining-omnia-gn',
      name: 'Skyline',
      description: 'Modern rooftop restaurant with panoramic city views.',
      cuisine: 'Contemporary Global',
      hours: '12:00 PM - 12:00 AM',
      dress: 'Smart Casual',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    }
  ],
  features: [
    'Contemporary Architecture',
    'Urban Spa',
    'Rooftop Restaurant',
    'Infinity Pool',
    'Business Center',
    'Event Spaces',
    'Concierge Service',
    '24/7 Room Service'
  ],
  policies: {
    checkIn: '2:00 PM',
    checkOut: '12:00 PM',
    cancellation: '24 hours before arrival',
    pets: 'Not allowed'
  }
};

hotels.push(omniaGreaterNoidaHotel);

const upperHseSultanpurHotel = {
  id: 'upper-hse-sultanpur',
  name: 'The Upper HSE by Tivoli-Sultanpur',
  brand: 'upper-hse',
  location: 'delhi',
  slug: 'upper-hse-sultanpur',
  description: 'Experience contemporary luxury at The Upper HSE by Tivoli-Sultanpur, where modern sophistication meets urban comfort. Located in the prestigious Sultanpur area, this modern masterpiece offers an unparalleled blend of urban elegance and refined hospitality.',
  images: [
    'https://pbkxpylwatscfjzbmwur.supabase.co/storage/v1/object/public/homepage_image//sultanpur-upperhse-hp-thumbnail.jpg',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80',
    'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  ],
  rating: 5,
  address: {
    street: 'Sultanpur, Delhi',
    city: 'Delhi',
    state: 'Delhi',
    country: 'India',
    postalCode: '110030',
    coordinates: {
      lat: 28.5005,
      lng: 77.1526
    }
  },
  contact: {
    phone: '+91858885035',
    email: 'sultanpur@upperhse.com'
  },
  amenities: [
    {
      id: 'wifi',
      name: 'High-Speed WiFi',
      description: 'Complimentary high-speed internet access throughout the property',
      icon: 'Wifi'
    },
    {
      id: 'pool',
      name: 'Rooftop Pool',
      description: 'Temperature-controlled rooftop pool',
      icon: 'Pool'
    },
    {
      id: 'fitness',
      name: 'Fitness Center',
      description: '24/7 state-of-the-art fitness center with personal training',
      icon: 'Dumbbell'
    },
    {
      id: 'dining',
      name: 'Fine Dining',
      description: 'Multiple award-winning restaurants and bars',
      icon: 'Utensils'
    },
    {
      id: 'parking',
      name: 'Valet Parking',
      description: 'Complimentary valet parking for hotel guests',
      icon: 'Car'
    },
    {
      id: 'bar',
      name: 'Sky Bar',
      description: 'Rooftop bar with panoramic city views',
      icon: 'Wine'
    },
    {
      id: 'spa',
      name: 'Urban Spa',
      description: 'Modern spa with signature treatments',
      icon: 'Spa'
    },
    {
      id: 'lounge',
      name: 'Executive Lounge',
      description: 'Private lounge with premium services',
      icon: 'Coffee'
    }
  ],
  rooms: [
    {
      id: 'deluxe',
      name: 'Urban Suite',
      description: 'Contemporary 55 sq.m. suite with city views and modern amenities',
      size: '55 sq.m.',
      maxOccupancy: 2,
      bedType: 'King',
      images: [
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
      ],
      amenities: [
        'City View',
        'Rain Shower',
        'Smart Home Controls',
        'Smart TV',
        '24/7 Room Service'
      ],
      price: {
        currency: 'INR',
        amount: 30000
      }
    }
  ],
  dining: [
    {
      id: 'dining-upper-hse',
      name: 'Elevation',
      description: 'Modern rooftop restaurant with panoramic city views.',
      cuisine: 'Contemporary Global',
      hours: '12:00 PM - 12:00 AM',
      dress: 'Smart Casual',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    }
  ],
  features: [
    'Contemporary Architecture',
    'Urban Spa',
    'Rooftop Restaurant',
    'Infinity Pool',
    'Business Center',
    'Event Spaces',
    'Concierge Service',
    '24/7 Room Service'
  ],
  policies: {
    checkIn: '2:00 PM',
    checkOut: '12:00 PM',
    cancellation: '24 hours before arrival',
    pets: 'Not allowed'
  }
};

hotels.push(upperHseSultanpurHotel);

const omniaNoidaHotel = {
  id: 'omnia-noida',
  name: 'Omnia by Tivoli-Noida',
  brand: 'omnia',
  location: 'noida',
  slug: 'omnia-noida',
  description: 'Experience contemporary luxury at Omnia by Tivoli-Noida, where modern sophistication meets urban comfort. Located in the vibrant city of Noida, this modern masterpiece offers an unparalleled blend of urban elegance and refined hospitality.',
  images: [
    'https://pbkxpylwatscfjzbmwur.supabase.co/storage/v1/object/public/homepage_image//omnia-noida-hp-thumbnail.jpg',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80',
    'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  ],
  rating: 5,
  address: {
    street: 'Sector 62, Noida',
    city: 'Noida',
    state: 'Uttar Pradesh',
    country: 'India',
    postalCode: '201301',
    coordinates: {
      lat: 28.6139,
      lng: 77.3578
    }
  },
  contact: {
    phone: '+91858885035',
    email: 'noida@omniahotels.com'
  },
  amenities: [
    {
      id: 'wifi',
      name: 'High-Speed WiFi',
      description: 'Complimentary high-speed internet access throughout the property',
      icon: 'Wifi'
    },
    {
      id: 'pool',
      name: 'Infinity Pool',
      description: 'Temperature-controlled rooftop infinity pool',
      icon: 'Pool'
    },
    {
      id: 'fitness',
      name: 'Fitness Center',
      description: '24/7 state-of-the-art fitness center with personal training',
      icon: 'Dumbbell'
    },
    {
      id: 'dining',
      name: 'Fine Dining',
      description: 'Multiple award-winning restaurants and bars',
      icon: 'Utensils'
    },
    {
      id: 'parking',
      name: 'Valet Parking',
      description: 'Complimentary valet parking for hotel guests',
      icon: 'Car'
    },
    {
      id: 'bar',
      name: 'Sky Bar',
      description: 'Rooftop bar with panoramic city views',
      icon: 'Wine'
    },
    {
      id: 'spa',
      name: 'Urban Spa',
      description: 'Modern spa with signature treatments',
      icon: 'Spa'
    },
    {
      id: 'lounge',
      name: 'Executive Lounge',
      description: 'Private lounge with premium services',
      icon: 'Coffee'
    }
  ],
  rooms: [
    {
      id: 'deluxe',
      name: 'Urban Suite',
      description: 'Contemporary 55 sq.m. suite with city views and modern amenities',
      size: '55 sq.m.',
      maxOccupancy: 2,
      bedType: 'King',
      images: [
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
      ],
      amenities: [
        'City View',
        'Rain Shower',
        'Smart Home Controls',
        'Smart TV',
        '24/7 Room Service'
      ],
      price: {
        currency: 'INR',
        amount: 32000
      }
    }
  ],
  dining: [
    {
      id: 'dining-omnia-noida',
      name: 'Horizon',
      description: 'Modern rooftop restaurant with panoramic city views.',
      cuisine: 'Contemporary Global',
      hours: '12:00 PM - 12:00 AM',
      dress: 'Smart Casual',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    }
  ],
  features: [
    'Contemporary Architecture',
    'Urban Spa',
    'Rooftop Restaurant',
    'Infinity Pool',
    'Business Center',
    'Event Spaces',
    'Concierge Service',
    '24/7 Room Service'
  ],
  policies: {
    checkIn: '2:00 PM',
    checkOut: '12:00 PM',
    cancellation: '24 hours before arrival',
    pets: 'Not allowed'
  }
};

hotels.push(omniaNoidaHotel);