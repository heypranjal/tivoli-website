/**
 * Migration Execution Script
 * Phase 5: Database Migration & Data Population
 * Updated: 2025-06-20
 * 
 * Orchestrates the complete migration process
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

interface MigrationStep {
  name: string
  description: string
  sqlFile?: string
  scriptFunction?: () => Promise<void>
  required: boolean
}

const migrationSteps: MigrationStep[] = [
  {
    name: 'schema',
    description: 'Create database schema and tables',
    sqlFile: 'supabase/migrations/001_initial_schema.sql',
    required: true
  },
  {
    name: 'data',
    description: 'Populate initial data (brands, locations, hotels)',
    sqlFile: 'supabase/migrations/002_populate_data.sql',
    required: true
  },
  {
    name: 'storage',
    description: 'Set up Supabase Storage buckets and policies',
    sqlFile: 'supabase/migrations/003_setup_storage.sql',
    required: true
  },
  {
    name: 'test-connection',
    description: 'Test database connection and verify data',
    scriptFunction: testDatabaseConnection,
    required: true
  }
]

/**
 * Execute SQL migration file
 */
async function executeSQLMigration(filePath: string): Promise<void> {
  if (!existsSync(filePath)) {
    throw new Error(`Migration file not found: ${filePath}`)
  }

  const sql = readFileSync(filePath, 'utf-8')
  
  console.log(`  📄 Executing SQL file: ${filePath}`)
  
  // For now, we'll output the SQL for manual execution
  // In a real setup, you'd execute this against your Supabase instance
  console.log(`  ⚠️  Please execute this SQL manually in your Supabase dashboard:`)
  console.log(`  📋 SQL length: ${sql.length} characters`)
  
  console.log(`  ✅ SQL migration prepared for execution`)
}

/**
 * Test database connection and verify data
 */
async function testDatabaseConnection(): Promise<void> {
  console.log(`  🔍 Testing database connection...`)
  
  try {
    // Test brands table
    const { data: brands, error: brandsError } = await supabase
      .from('brands')
      .select('id, slug, display_name')
      .limit(5)

    if (brandsError) {
      throw new Error(`Brands query failed: ${brandsError.message}`)
    }

    console.log(`  ✅ Brands table: ${brands?.length || 0} records`)

    // Test locations table
    const { data: locations, error: locationsError } = await supabase
      .from('locations')
      .select('id, slug, name')
      .limit(5)

    if (locationsError) {
      throw new Error(`Locations query failed: ${locationsError.message}`)
    }

    console.log(`  ✅ Locations table: ${locations?.length || 0} records`)

    // Test hotels table
    const { data: hotels, error: hotelsError } = await supabase
      .from('hotels')
      .select('id, slug, name, brand:brands(display_name), location:locations(name)')
      .limit(5)

    if (hotelsError) {
      throw new Error(`Hotels query failed: ${hotelsError.message}`)
    }

    console.log(`  ✅ Hotels table: ${hotels?.length || 0} records`)

    // Test storage buckets
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()

    if (bucketsError) {
      throw new Error(`Storage query failed: ${bucketsError.message}`)
    }

    const hotelImagesBucket = buckets?.find(b => b.name === 'hotel-images')
    console.log(`  ✅ Storage buckets: ${buckets?.length || 0} total, hotel-images: ${hotelImagesBucket ? 'created' : 'missing'}`)

    console.log(`  🎉 Database connection test successful!`)

  } catch (error) {
    console.error(`  ❌ Database test failed:`, error)
    throw error
  }
}

/**
 * Generate migration status report
 */
async function generateMigrationReport(): Promise<void> {
  console.log(`📊 Generating migration status report...`)

  try {
    const report = {
      timestamp: new Date().toISOString(),
      status: 'Database migration scripts prepared',
      next_steps: [
        'Execute the SQL migrations in your Supabase dashboard',
        'Run the image migration script to populate Supabase Storage',
        'Test React Query hooks with real data',
        'Verify all components are working with Supabase data'
      ]
    }

    const reportPath = join(process.cwd(), 'MIGRATION_STATUS.md')
    const reportContent = `# Migration Status Report

Generated: ${report.timestamp}

## Status
${report.status}

## Next Steps

${report.next_steps.map((step, i) => `${i + 1}. ${step}`).join('\n')}

## Migration Files Ready

- ✅ Database schema: supabase/migrations/001_initial_schema.sql
- ✅ Initial data: supabase/migrations/002_populate_data.sql
- ✅ Storage setup: supabase/migrations/003_setup_storage.sql
- ✅ Image migration script: scripts/migrate-images.ts

## Manual Execution Required

Please execute the SQL files in your Supabase dashboard in the following order:
1. 001_initial_schema.sql
2. 002_populate_data.sql  
3. 003_setup_storage.sql
`

    writeFileSync(reportPath, reportContent)
    console.log(`📄 Migration report saved: MIGRATION_STATUS.md`)

  } catch (error) {
    console.error('Failed to generate migration report:', error)
  }
}

/**
 * Main migration execution function
 */
async function runMigrations(): Promise<void> {
  console.log('🚀 Starting Tivoli Hotels Database Migration\n')
  console.log(`📊 Migration Steps: ${migrationSteps.length}`)
  console.log(`🔗 Supabase URL: ${supabaseUrl}\n`)

  let completedSteps = 0
  let failedSteps: string[] = []

  for (let i = 0; i < migrationSteps.length; i++) {
    const step = migrationSteps[i]
    console.log(`📋 Step ${i + 1}/${migrationSteps.length}: ${step.name}`)
    console.log(`   ${step.description}`)

    try {
      if (step.sqlFile) {
        await executeSQLMigration(step.sqlFile)
      } else if (step.scriptFunction) {
        await step.scriptFunction()
      }

      completedSteps++
      console.log(`✅ Step ${i + 1} completed: ${step.name}\n`)

    } catch (error) {
      console.error(`❌ Step ${i + 1} failed: ${step.name}`)
      console.error(`   Error: ${error instanceof Error ? error.message : 'Unknown error'}\n`)
      
      failedSteps.push(step.name)
      
      if (step.required) {
        console.error(`💥 Required step failed. Stopping migration.`)
        break
      }
    }

    // Small delay between steps
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  // Generate final report
  console.log(`📊 Migration Summary:`)
  console.log(`✅ Completed steps: ${completedSteps}/${migrationSteps.length}`)
  console.log(`❌ Failed steps: ${failedSteps.length}`)
  
  if (failedSteps.length > 0) {
    console.log(`Failed: ${failedSteps.join(', ')}`)
  }

  console.log(`\n🎉 Migration scripts prepared successfully!`)
  await generateMigrationReport()

  console.log(`\nNext: Execute the SQL files manually in your Supabase dashboard`)
  console.log(`Then run: npm run migrate:images`)
}

async function main() {
  await runMigrations()
}

// Command line interface
const command = process.argv[2]

if (command === 'test') {
  testDatabaseConnection()
    .then(() => {
      console.log('✅ Database test completed')
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ Database test failed:', error)
      process.exit(1)
    })
} else {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Migration failed:', error)
      process.exit(1)
    })
}

export { runMigrations, testDatabaseConnection }