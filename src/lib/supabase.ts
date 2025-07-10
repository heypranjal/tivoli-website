/**
 * Supabase Client Configuration
 * Centralized configuration for Tivoli Hotels Supabase integration
 * 
 * Features:
 * - Environment-based configuration
 * - Type-safe client setup
 * - Error handling and logging
 * 
 * Migration Notes:
 * - Updated to new Supabase project: sivirxabbuldqkckjwmu
 * - Maintains backward compatibility during migration
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

// Create Supabase client with optimized configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    storageKey: 'tivoli-main-auth',
  },
  global: {
    headers: {
      'x-client-info': 'tivoli-hotels-website',
    },
  },
})

// Database type definitions for better TypeScript support
export interface VenueBooking {
  id?: string
  created_at?: string
  name: string
  email: string
  phone: string
  event_type: 'wedding' | 'mice' | 'birthday' | 'cocktail' | 'corporate' | 'other'
  event_date: string
  guest_count: number
  venue_id?: string
  needs_rooms?: boolean
  budget_range?: 'under-5-lakhs' | '5-10-lakhs' | '10-20-lakhs' | '20-50-lakhs' | 'above-50-lakhs'
  special_requirements?: string
  status?: 'pending' | 'contacted' | 'confirmed' | 'cancelled'
}

export interface RoomBooking {
  id?: string
  created_at?: string
  name: string
  email: string
  phone: string
  check_in: string
  check_out: string
  adults: number
  children: number
  infants: number
  rooms: number
  hotel_id: string
  purpose?: string
  status?: 'pending' | 'confirmed' | 'cancelled'
}

export interface Lead {
  id?: string
  created_at?: string
  source: 'venue_booking' | 'room_booking' | 'website_contact' | 'phone_inquiry'
  booking_id?: string
  customer_name?: string
  customer_email?: string
  customer_phone?: string
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
  notes?: string
  assigned_to?: string
  updated_at?: string
}

export interface Hotel {
  id: string
  slug: string
  name: string
  city?: string
  state?: string
  is_active: boolean
  sort_order: number
  is_featured?: boolean
}

export interface HotelFilterOptions {
  includeInactive?: boolean
  excludeHotelIds?: string[]
}

// Helper functions for database operations
export const supabaseHelpers = {
  // Venue bookings
  async createVenueBooking(booking: VenueBooking) {
    const { data, error } = await supabase
      .from('venue_bookings')
      .insert(booking)
      .select()
      .single()
    
    if (error) {
      console.error('Error creating venue booking:', error)
      throw error
    }
    
    return data
  },

  // Room bookings
  async createRoomBooking(booking: RoomBooking) {
    const { data, error } = await supabase
      .from('room_bookings')
      .insert(booking)
      .select()
      .single()
    
    if (error) {
      console.error('Error creating room booking:', error)
      throw error
    }
    
    return data
  },

  // Lead tracking
  async createLead(lead: Lead) {
    const { data, error } = await supabase
      .from('leads')
      .insert(lead)
      .select()
      .single()
    
    if (error) {
      console.error('Error creating lead:', error)
      throw error
    }
    
    return data
  },

  // Get all venue bookings (admin use)
  async getVenueBookings() {
    const { data, error } = await supabase
      .from('venue_bookings')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching venue bookings:', error)
      throw error
    }
    
    return data
  },

  // Get all room bookings (admin use)
  async getRoomBookings() {
    const { data, error } = await supabase
      .from('room_bookings')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching room bookings:', error)
      throw error
    }
    
    return data
  },

  // Hotel management
  async getActiveHotels(options: HotelFilterOptions = {}) {
    const { includeInactive = false, excludeHotelIds = [] } = options;
    
    let query = supabase
      .from('hotels')
      .select('id, slug, name, city, state, is_active, sort_order, is_featured');
    
    // Filter by active status unless includeInactive is true
    if (!includeInactive) {
      query = query.eq('is_active', true);
    }
    
    // Exclude specific hotel IDs if provided
    if (excludeHotelIds.length > 0) {
      query = query.not('id', 'in', `(${excludeHotelIds.join(',')})`);
    }
    
    // Order by sort_order and name for consistent display
    query = query.order('sort_order', { ascending: true }).order('name', { ascending: true });
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching hotels:', error);
      throw error;
    }
    
    return data as Hotel[];
  },

  async getAllHotels(options: HotelFilterOptions = {}) {
    return this.getActiveHotels({ ...options, includeInactive: true });
  },

  async getHotelById(hotelId: string) {
    const { data, error } = await supabase
      .from('hotels')
      .select('id, slug, name, city, state, is_active, sort_order, is_featured')
      .eq('id', hotelId)
      .single();
    
    if (error) {
      console.error('Error fetching hotel by ID:', error);
      throw error;
    }
    
    return data as Hotel;
  },
}

export default supabase