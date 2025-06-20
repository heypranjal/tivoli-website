/**
 * Image Audit Script
 * Phase 3: Image Migration
 * Created: 2025-06-20
 * 
 * Audits all images in the codebase and categorizes them for migration
 */

import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { hotels } from '../src/data/hotels'

interface ImageAudit {
  url: string
  source: 'supabase' | 'unsplash' | 'google' | 'other'
  hotel?: string
  context: string
  migrationStatus: 'pending' | 'skip' | 'migrate'
  newPath?: string
}

function categorizeImageSource(url: string): ImageAudit['source'] {
  if (url.includes('supabase.co')) return 'supabase'
  if (url.includes('unsplash.com')) return 'unsplash'
  if (url.includes('googleusercontent.com')) return 'google'
  return 'other'
}

function generateNewPath(hotel: string, imageIndex: number, context: string): string {
  return `hotels/${hotel}/${context}/${imageIndex + 1}.jpg`
}

async function auditImages(): Promise<ImageAudit[]> {
  const images: ImageAudit[] = []
  
  console.log('🔍 Auditing images from hotel data...\n')
  
  // Audit hotel images from data files
  hotels.forEach(hotel => {
    // Main hotel images
    hotel.images?.forEach((url, index) => {
      images.push({
        url,
        source: categorizeImageSource(url),
        hotel: hotel.slug,
        context: index === 0 ? 'hero' : 'gallery',
        migrationStatus: categorizeImageSource(url) === 'supabase' ? 'skip' : 'migrate',
        newPath: generateNewPath(hotel.slug, index, index === 0 ? 'hero' : 'gallery')
      })
    })
    
    // Room images
    hotel.rooms?.forEach((room, roomIndex) => {
      room.images?.forEach((url, imageIndex) => {
        images.push({
          url,
          source: categorizeImageSource(url),
          hotel: hotel.slug,
          context: `rooms/${room.id}`,
          migrationStatus: categorizeImageSource(url) === 'supabase' ? 'skip' : 'migrate',
          newPath: generateNewPath(hotel.slug, roomIndex * 10 + imageIndex, 'rooms')
        })
      })
    })
    
    // Dining images
    hotel.dining?.forEach((dining, diningIndex) => {
      if (dining.image) {
        images.push({
          url: dining.image,
          source: categorizeImageSource(dining.image),
          hotel: hotel.slug,
          context: `dining/${dining.id}`,
          migrationStatus: categorizeImageSource(dining.image) === 'supabase' ? 'skip' : 'migrate',
          newPath: generateNewPath(hotel.slug, diningIndex, 'dining')
        })
      }
    })
  })
  
  return images
}

function generateImageAuditReport(images: ImageAudit[]): string {
  const sourceStats = images.reduce((acc, img) => {
    acc[img.source] = (acc[img.source] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  const migrationStats = images.reduce((acc, img) => {
    acc[img.migrationStatus] = (acc[img.migrationStatus] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  const hotelStats = images.reduce((acc, img) => {
    if (img.hotel) {
      acc[img.hotel] = (acc[img.hotel] || 0) + 1
    }
    return acc
  }, {} as Record<string, number>)
  
  return `# Image Audit Report
Generated: ${new Date().toISOString()}

## Summary
- **Total Images**: ${images.length}
- **Images to Migrate**: ${migrationStats.migrate || 0}
- **Images to Skip**: ${migrationStats.skip || 0}

## Source Breakdown
${Object.entries(sourceStats).map(([source, count]) => `- **${source}**: ${count}`).join('\n')}

## Migration Status
${Object.entries(migrationStats).map(([status, count]) => `- **${status}**: ${count}`).join('\n')}

## Hotels with Images
${Object.entries(hotelStats).map(([hotel, count]) => `- **${hotel}**: ${count} images`).join('\n')}

## Images to Migrate
${images.filter(img => img.migrationStatus === 'migrate').map(img => 
  `- \`${img.url}\` → \`${img.newPath}\` (${img.context})`
).join('\n')}

## Images Already in Supabase (Skip)
${images.filter(img => img.migrationStatus === 'skip').map(img => 
  `- \`${img.url}\` (${img.context})`
).join('\n')}

## Migration Plan
1. **Download External Images**: ${images.filter(img => img.migrationStatus === 'migrate' && img.source !== 'supabase').length} images
2. **Upload to Supabase Storage**: Organize by hotel and context
3. **Update Database**: Create media records and hotel_media links
4. **Update Components**: Replace hardcoded URLs with dynamic fetching

## Next Steps
- Run image migration script
- Update media database
- Test image loading
- Update components to use new image system
`
}

async function main() {
  console.log('🖼️ Tivoli Hotels Image Audit\n')
  
  const images = await auditImages()
  
  console.log(`📊 Audit Results:`)
  console.log(`   Total images found: ${images.length}`)
  console.log(`   Images to migrate: ${images.filter(img => img.migrationStatus === 'migrate').length}`)
  console.log(`   Images to skip: ${images.filter(img => img.migrationStatus === 'skip').length}`)
  
  // Generate detailed report
  const report = generateImageAuditReport(images)
  
  // Save audit results
  const auditPath = join(process.cwd(), 'IMAGE_AUDIT.md')
  writeFileSync(auditPath, report)
  console.log(`\n📝 Detailed audit report saved to: IMAGE_AUDIT.md`)
  
  // Save JSON data for migration script
  const dataPath = join(process.cwd(), 'image-audit.json')
  writeFileSync(dataPath, JSON.stringify(images, null, 2))
  console.log(`💾 Audit data saved to: image-audit.json`)
  
  console.log('\n✅ Image audit complete!')
}

main().catch(console.error)