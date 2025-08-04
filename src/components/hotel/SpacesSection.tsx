/**
 * Spaces Section Component
 * Displays event spaces and venues with capacity and features
 */

import React from 'react';
import { Users, Calendar, MapPin } from 'lucide-react';

interface Space {
  id: string;
  name: string;
  capacity: number | string | { min: number; max: number };
  area: string;
  image: string;
  features: string[];
  description?: string;
}

interface SpacesSectionProps {
  spaces: Space[];
  className?: string;
}

export const SpacesSection: React.FC<SpacesSectionProps> = ({
  spaces,
  className = '',
}) => {
  if (!spaces || spaces.length === 0) {
    return null;
  }

  return (
    <section className={`space-y-8 ${className}`}>
      <div className="text-center">
        <h2 className="font-serif text-3xl text-neutral-800 mb-4">Event Spaces</h2>
        <p className="text-neutral-600 leading-relaxed max-w-2xl mx-auto">
          Discover our exceptional venues designed to host memorable events of every scale
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {spaces.map((space) => (
          <div key={space.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="relative">
              <img
                src={space.image}
                alt={space.name}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full">
                <span className="text-xs font-medium flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  Capacity {typeof space.capacity === 'object' && 'min' in space.capacity 
                    ? `${space.capacity.min}-${space.capacity.max}` 
                    : space.capacity}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="font-serif text-xl text-neutral-800 mb-2">{space.name}</h3>
              
              {/* Area Information */}
              <div className="flex items-center text-sm text-neutral-600 mb-3">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{space.area}</span>
              </div>

              {/* Description if available */}
              {space.description && (
                <p className="text-sm text-neutral-600 mb-4 line-clamp-2">{space.description}</p>
              )}
              
              {/* Features */}
              <ul className="space-y-2 text-sm text-neutral-600">
                {space.features.slice(0, 4).map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-[#CD9F59]">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
                {space.features.length > 4 && (
                  <li className="text-xs text-neutral-500 italic">
                    +{space.features.length - 4} more features
                  </li>
                )}
              </ul>
            </div>
            
            <div className="px-6 pb-6">
              <button className="w-full py-2 px-4 bg-gradient-to-r from-[#CD9F59] to-[#CD9F59]/80 text-white rounded-lg hover:from-[#CD9F59]/90 hover:to-[#CD9F59]/70 transition-all duration-200 text-sm font-medium">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SpacesSection;