/**
 * Populate Supabase Database
 * Created: 2025-06-20
 * 
 * Populate empty database tables with hotel data
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function populateBrands(): Promise<void> {
  console.log('🏷️  Populating brands...')
  
  const brands = [
    {
      slug: 'tivoli',
      name: 'Tivoli', 
      display_name: 'The Tivoli',
      description: 'Luxury hotels offering unparalleled hospitality and elegant accommodations',
      brand_color: '#CD9F59',
      sort_order: 1
    },
    {
      slug: 'omnia',
      name: 'Omnia',
      display_name: 'Omnia', 
      description: 'Contemporary luxury with modern amenities and sophisticated design',
      brand_color: '#2C3E50',
      sort_order: 2
    },
    {
      slug: 'upper-hse',
      name: 'Upper HSE',
      display_name: 'The Upper HSE',
      description: 'Premium hospitality with attention to detail and personalized service', 
      brand_color: '#8B4513',
      sort_order: 3
    },
    {
      slug: 'wedcation',
      name: 'Wedcation',
      display_name: 'Wedcation',
      description: 'Destination wedding venues with comprehensive celebration services',
      brand_color: '#E91E63', 
      sort_order: 4
    }
  ]
  
  const { data, error } = await supabase
    .from('brands')
    .insert(brands)
    .select()
  
  if (error) {
    console.log('   ❌ Failed to insert brands:', error.message)
  } else {
    console.log(`   ✅ Inserted ${data.length} brands`)
  }
  
  return data
}

async function populateLocations(): Promise<void> {
  console.log('📍 Populating locations...')
  
  const locations = [
    { slug: 'delhi', name: 'Delhi', state: 'Delhi', display_order: 1 },
    { slug: 'noida', name: 'Noida', state: 'Uttar Pradesh', display_order: 2 },
    { slug: 'greater-noida', name: 'Greater Noida', state: 'Uttar Pradesh', display_order: 3 },
    { slug: 'palwal', name: 'Palwal', state: 'Haryana', display_order: 4 },
    { slug: 'rewari', name: 'Rewari', state: 'Haryana', display_order: 5 },
    { slug: 'ambala', name: 'Ambala', state: 'Haryana', display_order: 6 },
    { slug: 'israna', name: 'Israna', state: 'Haryana', display_order: 7 }
  ]
  
  const { data, error } = await supabase
    .from('locations')
    .insert(locations)
    .select()
  
  if (error) {
    console.log('   ❌ Failed to insert locations:', error.message)
  } else {
    console.log(`   ✅ Inserted ${data.length} locations`)
  }
  
  return data
}

async function populateAmenities(): Promise<void> {
  console.log('🏨 Populating amenities...')
  
  const amenities = [
    // Wellness & Recreation
    { name: 'Swimming Pool', description: 'Indoor/outdoor swimming pool with poolside service', icon_name: 'Waves', category: 'wellness' },
    { name: 'Fitness Center', description: '24/7 modern fitness center with latest equipment', icon_name: 'Dumbbell', category: 'wellness' },
    { name: 'Spa Services', description: 'Full-service spa with therapeutic treatments', icon_name: 'Heart', category: 'wellness' },
    { name: 'Yoga Studio', description: 'Dedicated yoga and meditation space', icon_name: 'User', category: 'wellness' },
    
    // Dining
    { name: 'Multi-Cuisine Restaurant', description: 'Fine dining restaurant with diverse menu', icon_name: 'Utensils', category: 'dining' },
    { name: 'Room Service', description: '24-hour in-room dining service', icon_name: 'Coffee', category: 'dining' },
    { name: 'Bar & Lounge', description: 'Cocktail bar and lounge area', icon_name: 'Wine', category: 'dining' },
    { name: 'Banquet Hall', description: 'Grand banquet facilities for events', icon_name: 'Users', category: 'dining' },
    
    // Business & Connectivity  
    { name: 'Free WiFi', description: 'Complimentary high-speed internet throughout', icon_name: 'Wifi', category: 'business' },
    { name: 'Business Center', description: 'Fully equipped business center', icon_name: 'Briefcase', category: 'business' },
    { name: 'Conference Rooms', description: 'Modern meeting and conference facilities', icon_name: 'Monitor', category: 'business' },
    { name: 'Airport Transfer', description: 'Complimentary airport shuttle service', icon_name: 'Car', category: 'business' },
    
    // Recreation & Entertainment
    { name: 'Garden Area', description: 'Landscaped gardens and outdoor spaces', icon_name: 'TreePine', category: 'recreation' },
    { name: 'Kids Play Area', description: 'Safe and fun play area for children', icon_name: 'Baby', category: 'recreation' },
    { name: 'Event Lawn', description: 'Spacious outdoor event and wedding lawn', icon_name: 'MapPin', category: 'recreation' },
    { name: 'Parking', description: 'Complimentary valet and self-parking', icon_name: 'Car', category: 'recreation' }
  ]
  
  const { data, error } = await supabase
    .from('amenities')
    .insert(amenities)
    .select()
  
  if (error) {
    console.log('   ❌ Failed to insert amenities:', error.message)
  } else {
    console.log(`   ✅ Inserted ${data.length} amenities`)
  }
  
  return data
}

async function verifyPopulation(): Promise<void> {
  console.log('\n🔍 Verifying data population...')
  
  const tables = ['brands', 'locations', 'amenities']
  
  for (const table of tables) {
    const { data, error, count } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true })
    
    if (error) {
      console.log(`   ❌ ${table}: ${error.message}`)
    } else {
      console.log(`   ✅ ${table}: ${count} records`)
    }
  }
}

async function main(): Promise<void> {
  try {
    console.log('🏨 Tivoli Hotels - Database Population\n')
    
    await populateBrands()
    await populateLocations() 
    await populateAmenities()
    
    await verifyPopulation()
    
    console.log('\n🎉 Basic data population completed!')
    console.log('\n📋 Next steps:')
    console.log('1. Create storage buckets (requires service role or dashboard)')
    console.log('2. Populate hotels table with detailed hotel data')
    console.log('3. Run image migration scripts')
    console.log('4. Test application integration')
    
  } catch (error) {
    console.error('❌ Database population failed:', error)
    process.exit(1)
  }
}

main()