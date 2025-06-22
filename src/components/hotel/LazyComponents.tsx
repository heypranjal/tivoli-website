/**
 * Lazy-loaded Components for Performance Optimization
 * Uses React.lazy() to split heavy components into separate chunks
 */

import React, { lazy, Suspense, memo } from 'react';
import { 
  SkeletonAccommodations,
  SkeletonExperiences,
  SkeletonSpaces,
  SkeletonDining,
  SkeletonGallery,
  SkeletonWedding,
  SkeletonContact
} from '../ui/SkeletonComponents';

// Lazy load heavy components
const AccommodationsSection = lazy(() => import('./AccommodationsSection'));
const ExperiencesSection = lazy(() => import('./ExperiencesSection'));
const SpacesSection = lazy(() => import('./SpacesSection'));
const DiningSection = lazy(() => import('./DiningSection'));
const GallerySection = lazy(() => import('./GallerySection'));
const WeddingDestinationSection = lazy(() => import('./WeddingDestinationSection'));
const ContactSection = lazy(() => import('./ContactSection'));

// Memoized wrapper components with lazy loading
export const LazyAccommodationsSection = memo<any>((props) => (
  <Suspense fallback={<SkeletonAccommodations />}>
    <AccommodationsSection {...props} />
  </Suspense>
));

export const LazyExperiencesSection = memo<any>((props) => (
  <Suspense fallback={<SkeletonExperiences />}>
    <ExperiencesSection {...props} />
  </Suspense>
));

export const LazySpacesSection = memo<any>((props) => (
  <Suspense fallback={<SkeletonSpaces />}>
    <SpacesSection {...props} />
  </Suspense>
));

export const LazyDiningSection = memo<any>((props) => (
  <Suspense fallback={<SkeletonDining />}>
    <DiningSection {...props} />
  </Suspense>
));

export const LazyGallerySection = memo<any>((props) => (
  <Suspense fallback={<SkeletonGallery />}>
    <GallerySection {...props} />
  </Suspense>
));

export const LazyWeddingDestinationSection = memo<any>((props) => (
  <Suspense fallback={<SkeletonWedding />}>
    <WeddingDestinationSection {...props} />
  </Suspense>
));

export const LazyContactSection = memo<any>((props) => (
  <Suspense fallback={<SkeletonContact />}>
    <ContactSection {...props} />
  </Suspense>
));

// Set display names for debugging
LazyAccommodationsSection.displayName = 'LazyAccommodationsSection';
LazyExperiencesSection.displayName = 'LazyExperiencesSection';
LazySpacesSection.displayName = 'LazySpacesSection';
LazyDiningSection.displayName = 'LazyDiningSection';
LazyGallerySection.displayName = 'LazyGallerySection';
LazyWeddingDestinationSection.displayName = 'LazyWeddingDestinationSection';
LazyContactSection.displayName = 'LazyContactSection';