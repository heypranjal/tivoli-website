# Component Database Mapping Guide

> **Purpose**: Maps current static components to Supabase database structure  
> **Last Updated**: 2025-06-20  
> **Use Case**: Context reference for multi-session refactoring

---

## 🗺️ Overview

This document provides a detailed mapping between current static data structures and the planned Supabase database schema. Use this as reference when refactoring components to use dynamic data.

---

## 📋 Current vs. Planned Data Flow

### Current (Static)
```
src/data/hotels.ts → Components → Display
```

### Planned (Dynamic)
```
Supabase DB → API Hooks → Components → Display
```

---

## 🏢 Brand Mapping

### Current Structure
```typescript
// Hardcoded in multiple files
const brands = {
  tivoli: 'THE TIVOLI',
  'upper-hse': 'THE UPPER HSE',
  wedcation: 'WEDCATION',
  omnia: 'OMNIA'
};
```

### Database Table: `brands`
```sql
INSERT INTO brands (slug, name, display_name, brand_color) VALUES
('tivoli', 'tivoli', 'THE TIVOLI', '#CD9F59'),
('omnia', 'omnia', 'OMNIA', '#2563EB'),
('upper-hse', 'upper-hse', 'THE UPPER HSE', '#7C3AED'),
('wedcation', 'wedcation', 'WEDCATION', '#EC4899');
```

### Component Usage
| File | Current Usage | New Hook |
|------|---------------|----------|
| `FeaturedVenues.tsx` | Hardcoded brand names | `useBrands()` |
| `LocationsPage.tsx` | Static brands object | `useBrands()` |
| `Navigation.tsx` | Hardcoded menu items | `useBrands()` |

---

## 📍 Location Mapping

### Current Structure
```typescript
// From LocationsPage.tsx
const locationsList = [
  { id: 'delhi', name: 'Delhi' }, 
  { id: 'noida', name: 'Noida' }, 
  { id: 'greater-noida', name: 'Greater Noida' }, 
  { id: 'ambala', name: 'Ambala' }, 
  { id: 'israna', name: 'Israna' }, 
  { id: 'palwal-haryana', name: 'Palwal Haryana' }, 
  { id: 'rewari-haryana', name: 'Rewari Haryana' }
];
```

### Database Table: `locations`
```sql
INSERT INTO locations (slug, name, state, country, display_order) VALUES
('delhi', 'Delhi', 'Delhi', 'India', 1),
('noida', 'Noida', 'Uttar Pradesh', 'India', 2),
('greater-noida', 'Greater Noida', 'Uttar Pradesh', 'India', 3),
('ambala', 'Ambala', 'Haryana', 'India', 4),
('israna', 'Israna', 'Haryana', 'India', 5),
('palwal-haryana', 'Palwal', 'Haryana', 'India', 6),
('rewari-haryana', 'Rewari', 'Haryana', 'India', 7);
```

### Component Usage
| File | Current Usage | New Hook |
|------|---------------|----------|
| `LocationsPage.tsx` | Static locationsList | `useLocations()` |
| `Locations.tsx` | Derived from hotels data | `useLocations()` |

---

## 🏨 Hotel Data Mapping

### Current Structure (hotels.ts)
```typescript
export const hotels: Hotel[] = [
  {
    id: 'tivoli-grand-palace',
    name: 'The Tivoli-New Delhi',
    brand: 'tivoli',
    location: 'delhi',
    slug: 'tivoli-grand-palace',
    description: '...',
    images: ['url1', 'url2'],
    // ... more fields
  }
]
```

### Database Query Hook
```typescript
// To be created in src/hooks/useHotels.ts
export function useHotels(filters?: {brand?: string, location?: string}) {
  return useQuery({
    queryKey: ['hotels', filters],
    queryFn: () => hotelService.getHotels(filters)
  })
}

export function useHotelBySlug(slug: string) {
  return useQuery({
    queryKey: ['hotel', slug],
    queryFn: () => hotelService.getHotelBySlug(slug)
  })
}
```

---

## 🖼️ Image Management Mapping

### Current Image Sources
1. **Supabase Storage**: `https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/...`
2. **Unsplash**: `https://images.unsplash.com/...`
3. **Google Photos**: `https://lh3.googleusercontent.com/...`

### Planned Structure
All images will be migrated to Supabase Storage with organized folder structure:
```
tivoli-media/
├── hotels/
│   ├── tivoli-grand-palace/
│   │   ├── hero/
│   │   ├── gallery/
│   │   └── dining/
```

### Component Usage
| File | Current Usage | New Usage |
|------|---------------|-----------|
| `FeaturedVenues.tsx` | `getVenueThumbnail()` | `useHotelImages(hotelId, 'hero')` |
| Individual hotel pages | Hardcoded image arrays | `useHotelImages(hotelId, 'gallery')` |

---

## 🔄 Routing Mapping

### Current Routes (App.tsx)
```typescript
<Route path="/delhi/tivoli-grand-palace" element={<TivoliGrandPalacePage />} />
<Route path="/palwal-haryana/:hotelSlug" element={<TivoliRoyalPalacePage />} />
// ... 18+ individual route components
```

### Planned Dynamic Routes
```typescript
<Route path="/:location/:hotelSlug" element={<HotelPage />} />
<Route path="/brands/:brand" element={<BrandPage />} />
<Route path="/locations/:location" element={<LocationPage />} />
```

### URL Preservation Strategy
| Current URL | Planned URL | Status |
|-------------|-------------|--------|
| `/delhi/tivoli-grand-palace` | `/delhi/tivoli-grand-palace` | ✅ Preserved |
| `/palwal-haryana/tivoli-royal-palace` | `/palwal-haryana/tivoli-royal-palace` | ✅ Preserved |
| All existing URLs | Same URLs | ✅ Preserved |

---

## 🧩 Component Refactoring Plan

### Priority 1: Core Data Components

#### 1. FeaturedVenues.tsx
```typescript
// Current: Static venues array
const venues = [
  { id: 'tivoli-grand-palace', name: 'The Tivoli', ... }
]

// Planned: Dynamic data
const { data: featuredHotels } = useHotels({ featured: true })
```

#### 2. LocationsPage.tsx
```typescript
// Current: Static imports + filters
import { hotels } from '@/data/hotels'

// Planned: Dynamic queries
const { data: hotels } = useHotels({ brand: activeBrand, location: activeLocation })
```

#### 3. Individual Hotel Pages
```typescript
// Current: 18+ separate page components
<TivoliGrandPalacePage />

// Planned: Single dynamic component
<HotelPage /> // Uses useParams() + useHotelBySlug()
```

### Priority 2: Supporting Components

#### 4. Navigation.tsx
```typescript
// Current: Hardcoded brand links
const brands = ['tivoli', 'omnia', 'upper-hse', 'wedcation']

// Planned: Dynamic brand menu
const { data: brands } = useBrands({ active: true })
```

#### 5. Locations.tsx
```typescript
// Current: Derived from static hotels
const locations = [...new Set(hotels.map(h => h.location))]

// Planned: Direct location query
const { data: locations } = useLocations({ hasHotels: true })
```

---

## 🗄️ Database Service Layer

### File Structure
```
src/
├── lib/
│   ├── supabase.ts (existing)
│   └── supabase-services.ts (new)
├── hooks/
│   ├── useBrands.ts (new)
│   ├── useLocations.ts (new)
│   ├── useHotels.ts (new)
│   └── useImages.ts (new)
└── types/
    ├── hotel.ts (existing)
    └── supabase.ts (new - generated)
```

### Service Implementation Template
```typescript
// src/lib/supabase-services.ts
export const hotelService = {
  async getHotels(filters?: HotelFilters) {
    let query = supabase
      .from('hotels')
      .select(`
        *,
        brand:brands(*),
        location:locations(*),
        featured_image:media(*)
      `)
      .eq('is_active', true)
    
    if (filters?.brand) {
      query = query.eq('brands.slug', filters.brand)
    }
    
    if (filters?.location) {
      query = query.eq('locations.slug', filters.location)
    }
    
    const { data, error } = await query.order('sort_order')
    
    if (error) throw error
    return data
  }
}
```

---

## 🔧 Implementation Checklist

### Phase 4: Component Refactoring Tasks

#### Week 4 Day 1-2: Core Infrastructure
- [ ] Create `src/lib/supabase-services.ts`
- [ ] Create `src/hooks/useBrands.ts`
- [ ] Create `src/hooks/useLocations.ts`
- [ ] Create `src/hooks/useHotels.ts`
- [ ] Install and configure React Query

#### Week 4 Day 3-4: High-Impact Components
- [ ] Refactor `FeaturedVenues.tsx`
- [ ] Refactor `LocationsPage.tsx`
- [ ] Create dynamic `HotelPage.tsx`

#### Week 4 Day 5-7: Individual Pages & Routing
- [ ] Update `App.tsx` routing
- [ ] Remove individual hotel page components
- [ ] Update `Navigation.tsx`
- [ ] Update `Locations.tsx`

### Testing Checkpoints
- [ ] All existing URLs still work
- [ ] No broken images
- [ ] Loading states implemented
- [ ] Error handling added
- [ ] Mobile responsiveness maintained

---

## 🚨 Common Pitfalls to Avoid

### 1. Image URL Mapping
**Problem**: Images might not load if URLs change  
**Solution**: Keep fallback to original URLs during transition

### 2. Route Preservation
**Problem**: Changing URLs breaks SEO and bookmarks  
**Solution**: Use exact same URL patterns, just dynamic data

### 3. Loading States
**Problem**: Blank pages while data loads  
**Solution**: Implement proper loading skeletons

### 4. Error Handling
**Problem**: App crashes when database is unavailable  
**Solution**: Graceful degradation with static fallbacks

---

## 📊 Progress Tracking

### Components Status
| Component | Status | Notes |
|-----------|--------|-------|
| `FeaturedVenues.tsx` | 🚫 Pending | High priority |
| `LocationsPage.tsx` | 🚫 Pending | High priority |
| `HotelPage.tsx` | 🚫 Pending | New component needed |
| `Navigation.tsx` | 🚫 Pending | Medium priority |
| `Locations.tsx` | 🚫 Pending | Medium priority |
| Individual Pages | 🚫 Pending | To be removed |

### Hooks Status
| Hook | Status | Purpose |
|------|--------|---------|
| `useBrands()` | 🚫 Pending | Brand data fetching |
| `useLocations()` | 🚫 Pending | Location data fetching |
| `useHotels()` | 🚫 Pending | Hotel data with filters |
| `useHotelBySlug()` | 🚫 Pending | Single hotel details |
| `useHotelImages()` | 🚫 Pending | Hotel image management |

---

**Last Updated**: 2025-06-20  
**Next Review**: After Phase 1 database setup  
**Use Case**: Quick reference for component refactoring