# Tivoli Website Image Migration Plan

## Critical Images Requiring Immediate Migration

### 🚨 URGENT: 22 Images on Legacy Instance (pbkxpylwatscfjzbmwur)

## Homepage Carousel Images (4 images)
**Target Bucket**: `homepage_image`
**Source**: `pbkxpylwatscfjzbmwur.supabase.co/storage/v1/object/public/homepage_image/`

1. `image1.jpg` → `sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/homepage_image/image1.jpg`
2. `image2.jpg` → `sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/homepage_image/image2.jpg`
3. `image3.jpg` → `sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/homepage_image/image3.jpg`
4. `image4.jpg` → `sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/homepage_image/image4.jpg`

**Files to Update**: `/src/components/Hero.tsx` (lines 7-10)

## Experience Section Images (6 images)
**Target Bucket**: `homepage_image`
**Source**: `pbkxpylwatscfjzbmwur.supabase.co/storage/v1/object/public/homepage_image/`

1. `wedding.jpg` → `sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/homepage_image/wedding.jpg`
2. `corporate-hp.jpg` → `sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/homepage_image/corporate-hp.jpg`
3. `foodblue_thetivoli.jpg` → `sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/homepage_image/foodblue_thetivoli.jpg`
4. `Luxurious-stays.jpg` → `sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/homepage_image/Luxurious-stays.jpg`
5. `cocktail-aprty.jpg` → `sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/homepage_image/cocktail-aprty.jpg`
6. `spa.jpg` → `sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/homepage_image/spa.jpg`

**Files to Update**: `/src/components/Experiences.tsx` (lines 9-44)

## Venue Thumbnail Images (11 images)
**Target Bucket**: `homepage_image`
**Source**: `pbkxpylwatscfjzbmwur.supabase.co/storage/v1/object/public/homepage_image/`

### Featured Venues Component (6 images)
1. `maingate_thetivoli.jpg` → `sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/homepage_image/maingate_thetivoli.jpg`
2. `thumbnail-royalpalace-hp.jpg` → `sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/homepage_image/thumbnail-royalpalace-hp.jpg`
3. `heritage-hp-thumbnail.jpg` → `sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/homepage_image/heritage-hp-thumbnail.jpg`
4. `bijwasan-hp-thumbnail.jpg` → `sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/homepage_image/bijwasan-hp-thumbnail.jpg`
5. `RoyalCourt-hp-thumbnail.jpg` → `sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/homepage_image/RoyalCourt-hp-thumbnail.jpg`
6. `lotuscourt-hp-thumbnail.webp` → `sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/homepage_image/lotuscourt-hp-thumbnail.webp`

**Files to Update**: `/src/components/FeaturedVenues.tsx` (lines 12, 19, 26, 33, 40, 47)

### Locations Component (4 images)
1. `delhi-hp.jpg` → `sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/homepage_image/delhi-hp.jpg`
2. `haryana-hp-thumbnail.jpg` → `sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/homepage_image/haryana-hp-thumbnail.jpg`
3. `noida-hp-thumbnail.jpg` → `sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/homepage_image/noida-hp-thumbnail.jpg`
4. `gn-hp-thumbnail.jpg` → `sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/homepage_image/gn-hp-thumbnail.jpg`

**Files to Update**: `/src/components/Locations.tsx`

### Additional Venue Images (1 image)
1. `upperhse-hp-thumbnail.jpg` → `sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/homepage_image/upperhse-hp-thumbnail.jpg`

**Files to Update**: `/src/components/FeaturedVenues.tsx`

## Our Story Image (1 image)
**Target Bucket**: `homepage_image`
**Source**: `pbkxpylwatscfjzbmwur.supabase.co/storage/v1/object/public/homepage_image/`

1. `Hero1.jpg` → `sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/homepage_image/Hero1.jpg`

**Files to Update**: `/src/components/OurStory.tsx` (line 36)

---

## Migration Steps

### Step 1: Download All Images from Legacy Instance
```bash
# Create directory for downloaded images
mkdir -p migration-temp/homepage_image

# Download all 22 images from pbkxpylwatscfjzbmwur.supabase.co
wget -P migration-temp/homepage_image/ "https://pbkxpylwatscfjzbmwur.supabase.co/storage/v1/object/public/homepage_image/image1.jpg"
wget -P migration-temp/homepage_image/ "https://pbkxpylwatscfjzbmwur.supabase.co/storage/v1/object/public/homepage_image/image2.jpg"
# ... (continue for all 22 images)
```

### Step 2: Upload to New Supabase Instance
```bash
# Upload to sivirxabbuldqkckjwmu.supabase.co homepage_image bucket
# Use Supabase CLI or dashboard to upload each image
```

### Step 3: Update Component Files
1. `/src/components/Hero.tsx` - Update carousel images
2. `/src/components/Experiences.tsx` - Update experience images
3. `/src/components/FeaturedVenues.tsx` - Update venue thumbnails
4. `/src/components/Locations.tsx` - Update location images
5. `/src/components/OurStory.tsx` - Update hero image

### Step 4: Implement Centralized Image Management
Update all components to use the centralized image utility functions instead of hard-coded URLs.

---

## Already Migrated Images ✅

### Tivoli Hotels (55 images)
- **Royal Palace Palwal**: 13 images in `royalpalacepalwal` bucket
- **Heritage Palace Rewari**: 9 images in `tivoliheritagerewari` bucket
- **Dining Photos**: 15 images in `tivoli-dining-photo` bucket
- **Bijwasan**: Images properly placed
- **Lotus Court**: 3 images in `lotuscourt` bucket
- **Grand Palace**: Images properly placed

### Wedcation Venues (10 images)
- **Ambala**: 5 images in `wedcationambala` bucket
- **Israna**: 5 images in `wedcationisrana` bucket

### Upper HSE Venues (3 images)
- **Sultanpur**: 3 images in `upper-hse-venues` bucket

### Omnia Venues ⚠️ (Needs Standardization)
- **Current**: 5 images in `omniatiwolidwarka` bucket
- **New**: 6 images in `omnia-venues` bucket
- **Action**: Consolidate to `omnia-venues` bucket

---

## Verification Checklist

After migration, verify these URLs are working:
- [ ] Homepage carousel (4 images)
- [ ] Experience section (6 images)
- [ ] Featured venues thumbnails (11 images)
- [ ] Our story hero image (1 image)
- [ ] All existing venue images still display correctly
- [ ] Mobile responsiveness maintained
- [ ] Page loading speeds acceptable

## Risk Mitigation

1. **Backup**: Keep legacy instance active until migration verified
2. **Gradual Migration**: Migrate in phases (homepage first, then venues)
3. **Testing**: Test each section after migration
4. **Rollback Plan**: Ready to revert if issues arise

---

## Post-Migration Cleanup

1. Remove hard-coded URLs from all components
2. Implement centralized image management system
3. Update image utility functions to be primary source
4. Document final bucket structure
5. Decommission legacy Supabase instance