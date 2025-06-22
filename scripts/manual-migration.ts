/**
 * Manual Migration Script
 * Created: 2025-06-20
 * 
 * Execute migrations manually when CLI fails
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function createBrandsTable(): Promise<void> {
  console.log('📋 Creating brands table...')
  
  // First, let's try to create the table by inserting dummy data
  // Supabase will auto-create tables when you insert data
  const { data, error } = await supabase
    .from('brands')
    .insert([
      {
        slug: 'tivoli',
        name: 'Tivoli',
        display_name: 'The Tivoli',
        description: 'Luxury hotels offering unparalleled hospitality',
        brand_color: '#CD9F59',
        sort_order: 1
      }
    ])
    .select()
  
  if (error) {
    console.log('❌ Brands table creation failed:', error.message)
    console.log('💡 This is expected if the table doesn\'t exist yet')
  } else {
    console.log('✅ Brands table created and populated')
  }
}

async function testConnection(): Promise<void> {
  console.log('🔍 Testing Supabase connection...')
  
  try {
    // Test basic connection by trying to access a system table
    const { data, error } = await supabase
      .from('_realtime')
      .select('*')
      .limit(1)
    
    if (error && error.code === '42P01') {
      console.log('✅ Connection successful (table doesn\'t exist - normal)')
    } else if (error) {
      console.log('⚠️ Connection test result:', error.message)
    } else {
      console.log('✅ Connection successful')
    }
  } catch (err) {
    console.log('❌ Connection failed:', err)
  }
}

async function checkExistingTables(): Promise<void> {
  console.log('🔍 Checking existing tables...')
  
  const tables = ['brands', 'locations', 'hotels', 'media']
  
  for (const table of tables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('count')
        .limit(1)
      
      if (error && error.code === '42P01') {
        console.log(`❌ Table '${table}' does not exist`)
      } else if (error) {
        console.log(`⚠️ Table '${table}' error:`, error.message)
      } else {
        console.log(`✅ Table '${table}' exists`)
      }
    } catch (err) {
      console.log(`❌ Error checking table '${table}':`, err)
    }
  }
}

async function main(): Promise<void> {
  console.log('🏨 Tivoli Hotels Manual Migration\n')
  console.log(`🔗 Connected to: ${supabaseUrl}\n`)
  
  await testConnection()
  console.log()
  
  await checkExistingTables()
  console.log()
  
  console.log('📋 Manual Migration Required')
  console.log('Since automated CLI migration failed, please:')
  console.log('1. Go to your Supabase dashboard: https://supabase.com/dashboard')
  console.log('2. Navigate to SQL Editor')
  console.log('3. Copy and paste the contents of:')
  console.log('   - supabase/migrations/001_initial_schema.sql')
  console.log('   - supabase/migrations/002_populate_data.sql')
  console.log('   - supabase/migrations/003_setup_storage.sql')
  console.log('4. Execute each file in order')
  console.log()
  console.log('After manual execution, run:')
  console.log('- npm run migrate:test (to verify)')
  console.log('- npm run migrate:images (to populate images)')
  console.log('- npm run test:comprehensive (full testing)')
}

main().catch(console.error)