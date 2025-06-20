# Tivoli Hotels Supabase Migration Plan

> **Status**: Draft - In Progress  
> **Last Updated**: 2025-06-20  
> **Rollback Point**: v1.0-stable-booking (Git tag)

---

## 📋 Executive Summary

This document outlines the comprehensive strategy for migrating the Tivoli Hotels website from static data files to a dynamic Supabase-powered content management system. The migration will enable dynamic content management, improved scalability, and centralized image management while maintaining the existing design and live website functionality.

---

## 🏗️ Current Architecture Analysis

### Data Structure
```
src/data/
├── hotels.ts              # Main hotel data (1,639 lines)
├── hotels-new.ts          # Additional hotel configurations
└── venues/
    ├── tivoli-venues.ts   # Tivoli brand properties
    ├── omnia-venues.ts    # Omnia brand properties  
    ├── upper-hse-venues.ts# Upper HSE brand properties
    └── wedcation-venues.ts# Wedcation brand properties
```

### Brand Organization
- **THE TIVOLI**: Premium luxury properties (flagship brand)
- **OMNIA**: Contemporary urban luxury
- **THE UPPER HSE**: Modern boutique properties
- **WEDCATION**: Wedding and event-focused venues

### Routing Patterns
```
/delhi/tivoli-grand-palace          # Individual venue pages
/palwal-haryana/tivoli-royal-palace # Location-based routing
/brands/tivoli                      # Brand filtering
/locations/delhi                    # Location filtering
/:location/:hotelSlug               # Dynamic routing
```

### Key Components
- **FeaturedVenues**: Homepage venue showcase
- **Locations**: Location-based filtering
- **LocationsPage**: Main listing with brand/location filters
- **Individual Pages**: 18+ dedicated venue pages

### Image Management
- **Mixed Sources**: Supabase Storage + Unsplash + Google Photos
- **No Centralized Management**: Hardcoded URLs throughout codebase
- **Inconsistent Naming**: Various folder structures

---

## 🎯 Migration Objectives

### Primary Goals
1. **Dynamic Content Management**: Enable admin to add/edit venues without code changes
2. **Centralized Image Management**: Single source of truth for all media
3. **Scalable Architecture**: Support future growth and new locations
4. **Zero Downtime**: Maintain live website throughout migration
5. **SEO Preservation**: Keep existing URLs and metadata

### Success Metrics
- ✅ All existing content migrated accurately
- ✅ No broken links or missing images
- ✅ Admin can manage content via Supabase dashboard
- ✅ Performance maintained or improved
- ✅ Rollback capability at any stage

---

## 📊 Supabase Database Schema Design

### Core Tables

#### 1. brands
```sql
CREATE TABLE brands (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    description TEXT,
    logo_url TEXT,
    brand_color VARCHAR(7), -- Hex color
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 2. locations
```sql
CREATE TABLE locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    state VARCHAR(50),
    country VARCHAR(50) DEFAULT 'India',
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 3. hotels
```sql
CREATE TABLE hotels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    brand_id UUID REFERENCES brands(id),
    location_id UUID REFERENCES locations(id),
    description TEXT,
    rating DECIMAL(2,1) DEFAULT 5.0,
    
    -- Address
    street TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    
    -- Contact
    phone VARCHAR(50),
    email VARCHAR(100),
    
    -- SEO & Display
    meta_title VARCHAR(200),
    meta_description TEXT,
    featured_image_id UUID REFERENCES media(id),
    sort_order INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 4. media
```sql
CREATE TABLE media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255),
    file_type VARCHAR(50),
    file_size INTEGER,
    width INTEGER,
    height INTEGER,
    supabase_path TEXT NOT NULL,
    public_url TEXT NOT NULL,
    alt_text TEXT,
    caption TEXT,
    tags TEXT[], -- Array of tags for easy filtering
    upload_source VARCHAR(50), -- 'admin', 'migration', 'api'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 5. hotel_media
```sql
CREATE TABLE hotel_media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
    media_id UUID REFERENCES media(id) ON DELETE CASCADE,
    media_type VARCHAR(50) NOT NULL, -- 'hero', 'gallery', 'room', 'dining', 'amenity'
    sort_order INTEGER DEFAULT 0,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 6. amenities
```sql
CREATE TABLE amenities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon_name VARCHAR(50), -- Lucide icon name
    category VARCHAR(50), -- 'wellness', 'dining', 'business', 'recreation'
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 7. hotel_amenities
```sql
CREATE TABLE hotel_amenities (
    hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
    amenity_id UUID REFERENCES amenities(id) ON DELETE CASCADE,
    custom_description TEXT, -- Hotel-specific amenity description
    PRIMARY KEY (hotel_id, amenity_id)
);
```

#### 8. rooms
```sql
CREATE TABLE rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    size_sqm INTEGER,
    size_display VARCHAR(50), -- "45 sq.m."
    max_occupancy INTEGER,
    bed_type VARCHAR(100),
    price_inr INTEGER,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 9. dining
```sql
CREATE TABLE dining (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    cuisine VARCHAR(100),
    hours VARCHAR(100),
    dress_code VARCHAR(100),
    image_id UUID REFERENCES media(id),
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Indexes for Performance
```sql
-- Essential indexes for fast queries
CREATE INDEX idx_hotels_brand_location ON hotels(brand_id, location_id);
CREATE INDEX idx_hotels_active_featured ON hotels(is_active, is_featured);
CREATE INDEX idx_hotels_slug ON hotels(slug);
CREATE INDEX idx_hotel_media_hotel_type ON hotel_media(hotel_id, media_type);
CREATE INDEX idx_media_tags ON media USING GIN(tags);
```

---

## 🖼️ Image Management Strategy

### Supabase Storage Structure
```
tivoli-media/
├── brands/
│   ├── tivoli/
│   ├── omnia/
│   ├── upper-hse/
│   └── wedcation/
├── hotels/
│   ├── {hotel-slug}/
│   │   ├── hero/
│   │   ├── gallery/
│   │   ├── rooms/
│   │   ├── dining/
│   │   └── amenities/
├── general/
│   ├── icons/
│   ├── patterns/
│   └── placeholders/
└── uploads/
    └── {year}/{month}/
```

### Image Migration Process
1. **Audit Current Images**: Catalog all image URLs and usage
2. **Download and Organize**: Fetch from external sources
3. **Upload to Supabase**: Organize by hotel and type
4. **Generate Optimized Versions**: Multiple sizes for responsive design
5. **Update Database**: Populate media and hotel_media tables
6. **Update Components**: Replace hardcoded URLs with dynamic fetching

### Image Optimization Features
- **Responsive Images**: Multiple sizes (thumbnail, medium, large, original)
- **WebP Conversion**: Automatic format optimization
- **Lazy Loading**: Improve page load performance
- **CDN Integration**: Fast global delivery via Supabase CDN

---

## 🔄 Migration Phases

### Phase 1: Foundation Setup (Week 1)
**Status**: ⏳ Pending

#### Tasks:
- [ ] Create Supabase database schema
- [ ] Set up Row Level Security (RLS) policies
- [ ] Create database migration scripts
- [ ] Set up Supabase Storage buckets
- [ ] Implement basic CRUD operations
- [ ] Create admin interface components

#### Deliverables:
- Complete database schema
- Initial data migration scripts
- Basic admin dashboard

#### Rollback: `git reset --hard v1.0-stable-booking`

---

### Phase 2: Data Migration (Week 2)
**Status**: ⏳ Pending

#### Tasks:
- [ ] Export current hotel data to structured format
- [ ] Migrate brand and location data
- [ ] Migrate hotel core information
- [ ] Import amenities and features
- [ ] Migrate room and dining data
- [ ] Validate data integrity

#### Deliverables:
- All existing data in Supabase
- Data validation reports
- Migration verification scripts

#### Rollback: Revert database to empty state, continue with static files

---

### Phase 3: Image Migration (Week 3)
**Status**: ⏳ Pending

#### Tasks:
- [ ] Audit and catalog all current images
- [ ] Download images from external sources
- [ ] Upload to Supabase Storage with proper organization
- [ ] Generate optimized versions
- [ ] Update media database with metadata
- [ ] Create image management utilities

#### Deliverables:
- All images migrated to Supabase Storage
- Image optimization pipeline
- Media management tools

#### Rollback: Keep existing hardcoded image URLs

---

### Phase 4: Component Refactoring (Week 4)
**Status**: ⏳ Pending

#### Tasks:
- [ ] Create Supabase data hooks
- [ ] Refactor FeaturedVenues component
- [ ] Update LocationsPage with dynamic data
- [ ] Migrate individual hotel pages
- [ ] Update routing to use database slugs
- [ ] Implement loading and error states

#### Deliverables:
- All components using Supabase data
- Dynamic routing system
- Improved error handling

#### Rollback: Revert to static imports, keep database for future use

---

### Phase 5: Admin Interface (Week 5)
**Status**: ⏳ Pending

#### Tasks:
- [ ] Create hotel management interface
- [ ] Implement image upload and management
- [ ] Add brand/location management
- [ ] Create content preview system
- [ ] Implement user authentication
- [ ] Add data validation and error handling

#### Deliverables:
- Complete admin dashboard
- Content management system
- User authentication

#### Rollback: Remove admin routes, keep public site dynamic

---

### Phase 6: Testing & Optimization (Week 6)
**Status**: ⏳ Pending

#### Tasks:
- [ ] Performance testing and optimization
- [ ] SEO verification (URLs, metadata)
- [ ] Cross-browser compatibility testing
- [ ] Mobile responsiveness verification
- [ ] Load testing with dynamic data
- [ ] Security audit

#### Deliverables:
- Performance optimization report
- Comprehensive testing results
- Security assessment

#### Rollback: Any phase-specific rollback as needed

---

## 🔧 Technical Implementation Details

### Database Connection Setup
```typescript
// src/lib/supabase-extended.ts
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

const supabase = createClient<Database>(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
)

// Hotel data operations
export const hotelService = {
  async getHotelsByBrand(brandSlug: string) {
    const { data, error } = await supabase
      .from('hotels')
      .select(`
        *,
        brand:brands(*),
        location:locations(*),
        media:hotel_media(
          media_type,
          sort_order,
          media:media(*)
        )
      `)
      .eq('brands.slug', brandSlug)
      .eq('is_active', true)
      .order('sort_order')
    
    if (error) throw error
    return data
  },

  async getHotelBySlug(slug: string) {
    const { data, error } = await supabase
      .from('hotels')
      .select(`
        *,
        brand:brands(*),
        location:locations(*),
        media:hotel_media(
          media_type,
          sort_order,
          is_primary,
          media:media(*)
        ),
        amenities:hotel_amenities(
          custom_description,
          amenity:amenities(*)
        ),
        rooms(*),
        dining(*)
      `)
      .eq('slug', slug)
      .single()
    
    if (error) throw error
    return data
  }
}
```

### Dynamic Routing Implementation
```typescript
// src/hooks/useHotelRouting.ts
import { useEffect, useState } from 'react'
import { hotelService } from '@/lib/supabase-extended'

export function useHotelRouting() {
  const [routes, setRoutes] = useState<Record<string, string>>({})

  useEffect(() => {
    async function buildRoutes() {
      const hotels = await hotelService.getAllActiveHotels()
      const routeMap = hotels.reduce((acc, hotel) => {
        acc[hotel.slug] = `/${hotel.location.slug}/${hotel.slug}`
        return acc
      }, {} as Record<string, string>)
      setRoutes(routeMap)
    }
    buildRoutes()
  }, [])

  return routes
}
```

### Image Management Component
```typescript
// src/components/admin/ImageManager.tsx
import React, { useState } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface ImageManagerProps {
  hotelId: string
  mediaType: 'hero' | 'gallery' | 'room' | 'dining'
  onImagesUpdate: () => void
}

export function ImageManager({ hotelId, mediaType, onImagesUpdate }: ImageManagerProps) {
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (files: FileList) => {
    setUploading(true)
    
    for (const file of Array.from(files)) {
      // Upload to Supabase Storage
      const filename = `${hotelId}/${mediaType}/${Date.now()}-${file.name}`
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('tivoli-media')
        .upload(filename, file)

      if (uploadError) continue

      // Create media record
      const { data: mediaData, error: mediaError } = await supabase
        .from('media')
        .insert({
          filename: uploadData.path,
          original_filename: file.name,
          file_type: file.type,
          file_size: file.size,
          supabase_path: uploadData.path,
          public_url: `${process.env.VITE_SUPABASE_URL}/storage/v1/object/public/tivoli-media/${uploadData.path}`,
          upload_source: 'admin'
        })
        .select()
        .single()

      if (mediaError) continue

      // Link to hotel
      await supabase
        .from('hotel_media')
        .insert({
          hotel_id: hotelId,
          media_id: mediaData.id,
          media_type: mediaType,
          sort_order: 0
        })
    }

    setUploading(false)
    onImagesUpdate()
  }

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => e.target.files && handleUpload(e.target.files)}
          className="hidden"
          id="image-upload"
        />
        <label htmlFor="image-upload" className="cursor-pointer">
          <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
          <p className="text-gray-600">Click to upload images</p>
        </label>
      </div>
      {uploading && <p className="text-blue-600">Uploading...</p>}
    </div>
  )
}
```

---

## 🚀 Context Management for Multi-Session Refactoring

### Problem Statement
Due to context limitations, the migration cannot be completed in a single session. We need a systematic approach to maintain context across sessions.

### Solution: Progressive Documentation

#### 1. Session State Files
```
MIGRATION_STATE.md          # Current progress tracker
COMPONENT_MAPPING.md        # Component-to-database mapping
IMAGE_AUDIT.md             # Image inventory and migration status
ROUTING_CHANGES.md          # URL and routing modifications
```

#### 2. Session Handoff Protocol
**At End of Each Session:**
1. Update `MIGRATION_STATE.md` with completed tasks
2. Document any issues or blockers encountered
3. Create git commit with descriptive message
4. Update progress in this document

**At Start of Each Session:**
1. Read `MIGRATION_STATE.md` for current status
2. Review recent commits and changes
3. Verify current rollback point is still valid
4. Continue from last completed checkpoint

#### 3. Checkpoint System
```markdown
## Checkpoint: Phase 1 Complete
- ✅ Database schema created
- ✅ RLS policies implemented
- ✅ Basic CRUD operations working
- ⏳ Admin interface (in progress)
- 🚫 Data migration (blocked - awaiting schema finalization)

Next Session Start Point: Complete admin interface components
```

---

## ⚠️ Risk Management

### High Priority Risks

#### 1. Data Loss During Migration
**Risk**: Corrupted or lost hotel/venue data  
**Mitigation**: 
- Complete database backups before each phase
- Staged migration with validation checkpoints
- Rollback procedures tested and documented

#### 2. Image Migration Failures
**Risk**: Broken or missing images after migration  
**Mitigation**:
- Comprehensive image audit before migration
- Fallback to original URLs if Supabase fails
- Progressive image migration (not all at once)

#### 3. SEO Impact
**Risk**: Changed URLs affecting search rankings  
**Mitigation**:
- Maintain existing URL structure
- Implement proper redirects if needed
- Monitor search console during migration

#### 4. Live Site Downtime
**Risk**: Website unavailable during migration  
**Mitigation**:
- Blue-green deployment strategy
- Feature flags for gradual rollout
- Immediate rollback capability

### Medium Priority Risks

#### 5. Performance Degradation
**Risk**: Slower page loads with database queries  
**Mitigation**:
- Database query optimization
- Caching strategies (React Query)
- Performance monitoring and alerts

#### 6. Context Loss Between Sessions
**Risk**: Losing track of progress and implementation details  
**Mitigation**:
- Detailed documentation updates each session
- Checkpoint system with clear restart procedures
- Progressive commits with descriptive messages

---

## 📈 Success Metrics & Validation

### Technical Metrics
- [ ] **Database Performance**: All queries under 200ms
- [ ] **Image Load Times**: 50% improvement with optimization
- [ ] **Admin Interface**: Complete CRUD operations functional
- [ ] **Mobile Performance**: Lighthouse score >90
- [ ] **SEO Preservation**: No ranking drops post-migration

### Business Metrics
- [ ] **Content Management**: Admin can add new hotel in <30 minutes
- [ ] **Image Management**: Bulk upload and organization tools working
- [ ] **Brand Expansion**: New brand addition without code changes
- [ ] **Location Growth**: New location support via admin interface

### Validation Checklist
- [ ] All existing URLs still work
- [ ] All images display correctly
- [ ] Booking form integration maintained
- [ ] Mobile responsiveness preserved
- [ ] Cross-browser compatibility verified
- [ ] Admin authentication secure
- [ ] Database queries optimized
- [ ] Error handling comprehensive

---

## 🔄 Rollback Procedures

### Emergency Rollback (Immediate)
```bash
# Return to stable state immediately
git reset --hard v1.0-stable-booking
```

### Selective Rollback by Phase

#### Phase 1-2: Database/Data Issues
```bash
# Keep code changes, revert to static data
git checkout v1.0-stable-booking -- src/data/
npm run build && npm run preview
```

#### Phase 3: Image Migration Issues
```bash
# Revert image references, keep dynamic data
git checkout HEAD~1 -- src/components/
# Update components to use original image URLs
```

#### Phase 4: Component Refactoring Issues
```bash
# Revert components, keep database
git checkout v1.0-stable-booking -- src/components/
git checkout v1.0-stable-booking -- src/pages/
# Maintain database for future attempt
```

---

## 📚 Additional Considerations

### Security
- **Row Level Security**: Properly configured for admin vs public access
- **API Key Management**: Separate keys for admin and public operations
- **Image Upload Validation**: File type, size, and content validation
- **Admin Authentication**: Secure login system for content management

### Performance
- **Query Optimization**: Use indexes and efficient joins
- **Caching Strategy**: React Query for client-side caching
- **Image CDN**: Leverage Supabase CDN for fast image delivery
- **Lazy Loading**: Implement for better initial page loads

### Scalability
- **Database Scaling**: Monitor connection pools and query performance
- **Storage Scaling**: Plan for growing image library
- **Admin Users**: Multi-user admin system for different roles
- **Content Workflows**: Approval processes for content changes

### Monitoring
- **Error Tracking**: Implement comprehensive error logging
- **Performance Monitoring**: Track query times and page loads
- **Uptime Monitoring**: Ensure high availability
- **User Analytics**: Monitor admin usage patterns

---

## 📞 Support & Resources

### Documentation
- [Supabase Documentation](https://supabase.com/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [TypeScript Best Practices](https://typescript-eslint.io/rules/)

### Emergency Contacts
- **Development Team**: Available for critical issues
- **Supabase Support**: For platform-specific issues
- **Hosting Provider**: For infrastructure concerns

---

**Document Version**: 1.0  
**Next Review**: After Phase 1 Completion  
**Owner**: Development Team  
**Approver**: Project Stakeholder

---

> **Note**: This document is a living document and will be updated as the migration progresses. Each session should update relevant sections with current status and findings.