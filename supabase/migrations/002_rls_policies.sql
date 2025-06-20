-- Row Level Security Policies
-- Phase 1: Foundation Setup
-- Created: 2025-06-20

-- Enable RLS on all tables
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotel_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotel_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE dining ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotel_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotel_policies ENABLE ROW LEVEL SECURITY;

-- Public read access for all active content
-- These policies allow anonymous users to view published content

-- Brands policies
CREATE POLICY "Allow public read access to active brands" ON brands
    FOR SELECT USING (is_active = true);

-- Locations policies
CREATE POLICY "Allow public read access to active locations" ON locations
    FOR SELECT USING (is_active = true);

-- Media policies (public read for images used in active hotels)
CREATE POLICY "Allow public read access to media" ON media
    FOR SELECT USING (true);

-- Hotels policies
CREATE POLICY "Allow public read access to active hotels" ON hotels
    FOR SELECT USING (is_active = true);

-- Hotel media policies
CREATE POLICY "Allow public read access to hotel media" ON hotel_media
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM hotels 
            WHERE hotels.id = hotel_media.hotel_id 
            AND hotels.is_active = true
        )
    );

-- Amenities policies
CREATE POLICY "Allow public read access to active amenities" ON amenities
    FOR SELECT USING (is_active = true);

-- Hotel amenities policies
CREATE POLICY "Allow public read access to hotel amenities" ON hotel_amenities
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM hotels 
            WHERE hotels.id = hotel_amenities.hotel_id 
            AND hotels.is_active = true
        )
    );

-- Rooms policies
CREATE POLICY "Allow public read access to rooms of active hotels" ON rooms
    FOR SELECT USING (
        is_active = true AND
        EXISTS (
            SELECT 1 FROM hotels 
            WHERE hotels.id = rooms.hotel_id 
            AND hotels.is_active = true
        )
    );

-- Room amenities policies
CREATE POLICY "Allow public read access to room amenities" ON room_amenities
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM rooms 
            JOIN hotels ON hotels.id = rooms.hotel_id
            WHERE rooms.id = room_amenities.room_id 
            AND rooms.is_active = true
            AND hotels.is_active = true
        )
    );

-- Dining policies
CREATE POLICY "Allow public read access to dining of active hotels" ON dining
    FOR SELECT USING (
        is_active = true AND
        EXISTS (
            SELECT 1 FROM hotels 
            WHERE hotels.id = dining.hotel_id 
            AND hotels.is_active = true
        )
    );

-- Hotel features policies
CREATE POLICY "Allow public read access to hotel features" ON hotel_features
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM hotels 
            WHERE hotels.id = hotel_features.hotel_id 
            AND hotels.is_active = true
        )
    );

-- Hotel policies policies
CREATE POLICY "Allow public read access to hotel policies" ON hotel_policies
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM hotels 
            WHERE hotels.id = hotel_policies.hotel_id 
            AND hotels.is_active = true
        )
    );

-- Admin policies (for future admin interface)
-- Note: These will be restricted to authenticated admin users when auth is implemented

-- For now, allow all operations for development
-- TODO: Restrict to authenticated admin users in production

CREATE POLICY "Allow admin full access to brands" ON brands
    FOR ALL USING (true);

CREATE POLICY "Allow admin full access to locations" ON locations
    FOR ALL USING (true);

CREATE POLICY "Allow admin full access to media" ON media
    FOR ALL USING (true);

CREATE POLICY "Allow admin full access to hotels" ON hotels
    FOR ALL USING (true);

CREATE POLICY "Allow admin full access to hotel_media" ON hotel_media
    FOR ALL USING (true);

CREATE POLICY "Allow admin full access to amenities" ON amenities
    FOR ALL USING (true);

CREATE POLICY "Allow admin full access to hotel_amenities" ON hotel_amenities
    FOR ALL USING (true);

CREATE POLICY "Allow admin full access to rooms" ON rooms
    FOR ALL USING (true);

CREATE POLICY "Allow admin full access to room_amenities" ON room_amenities
    FOR ALL USING (true);

CREATE POLICY "Allow admin full access to dining" ON dining
    FOR ALL USING (true);

CREATE POLICY "Allow admin full access to hotel_features" ON hotel_features
    FOR ALL USING (true);

CREATE POLICY "Allow admin full access to hotel_policies" ON hotel_policies
    FOR ALL USING (true);

-- Create a function to check if user is admin (for future use)
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    -- TODO: Implement proper admin check based on auth.users and roles
    -- For now, return true for development
    RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;