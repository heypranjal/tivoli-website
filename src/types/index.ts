export interface Venue {
  id: string;
  name: string;
  brand: 'tivoli' | 'omnia' | 'wedcation';
  location: string;
  description: string;
  images: string[];
  capacity: {
    min: number;
    max: number;
  };
  amenities: string[];
  spaces: {
    name: string;
    description: string;
    capacity: number;
  }[];
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  guestCount: number;
  eventType: string;
  venue: string;
  specialRequirements?: string;
  status: 'new' | 'contacted' | 'qualified' | 'booked';
  createdAt: string;
}

export interface Brand {
  id: 'tivoli' | 'omnia' | 'wedcation';
  name: string;
  description: string;
  logo: string;
  coverImage: string;
}