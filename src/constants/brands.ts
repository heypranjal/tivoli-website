/**
 * Brand Constants for Tivoli Hotels
 * Centralized brand definitions used across the application
 * 
 * Features:
 * - Consistent brand IDs, names, and descriptions
 * - Brand colors and styling information
 * - Target market and positioning details
 * - Icon associations for UI components
 * 
 * Usage:
 * - Import in components for consistent brand filtering
 * - Used by BrandsPage, LocationBrandFilter, and venue listings
 * - Ensures brand consistency across all marketing materials
 */

import { Crown, Star, Heart, Sparkles, LucideIcon } from 'lucide-react'

export interface Brand {
  id: string
  name: string
  displayName: string
  description: string
  longDescription: string
  tagline: string
  color: string
  icon: LucideIcon
  target: string
  positioning: string
  image?: string
}

// Core brand definitions used across the application
export const BRANDS: Brand[] = [
  {
    id: 'tivoli',
    name: 'tivoli',
    displayName: 'THE TIVOLI',
    description: 'Timeless Luxury & Sophistication',
    longDescription: 'Experience the epitome of luxury hospitality with our flagship brand. Each Tivoli property is a masterpiece of architectural elegance and refined service, offering guests an unparalleled experience of timeless sophistication.',
    tagline: 'Where Luxury Meets Legacy',
    color: '#CD9F59',
    icon: Crown,
    target: 'Luxury travelers, business executives, and affluent guests',
    positioning: 'Premium luxury hospitality with heritage charm',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  },
  {
    id: 'upper-hse',
    name: 'upper-hse',
    displayName: 'THE UPPER HSE', 
    description: 'Elevated Living, Refined Experiences',
    longDescription: 'Modern luxury meets sophisticated design in our Upper HSE collection. Perfect for the discerning traveler who appreciates contemporary elegance, cutting-edge amenities, and personalized service in an urban setting.',
    tagline: 'Rise Above the Ordinary',
    color: '#1E3A8A',
    icon: Star,
    target: 'Modern professionals, tech executives, and contemporary luxury seekers',
    positioning: 'Contemporary luxury with urban sophistication',
    image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80'
  },
  {
    id: 'wedcation',
    name: 'wedcation',
    displayName: 'WEDCATION',
    description: 'Extraordinary Venues for Unforgettable Moments',
    longDescription: 'Curated specifically for celebrations and romantic getaways, our Wedcation properties offer enchanting settings for life\'s most precious moments. From intimate ceremonies to grand celebrations, we create magical experiences.',
    tagline: 'Celebrate Love, Create Memories',
    color: '#BE185D',
    icon: Heart,
    target: 'Couples, wedding planners, and celebration hosts',
    positioning: 'Destination wedding and celebration specialist',
    image: 'https://images.unsplash.com/photo-1464808322410-1a934aab61e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  },
  {
    id: 'omnia',
    name: 'omnia',
    displayName: 'OMNIA',
    description: 'Where Nature Meets Opulence',
    longDescription: 'Discover the perfect harmony of natural beauty and luxurious comfort in our Omnia collection. Featuring stunning properties in breathtaking locations, we offer guests an escape into nature without compromising on luxury.',
    tagline: 'Everything Beautiful, Naturally',
    color: '#047857',
    icon: Sparkles,
    target: 'Nature lovers, wellness seekers, and eco-luxury travelers',
    positioning: 'Sustainable luxury in natural settings',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  }
]

// Quick lookup maps for efficient searching
export const BRAND_MAP = BRANDS.reduce((acc, brand) => {
  acc[brand.id] = brand
  return acc
}, {} as Record<string, Brand>)

export const BRAND_NAMES = BRANDS.map(brand => brand.name)
export const BRAND_IDS = BRANDS.map(brand => brand.id)
export const BRAND_DISPLAY_NAMES = BRANDS.map(brand => brand.displayName)

// Helper functions
export function getBrandById(id: string): Brand | undefined {
  return BRAND_MAP[id]
}

export function getBrandByName(name: string): Brand | undefined {
  return BRANDS.find(brand => 
    brand.name.toLowerCase() === name.toLowerCase() ||
    brand.displayName.toLowerCase() === name.toLowerCase()
  )
}

export function getBrandColor(brandId: string): string {
  const brand = getBrandById(brandId)
  return brand?.color || '#CD9F59' // Default to Tivoli gold
}

export function getBrandIcon(brandId: string): LucideIcon {
  const brand = getBrandById(brandId)
  return brand?.icon || Crown // Default to Crown icon
}

// Brand categories for business logic
export const BRAND_CATEGORIES = {
  luxury: ['tivoli', 'upper-hse'],
  celebration: ['wedcation'],
  nature: ['omnia'],
  business: ['tivoli', 'upper-hse', 'omnia'],
  leisure: ['wedcation', 'omnia']
}

// For dropdown/filter components
export const BRAND_OPTIONS = BRANDS.map(brand => ({
  value: brand.id,
  label: brand.displayName,
  description: brand.description,
  color: brand.color,
  icon: brand.icon
}))

// Brand hierarchy for organizational purposes
export const BRAND_HIERARCHY = {
  flagship: {
    name: 'Flagship Brands',
    brands: ['tivoli']
  },
  specialty: {
    name: 'Specialty Brands', 
    brands: ['wedcation', 'upper-hse', 'omnia']
  }
}

// Event type mappings by brand
export const BRAND_EVENT_TYPES = {
  tivoli: ['Corporate Events', 'Luxury Weddings', 'Social Gatherings', 'Business Meetings'],
  'upper-hse': ['Corporate Events', 'Modern Weddings', 'Tech Conferences', 'Executive Retreats'],
  wedcation: ['Weddings', 'Anniversary Celebrations', 'Engagement Parties', 'Romantic Getaways'],
  omnia: ['Destination Weddings', 'Wellness Retreats', 'Nature Events', 'Eco-friendly Celebrations']
}

export default {
  BRANDS,
  BRAND_MAP,
  BRAND_NAMES,
  BRAND_IDS,
  BRAND_DISPLAY_NAMES,
  BRAND_CATEGORIES,
  BRAND_OPTIONS,
  BRAND_HIERARCHY,
  BRAND_EVENT_TYPES,
  getBrandById,
  getBrandByName,
  getBrandColor,
  getBrandIcon
}