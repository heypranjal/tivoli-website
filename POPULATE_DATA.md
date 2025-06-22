# 🏨 EXECUTE DATA POPULATION

Your Supabase database schema is ready! The tables exist but are empty due to RLS policies blocking anonymous inserts.

## Step 1: Open Supabase Dashboard SQL Editor
1. Go to: https://supabase.com/dashboard/project/sivirxabbuldqkckjwmu
2. Navigate to **SQL Editor**

## Step 2: Execute Data Population SQL

Copy and paste this SQL code into the SQL Editor and click **Run**:

```sql
-- Populate brands
INSERT INTO brands (slug, name, display_name, description, brand_color, sort_order) VALUES
('tivoli', 'Tivoli', 'The Tivoli', 'Luxury hotels offering unparalleled hospitality and elegant accommodations', '#CD9F59', 1),
('omnia', 'Omnia', 'Omnia', 'Contemporary luxury with modern amenities and sophisticated design', '#2C3E50', 2),
('upper-hse', 'Upper HSE', 'The Upper HSE', 'Premium hospitality with attention to detail and personalized service', '#8B4513', 3),
('wedcation', 'Wedcation', 'Wedcation', 'Destination wedding venues with comprehensive celebration services', '#E91E63', 4);

-- Populate locations
INSERT INTO locations (slug, name, state, display_order) VALUES
('delhi', 'Delhi', 'Delhi', 1),
('noida', 'Noida', 'Uttar Pradesh', 2),
('greater-noida', 'Greater Noida', 'Uttar Pradesh', 3),
('palwal', 'Palwal', 'Haryana', 4),
('rewari', 'Rewari', 'Haryana', 5),
('ambala', 'Ambala', 'Haryana', 6),
('israna', 'Israna', 'Haryana', 7);

-- Populate amenities
INSERT INTO amenities (name, description, icon_name, category) VALUES
-- Wellness & Recreation
('Swimming Pool', 'Indoor/outdoor swimming pool with poolside service', 'Waves', 'wellness'),
('Fitness Center', '24/7 modern fitness center with latest equipment', 'Dumbbell', 'wellness'),
('Spa Services', 'Full-service spa with therapeutic treatments', 'Heart', 'wellness'),
('Yoga Studio', 'Dedicated yoga and meditation space', 'User', 'wellness'),

-- Dining
('Multi-Cuisine Restaurant', 'Fine dining restaurant with diverse menu', 'Utensils', 'dining'),
('Room Service', '24-hour in-room dining service', 'Coffee', 'dining'),
('Bar & Lounge', 'Cocktail bar and lounge area', 'Wine', 'dining'),
('Banquet Hall', 'Grand banquet facilities for events', 'Users', 'dining'),

-- Business & Connectivity
('Free WiFi', 'Complimentary high-speed internet throughout', 'Wifi', 'business'),
('Business Center', 'Fully equipped business center', 'Briefcase', 'business'),
('Conference Rooms', 'Modern meeting and conference facilities', 'Monitor', 'business'),
('Airport Transfer', 'Complimentary airport shuttle service', 'Car', 'business'),

-- Recreation & Entertainment
('Garden Area', 'Landscaped gardens and outdoor spaces', 'TreePine', 'recreation'),
('Kids Play Area', 'Safe and fun play area for children', 'Baby', 'recreation'),
('Event Lawn', 'Spacious outdoor event and wedding lawn', 'MapPin', 'recreation'),
('Parking', 'Complimentary valet and self-parking', 'Car', 'recreation');
```

## Step 3: Create Storage Buckets

In the same SQL Editor, execute this to create storage buckets:

```sql
-- Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('hotel-images', 'hotel-images', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('hotel-videos', 'hotel-videos', true, 104857600, ARRAY['video/mp4', 'video/webm']),
  ('documents', 'documents', false, 5242880, ARRAY['application/pdf', 'application/msword']);

-- Create storage policies for hotel-images bucket
CREATE POLICY "Public read access on hotel images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'hotel-images');

-- Allow anonymous uploads for migration (TEMPORARY - remove in production)
CREATE POLICY "Anonymous upload for migration" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'hotel-images');
```

## Step 4: Populate Hotels Data

Execute this to add the main hotel data:

```sql
-- Get brand and location IDs for reference
WITH brand_refs AS (
  SELECT id as tivoli_id FROM brands WHERE slug = 'tivoli'
), location_refs AS (
  SELECT 
    (SELECT id FROM locations WHERE slug = 'delhi') as delhi_id,
    (SELECT id FROM locations WHERE slug = 'noida') as noida_id,
    (SELECT id FROM locations WHERE slug = 'palwal') as palwal_id,
    (SELECT id FROM locations WHERE slug = 'rewari') as rewari_id,
    (SELECT id FROM locations WHERE slug = 'greater-noida') as greater_noida_id,
    (SELECT id FROM locations WHERE slug = 'ambala') as ambala_id,
    (SELECT id FROM locations WHERE slug = 'israna') as israna_id
)

-- Insert hotels
INSERT INTO hotels (slug, name, brand_id, location_id, description, rating, street, city, state, phone, is_featured, sort_order) 
SELECT * FROM (
  VALUES 
    ('tivoli-bijwasan', 'Tivoli Bijwasan', (SELECT tivoli_id FROM brand_refs), (SELECT delhi_id FROM location_refs), 'Luxury hotel in the heart of Delhi with modern amenities', 5.0, 'Bijwasan Road', 'Delhi', 'Delhi', '+91-11-XXXXXXXX', true, 1),
    ('tivoli-lotus-court', 'Tivoli Lotus Court', (SELECT tivoli_id FROM brand_refs), (SELECT noida_id FROM location_refs), 'Premium business hotel in Noida with elegant accommodations', 5.0, 'Sector 18', 'Noida', 'Uttar Pradesh', '+91-120-XXXXXXXX', true, 2),
    ('tivoli-royal-palace', 'Tivoli Royal Palace', (SELECT tivoli_id FROM brand_refs), (SELECT palwal_id FROM location_refs), 'Majestic palace hotel offering royal luxury', 5.0, 'Palace Road', 'Palwal', 'Haryana', '+91-1275-XXXXXXXX', true, 3),
    ('tivoli-heritage-palace', 'Tivoli Heritage Palace', (SELECT tivoli_id FROM brand_refs), (SELECT rewari_id FROM location_refs), 'Heritage hotel blending tradition with modern comfort', 5.0, 'Heritage Complex', 'Rewari', 'Haryana', '+91-1274-XXXXXXXX', true, 4),
    ('tivoli-grand-palace', 'Tivoli Grand Palace', (SELECT tivoli_id FROM brand_refs), (SELECT greater_noida_id FROM location_refs), 'Grand luxury hotel with world-class facilities', 5.0, 'Alpha Road', 'Greater Noida', 'Uttar Pradesh', '+91-120-XXXXXXXX', true, 5)
) AS t(slug, name, brand_id, location_id, description, rating, street, city, state, phone, is_featured, sort_order);
```

## Step 5: Verify Data Population

Execute this query to verify all data was inserted correctly:

```sql
-- Check data counts
SELECT 
  'brands' as table_name, COUNT(*) as record_count FROM brands
UNION ALL
SELECT 
  'locations' as table_name, COUNT(*) as record_count FROM locations  
UNION ALL
SELECT 
  'amenities' as table_name, COUNT(*) as record_count FROM amenities
UNION ALL
SELECT 
  'hotels' as table_name, COUNT(*) as record_count FROM hotels
UNION ALL
SELECT 
  'storage.buckets' as table_name, COUNT(*) as record_count FROM storage.buckets;

-- Preview data
SELECT 'BRANDS:' as section, slug, name FROM brands
UNION ALL
SELECT 'HOTELS:', slug, name FROM hotels;
```

---

**Status: Ready for Data Population**
✅ Database schema exists  
✅ Tables are empty and ready
✅ SQL scripts prepared for manual execution

**After executing the SQL above:**
1. Run verification script: `npm run migrate:test`
2. Proceed with image migration to Supabase Storage
3. Test complete application with live data