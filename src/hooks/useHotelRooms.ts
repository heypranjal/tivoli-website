import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useCachedData } from './useClientCache';
import type { Database } from '../types/supabase';

type Room = Database['public']['Tables']['rooms']['Row'];
type RoomAmenity = {
  room_id: string;
  amenity_name: string;
};

export interface RoomImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface HotelRoom extends Room {
  amenities: string[];
  images: RoomImage[];
}

interface UseHotelRoomsReturn {
  rooms: HotelRoom[];
  loading: boolean;
  error: string | null;
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Add null safety for Supabase client creation
const supabase = (supabaseUrl && supabaseAnonKey) ? createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storageKey: 'tivoli-rooms-auth',
  },
}) : null;

// Cached room fetching function
const fetchRoomsData = async (hotelId: string): Promise<HotelRoom[]> => {
  if (!hotelId || !supabase) {
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
  let amenitiesData = null;
  if (supabase) {
    const { data, error: amenitiesError } = await supabase
      .from('room_amenities')
      .select('room_id, amenity_name')
      .in('room_id', roomIds);

    if (amenitiesError) {
      console.warn('Failed to fetch room amenities:', amenitiesError.message);
    } else {
      amenitiesData = data;
    }
  }

  // Fetch room images
  let roomImagesData = null;
  if (supabase) {
    const { data, error: imagesError } = await supabase
      .from('room_media')
      .select(`
        room_id,
        sort_order,
        is_primary,
        media!inner (
          id,
          public_url,
          alt_text,
        filename
      )
    `)
    .in('room_id', roomIds)
    .order('sort_order');

    if (imagesError) {
      console.warn('Failed to fetch room images:', imagesError.message);
    } else {
      roomImagesData = data;
    }
  }

  // Group amenities by room_id
  const amenitiesByRoom: Record<string, string[]> = {};
  (amenitiesData || []).forEach((amenity: RoomAmenity) => {
    if (!amenitiesByRoom[amenity.room_id]) {
      amenitiesByRoom[amenity.room_id] = [];
    }
    amenitiesByRoom[amenity.room_id].push(amenity.amenity_name);
  });

  // Group images by room_id
  const imagesByRoom: Record<string, RoomImage[]> = {};
  (roomImagesData || []).forEach((roomImage: any) => {
    if (!imagesByRoom[roomImage.room_id]) {
      imagesByRoom[roomImage.room_id] = [];
    }
    
    // Skip images without valid media
    if (!roomImage.media?.public_url) return;
    
    const image: RoomImage = {
      id: roomImage.media.id,
      url: roomImage.media.public_url,
      alt: roomImage.media.alt_text || `${roomsData.find(r => r.id === roomImage.room_id)?.name || 'Room'} - Image`,
      isPrimary: roomImage.is_primary,
      sortOrder: roomImage.sort_order
    };
    
    imagesByRoom[roomImage.room_id].push(image);
  });

  // Combine rooms with their amenities and images
  const roomsWithAmenitiesAndImages: HotelRoom[] = roomsData.map(room => ({
    ...room,
    amenities: amenitiesByRoom[room.id] || [],
    images: imagesByRoom[room.id] || []
  }));

  return roomsWithAmenitiesAndImages;
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