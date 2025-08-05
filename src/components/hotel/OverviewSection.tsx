/**
 * Overview Section Component
 * Hotel description with quick statistics and key information
 */

import React from 'react';
import { Building, Utensils, Users, Clock } from 'lucide-react';

interface QuickStats {
  rooms: number;
  diningVenues: number;
  eventCapacity: number;
  conciergeHours: string;
}

interface OverviewSectionProps {
  hotelName: string;
  description: string;
  location: string;
  additionalDescription?: string;
  quickStats: QuickStats;
  className?: string;
  showHeritageVideo?: boolean;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  hotelName,
  description,
  location,
  additionalDescription,
  quickStats,
  className = '',
  showHeritageVideo = false,
}) => {
  return (
    <section className={`space-y-8 ${className}`}>
      <div>
        <h2 className="font-serif text-3xl text-neutral-800 mb-4">About {hotelName}</h2>
        <p className="text-neutral-600 leading-relaxed text-lg mb-6">
          {description}
        </p>
        {additionalDescription && (
          <p className="text-neutral-600 leading-relaxed">
            {additionalDescription}
          </p>
        )}
      </div>

      {/* Heritage Palace Video - Only for Heritage Palace */}
      {showHeritageVideo && (
        <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl p-6 md:p-8">
          <div className="text-center mb-6">
            <h3 className="font-serif text-2xl text-neutral-800 mb-2">Experience Our Heritage</h3>
            <p className="text-neutral-600">Take a virtual journey through the grandeur of Tivoli Heritage Palace</p>
          </div>
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src="https://drive.google.com/file/d/142SzKIYHlPjkWiXwLLnAAJG3Mk30csd8/preview"
              className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Tivoli Heritage Palace - Virtual Experience"
            />
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center group">
          <div className="bg-[#CD9F59]/5 rounded-lg p-4 mb-3 group-hover:bg-[#CD9F59]/10 transition-colors duration-200">
            <Building className="w-5 h-5 text-[#CD9F59] mx-auto" />
          </div>
          <div className="font-serif text-2xl text-[#CD9F59] mb-1">{quickStats.rooms}</div>
          <div className="text-sm text-neutral-600">Rooms</div>
        </div>
        
        <div className="text-center group">
          <div className="bg-[#CD9F59]/5 rounded-lg p-4 mb-3 group-hover:bg-[#CD9F59]/10 transition-colors duration-200">
            <Utensils className="w-5 h-5 text-[#CD9F59] mx-auto" />
          </div>
          <div className="font-serif text-2xl text-[#CD9F59] mb-1">{quickStats.diningVenues}</div>
          <div className="text-sm text-neutral-600">Dining Venues</div>
        </div>
        
        <div className="text-center group">
          <div className="bg-[#CD9F59]/5 rounded-lg p-4 mb-3 group-hover:bg-[#CD9F59]/10 transition-colors duration-200">
            <Users className="w-5 h-5 text-[#CD9F59] mx-auto" />
          </div>
          <div className="font-serif text-2xl text-[#CD9F59] mb-1">{quickStats.eventCapacity.toLocaleString()}</div>
          <div className="text-sm text-neutral-600">Event Capacity</div>
        </div>
        
        <div className="text-center group">
          <div className="bg-[#CD9F59]/5 rounded-lg p-4 mb-3 group-hover:bg-[#CD9F59]/10 transition-colors duration-200">
            <Clock className="w-5 h-5 text-[#CD9F59] mx-auto" />
          </div>
          <div className="font-serif text-2xl text-[#CD9F59] mb-1">{quickStats.conciergeHours}</div>
          <div className="text-sm text-neutral-600">Concierge Service</div>
        </div>
      </div>

    </section>
  );
};

export default OverviewSection;