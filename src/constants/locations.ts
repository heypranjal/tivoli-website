/**
 * Location Constants for Tivoli Hotels
 * Centralized location definitions used across the application
 * 
 * Features:
 * - Consistent location IDs and display names
 * - Geographic coordinates for mapping
 * - State/region organization
 * - URL-friendly slugs
 * 
 * Usage:
 * - Import in components for consistent location filtering
 * - Used by LocationsPage, LocationBrandFilter, and other components
 * - Ensures data consistency across venue listings
 */

export interface Location {
  id: string
  name: string
  displayName: string
  state: string
  region: string
  coordinates?: {
    lat: number
    lng: number
  }
  description?: string
}

// Core location definitions used across the application
export const LOCATIONS: Location[] = [
  {
    id: 'delhi',
    name: 'Delhi',
    displayName: 'New Delhi',
    state: 'Delhi',
    region: 'NCR',
    coordinates: {
      lat: 28.6139,
      lng: 77.2090
    },
    description: 'The capital city offering luxury hospitality in the heart of India'
  },
  {
    id: 'noida',
    name: 'Noida',
    displayName: 'Noida',
    state: 'Uttar Pradesh', 
    region: 'NCR',
    coordinates: {
      lat: 28.5355,
      lng: 77.3910
    },
    description: 'Modern planned city with contemporary luxury properties'
  },
  {
    id: 'greater-noida',
    name: 'Greater Noida',
    displayName: 'Greater Noida',
    state: 'Uttar Pradesh',
    region: 'NCR',
    coordinates: {
      lat: 28.4744,
      lng: 77.5040
    },
    description: 'Emerging destination for business and leisure travelers'
  },
  {
    id: 'ambala',
    name: 'Ambala',
    displayName: 'Ambala',
    state: 'Haryana',
    region: 'North India',
    coordinates: {
      lat: 30.3744,
      lng: 76.7763
    },
    description: 'Historic city perfect for weddings and celebrations'
  },
  {
    id: 'israna',
    name: 'Israna',
    displayName: 'Israna',
    state: 'Haryana',
    region: 'North India',
    coordinates: {
      lat: 29.2744,
      lng: 76.9763
    },
    description: 'Scenic location ideal for destination weddings'
  },
  {
    id: 'palwal-haryana',
    name: 'Palwal Haryana',
    displayName: 'Palwal, Haryana',
    state: 'Haryana',
    region: 'NCR',
    coordinates: {
      lat: 28.1444,
      lng: 77.3266
    },
    description: 'Strategic location on NH-2 with royal hospitality'
  },
  {
    id: 'rewari-haryana', 
    name: 'Rewari Haryana',
    displayName: 'Rewari, Haryana',
    state: 'Haryana',
    region: 'North India',
    coordinates: {
      lat: 28.1991,
      lng: 76.6198
    },
    description: 'Heritage destination with traditional charm'
  }
]

// Quick lookup maps for efficient searching
export const LOCATION_MAP = LOCATIONS.reduce((acc, location) => {
  acc[location.id] = location
  return acc
}, {} as Record<string, Location>)

export const LOCATION_NAMES = LOCATIONS.map(location => location.name)
export const LOCATION_IDS = LOCATIONS.map(location => location.id)

// Helper functions
export function getLocationById(id: string): Location | undefined {
  return LOCATION_MAP[id]
}

export function getLocationByName(name: string): Location | undefined {
  return LOCATIONS.find(location => 
    location.name.toLowerCase() === name.toLowerCase() ||
    location.displayName.toLowerCase() === name.toLowerCase()
  )
}

export function getLocationsByState(state: string): Location[] {
  return LOCATIONS.filter(location => 
    location.state.toLowerCase() === state.toLowerCase()
  )
}

export function getLocationsByRegion(region: string): Location[] {
  return LOCATIONS.filter(location => 
    location.region.toLowerCase() === region.toLowerCase()
  )
}

// Location groups for UI organization
export const LOCATION_GROUPS = {
  ncr: {
    name: 'NCR Region',
    locations: LOCATIONS.filter(loc => loc.region === 'NCR')
  },
  haryana: {
    name: 'Haryana',
    locations: LOCATIONS.filter(loc => loc.state === 'Haryana')
  },
  uttarPradesh: {
    name: 'Uttar Pradesh',
    locations: LOCATIONS.filter(loc => loc.state === 'Uttar Pradesh')
  }
}

// For dropdown/filter components
export const LOCATION_OPTIONS = LOCATIONS.map(location => ({
  value: location.id,
  label: location.displayName,
  state: location.state,
  region: location.region
}))

export default {
  LOCATIONS,
  LOCATION_MAP,
  LOCATION_NAMES,
  LOCATION_IDS,
  LOCATION_GROUPS,
  LOCATION_OPTIONS,
  getLocationById,
  getLocationByName,
  getLocationsByState,
  getLocationsByRegion
}