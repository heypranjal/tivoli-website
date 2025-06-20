-- Migrate Rooms and Dining Data
-- Phase 2: Data Migration  
-- Created: 2025-06-20

-- Insert rooms and dining data for hotels
DO $$
DECLARE
    hotel_rec RECORD;
BEGIN
    -- Insert rooms for each hotel
    FOR hotel_rec IN SELECT id, slug FROM hotels LOOP
        
        -- Rooms for main Tivoli properties
        IF hotel_rec.slug IN ('tivoli-grand-palace', 'tivoli-royal-suite', 'tivoli-lake-palace') THEN
            
            -- Deluxe Room
            INSERT INTO rooms (hotel_id, name, description, size_display, max_occupancy, bed_type, price_inr, sort_order) VALUES
            (hotel_rec.id, 'Deluxe Room', 'Elegant 45 sq.m. room with city views and luxury amenities', '45 sq.m.', 2, 'King or Twin', 25000, 1);
            
            -- Palace Suite (for main properties)
            IF hotel_rec.slug IN ('tivoli-grand-palace', 'tivoli-royal-suite') THEN
                INSERT INTO rooms (hotel_id, name, description, size_display, max_occupancy, bed_type, price_inr, sort_order) VALUES
                (hotel_rec.id, 'Palace Suite', 'Luxurious 90 sq.m. suite with separate living area and palace views', '90 sq.m.', 3, 'King', 45000, 2);
            END IF;
            
            -- Heritage Room for Heritage Palace
            IF hotel_rec.slug = 'tivoli-lake-palace' THEN
                INSERT INTO rooms (hotel_id, name, description, size_display, max_occupancy, bed_type, price_inr, sort_order) VALUES
                (hotel_rec.id, 'Heritage Room', 'Elegant 45 sq.m. room with heritage views and luxury amenities', '45 sq.m.', 2, 'King or Twin', 25000, 2);
            END IF;
        END IF;
        
        -- Rooms for other Tivoli properties
        IF hotel_rec.slug IN ('tivoli-lotus-court', 'tivoli-bijwasan', 'royal-court-okhla') THEN
            INSERT INTO rooms (hotel_id, name, description, size_display, max_occupancy, bed_type, price_inr, sort_order) VALUES
            (hotel_rec.id, 'Deluxe Room', 'Elegant room with city views and luxury amenities', '350 sq. ft.', 2, 'King or Twin', 
             CASE WHEN hotel_rec.slug = 'royal-court-okhla' THEN 15000 ELSE 25000 END, 1);
        END IF;
        
        -- Rooms for Omnia properties
        IF hotel_rec.slug IN ('omnia-dwarka-expressway', 'omnia-greater-noida') THEN
            INSERT INTO rooms (hotel_id, name, description, size_display, max_occupancy, bed_type, price_inr, sort_order) VALUES
            (hotel_rec.id, 'Urban Suite', 'Contemporary 55 sq.m. suite with city views and modern amenities', '55 sq.m.', 2, 'King', 35000, 1);
        END IF;
        
        -- Rooms for Upper HSE
        IF hotel_rec.slug = 'upper-hse-sultanpur' THEN
            INSERT INTO rooms (hotel_id, name, description, size_display, max_occupancy, bed_type, price_inr, sort_order) VALUES
            (hotel_rec.id, 'Urban Suite', 'Contemporary 55 sq.m. suite with city views and modern amenities', '55 sq.m.', 2, 'King', 30000, 1);
        END IF;
        
        -- Rooms for Wedcation properties
        IF hotel_rec.slug IN ('wedcation-ambala', 'wedcation-israna') THEN
            INSERT INTO rooms (hotel_id, name, description, size_display, max_occupancy, bed_type, price_inr, sort_order) VALUES
            (hotel_rec.id, 'Deluxe Room', 'Elegant 45 sq.m. room with city views and luxury amenities', '45 sq.m.', 2, 'King or Twin', 25000, 1);
        END IF;
        
    END LOOP;
    
    -- Insert room amenities for all rooms
    INSERT INTO room_amenities (room_id, amenity_name)
    SELECT r.id, unnest(ARRAY['City View', 'Rain Shower', 'Mini Bar', 'Smart TV', '24/7 Room Service'])
    FROM rooms r
    JOIN hotels h ON h.id = r.hotel_id
    WHERE h.slug IN ('tivoli-grand-palace', 'tivoli-royal-suite', 'tivoli-lake-palace', 
                     'tivoli-lotus-court', 'tivoli-bijwasan', 'wedcation-ambala', 'wedcation-israna');
    
    -- Special amenities for suites
    INSERT INTO room_amenities (room_id, amenity_name)
    SELECT r.id, unnest(ARRAY['Palace View', 'Private Balcony', 'Butler Service', 'Jacuzzi', 'Lounge Access'])
    FROM rooms r
    JOIN hotels h ON h.id = r.hotel_id
    WHERE r.name = 'Palace Suite';
    
    -- Modern amenities for Omnia and Upper HSE
    INSERT INTO room_amenities (room_id, amenity_name)
    SELECT r.id, unnest(ARRAY['City View', 'Rain Shower', 'Smart Home Controls', 'Smart TV', '24/7 Room Service'])
    FROM rooms r
    JOIN hotels h ON h.id = r.hotel_id
    WHERE h.slug IN ('omnia-dwarka-expressway', 'omnia-greater-noida', 'upper-hse-sultanpur');
    
    -- Special amenities for Royal Court Okhla
    INSERT INTO room_amenities (room_id, amenity_name)
    SELECT r.id, unnest(ARRAY['City View', 'Mini Bar', 'Smart TV', '24/7 Room Service'])
    FROM rooms r
    JOIN hotels h ON h.id = r.hotel_id
    WHERE h.slug = 'royal-court-okhla';
    
END $$;

-- Insert dining options
DO $$
DECLARE
    hotel_rec RECORD;
BEGIN
    FOR hotel_rec IN SELECT id, slug FROM hotels LOOP
        
        -- Dining for Tivoli Grand Palace (multiple restaurants)
        IF hotel_rec.slug = 'tivoli-grand-palace' THEN
            INSERT INTO dining (hotel_id, name, description, cuisine, hours, dress_code, sort_order) VALUES
            (hotel_rec.id, 'Blue Grotto', 'Award-winning restaurant featuring pan-Asian cuisine', 'Pan-Asian', '12:30 PM - 11:30 PM', 'Smart Casual', 1),
            (hotel_rec.id, 'Zuun', 'Award-winning restaurant featuring pan-Asian cuisine', 'Pan-Asian', '12:30 PM - 11:30 PM', 'Smart Casual', 2),
            (hotel_rec.id, 'Aria', 'Fine dining restaurant serving modern Indian cuisine', 'Modern Indian', '7:00 PM - 11:00 PM', 'Formal', 3),
            (hotel_rec.id, 'Trafalgar''s', 'Award-winning restaurant featuring pan-Asian cuisine', 'Pan-Asian', '12:30 PM - 11:30 PM', 'Smart Casual', 4);
        END IF;
        
        -- Dining for Royal Palace
        IF hotel_rec.slug = 'tivoli-royal-suite' THEN
            INSERT INTO dining (hotel_id, name, description, cuisine, hours, dress_code, sort_order) VALUES
            (hotel_rec.id, 'The Royal Dining Hall', 'Exquisite dining experience with traditional Indian cuisine.', 'Indian', '7:00 PM - 11:00 PM', 'Formal', 1);
        END IF;
        
        -- Dining for Lotus Court
        IF hotel_rec.slug = 'tivoli-lotus-court' THEN
            INSERT INTO dining (hotel_id, name, description, cuisine, hours, dress_code, sort_order) VALUES
            (hotel_rec.id, 'The Lotus Dining Hall', 'Exquisite dining experience with traditional Indian cuisine.', 'Indian', '7:00 PM - 11:00 PM', 'Formal', 1);
        END IF;
        
        -- Dining for Bijwasan
        IF hotel_rec.slug = 'tivoli-bijwasan' THEN
            INSERT INTO dining (hotel_id, name, description, cuisine, hours, dress_code, sort_order) VALUES
            (hotel_rec.id, 'The Bijwasan Dining Hall', 'Exquisite dining experience with traditional Indian cuisine.', 'Indian', '7:00 PM - 11:00 PM', 'Formal', 1);
        END IF;
        
        -- Dining for Royal Court Okhla
        IF hotel_rec.slug = 'royal-court-okhla' THEN
            INSERT INTO dining (hotel_id, name, description, cuisine, hours, dress_code, sort_order) VALUES
            (hotel_rec.id, 'The Royal Court Dining Hall', 'Exquisite dining experience with traditional Indian cuisine.', 'Indian', '7:00 PM - 11:00 PM', 'Formal', 1);
        END IF;
        
        -- Dining for Omnia Dwarka
        IF hotel_rec.slug = 'omnia-dwarka-expressway' THEN
            INSERT INTO dining (hotel_id, name, description, cuisine, hours, dress_code, sort_order) VALUES
            (hotel_rec.id, 'Altitude', 'Modern rooftop restaurant with panoramic city views.', 'Contemporary Global', '12:00 PM - 12:00 AM', 'Smart Casual', 1);
        END IF;
        
        -- Dining for Omnia Greater Noida
        IF hotel_rec.slug = 'omnia-greater-noida' THEN
            INSERT INTO dining (hotel_id, name, description, cuisine, hours, dress_code, sort_order) VALUES
            (hotel_rec.id, 'Skyline', 'Modern rooftop restaurant with panoramic city views.', 'Contemporary Global', '12:00 PM - 12:00 AM', 'Smart Casual', 1);
        END IF;
        
        -- Dining for Upper HSE
        IF hotel_rec.slug = 'upper-hse-sultanpur' THEN
            INSERT INTO dining (hotel_id, name, description, cuisine, hours, dress_code, sort_order) VALUES
            (hotel_rec.id, 'Elevation', 'Modern rooftop restaurant with panoramic city views.', 'Contemporary Global', '12:00 PM - 12:00 AM', 'Smart Casual', 1);
        END IF;
        
        -- Dining for Wedcation Ambala
        IF hotel_rec.slug = 'wedcation-ambala' THEN
            INSERT INTO dining (hotel_id, name, description, cuisine, hours, dress_code, sort_order) VALUES
            (hotel_rec.id, 'The Wedcation Dining Hall', 'Exquisite dining experience with traditional Indian cuisine.', 'Indian', '7:00 PM - 11:00 PM', 'Formal', 1);
        END IF;
        
        -- Dining for Wedcation Israna
        IF hotel_rec.slug = 'wedcation-israna' THEN
            INSERT INTO dining (hotel_id, name, description, cuisine, hours, dress_code, sort_order) VALUES
            (hotel_rec.id, 'The Wedcation Dining Hall', 'Exquisite dining experience with traditional Indian cuisine.', 'Indian', '7:00 PM - 11:00 PM', 'Formal', 1);
        END IF;
        
    END LOOP;
END $$;

-- Insert hotel policies for all hotels
INSERT INTO hotel_policies (hotel_id, check_in, check_out, cancellation, pets)
SELECT id, '2:00 PM', '12:00 PM', '24 hours before arrival', 'Not allowed'
FROM hotels;