-- Tivoli Hotels Database Schema
-- Tables for venue bookings, room bookings, and lead tracking

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Venue Bookings Table
CREATE TABLE IF NOT EXISTS venue_bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    event_type VARCHAR(50) NOT NULL CHECK (event_type IN ('wedding', 'mice', 'birthday', 'cocktail', 'corporate', 'other')),
    event_date DATE NOT NULL,
    guest_count INTEGER NOT NULL CHECK (guest_count > 0),
    needs_rooms BOOLEAN NOT NULL DEFAULT false,
    budget_range VARCHAR(50) CHECK (budget_range IN ('under-5-lakhs', '5-10-lakhs', '10-20-lakhs', '20-50-lakhs', 'above-50-lakhs')),
    special_requirements TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'confirmed', 'cancelled')),
    venue_id VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Room Bookings Table
CREATE TABLE IF NOT EXISTS room_bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    checkin_date DATE NOT NULL,
    checkout_date DATE NOT NULL,
    room_type VARCHAR(100) NOT NULL,
    guest_count INTEGER NOT NULL CHECK (guest_count > 0),
    special_requests TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'confirmed', 'cancelled')),
    hotel_id VARCHAR(100),
    total_nights INTEGER GENERATED ALWAYS AS (checkout_date - checkin_date) STORED,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT valid_dates CHECK (checkout_date > checkin_date)
);

-- Leads Table (for tracking and analytics)
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source VARCHAR(50) NOT NULL CHECK (source IN ('venue_booking', 'room_booking', 'website_contact', 'phone_inquiry')),
    booking_id UUID,
    customer_name VARCHAR(255),
    customer_email VARCHAR(255),
    customer_phone VARCHAR(20),
    status VARCHAR(20) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
    notes TEXT,
    assigned_to VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_venue_bookings_updated_at 
    BEFORE UPDATE ON venue_bookings 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_room_bookings_updated_at 
    BEFORE UPDATE ON room_bookings 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at 
    BEFORE UPDATE ON leads 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_venue_bookings_created_at ON venue_bookings(created_at);
CREATE INDEX IF NOT EXISTS idx_venue_bookings_status ON venue_bookings(status);
CREATE INDEX IF NOT EXISTS idx_venue_bookings_email ON venue_bookings(email);

CREATE INDEX IF NOT EXISTS idx_room_bookings_created_at ON room_bookings(created_at);
CREATE INDEX IF NOT EXISTS idx_room_bookings_status ON room_bookings(status);
CREATE INDEX IF NOT EXISTS idx_room_bookings_dates ON room_bookings(checkin_date, checkout_date);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);

-- Row Level Security (RLS) Policies
ALTER TABLE venue_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read all bookings (for admin dashboard)
CREATE POLICY "Allow authenticated read access" ON venue_bookings
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated read access" ON room_bookings
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated read access" ON leads
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow anonymous users to insert bookings (for public forms)
CREATE POLICY "Allow anonymous insert" ON venue_bookings
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous insert" ON room_bookings
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous insert" ON leads
    FOR INSERT WITH CHECK (true);

-- Allow authenticated users to update bookings (for admin operations)
CREATE POLICY "Allow authenticated update" ON venue_bookings
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON room_bookings
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON leads
    FOR UPDATE USING (auth.role() = 'authenticated');