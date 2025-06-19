-- Simple storage buckets setup for Tivoli Hotels
-- Create buckets only, policies will be handled via dashboard

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