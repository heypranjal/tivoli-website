// Generated Supabase Types
// Phase 1: Foundation Setup
// Created: 2025-06-20

export interface Database {
  public: {
    Tables: {
      brands: {
        Row: {
          id: string
          slug: string
          name: string
          display_name: string
          description: string | null
          logo_url: string | null
          brand_color: string | null
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          display_name: string
          description?: string | null
          logo_url?: string | null
          brand_color?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          display_name?: string
          description?: string | null
          logo_url?: string | null
          brand_color?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      locations: {
        Row: {
          id: string
          slug: string
          name: string
          state: string | null
          country: string
          display_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          state?: string | null
          country?: string
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          state?: string | null
          country?: string
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      media: {
        Row: {
          id: string
          filename: string
          original_filename: string | null
          file_type: string | null
          file_size: number | null
          width: number | null
          height: number | null
          supabase_path: string
          public_url: string
          alt_text: string | null
          caption: string | null
          tags: string[] | null
          upload_source: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          filename: string
          original_filename?: string | null
          file_type?: string | null
          file_size?: number | null
          width?: number | null
          height?: number | null
          supabase_path: string
          public_url: string
          alt_text?: string | null
          caption?: string | null
          tags?: string[] | null
          upload_source?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          filename?: string
          original_filename?: string | null
          file_type?: string | null
          file_size?: number | null
          width?: number | null
          height?: number | null
          supabase_path?: string
          public_url?: string
          alt_text?: string | null
          caption?: string | null
          tags?: string[] | null
          upload_source?: string
          created_at?: string
          updated_at?: string
        }
      }
      hotels: {
        Row: {
          id: string
          slug: string
          name: string
          brand_id: string
          location_id: string
          description: string | null
          rating: number
          street: string | null
          city: string | null
          state: string | null
          postal_code: string | null
          latitude: number | null
          longitude: number | null
          phone: string | null
          email: string | null
          meta_title: string | null
          meta_description: string | null
          featured_image_id: string | null
          sort_order: number
          is_featured: boolean
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          brand_id: string
          location_id: string
          description?: string | null
          rating?: number
          street?: string | null
          city?: string | null
          state?: string | null
          postal_code?: string | null
          latitude?: number | null
          longitude?: number | null
          phone?: string | null
          email?: string | null
          meta_title?: string | null
          meta_description?: string | null
          featured_image_id?: string | null
          sort_order?: number
          is_featured?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          brand_id?: string
          location_id?: string
          description?: string | null
          rating?: number
          street?: string | null
          city?: string | null
          state?: string | null
          postal_code?: string | null
          latitude?: number | null
          longitude?: number | null
          phone?: string | null
          email?: string | null
          meta_title?: string | null
          meta_description?: string | null
          featured_image_id?: string | null
          sort_order?: number
          is_featured?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      amenities: {
        Row: {
          id: string
          name: string
          description: string | null
          icon_name: string | null
          category: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          icon_name?: string | null
          category?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          icon_name?: string | null
          category?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      rooms: {
        Row: {
          id: string
          hotel_id: string
          name: string
          description: string | null
          size_sqm: number | null
          size_display: string | null
          max_occupancy: number | null
          bed_type: string | null
          price_inr: number | null
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          hotel_id: string
          name: string
          description?: string | null
          size_sqm?: number | null
          size_display?: string | null
          max_occupancy?: number | null
          bed_type?: string | null
          price_inr?: number | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          hotel_id?: string
          name?: string
          description?: string | null
          size_sqm?: number | null
          size_display?: string | null
          max_occupancy?: number | null
          bed_type?: string | null
          price_inr?: number | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      dining: {
        Row: {
          id: string
          hotel_id: string
          name: string
          description: string | null
          cuisine: string | null
          hours: string | null
          dress_code: string | null
          image_id: string | null
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          hotel_id: string
          name: string
          description?: string | null
          cuisine?: string | null
          hours?: string | null
          dress_code?: string | null
          image_id?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          hotel_id?: string
          name?: string
          description?: string | null
          cuisine?: string | null
          hours?: string | null
          dress_code?: string | null
          image_id?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      career_applications: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          address: string
          position: string
          cover_letter: string | null
          motivation: string
          cv_filename: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          address: string
          position: string
          cover_letter?: string | null
          motivation: string
          cv_filename?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          address?: string
          position?: string
          cover_letter?: string | null
          motivation?: string
          cv_filename?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Extended types for joined queries
export interface HotelWithRelations {
  // Base hotel properties
  id: string
  slug: string
  name: string
  brand_id: string
  location_id: string
  description: string | null
  rating: number
  street: string | null
  city: string | null
  state: string | null
  postal_code: string | null
  latitude: number | null
  longitude: number | null
  phone: string | null
  email: string | null
  meta_title: string | null
  meta_description: string | null
  featured_image_id: string | null
  sort_order: number
  is_featured: boolean
  is_active: boolean
  created_at: string
  updated_at: string
  
  // Relations
  brand: Database['public']['Tables']['brands']['Row']
  location: Database['public']['Tables']['locations']['Row']
  featured_image?: Database['public']['Tables']['media']['Row']
  images?: Array<{
    media: Database['public']['Tables']['media']['Row']
    media_type: string
    sort_order: number
    is_primary: boolean
  }>
  amenities?: Array<{
    amenity: Database['public']['Tables']['amenities']['Row']
    custom_description?: string
  }>
  rooms?: Database['public']['Tables']['rooms']['Row'][]
  dining?: Database['public']['Tables']['dining']['Row'][]
  features?: string[]
  policies?: {
    check_in: string
    check_out: string
    cancellation: string
    pets: string
  }
  
  // Computed properties for backward compatibility
  address?: string
}

export interface MediaWithRelations extends Database['public']['Tables']['media']['Row'] {
  hotel_media?: Array<{
    hotel_id: string
    media_type: string
    sort_order: number
    is_primary: boolean
  }>
}

// Filter types for queries
export interface HotelFilters {
  brand?: string
  location?: string
  featured?: boolean
  active?: boolean
}

export interface MediaFilters {
  hotel_id?: string
  media_type?: string
  tags?: string[]
}