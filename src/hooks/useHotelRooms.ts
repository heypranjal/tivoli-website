import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useCachedData } from './useClientCache';
import type { Database } from '../types/supabase';

type Room = Database['public']['Tables']['rooms']['Row'];
type RoomAmenity = {
  room_id: string;
  amenity_name: string;
};

export interface HotelRoom extends Room {
  amenities: string[];
}

interface UseHotelRoomsReturn {
  rooms: HotelRoom[];
  loading: boolean;
  error: string | null;
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storageKey: 'tivoli-rooms-auth',
  },
});

// Cached room fetching function
const fetchRoomsData = async (hotelId: string): Promise<HotelRoom[]> => {
  if (!hotelId) {
    return [];
  }

  // Fetch rooms for the hotel
  const { data: roomsData, error: roomsError } = await supabase
    .from('rooms')
    .select('*')
    .eq('hotel_id', hotelId)
    .eq('is_active', true)
    .order('sort_order');

  if (roomsError) {
    throw new Error(`Failed to fetch rooms: ${roomsError.message}`);
  }

  if (!roomsData || roomsData.length === 0) {
    return [];
  }

  // Fetch amenities for all rooms
  const roomIds = roomsData.map(room => room.id);
  const { data: amenitiesData, error: amenitiesError } = await supabase
    .from('room_amenities')
    .select('room_id, amenity_name')
    .in('room_id', roomIds);

  if (amenitiesError) {
    console.warn('Failed to fetch room amenities:', amenitiesError.message);
  }

  // Group amenities by room_id
  const amenitiesByRoom: Record<string, string[]> = {};
  (amenitiesData || []).forEach((amenity: RoomAmenity) => {
    if (!amenitiesByRoom[amenity.room_id]) {
      amenitiesByRoom[amenity.room_id] = [];
    }
    amenitiesByRoom[amenity.room_id].push(amenity.amenity_name);
  });

  // Combine rooms with their amenities
  const roomsWithAmenities: HotelRoom[] = roomsData.map(room => ({
    ...room,
    amenities: amenitiesByRoom[room.id] || []
  }));

  return roomsWithAmenities;
};

export const useHotelRooms = (hotelId: string): UseHotelRoomsReturn => {
  // Use cached data for rooms
  const {
    data: rooms,
    isLoading: loading,
    error,
    hasCache
  } = useCachedData(
    () => fetchRoomsData(hotelId),
    {
      key: `hotel-rooms-${hotelId}`,
      ttl: 15 * 60 * 1000, // 15 minutes cache
      storage: 'session'
    },
    [hotelId]
  );

  return { 
    rooms: rooms || [], 
    loading, 
    error 
  };
};

export default useHotelRooms;