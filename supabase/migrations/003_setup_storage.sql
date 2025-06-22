-- Supabase Storage Setup
-- Phase 5: Database Migration & Data Population
-- Created: 2025-06-20
-- 
-- This script sets up Supabase Storage buckets and policies

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('hotel-images', 'hotel-images', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('hotel-videos', 'hotel-videos', true, 104857600, ARRAY['video/mp4', 'video/webm']),
  ('documents', 'documents', false, 5242880, ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']);

-- Create storage policies for hotel-images bucket
CREATE POLICY "Public read access on hotel images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'hotel-images');

CREATE POLICY "Admin upload access on hotel images" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'hotel-images' AND auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin update access on hotel images" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'hotel-images' AND auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin delete access on hotel images" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'hotel-images' AND auth.jwt() ->> 'role' = 'admin');

-- Create storage policies for hotel-videos bucket
CREATE POLICY "Public read access on hotel videos" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'hotel-videos');

CREATE POLICY "Admin upload access on hotel videos" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'hotel-videos' AND auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin update access on hotel videos" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'hotel-videos' AND auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin delete access on hotel videos" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'hotel-videos' AND auth.jwt() ->> 'role' = 'admin');

-- Create storage policies for documents bucket (private)
CREATE POLICY "Admin full access on documents" 
ON storage.objects FOR ALL 
USING (bucket_id = 'documents' AND auth.jwt() ->> 'role' = 'admin');

-- Create a function to generate optimized image URLs
CREATE OR REPLACE FUNCTION get_optimized_image_url(bucket_name TEXT, file_path TEXT, width INTEGER DEFAULT NULL, height INTEGER DEFAULT NULL, quality INTEGER DEFAULT 80)
RETURNS TEXT AS $$
BEGIN
  IF width IS NOT NULL OR height IS NOT NULL THEN
    RETURN format('%s/storage/v1/render/image/public/%s/%s?width=%s&height=%s&quality=%s',
      current_setting('app.supabase_url'),
      bucket_name,
      file_path,
      COALESCE(width::TEXT, ''),
      COALESCE(height::TEXT, ''),
      quality
    );
  ELSE
    RETURN format('%s/storage/v1/object/public/%s/%s',
      current_setting('app.supabase_url'),
      bucket_name,
      file_path
    );
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to get storage stats
CREATE OR REPLACE FUNCTION get_storage_stats()
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'buckets', (
      SELECT json_agg(
        json_build_object(
          'name', name,
          'public', public,
          'file_count', (
            SELECT COUNT(*) 
            FROM storage.objects 
            WHERE bucket_id = buckets.id
          ),
          'total_size', (
            SELECT COALESCE(SUM(
              CASE 
                WHEN metadata ? 'size' THEN (metadata->>'size')::bigint 
                ELSE 0 
              END
            ), 0)
            FROM storage.objects 
            WHERE bucket_id = buckets.id
          )
        )
      )
      FROM storage.buckets
    ),
    'total_objects', (SELECT COUNT(*) FROM storage.objects),
    'total_size', (
      SELECT COALESCE(SUM(
        CASE 
          WHEN metadata ? 'size' THEN (metadata->>'size')::bigint 
          ELSE 0 
        END
      ), 0)
      FROM storage.objects
    )
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create indexes for better storage performance
CREATE INDEX IF NOT EXISTS idx_storage_objects_bucket_name ON storage.objects(bucket_id, name);
CREATE INDEX IF NOT EXISTS idx_storage_objects_created_at ON storage.objects(created_at);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA storage TO anon, authenticated;
GRANT SELECT ON storage.buckets TO anon, authenticated;
GRANT SELECT ON storage.objects TO anon, authenticated;

-- Notification
DO $$
BEGIN
    RAISE NOTICE 'Storage setup completed successfully!';
    RAISE NOTICE 'Created buckets: hotel-images (public), hotel-videos (public), documents (private)';
    RAISE NOTICE 'Storage policies configured for public read access and admin management';
END $$;