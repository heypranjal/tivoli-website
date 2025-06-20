-- Supabase Storage Setup
-- Phase 1: Foundation Setup  
-- Created: 2025-06-20

-- Create storage bucket for Tivoli media
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'tivoli-media',
    'tivoli-media',
    true,
    52428800, -- 50MB limit
    ARRAY[
        'image/jpeg',
        'image/png', 
        'image/webp',
        'image/gif',
        'image/svg+xml'
    ]
);

-- Storage policies for public read access
CREATE POLICY "Allow public read access to tivoli-media"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'tivoli-media');

-- Storage policies for authenticated uploads (admin)
CREATE POLICY "Allow authenticated uploads to tivoli-media"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'tivoli-media' AND
        auth.role() = 'authenticated'
    );

-- Storage policies for authenticated updates (admin)
CREATE POLICY "Allow authenticated updates to tivoli-media"
    ON storage.objects FOR UPDATE
    USING (
        bucket_id = 'tivoli-media' AND
        auth.role() = 'authenticated'
    );

-- Storage policies for authenticated deletes (admin)
CREATE POLICY "Allow authenticated deletes from tivoli-media"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'tivoli-media' AND
        auth.role() = 'authenticated'
    );

-- Create folder structure examples (these will be created automatically when files are uploaded)
-- hotels/
--   ├── {hotel-slug}/
--   │   ├── hero/
--   │   ├── gallery/
--   │   ├── rooms/
--   │   ├── dining/
--   │   └── amenities/
-- brands/
--   ├── tivoli/
--   ├── omnia/
--   ├── upper-hse/
--   └── wedcation/
-- general/
--   ├── icons/
--   ├── patterns/
--   └── placeholders/
-- uploads/
--   └── {year}/{month}/