/**
 * Virtual Tour Section Component
 * Interactive 3D tour integration for hotel exploration
 */

import React from 'react';
import { Play, ExternalLink } from 'lucide-react';

interface VirtualTourSectionProps {
  hotelName: string;
  tourUrl: string;
  thumbnailImage: string;
  provider?: 'spalba' | 'matterport';
  className?: string;
}

export const VirtualTourSection: React.FC<VirtualTourSectionProps> = ({
  hotelName,
  tourUrl,
  thumbnailImage,
  provider = 'spalba',
  className = '',
}) => {
  const handleTourClick = () => {
    window.open(tourUrl, '_blank', 'noopener,noreferrer');
  };

  const providerName = provider === 'spalba' ? 'Spalba' : 'Matterport';

  return (
    <section className={`space-y-8 ${className}`}>
      <div className="text-center">
        <h2 className="font-serif text-3xl text-neutral-800 mb-4">Experience the Space</h2>
        <p className="text-neutral-600 leading-relaxed max-w-2xl mx-auto">
          Take a comprehensive virtual tour of {hotelName} and explore every corner of our magnificent property 
          through our interactive 3D experience.
        </p>
      </div>

      <div className="bg-gradient-to-br from-[#CD9F59]/5 to-[#CD9F59]/10 rounded-2xl p-8">
        <div 
          className="aspect-video bg-white rounded-xl overflow-hidden shadow-xl cursor-pointer group relative"
          onClick={handleTourClick}
        >
          {/* Preview Image */}
          <div 
            className="w-full h-full bg-cover bg-center relative"
            style={{
              backgroundImage: `url("${thumbnailImage}")`
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30"></div>
            
            {/* Hotel Title */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
              <h3 className="text-white text-2xl md:text-3xl font-serif text-center">{hotelName}</h3>
            </div>
            
            {/* Play Button and Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="bg-white/90 rounded-full p-4 md:p-6 group-hover:bg-white transition-colors duration-300 mb-4">
                <Play className="w-8 h-8 md:w-12 md:h-12 text-neutral-800 ml-1" />
              </div>
              <p className="text-white font-medium text-lg">Explore 3D Space</p>
              <div className="flex items-center text-white/80 text-sm mt-2">
                <ExternalLink className="w-4 h-4 mr-1" />
                <span>Opens in new window</span>
              </div>
            </div>
            
            {/* Provider Branding */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center space-x-2 text-white/80 text-sm">
                <span>POWERED BY</span>
                <div className="bg-white/20 px-2 py-1 rounded text-xs font-medium">
                  {providerName}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-neutral-600 mb-4">
            Take an immersive virtual tour of our magnificent property and discover every stunning detail
          </p>
          <button
            onClick={handleTourClick}
            className="inline-flex items-center px-6 py-3 bg-[#CD9F59] text-white rounded-lg hover:bg-[#CD9F59]/90 transition-colors duration-200"
          >
            <Play className="w-5 h-5 mr-2" />
            Start Virtual Tour
            <ExternalLink className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default VirtualTourSection;