# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
```bash
# Start development server
npm run dev

# Build production bundle
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

### Testing
```bash
# Run all Playwright tests
npm test

# Run tests with UI
npm run test:ui

# View test report
npm run test:report
```

### Database Operations
```bash
# Prepare and run migrations
npm run migrate:prepare

# Run test migrations
npm run migrate:test

# Migrate images to Supabase storage
npm run migrate:images

# Migrate Tivoli-specific data
npm run migrate:tivoli

# Test database services
npm run test:services
```

### Quality Assurance
```bash
# Run comprehensive test suite
npm run test:comprehensive

# Monitor performance
npm run test:performance

# Track errors
npm run test:errors

# Production readiness check
npm run production:check
```

### Development Workflow
- Start with `npm run dev` for local development on port 5173
- Use `npm run lint` before commits
- Run `npm run production:check` before deploying

## Architecture Overview

### Tech Stack
- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **Routing**: React Router v6 with dynamic routing
- **State Management**: TanStack Query (React Query) for server state
- **Database**: Supabase PostgreSQL with real-time capabilities
- **Testing**: Playwright for E2E testing
- **Build Tool**: Vite with React plugin

### Project Structure

#### Core Application (`src/`)
- **`App.tsx`**: Main app component with routing configuration
- **`main.tsx`**: Application entry point with providers
- **`lib/`**: Core utilities and services
  - `supabase.ts`: Supabase client configuration
  - `supabase-services.ts`: Typed database service layer
  - `query-client.ts`: TanStack Query configuration

#### Component Architecture (`src/components/`)
- **Layout Components**: `Navigation`, `Hero`, footer in App.tsx
- **Business Components**: `OurHotels`, `Locations`, `Experiences`
- **Hotel Components** (`hotel/`): Specialized components for hotel pages
  - `HeroSection`, `AccommodationsSection`, `DiningSection`
  - `RoomCard`, `GallerySection`, `ContactSection`
- **UI Components** (`ui/`): Reusable interface elements
  - `SmartImage`: Optimized image loading with fallbacks
  - `ImageCarousel`: Gallery functionality
  - `SkeletonComponents`: Loading states

#### Data Layer (`src/`)
- **`types/`**: TypeScript interfaces
  - `hotel.ts`: Core hotel data structures
  - `supabase.ts`: Database-generated types
- **`hooks/`**: Custom React hooks for data fetching
  - `useHotels.ts`: Hotel data management
  - `useSupabase.ts`: Database operations
  - Hotel-specific hooks for individual properties
- **`data/`**: Static data and constants
  - `hotels.ts`: Legacy hotel data (migrating to Supabase)
  - `venues/`: Venue-specific data organized by brand

#### Routing System (`src/pages/`)
- **Dynamic Hotel Pages**: `HotelPage.tsx` renders any hotel by slug
- **Brand/Location Pages**: Filter hotels by brand or location
- **Enhanced Pages**: Specialized components for specific hotels
- **Static Pages**: `OurStoryPage`, `SustainabilityPage`, etc.

### Database Architecture (Supabase)

#### Core Tables
- **`hotels`**: Main hotel records with brand/location relationships
- **`brands`**: Tivoli, Omnia, Upper HSE, Wedcation
- **`locations`**: Geographic locations (Delhi, Noida, etc.)
- **`media`**: Centralized image/video management
- **`rooms`**: Hotel room types and details
- **`dining`**: Restaurant and dining options

#### Key Relationships
- Hotels belong to brands and locations
- Media linked to hotels via `hotel_media` junction table
- Rooms and dining belong to specific hotels
- Amenities linked via `hotel_amenities` junction table

#### Service Layer Pattern
All database operations go through typed service functions in `supabase-services.ts`:
- `hotelService`: Hotel CRUD operations with filtering
- `brandService`: Brand management
- `locationService`: Location operations
- `mediaService`: Image/video handling with Supabase Storage

### State Management Strategy

#### TanStack Query Integration
- Server state cached and synchronized automatically
- Optimistic updates for better UX
- Background refetching and error boundaries
- Custom hooks wrap service calls for consistent caching

#### Loading States
- Skeleton components for content loading
- Progressive loading for hotel images
- Error boundaries with fallback UI
- Smart image loading with multiple fallback strategies

### Hotel Page Architecture

#### Dynamic Routing
- Single `HotelPage.tsx` component handles all hotels
- URL structure: `/hotel/{slug}` or `/{location}/{slug}` or `/{brand}/{slug}`
- Slug-based lookups in database for SEO-friendly URLs

#### Component Composition
Hotel pages dynamically compose sections based on available data:
- Hero section with primary image and booking widget
- Accommodations with room cards and image carousels
- Dining options with cuisine details
- Experiences and amenities
- Gallery and virtual tours
- Contact information and location

#### Content Management
- All content stored in Supabase database
- Images managed through Supabase Storage
- Fallback content and images for missing data
- Real-time updates when content changes

### Performance Optimizations

#### Image Handling
- `SmartImage` component with multiple fallback strategies
- Lazy loading and progressive enhancement
- Optimized storage in Supabase with CDN delivery
- Responsive images with proper sizing

#### Code Splitting
- Route-based code splitting with React.lazy
- Component-level splitting for large hotel sections
- Dynamic imports for non-critical functionality

#### Caching Strategy
- TanStack Query for server state caching
- Browser caching for static assets
- Optimized re-renders with proper memoization

### Testing Strategy

#### Playwright E2E Tests
- Comprehensive hotel page testing
- Brand and location filtering validation
- Booking widget functionality
- Image loading and gallery interactions
- Mobile responsiveness testing

#### Test Organization
- Tests in `/tests/` directory and root level
- Page-specific test files
- Debug utilities for troubleshooting
- Visual regression testing with screenshots

### Migration Status

The codebase is transitioning from static data files to Supabase database:
- **Completed**: Core hotel data, images, rooms, dining
- **In Progress**: Venue booking system, enhanced content
- **Legacy**: Some hotel-specific hooks still reference static data

When working with hotels, prefer database-first approach via `hotelService` and related hooks.

### Development Notes

#### Key Patterns
- Use `useHotels()` hook for fetching hotel data
- All database operations should go through service layer
- Images should use `SmartImage` component with fallbacks
- New components should include loading states and error boundaries

#### Common Tasks
- Adding new hotels: Use Supabase database, not static files
- Image management: Upload to Supabase Storage, link via `hotel_media`
- Route changes: Update App.tsx routing configuration
- New hotel pages: Extend `HotelPage.tsx` or create enhanced version

#### Debugging
- Use browser dev tools for TanStack Query state
- Supabase dashboard for database inspection
- Playwright test reports for E2E debugging
- Console logging available in service layer for tracing