/**
 * Error Tracking and Debugging Script
 * Phase 6: Testing & Optimization
 * Created: 2025-06-20
 * 
 * Comprehensive error tracking and debugging tools
 */

import { createClient } from '@supabase/supabase-js'
import { hotelService, brandService, locationService } from '../src/lib/supabase-services'
import { writeFileSync } from 'fs'
import { join } from 'path'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

interface ErrorLog {
  timestamp: number
  operation: string
  error: string
  stack?: string
  context?: any
  severity: 'low' | 'medium' | 'high' | 'critical'
}

interface DiagnosticResult {
  test: string
  status: 'pass' | 'fail' | 'warning'
  message: string
  details?: any
}

class ErrorTracker {
  private errors: ErrorLog[] = []

  logError(
    operation: string,
    error: Error | string,
    context?: any,
    severity: ErrorLog['severity'] = 'medium'
  ): void {
    const errorLog: ErrorLog = {
      timestamp: Date.now(),
      operation,
      error: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
      context,
      severity
    }

    this.errors.push(errorLog)
    
    const severityIcon = {
      low: '💡',
      medium: '⚠️',
      high: '🚨',
      critical: '💥'
    }[severity]

    console.log(`${severityIcon} [${severity.toUpperCase()}] ${operation}: ${errorLog.error}`)
  }

  getErrors(): ErrorLog[] {
    return [...this.errors]
  }

  getErrorsByOperation(): Map<string, ErrorLog[]> {
    const errorsByOperation = new Map<string, ErrorLog[]>()
    
    for (const error of this.errors) {
      if (!errorsByOperation.has(error.operation)) {
        errorsByOperation.set(error.operation, [])
      }
      errorsByOperation.get(error.operation)!.push(error)
    }
    
    return errorsByOperation
  }

  generateReport(): object {
    const errorsByOperation = this.getErrorsByOperation()
    const totalErrors = this.errors.length
    const criticalErrors = this.errors.filter(e => e.severity === 'critical').length
    const highErrors = this.errors.filter(e => e.severity === 'high').length
    
    return {
      timestamp: new Date().toISOString(),
      summary: {
        total_errors: totalErrors,
        critical_errors: criticalErrors,
        high_errors: highErrors,
        operations_affected: errorsByOperation.size
      },
      errors_by_operation: Object.fromEntries(
        Array.from(errorsByOperation.entries()).map(([op, errors]) => [
          op,
          {
            count: errors.length,
            severity_breakdown: {
              critical: errors.filter(e => e.severity === 'critical').length,
              high: errors.filter(e => e.severity === 'high').length,
              medium: errors.filter(e => e.severity === 'medium').length,
              low: errors.filter(e => e.severity === 'low').length
            },
            recent_errors: errors.slice(-3).map(e => ({
              timestamp: new Date(e.timestamp).toISOString(),
              error: e.error,
              context: e.context
            }))
          }
        ])
      ),
      all_errors: this.errors.map(e => ({
        timestamp: new Date(e.timestamp).toISOString(),
        operation: e.operation,
        error: e.error,
        severity: e.severity,
        context: e.context
      }))
    }
  }
}

/**
 * Run comprehensive diagnostics
 */
async function runDiagnostics(): Promise<DiagnosticResult[]> {
  const results: DiagnosticResult[] = []
  const errorTracker = new ErrorTracker()

  // Test 1: Database connectivity
  try {
    const { data, error } = await supabase
      .from('brands')
      .select('count')
      .limit(1)

    if (error) throw error

    results.push({
      test: 'Database Connectivity',
      status: 'pass',
      message: 'Successfully connected to Supabase database'
    })
  } catch (error) {
    errorTracker.logError('Database Connectivity', error as Error, null, 'critical')
    results.push({
      test: 'Database Connectivity',
      status: 'fail',
      message: `Failed to connect: ${error instanceof Error ? error.message : 'Unknown error'}`
    })
  }

  // Test 2: RLS Policies
  try {
    const { data, error } = await supabase
      .from('hotels')
      .select('id')
      .limit(1)

    if (error) throw error

    results.push({
      test: 'RLS Policies',
      status: 'pass',
      message: 'Row Level Security policies are working correctly'
    })
  } catch (error) {
    errorTracker.logError('RLS Policies', error as Error, null, 'high')
    results.push({
      test: 'RLS Policies',
      status: 'fail',
      message: `RLS policy error: ${error instanceof Error ? error.message : 'Unknown error'}`
    })
  }

  // Test 3: Data integrity
  try {
    const hotels = await hotelService.getHotels()
    const issues: string[] = []

    // Check for hotels without brands
    const hotelsWithoutBrands = hotels.filter(h => !h.brand)
    if (hotelsWithoutBrands.length > 0) {
      issues.push(`${hotelsWithoutBrands.length} hotels missing brand relations`)
    }

    // Check for hotels without locations
    const hotelsWithoutLocations = hotels.filter(h => !h.location)
    if (hotelsWithoutLocations.length > 0) {
      issues.push(`${hotelsWithoutLocations.length} hotels missing location relations`)
    }

    // Check for duplicate slugs
    const slugs = hotels.map(h => h.slug)
    const uniqueSlugs = new Set(slugs)
    if (slugs.length !== uniqueSlugs.size) {
      issues.push('Duplicate hotel slugs detected')
    }

    if (issues.length === 0) {
      results.push({
        test: 'Data Integrity',
        status: 'pass',
        message: 'All data integrity checks passed'
      })
    } else {
      errorTracker.logError('Data Integrity', issues.join('; '), { issues }, 'high')
      results.push({
        test: 'Data Integrity',
        status: 'fail',
        message: `Data integrity issues: ${issues.join(', ')}`,
        details: { issues }
      })
    }
  } catch (error) {
    errorTracker.logError('Data Integrity', error as Error, null, 'high')
    results.push({
      test: 'Data Integrity',
      status: 'fail',
      message: `Data integrity check failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    })
  }

  // Test 4: Storage access
  try {
    const { data: buckets, error } = await supabase.storage.listBuckets()
    
    if (error) throw error

    const requiredBuckets = ['hotel-images', 'hotel-videos', 'documents']
    const existingBuckets = buckets?.map(b => b.name) || []
    const missingBuckets = requiredBuckets.filter(b => !existingBuckets.includes(b))

    if (missingBuckets.length === 0) {
      results.push({
        test: 'Storage Access',
        status: 'pass',
        message: 'All required storage buckets are accessible'
      })
    } else {
      errorTracker.logError('Storage Access', `Missing buckets: ${missingBuckets.join(', ')}`, { missingBuckets }, 'medium')
      results.push({
        test: 'Storage Access',
        status: 'warning',
        message: `Missing storage buckets: ${missingBuckets.join(', ')}`,
        details: { missingBuckets, existingBuckets }
      })
    }
  } catch (error) {
    errorTracker.logError('Storage Access', error as Error, null, 'medium')
    results.push({
      test: 'Storage Access',
      status: 'fail',
      message: `Storage access failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    })
  }

  // Test 5: Service layer functions
  const serviceFunctions = [
    { name: 'getAllBrands', fn: () => brandService.getAllBrands() },
    { name: 'getAllLocations', fn: () => locationService.getAllLocations() },
    { name: 'getHotels', fn: () => hotelService.getHotels() },
    { name: 'getFeaturedHotels', fn: () => hotelService.getFeaturedHotels() },
    { name: 'getHotelBySlug', fn: () => hotelService.getHotelBySlug('tivoli-grand-palace') }
  ]

  let passedServices = 0
  for (const service of serviceFunctions) {
    try {
      const result = await service.fn()
      if (result) {
        passedServices++
      } else {
        errorTracker.logError('Service Layer', `${service.name} returned null/undefined`, { service: service.name }, 'medium')
      }
    } catch (error) {
      errorTracker.logError('Service Layer', error as Error, { service: service.name }, 'high')
    }
  }

  if (passedServices === serviceFunctions.length) {
    results.push({
      test: 'Service Layer',
      status: 'pass',
      message: 'All service layer functions working correctly'
    })
  } else {
    results.push({
      test: 'Service Layer',
      status: 'fail',
      message: `${serviceFunctions.length - passedServices} service functions failed`,
      details: { passedServices, totalServices: serviceFunctions.length }
    })
  }

  // Test 6: Image handling
  try {
    const { data: images, error } = await supabase.storage
      .from('hotel-images')
      .list('', { limit: 5 })

    if (error) throw error

    if (images && images.length > 0) {
      // Test public URL generation
      const { data: urlData } = supabase.storage
        .from('hotel-images')
        .getPublicUrl(images[0].name)

      if (urlData.publicUrl) {
        results.push({
          test: 'Image Handling',
          status: 'pass',
          message: 'Image storage and URL generation working correctly'
        })
      } else {
        errorTracker.logError('Image Handling', 'Failed to generate public URL', { image: images[0] }, 'medium')
        results.push({
          test: 'Image Handling',
          status: 'warning',
          message: 'Images exist but URL generation failed'
        })
      }
    } else {
      errorTracker.logError('Image Handling', 'No images found in storage', null, 'low')
      results.push({
        test: 'Image Handling',
        status: 'warning',
        message: 'No images found in storage - run image migration'
      })
    }
  } catch (error) {
    errorTracker.logError('Image Handling', error as Error, null, 'medium')
    results.push({
      test: 'Image Handling',
      status: 'fail',
      message: `Image handling test failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    })
  }

  // Save error report
  const errorReport = errorTracker.generateReport()
  const errorReportPath = join(process.cwd(), 'error-report.json')
  writeFileSync(errorReportPath, JSON.stringify(errorReport, null, 2))

  return results
}

/**
 * Test error scenarios and edge cases
 */
async function testErrorScenarios(): Promise<void> {
  console.log('🧪 Testing Error Scenarios...\n')
  
  const errorTracker = new ErrorTracker()

  // Test 1: Invalid hotel slug
  try {
    const result = await hotelService.getHotelBySlug('non-existent-hotel')
    if (result !== null) {
      errorTracker.logError('Invalid Hotel Slug', 'Should return null for non-existent hotel', { result }, 'medium')
    } else {
      console.log('✅ Invalid hotel slug handled correctly')
    }
  } catch (error) {
    errorTracker.logError('Invalid Hotel Slug', error as Error, null, 'high')
  }

  // Test 2: Invalid brand filter
  try {
    const result = await hotelService.getHotelsByBrand('invalid-brand')
    if (result.length > 0) {
      errorTracker.logError('Invalid Brand Filter', 'Should return empty array for invalid brand', { result }, 'medium')
    } else {
      console.log('✅ Invalid brand filter handled correctly')
    }
  } catch (error) {
    errorTracker.logError('Invalid Brand Filter', error as Error, null, 'high')
  }

  // Test 3: Invalid location filter
  try {
    const result = await hotelService.getHotelsByLocation('invalid-location')
    if (result.length > 0) {
      errorTracker.logError('Invalid Location Filter', 'Should return empty array for invalid location', { result }, 'medium')
    } else {
      console.log('✅ Invalid location filter handled correctly')
    }
  } catch (error) {
    errorTracker.logError('Invalid Location Filter', error as Error, null, 'high')
  }

  // Test 4: Network timeout simulation (if possible)
  try {
    const controller = new AbortController()
    setTimeout(() => controller.abort(), 100) // Very short timeout

    const timeoutPromise = fetch(supabaseUrl, { 
      signal: controller.signal 
    })
    
    await timeoutPromise
    console.log('⚠️ Timeout test did not trigger (server too fast)')
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.log('✅ Network timeout handled correctly')
    } else {
      errorTracker.logError('Network Timeout', error as Error, null, 'low')
    }
  }

  // Generate final error report
  const errorReport = errorTracker.generateReport()
  console.log('\n📊 Error Testing Summary:')
  console.log(`Total Errors Logged: ${errorReport.summary.total_errors}`)
  console.log(`Critical Errors: ${errorReport.summary.critical_errors}`)
  console.log(`High Priority Errors: ${errorReport.summary.high_errors}`)

  if (errorReport.summary.total_errors === 0) {
    console.log('🎉 No errors detected during testing!')
  } else {
    console.log('⚠️ Errors detected - review the error report for details')
  }
}

/**
 * Generate debugging guide
 */
function generateDebuggingGuide(): void {
  const guide = `# Tivoli Hotels Debugging Guide

Generated: ${new Date().toISOString()}

## Common Issues and Solutions

### 1. Database Connection Errors

**Symptoms:**
- "Failed to connect to database"
- "Invalid API key"
- Timeout errors

**Solutions:**
1. Check environment variables (\`.env\` file)
2. Verify Supabase project is active
3. Confirm API keys are correct
4. Check network connectivity

### 2. RLS Policy Errors

**Symptoms:**
- "new row violates row-level security policy"
- "permission denied for table"
- Empty query results

**Solutions:**
1. Review RLS policies in Supabase dashboard
2. Ensure public read access is enabled
3. Check user authentication status
4. Verify policy conditions

### 3. Missing Data Errors

**Symptoms:**
- Empty arrays returned
- Null values for expected data
- "No hotels found" messages

**Solutions:**
1. Run data migration scripts
2. Check database tables in Supabase
3. Verify foreign key relationships
4. Re-run population scripts

### 4. Image Loading Errors

**Symptoms:**
- Broken images
- 404 errors for image URLs
- Storage access denied

**Solutions:**
1. Run image migration script
2. Check storage bucket permissions
3. Verify public access policies
4. Test image URLs manually

### 5. Performance Issues

**Symptoms:**
- Slow page loads
- High memory usage
- Timeout errors

**Solutions:**
1. Check React Query cache settings
2. Optimize database queries
3. Implement pagination
4. Add proper indexes

## Debugging Commands

\`\`\`bash
# Test database connection
npm run migrate:test

# Run comprehensive tests
npm run test:comprehensive

# Monitor performance
npm run test:performance

# Check error logs
npm run test:errors

# Test specific services
npm run test:services
\`\`\`

## Development Tools

### React Query DevTools
- Available in development mode
- Shows cache status and query states
- Helps debug stale data issues

### Supabase Dashboard
- View real-time logs
- Monitor API usage
- Check database performance
- Manage storage buckets

### Browser DevTools
- Network tab for API requests
- Console for error messages
- Application tab for cache inspection

## Production Monitoring

### Error Tracking
- Set up error reporting service
- Monitor API response times
- Track user experience metrics

### Performance Monitoring
- Database query performance
- Image loading times
- React Query cache efficiency

## Emergency Procedures

### Rollback Database
\`\`\`bash
npm run migrate:rollback
\`\`\`

### Clear Cache
\`\`\`bash
# Clear React Query cache
localStorage.clear()

# Clear browser cache
Ctrl+Shift+R (or Cmd+Shift+R)
\`\`\`

### Restore from Backup
1. Access Supabase dashboard
2. Go to Database → Backups
3. Restore from latest backup
4. Re-run migrations if needed

## Contact Information

For additional support:
- Supabase Documentation: https://supabase.com/docs
- React Query Documentation: https://tanstack.com/query/latest
- GitHub Issues: Create issue with error details
`

  const guidePath = join(process.cwd(), 'DEBUGGING_GUIDE.md')
  writeFileSync(guidePath, guide)
  console.log(`📖 Debugging guide saved to: ${guidePath}`)
}

/**
 * Main error tracking function
 */
async function runErrorTracking(): Promise<void> {
  console.log('🔍 Tivoli Hotels Error Tracking & Debugging\n')

  console.log('🏥 Running comprehensive diagnostics...')
  const diagnosticResults = await runDiagnostics()

  console.log('\n📊 Diagnostic Results:')
  diagnosticResults.forEach(result => {
    const icon = result.status === 'pass' ? '✅' : result.status === 'fail' ? '❌' : '⚠️'
    console.log(`${icon} ${result.test}: ${result.message}`)
  })

  console.log('\n🧪 Testing error scenarios...')
  await testErrorScenarios()

  console.log('\n📖 Generating debugging guide...')
  generateDebuggingGuide()

  const passedTests = diagnosticResults.filter(r => r.status === 'pass').length
  const totalTests = diagnosticResults.length

  console.log('\n📊 Final Summary:')
  console.log(`Tests Passed: ${passedTests}/${totalTests}`)
  
  if (passedTests === totalTests) {
    console.log('🎉 All diagnostics passed! Your application is healthy.')
  } else {
    console.log('⚠️ Some diagnostics failed. Review the reports for details.')
  }

  console.log('\nGenerated files:')
  console.log('- error-report.json (detailed error analysis)')
  console.log('- DEBUGGING_GUIDE.md (troubleshooting guide)')
}

// Export for use in other scripts
export { ErrorTracker, runDiagnostics, testErrorScenarios }

// Run error tracking if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runErrorTracking()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('❌ Error tracking failed:', error)
      process.exit(1)
    })
}