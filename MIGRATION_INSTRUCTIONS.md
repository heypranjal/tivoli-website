# 🚀 Tivoli Hotels Database Migration Instructions

## Phase 5: Database Migration & Data Population

This guide will walk you through migrating your Tivoli Hotels website from static data to a dynamic Supabase-powered backend.

## Prerequisites

Before starting the migration, ensure you have:

1. **Supabase Project**: A Supabase project set up at [supabase.com](https://supabase.com)
2. **Environment Variables**: Required Supabase credentials configured
3. **Node.js**: Version 18+ installed for running migration scripts

## Step 1: Environment Setup

Create a `.env` file in your project root with your Supabase credentials:

```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

### Finding Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to **Settings > API**
3. Copy the **Project URL** and **anon public** key
4. Copy the **service_role** key (keep this secure!)

## Step 2: Prepare Migration Scripts

Run the migration preparation script to verify your setup:

```bash
npm run migrate:prepare
```

This will:
- ✅ Validate your Supabase connection
- ✅ Prepare SQL migration files
- ✅ Generate a migration status report

## Step 3: Execute Database Migrations

**Important**: The following SQL files need to be executed manually in your Supabase dashboard in the exact order shown:

### 3.1 Create Database Schema

1. Open your Supabase dashboard
2. Go to **SQL Editor**
3. Copy and paste the contents of `supabase/migrations/001_initial_schema.sql`
4. Click **Run** to execute

This creates:
- All database tables (brands, locations, hotels, amenities, etc.)
- Indexes for performance
- Triggers for automatic timestamps
- Row Level Security (RLS) setup

### 3.2 Populate Initial Data

1. In the SQL Editor, copy and paste `supabase/migrations/002_populate_data.sql`
2. Click **Run** to execute

This populates:
- 4 hotel brands (Tivoli, Omnia, Upper HSE, Wedcation)
- 7 locations across Delhi, Haryana, and UP
- 11 hotels with complete details
- Amenities, rooms, and dining information
- Hotel policies and features

### 3.3 Setup Storage

1. In the SQL Editor, copy and paste `supabase/migrations/003_setup_storage.sql`
2. Click **Run** to execute

This creates:
- Storage buckets for hotel images and videos
- Public access policies for image serving
- Admin policies for content management

## Step 4: Verify Database Setup

Test your database connection and verify data was imported correctly:

```bash
npm run migrate:test
```

Expected output:
```
🔍 Testing database connection...
✅ Brands table: 4 records
✅ Locations table: 7 records  
✅ Hotels table: 11 records
✅ Storage buckets: 3 total, hotel-images: created
🎉 Database connection test successful!
```

## Step 5: Migrate Images

Run the image migration script to transfer images to Supabase Storage:

```bash
npm run migrate:images
```

This will:
- 📥 Download images from external URLs
- 📤 Upload to Supabase Storage with optimization
- 💾 Create media records in the database
- 🔗 Link images to their respective hotels

Expected output:
```
🚀 Starting image migration to Supabase Storage...

🏨 Migrating images for tivoli-grand-palace...
  📥 Downloading hero image...
  📤 Uploading to Supabase Storage...
  💾 Creating media record...
  🔗 Linking hero image to hotel...
  ✅ Hero image migrated successfully
  📸 Migrating 3 gallery images...
  ✅ Gallery image 1 migrated
  ...

📊 Migration Summary:
✅ Successfully migrated: 11 hotels
❌ Failed migrations: 0 hotels
🎉 All images migrated successfully!
```

## Step 6: Test the Application

Start your development server and test the migrated application:

```bash
npm run dev
```

### What to Test

1. **Homepage**: Featured venues should load from Supabase
2. **Locations Page**: Dynamic filtering by brand and location
3. **Hotel Pages**: Individual hotel pages with dynamic data
4. **Images**: All images should load from Supabase Storage
5. **Navigation**: Brand and location dropdowns should be dynamic

### Debugging

If something isn't working:

1. **Check Browser Console**: Look for React Query errors
2. **Verify Environment Variables**: Ensure `.env` file is correct
3. **Test Database Connection**: Run `npm run migrate:test`
4. **Check Supabase Dashboard**: Verify data in the tables

## Step 7: Monitor Performance

After migration, monitor your application:

1. **React Query DevTools**: Available in development mode
2. **Supabase Dashboard**: Monitor API usage and performance
3. **Storage Usage**: Check image loading times

## Rollback Plan

If you need to rollback the migration:

1. **Database**: Drop all tables using the provided rollback script
2. **Storage**: Clear the storage buckets
3. **Code**: Revert to using static data files

```bash
# Emergency rollback (be careful!)
npm run migrate:rollback
```

## Next Steps

Once migration is complete:

1. **Admin Interface**: Set up content management (Phase 6)
2. **Performance Optimization**: Implement caching and optimization
3. **Monitoring**: Set up error tracking and analytics
4. **Backup Strategy**: Implement regular database backups

## Troubleshooting

### Common Issues

**Environment Variables Not Working**
- Ensure `.env` file is in project root
- Restart your development server after adding variables
- Check for typos in variable names

**Database Connection Failed**
- Verify Supabase project is active
- Check API keys are correct
- Ensure Row Level Security policies are set up

**Images Not Loading**
- Verify storage buckets were created
- Check storage policies allow public access
- Ensure image migration completed successfully

**React Query Errors**
- Check network tab for API errors
- Verify data structure matches TypeScript types
- Ensure hooks are wrapped in QueryProvider

### Getting Help

If you encounter issues:

1. Check the `MIGRATION_STATUS.md` file for current status
2. Review the migration logs in your terminal
3. Check Supabase dashboard for error messages
4. Verify all environment variables are set correctly

## Success Metrics

Your migration is successful when:

- ✅ All database tables are populated
- ✅ Images load from Supabase Storage
- ✅ React Query hooks return data
- ✅ All hotel pages work dynamically
- ✅ Filtering works on locations page
- ✅ No hardcoded data remains in components

---

🎉 **Congratulations!** You've successfully migrated the Tivoli Hotels website to use Supabase as a dynamic backend. Your website can now be easily managed through the database and will scale as you add more hotels and locations.