/**
 * Performance Monitoring Script
 * Phase 6: Testing & Optimization
 * Created: 2025-06-20
 * 
 * Monitor and optimize application performance
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

interface PerformanceMetric {
  operation: string
  duration: number
  timestamp: number
  success: boolean
  dataSize?: number
  error?: string
}

interface QueryAnalysis {
  query: string
  avgDuration: number
  callCount: number
  maxDuration: number
  minDuration: number
  errorRate: number
  dataTransfer: number
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = []
  private queryStats: Map<string, PerformanceMetric[]> = new Map()

  async measureOperation<T>(
    operation: string,
    fn: () => Promise<T>
  ): Promise<T> {
    const startTime = Date.now()
    const timestamp = Date.now()
    
    try {
      const result = await fn()
      const duration = Date.now() - startTime
      const dataSize = JSON.stringify(result).length
      
      const metric: PerformanceMetric = {
        operation,
        duration,
        timestamp,
        success: true,
        dataSize
      }
      
      this.recordMetric(metric)
      return result
      
    } catch (error) {
      const duration = Date.now() - startTime
      const metric: PerformanceMetric = {
        operation,
        duration,
        timestamp,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
      
      this.recordMetric(metric)
      throw error
    }
  }

  private recordMetric(metric: PerformanceMetric): void {
    this.metrics.push(metric)
    
    // Group by operation for analysis
    if (!this.queryStats.has(metric.operation)) {
      this.queryStats.set(metric.operation, [])
    }
    this.queryStats.get(metric.operation)!.push(metric)
  }

  getMetrics(): PerformanceMetric[] {
    return [...this.metrics]
  }

  analyzeQueries(): QueryAnalysis[] {
    const analyses: QueryAnalysis[] = []
    
    for (const [operation, metrics] of this.queryStats) {
      const successfulMetrics = metrics.filter(m => m.success)
      const durations = successfulMetrics.map(m => m.duration)
      const errors = metrics.filter(m => !m.success)
      
      if (durations.length === 0) continue
      
      const analysis: QueryAnalysis = {
        query: operation,
        avgDuration: durations.reduce((a, b) => a + b, 0) / durations.length,
        callCount: metrics.length,
        maxDuration: Math.max(...durations),
        minDuration: Math.min(...durations),
        errorRate: errors.length / metrics.length,
        dataTransfer: successfulMetrics.reduce((total, m) => total + (m.dataSize || 0), 0)
      }
      
      analyses.push(analysis)
    }
    
    return analyses.sort((a, b) => b.avgDuration - a.avgDuration)
  }

  generateReport(): object {
    const analyses = this.analyzeQueries()
    const totalMetrics = this.metrics.length
    const successfulOps = this.metrics.filter(m => m.success).length
    const totalDataTransfer = this.metrics.reduce((total, m) => total + (m.dataSize || 0), 0)
    
    return {
      timestamp: new Date().toISOString(),
      summary: {
        total_operations: totalMetrics,
        successful_operations: successfulOps,
        success_rate: successfulOps / totalMetrics,
        total_data_transfer: totalDataTransfer,
        avg_data_per_operation: totalDataTransfer / successfulOps
      },
      query_analysis: analyses,
      recommendations: this.generateRecommendations(analyses)
    }
  }

  private generateRecommendations(analyses: QueryAnalysis[]): string[] {
    const recommendations: string[] = []
    
    // Slow query recommendations
    const slowQueries = analyses.filter(a => a.avgDuration > 1000)
    if (slowQueries.length > 0) {
      recommendations.push(`Optimize slow queries: ${slowQueries.map(q => q.query).join(', ')}`)
    }
    
    // High error rate recommendations
    const errorProneQueries = analyses.filter(a => a.errorRate > 0.1)
    if (errorProneQueries.length > 0) {
      recommendations.push(`Fix error-prone queries: ${errorProneQueries.map(q => q.query).join(', ')}`)
    }
    
    // Large data transfer recommendations
    const heavyQueries = analyses.filter(a => a.dataTransfer > 100000)
    if (heavyQueries.length > 0) {
      recommendations.push(`Consider pagination for heavy queries: ${heavyQueries.map(q => q.query).join(', ')}`)
    }
    
    // React Query caching recommendations
    const frequentQueries = analyses.filter(a => a.callCount > 10)
    if (frequentQueries.length > 0) {
      recommendations.push(`Ensure proper React Query caching for frequent queries: ${frequentQueries.map(q => q.query).join(', ')}`)
    }
    
    if (recommendations.length === 0) {
      recommendations.push('Performance looks good! No immediate optimizations needed.')
    }
    
    return recommendations
  }
}

/**
 * Run comprehensive performance benchmarks
 */
async function runPerformanceBenchmarks(): Promise<void> {
  console.log('⚡ Starting Performance Benchmarks\n')
  
  const monitor = new PerformanceMonitor()
  
  // Benchmark basic operations
  console.log('📊 Benchmarking basic operations...')
  
  // Test brands loading
  await monitor.measureOperation('Load Brands', async () => {
    return await brandService.getAllBrands()
  })
  
  // Test locations loading
  await monitor.measureOperation('Load Locations', async () => {
    return await locationService.getAllLocations()
  })
  
  // Test all hotels loading
  await monitor.measureOperation('Load All Hotels', async () => {
    return await hotelService.getHotels()
  })
  
  // Test featured hotels
  await monitor.measureOperation('Load Featured Hotels', async () => {
    return await hotelService.getFeaturedHotels()
  })
  
  // Test brand filtering
  await monitor.measureOperation('Filter Hotels by Brand', async () => {
    return await hotelService.getHotelsByBrand('tivoli')
  })
  
  // Test location filtering
  await monitor.measureOperation('Filter Hotels by Location', async () => {
    return await hotelService.getHotelsByLocation('delhi')
  })
  
  // Test single hotel loading
  await monitor.measureOperation('Load Single Hotel', async () => {
    return await hotelService.getHotelBySlug('tivoli-grand-palace')
  })
  
  console.log('🔄 Running repeated operations to test caching...')
  
  // Repeat some operations to test caching behavior
  for (let i = 0; i < 5; i++) {
    await monitor.measureOperation('Repeated Hotels Load', async () => {
      return await hotelService.getHotels()
    })
    
    await monitor.measureOperation('Repeated Featured Hotels', async () => {
      return await hotelService.getFeaturedHotels()
    })
  }
  
  console.log('🧪 Testing concurrent operations...')
  
  // Test concurrent operations
  const concurrentPromises = [
    monitor.measureOperation('Concurrent Brands', () => brandService.getAllBrands()),
    monitor.measureOperation('Concurrent Locations', () => locationService.getAllLocations()),
    monitor.measureOperation('Concurrent Hotels', () => hotelService.getHotels()),
    monitor.measureOperation('Concurrent Featured', () => hotelService.getFeaturedHotels())
  ]
  
  await Promise.all(concurrentPromises)
  
  // Generate and save report
  const report = monitor.generateReport()
  const reportPath = join(process.cwd(), 'performance-report.json')
  writeFileSync(reportPath, JSON.stringify(report, null, 2))
  
  console.log('\n📊 Performance Summary:')
  console.log(`Total Operations: ${report.summary.total_operations}`)
  console.log(`Success Rate: ${(report.summary.success_rate * 100).toFixed(2)}%`)
  console.log(`Total Data Transfer: ${(report.summary.total_data_transfer / 1024).toFixed(2)}KB`)
  console.log(`Avg Data per Operation: ${(report.summary.avg_data_per_operation / 1024).toFixed(2)}KB`)
  
  console.log('\n🎯 Top Performance Metrics:')
  const analyses = report.query_analysis as QueryAnalysis[]
  analyses.slice(0, 5).forEach(analysis => {
    console.log(`${analysis.query}: ${analysis.avgDuration.toFixed(2)}ms avg (${analysis.callCount} calls)`)
  })
  
  console.log('\n💡 Recommendations:')
  report.recommendations.forEach((rec: string) => {
    console.log(`- ${rec}`)
  })
  
  console.log(`\n📄 Detailed report saved to: ${reportPath}`)
}

/**
 * Monitor Supabase connection health
 */
async function monitorSupabaseHealth(): Promise<void> {
  console.log('🏥 Monitoring Supabase Health...')
  
  const healthChecks = [
    {
      name: 'Database Connection',
      check: async () => {
        const { data, error } = await supabase
          .from('brands')
          .select('count')
          .limit(1)
        
        if (error) throw error
        return 'Connected'
      }
    },
    {
      name: 'Storage Access',
      check: async () => {
        const { data, error } = await supabase.storage.listBuckets()
        if (error) throw error
        return `${data?.length || 0} buckets`
      }
    },
    {
      name: 'RLS Policies',
      check: async () => {
        const { data, error } = await supabase
          .from('hotels')
          .select('id')
          .limit(1)
        
        if (error) throw error
        return 'Active'
      }
    }
  ]
  
  for (const check of healthChecks) {
    try {
      const startTime = Date.now()
      const result = await check.check()
      const duration = Date.now() - startTime
      
      console.log(`  ✅ ${check.name}: ${result} (${duration}ms)`)
    } catch (error) {
      console.log(`  ❌ ${check.name}: ${error instanceof Error ? error.message : 'Failed'}`)
    }
  }
}

/**
 * Analyze query patterns and suggest optimizations
 */
async function analyzeQueryPatterns(): Promise<void> {
  console.log('🔍 Analyzing Query Patterns...')
  
  const patterns = [
    {
      name: 'Hotels with Relations',
      description: 'Loading hotels with brand and location data',
      query: async () => {
        const { data, error } = await supabase
          .from('hotels')
          .select(`
            *,
            brand:brands(*),
            location:locations(*)
          `)
        
        if (error) throw error
        return data
      }
    },
    {
      name: 'Hotels with All Relations',
      description: 'Loading hotels with all related data',
      query: async () => {
        const { data, error } = await supabase
          .from('hotels')
          .select(`
            *,
            brand:brands(*),
            location:locations(*),
            amenities:hotel_amenities(amenity:amenities(*)),
            rooms(*),
            dining(*),
            images:hotel_media(media:media(*))
          `)
        
        if (error) throw error
        return data
      }
    },
    {
      name: 'Featured Hotels Only',
      description: 'Loading only featured hotels',
      query: async () => {
        const { data, error } = await supabase
          .from('hotels')
          .select(`
            *,
            brand:brands(*),
            location:locations(*)
          `)
          .eq('is_featured', true)
        
        if (error) throw error
        return data
      }
    }
  ]
  
  for (const pattern of patterns) {
    try {
      const startTime = Date.now()
      const result = await pattern.query()
      const duration = Date.now() - startTime
      const dataSize = JSON.stringify(result).length
      
      console.log(`  📊 ${pattern.name}:`)
      console.log(`     Time: ${duration}ms`)
      console.log(`     Size: ${(dataSize / 1024).toFixed(2)}KB`)
      console.log(`     Records: ${result?.length || 0}`)
      console.log(`     Description: ${pattern.description}`)
      console.log()
      
    } catch (error) {
      console.log(`  ❌ ${pattern.name}: ${error instanceof Error ? error.message : 'Failed'}`)
    }
  }
}

/**
 * Main performance monitoring function
 */
async function runPerformanceMonitoring(): Promise<void> {
  console.log('⚡ Tivoli Hotels Performance Monitor\n')
  
  await monitorSupabaseHealth()
  console.log()
  
  await analyzeQueryPatterns()
  
  await runPerformanceBenchmarks()
  
  console.log('\n🎉 Performance monitoring complete!')
  console.log('\nNext steps:')
  console.log('1. Review the performance report')
  console.log('2. Implement recommended optimizations')
  console.log('3. Set up continuous monitoring in production')
}

// Export for use in other scripts
export { PerformanceMonitor, runPerformanceBenchmarks, monitorSupabaseHealth }

// Run monitoring if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runPerformanceMonitoring()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('❌ Performance monitoring failed:', error)
      process.exit(1)
    })
}