-- Hotel Enhanced Content Schema
-- Migration: 007_hotel_enhanced_content.sql
-- Purpose: Add enhanced content tables for hotel experiences, spaces, virtual tours, statistics, and social media
-- Created: 2025-06-21
-- Agent: Database Setup Agent

-- Create hotel_spaces table for event venues and spaces
CREATE TABLE IF NOT EXISTS hotel_spaces (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hotel_id UUID NOT NULL REFERENCES hotels(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    space_type VARCHAR(50) NOT NULL, -- 'banquet', 'conference', 'wedding', 'outdoor', 'restaurant', 'bar', 'pool', 'spa', 'gym', 'other'
    capacity_theater INTEGER, -- Theater style seating
    capacity_classroom INTEGER, -- Classroom style seating
    capacity_banquet INTEGER, -- Banquet/dining capacity
    capacity_reception INTEGER, -- Reception/cocktail capacity
    capacity_boardroom INTEGER, -- Boardroom capacity
    area_sqm DECIMAL(10,2), -- Area in square meters
    area_display VARCHAR(50), -- Display format "450 sq.m."
    ceiling_height DECIMAL(5,2), -- Height in meters
    features TEXT[], -- Array of features ['natural light', 'AV equipment', 'stage', 'dance floor']
    amenities TEXT[], -- Array of amenities ['WiFi', 'air conditioning', 'parking']
    location_floor VARCHAR(50), -- 'Ground Floor', 'First Floor', 'Rooftop', etc.
    image_id UUID REFERENCES media(id), -- Primary image
    pricing_info JSONB, -- Flexible pricing structure
    availability_notes TEXT, -- Special availability information
    sort_order INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create hotel_experiences table for curated experiences and activities
CREATE TABLE IF NOT EXISTS hotel_experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hotel_id UUID NOT NULL REFERENCES hotels(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    short_description VARCHAR(500), -- Brief description for cards
    experience_type VARCHAR(50) NOT NULL, -- 'dining', 'wellness', 'recreation', 'cultural', 'business', 'romantic', 'family', 'adventure'
    duration_minutes INTEGER, -- Duration in minutes
    duration_display VARCHAR(50), -- Display format "2-3 hours", "Full day"
    price_inr INTEGER, -- Price per person in INR
    price_display VARCHAR(100), -- Display format "₹5,000 per person"
    max_participants INTEGER, -- Maximum number of participants
    min_participants INTEGER DEFAULT 1, -- Minimum number of participants
    age_restrictions VARCHAR(100), -- Age restrictions if any
    includes TEXT[], -- What's included ['welcome drink', 'guided tour', 'certificate']
    requirements TEXT[], -- Requirements ['advance booking', 'proper attire']
    availability_schedule VARCHAR(200), -- When available
    booking_advance_days INTEGER DEFAULT 1, -- How many days advance booking required
    image_id UUID REFERENCES media(id), -- Primary experience image
    gallery_images UUID[], -- Array of media IDs for gallery
    contact_info JSONB, -- Contact details for booking
    external_url TEXT, -- Link to external booking/info page
    sort_order INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    is_seasonal BOOLEAN DEFAULT false, -- If experience is seasonal
    season_info TEXT, -- Seasonal availability info
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create hotel_virtual_tours table for 3D tours and virtual experiences
CREATE TABLE IF NOT EXISTS hotel_virtual_tours (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hotel_id UUID NOT NULL REFERENCES hotels(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    tour_type VARCHAR(50) NOT NULL, -- 'matterport', 'spalba', '360_image', 'video_tour', 'virtual_reality'
    tour_url TEXT NOT NULL, -- URL to the virtual tour
    embed_code TEXT, -- Iframe embed code if applicable
    thumbnail_id UUID REFERENCES media(id), -- Thumbnail image
    duration_seconds INTEGER, -- Tour duration if applicable
    areas_covered TEXT[], -- Areas covered ['lobby', 'rooms', 'dining', 'spa', 'gardens']
    interactive_features TEXT[], -- Interactive features ['hotspots', 'navigation', 'info_panels']
    device_compatibility TEXT[], -- Compatible devices ['desktop', 'mobile', 'tablet', 'vr_headset']
    loading_instructions TEXT, -- Instructions for users
    technical_requirements TEXT, -- System requirements
    sort_order INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false, -- Featured on main page
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create hotel_statistics table for key metrics and achievements
CREATE TABLE IF NOT EXISTS hotel_statistics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hotel_id UUID NOT NULL REFERENCES hotels(id) ON DELETE CASCADE,
    metric_type VARCHAR(50) NOT NULL, -- 'guest_satisfaction', 'occupancy_rate', 'awards', 'years_established', 'rooms_count', 'events_hosted'
    metric_name VARCHAR(100) NOT NULL, -- Display name
    metric_value VARCHAR(100) NOT NULL, -- Value to display (e.g., "98%", "25 Years", "500+")
    metric_description TEXT, -- Additional context
    measurement_unit VARCHAR(20), -- '%', 'years', 'count', 'rating'
    data_source VARCHAR(100), -- Where the data comes from
    last_updated DATE, -- When the statistic was last updated
    display_format VARCHAR(50) DEFAULT 'standard', -- 'standard', 'badge', 'highlight', 'chart'
    icon_name VARCHAR(50), -- Lucide icon name for display
    sort_order INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false, -- Show on overview
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Ensure unique metric per hotel
    UNIQUE(hotel_id, metric_type, metric_name)
);

-- Create hotel_social_media table for social media links and content
CREATE TABLE IF NOT EXISTS hotel_social_media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hotel_id UUID NOT NULL REFERENCES hotels(id) ON DELETE CASCADE,
    platform VARCHAR(50) NOT NULL, -- 'facebook', 'instagram', 'twitter', 'linkedin', 'youtube', 'tripadvisor', 'google_my_business'
    profile_url TEXT NOT NULL,
    handle VARCHAR(100), -- @username or handle
    display_name VARCHAR(100), -- Display name for the profile
    follower_count INTEGER, -- Number of followers if available
    description TEXT, -- Platform-specific description
    profile_image_id UUID REFERENCES media(id), -- Profile image
    is_verified BOOLEAN DEFAULT false, -- If the account is verified
    is_primary BOOLEAN DEFAULT false, -- Primary account for this platform
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Ensure unique primary account per platform per hotel
    UNIQUE(hotel_id, platform, is_primary) WHERE is_primary = true
);

-- Add specialties column to existing dining table
-- This extends the dining table with specialized cuisine information
ALTER TABLE dining 
ADD COLUMN IF NOT EXISTS specialties TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS chef_name VARCHAR(100),
ADD COLUMN IF NOT EXISTS seating_capacity INTEGER,
ADD COLUMN IF NOT EXISTS reservation_required BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS reservation_phone VARCHAR(50),
ADD COLUMN IF NOT EXISTS reservation_email VARCHAR(100),
ADD COLUMN IF NOT EXISTS price_range VARCHAR(50), -- 'budget', 'moderate', 'upscale', 'fine_dining'
ADD COLUMN IF NOT EXISTS ambiance VARCHAR(100), -- 'casual', 'romantic', 'family', 'business'
ADD COLUMN IF NOT EXISTS dietary_options TEXT[] DEFAULT '{}'; -- 'vegetarian', 'vegan', 'gluten_free', 'halal'

-- Create indexes for optimal performance
CREATE INDEX IF NOT EXISTS idx_hotel_spaces_hotel_id ON hotel_spaces(hotel_id);
CREATE INDEX IF NOT EXISTS idx_hotel_spaces_type ON hotel_spaces(space_type);
CREATE INDEX IF NOT EXISTS idx_hotel_spaces_active_featured ON hotel_spaces(is_active, is_featured);
CREATE INDEX IF NOT EXISTS idx_hotel_spaces_capacity ON hotel_spaces(capacity_banquet, capacity_reception);

CREATE INDEX IF NOT EXISTS idx_hotel_experiences_hotel_id ON hotel_experiences(hotel_id);
CREATE INDEX IF NOT EXISTS idx_hotel_experiences_type ON hotel_experiences(experience_type);
CREATE INDEX IF NOT EXISTS idx_hotel_experiences_active_featured ON hotel_experiences(is_active, is_featured);
CREATE INDEX IF NOT EXISTS idx_hotel_experiences_price ON hotel_experiences(price_inr);

CREATE INDEX IF NOT EXISTS idx_hotel_virtual_tours_hotel_id ON hotel_virtual_tours(hotel_id);
CREATE INDEX IF NOT EXISTS idx_hotel_virtual_tours_type ON hotel_virtual_tours(tour_type);
CREATE INDEX IF NOT EXISTS idx_hotel_virtual_tours_active_featured ON hotel_virtual_tours(is_active, is_featured);

CREATE INDEX IF NOT EXISTS idx_hotel_statistics_hotel_id ON hotel_statistics(hotel_id);
CREATE INDEX IF NOT EXISTS idx_hotel_statistics_type ON hotel_statistics(metric_type);
CREATE INDEX IF NOT EXISTS idx_hotel_statistics_active_featured ON hotel_statistics(is_active, is_featured);

CREATE INDEX IF NOT EXISTS idx_hotel_social_media_hotel_id ON hotel_social_media(hotel_id);
CREATE INDEX IF NOT EXISTS idx_hotel_social_media_platform ON hotel_social_media(platform);
CREATE INDEX IF NOT EXISTS idx_hotel_social_media_active ON hotel_social_media(is_active);

-- Create updated_at triggers for all new tables
CREATE TRIGGER update_hotel_spaces_updated_at 
    BEFORE UPDATE ON hotel_spaces 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hotel_experiences_updated_at 
    BEFORE UPDATE ON hotel_experiences 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hotel_virtual_tours_updated_at 
    BEFORE UPDATE ON hotel_virtual_tours 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hotel_statistics_updated_at 
    BEFORE UPDATE ON hotel_statistics 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hotel_social_media_updated_at 
    BEFORE UPDATE ON hotel_social_media 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add comments for documentation
COMMENT ON TABLE hotel_spaces IS 'Event spaces, banquet halls, conference rooms, and other bookable spaces within hotels';
COMMENT ON TABLE hotel_experiences IS 'Curated experiences, activities, and packages offered by hotels';
COMMENT ON TABLE hotel_virtual_tours IS '3D virtual tours, 360° images, and virtual reality experiences';
COMMENT ON TABLE hotel_statistics IS 'Key metrics, statistics, and achievements for hotels';
COMMENT ON TABLE hotel_social_media IS 'Social media accounts and profiles for hotels';

COMMENT ON COLUMN hotel_spaces.capacity_theater IS 'Theater-style seating capacity';
COMMENT ON COLUMN hotel_spaces.capacity_classroom IS 'Classroom-style seating capacity';
COMMENT ON COLUMN hotel_spaces.capacity_banquet IS 'Banquet/dining seating capacity';
COMMENT ON COLUMN hotel_spaces.capacity_reception IS 'Reception/cocktail standing capacity';
COMMENT ON COLUMN hotel_spaces.pricing_info IS 'JSON structure for flexible pricing: {"base_price": 50000, "currency": "INR", "per": "day", "additional_charges": {...}}';

COMMENT ON COLUMN hotel_experiences.duration_minutes IS 'Total duration of experience in minutes';
COMMENT ON COLUMN hotel_experiences.includes IS 'Array of what is included in the experience';
COMMENT ON COLUMN hotel_experiences.requirements IS 'Array of requirements or prerequisites';
COMMENT ON COLUMN hotel_experiences.gallery_images IS 'Array of media IDs for experience gallery';

COMMENT ON COLUMN hotel_virtual_tours.tour_url IS 'Direct URL to the virtual tour platform';
COMMENT ON COLUMN hotel_virtual_tours.embed_code IS 'HTML embed code for iframe integration';
COMMENT ON COLUMN hotel_virtual_tours.areas_covered IS 'Array of hotel areas covered in the tour';

COMMENT ON COLUMN hotel_statistics.metric_value IS 'Display value (e.g., "98%", "25 Years", "500+")';
COMMENT ON COLUMN hotel_statistics.display_format IS 'How to display: standard, badge, highlight, chart';

COMMENT ON COLUMN hotel_social_media.is_primary IS 'Primary account for this platform (only one per platform per hotel)';
COMMENT ON COLUMN hotel_social_media.is_verified IS 'Whether the social media account is verified by the platform';

-- Add sample data validation constraints
ALTER TABLE hotel_spaces 
ADD CONSTRAINT check_space_type CHECK (space_type IN ('banquet', 'conference', 'wedding', 'outdoor', 'restaurant', 'bar', 'pool', 'spa', 'gym', 'other')),
ADD CONSTRAINT check_positive_capacities CHECK (
    (capacity_theater IS NULL OR capacity_theater > 0) AND
    (capacity_classroom IS NULL OR capacity_classroom > 0) AND
    (capacity_banquet IS NULL OR capacity_banquet > 0) AND
    (capacity_reception IS NULL OR capacity_reception > 0) AND
    (capacity_boardroom IS NULL OR capacity_boardroom > 0)
);

ALTER TABLE hotel_experiences 
ADD CONSTRAINT check_experience_type CHECK (experience_type IN ('dining', 'wellness', 'recreation', 'cultural', 'business', 'romantic', 'family', 'adventure')),
ADD CONSTRAINT check_positive_participants CHECK (
    (max_participants IS NULL OR max_participants > 0) AND
    (min_participants > 0) AND
    (max_participants IS NULL OR max_participants >= min_participants)
),
ADD CONSTRAINT check_positive_price CHECK (price_inr IS NULL OR price_inr >= 0);

ALTER TABLE hotel_virtual_tours 
ADD CONSTRAINT check_tour_type CHECK (tour_type IN ('matterport', 'spalba', '360_image', 'video_tour', 'virtual_reality')),
ADD CONSTRAINT check_tour_url_format CHECK (tour_url ~ '^https?://');

ALTER TABLE hotel_statistics 
ADD CONSTRAINT check_metric_type CHECK (metric_type IN ('guest_satisfaction', 'occupancy_rate', 'awards', 'years_established', 'rooms_count', 'events_hosted', 'rating', 'certifications'));

ALTER TABLE hotel_social_media 
ADD CONSTRAINT check_platform CHECK (platform IN ('facebook', 'instagram', 'twitter', 'linkedin', 'youtube', 'tripadvisor', 'google_my_business', 'booking_com')),
ADD CONSTRAINT check_social_url_format CHECK (profile_url ~ '^https?://');

-- Create helper function for array validation (used in constraints)
CREATE OR REPLACE FUNCTION validate_text_array(arr TEXT[])
RETURNS BOOLEAN AS $$
BEGIN
    -- Check if array is not null and contains at least one non-empty element
    RETURN arr IS NOT NULL AND array_length(arr, 1) > 0 AND 
           EXISTS(SELECT 1 FROM unnest(arr) AS elem WHERE length(trim(elem)) > 0);
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Final verification: Ensure all foreign key relationships are valid
DO $$
BEGIN
    -- Check if all referenced tables exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'hotels') THEN
        RAISE EXCEPTION 'Referenced table "hotels" does not exist. Run previous migrations first.';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'media') THEN
        RAISE EXCEPTION 'Referenced table "media" does not exist. Run previous migrations first.';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'dining') THEN
        RAISE EXCEPTION 'Referenced table "dining" does not exist. Run previous migrations first.';
    END IF;
    
    -- Check if update_updated_at_column function exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.routines WHERE routine_name = 'update_updated_at_column') THEN
        RAISE EXCEPTION 'Function "update_updated_at_column" does not exist. Run previous migrations first.';
    END IF;
END $$;

-- Success message
DO $$
BEGIN
    RAISE NOTICE 'Migration 007_hotel_enhanced_content.sql completed successfully!';
    RAISE NOTICE 'Created tables: hotel_spaces, hotel_experiences, hotel_virtual_tours, hotel_statistics, hotel_social_media';
    RAISE NOTICE 'Enhanced dining table with additional columns';
    RAISE NOTICE 'Added indexes, constraints, and triggers for optimal performance';
END $$;