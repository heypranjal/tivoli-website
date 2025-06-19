/**
 * Venue Management Utilities
 * Helper functions for managing venue data and selections
 */

import { hotels } from '@/data/hotels'

export interface VenueOption {
  id: string
  name: string
  location: string
  brand: string
  displayName: string
}

/**
 * Get all venues formatted for dropdown selection
 */
export function getVenueOptions(): VenueOption[] {
  return hotels.map(hotel => ({
    id: hotel.id,
    name: hotel.name,
    location: hotel.location,
    brand: hotel.brand,
    displayName: `${hotel.name} - ${hotel.address.city}`
  })).sort((a, b) => a.displayName.localeCompare(b.displayName))
}

/**
 * Get venues grouped by brand for organized dropdown
 */
export function getVenuesByBrand() {
  const venues = getVenueOptions()
  const grouped = venues.reduce((acc, venue) => {
    const brand = venue.brand.toUpperCase()
    if (!acc[brand]) {
      acc[brand] = []
    }
    acc[brand].push(venue)
    return acc
  }, {} as Record<string, VenueOption[]>)

  return grouped
}

/**
 * Get venue by ID
 */
export function getVenueById(id: string): VenueOption | undefined {
  const venues = getVenueOptions()
  return venues.find(venue => venue.id === id)
}

/**
 * Format venue display name for consistency
 */
export function formatVenueDisplayName(venue: VenueOption): string {
  return `${venue.name} - ${venue.location.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}`
}