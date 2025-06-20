-- Migrate Hotel Amenities and Features
-- Phase 2: Data Migration
-- Created: 2025-06-20

-- Insert hotel amenities relationships and features
DO $$
DECLARE
    hotel_rec RECORD;
    amenity_id UUID;
BEGIN
    -- Get all hotels and add their amenities
    FOR hotel_rec IN SELECT id, slug FROM hotels LOOP
        
        -- Common amenities for all Tivoli brand hotels
        IF hotel_rec.slug IN ('tivoli-grand-palace', 'tivoli-royal-suite', 'tivoli-lake-palace', 
                              'tivoli-lotus-court', 'tivoli-bijwasan', 'royal-court-okhla') THEN
            
            -- Add WiFi
            SELECT id INTO amenity_id FROM amenities WHERE name = 'High-Speed WiFi';
            INSERT INTO hotel_amenities (hotel_id, amenity_id, sort_order) VALUES 
            (hotel_rec.id, amenity_id, 1);
            
            -- Add Parking
            SELECT id INTO amenity_id FROM amenities WHERE name = 'Valet Parking';
            INSERT INTO hotel_amenities (hotel_id, amenity_id, sort_order) VALUES 
            (hotel_rec.id, amenity_id, 2);
            
            -- Add Dining
            SELECT id INTO amenity_id FROM amenities WHERE name = 'Fine Dining';
            INSERT INTO hotel_amenities (hotel_id, amenity_id, sort_order) VALUES 
            (hotel_rec.id, amenity_id, 3);
            
            -- Add Executive Lounge
            SELECT id INTO amenity_id FROM amenities WHERE name = 'Executive Lounge';
            INSERT INTO hotel_amenities (hotel_id, amenity_id, sort_order) VALUES 
            (hotel_rec.id, amenity_id, 4);
        END IF;
        
        -- Premium amenities for main Tivoli properties
        IF hotel_rec.slug IN ('tivoli-grand-palace', 'tivoli-royal-suite', 'tivoli-lake-palace', 
                              'tivoli-lotus-court', 'tivoli-bijwasan') THEN
            
            -- Add Pool
            SELECT id INTO amenity_id FROM amenities WHERE name = 'Swimming Pool';
            INSERT INTO hotel_amenities (hotel_id, amenity_id, sort_order) VALUES 
            (hotel_rec.id, amenity_id, 5);
            
            -- Add Fitness
            SELECT id INTO amenity_id FROM amenities WHERE name = 'Fitness Center';
            INSERT INTO hotel_amenities (hotel_id, amenity_id, sort_order) VALUES 
            (hotel_rec.id, amenity_id, 6);
            
            -- Add Spa
            SELECT id INTO amenity_id FROM amenities WHERE name = 'Luxury Spa';
            INSERT INTO hotel_amenities (hotel_id, amenity_id, sort_order) VALUES 
            (hotel_rec.id, amenity_id, 7);
            
            -- Add Bar
            SELECT id INTO amenity_id FROM amenities WHERE name = 'Luxury Bar';
            INSERT INTO hotel_amenities (hotel_id, amenity_id, sort_order) VALUES 
            (hotel_rec.id, amenity_id, 8);
        END IF;
        
        -- Special amenities for Omnia brand
        IF hotel_rec.slug IN ('omnia-dwarka-expressway', 'omnia-greater-noida') THEN
            
            -- Add WiFi
            SELECT id INTO amenity_id FROM amenities WHERE name = 'High-Speed WiFi';
            INSERT INTO hotel_amenities (hotel_id, amenity_id, sort_order) VALUES 
            (hotel_rec.id, amenity_id, 1);
            
            -- Add Infinity Pool
            SELECT id INTO amenity_id FROM amenities WHERE name = 'Infinity Pool';
            INSERT INTO hotel_amenities (hotel_id, amenity_id, sort_order) VALUES 
            (hotel_rec.id, amenity_id, 2);
            
            -- Add Fitness
            SELECT id INTO amenity_id FROM amenities WHERE name = 'Fitness Center';
            INSERT INTO hotel_amenities (hotel_id, amenity_id, sort_order) VALUES 
            (hotel_rec.id, amenity_id, 3);
            
            -- Add Sky Bar
            SELECT id INTO amenity_id FROM amenities WHERE name = 'Sky Bar';
            INSERT INTO hotel_amenities (hotel_id, amenity_id, sort_order) VALUES 
            (hotel_rec.id, amenity_id, 4);
            
            -- Add Urban Spa
            SELECT id INTO amenity_id FROM amenities WHERE name = 'Urban Spa';
            INSERT INTO hotel_amenities (hotel_id, amenity_id, sort_order) VALUES 
            (hotel_rec.id, amenity_id, 5);
            
            -- Add Parking
            SELECT id INTO amenity_id FROM amenities WHERE name = 'Valet Parking';
            INSERT INTO hotel_amenities (hotel_id, amenity_id, sort_order) VALUES 
            (hotel_rec.id, amenity_id, 6);
        END IF;
        
        -- Special amenities for Upper HSE
        IF hotel_rec.slug = 'upper-hse-sultanpur' THEN
            
            -- Add WiFi
            SELECT id INTO amenity_id FROM amenities WHERE name = 'High-Speed WiFi';
            INSERT INTO hotel_amenities (hotel_id, amenity_id, sort_order) VALUES 
            (hotel_rec.id, amenity_id, 1);
            
            -- Add Rooftop Pool
            SELECT id INTO amenity_id FROM amenities WHERE name = 'Rooftop Pool';
            INSERT INTO hotel_amenities (hotel_id, amenity_id, sort_order) VALUES 
            (hotel_rec.id, amenity_id, 2);
            
            -- Add Fitness
            SELECT id INTO amenity_id FROM amenities WHERE name = 'Fitness Center';
            INSERT INTO hotel_amenities (hotel_id, amenity_id, sort_order) VALUES 
            (hotel_rec.id, amenity_id, 3);
            
            -- Add Sky Bar
            SELECT id INTO amenity_id FROM amenities WHERE name = 'Sky Bar';
            INSERT INTO hotel_amenities (hotel_id, amenity_id, sort_order) VALUES 
            (hotel_rec.id, amenity_id, 4);
        END IF;
        
        -- Amenities for Wedcation properties
        IF hotel_rec.slug IN ('wedcation-ambala', 'wedcation-israna') THEN
            
            -- Add WiFi
            SELECT id INTO amenity_id FROM amenities WHERE name = 'High-Speed WiFi';
            INSERT INTO hotel_amenities (hotel_id, amenity_id, sort_order) VALUES 
            (hotel_rec.id, amenity_id, 1);
            
            -- Add Pool
            SELECT id INTO amenity_id FROM amenities WHERE name = 'Swimming Pool';
            INSERT INTO hotel_amenities (hotel_id, amenity_id, sort_order) VALUES 
            (hotel_rec.id, amenity_id, 2);
            
            -- Add Fitness
            SELECT id INTO amenity_id FROM amenities WHERE name = 'Fitness Center';
            INSERT INTO hotel_amenities (hotel_id, amenity_id, sort_order) VALUES 
            (hotel_rec.id, amenity_id, 3);
            
            -- Add Dining
            SELECT id INTO amenity_id FROM amenities WHERE name = 'Fine Dining';
            INSERT INTO hotel_amenities (hotel_id, amenity_id, sort_order) VALUES 
            (hotel_rec.id, amenity_id, 4);
            
            -- Add Banquet Hall
            SELECT id INTO amenity_id FROM amenities WHERE name = 'Banquet Hall';
            INSERT INTO hotel_amenities (hotel_id, amenity_id, sort_order) VALUES 
            (hotel_rec.id, amenity_id, 5);
        END IF;
    END LOOP;
    
    -- Insert hotel features
    INSERT INTO hotel_features (hotel_id, feature_name, sort_order) 
    SELECT h.id, unnest(ARRAY[
        'Heritage Architecture',
        'Luxury Spa', 
        'Multiple Restaurants',
        'Outdoor Pool',
        'Business Center',
        'Wedding Venues',
        'Concierge Service',
        '24/7 Room Service'
    ]), generate_series(1, 8)
    FROM hotels h 
    WHERE h.slug IN ('tivoli-grand-palace', 'tivoli-royal-suite', 'tivoli-lake-palace', 
                     'tivoli-lotus-court', 'tivoli-bijwasan');
    
    -- Features for Royal Court Okhla (simplified)
    INSERT INTO hotel_features (hotel_id, feature_name, sort_order) 
    SELECT h.id, unnest(ARRAY[
        'Banquet Hall',
        'Terrace',
        'Valet Parking',
        'In-house Catering',
        'In-house Decor'
    ]), generate_series(1, 5)
    FROM hotels h 
    WHERE h.slug = 'royal-court-okhla';
    
    -- Features for Omnia properties
    INSERT INTO hotel_features (hotel_id, feature_name, sort_order) 
    SELECT h.id, unnest(ARRAY[
        'Contemporary Architecture',
        'Urban Spa',
        'Rooftop Restaurant',
        'Infinity Pool',
        'Business Center',
        'Event Spaces',
        'Concierge Service',
        '24/7 Room Service'
    ]), generate_series(1, 8)
    FROM hotels h 
    WHERE h.slug IN ('omnia-dwarka-expressway', 'omnia-greater-noida');
    
    -- Features for Upper HSE
    INSERT INTO hotel_features (hotel_id, feature_name, sort_order) 
    SELECT h.id, unnest(ARRAY[
        'Contemporary Architecture',
        'Urban Spa',
        'Rooftop Restaurant',
        'Infinity Pool',
        'Business Center',
        'Event Spaces',
        'Concierge Service',
        '24/7 Room Service'
    ]), generate_series(1, 8)
    FROM hotels h 
    WHERE h.slug = 'upper-hse-sultanpur';
    
    -- Features for Wedcation properties
    INSERT INTO hotel_features (hotel_id, feature_name, sort_order) 
    SELECT h.id, unnest(ARRAY[
        'Heritage Architecture',
        'Luxury Spa',
        'Multiple Restaurants',
        'Outdoor Pool',
        'Business Center',
        'Wedding Venues',
        'Concierge Service',
        '24/7 Room Service'
    ]), generate_series(1, 8)
    FROM hotels h 
    WHERE h.slug IN ('wedcation-ambala', 'wedcation-israna');
END $$;