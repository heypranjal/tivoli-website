/**
 * Test Database Insert
 * Created: 2025-06-20
 * 
 * Test simple insert to debug permissions
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testInsert(): Promise<void> {
  console.log('🧪 Testing database insert permissions...\n')
  
  // Test simple brand insert
  console.log('Testing brands table insert...')
  const { data, error } = await supabase
    .from('brands')
    .insert({
      slug: 'test-brand',
      name: 'Test Brand',
      display_name: 'Test Brand Display',
      description: 'Test brand description'
    })
    .select()
  
  if (error) {
    console.log('❌ Insert failed:', error)
    console.log('❌ Error details:', JSON.stringify(error, null, 2))
  } else {
    console.log('✅ Insert successful:', data)
    
    // Clean up test data
    const { error: deleteError } = await supabase
      .from('brands')
      .delete()
      .eq('slug', 'test-brand')
    
    if (deleteError) {
      console.log('⚠️ Failed to clean up test data:', deleteError.message)
    } else {
      console.log('🧹 Test data cleaned up')
    }
  }
}

async function checkRLS(): Promise<void> {
  console.log('\n🔒 Checking Row Level Security policies...')
  
  // Try to query RLS policies (this might fail with anon key)
  try {
    const { data, error } = await supabase
      .from('pg_policies')
      .select('*')
      .eq('tablename', 'brands')
    
    if (error) {
      console.log('❌ Cannot query RLS policies (expected with anon key)')
    } else {
      console.log('✅ RLS policies found:', data)
    }
  } catch (e) {
    console.log('❌ RLS policy check failed (expected)')
  }
}

async function main(): Promise<void> {
  await testInsert()
  await checkRLS()
  
  console.log('\n📋 Summary:')
  console.log('If inserts are failing, it likely means:')
  console.log('1. RLS policies are blocking anonymous inserts')
  console.log('2. Data needs to be inserted via SQL editor in Supabase dashboard')
  console.log('3. Or we need to use the service role key for inserts')
}

main().catch(console.error)