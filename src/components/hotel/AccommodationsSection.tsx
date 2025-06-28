/**
 * Accommodations Section Component
 * Displays hotel room types with details and amenities
 */

import React, { memo } from 'react';
import { Home, Tv, Bath, Coffee, User, Loader2, AlertCircle } from 'lucide-react';
import { SmartImage } from '../ui/SmartImage';
import type { HotelRoom } from '../../hooks/useHotelRooms';

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

// Default image for rooms
const getDefaultRoomImage = (roomName: string): string => {
  // Specific room images
  const roomImageMap: Record<string, string> = {
    'deluxe room': 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//Deluxe%20Room.png',
    'superior room': 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//Superior%20Room.png',
    'club room': 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//Club%20Room.png',
    'executive suite': 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//Executive%20Suite.png',
    'presidential suite': 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//Presidential%20Suite.png'
  };

  const roomKey = roomName.toLowerCase();
  if (roomImageMap[roomKey]) {
    return roomImageMap[roomKey];
  }
  
  // Fallback for any other rooms
  const slug = roomName.toLowerCase().replace(/\s+/g, '-');
  return `https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//${slug}.jpg`;
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
  const displayRooms = rooms?.length ? rooms : accommodations;

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
            image: isLegacyRoom 
              ? (room as LegacyRoom).images?.[0] || getDefaultRoomImage(room.name)
              : getDefaultRoomImage(room.name),
            priceRange: isLegacyRoom 
              ? (room as LegacyRoom).priceRange 
              : formatPrice(room.price_inr)
          };

          return (
            <div key={roomData.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              {/* Horizontal Layout */}
              <div className="flex flex-col md:flex-row">
                {/* Image Section */}
                <div className="relative md:w-2/5">
                  <SmartImage
                    src={roomData.image}
                    alt={roomData.name}
                    className="w-full h-64 md:h-full object-cover"
                    lazy={true}
                    placeholder="blur"
                    aspectRatio={4/3}
                    optimize={{
                      width: 400,
                      height: 300,
                      quality: 85,
                      format: 'webp'
                    }}
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md">
                    <div className="flex items-center text-xs text-neutral-700">
                      <Home className="w-3 h-3 mr-1" />
                      {roomData.size}
                    </div>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="flex-1 p-6">
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