-- Migrate Hotel Data from Static Files
-- Phase 2: Data Migration
-- Created: 2025-06-20

-- Insert hotels data (mapping from src/data/hotels.ts)
-- Note: This requires the brands and locations to be inserted first

-- Helper function to get brand_id and location_id
DO $$
DECLARE
    tivoli_brand_id UUID;
    omnia_brand_id UUID;
    upper_hse_brand_id UUID;
    wedcation_brand_id UUID;
    
    delhi_location_id UUID;
    noida_location_id UUID;
    greater_noida_location_id UUID;
    palwal_location_id UUID;
    rewari_location_id UUID;
    ambala_location_id UUID;
    israna_location_id UUID;
BEGIN
    -- Get brand IDs
    SELECT id INTO tivoli_brand_id FROM brands WHERE slug = 'tivoli';
    SELECT id INTO omnia_brand_id FROM brands WHERE slug = 'omnia';
    SELECT id INTO upper_hse_brand_id FROM brands WHERE slug = 'upper-hse';
    SELECT id INTO wedcation_brand_id FROM brands WHERE slug = 'wedcation';
    
    -- Get location IDs
    SELECT id INTO delhi_location_id FROM locations WHERE slug = 'delhi';
    SELECT id INTO noida_location_id FROM locations WHERE slug = 'noida';
    SELECT id INTO greater_noida_location_id FROM locations WHERE slug = 'greater-noida';
    SELECT id INTO palwal_location_id FROM locations WHERE slug = 'palwal-haryana';
    SELECT id INTO rewari_location_id FROM locations WHERE slug = 'rewari-haryana';
    SELECT id INTO ambala_location_id FROM locations WHERE slug = 'ambala';
    SELECT id INTO israna_location_id FROM locations WHERE slug = 'israna';

    -- Insert Tivoli Hotels
    INSERT INTO hotels (slug, name, brand_id, location_id, description, rating, street, city, state, postal_code, latitude, longitude, phone, email, sort_order, is_featured) VALUES
    (
        'tivoli-grand-palace',
        'The Tivoli-New Delhi',
        tivoli_brand_id,
        delhi_location_id,
        'Experience unparalleled luxury at Tivoli Grand Palace, where timeless elegance meets modern sophistication. Nestled in the heart of Delhi, this architectural masterpiece offers a perfect blend of traditional Indian hospitality and contemporary comfort.',
        5.0,
        '1, Chattarpur',
        'New Delhi',
        'Delhi',
        '110074',
        28.5921,
        77.1691,
        '+91858885035,981855333, 011-47479999',
        'reservations@thetivolihotels.com',
        1,
        true
    ),
    (
        'tivoli-royal-suite',
        'Tivoli Royal Palace',
        tivoli_brand_id,
        palwal_location_id,
        'Experience unparalleled luxury at Tivoli Royal Palace, where timeless elegance meets modern sophistication. Nestled in the heart of Palwal-Haryana, this architectural masterpiece offers a perfect blend of traditional Indian hospitality and contemporary comfort.',
        5.0,
        'Bhagola NH 2, Beside Satya Sai Heart Hospital',
        'Palwal-Haryana',
        'Haryana',
        '110074',
        28.5921,
        77.1691,
        '9818553333',
        'reservations@thetivolihotels.com',
        2,
        true
    ),
    (
        'tivoli-lake-palace',
        'Tivoli Heritage Palace',
        tivoli_brand_id,
        rewari_location_id,
        'Experience unparalleled luxury at Tivoli Heritage Palace, where timeless elegance meets modern sophistication. Nestled in the heart of Rewari-Haryana, this architectural masterpiece offers a perfect blend of traditional Indian hospitality and contemporary comfort.',
        5.0,
        'Kanhawas,5PF3+53X Kanhawas',
        'Rewari',
        'Haryana',
        '123401',
        28.1991,
        76.6198,
        '+9818553333',
        'heritage@tivolihotels.com',
        3,
        true
    ),
    (
        'tivoli-lotus-court',
        'Tivoli Lotus Court',
        tivoli_brand_id,
        noida_location_id,
        'Experience unparalleled luxury at Tivoli Lotus Court, where timeless elegance meets modern sophistication. Nestled in the heart of Noida, this architectural masterpiece offers a perfect blend of traditional Indian hospitality and contemporary comfort.',
        5.0,
        '1, Sector 74 Main Rd, near Internal Capetown Society Road, Supertech Capetown, Sector 74, Noida, Uttar Pradesh 201009',
        'Noida',
        'Uttar Pradesh',
        '201301',
        28.5355,
        77.3910,
        '9212446306',
        'lotuscourt@tivolihotels.com',
        4,
        true
    ),
    (
        'tivoli-bijwasan',
        'Tivoli Bijwasan',
        tivoli_brand_id,
        delhi_location_id,
        'Experience unparalleled luxury at Tivoli Bijwasan, where timeless elegance meets modern sophistication. Nestled in the heart of Delhi, this architectural masterpiece offers a perfect blend of traditional Indian hospitality and contemporary comfort.',
        5.0,
        'Bijwasan Road',
        'New Delhi',
        'Delhi',
        '110061',
        28.5355,
        77.0910,
        '+91858885035',
        'bijwasan@tivolihotels.com',
        5,
        true
    ),
    (
        'royal-court-okhla',
        'Tivoli Royal Court-Okhla',
        tivoli_brand_id,
        delhi_location_id,
        'Experience the pinnacle of luxury and sophistication at Tivoli Royal Court, Okhla, where every wedding is a masterpiece crafted to perfection. Situated in the vibrant area of Okhla, this exquisite venue offers a stunning backdrop for your special day, combining elegance with modern amenities.',
        4.5,
        'D-185, Main Road',
        'Delhi',
        'Delhi',
        '110020',
        28.5456,
        77.2548,
        '+91858885035',
        'okhla@tivolihotels.com',
        6,
        false
    );

    -- Insert Omnia Hotels
    INSERT INTO hotels (slug, name, brand_id, location_id, description, rating, street, city, state, postal_code, latitude, longitude, phone, email, sort_order, is_featured) VALUES
    (
        'omnia-dwarka-expressway',
        'Omnia by Tivoli-Dwarka Expressway',
        omnia_brand_id,
        delhi_location_id,
        'Experience contemporary luxury at Omnia by Tivoli-Dwarka Expressway, where modern sophistication meets urban comfort. Located in the prestigious Dwarka Expressway area, this modern masterpiece offers an unparalleled blend of urban elegance and refined hospitality.',
        5.0,
        'Dwarka Expressway',
        'New Delhi',
        'Delhi',
        '110077',
        28.5921,
        77.1691,
        '+91858885035',
        'dwarka@tivolihotels.com',
        7,
        true
    ),
    (
        'omnia-greater-noida',
        'Omnia by Tivoli-Greater Noida',
        omnia_brand_id,
        greater_noida_location_id,
        'Experience contemporary luxury at Omnia by Tivoli-Greater Noida, where modern sophistication meets urban comfort. Located in the prestigious Greater Noida area, this modern masterpiece offers an unparalleled blend of urban elegance and refined hospitality.',
        5.0,
        'Knowledge Park III',
        'Greater Noida',
        'Uttar Pradesh',
        '201310',
        28.4744,
        77.5040,
        '+91858885035',
        'greaternoida@tivolihotels.com',
        8,
        true
    );

    -- Insert Upper HSE Hotels
    INSERT INTO hotels (slug, name, brand_id, location_id, description, rating, street, city, state, postal_code, latitude, longitude, phone, email, sort_order, is_featured) VALUES
    (
        'upper-hse-sultanpur',
        'The Upper HSE by Tivoli-Sultanpur',
        upper_hse_brand_id,
        delhi_location_id,
        'Experience contemporary luxury at The Upper HSE by Tivoli-Sultanpur, where modern sophistication meets urban comfort. Located in the prestigious Sultanpur area, this modern masterpiece offers an unparalleled blend of urban elegance and refined hospitality.',
        5.0,
        'Sultanpur, Delhi',
        'Delhi',
        'Delhi',
        '110030',
        28.5005,
        77.1526,
        '+91858885035',
        'sultanpur@upperhse.com',
        9,
        true
    );

    -- Insert Wedcation Hotels
    INSERT INTO hotels (slug, name, brand_id, location_id, description, rating, street, city, state, postal_code, latitude, longitude, phone, email, sort_order, is_featured) VALUES
    (
        'wedcation-ambala',
        'Wedcation by Tivoli-Ambala',
        wedcation_brand_id,
        ambala_location_id,
        'Experience unparalleled luxury at Wedcation by Tivoli-Ambala, where timeless elegance meets modern sophistication. Nestled in the heart of Ambala, this architectural masterpiece offers a perfect blend of traditional Indian hospitality and contemporary comfort.',
        5.0,
        'NH-65, ambala - hissar rd, village durkhara, ambala, haryana 134003',
        'Ambala',
        'Haryana',
        '134003',
        30.3744,
        76.7763,
        '+917075970555',
        'info@wedcationbytivoli.com',
        10,
        true
    ),
    (
        'wedcation-israna',
        'Wedcation by Tivoli-Israna',
        wedcation_brand_id,
        israna_location_id,
        'Experience unparalleled luxury at Wedcation by Tivoli-Israna, where timeless elegance meets modern sophistication. Nestled in the heart of Israna, this architectural masterpiece offers a perfect blend of traditional Indian hospitality and contemporary comfort.',
        5.0,
        'NH-44, Israna, Panipat, Haryana 132107',
        'Israna',
        'Haryana',
        '132107',
        29.2744,
        76.9763,
        '+917075970555',
        'info@wedcationbytivoli.com',
        11,
        true
    );

END $$;