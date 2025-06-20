/**
 * Test Supabase Services
 * Phase 2: Data Migration
 * Created: 2025-06-20
 * 
 * Script to test the service layer and verify data migration
 */

import { brandService, locationService, hotelService } from '../src/lib/supabase-services'

async function testServices() {
  console.log('🧪 Testing Supabase Services\n')
  
  try {
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
    
    console.log('\n🎉 All service tests passed!')
    
  } catch (error) {
    console.error('❌ Service test failed:', error)
    process.exit(1)
  }
}

testServices().catch(console.error)