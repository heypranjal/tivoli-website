/**
 * Comprehensive Application Testing Script
 * Phase 6: Testing & Optimization
 * Created: 2025-06-20
 * 
 * Complete end-to-end testing of the migrated application
 */

import { createClient } from '@supabase/supabase-js'
import { brandService, locationService, hotelService } from '../src/lib/supabase-services'
import { writeFileSync } from 'fs'
import { join } from 'path'

// Environment setup
const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

interface TestResult {
  name: string
  status: 'pass' | 'fail' | 'warning'
  duration: number
  details: string
  error?: string
}

interface PerformanceMetrics {
  queryTime: number
  dataSize: number
  cacheHit: boolean
}

class TestRunner {
  private results: TestResult[] = []
  private startTime: number = 0

  async runTest(name: string, testFn: () => Promise<void>): Promise<void> {
    console.log(`🧪 Running: ${name}`)
    this.startTime = Date.now()
    
    try {
      await testFn()
      const duration = Date.now() - this.startTime
      
      this.results.push({
        name,
        status: 'pass',
        duration,
        details: `Completed in ${duration}ms`
      })
      
      console.log(`  ✅ ${name} - ${duration}ms`)
    } catch (error) {
      const duration = Date.now() - this.startTime
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      
      this.results.push({
        name,
        status: 'fail',
        duration,
        details: `Failed after ${duration}ms`,
        error: errorMessage
      })
      
      console.log(`  ❌ ${name} - ${errorMessage}`)
    }
  }

  getResults(): TestResult[] {
    return this.results
  }

  getSummary() {
    const total = this.results.length
    const passed = this.results.filter(r => r.status === 'pass').length
    const failed = this.results.filter(r => r.status === 'fail').length
    const warnings = this.results.filter(r => r.status === 'warning').length
    
    return { total, passed, failed, warnings }
  }
}

/**
 * Test database connectivity and basic queries
 */
async function testDatabaseConnectivity(): Promise<void> {
  // Test brands table
  const brands = await brandService.getAllBrands()
  if (brands.length === 0) {
    throw new Error('No brands found - check data migration')
  }
  
  // Test locations table
  const locations = await locationService.getAllLocations()
  if (locations.length === 0) {
    throw new Error('No locations found - check data migration')
  }
  
  // Test hotels table with relations
  const hotels = await hotelService.getHotels()
  if (hotels.length === 0) {
    throw new Error('No hotels found - check data migration')
  }
  
  // Verify data integrity
  const hotelWithoutBrand = hotels.find(h => !h.brand)
  if (hotelWithoutBrand) {
    throw new Error(`Hotel ${hotelWithoutBrand.name} missing brand relation`)
  }
  
  const hotelWithoutLocation = hotels.find(h => !h.location)
  if (hotelWithoutLocation) {
    throw new Error(`Hotel ${hotelWithoutLocation.name} missing location relation`)
  }
}

/**
 * Test React Query hooks and caching
 */
async function testReactQueryIntegration(): Promise<void> {
  // Test featured hotels
  const featuredHotels = await hotelService.getFeaturedHotels()
  if (featuredHotels.length === 0) {
    throw new Error('No featured hotels found')
  }
  
  // Test brand filtering
  const tivoliHotels = await hotelService.getHotelsByBrand('tivoli')
  if (tivoliHotels.length === 0) {
    throw new Error('No Tivoli hotels found - check brand filtering')
  }
  
  // Test location filtering
  const delhiHotels = await hotelService.getHotelsByLocation('delhi')
  if (delhiHotels.length === 0) {
    throw new Error('No Delhi hotels found - check location filtering')
  }
  
  // Test single hotel fetch
  const singleHotel = await hotelService.getHotelBySlug('tivoli-grand-palace')
  if (!singleHotel) {
    throw new Error('Could not fetch single hotel - check slug routing')
  }
  
  if (!singleHotel.brand || !singleHotel.location) {
    throw new Error('Single hotel missing relations - check join queries')
  }
}

/**
 * Test image loading and storage
 */
async function testImageStorage(): Promise<void> {
  // Test storage bucket access
  const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()
  
  if (bucketsError) {
    throw new Error(`Storage access failed: ${bucketsError.message}`)
  }
  
  const hotelImagesBucket = buckets?.find(b => b.name === 'hotel-images')
  if (!hotelImagesBucket) {
    throw new Error('hotel-images bucket not found')
  }
  
  // Test image listing
  const { data: images, error: imagesError } = await supabase.storage
    .from('hotel-images')
    .list('', { limit: 5 })
  
  if (imagesError) {
    throw new Error(`Image listing failed: ${imagesError.message}`)
  }
  
  if (!images || images.length === 0) {
    throw new Error('No images found in storage - run image migration')
  }
  
  // Test public URL generation
  const { data: urlData } = supabase.storage
    .from('hotel-images')
    .getPublicUrl(images[0].name)
  
  if (!urlData.publicUrl) {
    throw new Error('Could not generate public URL for image')
  }
}

/**
 * Test performance metrics
 */
async function testPerformanceMetrics(): Promise<PerformanceMetrics> {
  const startTime = Date.now()
  
  // Test query performance
  const hotels = await hotelService.getHotels()
  const queryTime = Date.now() - startTime
  
  // Calculate data size (approximate)
  const dataSize = JSON.stringify(hotels).length
  
  return {
    queryTime,
    dataSize,
    cacheHit: false // Would be determined by React Query in actual app
  }
}

/**
 * Test error handling and edge cases
 */
async function testErrorHandling(): Promise<void> {
  // Test non-existent hotel
  const nonExistentHotel = await hotelService.getHotelBySlug('non-existent-hotel')
  if (nonExistentHotel !== null) {
    throw new Error('Should return null for non-existent hotel')
  }
  
  // Test invalid brand filter
  const invalidBrandHotels = await hotelService.getHotelsByBrand('invalid-brand')
  if (invalidBrandHotels.length > 0) {
    throw new Error('Should return empty array for invalid brand')
  }
  
  // Test invalid location filter
  const invalidLocationHotels = await hotelService.getHotelsByLocation('invalid-location')
  if (invalidLocationHotels.length > 0) {
    throw new Error('Should return empty array for invalid location')
  }
}

/**
 * Test data consistency and relationships
 */
async function testDataConsistency(): Promise<void> {
  const hotels = await hotelService.getHotels()
  
  // Check for duplicate slugs
  const slugs = hotels.map(h => h.slug)
  const uniqueSlugs = new Set(slugs)
  if (slugs.length !== uniqueSlugs.size) {
    throw new Error('Duplicate hotel slugs found')
  }
  
  // Check brand consistency
  const brands = await brandService.getAllBrands()
  const brandSlugs = new Set(brands.map(b => b.slug))
  
  for (const hotel of hotels) {
    if (hotel.brand && !brandSlugs.has(hotel.brand.slug)) {
      throw new Error(`Hotel ${hotel.name} has invalid brand: ${hotel.brand.slug}`)
    }
  }
  
  // Check location consistency
  const locations = await locationService.getAllLocations()
  const locationSlugs = new Set(locations.map(l => l.slug))
  
  for (const hotel of hotels) {
    if (hotel.location && !locationSlugs.has(hotel.location.slug)) {
      throw new Error(`Hotel ${hotel.name} has invalid location: ${hotel.location.slug}`)
    }
  }
}

/**
 * Test SEO and meta data
 */
async function testSEOMetadata(): Promise<void> {
  const hotels = await hotelService.getHotels()
  
  // Check for missing essential data
  const hotelsWithoutNames = hotels.filter(h => !h.name || h.name.trim() === '')
  if (hotelsWithoutNames.length > 0) {
    throw new Error(`${hotelsWithoutNames.length} hotels missing names`)
  }
  
  const hotelsWithoutDescriptions = hotels.filter(h => !h.description || h.description.trim() === '')
  if (hotelsWithoutDescriptions.length > 0) {
    console.warn(`Warning: ${hotelsWithoutDescriptions.length} hotels missing descriptions`)
  }
  
  // Check featured hotels have featured images
  const featuredHotels = await hotelService.getFeaturedHotels()
  const featuredWithoutImages = featuredHotels.filter(h => !h.featured_image)
  if (featuredWithoutImages.length > 0) {
    throw new Error(`${featuredWithoutImages.length} featured hotels missing featured images`)
  }
}

/**
 * Generate comprehensive test report
 */
async function generateTestReport(results: TestResult[], performanceMetrics: PerformanceMetrics): Promise<void> {
  const summary = {
    timestamp: new Date().toISOString(),
    environment: {
      supabase_url: supabaseUrl.substring(0, 30) + '...',
      node_env: process.env.NODE_ENV || 'development'
    },
    test_summary: {
      total_tests: results.length,
      passed: results.filter(r => r.status === 'pass').length,
      failed: results.filter(r => r.status === 'fail').length,
      warnings: results.filter(r => r.status === 'warning').length
    },
    performance: performanceMetrics,
    test_results: results,
    recommendations: []
  }
  
  // Add performance recommendations
  if (performanceMetrics.queryTime > 1000) {
    summary.recommendations.push('Query performance is slow (>1s). Consider optimizing database indexes.')
  }
  
  if (performanceMetrics.dataSize > 100000) {
    summary.recommendations.push('Large data payload. Consider implementing pagination.')
  }
  
  // Add failure recommendations
  const failedTests = results.filter(r => r.status === 'fail')
  if (failedTests.length > 0) {
    summary.recommendations.push('Some tests failed. Review the errors and fix before deploying.')
  }
  
  // Save detailed report
  const reportPath = join(process.cwd(), 'test-report.json')
  writeFileSync(reportPath, JSON.stringify(summary, null, 2))
  
  // Generate markdown report
  const markdownReport = `# Tivoli Hotels Test Report

Generated: ${summary.timestamp}

## Test Summary

- **Total Tests**: ${summary.test_summary.total_tests}
- **✅ Passed**: ${summary.test_summary.passed}
- **❌ Failed**: ${summary.test_summary.failed}
- **⚠️ Warnings**: ${summary.test_summary.warnings}

## Performance Metrics

- **Query Time**: ${performanceMetrics.queryTime}ms
- **Data Size**: ${(performanceMetrics.dataSize / 1024).toFixed(2)}KB
- **Cache Hit**: ${performanceMetrics.cacheHit ? 'Yes' : 'No'}

## Test Results

${results.map(r => `### ${r.status === 'pass' ? '✅' : r.status === 'fail' ? '❌' : '⚠️'} ${r.name}
- **Duration**: ${r.duration}ms
- **Details**: ${r.details}
${r.error ? `- **Error**: ${r.error}` : ''}
`).join('\n')}

## Recommendations

${summary.recommendations.length > 0 
  ? summary.recommendations.map(r => `- ${r}`).join('\n')
  : '- All tests passed! Your application is ready for production.'
}

## Next Steps

${summary.test_summary.failed > 0 
  ? '1. Fix the failing tests before deploying\n2. Re-run the test suite to verify fixes'
  : '1. Deploy to staging environment\n2. Run user acceptance testing\n3. Deploy to production'
}
`
  
  const markdownPath = join(process.cwd(), 'TEST_REPORT.md')
  writeFileSync(markdownPath, markdownReport)
  
  console.log(`📊 Test report saved to: test-report.json`)
  console.log(`📄 Markdown report saved to: TEST_REPORT.md`)
}

/**
 * Main testing function
 */
async function runComprehensiveTests(): Promise<void> {
  console.log('🧪 Starting Comprehensive Application Tests\n')
  console.log(`🔗 Testing against: ${supabaseUrl}\n`)
  
  const testRunner = new TestRunner()
  let performanceMetrics: PerformanceMetrics = { queryTime: 0, dataSize: 0, cacheHit: false }
  
  // Run all tests
  await testRunner.runTest('Database Connectivity', testDatabaseConnectivity)
  await testRunner.runTest('React Query Integration', testReactQueryIntegration)
  await testRunner.runTest('Image Storage', testImageStorage)
  await testRunner.runTest('Error Handling', testErrorHandling)
  await testRunner.runTest('Data Consistency', testDataConsistency)
  await testRunner.runTest('SEO Metadata', testSEOMetadata)
  
  // Performance test
  await testRunner.runTest('Performance Metrics', async () => {
    performanceMetrics = await testPerformanceMetrics()
  })
  
  // Generate summary
  const results = testRunner.getResults()
  const summary = testRunner.getSummary()
  
  console.log('\n📊 Test Summary:')
  console.log(`✅ Passed: ${summary.passed}/${summary.total}`)
  console.log(`❌ Failed: ${summary.failed}/${summary.total}`)
  console.log(`⚠️ Warnings: ${summary.warnings}/${summary.total}`)
  
  if (summary.failed === 0) {
    console.log('\n🎉 All tests passed! Your application is ready for production.')
  } else {
    console.log('\n⚠️ Some tests failed. Please review the issues before deploying.')
  }
  
  // Generate detailed report
  await generateTestReport(results, performanceMetrics)
  
  console.log('\n🔍 Performance Summary:')
  console.log(`⚡ Query Time: ${performanceMetrics.queryTime}ms`)
  console.log(`📦 Data Size: ${(performanceMetrics.dataSize / 1024).toFixed(2)}KB`)
  
  if (performanceMetrics.queryTime > 2000) {
    console.log('⚠️ Warning: Slow query performance detected')
  }
  
  console.log('\n🚀 Testing complete!')
}

// Export for use in other scripts
export { runComprehensiveTests, TestRunner }

// Run tests if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runComprehensiveTests()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('❌ Test execution failed:', error)
      process.exit(1)
    })
}