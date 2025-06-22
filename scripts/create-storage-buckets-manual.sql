-- Manual Storage Bucket Creation
-- Execute this in Supabase Dashboard SQL Editor if buckets weren't created

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('hotel-images', 'hotel-images', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('hotel-videos', 'hotel-videos', true, 104857600, ARRAY['video/mp4', 'video/webm']),
  ('documents', 'documents', false, 5242880, ARRAY['application/pdf', 'application/msword'])
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for hotel-images bucket
CREATE POLICY "Public read access on hotel images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'hotel-images');

-- Allow authenticated uploads for migration
CREATE POLICY "Authenticated upload access on hotel images" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'hotel-images');

CREATE POLICY "Admin full access on hotel images" 
ON storage.objects FOR ALL 
USING (bucket_id = 'hotel-images' AND auth.jwt() ->> 'role' = 'admin');

-- Create storage policies for hotel-videos bucket
CREATE POLICY "Public read access on hotel videos" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'hotel-videos');

CREATE POLICY "Authenticated upload access on hotel videos" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'hotel-videos');

-- Create storage policies for documents bucket (private)
CREATE POLICY "Admin full access on documents" 
ON storage.objects FOR ALL 
USING (bucket_id = 'documents' AND auth.jwt() ->> 'role' = 'admin');

-- Grant necessary permissions
GRANT USAGE ON SCHEMA storage TO anon, authenticated;
GRANT SELECT ON storage.buckets TO anon, authenticated;
GRANT SELECT ON storage.objects TO anon, authenticated;

-- Verify buckets were created
SELECT 
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
FROM storage.buckets
ORDER BY name;