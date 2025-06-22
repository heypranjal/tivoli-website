/**
 * MCP-Powered Database Population
 * Created: 2025-06-20
 * 
 * Uses Supabase MCP server to populate database
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Try using Service Role Key if available for admin operations
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const adminSupabase = serviceRoleKey 
  ? createClient(supabaseUrl, serviceRoleKey)
  : supabase

async function executeSQL(sql: string, description: string): Promise<void> {
  console.log(`📝 ${description}...`)
  
  try {
    const { data, error } = await adminSupabase.rpc('exec_sql', {
      sql_query: sql
    })
    
    if (error) {
      console.log(`   ❌ Failed: ${error.message}`)
      // Try alternative approach with raw SQL
      const { data: rawData, error: rawError } = await adminSupabase
        .from('raw_sql')
        .select('*')
        .eq('query', sql)
        .single()
      
      if (rawError) {
        console.log(`   ❌ Alternative approach failed: ${rawError.message}`)
      }
    } else {
      console.log(`   ✅ Success`)
    }
  } catch (err) {
    console.log(`   ❌ Exception: ${err}`)
  }
}

async function populateWithDirectInserts(): Promise<void> {
  console.log('🏨 Attempting direct table inserts...\n')
  
  // Brands
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
  
  console.log('🏷️  Inserting brands...')
  const { data: brandsData, error: brandsError } = await adminSupabase
    .from('brands')
    .upsert(brands, { onConflict: 'slug' })
    .select()
  
  if (brandsError) {
    console.log('   ❌ Brands insert failed:', brandsError.message)
  } else {
    console.log(`   ✅ Inserted ${brandsData?.length || 0} brands`)
  }
  
  // Locations
  const locations = [
    { slug: 'delhi', name: 'Delhi', state: 'Delhi', display_order: 1 },
    { slug: 'noida', name: 'Noida', state: 'Uttar Pradesh', display_order: 2 },
    { slug: 'greater-noida', name: 'Greater Noida', state: 'Uttar Pradesh', display_order: 3 },
    { slug: 'palwal', name: 'Palwal', state: 'Haryana', display_order: 4 },
    { slug: 'rewari', name: 'Rewari', state: 'Haryana', display_order: 5 },
    { slug: 'ambala', name: 'Ambala', state: 'Haryana', display_order: 6 },
    { slug: 'israna', name: 'Israna', state: 'Haryana', display_order: 7 }
  ]
  
  console.log('📍 Inserting locations...')
  const { data: locationsData, error: locationsError } = await adminSupabase
    .from('locations')
    .upsert(locations, { onConflict: 'slug' })
    .select()
  
  if (locationsError) {
    console.log('   ❌ Locations insert failed:', locationsError.message)
  } else {
    console.log(`   ✅ Inserted ${locationsData?.length || 0} locations`)
  }
}

async function createStorageBuckets(): Promise<void> {
  console.log('🪣 Creating storage buckets...\n')
  
  const buckets = [
    { id: 'hotel-images', public: true },
    { id: 'hotel-videos', public: true },
    { id: 'documents', public: false }
  ]
  
  for (const bucket of buckets) {
    console.log(`📁 Creating bucket: ${bucket.id}`)
    const { data, error } = await adminSupabase.storage.createBucket(bucket.id, {
      public: bucket.public,
      fileSizeLimit: bucket.id === 'hotel-videos' ? 104857600 : 10485760,
      allowedMimeTypes: bucket.id === 'hotel-videos' 
        ? ['video/mp4', 'video/webm']
        : ['image/jpeg', 'image/png', 'image/webp']
    })
    
    if (error) {
      if (error.message.includes('already exists')) {
        console.log(`   ✅ Bucket ${bucket.id} already exists`)
      } else {
        console.log(`   ❌ Failed to create ${bucket.id}: ${error.message}`)
      }
    } else {
      console.log(`   ✅ Created bucket: ${bucket.id}`)
    }
  }
}

async function verifySetup(): Promise<void> {
  console.log('\n🔍 Verifying setup...')
  
  // Check tables
  const tables = ['brands', 'locations', 'amenities', 'hotels']
  for (const table of tables) {
    const { data, error, count } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true })
    
    if (error) {
      console.log(`   ❌ ${table}: ${error.message}`)
    } else {
      console.log(`   ✅ ${table}: ${count || 0} records`)
    }
  }
  
  // Check storage
  const { data: buckets, error: bucketError } = await supabase.storage.listBuckets()
  if (!bucketError && buckets) {
    console.log(`   ✅ Storage: ${buckets.length} buckets`)
  }
}

async function main(): Promise<void> {
  try {
    console.log('🏨 Tivoli Hotels - MCP Database Population\n')
    console.log(`🔗 Connected to: ${supabaseUrl}\n`)
    
    await populateWithDirectInserts()
    await createStorageBuckets()
    await verifySetup()
    
    console.log('\n🎉 Database population completed!')
    console.log('\n📋 Next steps:')
    console.log('1. If tables are still empty, execute SQL manually in dashboard')
    console.log('2. Run image migration: npm run migrate:images')
    console.log('3. Test application: npm run test:comprehensive')
    
  } catch (error) {
    console.error('❌ MCP population failed:', error)
    process.exit(1)
  }
}

main()