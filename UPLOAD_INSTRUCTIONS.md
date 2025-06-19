# Supabase Image Upload Instructions

## Overview
You need to manually upload 22 critical images from `migration-temp/homepage_image/` to your new Supabase instance (`sivirxabbuldqkckjwmu`) to complete the migration.

## Step 1: Access Supabase Dashboard
1. Go to [supabase.com](https://supabase.com) and sign in
2. Navigate to your project: `sivirxabbuldqkckjwmu`
3. Go to **Storage** section in the left sidebar
4. Find the `homepage_image` bucket (create it if it doesn't exist)

## Step 2: Create Homepage Image Bucket (if needed)
If the `homepage_image` bucket doesn't exist:
1. Click **"New bucket"**
2. Name: `homepage_image`
3. Set as **Public bucket** (checked)
4. File size limit: `50 MB` (52428800 bytes)
5. Allowed MIME types: `image/*`
6. Click **Create bucket**

## Step 3: Upload Images to homepage_image Bucket

Navigate to the `homepage_image` bucket and upload these 22 files from your local `migration-temp/homepage_image/` folder:

### Homepage Carousel Images (4 files)
- ✅ `image1.jpg`
- ✅ `image2.jpg` 
- ✅ `image3.jpg`
- ✅ `image4.jpg`

### Experience Section Images (6 files)
- ✅ `wedding.jpg`
- ✅ `corporate-hp.jpg`
- ✅ `foodblue_thetivoli.jpg`
- ✅ `Luxurious-stays.jpg`
- ✅ `cocktail-aprty.jpg`
- ✅ `spa.jpg`

### Venue Thumbnail Images (11 files)
- ✅ `maingate_thetivoli.jpg`
- ✅ `thumbnail-royalpalace-hp.jpg`
- ✅ `heritage-hp-thumbnail.jpg`
- ✅ `bijwasan-hp-thumbnail.jpg`
- ✅ `RoyalCourt-hp-thumbnail.jpg`
- ✅ `lotuscourt-hp-thumbnail.webp`
- ✅ `delhi-hp.jpg`
- ✅ `haryana-hp-thumbnail.jpg`
- ✅ `noida-hp-thumbnail.jpg`
- ✅ `gn-hp-thumbnail.jpg`
- ✅ `upperhse-hp-thumbnail.jpg`

### Our Story Image (1 file)
- ✅ `Hero1.jpg`

## Step 4: Upload Process
1. **Drag and drop** or **click "Upload file"** in the Supabase dashboard
2. Select all 22 files from your `migration-temp/homepage_image/` folder
3. Wait for upload to complete
4. Verify all files appear in the bucket with correct names

## Step 5: Verify Upload Success
After uploading, verify these URLs work in your browser:

```
https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/homepage_image/image1.jpg
https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/homepage_image/wedding.jpg
https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/homepage_image/maingate_thetivoli.jpg
```

## Step 6: Update Website Code
Once all images are uploaded successfully, I will:
1. Update all component files to use the new Supabase URLs
2. Implement centralized image management system
3. Test all images display correctly

## Alternative: Supabase CLI Upload (Optional)
If you prefer using CLI:

```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref sivirxabbuldqkckjwmu

# Upload all images to homepage_image bucket
cd "migration-temp/homepage_image"
supabase storage upload homepage_image *.jpg *.webp
```

## Important Notes
- ⚠️ **Do NOT delete the old Supabase images yet** - keep them as backup until migration is verified
- 📸 **Verify image names are exact** - any typos will break the website
- 🔒 **Ensure bucket is PUBLIC** - private buckets won't work for website images
- 📏 **Check file sizes** - large files may timeout on upload

## Next Steps
After uploading, let me know and I will:
1. Update all component files to use centralized image management
2. Test the website to ensure all images display correctly
3. Clean up any remaining legacy URLs
4. Document the final image structure

---

**Total Images to Upload: 22 files**
**Total Size: ~250MB (estimated)**
**Bucket: homepage_image**
**Expected Time: 5-10 minutes**