-- 🏨 FINAL TIVOLI HOTELS DATABASE SETUP
-- Execute this complete SQL in Supabase Dashboard SQL Editor
-- Location: https://supabase.com/dashboard/project/sivirxabbuldqkckjwmu/sql

-- =============================================================================
-- PART 1: SCHEMA CREATION
-- =============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create brands table
CREATE TABLE IF NOT EXISTS brands (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    description TEXT,
    logo_url TEXT,
    brand_color VARCHAR(7),
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create locations table
CREATE TABLE IF NOT EXISTS locations (
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

-- Create media table
CREATE TABLE IF NOT EXISTS media (
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
    tags TEXT[],
    upload_source VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create hotels table
CREATE TABLE IF NOT EXISTS hotels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    brand_id UUID REFERENCES brands(id) ON DELETE RESTRICT,
    location_id UUID REFERENCES locations(id) ON DELETE RESTRICT,
    description TEXT,
    rating DECIMAL(2,1) DEFAULT 5.0,
    street TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    phone VARCHAR(50),
    email VARCHAR(100),
    meta_title VARCHAR(200),
    meta_description TEXT,
    featured_image_id UUID REFERENCES media(id),
    sort_order INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create hotel_media junction table
CREATE TABLE IF NOT EXISTS hotel_media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
    media_id UUID REFERENCES media(id) ON DELETE CASCADE,
    media_type VARCHAR(50) NOT NULL,
    sort_order INTEGER DEFAULT 0,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(hotel_id, media_type, is_primary) WHERE is_primary = true
);

-- Create amenities table
CREATE TABLE IF NOT EXISTS amenities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon_name VARCHAR(50),
    category VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create hotel_amenities junction table
CREATE TABLE IF NOT EXISTS hotel_amenities (
    hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
    amenity_id UUID REFERENCES amenities(id) ON DELETE CASCADE,
    custom_description TEXT,
    sort_order INTEGER DEFAULT 0,
    PRIMARY KEY (hotel_id, amenity_id)
);

-- Create rooms table
CREATE TABLE IF NOT EXISTS rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    size_sqm INTEGER,
    size_display VARCHAR(50),
    max_occupancy INTEGER,
    bed_type VARCHAR(100),
    price_inr INTEGER,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create room_amenities table
CREATE TABLE IF NOT EXISTS room_amenities (
    room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
    amenity_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (room_id, amenity_name)
);

-- Create dining table
CREATE TABLE IF NOT EXISTS dining (
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

-- Create hotel_features table
CREATE TABLE IF NOT EXISTS hotel_features (
    hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
    feature_name VARCHAR(100) NOT NULL,
    sort_order INTEGER DEFAULT 0,
    PRIMARY KEY (hotel_id, feature_name)
);

-- Create hotel_policies table
CREATE TABLE IF NOT EXISTS hotel_policies (
    hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE PRIMARY KEY,
    check_in VARCHAR(50) DEFAULT '2:00 PM',
    check_out VARCHAR(50) DEFAULT '12:00 PM',
    cancellation TEXT DEFAULT '24 hours before arrival',
    pets VARCHAR(100) DEFAULT 'Not allowed',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_hotels_brand_location ON hotels(brand_id, location_id);
CREATE INDEX IF NOT EXISTS idx_hotels_active_featured ON hotels(is_active, is_featured);
CREATE INDEX IF NOT EXISTS idx_hotels_slug ON hotels(slug);
CREATE INDEX IF NOT EXISTS idx_hotel_media_hotel_type ON hotel_media(hotel_id, media_type);
CREATE INDEX IF NOT EXISTS idx_media_tags ON media USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_brands_slug ON brands(slug);
CREATE INDEX IF NOT EXISTS idx_locations_slug ON locations(slug);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_brands_updated_at') THEN
        CREATE TRIGGER update_brands_updated_at BEFORE UPDATE ON brands FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_locations_updated_at') THEN
        CREATE TRIGGER update_locations_updated_at BEFORE UPDATE ON locations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_media_updated_at') THEN
        CREATE TRIGGER update_media_updated_at BEFORE UPDATE ON media FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_hotels_updated_at') THEN
        CREATE TRIGGER update_hotels_updated_at BEFORE UPDATE ON hotels FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_amenities_updated_at') THEN
        CREATE TRIGGER update_amenities_updated_at BEFORE UPDATE ON amenities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_rooms_updated_at') THEN
        CREATE TRIGGER update_rooms_updated_at BEFORE UPDATE ON rooms FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_dining_updated_at') THEN
        CREATE TRIGGER update_dining_updated_at BEFORE UPDATE ON dining FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_hotel_policies_updated_at') THEN
        CREATE TRIGGER update_hotel_policies_updated_at BEFORE UPDATE ON hotel_policies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-- =============================================================================
-- PART 2: DATA POPULATION
-- =============================================================================

-- Insert brands
INSERT INTO brands (slug, name, display_name, description, brand_color, sort_order) VALUES
('tivoli', 'Tivoli', 'The Tivoli', 'Luxury hotels offering unparalleled hospitality and elegant accommodations', '#CD9F59', 1),
('omnia', 'Omnia', 'Omnia', 'Contemporary luxury with modern amenities and sophisticated design', '#2C3E50', 2),
('upper-hse', 'Upper HSE', 'The Upper HSE', 'Premium hospitality with attention to detail and personalized service', '#8B4513', 3),
('wedcation', 'Wedcation', 'Wedcation', 'Destination wedding venues with comprehensive celebration services', '#E91E63', 4)
ON CONFLICT (slug) DO NOTHING;

-- Insert locations
INSERT INTO locations (slug, name, state, display_order) VALUES
('delhi', 'Delhi', 'Delhi', 1),
('noida', 'Noida', 'Uttar Pradesh', 2),
('greater-noida', 'Greater Noida', 'Uttar Pradesh', 3),
('palwal', 'Palwal', 'Haryana', 4),
('rewari', 'Rewari', 'Haryana', 5),
('ambala', 'Ambala', 'Haryana', 6),
('israna', 'Israna', 'Haryana', 7)
ON CONFLICT (slug) DO NOTHING;

-- Insert amenities
INSERT INTO amenities (name, description, icon_name, category) VALUES
-- Wellness & Recreation
('Swimming Pool', 'Indoor/outdoor swimming pool with poolside service', 'Waves', 'wellness'),
('Fitness Center', '24/7 modern fitness center with latest equipment', 'Dumbbell', 'wellness'),
('Spa Services', 'Full-service spa with therapeutic treatments', 'Heart', 'wellness'),
('Yoga Studio', 'Dedicated yoga and meditation space', 'User', 'wellness'),

-- Dining
('Multi-Cuisine Restaurant', 'Fine dining restaurant with diverse menu', 'Utensils', 'dining'),
('Room Service', '24-hour in-room dining service', 'Coffee', 'dining'),
('Bar & Lounge', 'Cocktail bar and lounge area', 'Wine', 'dining'),
('Banquet Hall', 'Grand banquet facilities for events', 'Users', 'dining'),

-- Business & Connectivity
('Free WiFi', 'Complimentary high-speed internet throughout', 'Wifi', 'business'),
('Business Center', 'Fully equipped business center', 'Briefcase', 'business'),
('Conference Rooms', 'Modern meeting and conference facilities', 'Monitor', 'business'),
('Airport Transfer', 'Complimentary airport shuttle service', 'Car', 'business'),

-- Recreation & Entertainment
('Garden Area', 'Landscaped gardens and outdoor spaces', 'TreePine', 'recreation'),
('Kids Play Area', 'Safe and fun play area for children', 'Baby', 'recreation'),
('Event Lawn', 'Spacious outdoor event and wedding lawn', 'MapPin', 'recreation'),
('Parking', 'Complimentary valet and self-parking', 'Car', 'recreation')
ON CONFLICT (name) DO NOTHING;

-- =============================================================================
-- PART 2: STORAGE SETUP
-- =============================================================================

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('hotel-images', 'hotel-images', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('hotel-videos', 'hotel-videos', true, 104857600, ARRAY['video/mp4', 'video/webm']),
  ('documents', 'documents', false, 5242880, ARRAY['application/pdf', 'application/msword'])
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for hotel-images bucket
CREATE POLICY "Public read access on hotel images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'hotel-images');

-- Allow authenticated uploads for migration and admin
CREATE POLICY "Authenticated upload access on hotel images" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'hotel-images' AND auth.role() = 'authenticated');

CREATE POLICY "Admin full access on hotel images" 
ON storage.objects FOR ALL 
USING (bucket_id = 'hotel-images' AND auth.jwt() ->> 'role' = 'admin');

-- Create storage policies for hotel-videos bucket
CREATE POLICY "Public read access on hotel videos" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'hotel-videos');

CREATE POLICY "Authenticated upload access on hotel videos" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'hotel-videos' AND auth.role() = 'authenticated');

-- Create storage policies for documents bucket (private)
CREATE POLICY "Admin full access on documents" 
ON storage.objects FOR ALL 
USING (bucket_id = 'documents' AND auth.jwt() ->> 'role' = 'admin');

-- =============================================================================
-- PART 3: SAMPLE HOTELS DATA
-- =============================================================================

-- Insert sample hotels using brand and location references
WITH brand_location_refs AS (
  SELECT 
    b_tivoli.id as tivoli_brand_id,
    b_omnia.id as omnia_brand_id,
    b_upper.id as upper_brand_id,
    b_wedcation.id as wedcation_brand_id,
    l_delhi.id as delhi_location_id,
    l_noida.id as noida_location_id,
    l_greater_noida.id as greater_noida_location_id,
    l_palwal.id as palwal_location_id,
    l_rewari.id as rewari_location_id,
    l_ambala.id as ambala_location_id,
    l_israna.id as israna_location_id
  FROM 
    brands b_tivoli,
    brands b_omnia,
    brands b_upper,
    brands b_wedcation,
    locations l_delhi,
    locations l_noida,
    locations l_greater_noida,
    locations l_palwal,
    locations l_rewari,
    locations l_ambala,
    locations l_israna
  WHERE 
    b_tivoli.slug = 'tivoli' AND
    b_omnia.slug = 'omnia' AND
    b_upper.slug = 'upper-hse' AND
    b_wedcation.slug = 'wedcation' AND
    l_delhi.slug = 'delhi' AND
    l_noida.slug = 'noida' AND
    l_greater_noida.slug = 'greater-noida' AND
    l_palwal.slug = 'palwal' AND
    l_rewari.slug = 'rewari' AND
    l_ambala.slug = 'ambala' AND
    l_israna.slug = 'israna'
)
INSERT INTO hotels (slug, name, brand_id, location_id, description, rating, street, city, state, phone, is_featured, sort_order)
SELECT * FROM (
  SELECT 
    'tivoli-bijwasan' as slug,
    'Tivoli Bijwasan' as name,
    tivoli_brand_id as brand_id,
    delhi_location_id as location_id,
    'Luxury hotel in the heart of Delhi with modern amenities and elegant accommodations' as description,
    5.0 as rating,
    'Bijwasan Road, Near IGI Airport' as street,
    'Delhi' as city,
    'Delhi' as state,
    '+91-11-2345-6789' as phone,
    true as is_featured,
    1 as sort_order
  FROM brand_location_refs
  
  UNION ALL
  
  SELECT 
    'tivoli-lotus-court',
    'Tivoli Lotus Court',
    tivoli_brand_id,
    noida_location_id,
    'Premium business hotel in Noida with world-class facilities',
    5.0,
    'Sector 18, Atta Market',
    'Noida',
    'Uttar Pradesh',
    '+91-120-2345-6789',
    true,
    2
  FROM brand_location_refs
  
  UNION ALL
  
  SELECT 
    'tivoli-royal-palace',
    'Tivoli Royal Palace',
    tivoli_brand_id,
    palwal_location_id,
    'Majestic palace hotel offering royal luxury and heritage charm',
    5.0,
    'Palace Road, Heritage District',
    'Palwal',
    'Haryana',
    '+91-1275-234-567',
    true,
    3
  FROM brand_location_refs
  
  UNION ALL
  
  SELECT 
    'tivoli-heritage-palace',
    'Tivoli Heritage Palace',
    tivoli_brand_id,
    rewari_location_id,
    'Heritage hotel blending tradition with modern comfort',
    5.0,
    'Heritage Complex, Old City',
    'Rewari',
    'Haryana',
    '+91-1274-234-567',
    true,
    4
  FROM brand_location_refs
  
  UNION ALL
  
  SELECT 
    'tivoli-grand-palace',
    'Tivoli Grand Palace',
    tivoli_brand_id,
    greater_noida_location_id,
    'Grand luxury hotel with world-class facilities and amenities',
    5.0,
    'Alpha Road, Business District',
    'Greater Noida',
    'Uttar Pradesh',
    '+91-120-3456-7890',
    true,
    5
  FROM brand_location_refs
) AS hotels_data
ON CONFLICT (slug) DO NOTHING;

-- =============================================================================
-- PART 4: VERIFICATION QUERIES
-- =============================================================================

-- Display data counts
SELECT 
  'brands' as table_name, COUNT(*) as record_count FROM brands
UNION ALL
SELECT 
  'locations' as table_name, COUNT(*) as record_count FROM locations  
UNION ALL
SELECT 
  'amenities' as table_name, COUNT(*) as record_count FROM amenities
UNION ALL
SELECT 
  'hotels' as table_name, COUNT(*) as record_count FROM hotels
UNION ALL
SELECT 
  'storage.buckets' as table_name, COUNT(*) as record_count FROM storage.buckets;

-- Display sample data
SELECT 'BRANDS:' as section, slug, name, brand_color FROM brands
UNION ALL
SELECT 'HOTELS:', slug, name, CONCAT(street, ', ', city) FROM hotels;

-- =============================================================================
-- SUCCESS MESSAGE
-- =============================================================================

DO $$
BEGIN
    RAISE NOTICE '🎉 Tivoli Hotels Database Setup Complete!';
    RAISE NOTICE '✅ Data populated: brands, locations, amenities, hotels';
    RAISE NOTICE '✅ Storage buckets created with policies';
    RAISE NOTICE '📋 Next: Run image migration scripts';
    RAISE NOTICE '🔗 Test application at: http://localhost:5173';
END $$;