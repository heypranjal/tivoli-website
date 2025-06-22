/**
 * List All Tables in Supabase Project
 * Created: 2025-06-20
 * 
 * Simple script to list all tables in the Supabase database
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

async function listTables() {
  console.log('📋 Listing all tables in Supabase project\n')
  console.log(`📡 Connected to: ${supabaseUrl}`)
  
  try {
    console.log('⏳ Querying table information...')
    
    // Try to get tables from information_schema using a raw SQL query
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .neq('table_name', 'pg_stat_statements_info')
      .neq('table_name', 'pg_stat_statements')
    
    if (error) {
      console.log('⚠️ Cannot query information_schema, checking known tables...\n')
      
      // Try a simple approach - check common tables
      const tables = ['brands', 'locations', 'hotels', 'amenities', 'features', 'rooms', 'dining', '_metadata', 'bookings', 'guests']
      
      console.log('🗂️ Checking for known tables:\n')
      
      for (const tableName of tables) {
        try {
          const { data, error } = await supabase
            .from(tableName)
            .select('*', { count: 'exact', head: true })
          
          if (!error) {
            console.log(`✅ ${tableName}`)
            
            // Get row count
            const { count } = await supabase
              .from(tableName)
              .select('*', { count: 'exact', head: true })
              
            console.log(`   📊 Rows: ${count || 0}`)
          }
        } catch (e) {
          // Table doesn't exist, skip silently
        }
      }
      
    } else {
      console.log('🗂️ Tables found in database:\n')
      
      if (data && data.length > 0) {
        for (const table of data) {
          console.log(`✅ ${table.table_name}`)
          
          try {
            const { count } = await supabase
              .from(table.table_name)
              .select('*', { count: 'exact', head: true })
              
            console.log(`   📊 Rows: ${count || 0}`)
          } catch (e) {
            console.log(`   ❌ Cannot count rows`)
          }
        }
      } else {
        console.log('📭 No tables found in the public schema')
      }
    }
    
  } catch (error) {
    console.error('❌ Failed to list tables:', error)
  }
}

listTables()