/*
  # Create hotel images table

  1. New Tables
    - `hotel_images`
      - `id` (bigint, primary key)
      - `created_at` (timestamp with time zone, default now())
      - `hotel_id` (text, not null)
      - `image_url` (text, not null)
      - `alt_text` (text)
      - `is_featured` (boolean, default false)
      - `sort_order` (integer, default 0)
  2. Security
    - Enable RLS on `hotel_images` table
    - Add policy for authenticated users to read all images
    - Add policy for service role to manage images
*/

-- Create hotel images table
CREATE TABLE IF NOT EXISTS "hotel_images" (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  created_at timestamptz NOT NULL DEFAULT now(),
  hotel_id text NOT NULL,
  image_url text NOT NULL,
  alt_text text,
  is_featured boolean DEFAULT false,
  sort_order integer DEFAULT 0
);

-- Enable Row Level Security
ALTER TABLE hotel_images ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view hotel images"
  ON hotel_images
  FOR SELECT
  USING (true);

CREATE POLICY "Service role can manage hotel images"
  ON hotel_images
  USING (auth.role() = 'service_role');

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_hotel_images_hotel_id ON hotel_images(hotel_id);
CREATE INDEX IF NOT EXISTS idx_hotel_images_featured ON hotel_images(is_featured);