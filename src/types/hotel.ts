export interface HotelAmenity {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface HotelRoom {
  id: string;
  name: string;
  description: string;
  size: string;
  maxOccupancy: number;
  bedType: string;
  images: string[];
  amenities: string[];
  price: {
    currency: string;
    amount: number;
  };
}

export interface HotelDining {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  hours: string;
  dress: string;
  image: string;
}

export interface Hotel {
  id: string;
  name: string;
  brand: string;
  location: string;
  slug: string;
  description: string;
  images: string[];
  rating: number;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  contact: {
    phone: string;
    email: string;
  };
  amenities: HotelAmenity[];
  rooms: HotelRoom[];
  dining: HotelDining[];
  features: string[];
  policies: {
    checkIn: string;
    checkOut: string;
    cancellation: string;
    pets: string;
  };
}