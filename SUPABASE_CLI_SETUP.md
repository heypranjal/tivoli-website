# 🛠️ Supabase CLI Setup Guide

An alternative to manual execution using the Supabase CLI.

## Install Supabase CLI

```bash
# macOS (using Homebrew)
brew install supabase/tap/supabase

# Or using npm
npm install -g supabase

# Or using scoop (Windows)
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

## Login to Supabase

```bash
supabase login
```

## Link Your Project

```bash
# Initialize Supabase in your project
supabase init

# Link to your existing project
supabase link --project-ref your-project-id
```

## Run Migrations

```bash
# Push all migrations to your linked project
supabase db push

# Or run specific migration files
supabase db reset --linked
```

## Alternative: Direct Migration Execution

If CLI doesn't work, you can also:

1. Copy the migration files to your clipboard
2. Paste them directly in Supabase SQL Editor
3. Execute one by one in order

## Migration Order

1. `001_initial_schema.sql` - Database schema
2. `002_populate_data.sql` - Initial data
3. `003_setup_storage.sql` - Storage buckets

## Verify Setup

```bash
# Test the connection
npm run migrate:test

# Run all tests
npm run test:comprehensive
```