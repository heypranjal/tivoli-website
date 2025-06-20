/**
 * Run Database Migrations
 * Phase 2: Data Migration
 * Created: 2025-06-20
 * 
 * Script to execute Supabase migrations and test database connection
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join } from 'path'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const migrations = [
  '001_initial_schema.sql',
  '002_rls_policies.sql', 
  '003_seed_initial_data.sql',
  '004_migrate_hotel_data.sql',
  '005_migrate_amenities_and_features.sql',
  '006_migrate_rooms_and_dining.sql'
]

async function runMigrations() {
  console.log('🚀 Starting database migrations...\n')
  
  for (const migration of migrations) {
    try {
      console.log(`📄 Running migration: ${migration}`)
      
      const migrationPath = join(process.cwd(), 'supabase', 'migrations', migration)
      const sql = readFileSync(migrationPath, 'utf-8')
      
      const { error } = await supabase.rpc('execute_sql', { sql_query: sql })
      
      if (error) {
        console.error(`❌ Migration ${migration} failed:`, error)
        return false
      }
      
      console.log(`✅ Migration ${migration} completed successfully`)
    } catch (error) {
      console.error(`❌ Error reading migration ${migration}:`, error)
      return false
    }
  }
  
  console.log('\n🎉 All migrations completed successfully!')
  return true
}

async function testConnection() {
  console.log('\n🔍 Testing database connection...')
  
  try {
    // Test basic connection
    const { data: brands, error: brandsError } = await supabase
      .from('brands')
      .select('*')
      .limit(1)
    
    if (brandsError) {
      console.error('❌ Failed to query brands table:', brandsError)
      return false
    }
    
    // Test hotels with relations
    const { data: hotels, error: hotelsError } = await supabase
      .from('hotels')
      .select(`
        *,
        brand:brands(*),
        location:locations(*)
      `)
      .limit(1)
    
    if (hotelsError) {
      console.error('❌ Failed to query hotels with relations:', hotelsError)
      return false
    }
    
    console.log('✅ Database connection successful')
    console.log(`📊 Found ${brands?.length || 0} brands`)
    console.log(`🏨 Found ${hotels?.length || 0} hotels`)
    
    if (hotels?.[0]) {
      console.log(`🎯 Sample hotel: ${hotels[0].name} (${hotels[0].brand?.display_name})`)
    }
    
    return true
  } catch (error) {
    console.error('❌ Database connection test failed:', error)
    return false
  }
}

async function main() {
  console.log('🏨 Tivoli Hotels Database Migration\n')
  
  const migrationsSuccess = await runMigrations()
  if (!migrationsSuccess) {
    console.error('\n💥 Migration failed. Exiting.')
    process.exit(1)
  }
  
  const connectionSuccess = await testConnection()
  if (!connectionSuccess) {
    console.error('\n💥 Database connection test failed. Check your setup.')
    process.exit(1)
  }
  
  console.log('\n🚀 Database is ready for use!')
  console.log('Next steps:')
  console.log('1. Run image migration (Phase 3)')
  console.log('2. Update components to use Supabase data (Phase 4)')
  console.log('3. Test the application')
}

main().catch(console.error)