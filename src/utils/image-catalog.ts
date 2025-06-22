/**
 * Centralized Image Catalog for Tivoli Hotels
 * 
 * This file provides a single source of truth for all images used across the website.
 * It replaces scattered hard-coded URLs with organized, typed, and maintainable image references.
 * 
 * Benefits:
 * - Type-safe image references
 * - Easy to update/change image sources
 * - Prevents broken image URLs
 * - Supports automatic fallback mechanisms
 * - Clear organization by venue/purpose
 */

import { getImageUrl, type BucketName } from './image-urls'

// Type definitions for image catalog
export interface ImageReference {
  bucket: BucketName
  path: string
  alt: string
  caption?: string
}

export interface VenueImages {
  thumbnail: ImageReference
  hero?: ImageReference
  gallery?: ImageReference[]
}

export interface HomepageImages {
  carousel: ImageReference[]
  experiences: ImageReference[]
  venuesThumbnails: Record<string, ImageReference>
  locations: Record<string, ImageReference>
  ourStory: ImageReference
}

// HOMEPAGE IMAGES CATALOG
export const homepageImages: HomepageImages = {
  // Hero Carousel Images (Auto-rotating on homepage)
  carousel: [
    {
      bucket: 'thetivolinewdelhi1',
      path: 'thetivoliporticoheromaster-1%20(1).png',
      alt: 'The Tivoli Portico - Luxury Hotel Entrance',
      caption: 'Welcome to The Tivoli - Where luxury meets hospitality'
    },
    {
      bucket: 'thetivolinewdelhi1', 
      path: 'The%20Tivoli-Lobby%20hero-5.png',
      alt: 'The Tivoli Elegant Lobby',
      caption: 'Sophisticated interiors and timeless elegance'
    },
    {
      bucket: 'thetivolinewdelhi1',
      path: 'The%20Tivoli%20Pool%20Hero6.png', 
      alt: 'The Tivoli Swimming Pool',
      caption: 'Relax and unwind in our luxury pool area'
    },
    {
      bucket: 'thetivolinewdelhi1',
      path: 'The%20Tivoli%20facade%20hero2.png',
      alt: 'The Tivoli Hotel Facade',
      caption: 'Architectural excellence in the heart of Delhi'
    }
  ],

  // Experience Section Images
  experiences: [
    {
      bucket: 'homepage_image',
      path: 'wedding.jpg',
      alt: 'Wedding Celebrations',
      caption: 'Magical wedding celebrations'
    },
    {
      bucket: 'homepage_image',
      path: 'corporate-hp.jpg', 
      alt: 'Corporate Events',
      caption: 'Professional corporate events'
    },
    {
      bucket: 'homepage_image',
      path: 'foodblue_thetivoli.jpg',
      alt: 'Fine Dining Experience',
      caption: 'Exquisite culinary experiences'
    },
    {
      bucket: 'homepage_image',
      path: 'Luxurious-stays.jpg',
      alt: 'Luxurious Hotel Stays',
      caption: 'Unmatched luxury accommodations'
    },
    {
      bucket: 'homepage_image',
      path: 'cocktail-aprty.jpg',
      alt: 'Cocktail Parties',
      caption: 'Elegant cocktail experiences'
    },
    {
      bucket: 'homepage_image',
      path: 'spa.jpg',
      alt: 'Spa and Wellness',
      caption: 'Rejuvenating spa treatments'
    }
  ],

  // Venue Thumbnail Images (Used in Featured Venues)
  venuesThumbnails: {
    'tivoli-grand-palace': {
      bucket: 'thetivolinewdelhi1',
      path: 'thetivoliporticoheromaster-1%20(1).png',
      alt: 'The Tivoli Delhi - Luxury Hotel Entrance',
      caption: 'The Tivoli - Premium luxury in Delhi'
    },
    'tivoli-royal-palace': {
      bucket: 'homepage_image', 
      path: 'thumbnail-royalpalace-hp.jpg',
      alt: 'Tivoli Royal Palace Palwal',
      caption: 'Royal Palace - Majestic heritage experience'
    },
    'tivoli-heritage-palace': {
      bucket: 'homepage_image',
      path: 'heritage-hp-thumbnail.jpg', 
      alt: 'Tivoli Heritage Palace Rewari',
      caption: 'Heritage Palace - Timeless elegance'
    },
    'tivoli-bijwasan': {
      bucket: 'homepage_image',
      path: 'bijwasan-hp-thumbnail.jpg',
      alt: 'Tivoli Bijwasan Delhi',
      caption: 'Bijwasan - Modern luxury in Delhi'
    },
    'tivoli-royal-court': {
      bucket: 'homepage_image',
      path: 'RoyalCourt-hp-thumbnail.jpg',
      alt: 'Tivoli Royal Court Okhla',
      caption: 'Royal Court - Contemporary elegance'
    },
    'tivoli-lotus-court': {
      bucket: 'homepage_image',
      path: 'lotuscourt-hp-thumbnail.webp',
      alt: 'Tivoli Lotus Court Noida',
      caption: 'Lotus Court - Premium business hotel'
    },
    'upper-hse-sultanpur': {
      bucket: 'homepage_image',
      path: 'upperhse-hp-thumbnail.jpg',
      alt: 'Upper HSE Sultanpur',
      caption: 'Upper HSE - Contemporary urban experience'
    }
  },

  // Location Images (Used in Locations Component)
  locations: {
    'delhi': {
      bucket: 'homepage_image',
      path: 'delhi-hp.jpg', 
      alt: 'Delhi Hotels',
      caption: 'Discover luxury in the heart of Delhi'
    },
    'haryana': {
      bucket: 'homepage_image',
      path: 'haryana-hp-thumbnail.jpg',
      alt: 'Haryana Hotels', 
      caption: 'Heritage and luxury in Haryana'
    },
    'noida': {
      bucket: 'homepage_image',
      path: 'noida-hp-thumbnail.jpg',
      alt: 'Noida Hotels',
      caption: 'Modern business hotels in Noida'
    },
    'greater-noida': {
      bucket: 'homepage_image',
      path: 'gn-hp-thumbnail.jpg',
      alt: 'Greater Noida Hotels',
      caption: 'Premium accommodations in Greater Noida'
    }
  },

  // Our Story Section
  ourStory: {
    bucket: 'homepage_image',
    path: 'Hero1.jpg',
    alt: 'Tivoli Hotels Story',
    caption: 'Our journey of hospitality excellence'
  }
}

// VENUE-SPECIFIC IMAGES CATALOG
export const venueImages = {
  // TIVOLI HOTELS
  tivoli: {
    'royal-palace-palwal': {
      thumbnail: {
        bucket: 'royalpalacepalwal' as BucketName,
        path: 'mainphoto1.jpg',
        alt: 'Tivoli Royal Palace Palwal Main View'
      },
      gallery: [
        { bucket: 'royalpalacepalwal' as BucketName, path: 'mainphoto1.jpg', alt: 'Royal Palace Exterior' },
        { bucket: 'royalpalacepalwal' as BucketName, path: 'mainphoto2.jpg', alt: 'Royal Palace Interior' },
        { bucket: 'royalpalacepalwal' as BucketName, path: 'mainphoto3.jpg', alt: 'Royal Palace Gardens' },
        { bucket: 'royalpalacepalwal' as BucketName, path: 'mainphoto4.jpg', alt: 'Royal Palace Dining' },
        { bucket: 'royalpalacepalwal' as BucketName, path: 'mainphoto5.jpg', alt: 'Royal Palace Rooms' },
        { bucket: 'royalpalacepalwal' as BucketName, path: 'mainphoto6.jpg', alt: 'Royal Palace Lobby' }
      ]
    },
    'heritage-palace-rewari': {
      thumbnail: {
        bucket: 'tivoliheritagerewari' as BucketName,
        path: 'mainphoto6.jpg',
        alt: 'Tivoli Heritage Palace Rewari'
      },
      gallery: [
        { bucket: 'tivoliheritagerewari' as BucketName, path: 'mainphoto6.jpg', alt: 'Heritage Palace Main View' },
        { bucket: 'tivoliheritagerewari' as BucketName, path: 'mainpagephoto2.jpg', alt: 'Heritage Palace Architecture' },
        { bucket: 'tivoliheritagerewari' as BucketName, path: 'mainpagephoto4.jpg', alt: 'Heritage Palace Interiors' }
      ]
    }
  },

  // WEDCATION VENUES
  wedcation: {
    'ambala': {
      thumbnail: {
        bucket: 'wedcationambala' as BucketName,
        path: 'mainphoto1.jpg',
        alt: 'Wedcation Ambala Wedding Venue'
      },
      gallery: [
        { bucket: 'wedcationambala' as BucketName, path: 'mainphoto1.jpg', alt: 'Wedcation Ambala Exterior' },
        { bucket: 'wedcationambala' as BucketName, path: 'mainphoto2.jpg', alt: 'Wedcation Ambala Wedding Hall' },
        { bucket: 'wedcationambala' as BucketName, path: 'mainphoto3.jpg', alt: 'Wedcation Ambala Gardens' },
        { bucket: 'wedcationambala' as BucketName, path: 'mainphoto4.jpg', alt: 'Wedcation Ambala Decor' },
        { bucket: 'wedcationambala' as BucketName, path: 'mainphoto5.jpg', alt: 'Wedcation Ambala Celebration' }
      ]
    },
    'israna': {
      thumbnail: {
        bucket: 'wedcationisrana' as BucketName,
        path: 'mainphoto1.jpg',
        alt: 'Wedcation Israna Wedding Venue'
      },
      gallery: [
        { bucket: 'wedcationisrana' as BucketName, path: 'mainphoto1.jpg', alt: 'Wedcation Israna Main View' },
        { bucket: 'wedcationisrana' as BucketName, path: 'mainphoto2.jpg', alt: 'Wedcation Israna Ceremony Area' },
        { bucket: 'wedcationisrana' as BucketName, path: 'mainphoto3.jpg', alt: 'Wedcation Israna Reception' },
        { bucket: 'wedcationisrana' as BucketName, path: 'mainphoto4.jpg', alt: 'Wedcation Israna Lawns' },
        { bucket: 'wedcationisrana' as BucketName, path: 'mainphoto5.jpg', alt: 'Wedcation Israna Accommodation' }
      ]
    }
  },

  // OMNIA VENUES
  omnia: {
    'dwarka-expressway': {
      thumbnail: {
        bucket: 'omnia-venues' as BucketName,
        path: 'mainphoto1.jpg',
        alt: 'Omnia Dwarka Expressway'
      },
      gallery: [
        { bucket: 'omnia-venues' as BucketName, path: 'mainphoto1.jpg', alt: 'Omnia Dwarka Main View' },
        { bucket: 'omnia-venues' as BucketName, path: 'mainphoto2.jpg', alt: 'Omnia Dwarka Interiors' },
        { bucket: 'omnia-venues' as BucketName, path: 'mainphoto3.jpg', alt: 'Omnia Dwarka Dining' },
        { bucket: 'omnia-venues' as BucketName, path: 'mainphoto4.jpg', alt: 'Omnia Dwarka Amenities' },
        { bucket: 'omnia-venues' as BucketName, path: 'mainphoto5.jpg', alt: 'Omnia Dwarka Events' },
        { bucket: 'omnia-venues' as BucketName, path: 'mainphoto6.jpg', alt: 'Omnia Dwarka Rooms' }
      ]
    }
  },

  // UPPER HSE VENUES
  upperHse: {
    'sultanpur': {
      thumbnail: {
        bucket: 'upper-hse-venues' as BucketName,
        path: 'mainphoto1.jpg',
        alt: 'Upper HSE Sultanpur'
      },
      gallery: [
        { bucket: 'upper-hse-venues' as BucketName, path: 'mainphoto1.jpg', alt: 'Upper HSE Sultanpur Exterior' },
        { bucket: 'upper-hse-venues' as BucketName, path: 'mainphoto2.jpg', alt: 'Upper HSE Sultanpur Lobby' },
        { bucket: 'upper-hse-venues' as BucketName, path: 'mainphoto3.jpg', alt: 'Upper HSE Sultanpur Rooms' }
      ]
    }
  },

  // LOTUS COURT
  lotusCourt: {
    'noida': {
      thumbnail: {
        bucket: 'lotuscourt' as BucketName,
        path: 'mainphoto1.jpg',
        alt: 'Lotus Court Noida'
      },
      gallery: [
        { bucket: 'lotuscourt' as BucketName, path: 'mainphoto1.jpg', alt: 'Lotus Court Main View' },
        { bucket: 'lotuscourt' as BucketName, path: 'mainphoto2.jpg', alt: 'Lotus Court Business Center' },
        { bucket: 'lotuscourt' as BucketName, path: 'mainphoto3.jpg', alt: 'Lotus Court Dining' }
      ]
    }
  }
}

// UTILITY FUNCTIONS FOR IMAGE RETRIEVAL

/**
 * Get homepage carousel image URLs
 */
export function getCarouselImages(): string[] {
  return homepageImages.carousel.map(img => getImageUrl(img.bucket, img.path))
}

/**
 * Get experience section image URLs
 */
export function getExperienceImages(): string[] {
  return homepageImages.experiences.map(img => getImageUrl(img.bucket, img.path))
}

/**
 * Get venue thumbnail image URL by venue ID
 */
export function getVenueThumbnail(venueId: string): string {
  const image = homepageImages.venuesThumbnails[venueId]
  if (!image) {
    console.warn(`No thumbnail found for venue: ${venueId}`)
    return getImageUrl('homepage_image', 'placeholder.jpg') // fallback
  }
  return getImageUrl(image.bucket, image.path)
}

/**
 * Get location image URL by location key
 */
export function getLocationImage(locationKey: string): string {
  const image = homepageImages.locations[locationKey]
  if (!image) {
    console.warn(`No image found for location: ${locationKey}`)
    return getImageUrl('homepage_image', 'placeholder.jpg') // fallback
  }
  return getImageUrl(image.bucket, image.path)
}

/**
 * Get Our Story image URL
 */
export function getOurStoryImage(): string {
  return getImageUrl(homepageImages.ourStory.bucket, homepageImages.ourStory.path)
}

/**
 * Get venue gallery images for a specific venue
 */
export function getVenueGallery(brand: string, venueKey: string): string[] {
  const brandImages = venueImages[brand as keyof typeof venueImages]
  if (!brandImages) return []
  
  const venue = brandImages[venueKey as keyof typeof brandImages]
  if (!venue?.gallery) return []
  
  return venue.gallery.map(img => getImageUrl(img.bucket, img.path))
}

/**
 * Get dining images (for restaurant sections)
 */
export function getDiningImages(): string[] {
  // You can expand this to include specific dining images from tivoli-dining-photo bucket
  return [
    getImageUrl('tivoli-dining-photo', 'dining1.jpg'),
    getImageUrl('tivoli-dining-photo', 'dining2.jpg'),
    // Add more as needed
  ]
}

// Export all for easy access
export default {
  homepageImages,
  venueImages,
  getCarouselImages,
  getExperienceImages,
  getVenueThumbnail,
  getLocationImage,
  getOurStoryImage,
  getVenueGallery,
  getDiningImages
}