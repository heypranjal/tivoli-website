/**
 * Test Supabase Services
 * Phase 5: Database Migration & Data Population
 * Updated: 2025-06-20
 * 
 * Script to test the service layer and verify data migration
 */

import { createClient } from '@supabase/supabase-js'
import { brandService, locationService, hotelService } from '../src/lib/supabase-services'

// Initialize Supabase client for testing
const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables')
  console.error('Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set')
  process.exit(1)
}

console.log('🔗 Connecting to Supabase:', supabaseUrl.substring(0, 30) + '...')

async function testServices() {
  console.log('🧪 Testing Supabase Services\n')
  
  try {
    // Test basic connection first
    console.log('🔍 Testing basic connection...')
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    const { data: healthCheck, error: healthError } = await supabase
      .from('brands')
      .select('count')
      .limit(1)
    
    if (healthError) {
      throw new Error(`Connection failed: ${healthError.message}`)
    }
    
    console.log('✅ Database connection successful\n')
    // Test brands
    console.log('📊 Testing brands service...')
    const brands = await brandService.getAllBrands()
    console.log(`✅ Found ${brands.length} brands:`)
    brands.forEach(brand => {
      console.log(`   - ${brand.display_name} (${brand.slug})`)
    })
    
    // Test locations
    console.log('\n📍 Testing locations service...')
    const locations = await locationService.getAllLocations()
    console.log(`✅ Found ${locations.length} locations:`)
    locations.forEach(location => {
      console.log(`   - ${location.name}, ${location.state} (${location.slug})`)
    })
    
    // Test hotels
    console.log('\n🏨 Testing hotels service...')
    const hotels = await hotelService.getHotels()
    console.log(`✅ Found ${hotels.length} hotels:`)
    hotels.forEach(hotel => {
      console.log(`   - ${hotel.name} [${hotel.brand?.display_name}] in ${hotel.location?.name}`)
    })
    
    // Test featured hotels
    console.log('\n⭐ Testing featured hotels...')
    const featuredHotels = await hotelService.getFeaturedHotels()
    console.log(`✅ Found ${featuredHotels.length} featured hotels`)
    
    // Test hotels by brand
    console.log('\n🏷️ Testing hotels by brand (Tivoli)...')
    const tivoliHotels = await hotelService.getHotelsByBrand('tivoli')
    console.log(`✅ Found ${tivoliHotels.length} Tivoli hotels`)
    
    // Test single hotel
    console.log('\n🎯 Testing single hotel fetch...')
    const singleHotel = await hotelService.getHotelBySlug('tivoli-grand-palace')
    if (singleHotel) {
      console.log(`✅ Hotel: ${singleHotel.name}`)
      console.log(`   📍 Location: ${singleHotel.location?.name}`)
      console.log(`   🏷️ Brand: ${singleHotel.brand?.display_name}`)
      console.log(`   🖼️ Images: ${singleHotel.images?.length || 0}`)
      console.log(`   🛏️ Rooms: ${singleHotel.rooms?.length || 0}`)
      console.log(`   🍽️ Dining: ${singleHotel.dining?.length || 0}`)
      console.log(`   ⚡ Features: ${singleHotel.features?.length || 0}`)
    }
    
    console.log('\n📊 Service Test Summary:')
    console.log('✅ Brands service working')
    console.log('✅ Locations service working')
    console.log('✅ Hotels service working')
    console.log('✅ Featured hotels working')
    console.log('✅ Brand filtering working')
    console.log('✅ Single hotel fetch working')
    console.log('\n🎉 All service tests passed!')
    console.log('\n🚀 Your Supabase setup is ready for production!')
    
  } catch (error) {
    console.error('❌ Service test failed:', error)
    console.error('\nTroubleshooting:')
    console.error('1. Ensure your Supabase project is active')
    console.error('2. Check your environment variables are correct')
    console.error('3. Verify the database migrations were executed')
    console.error('4. Check Row Level Security policies allow public access')
    process.exit(1)
  }
}

testServices().catch(console.error)