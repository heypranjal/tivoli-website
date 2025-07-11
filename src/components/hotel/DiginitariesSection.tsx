/**
 * Dignitaries Section Component
 * Showcases dignitary visits and important events at The Tivoli
 */

import React from 'react';
import { SmartImage } from '../ui/SmartImage';

interface DiginitariesSectionProps {
  hotelName?: string;
  className?: string;
}

export const DiginitariesSection: React.FC<DiginitariesSectionProps> = ({
  hotelName = "The Tivoli-New Delhi",
  className = '',
}) => {
  const dignitariesImages = [
    "https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//Dignitaries-5.png",
    "https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//Dignitaries-3.png",
    "https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//Dignitaries-1.png",
    "https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//Dignitaries-4%20(1).png",
    "https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//Dignitaries-2.png"
  ];

  return (
    <section className={`py-12 bg-white ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8">
            <p className="text-[#CD9F59] text-xs font-medium tracking-wider uppercase mb-2">
              DISTINGUISHED VISITORS
            </p>
            <h2 className="font-serif text-2xl text-neutral-800 mb-4">
              Dignitaries
            </h2>
            <p className="text-neutral-600 text-sm max-w-3xl mx-auto leading-relaxed">
              Mr. Parvesh Verma, Deputy Chief Minister visiting The Tivoli to inaugurate 21st Delhi International Open Grand Masters Chess Tournament 2025
            </p>
          </div>

          {/* Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {dignitariesImages.map((image, index) => (
              <div key={index} className="relative group">
                <div className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  <SmartImage
                    src={image}
                    alt={`Dignitary visit ${index + 1} at ${hotelName}`}
                    className="w-full h-48 object-cover"
                    optimize={{
                      width: 300,
                      height: 200,
                      quality: 85,
                      format: 'webp'
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiginitariesSection;