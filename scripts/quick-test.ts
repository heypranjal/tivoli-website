/**
 * Quick Supabase Connection Test
 * Created: 2025-06-20
 * 
 * Simple script to test if Supabase is accessible and ready for migrations
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing environment variables:')
  console.error('   VITE_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing')
  console.error('   VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ Set' : '❌ Missing')
  console.error('\nPlease set these in your .env file')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function quickTest() {
  console.log('🔍 Quick Supabase Connection Test\n')
  console.log(`📡 Connecting to: ${supabaseUrl}`)
  
  try {
    // Test basic connection
    console.log('⏳ Testing connection...')
    const { data, error } = await supabase
      .from('_metadata')
      .select('*')
      .limit(1)
    
    if (error && error.code === '42P01') {
      console.log('✅ Connection successful!')
      console.log('📋 Database is empty - ready for migrations')
      console.log('\nNext steps:')
      console.log('1. Execute the database schema migration')
      console.log('2. Populate initial data')
      console.log('3. Set up storage buckets')
      console.log('4. Run image migration')
    } else if (error) {
      console.error('❌ Connection failed:', error.message)
    } else {
      console.log('✅ Connection successful!')
      console.log('🗄️ Database appears to have tables')
      
      // Check if our tables exist
      const { data: brands } = await supabase
        .from('brands')
        .select('count')
        .limit(1)
      
      if (brands) {
        console.log('✅ Migration appears to be complete')
        console.log('\nYou can now run:')
        console.log('- npm run test:comprehensive')
        console.log('- npm run migrate:images')
      }
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error)
  }
}

quickTest()