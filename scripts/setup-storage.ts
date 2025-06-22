/**
 * Setup Supabase Storage Buckets
 * Created: 2025-06-20
 * 
 * Create storage buckets and policies via API
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function createStorageBuckets(): Promise<void> {
  console.log('🪣 Creating Supabase Storage buckets...\n')
  
  const buckets = [
    {
      id: 'hotel-images',
      name: 'hotel-images',
      public: true,
      fileSizeLimit: 10485760, // 10MB
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp']
    },
    {
      id: 'hotel-videos', 
      name: 'hotel-videos',
      public: true,
      fileSizeLimit: 104857600, // 100MB
      allowedMimeTypes: ['video/mp4', 'video/webm']
    },
    {
      id: 'documents',
      name: 'documents', 
      public: false,
      fileSizeLimit: 5242880, // 5MB
      allowedMimeTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    }
  ]
  
  for (const bucketConfig of buckets) {
    console.log(`📁 Creating bucket: ${bucketConfig.name}`)
    
    const { data, error } = await supabase.storage.createBucket(bucketConfig.id, {
      public: bucketConfig.public,
      fileSizeLimit: bucketConfig.fileSizeLimit,
      allowedMimeTypes: bucketConfig.allowedMimeTypes
    })
    
    if (error) {
      if (error.message.includes('already exists')) {
        console.log(`   ✅ Bucket ${bucketConfig.name} already exists`)
      } else {
        console.log(`   ❌ Failed to create ${bucketConfig.name}: ${error.message}`)
      }
    } else {
      console.log(`   ✅ Created bucket: ${bucketConfig.name}`)
    }
  }
}

async function verifyStorage(): Promise<void> {
  console.log('\n🔍 Verifying storage setup...')
  
  const { data: buckets, error } = await supabase.storage.listBuckets()
  
  if (error) {
    console.log('❌ Could not list buckets:', error.message)
    return
  }
  
  if (buckets && buckets.length > 0) {
    console.log('✅ Storage buckets verified:')
    buckets.forEach(bucket => {
      console.log(`   - ${bucket.name} (${bucket.public ? 'public' : 'private'})`)
    })
  } else {
    console.log('❌ No buckets found')
  }
}

async function main(): Promise<void> {
  try {
    console.log('🏨 Tivoli Hotels - Storage Setup\n')
    
    await createStorageBuckets()
    await verifyStorage()
    
    console.log('\n🎉 Storage setup completed!')
    console.log('\nNext steps:')
    console.log('1. Populate database with hotel data')  
    console.log('2. Run image migration to upload files to storage')
    console.log('3. Test application with Supabase data')
    
  } catch (error) {
    console.error('❌ Storage setup failed:', error)
    process.exit(1)
  }
}

main()