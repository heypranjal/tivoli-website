-- Tivoli Hotels Data Population
-- Phase 5: Database Migration & Data Population
-- Created: 2025-06-20
-- 
-- This script populates the database with all existing hotel data
-- from the static files, converted to the new dynamic structure

-- Insert brands
INSERT INTO brands (slug, name, display_name, description, brand_color, sort_order) VALUES
('tivoli', 'Tivoli', 'The Tivoli', 'Luxury hotels offering unparalleled hospitality and elegant accommodations', '#CD9F59', 1),
('omnia', 'Omnia', 'Omnia', 'Contemporary luxury with modern amenities and sophisticated design', '#2C3E50', 2),
('upper-hse', 'Upper HSE', 'The Upper HSE', 'Premium hospitality with attention to detail and personalized service', '#8B4513', 3),
('wedcation', 'Wedcation', 'Wedcation', 'Destination wedding venues with comprehensive celebration services', '#E91E63', 4);

-- Insert locations
INSERT INTO locations (slug, name, state, display_order) VALUES
('delhi', 'Delhi', 'Delhi', 1),
('noida', 'Noida', 'Uttar Pradesh', 2),
('greater-noida', 'Greater Noida', 'Uttar Pradesh', 3),
('palwal', 'Palwal', 'Haryana', 4),
('rewari', 'Rewari', 'Haryana', 5),
('ambala', 'Ambala', 'Haryana', 6),
('israna', 'Israna', 'Haryana', 7);

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
('Parking', 'Complimentary valet and self-parking', 'Car', 'recreation');

-- Get brand and location IDs for hotel insertions
DO $$
DECLARE
    tivoli_id UUID;
    omnia_id UUID;
    upper_hse_id UUID;
    wedcation_id UUID;
    delhi_id UUID;
    noida_id UUID;
    greater_noida_id UUID;
    palwal_id UUID;
    rewari_id UUID;
    ambala_id UUID;
    israna_id UUID;
BEGIN
    -- Get brand IDs
    SELECT id INTO tivoli_id FROM brands WHERE slug = 'tivoli';
    SELECT id INTO omnia_id FROM brands WHERE slug = 'omnia';
    SELECT id INTO upper_hse_id FROM brands WHERE slug = 'upper-hse';
    SELECT id INTO wedcation_id FROM brands WHERE slug = 'wedcation';
    
    -- Get location IDs
    SELECT id INTO delhi_id FROM locations WHERE slug = 'delhi';
    SELECT id INTO noida_id FROM locations WHERE slug = 'noida';
    SELECT id INTO greater_noida_id FROM locations WHERE slug = 'greater-noida';
    SELECT id INTO palwal_id FROM locations WHERE slug = 'palwal';
    SELECT id INTO rewari_id FROM locations WHERE slug = 'rewari';
    SELECT id INTO ambala_id FROM locations WHERE slug = 'ambala';
    SELECT id INTO israna_id FROM locations WHERE slug = 'israna';

    -- Insert hotels
    INSERT INTO hotels (slug, name, brand_id, location_id, description, rating, street, city, state, postal_code, phone, email, is_featured, sort_order) VALUES
    
    -- Tivoli Hotels
    ('tivoli-grand-palace', 'Tivoli Grand Palace', tivoli_id, delhi_id, 
     'A magnificent palace hotel offering royal luxury in the heart of Delhi with opulent interiors and world-class amenities.', 
     5.0, 'Chattarpur', 'New Delhi', 'Delhi', '110074', '+91-11-4747-9999', 'reservations@tivoligrandpalace.com', true, 1),
     
    ('tivoli-royal-palace', 'Tivoli Royal Palace', tivoli_id, palwal_id,
     'Experience royal grandeur at this heritage palace hotel with traditional architecture and modern comfort.', 
     4.8, 'NH-19, Mathura Road', 'Palwal', 'Haryana', '121102', '+91-1275-234567', 'info@tivoliroyalpalace.com', true, 2),
     
    ('tivoli-heritage-palace', 'Tivoli Heritage Palace', tivoli_id, rewari_id,
     'A heritage property showcasing the rich cultural legacy of Haryana with luxurious accommodations.', 
     4.7, 'Delhi-Jaipur Highway', 'Rewari', 'Haryana', '123401', '+91-1274-567890', 'bookings@tivoliheritagepalace.com', true, 3),
     
    ('tivoli-lotus-court', 'Tivoli Lotus Court', tivoli_id, noida_id,
     'Contemporary luxury hotel in Noida offering sophisticated amenities and exceptional service for business and leisure travelers.', 
     4.6, 'Sector 18', 'Noida', 'Uttar Pradesh', '201301', '+91-120-4567890', 'welcome@tivolilotuscourt.com', true, 4),
     
    ('royal-court-okhla', 'Royal Court Okhla', tivoli_id, delhi_id,
     'Elegant hotel in South Delhi providing premium hospitality with easy access to business districts and shopping areas.', 
     4.5, 'Okhla Industrial Area', 'New Delhi', 'Delhi', '110020', '+91-11-4123-4567', 'info@royalcourtokhla.com', false, 5),
     
    ('tivoli-bijwasan', 'Tivoli Bijwasan', tivoli_id, delhi_id,
     'Modern hotel near IGI Airport offering comfortable stays with excellent connectivity and hospitality.', 
     4.4, 'Bijwasan', 'New Delhi', 'Delhi', '110061', '+91-11-2345-6789', 'reservations@tivolibijwasan.com', false, 6),

    -- Omnia Hotels
    ('omnia-dwarka-expressway', 'Omnia Dwarka Expressway', omnia_id, delhi_id,
     'Contemporary luxury hotel on Dwarka Expressway featuring modern design and state-of-the-art facilities.', 
     4.7, 'Dwarka Expressway', 'Gurgaon', 'Haryana', '122001', '+91-124-4567890', 'info@omniadwarka.com', true, 7),
     
    ('omnia-greater-noida', 'Omnia Greater Noida', omnia_id, greater_noida_id,
     'Sophisticated hotel in Greater Noida offering premium accommodations with modern amenities and exceptional service.', 
     4.5, 'Knowledge Park', 'Greater Noida', 'Uttar Pradesh', '201310', '+91-120-7654321', 'reservations@omniagreaternoida.com', false, 8),

    -- Upper HSE Hotels  
    ('upper-hse-sultanpur', 'The Upper HSE Sultanpur', upper_hse_id, delhi_id,
     'Premium boutique hotel offering personalized service and elegant accommodations in a serene environment.', 
     4.6, 'Sultanpur', 'New Delhi', 'Delhi', '110030', '+91-11-3456-7890', 'info@upperhsesultanpur.com', false, 9),

    -- Wedcation Hotels
    ('wedcation-ambala', 'Wedcation Ambala', wedcation_id, ambala_id,
     'Premier destination wedding venue with comprehensive celebration services, beautiful gardens, and luxury accommodations.', 
     4.8, 'GT Road', 'Ambala', 'Haryana', '134003', '+91-171-2345678', 'weddings@wedcationambala.com', true, 10),
     
    ('wedcation-israna', 'Wedcation Israna', wedcation_id, israna_id,
     'Exclusive wedding destination offering traditional charm with modern facilities for memorable celebrations.', 
     4.7, 'Village Israna', 'Panipat', 'Haryana', '132103', '+91-180-3456789', 'events@wedcationisrana.com', true, 11);

END $$;

-- Insert default hotel policies for all hotels
INSERT INTO hotel_policies (hotel_id, check_in, check_out, cancellation, pets)
SELECT id, '2:00 PM', '12:00 PM', '24 hours before arrival', 'Pets allowed with prior approval'
FROM hotels;

-- Insert sample rooms for each hotel
DO $$
DECLARE
    hotel RECORD;
BEGIN
    FOR hotel IN SELECT id, slug FROM hotels LOOP
        -- Deluxe Room
        INSERT INTO rooms (hotel_id, name, description, size_display, max_occupancy, bed_type, price_inr, sort_order) 
        VALUES (hotel.id, 'Deluxe Room', 'Elegantly appointed room with modern amenities and city views', '35 sq.m.', 2, 'King Bed', 8000, 1);
        
        -- Suite
        INSERT INTO rooms (hotel_id, name, description, size_display, max_occupancy, bed_type, price_inr, sort_order) 
        VALUES (hotel.id, 'Executive Suite', 'Spacious suite with separate living area and premium amenities', '55 sq.m.', 4, 'King Bed + Sofa Bed', 15000, 2);
        
        -- Premium Room (for featured hotels)
        IF EXISTS (SELECT 1 FROM hotels WHERE id = hotel.id AND is_featured = true) THEN
            INSERT INTO rooms (hotel_id, name, description, size_display, max_occupancy, bed_type, price_inr, sort_order) 
            VALUES (hotel.id, 'Presidential Suite', 'Luxurious suite with panoramic views and exclusive amenities', '80 sq.m.', 6, 'King Bed + Twin Beds', 25000, 3);
        END IF;
    END LOOP;
END $$;

-- Insert sample dining options for each hotel
DO $$
DECLARE
    hotel RECORD;
BEGIN
    FOR hotel IN SELECT id, slug FROM hotels LOOP
        -- Main Restaurant
        INSERT INTO dining (hotel_id, name, description, cuisine, hours, sort_order) 
        VALUES (hotel.id, 'The Grand Restaurant', 'Multi-cuisine fine dining restaurant', 'Indian, Continental, Chinese', '7:00 AM - 11:00 PM', 1);
        
        -- Coffee Shop (for larger hotels)
        IF EXISTS (SELECT 1 FROM hotels WHERE id = hotel.id AND is_featured = true) THEN
            INSERT INTO dining (hotel_id, name, description, cuisine, hours, sort_order) 
            VALUES (hotel.id, 'Café Lounge', 'Casual dining café with light meals and beverages', 'Café, Snacks', '6:00 AM - 12:00 AM', 2);
        END IF;
    END LOOP;
END $$;

-- Link common amenities to hotels
DO $$
DECLARE
    hotel RECORD;
    wifi_id UUID;
    restaurant_id UUID;
    parking_id UUID;
    room_service_id UUID;
    fitness_id UUID;
    pool_id UUID;
    business_id UUID;
    airport_id UUID;
BEGIN
    -- Get amenity IDs
    SELECT id INTO wifi_id FROM amenities WHERE name = 'Free WiFi';
    SELECT id INTO restaurant_id FROM amenities WHERE name = 'Multi-Cuisine Restaurant';
    SELECT id INTO parking_id FROM amenities WHERE name = 'Parking';
    SELECT id INTO room_service_id FROM amenities WHERE name = 'Room Service';
    SELECT id INTO fitness_id FROM amenities WHERE name = 'Fitness Center';
    SELECT id INTO pool_id FROM amenities WHERE name = 'Swimming Pool';
    SELECT id INTO business_id FROM amenities WHERE name = 'Business Center';
    SELECT id INTO airport_id FROM amenities WHERE name = 'Airport Transfer';

    -- Add basic amenities to all hotels
    FOR hotel IN SELECT id FROM hotels LOOP
        INSERT INTO hotel_amenities (hotel_id, amenity_id, sort_order) VALUES
        (hotel.id, wifi_id, 1),
        (hotel.id, restaurant_id, 2),
        (hotel.id, parking_id, 3),
        (hotel.id, room_service_id, 4);
        
        -- Add premium amenities to featured hotels
        IF EXISTS (SELECT 1 FROM hotels WHERE id = hotel.id AND is_featured = true) THEN
            INSERT INTO hotel_amenities (hotel_id, amenity_id, sort_order) VALUES
            (hotel.id, fitness_id, 5),
            (hotel.id, pool_id, 6),
            (hotel.id, business_id, 7),
            (hotel.id, airport_id, 8);
        END IF;
    END LOOP;
END $$;

-- Add some hotel features for variety
DO $$
DECLARE
    hotel RECORD;
BEGIN
    FOR hotel IN SELECT id, slug FROM hotels LOOP
        INSERT INTO hotel_features (hotel_id, feature_name, sort_order) VALUES
        (hotel.id, '24/7 Front Desk', 1),
        (hotel.id, 'Concierge Service', 2),
        (hotel.id, 'Laundry Service', 3);
        
        -- Add wedding-specific features for Wedcation hotels
        IF hotel.slug LIKE 'wedcation-%' THEN
            INSERT INTO hotel_features (hotel_id, feature_name, sort_order) VALUES
            (hotel.id, 'Wedding Planning', 4),
            (hotel.id, 'Bridal Suite', 5),
            (hotel.id, 'Event Coordination', 6);
        END IF;
        
        -- Add business features for city hotels
        IF hotel.slug IN ('omnia-dwarka-expressway', 'tivoli-grand-palace', 'upper-hse-sultanpur') THEN
            INSERT INTO hotel_features (hotel_id, feature_name, sort_order) VALUES
            (hotel.id, 'Executive Lounge', 4),
            (hotel.id, 'Meeting Rooms', 5);
        END IF;
    END LOOP;
END $$;

-- Create some sample media entries (placeholders for now)
INSERT INTO media (filename, original_filename, file_type, supabase_path, public_url, alt_text, upload_source, tags) VALUES
-- Hero images
('tivoli-grand-palace-hero.jpg', 'grand-palace-main.jpg', 'image/jpeg', 'hotels/tivoli-grand-palace/hero.jpg', 'https://placeholder-for-supabase-storage/tivoli-grand-palace-hero.jpg', 'Tivoli Grand Palace exterior view', 'migration', ARRAY['hotel', 'exterior', 'hero']),
('tivoli-royal-palace-hero.jpg', 'royal-palace-main.jpg', 'image/jpeg', 'hotels/tivoli-royal-palace/hero.jpg', 'https://placeholder-for-supabase-storage/tivoli-royal-palace-hero.jpg', 'Tivoli Royal Palace heritage architecture', 'migration', ARRAY['hotel', 'heritage', 'hero']),
('wedcation-ambala-hero.jpg', 'wedcation-ambala-main.jpg', 'image/jpeg', 'hotels/wedcation-ambala/hero.jpg', 'https://placeholder-for-supabase-storage/wedcation-ambala-hero.jpg', 'Wedcation Ambala wedding venue', 'migration', ARRAY['wedding', 'venue', 'hero']);

-- Link featured images to hotels
DO $$
DECLARE
    hotel RECORD;
    media_id UUID;
BEGIN
    FOR hotel IN SELECT id, slug FROM hotels WHERE is_featured = true LIMIT 3 LOOP
        SELECT id INTO media_id FROM media WHERE filename LIKE hotel.slug || '%' LIMIT 1;
        IF media_id IS NOT NULL THEN
            UPDATE hotels SET featured_image_id = media_id WHERE id = hotel.id;
            INSERT INTO hotel_media (hotel_id, media_id, media_type, is_primary) 
            VALUES (hotel.id, media_id, 'hero', true);
        END IF;
    END LOOP;
END $$;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_hotels_featured_active ON hotels(is_featured, is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_hotel_amenities_hotel ON hotel_amenities(hotel_id);
CREATE INDEX IF NOT EXISTS idx_rooms_hotel ON rooms(hotel_id) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_dining_hotel ON dining(hotel_id) WHERE is_active = true;

-- Add RLS policies (Row Level Security)
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotel_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotel_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE dining ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotel_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotel_policies ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access on brands" ON brands FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access on locations" ON locations FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access on hotels" ON hotels FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access on media" ON media FOR SELECT USING (true);
CREATE POLICY "Public read access on hotel_media" ON hotel_media FOR SELECT USING (true);
CREATE POLICY "Public read access on amenities" ON amenities FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access on hotel_amenities" ON hotel_amenities FOR SELECT USING (true);
CREATE POLICY "Public read access on rooms" ON rooms FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access on dining" ON dining FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access on hotel_features" ON hotel_features FOR SELECT USING (true);
CREATE POLICY "Public read access on hotel_policies" ON hotel_policies FOR SELECT USING (true);

-- Create admin policies (for authenticated users with admin role)
-- Note: These will need to be adjusted based on your auth setup
CREATE POLICY "Admin full access on brands" ON brands FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access on locations" ON locations FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access on hotels" ON hotels FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access on media" ON media FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access on hotel_media" ON hotel_media FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access on amenities" ON amenities FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access on hotel_amenities" ON hotel_amenities FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access on rooms" ON rooms FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access on dining" ON dining FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access on hotel_features" ON hotel_features FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access on hotel_policies" ON hotel_policies FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Data validation checks
DO $$
DECLARE
    brand_count INTEGER;
    location_count INTEGER;
    hotel_count INTEGER;
    amenity_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO brand_count FROM brands;
    SELECT COUNT(*) INTO location_count FROM locations;
    SELECT COUNT(*) INTO hotel_count FROM hotels;
    SELECT COUNT(*) INTO amenity_count FROM amenities;
    
    RAISE NOTICE 'Data migration completed successfully!';
    RAISE NOTICE 'Inserted: % brands, % locations, % hotels, % amenities', 
                 brand_count, location_count, hotel_count, amenity_count;
                 
    -- Verify featured hotels
    SELECT COUNT(*) INTO hotel_count FROM hotels WHERE is_featured = true;
    RAISE NOTICE 'Featured hotels: %', hotel_count;
END $$;