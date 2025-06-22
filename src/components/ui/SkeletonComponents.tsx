/**
 * Skeleton Components for Performance Optimization
 * Design-preserving loading states that match exact layout dimensions
 */

import React from 'react';

// Optimized shimmer animation for skeleton elements
const shimmerClass = "skeleton-shimmer bg-neutral-200";

// Hero Section Skeleton - matches carousel layout
export const SkeletonHero: React.FC = () => {
  return (
    <section className="relative h-[600px] bg-neutral-200">
      {/* Image placeholder */}
      <div className={`absolute inset-0 ${shimmerClass}`} />
      
      {/* Overlay content skeleton */}
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
        <div className="text-center space-y-4">
          {/* Hotel name skeleton */}
          <div className={`h-12 w-80 mx-auto rounded ${shimmerClass}`} />
          {/* Location skeleton */}
          <div className={`h-6 w-48 mx-auto rounded ${shimmerClass}`} />
        </div>
      </div>
      
      {/* Carousel indicators skeleton */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`w-3 h-3 rounded-full ${shimmerClass}`} />
        ))}
      </div>
    </section>
  );
};

// Overview Section Skeleton - matches stats grid and description
export const SkeletonOverview: React.FC = () => {
  return (
    <section className="space-y-8">
      {/* Header skeleton */}
      <div className="text-center space-y-4">
        <div className={`h-10 w-96 mx-auto rounded ${shimmerClass}`} />
        <div className={`h-24 w-full max-w-4xl mx-auto rounded ${shimmerClass}`} />
      </div>
      
      {/* Stats grid skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="text-center space-y-3">
            <div className={`w-12 h-12 mx-auto rounded-full ${shimmerClass}`} />
            <div className={`h-8 w-16 mx-auto rounded ${shimmerClass}`} />
            <div className={`h-4 w-24 mx-auto rounded ${shimmerClass}`} />
          </div>
        ))}
      </div>
    </section>
  );
};

// Accommodations Section Skeleton - matches 5-column grid with exact dimensions
export const SkeletonAccommodations: React.FC = () => {
  return (
    <section className="space-y-8 below-fold">
      {/* Header skeleton */}
      <div className="text-center space-y-4">
        <div className={`h-8 w-48 mx-auto rounded ${shimmerClass}`} />
        <div className={`h-16 w-full max-w-2xl mx-auto rounded ${shimmerClass}`} />
      </div>
      
      {/* Room cards grid skeleton - exact match to AccommodationsSection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg overflow-hidden shadow-lg">
            {/* Image skeleton - exact height match (h-48 = 192px) */}
            <div 
              className={`${shimmerClass} image-container`}
              style={{ 
                height: '192px', // Exact match to h-48
                aspectRatio: '4/3' // Match the aspect ratio
              }}
            />
            
            {/* Card content skeleton - exact padding match */}
            <div className="p-4 space-y-3" style={{ minHeight: '180px' }}>
              {/* Room name */}
              <div className={`h-6 w-32 rounded ${shimmerClass}`} />
              
              {/* Description - 2 lines to match content */}
              <div className="space-y-2 mb-3">
                <div className={`h-4 w-full rounded ${shimmerClass}`} />
                <div className={`h-4 w-3/4 rounded ${shimmerClass}`} />
              </div>
              
              {/* Capacity */}
              <div className="mb-3">
                <div className={`h-4 w-24 rounded ${shimmerClass}`} />
              </div>
              
              {/* Amenities section */}
              <div className="space-y-2">
                <div className={`h-4 w-20 rounded ${shimmerClass}`} />
                <div className="flex flex-wrap gap-1">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className={`h-6 w-16 rounded ${shimmerClass}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Gallery Section Skeleton - matches 3-column grid with exact dimensions
export const SkeletonGallery: React.FC = () => {
  return (
    <section className="space-y-8 below-fold">
      {/* Header skeleton */}
      <div className="text-center space-y-4">
        <div className={`h-8 w-32 mx-auto rounded ${shimmerClass}`} />
        <div className={`h-16 w-full max-w-2xl mx-auto rounded ${shimmerClass}`} />
      </div>
      
      {/* Gallery grid skeleton - exact match to GallerySection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(5)].map((_, i) => ( // Match the 5 default images
          <div key={i} className="bg-white rounded-lg overflow-hidden shadow-lg">
            {/* Image skeleton - exact aspect ratio match */}
            <div 
              className={`${shimmerClass} image-container`}
              style={{ 
                aspectRatio: '4/3', // Exact match to aspect-[4/3]
                width: '100%'
              }}
            />
            
            {/* Image info skeleton - exact padding match */}
            <div className="p-4 space-y-2" style={{ minHeight: '80px' }}>
              <div className={`h-5 w-32 rounded ${shimmerClass}`} />
              <div className={`h-4 w-full rounded ${shimmerClass}`} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Experiences Section Skeleton
export const SkeletonExperiences: React.FC = () => {
  return (
    <section className="space-y-8">
      {/* Header skeleton */}
      <div className="text-center space-y-4">
        <div className={`h-8 w-48 mx-auto rounded ${shimmerClass}`} />
        <div className={`h-16 w-full max-w-2xl mx-auto rounded ${shimmerClass}`} />
      </div>
      
      {/* Experiences grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-4">
            {/* Image skeleton */}
            <div className={`aspect-[16/10] rounded-lg ${shimmerClass}`} />
            
            {/* Content skeleton */}
            <div className="space-y-2">
              <div className={`h-6 w-40 rounded ${shimmerClass}`} />
              <div className={`h-4 w-32 rounded ${shimmerClass}`} />
              <div className="space-y-1">
                <div className={`h-4 w-full rounded ${shimmerClass}`} />
                <div className={`h-4 w-3/4 rounded ${shimmerClass}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Spaces Section Skeleton
export const SkeletonSpaces: React.FC = () => {
  return (
    <section className="space-y-8">
      {/* Header skeleton */}
      <div className="text-center space-y-4">
        <div className={`h-8 w-40 mx-auto rounded ${shimmerClass}`} />
        <div className={`h-16 w-full max-w-2xl mx-auto rounded ${shimmerClass}`} />
      </div>
      
      {/* Spaces grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg overflow-hidden shadow-lg">
            {/* Image skeleton */}
            <div className={`h-64 ${shimmerClass}`} />
            
            {/* Content skeleton */}
            <div className="p-6 space-y-4">
              <div className={`h-6 w-48 rounded ${shimmerClass}`} />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className={`h-4 w-16 rounded ${shimmerClass}`} />
                  <div className={`h-6 w-20 rounded ${shimmerClass}`} />
                </div>
                <div className="space-y-2">
                  <div className={`h-4 w-12 rounded ${shimmerClass}`} />
                  <div className={`h-6 w-24 rounded ${shimmerClass}`} />
                </div>
              </div>
              <div className="space-y-1">
                <div className={`h-4 w-full rounded ${shimmerClass}`} />
                <div className={`h-4 w-2/3 rounded ${shimmerClass}`} />
              </div>
              <div className="flex flex-wrap gap-2">
                {[...Array(4)].map((_, j) => (
                  <div key={j} className={`h-6 w-24 rounded ${shimmerClass}`} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Dining Section Skeleton
export const SkeletonDining: React.FC = () => {
  return (
    <section className="space-y-8">
      {/* Header skeleton */}
      <div className="text-center space-y-4">
        <div className={`h-8 w-48 mx-auto rounded ${shimmerClass}`} />
        <div className={`h-16 w-full max-w-2xl mx-auto rounded ${shimmerClass}`} />
      </div>
      
      {/* Dining venues grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg overflow-hidden shadow-lg">
            {/* Image skeleton */}
            <div className={`h-56 ${shimmerClass}`} />
            
            {/* Content skeleton */}
            <div className="p-6 space-y-4">
              <div className={`h-6 w-32 rounded ${shimmerClass}`} />
              <div className="space-y-1">
                <div className={`h-4 w-full rounded ${shimmerClass}`} />
                <div className={`h-4 w-3/4 rounded ${shimmerClass}`} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className={`h-4 w-16 rounded ${shimmerClass}`} />
                  <div className={`h-4 w-24 rounded ${shimmerClass}`} />
                </div>
                <div className="space-y-2">
                  <div className={`h-4 w-20 rounded ${shimmerClass}`} />
                  <div className={`h-4 w-32 rounded ${shimmerClass}`} />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className={`h-6 w-20 rounded ${shimmerClass}`} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Wedding Section Skeleton
export const SkeletonWedding: React.FC = () => {
  return (
    <section className="py-12 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header skeleton */}
          <div className="text-center mb-8 space-y-2">
            <div className={`h-4 w-48 mx-auto rounded ${shimmerClass}`} />
            <div className={`h-8 w-72 mx-auto rounded ${shimmerClass}`} />
          </div>
          
          {/* Main content grid skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Image skeleton */}
            <div className={`h-[320px] rounded-xl ${shimmerClass}`} />
            
            {/* Features skeleton */}
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-lg ${shimmerClass}`} />
                  <div className="space-y-2 flex-1">
                    <div className={`h-5 w-32 rounded ${shimmerClass}`} />
                    <div className={`h-4 w-full rounded ${shimmerClass}`} />
                  </div>
                </div>
              ))}
              
              {/* Button skeleton */}
              <div className="pt-4">
                <div className={`h-12 w-full rounded-lg ${shimmerClass}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Section Skeleton
export const SkeletonContact: React.FC = () => {
  return (
    <section className="space-y-8">
      {/* Header skeleton */}
      <div className="text-center space-y-4">
        <div className={`h-8 w-48 mx-auto rounded ${shimmerClass}`} />
        <div className={`h-16 w-full max-w-2xl mx-auto rounded ${shimmerClass}`} />
      </div>
      
      {/* Contact grid skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact info skeleton */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className={`h-6 w-24 rounded ${shimmerClass}`} />
            <div className="space-y-2">
              <div className={`h-4 w-full rounded ${shimmerClass}`} />
              <div className={`h-4 w-3/4 rounded ${shimmerClass}`} />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className={`h-6 w-20 rounded ${shimmerClass}`} />
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className={`h-4 w-32 rounded ${shimmerClass}`} />
              ))}
            </div>
          </div>
          
          <div className="flex space-x-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className={`w-10 h-10 rounded-lg ${shimmerClass}`} />
            ))}
          </div>
        </div>
        
        {/* Map skeleton */}
        <div className={`h-80 rounded-lg ${shimmerClass}`} />
      </div>
    </section>
  );
};