-- Room Media Junction Table
-- Migration: 008_room_media_junction.sql
-- Purpose: Add room_media junction table to support multiple images per room
-- Created: 2025-07-04
-- Enhancement: Split image layout for luxury room display

-- Create room_media junction table
CREATE TABLE IF NOT EXISTS room_media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
    media_id UUID NOT NULL REFERENCES media(id) ON DELETE CASCADE,
    sort_order INTEGER DEFAULT 0,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Ensure unique primary image per room
    UNIQUE(room_id, is_primary) WHERE is_primary = true
);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_room_media_room_id ON room_media(room_id);
CREATE INDEX IF NOT EXISTS idx_room_media_sort_order ON room_media(room_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_room_media_primary ON room_media(room_id, is_primary) WHERE is_primary = true;

-- Add updated_at trigger for room_media
CREATE TRIGGER trigger_room_media_updated_at
    BEFORE UPDATE ON room_media
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample room media data for testing
-- Note: This assumes existing media records exist in the media table
-- For production, this should be populated via data migration scripts

-- Add sample images for The Tivoli New Delhi rooms
-- These will be populated via the populate data script
INSERT INTO room_media (room_id, media_id, sort_order, is_primary)
SELECT 
    r.id as room_id,
    m.id as media_id,
    1 as sort_order,
    true as is_primary
FROM rooms r
CROSS JOIN (
    SELECT id FROM media 
    WHERE tags @> ARRAY['room'] 
    AND filename ILIKE '%room%'
    LIMIT 1
) m
WHERE r.name IN ('Deluxe Room', 'Superior Room', 'Club Room', 'Executive Suite', 'Presidential Suite')
AND NOT EXISTS (
    SELECT 1 FROM room_media rm WHERE rm.room_id = r.id
)
LIMIT 5;

-- Add comment for documentation
COMMENT ON TABLE room_media IS 'Junction table linking rooms to multiple images with sort order and primary image designation';
COMMENT ON COLUMN room_media.sort_order IS 'Order of image display (0 = first, 1 = second, etc.)';
COMMENT ON COLUMN room_media.is_primary IS 'Indicates the primary/hero image for the room';