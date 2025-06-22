/**
 * Test Supabase MCP Tools
 * Created: 2025-06-20
 * 
 * Test what MCP tools are available for Supabase operations
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY
const accessToken = process.env.SUPABASE_ACCESS_TOKEN

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing environment variables')
  process.exit(1)
}

console.log('🔧 Testing Supabase MCP Integration')
console.log('📋 Available Environment Variables:')
console.log(`   VITE_SUPABASE_URL: ${supabaseUrl}`)
console.log(`   VITE_SUPABASE_ANON_KEY: ${supabaseAnonKey.substring(0, 20)}...`)
console.log(`   SUPABASE_ACCESS_TOKEN: ${accessToken ? accessToken.substring(0, 10) + '...' : 'Not set'}`)

// Try to use the service role or elevated permissions
const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testMCPCapabilities(): Promise<void> {
  console.log('\n🧪 Testing MCP Capabilities...')
  
  // Test 1: Basic connection
  console.log('1. Testing basic connection...')
  try {
    const { data, error } = await supabase
      .from('brands')
      .select('count')
      .limit(1)
    
    if (error && error.code === '42P01') {
      console.log('   ❌ Table does not exist')
    } else if (error) {
      console.log('   ⚠️  Connection error:', error.message)
    } else {
      console.log('   ✅ Connection successful')
    }
  } catch (err) {
    console.log('   ❌ Connection failed:', err)
  }
  
  // Test 2: Try simple insert with different approaches
  console.log('\n2. Testing insert approaches...')
  
  // Approach A: Direct insert
  console.log('   A. Direct insert test...')
  try {
    const { data, error } = await supabase
      .from('brands')
      .insert({
        slug: 'test-brand-mcp',
        name: 'Test MCP Brand',
        display_name: 'Test MCP Brand',
        description: 'Test brand for MCP verification'
      })
      .select()
    
    if (error) {
      console.log('     ❌ Direct insert failed:', error.message)
    } else {
      console.log('     ✅ Direct insert successful:', data)
      
      // Clean up
      await supabase
        .from('brands')
        .delete()
        .eq('slug', 'test-brand-mcp')
    }
  } catch (err) {
    console.log('     ❌ Direct insert exception:', err)
  }
  
  // Approach B: Try with upsert
  console.log('   B. Upsert approach test...')
  try {
    const { data, error } = await supabase
      .from('brands')
      .upsert({
        slug: 'test-brand-upsert',
        name: 'Test Upsert Brand',
        display_name: 'Test Upsert Brand',
        description: 'Test brand for upsert verification'
      }, { onConflict: 'slug' })
      .select()
    
    if (error) {
      console.log('     ❌ Upsert failed:', error.message)
    } else {
      console.log('     ✅ Upsert successful:', data)
      
      // Clean up
      await supabase
        .from('brands')
        .delete()
        .eq('slug', 'test-brand-upsert')
    }
  } catch (err) {
    console.log('     ❌ Upsert exception:', err)
  }
}

async function main(): Promise<void> {
  await testMCPCapabilities()
  
  console.log('\n📊 MCP Test Summary:')
  console.log('If inserts are still failing, it suggests:')
  console.log('1. RLS policies may need to allow anonymous/authenticated inserts')
  console.log('2. Service role key might be needed for admin operations')
  console.log('3. Manual SQL execution via dashboard remains the best option')
  
  console.log('\n💡 Recommendation:')
  console.log('Use the Supabase dashboard SQL editor to execute the data population SQL')
  console.log('Location: https://supabase.com/dashboard/project/sivirxabbuldqkckjwmu/sql')
}

main().catch(console.error)