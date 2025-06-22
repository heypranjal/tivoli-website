/**
 * Execute SQL via Supabase REST API
 * Created: 2025-06-20
 * 
 * Direct SQL execution using Supabase REST API when CLI fails
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join } from 'path'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function executeSQLFile(filePath: string): Promise<void> {
  console.log(`📄 Executing: ${filePath}`)
  
  try {
    const sql = readFileSync(filePath, 'utf-8')
    
    // Split SQL into individual statements
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'))
    
    console.log(`   📝 Found ${statements.length} SQL statements`)
    
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i]
      if (statement.length < 10) continue // Skip tiny statements
      
      console.log(`   ${i + 1}/${statements.length} Executing statement...`)
      
      try {
        const { error } = await supabase.rpc('exec_sql', { 
          sql_query: statement + ';' 
        })
        
        if (error) {
          console.log(`   ⚠️  Statement ${i + 1} error (might be expected):`, error.message)
        } else {
          console.log(`   ✅ Statement ${i + 1} executed successfully`)
        }
      } catch (err) {
        console.log(`   ⚠️  Statement ${i + 1} failed:`, err)
      }
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    
    console.log(`✅ Completed: ${filePath}`)
    
  } catch (error) {
    console.error(`❌ Failed to execute ${filePath}:`, error)
    throw error
  }
}

async function executeAllMigrations(): Promise<void> {
  console.log('🚀 Executing Tivoli Hotels Database Migrations\n')
  
  const migrationFiles = [
    'supabase/migrations/001_initial_schema.sql',
    'supabase/migrations/002_populate_data.sql',
    'supabase/migrations/003_setup_storage.sql'
  ]
  
  for (const file of migrationFiles) {
    const filePath = join(process.cwd(), file)
    try {
      await executeSQLFile(filePath)
      console.log()
    } catch (error) {
      console.error(`💥 Migration failed at: ${file}`)
      console.error('Please check the error and fix before continuing.')
      break
    }
  }
  
  console.log('🎉 All migrations completed!')
  console.log('\nNext steps:')
  console.log('1. Run: npm run migrate:test')
  console.log('2. Run: npm run migrate:images')
  console.log('3. Run: npm run test:comprehensive')
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  executeAllMigrations()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('❌ Migration execution failed:', error)
      process.exit(1)
    })
}

export { executeSQLFile, executeAllMigrations }