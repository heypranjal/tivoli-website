-- Tivoli Hotels Database Schema
-- Phase 1: Foundation Setup
-- Created: 2025-06-20

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create brands table
CREATE TABLE brands (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    description TEXT,
    logo_url TEXT,
    brand_color VARCHAR(7), -- Hex color code
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create locations table
CREATE TABLE locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    state VARCHAR(50),
    country VARCHAR(50) DEFAULT 'India',
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create media table for centralized image management
CREATE TABLE media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255),
    file_type VARCHAR(50),
    file_size INTEGER,
    width INTEGER,
    height INTEGER,
    supabase_path TEXT NOT NULL,
    public_url TEXT NOT NULL,
    alt_text TEXT,
    caption TEXT,
    tags TEXT[], -- Array of tags for easy filtering
    upload_source VARCHAR(50) DEFAULT 'admin', -- 'admin', 'migration', 'api'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create hotels table
CREATE TABLE hotels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    brand_id UUID REFERENCES brands(id) ON DELETE RESTRICT,
    location_id UUID REFERENCES locations(id) ON DELETE RESTRICT,
    description TEXT,
    rating DECIMAL(2,1) DEFAULT 5.0,
    
    -- Address information
    street TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    
    -- Contact information
    phone VARCHAR(50),
    email VARCHAR(100),
    
    -- SEO and display
    meta_title VARCHAR(200),
    meta_description TEXT,
    featured_image_id UUID REFERENCES media(id),
    sort_order INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create hotel_media junction table
CREATE TABLE hotel_media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
    media_id UUID REFERENCES media(id) ON DELETE CASCADE,
    media_type VARCHAR(50) NOT NULL, -- 'hero', 'gallery', 'room', 'dining', 'amenity'
    sort_order INTEGER DEFAULT 0,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Ensure unique primary image per type per hotel
    UNIQUE(hotel_id, media_type, is_primary) WHERE is_primary = true
);

-- Create amenities table
CREATE TABLE amenities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon_name VARCHAR(50), -- Lucide icon name
    category VARCHAR(50), -- 'wellness', 'dining', 'business', 'recreation'
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create hotel_amenities junction table
CREATE TABLE hotel_amenities (
    hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
    amenity_id UUID REFERENCES amenities(id) ON DELETE CASCADE,
    custom_description TEXT, -- Hotel-specific amenity description
    sort_order INTEGER DEFAULT 0,
    PRIMARY KEY (hotel_id, amenity_id)
);

-- Create rooms table
CREATE TABLE rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    size_sqm INTEGER,
    size_display VARCHAR(50), -- "45 sq.m."
    max_occupancy INTEGER,
    bed_type VARCHAR(100),
    price_inr INTEGER,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create room_amenities table
CREATE TABLE room_amenities (
    room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
    amenity_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (room_id, amenity_name)
);

-- Create dining table
CREATE TABLE dining (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    cuisine VARCHAR(100),
    hours VARCHAR(100),
    dress_code VARCHAR(100),
    image_id UUID REFERENCES media(id),
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create hotel_features table for flexible feature management
CREATE TABLE hotel_features (
    hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
    feature_name VARCHAR(100) NOT NULL,
    sort_order INTEGER DEFAULT 0,
    PRIMARY KEY (hotel_id, feature_name)
);

-- Create hotel_policies table
CREATE TABLE hotel_policies (
    hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE PRIMARY KEY,
    check_in VARCHAR(50) DEFAULT '2:00 PM',
    check_out VARCHAR(50) DEFAULT '12:00 PM',
    cancellation TEXT DEFAULT '24 hours before arrival',
    pets VARCHAR(100) DEFAULT 'Not allowed',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_hotels_brand_location ON hotels(brand_id, location_id);
CREATE INDEX idx_hotels_active_featured ON hotels(is_active, is_featured);
CREATE INDEX idx_hotels_slug ON hotels(slug);
CREATE INDEX idx_hotel_media_hotel_type ON hotel_media(hotel_id, media_type);
CREATE INDEX idx_media_tags ON media USING GIN(tags);
CREATE INDEX idx_brands_slug ON brands(slug);
CREATE INDEX idx_locations_slug ON locations(slug);
CREATE INDEX idx_hotels_brand_slug ON hotels(brand_id) WHERE is_active = true;
CREATE INDEX idx_hotels_location_slug ON hotels(location_id) WHERE is_active = true;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_brands_updated_at BEFORE UPDATE ON brands FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_locations_updated_at BEFORE UPDATE ON locations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_media_updated_at BEFORE UPDATE ON media FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_hotels_updated_at BEFORE UPDATE ON hotels FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_amenities_updated_at BEFORE UPDATE ON amenities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rooms_updated_at BEFORE UPDATE ON rooms FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_dining_updated_at BEFORE UPDATE ON dining FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_hotel_policies_updated_at BEFORE UPDATE ON hotel_policies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();