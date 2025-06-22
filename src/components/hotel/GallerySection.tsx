/**
 * Gallery Section Component
 * Displays hotel images and videos in an elegant grid layout
 */

import React, { useState, memo } from 'react';
import { Play, X, ChevronLeft, ChevronRight, Image as ImageIcon, Video } from 'lucide-react';
import { SmartImage } from '../ui/SmartImage';

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  title?: string;
  description?: string;
}

interface GallerySectionProps {
  images?: MediaItem[];
  videos?: MediaItem[];
  className?: string;
}

// The Tivoli hero images
const defaultMedia: MediaItem[] = [
  {
    id: 'img-1',
    type: 'image',
    url: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//The%20Tivoli%20facade%20hero2.png',
    title: 'Hotel Facade',
    description: 'The magnificent facade of The Tivoli'
  },
  {
    id: 'img-2', 
    type: 'image',
    url: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//The%20Tivoli%20Main%20Gate%20Hero-3.png',
    title: 'Main Gate',
    description: 'Grand entrance to The Tivoli'
  },
  {
    id: 'img-3',
    type: 'image', 
    url: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//The%20Tivoli%20Pool%20Hero6.png',
    title: 'Swimming Pool',
    description: 'Luxurious poolside area for relaxation'
  },
  {
    id: 'img-4',
    type: 'image',
    url: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//The%20Tivoli%20Porch%20Hero-1.png', 
    title: 'Hotel Porch',
    description: 'Elegant porch area overlooking the gardens'
  },
  {
    id: 'img-5',
    type: 'image',
    url: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//The%20Tivoli-Lobby%20hero-5.png',
    title: 'Hotel Lobby',
    description: 'Sophisticated lobby with luxury interiors'
  }
];

export const GallerySection: React.FC<GallerySectionProps> = memo(({
  images = [],
  videos = [],
  className = '',
}) => {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Combine all media items
  const allMedia = [...images, ...videos];
  const mediaToShow = allMedia.length > 0 ? allMedia : defaultMedia;

  const openLightbox = (media: MediaItem, index: number) => {
    setSelectedMedia(media);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedMedia(null);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : mediaToShow.length - 1;
    setCurrentIndex(newIndex);
    setSelectedMedia(mediaToShow[newIndex]);
  };

  const goToNext = () => {
    const newIndex = currentIndex < mediaToShow.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    setSelectedMedia(mediaToShow[newIndex]);
  };

  return (
    <section className={`space-y-8 ${className}`}>
      <div className="text-center">
        <h2 className="font-serif text-3xl text-neutral-800 mb-4">Gallery</h2>
        <p className="text-neutral-600 leading-relaxed max-w-2xl mx-auto">
          Explore our exquisite spaces, luxury accommodations, and world-class amenities through our curated collection of images and videos
        </p>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mediaToShow.map((media, index) => (
          <div
            key={media.id}
            className="group relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => openLightbox(media, index)}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              {media.type === 'image' ? (
                <SmartImage
                  src={media.url}
                  alt={media.title || 'Gallery image'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  lazy={true}
                  placeholder="blur"
                  aspectRatio={4/3} // Match the aspect-[4/3] container
                  optimize={{
                    width: 400,
                    height: 300,
                    quality: 85,
                    format: 'webp'
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center relative">
                  <div className="text-center">
                    <Video className="w-12 h-12 text-neutral-400 mx-auto mb-2" />
                    <p className="text-sm text-neutral-500">Video Placeholder</p>
                    <p className="text-xs text-neutral-400">{media.title}</p>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 rounded-full p-3 group-hover:bg-[#CD9F59] group-hover:text-white transition-colors duration-200">
                      <Play className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Media Type Badge */}
              <div className="absolute top-3 left-3">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  media.type === 'video' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {media.type === 'video' ? (
                    <>
                      <Video className="w-3 h-3 mr-1" />
                      Video
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-3 h-3 mr-1" />
                      Photo
                    </>
                  )}
                </span>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
            </div>

            {/* Media Info */}
            <div className="p-4">
              <h3 className="font-medium text-neutral-800 mb-1">{media.title}</h3>
              <p className="text-sm text-neutral-600">{media.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 rounded-full p-2 text-white transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 rounded-full p-2 text-white transition-colors duration-200"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 rounded-full p-2 text-white transition-colors duration-200"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Media Content */}
            <div className="bg-white rounded-lg overflow-hidden">
              {selectedMedia.type === 'image' ? (
                <SmartImage
                  src={selectedMedia.url}
                  alt={selectedMedia.title || 'Gallery image'}
                  className="w-full aspect-[16/9] object-cover"
                  optimize={{
                    width: 1200,
                    height: 675,
                    quality: 95,
                    format: 'webp'
                  }}
                />
              ) : (
                <div className="aspect-[16/9] bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center">
                  <div className="text-center">
                    <Video className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-neutral-600 mb-2">{selectedMedia.title}</h3>
                    <p className="text-neutral-500">{selectedMedia.description}</p>
                    <p className="text-sm text-neutral-400 mt-2">Video player will be embedded here</p>
                  </div>
                </div>
              )}
              
              {/* Media Info */}
              <div className="p-6 border-t border-neutral-200">
                <h3 className="font-serif text-xl text-neutral-800 mb-2">{selectedMedia.title}</h3>
                <p className="text-neutral-600">{selectedMedia.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
});

GallerySection.displayName = 'GallerySection';

export default GallerySection;