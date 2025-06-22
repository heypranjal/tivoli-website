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
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  hotelName,
  description,
  location,
  additionalDescription,
  quickStats,
  className = '',
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