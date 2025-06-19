-- Fix RLS policies to allow anonymous inserts for booking forms

-- Drop existing policies
DROP POLICY IF EXISTS "Allow authenticated read access" ON venue_bookings;
DROP POLICY IF EXISTS "Allow authenticated read access" ON room_bookings;
DROP POLICY IF EXISTS "Allow authenticated read access" ON leads;
DROP POLICY IF EXISTS "Allow anonymous insert" ON venue_bookings;
DROP POLICY IF EXISTS "Allow anonymous insert" ON room_bookings;
DROP POLICY IF EXISTS "Allow anonymous insert" ON leads;
DROP POLICY IF EXISTS "Allow authenticated update" ON venue_bookings;
DROP POLICY IF EXISTS "Allow authenticated update" ON room_bookings;
DROP POLICY IF EXISTS "Allow authenticated update" ON leads;

-- Create new policies with correct syntax

-- Venue Bookings Policies
CREATE POLICY "Enable read access for authenticated users" ON venue_bookings
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for anonymous users" ON venue_bookings
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users" ON venue_bookings
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Room Bookings Policies  
CREATE POLICY "Enable read access for authenticated users" ON room_bookings
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for anonymous users" ON room_bookings
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users" ON room_bookings
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Leads Policies
CREATE POLICY "Enable read access for authenticated users" ON leads
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for anonymous users" ON leads
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users" ON leads
    FOR UPDATE USING (auth.role() = 'authenticated');