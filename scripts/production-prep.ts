/**
 * Production Deployment Preparation Script
 * Phase 6: Testing & Optimization
 * Created: 2025-06-20
 * 
 * Comprehensive production readiness checks and optimization
 */

import { writeFileSync, readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { createClient } from '@supabase/supabase-js'

interface ProductionCheck {
  name: string
  category: 'security' | 'performance' | 'seo' | 'deployment' | 'monitoring'
  status: 'pass' | 'fail' | 'warning' | 'manual'
  message: string
  action?: string
  priority: 'low' | 'medium' | 'high' | 'critical'
}

interface ProductionReport {
  timestamp: string
  readiness_score: number
  total_checks: number
  critical_issues: number
  checklist: ProductionCheck[]
  next_steps: string[]
  deployment_guide: string[]
}

/**
 * Check environment variables and secrets
 */
function checkEnvironmentSecurity(): ProductionCheck[] {
  const checks: ProductionCheck[] = []
  
  // Check for required environment variables
  const requiredVars = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY'
  ]
  
  for (const varName of requiredVars) {
    if (process.env[varName]) {
      checks.push({
        name: `Environment Variable: ${varName}`,
        category: 'security',
        status: 'pass',
        message: 'Required environment variable is set',
        priority: 'critical'
      })
    } else {
      checks.push({
        name: `Environment Variable: ${varName}`,
        category: 'security',
        status: 'fail',
        message: 'Required environment variable is missing',
        action: `Set ${varName} in production environment`,
        priority: 'critical'
      })
    }
  }
  
  // Check for development-only variables in production
  const devVars = ['VITE_SUPABASE_ANON_KEY']
  for (const varName of devVars) {
    if (process.env.NODE_ENV === 'production' && process.env[varName]) {
      checks.push({
        name: `Development Variable: ${varName}`,
        category: 'security',
        status: 'warning',
        message: 'Development variable present in production',
        action: 'Ensure using production keys',
        priority: 'high'
      })
    }
  }
  
  return checks
}

/**
 * Check build configuration
 */
function checkBuildConfiguration(): ProductionCheck[] {
  const checks: ProductionCheck[] = []
  
  // Check package.json
  const packageJsonPath = join(process.cwd(), 'package.json')
  if (existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
    
    if (packageJson.scripts?.build) {
      checks.push({
        name: 'Build Script',
        category: 'deployment',
        status: 'pass',
        message: 'Build script is configured',
        priority: 'high'
      })
    } else {
      checks.push({
        name: 'Build Script',
        category: 'deployment',
        status: 'fail',
        message: 'No build script found in package.json',
        action: 'Add build script to package.json',
        priority: 'critical'
      })
    }
    
    // Check for TypeScript
    if (packageJson.devDependencies?.typescript) {
      checks.push({
        name: 'TypeScript Configuration',
        category: 'deployment',
        status: 'pass',
        message: 'TypeScript is configured',
        priority: 'medium'
      })
    }
  }
  
  // Check Vite configuration
  const viteConfigPath = join(process.cwd(), 'vite.config.ts')
  if (existsSync(viteConfigPath)) {
    checks.push({
      name: 'Vite Configuration',
      category: 'deployment',
      status: 'pass',
      message: 'Vite configuration file exists',
      priority: 'medium'
    })
  }
  
  return checks
}

/**
 * Check SEO configuration
 */
function checkSEOConfiguration(): ProductionCheck[] {
  const checks: ProductionCheck[] = []
  
  // Check index.html
  const indexPath = join(process.cwd(), 'index.html')
  if (existsSync(indexPath)) {
    const indexContent = readFileSync(indexPath, 'utf-8')
    
    if (indexContent.includes('<title>')) {
      checks.push({
        name: 'Page Title',
        category: 'seo',
        status: 'pass',
        message: 'Page title is configured',
        priority: 'medium'
      })
    } else {
      checks.push({
        name: 'Page Title',
        category: 'seo',
        status: 'warning',
        message: 'No page title found',
        action: 'Add descriptive title tag',
        priority: 'medium'
      })
    }
    
    if (indexContent.includes('meta name="description"')) {
      checks.push({
        name: 'Meta Description',
        category: 'seo',
        status: 'pass',
        message: 'Meta description is configured',
        priority: 'medium'
      })
    } else {
      checks.push({
        name: 'Meta Description',
        category: 'seo',
        status: 'warning',
        message: 'No meta description found',
        action: 'Add meta description tag',
        priority: 'medium'
      })
    }
    
    if (indexContent.includes('meta property="og:')) {
      checks.push({
        name: 'Open Graph Tags',
        category: 'seo',
        status: 'pass',
        message: 'Open Graph tags are configured',
        priority: 'low'
      })
    } else {
      checks.push({
        name: 'Open Graph Tags',
        category: 'seo',
        status: 'warning',
        message: 'No Open Graph tags found',
        action: 'Add Open Graph meta tags for social sharing',
        priority: 'low'
      })
    }
  }
  
  return checks
}

/**
 * Check performance optimizations
 */
function checkPerformanceOptimizations(): ProductionCheck[] {
  const checks: ProductionCheck[] = []
  
  // Check for lazy loading
  const srcDir = join(process.cwd(), 'src')
  if (existsSync(srcDir)) {
    checks.push({
      name: 'Code Splitting',
      category: 'performance',
      status: 'manual',
      message: 'Verify React lazy loading is implemented for routes',
      action: 'Review React.lazy() usage in App.tsx',
      priority: 'medium'
    })
  }
  
  // Check for image optimization
  checks.push({
    name: 'Image Optimization',
    category: 'performance',
    status: 'manual',
    message: 'Verify SmartImage components are used throughout',
    action: 'Ensure all images use SmartImage with optimization',
    priority: 'medium'
  })
  
  // Check for React Query configuration
  const queryProviderPath = join(process.cwd(), 'src/components/providers/QueryProvider.tsx')
  if (existsSync(queryProviderPath)) {
    checks.push({
      name: 'React Query Configuration',
      category: 'performance',
      status: 'pass',
      message: 'React Query provider is configured',
      priority: 'high'
    })
  }
  
  return checks
}

/**
 * Check deployment configuration
 */
function checkDeploymentConfiguration(): ProductionCheck[] {
  const checks: ProductionCheck[] = []
  
  // Check for _redirects file (Netlify)
  const redirectsPath = join(process.cwd(), 'public/_redirects')
  if (existsSync(redirectsPath)) {
    checks.push({
      name: 'SPA Redirects',
      category: 'deployment',
      status: 'pass',
      message: 'SPA redirect configuration found',
      priority: 'high'
    })
  } else {
    checks.push({
      name: 'SPA Redirects',
      category: 'deployment',
      status: 'warning',
      message: 'No SPA redirect configuration found',
      action: 'Add _redirects file for SPA routing',
      priority: 'high'
    })
  }
  
  // Check for error pages
  checks.push({
    name: 'Error Pages',
    category: 'deployment',
    status: 'manual',
    message: 'Verify 404 and error page handling',
    action: 'Implement proper error boundaries and 404 pages',
    priority: 'medium'
  })
  
  return checks
}

/**
 * Check monitoring setup
 */
function checkMonitoringSetup(): ProductionCheck[] {
  const checks: ProductionCheck[] = []
  
  checks.push({
    name: 'Error Tracking',
    category: 'monitoring',
    status: 'manual',
    message: 'Set up error tracking service',
    action: 'Integrate Sentry, LogRocket, or similar service',
    priority: 'high'
  })
  
  checks.push({
    name: 'Analytics',
    category: 'monitoring',
    status: 'manual',
    message: 'Set up web analytics',
    action: 'Integrate Google Analytics or similar service',
    priority: 'medium'
  })
  
  checks.push({
    name: 'Performance Monitoring',
    category: 'monitoring',
    status: 'manual',
    message: 'Set up performance monitoring',
    action: 'Monitor Core Web Vitals and page load times',
    priority: 'medium'
  })
  
  checks.push({
    name: 'Database Monitoring',
    category: 'monitoring',
    status: 'manual',
    message: 'Monitor Supabase usage and performance',
    action: 'Set up alerts for database performance and API limits',
    priority: 'medium'
  })
  
  return checks
}

/**
 * Test production database connection
 */
async function testProductionDatabase(): Promise<ProductionCheck[]> {
  const checks: ProductionCheck[] = []
  
  const supabaseUrl = process.env.VITE_SUPABASE_URL
  const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseAnonKey) {
    checks.push({
      name: 'Database Connection',
      category: 'deployment',
      status: 'fail',
      message: 'Cannot test database - missing credentials',
      action: 'Set up environment variables',
      priority: 'critical'
    })
    return checks
  }
  
  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    
    // Test basic connection
    const { data, error } = await supabase
      .from('brands')
      .select('count')
      .limit(1)
    
    if (error) throw error
    
    checks.push({
      name: 'Database Connection',
      category: 'deployment',
      status: 'pass',
      message: 'Successfully connected to production database',
      priority: 'critical'
    })
    
    // Test data availability
    const { data: hotelsData, error: hotelsError } = await supabase
      .from('hotels')
      .select('id')
      .limit(1)
    
    if (hotelsError) throw hotelsError
    
    if (hotelsData && hotelsData.length > 0) {
      checks.push({
        name: 'Database Data',
        category: 'deployment',
        status: 'pass',
        message: 'Production database contains data',
        priority: 'critical'
      })
    } else {
      checks.push({
        name: 'Database Data',
        category: 'deployment',
        status: 'fail',
        message: 'Production database is empty',
        action: 'Run data migration scripts',
        priority: 'critical'
      })
    }
    
  } catch (error) {
    checks.push({
      name: 'Database Connection',
      category: 'deployment',
      status: 'fail',
      message: `Database connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      action: 'Check database credentials and network access',
      priority: 'critical'
    })
  }
  
  return checks
}

/**
 * Generate production deployment guide
 */
function generateDeploymentGuide(): string[] {
  return [
    '## Pre-Deployment Checklist',
    '',
    '### 1. Environment Setup',
    '- [ ] Set production environment variables',
    '- [ ] Verify Supabase production project is configured',
    '- [ ] Test database connection with production credentials',
    '- [ ] Run all migration scripts in production database',
    '',
    '### 2. Build Process',
    '- [ ] Run `npm run build` to create production build',
    '- [ ] Test build locally with `npm run preview`',
    '- [ ] Verify all assets are properly bundled',
    '- [ ] Check for any build warnings or errors',
    '',
    '### 3. Performance Optimization',
    '- [ ] Verify image optimization is working',
    '- [ ] Test React Query caching behavior',
    '- [ ] Run performance audits (Lighthouse)',
    '- [ ] Optimize bundle size if needed',
    '',
    '### 4. SEO Configuration',
    '- [ ] Update meta tags and descriptions',
    '- [ ] Set up Open Graph tags',
    '- [ ] Configure sitemap.xml',
    '- [ ] Add robots.txt file',
    '',
    '### 5. Monitoring Setup',
    '- [ ] Set up error tracking (Sentry/LogRocket)',
    '- [ ] Configure web analytics (Google Analytics)',
    '- [ ] Set up performance monitoring',
    '- [ ] Configure database monitoring alerts',
    '',
    '### 6. Security Checks',
    '- [ ] Verify no secrets in client-side code',
    '- [ ] Test RLS policies are working',
    '- [ ] Configure CORS settings',
    '- [ ] Set up proper HTTP headers',
    '',
    '### 7. Deployment',
    '- [ ] Deploy to staging environment first',
    '- [ ] Run full testing suite on staging',
    '- [ ] Test all critical user flows',
    '- [ ] Deploy to production',
    '- [ ] Verify production deployment',
    '- [ ] Monitor for any immediate issues',
    '',
    '### 8. Post-Deployment',
    '- [ ] Test all pages and functionality',
    '- [ ] Verify image loading and performance',
    '- [ ] Check error tracking is working',
    '- [ ] Monitor database performance',
    '- [ ] Set up backup strategy',
    '',
    '## Rollback Plan',
    '',
    'If issues occur during deployment:',
    '1. Revert to previous deployment',
    '2. Check error logs and monitoring',
    '3. Fix issues in development',
    '4. Re-test before re-deploying',
    '',
    '## Emergency Contacts',
    '',
    '- Supabase Support: https://supabase.com/support',
    '- Deployment Platform Support: Check your hosting provider',
    '- Database Backup: Supabase Dashboard > Database > Backups'
  ]
}

/**
 * Calculate readiness score
 */
function calculateReadinessScore(checks: ProductionCheck[]): number {
  const weights = {
    critical: 4,
    high: 3,
    medium: 2,
    low: 1
  }
  
  const statusPoints = {
    pass: 1,
    warning: 0.5,
    manual: 0.5,
    fail: 0
  }
  
  let totalWeight = 0
  let earnedPoints = 0
  
  for (const check of checks) {
    const weight = weights[check.priority]
    const points = statusPoints[check.status] * weight
    
    totalWeight += weight
    earnedPoints += points
  }
  
  return totalWeight > 0 ? Math.round((earnedPoints / totalWeight) * 100) : 0
}

/**
 * Generate next steps based on failures
 */
function generateNextSteps(checks: ProductionCheck[]): string[] {
  const steps: string[] = []
  
  const criticalFailures = checks.filter(c => c.status === 'fail' && c.priority === 'critical')
  const highPriorityIssues = checks.filter(c => (c.status === 'fail' || c.status === 'warning') && c.priority === 'high')
  const manualChecks = checks.filter(c => c.status === 'manual')
  
  if (criticalFailures.length > 0) {
    steps.push('🚨 CRITICAL: Fix all critical failures before deploying')
    criticalFailures.forEach(check => {
      if (check.action) {
        steps.push(`   - ${check.name}: ${check.action}`)
      }
    })
  }
  
  if (highPriorityIssues.length > 0) {
    steps.push('⚠️ HIGH PRIORITY: Address these issues before deployment')
    highPriorityIssues.forEach(check => {
      if (check.action) {
        steps.push(`   - ${check.name}: ${check.action}`)
      }
    })
  }
  
  if (manualChecks.length > 0) {
    steps.push('✋ MANUAL REVIEW: Complete these manual checks')
    manualChecks.forEach(check => {
      if (check.action) {
        steps.push(`   - ${check.name}: ${check.action}`)
      }
    })
  }
  
  if (steps.length === 0) {
    steps.push('🎉 All automated checks passed! Ready for manual review and deployment.')
  }
  
  return steps
}

/**
 * Main production preparation function
 */
async function runProductionPreparation(): Promise<void> {
  console.log('🚀 Tivoli Hotels Production Deployment Preparation\n')
  
  const allChecks: ProductionCheck[] = []
  
  console.log('🔒 Checking environment security...')
  allChecks.push(...checkEnvironmentSecurity())
  
  console.log('⚙️ Checking build configuration...')
  allChecks.push(...checkBuildConfiguration())
  
  console.log('🔍 Checking SEO configuration...')
  allChecks.push(...checkSEOConfiguration())
  
  console.log('⚡ Checking performance optimizations...')
  allChecks.push(...checkPerformanceOptimizations())
  
  console.log('🌐 Checking deployment configuration...')
  allChecks.push(...checkDeploymentConfiguration())
  
  console.log('📊 Checking monitoring setup...')
  allChecks.push(...checkMonitoringSetup())
  
  console.log('🗄️ Testing production database...')
  const dbChecks = await testProductionDatabase()
  allChecks.push(...dbChecks)
  
  // Calculate readiness score
  const readinessScore = calculateReadinessScore(allChecks)
  const totalChecks = allChecks.length
  const criticalIssues = allChecks.filter(c => c.status === 'fail' && c.priority === 'critical').length
  
  // Generate next steps
  const nextSteps = generateNextSteps(allChecks)
  
  // Generate deployment guide
  const deploymentGuide = generateDeploymentGuide()
  
  // Create comprehensive report
  const report: ProductionReport = {
    timestamp: new Date().toISOString(),
    readiness_score: readinessScore,
    total_checks: totalChecks,
    critical_issues: criticalIssues,
    checklist: allChecks,
    next_steps: nextSteps,
    deployment_guide: deploymentGuide
  }
  
  // Save report
  const reportPath = join(process.cwd(), 'production-readiness-report.json')
  writeFileSync(reportPath, JSON.stringify(report, null, 2))
  
  // Generate markdown report
  const markdownReport = `# Production Readiness Report

Generated: ${report.timestamp}

## Summary

- **Readiness Score**: ${readinessScore}/100
- **Total Checks**: ${totalChecks}
- **Critical Issues**: ${criticalIssues}

${readinessScore >= 80 ? '🎉 **READY FOR DEPLOYMENT**' : readinessScore >= 60 ? '⚠️ **NEEDS ATTENTION**' : '🚨 **NOT READY FOR DEPLOYMENT**'}

## Checklist Results

${allChecks.map(check => {
  const icon = check.status === 'pass' ? '✅' : check.status === 'fail' ? '❌' : check.status === 'warning' ? '⚠️' : '✋'
  const priority = check.priority.toUpperCase()
  return `### ${icon} ${check.name} [${priority}]
- **Status**: ${check.status.toUpperCase()}
- **Message**: ${check.message}
${check.action ? `- **Action**: ${check.action}` : ''}
`
}).join('\n')}

## Next Steps

${nextSteps.map(step => step).join('\n')}

## Deployment Guide

${deploymentGuide.join('\n')}
`
  
  const markdownPath = join(process.cwd(), 'PRODUCTION_READINESS.md')
  writeFileSync(markdownPath, markdownReport)
  
  // Display summary
  console.log('\n📊 Production Readiness Summary:')
  console.log(`Readiness Score: ${readinessScore}/100`)
  console.log(`Total Checks: ${totalChecks}`)
  console.log(`Critical Issues: ${criticalIssues}`)
  
  if (readinessScore >= 80) {
    console.log('🎉 Your application is ready for production deployment!')
  } else if (readinessScore >= 60) {
    console.log('⚠️ Your application needs attention before deployment.')
  } else {
    console.log('🚨 Your application is not ready for production deployment.')
  }
  
  console.log('\nGenerated files:')
  console.log('- production-readiness-report.json (detailed report)')
  console.log('- PRODUCTION_READINESS.md (markdown summary)')
  
  console.log('\nNext steps:')
  nextSteps.slice(0, 3).forEach(step => {
    console.log(`- ${step}`)
  })
}

// Export for use in other scripts
export { runProductionPreparation, checkEnvironmentSecurity, testProductionDatabase }

// Run production preparation if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runProductionPreparation()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('❌ Production preparation failed:', error)
      process.exit(1)
    })
}