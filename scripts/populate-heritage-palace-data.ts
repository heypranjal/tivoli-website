/**
 * Populate Tivoli Heritage Palace Data
 * Adds comprehensive data for Heritage Palace sections
 * Created: 2025-06-22
 */

import { createClient } from '@supabase/supabase-js';
import { Database } from '../src/types/supabase';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://sivirxabbuldqkckjwmu.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpdmlyeGFiYnVsZHFrY2tqd211Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUxMjU5MDIsImV4cCI6MjA1MDcwMTkwMn0.CgdRJVdFvOr6x7TwcOJA7UEaapC8WGSjr1KPx6H4h1o';

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

const HERITAGE_PALACE_ID = '46f0dbde-fb39-4aeb-a96d-813339729f3d';

async function populateHeritageData() {
  console.log('🏨 Starting Heritage Palace data population...');

  try {
    // 1. Update hotel basic information
    const { error: hotelError } = await supabase
      .from('hotels')
      .update({
        description: 'Experience the grandeur of Tivoli Heritage Palace, where royal heritage meets contemporary luxury. Set amidst lush landscapes in Rewari, our palace offers an extraordinary blend of traditional architecture, modern amenities, and impeccable hospitality for weddings, corporate events, and leisure stays.',
        email: 'reservations@tivoliheritagepalace.com',
        street: 'Kanhawas, 5PF3+53X Kanhawas',
        city: 'Rewari',
        state: 'Haryana',
        postal_code: '123401',
        rating: 4.5,
        updated_at: new Date().toISOString()
      })
      .eq('id', HERITAGE_PALACE_ID);

    if (hotelError) throw hotelError;
    console.log('✅ Hotel information updated');

    // 2. Add rooms
    const rooms = [
      {
        id: crypto.randomUUID(),
        hotel_id: HERITAGE_PALACE_ID,
        name: 'Heritage Deluxe Room',
        description: 'Spacious rooms with traditional décor, modern amenities, and garden views. Perfect blend of heritage charm and contemporary comfort.',
        size_sqft: 350,
        size_display: '350 sq ft',
        max_occupancy: 3,
        bed_type: 'King Size Bed',
        price_inr: 8500,
        is_available: true
      },
      {
        id: crypto.randomUUID(),
        hotel_id: HERITAGE_PALACE_ID,
        name: 'Royal Suite',
        description: 'Luxurious suites featuring separate living area, premium furnishings, and panoramic views. Ideal for special occasions and extended stays.',
        size_sqft: 600,
        size_display: '600 sq ft',
        max_occupancy: 4,
        bed_type: 'King Size Bed + Sofa Bed',
        price_inr: 15000,
        is_available: true
      },
      {
        id: crypto.randomUUID(),
        hotel_id: HERITAGE_PALACE_ID,
        name: 'Palace Premium Room',
        description: 'Elegantly appointed rooms with heritage furniture, modern bathroom amenities, and complimentary Wi-Fi.',
        size_sqft: 400,
        size_display: '400 sq ft',
        max_occupancy: 2,
        bed_type: 'Queen Size Bed',
        price_inr: 12000,
        is_available: true
      }
    ];

    const { error: roomsError } = await supabase
      .from('rooms')
      .upsert(rooms);

    if (roomsError) throw roomsError;
    console.log('✅ Rooms added');

    // 3. Add dining venues
    const diningVenues = [
      {
        id: crypto.randomUUID(),
        hotel_id: HERITAGE_PALACE_ID,
        name: 'Royal Darbar Restaurant',
        description: 'Experience fine dining in our grand restaurant featuring authentic Indian cuisine, Mughlai specialties, and international favorites.',
        cuisine: 'Indian, Mughlai, Continental',
        hours: '7:00 AM - 11:00 PM',
        dress_code: 'Smart Casual',
        seating_capacity: 120,
        price_range: '₹₹₹'
      },
      {
        id: crypto.randomUUID(),
        hotel_id: HERITAGE_PALACE_ID,
        name: 'Heritage Café',
        description: 'Casual dining venue offering light meals, beverages, and traditional snacks in a relaxed heritage setting.',
        cuisine: 'Café, Snacks, Beverages',
        hours: '6:00 AM - 10:00 PM',
        dress_code: 'Casual',
        seating_capacity: 50,
        price_range: '₹₹'
      }
    ];

    const { error: diningError } = await supabase
      .from('dining')
      .upsert(diningVenues);

    if (diningError) throw diningError;
    console.log('✅ Dining venues added');

    // 4. Add amenities
    const amenityIds = [
      'b4f1c3e0-d8a7-4b2c-8f9e-1a3b5c7d9e2f', // Free Wi-Fi
      '7d2e8f9b-c4a6-4e3d-9f1b-2c5e8a7b4d6g', // Swimming Pool
      '9a3c5e7f-b2d4-4f6a-8c1e-3d6f9b2a5c8h', // Fitness Center
      'c5e7a9b3-d4f6-4a8c-9e2f-5b8d1a4c7e9j', // Restaurant
      'e8b4d6f2-a3c5-4e7a-b1d3-6f9c2e5a8b4k', // Parking
      '2f6a8c4e-b5d7-4f9b-c3e5-8a1d4f7b9c6l'  // Conference Room
    ];

    const hotelAmenities = amenityIds.map(amenityId => ({
      hotel_id: HERITAGE_PALACE_ID,
      amenity_id: amenityId
    }));

    const { error: amenitiesError } = await supabase
      .from('hotel_amenities')
      .upsert(hotelAmenities);

    if (amenitiesError) throw amenitiesError;
    console.log('✅ Hotel amenities added');

    // 5. Add images (these would need to be uploaded to Supabase storage first)
    const mediaEntries = [
      {
        id: crypto.randomUUID(),
        filename: 'heritage-palace-hero-1.jpg',
        public_url: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/mainpagephoto5.jpg',
        content_type: 'image/jpeg',
        size_bytes: 1024000,
        alt_text: 'Tivoli Heritage Palace Main Building'
      },
      {
        id: crypto.randomUUID(),
        filename: 'heritage-palace-pool.jpg',
        public_url: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/swimming%20pool2rewari.jpg',
        content_type: 'image/jpeg',
        size_bytes: 950000,
        alt_text: 'Heritage Palace Swimming Pool'
      },
      {
        id: crypto.randomUUID(),
        filename: 'heritage-palace-dining.jpg',
        public_url: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari/dinningorg.jpg',
        content_type: 'image/jpeg',
        size_bytes: 890000,
        alt_text: 'Heritage Palace Dining Hall'
      }
    ];

    const { error: mediaError } = await supabase
      .from('media')
      .upsert(mediaEntries);

    if (mediaError) throw mediaError;
    console.log('✅ Media entries added');

    // 6. Link images to hotel
    const hotelImages = [
      {
        hotel_id: HERITAGE_PALACE_ID,
        media_id: mediaEntries[0].id,
        media_type: 'hero',
        sort_order: 1
      },
      {
        hotel_id: HERITAGE_PALACE_ID,
        media_id: mediaEntries[1].id,
        media_type: 'gallery',
        sort_order: 2
      },
      {
        hotel_id: HERITAGE_PALACE_ID,
        media_id: mediaEntries[2].id,
        media_type: 'gallery',
        sort_order: 3
      }
    ];

    const { error: hotelImagesError } = await supabase
      .from('hotel_images')
      .upsert(hotelImages);

    if (hotelImagesError) throw hotelImagesError;
    console.log('✅ Hotel images linked');

    console.log('🎉 Heritage Palace data population completed successfully!');
    
    // Verify the data
    const { data: verifyData, error: verifyError } = await supabase
      .from('hotels')
      .select(`
        *,
        location:locations(*),
        rooms(*),
        dining(*),
        amenities:hotel_amenities(amenity:amenities(*)),
        images:hotel_images(media:media(*), media_type, sort_order)
      `)
      .eq('slug', 'tivoli-heritage-palace')
      .single();

    if (verifyError) throw verifyError;
    console.log('📊 Verification - Hotel has:', {
      rooms: verifyData.rooms?.length || 0,
      dining: verifyData.dining?.length || 0,
      amenities: verifyData.amenities?.length || 0,
      images: verifyData.images?.length || 0
    });

  } catch (error) {
    console.error('❌ Error populating Heritage Palace data:', error);
    process.exit(1);
  }
}

// Run the script
populateHeritageData();