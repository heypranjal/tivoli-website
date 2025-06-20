-- Seed Initial Data
-- Phase 1: Foundation Setup
-- Created: 2025-06-20

-- Insert brands
INSERT INTO brands (slug, name, display_name, description, brand_color, sort_order) VALUES
('tivoli', 'tivoli', 'THE TIVOLI', 'Premium luxury properties offering timeless elegance and sophisticated hospitality', '#CD9F59', 1),
('omnia', 'omnia', 'OMNIA', 'Contemporary urban luxury with modern sophistication and cutting-edge amenities', '#2563EB', 2),
('upper-hse', 'upper-hse', 'THE UPPER HSE', 'Modern boutique properties combining urban comfort with personalized service', '#7C3AED', 3),
('wedcation', 'wedcation', 'WEDCATION', 'Wedding and event-focused venues designed for memorable celebrations', '#EC4899', 4);

-- Insert locations
INSERT INTO locations (slug, name, state, country, display_order) VALUES
('delhi', 'Delhi', 'Delhi', 'India', 1),
('noida', 'Noida', 'Uttar Pradesh', 'India', 2),
('greater-noida', 'Greater Noida', 'Uttar Pradesh', 'India', 3),
('palwal-haryana', 'Palwal', 'Haryana', 'India', 4),
('rewari-haryana', 'Rewari', 'Haryana', 'India', 5),
('ambala', 'Ambala', 'Haryana', 'India', 6),
('israna', 'Israna', 'Haryana', 'India', 7);

-- Insert common amenities
INSERT INTO amenities (name, description, icon_name, category) VALUES
('High-Speed WiFi', 'Complimentary high-speed internet access throughout the property', 'Signal', 'business'),
('Swimming Pool', 'Temperature-controlled outdoor pool', 'Pool', 'recreation'),
('Fitness Center', '24/7 state-of-the-art fitness center with personal training', 'Dumbbell', 'wellness'),
('Fine Dining', 'Multiple award-winning restaurants and bars', 'Utensils', 'dining'),
('Valet Parking', 'Complimentary valet parking for hotel guests', 'Car', 'business'),
('Luxury Bar', 'Exclusive bar with premium spirits and wines', 'Wine', 'dining'),
('Luxury Spa', 'Full-service spa with signature treatments', 'Spa', 'wellness'),
('Executive Lounge', 'Private lounge with premium services and refreshments', 'Coffee', 'business'),
('Business Center', 'Full-service business center with meeting facilities', 'Briefcase', 'business'),
('Concierge Service', 'Personalized concierge services for guest assistance', 'User', 'business'),
('Room Service', '24/7 in-room dining service', 'Room', 'dining'),
('Banquet Hall', 'Elegant banquet facilities for events and celebrations', 'Calendar', 'recreation'),
('Terrace', 'Beautiful terrace areas for relaxation and events', 'Sun', 'recreation'),
('In-house Catering', 'Professional catering services for events', 'Chef', 'dining'),
('In-house Decor', 'Complete event decoration and styling services', 'Palette', 'recreation'),
('Infinity Pool', 'Stunning infinity pool with panoramic views', 'Pool', 'recreation'),
('Sky Bar', 'Rooftop bar with panoramic city views', 'Wine', 'dining'),
('Urban Spa', 'Modern spa with signature treatments', 'Spa', 'wellness'),
('Rooftop Pool', 'Temperature-controlled rooftop pool', 'Pool', 'recreation'),
('Smart Home Controls', 'Advanced room automation and controls', 'Home', 'business');

-- Create a function to get brand ID by slug
CREATE OR REPLACE FUNCTION get_brand_id(brand_slug TEXT)
RETURNS UUID AS $$
DECLARE
    brand_id UUID;
BEGIN
    SELECT id INTO brand_id FROM brands WHERE slug = brand_slug;
    RETURN brand_id;
END;
$$ LANGUAGE plpgsql;

-- Create a function to get location ID by slug
CREATE OR REPLACE FUNCTION get_location_id(location_slug TEXT)
RETURNS UUID AS $$
DECLARE
    location_id UUID;
BEGIN
    SELECT id INTO location_id FROM locations WHERE slug = location_slug;
    RETURN location_id;
END;
$$ LANGUAGE plpgsql;

-- Create a function to get amenity ID by name
CREATE OR REPLACE FUNCTION get_amenity_id(amenity_name TEXT)
RETURNS UUID AS $$
DECLARE
    amenity_id UUID;
BEGIN
    SELECT id INTO amenity_id FROM amenities WHERE name = amenity_name;
    RETURN amenity_id;
END;
$$ LANGUAGE plpgsql;