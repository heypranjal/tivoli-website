/**
 * Room Card Component
 * Phase 4: Component Refactoring
 * Created: 2025-06-21
 * 
 * Displays individual room information with image, details, and amenities
 * Follows Tivoli design system with hover effects and responsive design
 */

import React from 'react';
import { 
  Users, 
  Maximize2, 
  Bed, 
  Wifi, 
  Coffee, 
  Tv, 
  Car, 
  Bath, 
  Wind,
  Shield,
  Utensils,
  Phone
} from 'lucide-react';
import { SmartImage } from '@/components/ui/SmartImage';
import { Database } from '@/types/supabase';

// Room type from database
type Room = Database['public']['Tables']['rooms']['Row'];

// Extended room interface with additional data
export interface RoomCardData extends Omit<Room, 'hotel_id'> {
  images?: string[];
  amenities?: Array<{
    id: string;
    name: string;
    icon_name?: string | null;
    category?: string | null;
  }>;
  features?: string[];
}

export interface RoomCardProps {
  room: RoomCardData;
  className?: string;
  showPrice?: boolean;
  onSelect?: (roomId: string) => void;
  isSelected?: boolean;
}

// Icon mapping for amenities
const getAmenityIcon = (iconName?: string | null) => {
  const iconMap = {
    'wifi': Wifi,
    'coffee': Coffee,
    'tv': Tv,
    'parking': Car,
    'bath': Bath,
    'ac': Wind,
    'safe': Shield,
    'minibar': Utensils,
    'phone': Phone,
    'users': Users,
    'bed': Bed,
  };
  
  return iconMap[iconName as keyof typeof iconMap] || Shield;
};

export const RoomCard: React.FC<RoomCardProps> = ({
  room,
  className = '',
  showPrice = true,
  onSelect,
  isSelected = false,
}) => {
  const handleCardClick = () => {
    if (onSelect) {
      onSelect(room.id);
    }
  };

  // Get primary image or fallback
  const primaryImage = room.images?.[0] || '/images/room-placeholder.jpg';
  
  // Format room size display
  const getRoomSizeDisplay = () => {
    if (room.size_display) {
      return room.size_display;
    }
    if (room.size_sqm) {
      return `${room.size_sqm} sq m`;
    }
    return null;
  };

  // Format price display - disabled
  const getPriceDisplay = () => {
    return null;
  };

  const sizeDisplay = getRoomSizeDisplay();
  const priceDisplay = getPriceDisplay();

  return (
    <div 
      className={`
        group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl 
        transition-all duration-300 hover:-translate-y-2 cursor-pointer
        ${isSelected ? 'ring-2 ring-[#CD9F59] ring-offset-2' : ''}
        ${className}
      `}
      onClick={handleCardClick}
    >
      {/* Room Image */}
      <div className="aspect-[4/3] overflow-hidden relative">
        <SmartImage
          src={primaryImage}
          alt={room.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          optimize={{
            width: 400,
            height: 300,
            quality: 85,
            format: 'webp'
          }}
        />
        
        {/* Size Overlay */}
        {sizeDisplay && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-xs font-medium flex items-center text-neutral-700">
              <Maximize2 className="w-3 h-3 mr-1" />
              {sizeDisplay}
            </span>
          </div>
        )}

      </div>

      {/* Room Details */}
      <div className="p-6">
        {/* Room Name */}
        <h3 className="text-xl font-serif text-neutral-800 mb-2 mt-2 group-hover:text-[#CD9F59] transition-colors">
          {room.name}
        </h3>

        {/* Room Description */}
        {room.description && (
          <p className="text-sm text-neutral-600 mb-4 line-clamp-2 leading-relaxed">
            {room.description}
          </p>
        )}

        {/* Room Details */}
        <div className="flex items-center gap-4 mb-4 text-sm text-neutral-600">
          {/* Max Occupancy */}
          {room.max_occupancy && (
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              <span>Up to {room.max_occupancy} guests</span>
            </div>
          )}

          {/* Bed Type */}
          {room.bed_type && (
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-1" />
              <span>{room.bed_type}</span>
            </div>
          )}
        </div>

        {/* Amenities */}
        {room.amenities && room.amenities.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-neutral-700 mb-2">Room Amenities</h4>
            <div className="flex flex-wrap gap-2">
              {room.amenities.slice(0, 6).map((amenity) => {
                const IconComponent = getAmenityIcon(amenity.icon_name);
                return (
                  <div
                    key={amenity.id}
                    className="flex items-center bg-neutral-50 px-2 py-1 rounded-md text-xs text-neutral-600"
                    title={amenity.name}
                  >
                    <IconComponent className="w-3 h-3 mr-1" />
                    <span className="truncate max-w-20">{amenity.name}</span>
                  </div>
                );
              })}
              {room.amenities.length > 6 && (
                <div className="flex items-center bg-neutral-100 px-2 py-1 rounded-md text-xs text-neutral-500">
                  +{room.amenities.length - 6} more
                </div>
              )}
            </div>
          </div>
        )}

        {/* Features */}
        {room.features && room.features.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-neutral-700 mb-2">Features</h4>
            <ul className="space-y-1 text-sm text-neutral-600">
              {room.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 text-[#CD9F59] mt-1">•</span>
                  <span>{feature}</span>
                </li>
              ))}
              {room.features.length > 3 && (
                <li className="text-xs text-neutral-500 italic">
                  +{room.features.length - 3} more features
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Action Button */}
        <button className="w-full py-3 px-4 bg-gradient-to-r from-[#CD9F59] to-[#CD9F59]/80 text-white rounded-lg hover:from-[#CD9F59]/90 hover:to-[#CD9F59]/70 transition-all duration-200 font-medium group-hover:shadow-lg">
          {isSelected ? 'Selected' : 'Select Room'}
        </button>
      </div>
    </div>
  );
};

/**
 * Room Grid Component
 * Displays multiple rooms in a responsive grid
 */
export interface RoomGridProps {
  rooms: RoomCardData[];
  className?: string;
  showPrice?: boolean;
  onRoomSelect?: (roomId: string) => void;
  selectedRoomId?: string;
  columns?: 1 | 2 | 3 | 4;
}

export const RoomGrid: React.FC<RoomGridProps> = ({
  rooms,
  className = '',
  showPrice = true,
  onRoomSelect,
  selectedRoomId,
  columns = 3,
}) => {
  if (!rooms || rooms.length === 0) {
    return (
      <div className="text-center py-12 text-neutral-600">
        <p>No rooms available at this time.</p>
      </div>
    );
  }

  const getGridClasses = () => {
    const baseClasses = 'grid gap-6';
    switch (columns) {
      case 1:
        return `${baseClasses} grid-cols-1`;
      case 2:
        return `${baseClasses} grid-cols-1 md:grid-cols-2`;
      case 3:
        return `${baseClasses} grid-cols-1 md:grid-cols-2 lg:grid-cols-3`;
      case 4:
        return `${baseClasses} grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`;
      default:
        return `${baseClasses} grid-cols-1 md:grid-cols-2 lg:grid-cols-3`;
    }
  };

  return (
    <div className={`${getGridClasses()} ${className}`}>
      {rooms.map((room) => (
        <RoomCard
          key={room.id}
          room={room}
          showPrice={showPrice}
          onSelect={onRoomSelect}
          isSelected={selectedRoomId === room.id}
        />
      ))}
    </div>
  );
};

export default RoomCard;