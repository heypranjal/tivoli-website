-- Tivoli Hotels Storage Buckets Setup
-- Creates storage buckets for hotel images and assets

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
    ('homepage_image', 'homepage_image', true, 52428800, '{"image/*"}'),
    ('royalpalacepalwal', 'royalpalacepalwal', true, 52428800, '{"image/*"}'),
    ('tivoliheritagerewari', 'tivoliheritagerewari', true, 52428800, '{"image/*"}'),
    ('wedcationambala', 'wedcationambala', true, 52428800, '{"image/*"}'),
    ('wedcationisrana', 'wedcationisrana', true, 52428800, '{"image/*"}'),
    ('tivoli-dining-photo', 'tivoli-dining-photo', true, 52428800, '{"image/*"}'),
    ('omnia-venues', 'omnia-venues', true, 52428800, '{"image/*"}'),
    ('upper-hse-venues', 'upper-hse-venues', true, 52428800, '{"image/*"}')
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for public read access
CREATE POLICY IF NOT EXISTS "Public read access" ON storage.objects
    FOR SELECT USING (bucket_id IN (
        'homepage_image', 
        'royalpalacepalwal', 
        'tivoliheritagerewari',
        'wedcationambala',
        'wedcationisrana', 
        'tivoli-dining-photo',
        'omnia-venues',
        'upper-hse-venues'
    ));

-- Allow authenticated users to upload images
CREATE POLICY IF NOT EXISTS "Authenticated upload access" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id IN (
            'homepage_image', 
            'royalpalacepalwal', 
            'tivoliheritagerewari',
            'wedcationambala',
            'wedcationisrana', 
            'tivoli-dining-photo',
            'omnia-venues',
            'upper-hse-venues'
        ) 
        AND auth.role() = 'authenticated'
    );

-- Allow authenticated users to update images
CREATE POLICY IF NOT EXISTS "Authenticated update access" ON storage.objects
    FOR UPDATE USING (
        bucket_id IN (
            'homepage_image', 
            'royalpalacepalwal', 
            'tivoliheritagerewari',
            'wedcationambala',
            'wedcationisrana', 
            'tivoli-dining-photo',
            'omnia-venues',
            'upper-hse-venues'
        ) 
        AND auth.role() = 'authenticated'
    );

-- Allow authenticated users to delete images
CREATE POLICY IF NOT EXISTS "Authenticated delete access" ON storage.objects
    FOR DELETE USING (
        bucket_id IN (
            'homepage_image', 
            'royalpalacepalwal', 
            'tivoliheritagerewari',
            'wedcationambala',
            'wedcationisrana', 
            'tivoli-dining-photo',
            'omnia-venues',
            'upper-hse-venues'
        ) 
        AND auth.role() = 'authenticated'
    );