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
  source: 'venue_booking' | 'room_booking' | 'contact_form'
  booking_id?: string
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
  follow_up_date?: string
  notes?: string
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
}

export default supabase