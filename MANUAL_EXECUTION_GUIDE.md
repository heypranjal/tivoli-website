# 🚀 Manual Execution Guide - Supabase Migrations

This guide provides step-by-step instructions for executing the database migrations manually in your Supabase dashboard.

## Prerequisites

1. **Supabase Project**: Ensure you have a Supabase project created
2. **Environment Variables**: Set up your `.env` file with Supabase credentials
3. **Access**: Admin access to your Supabase dashboard

## Step 1: Set Up Environment Variables

Create a `.env` file in your project root:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Step 2: Execute Database Schema Migration

1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the following SQL (from `supabase/migrations/001_initial_schema.sql`):

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create brands table
CREATE TABLE brands (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    description TEXT,
    logo_url TEXT,
    brand_color VARCHAR(7),
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create locations table
CREATE TABLE locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    state VARCHAR(50),
    country VARCHAR(50) DEFAULT 'India',
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create media table
CREATE TABLE media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255),
    file_type VARCHAR(50),
    file_size INTEGER,
    width INTEGER,
    height INTEGER,
    supabase_path TEXT NOT NULL,
    public_url TEXT NOT NULL,
    alt_text TEXT,
    caption TEXT,
    tags TEXT[],
    upload_source VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create hotels table
CREATE TABLE hotels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    brand_id UUID REFERENCES brands(id) ON DELETE RESTRICT,
    location_id UUID REFERENCES locations(id) ON DELETE RESTRICT,
    description TEXT,
    rating DECIMAL(2,1) DEFAULT 5.0,
    street TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    phone VARCHAR(50),
    email VARCHAR(100),
    meta_title VARCHAR(200),
    meta_description TEXT,
    featured_image_id UUID REFERENCES media(id),
    sort_order INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create hotel_media junction table
CREATE TABLE hotel_media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
    media_id UUID REFERENCES media(id) ON DELETE CASCADE,
    media_type VARCHAR(50) NOT NULL,
    sort_order INTEGER DEFAULT 0,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(hotel_id, media_type, is_primary) WHERE is_primary = true
);

-- Create amenities table
CREATE TABLE amenities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon_name VARCHAR(50),
    category VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create hotel_amenities junction table
CREATE TABLE hotel_amenities (
    hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
    amenity_id UUID REFERENCES amenities(id) ON DELETE CASCADE,
    custom_description TEXT,
    sort_order INTEGER DEFAULT 0,
    PRIMARY KEY (hotel_id, amenity_id)
);

-- Create rooms table
CREATE TABLE rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    size_sqm INTEGER,
    size_display VARCHAR(50),
    max_occupancy INTEGER,
    bed_type VARCHAR(100),
    price_inr INTEGER,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create room_amenities table
CREATE TABLE room_amenities (
    room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
    amenity_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (room_id, amenity_name)
);

-- Create dining table
CREATE TABLE dining (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    cuisine VARCHAR(100),
    hours VARCHAR(100),
    dress_code VARCHAR(100),
    image_id UUID REFERENCES media(id),
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create hotel_features table
CREATE TABLE hotel_features (
    hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
    feature_name VARCHAR(100) NOT NULL,
    sort_order INTEGER DEFAULT 0,
    PRIMARY KEY (hotel_id, feature_name)
);

-- Create hotel_policies table
CREATE TABLE hotel_policies (
    hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE PRIMARY KEY,
    check_in VARCHAR(50) DEFAULT '2:00 PM',
    check_out VARCHAR(50) DEFAULT '12:00 PM',
    cancellation TEXT DEFAULT '24 hours before arrival',
    pets VARCHAR(100) DEFAULT 'Not allowed',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_hotels_brand_location ON hotels(brand_id, location_id);
CREATE INDEX idx_hotels_active_featured ON hotels(is_active, is_featured);
CREATE INDEX idx_hotels_slug ON hotels(slug);
CREATE INDEX idx_hotel_media_hotel_type ON hotel_media(hotel_id, media_type);
CREATE INDEX idx_media_tags ON media USING GIN(tags);
CREATE INDEX idx_brands_slug ON brands(slug);
CREATE INDEX idx_locations_slug ON locations(slug);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers
CREATE TRIGGER update_brands_updated_at BEFORE UPDATE ON brands FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_locations_updated_at BEFORE UPDATE ON locations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_media_updated_at BEFORE UPDATE ON media FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_hotels_updated_at BEFORE UPDATE ON hotels FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_amenities_updated_at BEFORE UPDATE ON amenities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rooms_updated_at BEFORE UPDATE ON rooms FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_dining_updated_at BEFORE UPDATE ON dining FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_hotel_policies_updated_at BEFORE UPDATE ON hotel_policies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

4. Click **Run** to execute the schema

## Step 3: Populate Initial Data

1. In the same SQL Editor, copy and paste the data population SQL
2. **Important**: This is a large file, so execute it in the dashboard
3. The file is located at: `supabase/migrations/002_populate_data.sql`

## Step 4: Set Up Storage

1. Copy and paste the storage setup SQL from `supabase/migrations/003_setup_storage.sql`
2. This will create the required storage buckets and policies

## Step 5: Set Up Row Level Security

1. Go to **Authentication > Policies** in your Supabase dashboard
2. Enable RLS on all tables
3. The RLS policies should already be created by the migration scripts

## Step 6: Test the Setup

After completing the migrations, test your setup:

```bash
# Test database connection
npm run migrate:test

# Run comprehensive tests
npm run test:comprehensive

# Test services
npm run test:services
```

## Step 7: Run Image Migration

Once the database is set up, run the image migration:

```bash
npm run migrate:images
```

## Verification Checklist

- [ ] All tables created successfully
- [ ] Data populated (4 brands, 7 locations, 11 hotels)
- [ ] Storage buckets created
- [ ] RLS policies active
- [ ] Image migration completed
- [ ] Tests passing

## Troubleshooting

If you encounter issues:

1. **Permission Errors**: Ensure you're using the service role key for migrations
2. **Table Errors**: Check if tables already exist, drop them if needed
3. **Data Errors**: Verify foreign key relationships
4. **Storage Errors**: Check bucket permissions in Supabase dashboard

## Next Steps

Once manual execution is complete:

1. Test the application with real data
2. Run performance monitoring
3. Execute production readiness checks
4. Deploy to production

---

💡 **Tip**: Keep the Supabase dashboard open in another tab to monitor the execution progress and check for any errors.