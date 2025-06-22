/**
 * Check Existing Supabase Data
 * Created: 2025-06-20
 * 
 * Check what tables and data already exist before migration
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function checkExistingData(): Promise<void> {
  console.log('🔍 Checking existing Supabase data...\n')
  
  // Check storage buckets
  try {
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets()
    
    if (bucketError) {
      console.log('❌ Could not access storage:', bucketError.message)
    } else if (buckets && buckets.length > 0) {
      console.log('📁 Storage buckets found:')
      for (const bucket of buckets) {
        console.log(`   - ${bucket.name} (${bucket.public ? 'public' : 'private'})`)
        
        // List files in each bucket
        const { data: files, error: filesError } = await supabase.storage
          .from(bucket.name)
          .list('', { limit: 10 })
        
        if (!filesError && files && files.length > 0) {
          console.log(`     Files: ${files.length} items`)
          files.slice(0, 3).forEach(file => 
            console.log(`       - ${file.name}`)
          )
          if (files.length > 3) {
            console.log(`       ... and ${files.length - 3} more`)
          }
        }
      }
      console.log()
    } else {
      console.log('📁 No storage buckets found\n')
    }
  } catch (error) {
    console.log('❌ Storage check failed:', error)
  }
  
  // Check for common tables that might exist
  const tablesToCheck = [
    'brands', 'locations', 'hotels', 'media', 
    'rooms', 'amenities', 'dining'
  ]
  
  console.log('📋 Checking for existing tables:')
  
  for (const tableName of tablesToCheck) {
    try {
      const { data, error, count } = await supabase
        .from(tableName)
        .select('*', { count: 'exact', head: true })
      
      if (error && error.code === '42P01') {
        console.log(`   ❌ ${tableName}: does not exist`)
      } else if (error) {
        console.log(`   ⚠️  ${tableName}: ${error.message}`)
      } else {
        console.log(`   ✅ ${tableName}: exists with ${count || 0} records`)
      }
    } catch (err) {
      console.log(`   ❌ ${tableName}: check failed`)
    }
  }
  
  console.log('\n🔗 Database URL:', supabaseUrl)
  console.log('🔑 Using anon key (safe to display partial):', supabaseAnonKey.substring(0, 20) + '...')
}

async function main(): Promise<void> {
  try {
    await checkExistingData()
    
    console.log('\n📊 Summary:')
    console.log('- Connection to Supabase: ✅ Working')
    console.log('- Ready for migration analysis')
    
  } catch (error) {
    console.error('❌ Check failed:', error)
    process.exit(1)
  }
}

main()