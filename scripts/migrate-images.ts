/**
 * Image Migration Script
 * Phase 3: Image Migration
 * Created: 2025-06-20
 * 
 * Downloads external images and uploads them to Supabase Storage
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

interface ImageAudit {
  url: string
  source: 'supabase' | 'unsplash' | 'google' | 'other'
  hotel?: string
  context: string
  migrationStatus: 'pending' | 'skip' | 'migrate'
  newPath?: string
}

interface MigrationResult {
  original: ImageAudit
  success: boolean
  newUrl?: string
  mediaId?: string
  error?: string
}

async function downloadImage(url: string): Promise<ArrayBuffer> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.status} ${response.statusText}`)
  }
  return response.arrayBuffer()
}

async function uploadToSupabase(
  imageBuffer: ArrayBuffer, 
  path: string, 
  originalUrl: string
): Promise<{ url: string; mediaId: string }> {
  
  // Upload to Supabase Storage
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('tivoli-media')
    .upload(path, imageBuffer, {
      upsert: true,
      contentType: 'image/jpeg'
    })

  if (uploadError) {
    throw new Error(`Upload failed: ${uploadError.message}`)
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('tivoli-media')
    .getPublicUrl(path)

  // Create media record in database
  const { data: mediaData, error: mediaError } = await supabase
    .from('media')
    .insert({
      filename: path,
      original_filename: path.split('/').pop(),
      file_type: 'image/jpeg',
      supabase_path: path,
      public_url: publicUrl,
      alt_text: `Image for ${path}`,
      tags: [path.split('/')[1]], // hotel slug as tag
      upload_source: 'migration'
    })
    .select()
    .single()

  if (mediaError) {
    throw new Error(`Database insert failed: ${mediaError.message}`)
  }

  return {
    url: publicUrl,
    mediaId: mediaData.id
  }
}

async function linkImageToHotel(
  mediaId: string, 
  hotelId: string, 
  mediaType: string, 
  sortOrder: number
): Promise<void> {
  
  const { error } = await supabase
    .from('hotel_media')
    .insert({
      media_id: mediaId,
      hotel_id: hotelId,
      media_type: mediaType,
      sort_order: sortOrder
    })

  if (error) {
    throw new Error(`Failed to link media to hotel: ${error.message}`)
  }
}

async function getHotelId(hotelSlug: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('hotels')
    .select('id')
    .eq('slug', hotelSlug)
    .single()

  if (error || !data) {
    return null
  }

  return data.id
}

function determineMediaType(context: string): string {
  if (context === 'hero') return 'hero'
  if (context === 'gallery') return 'gallery'
  if (context.startsWith('rooms')) return 'room'
  if (context.startsWith('dining')) return 'dining'
  return 'gallery'
}

async function migrateImage(
  imageAudit: ImageAudit, 
  index: number, 
  total: number
): Promise<MigrationResult> {
  
  console.log(`📸 [${index + 1}/${total}] Migrating: ${imageAudit.url}`)
  
  try {
    // Skip if already in Supabase
    if (imageAudit.migrationStatus === 'skip') {
      console.log(`   ⏭️  Skipping (already in Supabase)`)
      return {
        original: imageAudit,
        success: true,
        newUrl: imageAudit.url
      }
    }

    // Get hotel ID
    const hotelId = imageAudit.hotel ? await getHotelId(imageAudit.hotel) : null
    if (imageAudit.hotel && !hotelId) {
      throw new Error(`Hotel not found: ${imageAudit.hotel}`)
    }

    // Download image
    console.log(`   📥 Downloading...`)
    const imageBuffer = await downloadImage(imageAudit.url)
    
    // Upload to Supabase
    console.log(`   📤 Uploading to Supabase...`)
    const { url: newUrl, mediaId } = await uploadToSupabase(
      imageBuffer, 
      imageAudit.newPath!, 
      imageAudit.url
    )

    // Link to hotel if applicable
    if (hotelId && imageAudit.hotel) {
      console.log(`   🔗 Linking to hotel...`)
      const mediaType = determineMediaType(imageAudit.context)
      await linkImageToHotel(mediaId, hotelId, mediaType, index)
    }

    console.log(`   ✅ Success: ${newUrl}`)
    
    return {
      original: imageAudit,
      success: true,
      newUrl,
      mediaId
    }

  } catch (error) {
    console.log(`   ❌ Failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    
    return {
      original: imageAudit,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

async function createUrlMappingFile(results: MigrationResult[]): Promise<void> {
  const mapping: Record<string, string> = {}
  
  results.forEach(result => {
    if (result.success && result.newUrl) {
      mapping[result.original.url] = result.newUrl
    }
  })

  const mappingPath = join(process.cwd(), 'image-url-mapping.json')
  writeFileSync(mappingPath, JSON.stringify(mapping, null, 2))
  console.log(`💾 URL mapping saved to: image-url-mapping.json`)
}

async function main() {
  console.log('🖼️ Tivoli Hotels Image Migration\n')

  // Load audit data
  const auditPath = join(process.cwd(), 'image-audit.json')
  const auditData: ImageAudit[] = JSON.parse(readFileSync(auditPath, 'utf-8'))
  
  const imagesToMigrate = auditData.filter(img => img.migrationStatus === 'migrate')
  const imagesToSkip = auditData.filter(img => img.migrationStatus === 'skip')
  
  console.log(`📊 Migration Plan:`)
  console.log(`   Images to migrate: ${imagesToMigrate.length}`)
  console.log(`   Images to skip: ${imagesToSkip.length}`)
  console.log(`   Total images: ${auditData.length}\n`)

  // Migrate images with progress tracking
  const results: MigrationResult[] = []
  let successCount = 0
  let failureCount = 0

  for (let i = 0; i < imagesToMigrate.length; i++) {
    const result = await migrateImage(imagesToMigrate[i], i, imagesToMigrate.length)
    results.push(result)
    
    if (result.success) {
      successCount++
    } else {
      failureCount++
    }

    // Add delay to avoid rate limiting
    if (i < imagesToMigrate.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }

  // Add skipped images to results
  imagesToSkip.forEach(img => {
    results.push({
      original: img,
      success: true,
      newUrl: img.url
    })
  })

  // Generate summary
  console.log(`\n📊 Migration Summary:`)
  console.log(`   ✅ Successful migrations: ${successCount}`)
  console.log(`   ❌ Failed migrations: ${failureCount}`)
  console.log(`   ⏭️  Skipped (already in Supabase): ${imagesToSkip.length}`)
  console.log(`   📊 Total processed: ${results.length}`)

  // Create URL mapping file
  await createUrlMappingFile(results)

  // Save detailed results
  const resultsPath = join(process.cwd(), 'migration-results.json')
  writeFileSync(resultsPath, JSON.stringify(results, null, 2))
  console.log(`💾 Detailed results saved to: migration-results.json`)

  if (failureCount === 0) {
    console.log('\n🎉 All images migrated successfully!')
  } else {
    console.log(`\n⚠️  Migration completed with ${failureCount} failures. Check migration-results.json for details.`)
  }

  console.log('\nNext steps:')
  console.log('1. Update components to use new image URLs')
  console.log('2. Test image loading in the application')
  console.log('3. Remove hardcoded image URLs from components')
}

main().catch(console.error)