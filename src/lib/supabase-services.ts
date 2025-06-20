/**
 * Supabase Services
 * Phase 1: Foundation Setup
 * Created: 2025-06-20
 * 
 * Centralized database operations for Tivoli Hotels
 * Provides typed service layer for all database interactions
 */

import { supabase } from './supabase'
import type { 
  Database, 
  HotelWithRelations, 
  MediaWithRelations, 
  HotelFilters, 
  MediaFilters 
} from '@/types/supabase'

// Type aliases for cleaner code
type Brand = Database['public']['Tables']['brands']['Row']
type Location = Database['public']['Tables']['locations']['Row']
type Hotel = Database['public']['Tables']['hotels']['Row']
type Media = Database['public']['Tables']['media']['Row']
type Amenity = Database['public']['Tables']['amenities']['Row']
type Room = Database['public']['Tables']['rooms']['Row']
type Dining = Database['public']['Tables']['dining']['Row']

/**
 * Brand Services
 */
export const brandService = {
  async getAllBrands(): Promise<Brand[]> {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .eq('is_active', true)
      .order('sort_order')
    
    if (error) throw error
    return data || []
  },

  async getBrandBySlug(slug: string): Promise<Brand | null> {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single()
    
    if (error) {
      if (error.code === 'PGRST116') return null // Not found
      throw error
    }
    return data
  },

  async createBrand(brand: Database['public']['Tables']['brands']['Insert']): Promise<Brand> {
    const { data, error } = await supabase
      .from('brands')
      .insert(brand)
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}

/**
 * Location Services
 */
export const locationService = {
  async getAllLocations(): Promise<Location[]> {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .eq('is_active', true)
      .order('display_order')
    
    if (error) throw error
    return data || []
  },

  async getLocationBySlug(slug: string): Promise<Location | null> {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single()
    
    if (error) {
      if (error.code === 'PGRST116') return null
      throw error
    }
    return data
  },

  async createLocation(location: Database['public']['Tables']['locations']['Insert']): Promise<Location> {
    const { data, error } = await supabase
      .from('locations')
      .insert(location)
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}

/**
 * Hotel Services
 */
export const hotelService = {
  async getHotels(filters?: HotelFilters): Promise<HotelWithRelations[]> {
    let query = supabase
      .from('hotels')
      .select(`
        *,
        brand:brands(*),
        location:locations(*),
        featured_image:media(*),
        images:hotel_media(
          media_type,
          sort_order,
          is_primary,
          media:media(*)
        )
      `)
      .eq('is_active', true)

    if (filters?.brand) {
      query = query.eq('brands.slug', filters.brand)
    }

    if (filters?.location) {
      query = query.eq('locations.slug', filters.location)
    }

    if (filters?.featured !== undefined) {
      query = query.eq('is_featured', filters.featured)
    }

    const { data, error } = await query.order('sort_order')
    
    if (error) throw error
    return data as HotelWithRelations[] || []
  },

  async getHotelBySlug(slug: string): Promise<HotelWithRelations | null> {
    const { data, error } = await supabase
      .from('hotels')
      .select(`
        *,
        brand:brands(*),
        location:locations(*),
        featured_image:media(*),
        images:hotel_media(
          media_type,
          sort_order,
          is_primary,
          media:media(*)
        ),
        amenities:hotel_amenities(
          custom_description,
          amenity:amenities(*)
        ),
        rooms(*),
        dining(*),
        features:hotel_features(feature_name),
        policies:hotel_policies(*)
      `)
      .eq('slug', slug)
      .eq('is_active', true)
      .single()
    
    if (error) {
      if (error.code === 'PGRST116') return null
      throw error
    }

    // Transform features array
    const transformed = {
      ...data,
      features: data.features?.map((f: any) => f.feature_name) || []
    } as HotelWithRelations

    return transformed
  },

  async getFeaturedHotels(): Promise<HotelWithRelations[]> {
    return this.getHotels({ featured: true })
  },

  async getHotelsByBrand(brandSlug: string): Promise<HotelWithRelations[]> {
    return this.getHotels({ brand: brandSlug })
  },

  async getHotelsByLocation(locationSlug: string): Promise<HotelWithRelations[]> {
    return this.getHotels({ location: locationSlug })
  },

  async createHotel(hotel: Database['public']['Tables']['hotels']['Insert']): Promise<Hotel> {
    const { data, error } = await supabase
      .from('hotels')
      .insert(hotel)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async updateHotel(id: string, updates: Database['public']['Tables']['hotels']['Update']): Promise<Hotel> {
    const { data, error } = await supabase
      .from('hotels')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}

/**
 * Media Services
 */
export const mediaService = {
  async getMediaByHotel(hotelId: string, mediaType?: string): Promise<MediaWithRelations[]> {
    let query = supabase
      .from('media')
      .select(`
        *,
        hotel_media!inner(
          hotel_id,
          media_type,
          sort_order,
          is_primary
        )
      `)
      .eq('hotel_media.hotel_id', hotelId)

    if (mediaType) {
      query = query.eq('hotel_media.media_type', mediaType)
    }

    const { data, error } = await query.order('hotel_media.sort_order')
    
    if (error) throw error
    return data as MediaWithRelations[] || []
  },

  async uploadMedia(file: File, path: string): Promise<Media> {
    // Upload file to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('tivoli-media')
      .upload(path, file)

    if (uploadError) throw uploadError

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('tivoli-media')
      .getPublicUrl(path)

    // Create media record
    const { data, error } = await supabase
      .from('media')
      .insert({
        filename: uploadData.path,
        original_filename: file.name,
        file_type: file.type,
        file_size: file.size,
        supabase_path: uploadData.path,
        public_url: publicUrl,
        upload_source: 'admin'
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  async linkMediaToHotel(mediaId: string, hotelId: string, mediaType: string, sortOrder = 0): Promise<void> {
    const { error } = await supabase
      .from('hotel_media')
      .insert({
        media_id: mediaId,
        hotel_id: hotelId,
        media_type: mediaType,
        sort_order: sortOrder
      })

    if (error) throw error
  }
}

/**
 * Amenity Services
 */
export const amenityService = {
  async getAllAmenities(): Promise<Amenity[]> {
    const { data, error } = await supabase
      .from('amenities')
      .select('*')
      .eq('is_active', true)
      .order('name')
    
    if (error) throw error
    return data || []
  },

  async getAmenitiesByCategory(category: string): Promise<Amenity[]> {
    const { data, error } = await supabase
      .from('amenities')
      .select('*')
      .eq('category', category)
      .eq('is_active', true)
      .order('name')
    
    if (error) throw error
    return data || []
  }
}

/**
 * Room Services
 */
export const roomService = {
  async getRoomsByHotel(hotelId: string): Promise<Room[]> {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('hotel_id', hotelId)
      .eq('is_active', true)
      .order('sort_order')
    
    if (error) throw error
    return data || []
  },

  async createRoom(room: Database['public']['Tables']['rooms']['Insert']): Promise<Room> {
    const { data, error } = await supabase
      .from('rooms')
      .insert(room)
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}

/**
 * Dining Services
 */
export const diningService = {
  async getDiningByHotel(hotelId: string): Promise<Dining[]> {
    const { data, error } = await supabase
      .from('dining')
      .select('*')
      .eq('hotel_id', hotelId)
      .eq('is_active', true)
      .order('sort_order')
    
    if (error) throw error
    return data || []
  },

  async createDining(dining: Database['public']['Tables']['dining']['Insert']): Promise<Dining> {
    const { data, error } = await supabase
      .from('dining')
      .insert(dining)
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}

/**
 * Search Services
 */
export const searchService = {
  async searchHotels(query: string): Promise<HotelWithRelations[]> {
    const { data, error } = await supabase
      .from('hotels')
      .select(`
        *,
        brand:brands(*),
        location:locations(*),
        featured_image:media(*)
      `)
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
      .eq('is_active', true)
      .order('sort_order')
    
    if (error) throw error
    return data as HotelWithRelations[] || []
  }
}

/**
 * Utility Functions
 */
export const utilService = {
  async getStats() {
    const [brands, locations, hotels] = await Promise.all([
      brandService.getAllBrands(),
      locationService.getAllLocations(),
      hotelService.getHotels()
    ])

    return {
      brands: brands.length,
      locations: locations.length,
      hotels: hotels.length,
      featuredHotels: hotels.filter(h => h.is_featured).length
    }
  }
}