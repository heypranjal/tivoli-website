/**
 * Accommodations Section Component
 * Displays hotel room types with details and amenities
 */

import React, { memo } from 'react';
import { Home, Tv, Bath, Coffee, User, Loader2, AlertCircle } from 'lucide-react';
import { SmartImage } from '../ui/SmartImage';
import { RoomImageCarousel } from './RoomImageCarousel';
import type { HotelRoom, RoomImage } from '../../hooks/useHotelRooms';

// Legacy interface for backward compatibility
interface LegacyRoom {
  id: string;
  name: string;
  description: string;
  size: string;
  capacity: number;
  amenities: string[];
  images: string[];
  priceRange: string;
}

interface AccommodationsSectionProps {
  rooms?: HotelRoom[];
  accommodations?: LegacyRoom[]; // For backward compatibility
  className?: string;
  loading?: boolean;
  error?: string | null;
}

// Format price for display - disabled
const formatPrice = (price: number | null): string => {
  return 'Contact for rates';
};

// Get amenity icon
const getAmenityIcon = (amenity: string) => {
  const amenityLower = amenity.toLowerCase();
  if (amenityLower.includes('tv') || amenityLower.includes('smart')) {
    return <Tv className="w-4 h-4" />;
  }
  if (amenityLower.includes('coffee')) {
    return <Coffee className="w-4 h-4" />;
  }
  if (amenityLower.includes('bath') || amenityLower.includes('bathroom')) {
    return <Bath className="w-4 h-4" />;
  }
  return <Home className="w-4 h-4" />;
};

// Default image(s) for rooms - Hotel-specific mapping
const getDefaultRoomImages = (roomName: string, hotelId?: string): string[] => {
  // Detect hotel context from current URL or passed hotelId
  const currentUrl = typeof window !== 'undefined' ? window.location.pathname : '';
  const isRoyalPalace = currentUrl.includes('tivoli-royal-suite') || hotelId === 'fd50d2a7-2a4b-48da-b8ed-e12403bc6cbe';
  const isWedcationAmbala = currentUrl.includes('wedcation-by-tivoli-ambala') || hotelId === 'a86c7480-542b-4f5b-bd36-0c6aebef8f61';
  
  // Wedcation Ambala specific room images
  if (isWedcationAmbala) {
    const wedcationAmbalaRoomImages: Record<string, string | string[]> = {
      'executive room': [
        'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationambala/rooms%20images/Executive%20Room.jpeg',
        'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationambala/rooms%20images/Deluxe%20Washroom.jpeg'
      ],
      'deluxe room': [
        'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationambala/rooms%20images/Deluxe%20Room.jpeg',
        'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationambala/rooms%20images/Deluxe%20Washroom.jpeg'
      ],
      'super deluxe room': [
        'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationambala/rooms%20images/Super%20Deluxe.jpeg',
        'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationambala/rooms%20images/Super%20Deluxe%20Washroom.jpeg'
      ],
      'family suite': [
        'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationambala/rooms%20images/Family%20Suite%20Room.png',
        'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationambala/rooms%20images/Family%20%20Suite%20Room%20Washroom.jpeg'
      ]
    };
    
    const roomKey = roomName.toLowerCase();
    if (wedcationAmbalaRoomImages[roomKey]) {
      const images = wedcationAmbalaRoomImages[roomKey];
      return Array.isArray(images) ? images : [images];
    }
  }
  
  // Royal Palace specific room images
  if (isRoyalPalace) {
    const royalPalaceRoomImages: Record<string, string | string[]> = {
      'deluxe room': [
        'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal//Deluxe%20Bedroom%20250%20sq%20feet.jpg',
        'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal//Deluxe%20Washroom.jpeg'
      ],
      'standard room': [
        'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal//Standard%20Room%20240%20sq%20Feet.jpeg',
        'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal//Standard%20Washroom.jpeg'
      ],
      'palace suite': [
        'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal//tivolipalwalHomephoto3.jpg',
        'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal//tivolipalwalHomephoto4.jpg'
      ]
    };
    
    const roomKey = roomName.toLowerCase();
    if (royalPalaceRoomImages[roomKey]) {
      const images = royalPalaceRoomImages[roomKey];
      return Array.isArray(images) ? images : [images];
    }
  }
  
  // Tivoli New Delhi specific room images (default)
  const newDelhiRoomImages: Record<string, string | string[]> = {
    'deluxe room': 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//Deluxe%20Room.png',
    'superior room': [
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//Superior-1.png',
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//Superior-4.png',
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//Superior-6.png',
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//Superior-5.png',
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//Superior-2.png',
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//Superior-3.png'
    ],
    'club room': [
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//Club%20Room-1.png',
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//Club%20Room-3.png',
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//Club%20Room-4.png',
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//Club%20Room-2.png',
      'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//Club%20Room-5.png'
    ],
    'executive suite': 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//Executive%20Suite.png',
    'presidential suite': 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//Presidential%20Suite.png'
  };

  const roomKey = roomName.toLowerCase();
  if (newDelhiRoomImages[roomKey]) {
    const images = newDelhiRoomImages[roomKey];
    return Array.isArray(images) ? images : [images];
  }
  
  // Fallback for any other rooms
  const baseUrl = isRoyalPalace 
    ? 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal/'
    : isWedcationAmbala
    ? 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationambala/'
    : 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1/';
  const slug = roomName.toLowerCase().replace(/\s+/g, '-');
  return [`${baseUrl}/${slug}.jpg`];
};

export const AccommodationsSection: React.FC<AccommodationsSectionProps> = memo(({
  rooms,
  accommodations,
  className = '',
  loading = false,
  error = null,
}) => {
  // Handle loading state
  if (loading) {
    return (
      <section className={`space-y-8 ${className}`}>
        <div className="text-center">
          <h2 className="font-serif text-3xl text-neutral-800 mb-4">Accommodations</h2>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-[#CD9F59]" />
            <span className="ml-2 text-neutral-600">Loading room information...</span>
          </div>
        </div>
      </section>
    );
  }

  // Handle error state
  if (error) {
    return (
      <section className={`space-y-8 ${className}`}>
        <div className="text-center">
          <h2 className="font-serif text-3xl text-neutral-800 mb-4">Accommodations</h2>
          <div className="flex items-center justify-center py-8 text-red-600">
            <AlertCircle className="w-6 h-6" />
            <span className="ml-2">Failed to load room information: {error}</span>
          </div>
        </div>
      </section>
    );
  }

  // Determine which data to use - prioritize database rooms over legacy accommodations
  const allRooms = rooms?.length ? rooms : accommodations;
  
  // Check if we're on Wedcation Ambala page
  const currentUrl = typeof window !== 'undefined' ? window.location.pathname : '';
  const isWedcationAmbala = currentUrl.includes('wedcation-by-tivoli-ambala');
  
  // Filter out Family Room/Family Suite
  let displayRooms = allRooms?.filter(room => {
    const roomNameLower = room.name.toLowerCase();
    return !roomNameLower.includes('family room') && !roomNameLower.includes('family suite');
  });

  // Add additional room types for Wedcation Ambala
  if (isWedcationAmbala) {
    const additionalRooms: LegacyRoom[] = [
      {
        id: 'super-deluxe-room',
        name: 'Super Deluxe Room',
        description: 'Elegantly appointed rooms featuring contemporary design and premium amenities for an elevated stay experience.',
        size: '312 Sq. Foot',
        capacity: 2,
        amenities: ['Air Conditioning', 'Wi-Fi', 'Room Service', '24-hour Housekeeping'],
        images: [
          'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationambala/rooms%20images/Super%20Deluxe.jpeg',
          'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationambala/rooms%20images/Super%20Deluxe%20Washroom.jpeg'
        ],
        priceRange: 'Contact for rates'
      },
      {
        id: 'club-room',
        name: 'Club Room',
        description: 'Spacious and sophisticated accommodations offering enhanced comfort and exclusive club-level amenities.',
        size: '456 Sq. Foot',
        capacity: 3,
        amenities: ['Air Conditioning', 'Wi-Fi', 'In-room Dining', 'Television'],
        images: [
          'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationambala/rooms%20images/Executive%20Room.jpeg',
          'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationambala/rooms%20images/Deluxe%20Washroom.jpeg'
        ],
        priceRange: 'Contact for rates'
      },
      {
        id: 'family-suite',
        name: 'Family Suite',
        description: 'Generous family accommodations featuring separate living areas and enhanced space for memorable family stays.',
        size: '680 Sq. Foot',
        capacity: 4,
        amenities: ['Air Conditioning', 'Wi-Fi', 'Room Service', '24-hour Housekeeping'],
        images: [
          'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationambala/rooms%20images/Family%20Suite%20Room.png',
          'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationambala/rooms%20images/Family%20%20Suite%20Room%20Washroom.jpeg'
        ],
        priceRange: 'Contact for rates'
      }
    ];

    // Combine existing rooms with additional rooms
    displayRooms = [...(displayRooms || []), ...additionalRooms];
  }

  if (!displayRooms || displayRooms.length === 0) {
    return (
      <section className={`space-y-8 ${className}`}>
        <div className="text-center">
          <h2 className="font-serif text-3xl text-neutral-800 mb-4">Accommodations</h2>
          <p className="text-neutral-600">No room information available at this time.</p>
        </div>
      </section>
    );
  }

  return (
    <section className={`space-y-8 ${className}`}>
      <div className="text-center">
        <h2 className="font-serif text-3xl text-neutral-800 mb-4">Accommodations</h2>
        <p className="text-neutral-600 leading-relaxed max-w-2xl mx-auto">
          Experience luxury and comfort in our thoughtfully designed rooms and suites, each crafted to provide an exceptional stay
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {displayRooms.map((room) => {
          // Handle both database and legacy room formats
          const isLegacyRoom = 'capacity' in room;
          
          // Get top 4 most important amenities
          const allAmenities = room.amenities || [];
          const keyAmenities = allAmenities.filter(amenity => 
            amenity.toLowerCase().includes('air conditioning') ||
            amenity.toLowerCase().includes('wi-fi') ||
            amenity.toLowerCase().includes('room service') ||
            amenity.toLowerCase().includes('television') ||
            amenity.toLowerCase().includes('in-room dining') ||
            amenity.toLowerCase().includes('24-hour housekeeping')
          ).slice(0, 4);
          
          // Get all room images from database
          const getRoomImages = (): RoomImage[] => {
            if (isLegacyRoom) {
              const legacyRoom = room as LegacyRoom;
              return legacyRoom.images?.map((imageUrl, index) => ({
                id: `legacy-${room.id}-${index}`,
                url: imageUrl,
                alt: `${room.name} - Image ${index + 1}`,
                isPrimary: index === 0,
                sortOrder: index
              })) || [];
            } else {
              // Use room images from database, fallback to default if none
              const dbRoom = room as HotelRoom;
              if (dbRoom.images && dbRoom.images.length > 0) {
                return dbRoom.images;
              } else {
                // Fallback to default images for rooms without multiple images
                const defaultImageUrls = getDefaultRoomImages(room.name, dbRoom.hotel_id);
                return defaultImageUrls.map((url, index) => ({
                  id: `default-${room.id}-${index}`,
                  url: url,
                  alt: `${room.name} - Image ${index + 1}`,
                  isPrimary: index === 0,
                  sortOrder: index
                }));
              }
            }
          };

          const roomData = {
            id: room.id,
            name: room.name,
            description: isLegacyRoom 
              ? (room as LegacyRoom).description 
              : room.description || '',
            size: isLegacyRoom 
              ? (room as LegacyRoom).size 
              : room.size_display || `${room.size_sqm} sq. mt`,
            capacity: isLegacyRoom 
              ? (room as LegacyRoom).capacity 
              : room.max_occupancy || 2,
            amenities: keyAmenities,
            images: getRoomImages(),
            priceRange: isLegacyRoom 
              ? (room as LegacyRoom).priceRange 
              : formatPrice(room.price_inr)
          };

          return (
            <div key={roomData.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
              {/* Horizontal Layout with Smooth Expansion Effect */}
              <div className="flex flex-col md:flex-row room-expansion-container md:h-80">
                {/* Image Section - Expandable */}
                <div className="room-image-section h-80 md:h-80 relative">
                  <RoomImageCarousel
                    images={roomData.images}
                    roomName={roomData.name}
                    roomSize={roomData.size}
                    className="h-full"
                    autoAdvance={true}
                    autoAdvanceInterval={5000}
                  />
                </div>
                
                {/* Content Section - Adaptive */}
                <div className="room-content-section p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-serif text-xl text-neutral-800">{roomData.name}</h3>
                  </div>
                  
                  <p className="text-neutral-600 mb-4 leading-relaxed">
                    {roomData.description}
                  </p>
                  
                  <div className="mb-4">
                    <div className="flex items-center text-sm text-neutral-600">
                      <User className="w-4 h-4 mr-2" />
                      Up to {roomData.capacity} guests
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-neutral-700 uppercase tracking-wide">Key Amenities</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {roomData.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center text-sm text-neutral-600">
                          {getAmenityIcon(amenity)}
                          <span className="ml-2">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
});

AccommodationsSection.displayName = 'AccommodationsSection';

export default AccommodationsSection;