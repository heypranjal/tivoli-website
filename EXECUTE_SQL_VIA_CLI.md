# 🚀 Execute SQL via Supabase CLI

Since RLS policies are blocking direct inserts, use the Supabase CLI to execute SQL as an admin user.

## Option 1: Execute SQL File Directly

Run this command to execute the data population SQL:

```bash
cd "/Users/ashutosh/Downloads/Tivoli Website 18June"

# Set environment variables
export SUPABASE_ACCESS_TOKEN="sbp_b2340dad79cf1498ac480f4fc6241877cd43415f"
export VITE_SUPABASE_URL="https://sivirxabbuldqkckjwmu.supabase.co"
export VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpdmlyeGFiYnVsZHFrY2tqd211Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyMzk1NTcsImV4cCI6MjA2NTgxNTU1N30.gOX_CiexVuZsdrV8GqpAiO0qKtGev1cNIFZRwXlc1q4"

# Execute the data population SQL
supabase db push --password "Amity@125"
```

## Option 2: Execute SQL Commands Directly

Run each SQL command separately:

```bash
# Populate brands
supabase db execute --password "Amity@125" --sql "
INSERT INTO brands (slug, name, display_name, description, brand_color, sort_order) VALUES
('tivoli', 'Tivoli', 'The Tivoli', 'Luxury hotels offering unparalleled hospitality and elegant accommodations', '#CD9F59', 1),
('omnia', 'Omnia', 'Omnia', 'Contemporary luxury with modern amenities and sophisticated design', '#2C3E50', 2),
('upper-hse', 'Upper HSE', 'The Upper HSE', 'Premium hospitality with attention to detail and personalized service', '#8B4513', 3),
('wedcation', 'Wedcation', 'Wedcation', 'Destination wedding venues with comprehensive celebration services', '#E91E63', 4);
"

# Populate locations  
supabase db execute --password "Amity@125" --sql "
INSERT INTO locations (slug, name, state, display_order) VALUES
('delhi', 'Delhi', 'Delhi', 1),
('noida', 'Noida', 'Uttar Pradesh', 2),
('greater-noida', 'Greater Noida', 'Uttar Pradesh', 3),
('palwal', 'Palwal', 'Haryana', 4),
('rewari', 'Rewari', 'Haryana', 5),
('ambala', 'Ambala', 'Haryana', 6),
('israna', 'Israna', 'Haryana', 7);
"

# Populate amenities
supabase db execute --password "Amity@125" --sql "
INSERT INTO amenities (name, description, icon_name, category) VALUES
('Swimming Pool', 'Indoor/outdoor swimming pool with poolside service', 'Waves', 'wellness'),
('Fitness Center', '24/7 modern fitness center with latest equipment', 'Dumbbell', 'wellness'),
('Spa Services', 'Full-service spa with therapeutic treatments', 'Heart', 'wellness'),
('Yoga Studio', 'Dedicated yoga and meditation space', 'User', 'wellness'),
('Multi-Cuisine Restaurant', 'Fine dining restaurant with diverse menu', 'Utensils', 'dining'),
('Room Service', '24-hour in-room dining service', 'Coffee', 'dining'),
('Bar & Lounge', 'Cocktail bar and lounge area', 'Wine', 'dining'),
('Banquet Hall', 'Grand banquet facilities for events', 'Users', 'dining'),
('Free WiFi', 'Complimentary high-speed internet throughout', 'Wifi', 'business'),
('Business Center', 'Fully equipped business center', 'Briefcase', 'business'),
('Conference Rooms', 'Modern meeting and conference facilities', 'Monitor', 'business'),
('Airport Transfer', 'Complimentary airport shuttle service', 'Car', 'business'),
('Garden Area', 'Landscaped gardens and outdoor spaces', 'TreePine', 'recreation'),
('Kids Play Area', 'Safe and fun play area for children', 'Baby', 'recreation'),
('Event Lawn', 'Spacious outdoor event and wedding lawn', 'MapPin', 'recreation'),
('Parking', 'Complimentary valet and self-parking', 'Car', 'recreation');
"
```

## Option 3: Quick Single Command

Run this single command to execute all the basic data population:

```bash
cd "/Users/ashutosh/Downloads/Tivoli Website 18June" && export SUPABASE_ACCESS_TOKEN="sbp_b2340dad79cf1498ac480f4fc6241877cd43415f" && supabase db execute --password "Amity@125" --file "supabase/migrations/002_populate_data.sql"
```

## Verify Population

After running any of the above, verify with:

```bash
# Check if data was inserted
export VITE_SUPABASE_URL="https://sivirxabbuldqkckjwmu.supabase.co" && export VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpdmlyeGFiYnVsZHFrY2tqd211Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyMzk1NTcsImV4cCI6MjA2NTgxNTU1N30.gOX_CiexVuZsdrV8GqpAiO0qKtGev1cNIFZRwXjc1q4" && npx tsx scripts/check-existing-data.ts
```

---

**Alternative: Use Supabase Dashboard**

If CLI commands fail, go to:
1. https://supabase.com/dashboard/project/sivirxabbuldqkckjwmu
2. SQL Editor  
3. Copy and paste the SQL from `POPULATE_DATA.md`
4. Click "Run"

The CLI approach should work with the admin credentials and bypass RLS policies.