/**
 * Dining Section Component
 * Displays restaurant and dining venues with cuisine and details
 */

import React from 'react';
import { Clock, ChefHat, Wine } from 'lucide-react';
import { ImageCarousel } from '@/components/ui/ImageCarousel';

interface DiningVenue {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  hours: string;
  dressCode: string;
  image?: string;
  images?: string[];
  specialties?: string[];
}

interface DiningSectionProps {
  venues: DiningVenue[];
  className?: string;
}

export const DiningSection: React.FC<DiningSectionProps> = ({
  venues,
  className = '',
}) => {
  if (!venues || venues.length === 0) {
    return null;
  }

  return (
    <section className={`space-y-8 ${className}`}>
      <div className="text-center">
        <h2 className="font-serif text-3xl text-neutral-800 mb-4">Dining Experiences</h2>
        <p className="text-neutral-600 leading-relaxed max-w-2xl mx-auto">
          Embark on a culinary journey through our exceptional dining venues, each offering unique flavors and ambiance
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {venues.map((venue) => (
          <div key={venue.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
            <div className="relative">
              {venue.images && venue.images.length > 0 ? (
                <ImageCarousel
                  images={venue.images}
                  alt={venue.name}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
              )}
              {/* Cuisine Badge */}
              <div className="absolute top-4 left-4 bg-[#CD9F59]/90 text-white px-3 py-1 rounded-full z-10">
                <span className="text-xs font-medium flex items-center">
                  <ChefHat className="w-3 h-3 mr-1" />
                  {venue.cuisine}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-serif text-xl text-neutral-800 mb-3">{venue.name}</h3>
              
              <p className="text-sm text-neutral-600 mb-4 line-clamp-3">{venue.description}</p>
              
              <div className="mb-3">
                {/* Hours */}
                <div className="flex items-start">
                  <Clock className="w-4 h-4 mr-2 mt-0.5 text-neutral-500" />
                  <div>
                    <h4 className="font-medium text-neutral-800 text-sm">Hours:</h4>
                    <p className="text-sm text-neutral-600">{venue.hours}</p>
                  </div>
                </div>
              </div>

              {/* Specialties */}
              {venue.specialties && venue.specialties.length > 0 && (
                <div className="mb-2">
                  <h4 className="font-medium text-neutral-800 text-sm mb-2">Specialties:</h4>
                  <div className="flex flex-wrap gap-1">
                    {venue.specialties.slice(0, 3).map((specialty, index) => (
                      <span
                        key={index}
                        className="bg-neutral-100 text-neutral-700 px-2 py-1 rounded text-xs"
                      >
                        {specialty}
                      </span>
                    ))}
                    {venue.specialties.length > 3 && (
                      <span className="text-xs text-neutral-500 px-2 py-1">
                        +{venue.specialties.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="px-6 pb-4">
              <button className="w-full py-2 px-4 bg-gradient-to-r from-[#CD9F59] to-[#CD9F59]/80 text-white rounded-lg hover:from-[#CD9F59]/90 hover:to-[#CD9F59]/70 transition-all duration-200 text-sm font-medium">
                View Menu
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DiningSection;