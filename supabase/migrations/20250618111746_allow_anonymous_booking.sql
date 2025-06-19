-- Temporarily disable RLS for testing booking forms
-- This allows anonymous users to insert bookings for demo purposes

ALTER TABLE venue_bookings DISABLE ROW LEVEL SECURITY;
ALTER TABLE room_bookings DISABLE ROW LEVEL SECURITY;
ALTER TABLE leads DISABLE ROW LEVEL SECURITY;