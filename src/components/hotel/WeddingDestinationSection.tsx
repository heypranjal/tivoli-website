/**
 * Wedding Destination Section Component
 * Showcases wedding facilities and amenities with elegant design
 */

import React from 'react';
import { Car, Waves, Utensils, ArrowRight } from 'lucide-react';
import { SmartImage } from '../ui/SmartImage';

interface WeddingDestinationSectionProps {
  hotelName?: string;
  heroImage?: string;
  className?: string;
}

export const WeddingDestinationSection: React.FC<WeddingDestinationSectionProps> = ({
  hotelName = "The Tivoli-New Delhi",
  heroImage,
  className = '',
}) => {
  // Use specific images for different hotels
  const defaultHeroImage = hotelName?.toLowerCase().includes('bijwasan')
    ? "https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivolibijwasan//Merriage%20at%20Tivoli%20Bijwasan.jpeg"
    : hotelName?.toLowerCase().includes('lotus court')
    ? "https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivolilotuscourt//lotushomeimage4.jpg"
    : hotelName?.toLowerCase().includes('royal court')
    ? "https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivolilotuscourt//Celebration%20at%20Okhla.jpeg"
    : hotelName?.toLowerCase().includes('upper hse')
    ? "https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/hsesultanpur//Corporate%20Event%20Image.jpeg"
    : hotelName?.toLowerCase().includes('wedcation') && hotelName?.toLowerCase().includes('israna')
    ? "https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/wedcationisrana//isranafrontviewfull.jpeg"
    : hotelName?.toLowerCase().includes('new delhi')
    ? "https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//The%20Tivoli%20Pool%20Hero6.png"
    : "https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoliheritagerewari//updated-mainpagephoto4.jpg";
  
  const finalHeroImage = heroImage || defaultHeroImage;
  return (
    <section className={`py-12 bg-neutral-50 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8">
            <p className="text-[#CD9F59] text-xs font-medium tracking-wider uppercase mb-2">
              {hotelName?.toLowerCase().includes('upper hse') 
                ? 'YOUR PREMIER BUSINESS DESTINATION' 
                : 'YOUR DREAM CELEBRATION DESTINATION'}
            </p>
            <h2 className="font-serif text-2xl text-neutral-800">
              {hotelName?.toLowerCase().includes('upper hse') 
                ? 'Corporate Event at' 
                : hotelName?.toLowerCase().includes('royal court') 
                ? 'Celebrations At' 
                : 'Wedding at'} {hotelName}
            </h2>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Hero Image with Capacity Info */}
            <div className="relative">
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <SmartImage
                  src={finalHeroImage}
                  alt={`${hotelName?.toLowerCase().includes('upper hse') 
                    ? 'Corporate Event' 
                    : hotelName?.toLowerCase().includes('royal court') 
                    ? 'Celebration' 
                    : 'Wedding'} venue at ${hotelName}`}
                  className="w-full h-[320px] object-cover"
                  optimize={{
                    width: 500,
                    height: 320,
                    quality: 90,
                    format: 'webp'
                  }}
                />
                
                {/* Capacity and Lawn Area Badges */}
                <div className="absolute bottom-4 left-4 flex gap-3">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
                    <p className="text-xs text-neutral-600 mb-1">Capacity</p>
                    <p className="text-[#CD9F59] font-serif text-sm font-medium">1500 PAX</p>
                  </div>
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
                    <p className="text-xs text-neutral-600 mb-1">Lawn Area</p>
                    <p className="text-[#CD9F59] font-serif text-sm font-medium">Lush Green</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Wedding Features */}
            <div className="space-y-4">
              {/* Ample Parking */}
              <div className="flex items-start space-x-3">
                <div className="bg-[#CD9F59]/10 rounded-lg p-2 flex-shrink-0">
                  <Car className="w-4 h-4 text-[#CD9F59]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-neutral-800 mb-1">Ample Parking</h3>
                  <p className="text-neutral-600 text-sm">
                    Spacious parking area for all your guests
                  </p>
                </div>
              </div>

              {/* Pool Access */}
              <div className="flex items-start space-x-3">
                <div className="bg-[#CD9F59]/10 rounded-lg p-2 flex-shrink-0">
                  <Waves className="w-4 h-4 text-[#CD9F59]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-neutral-800 mb-1">Pool Access</h3>
                  <p className="text-neutral-600 text-sm">
                    Beautiful poolside setting for events
                  </p>
                </div>
              </div>

              {/* Exquisite Cuisine */}
              <div className="flex items-start space-x-3">
                <div className="bg-[#CD9F59]/10 rounded-lg p-2 flex-shrink-0">
                  <Utensils className="w-4 h-4 text-[#CD9F59]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-neutral-800 mb-1">Exquisite Cuisine</h3>
                  <p className="text-neutral-600 text-sm">
                    Our master chefs craft personalized menus featuring both traditional delicacies and international cuisine.
                  </p>
                </div>
              </div>

              {/* Plan Your Wedding Button */}
              <div className="pt-4">
                <button 
                  onClick={() => {
                    const bookingForm = document.getElementById('venue-booking-form');
                    if (bookingForm) {
                      bookingForm.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }
                  }}
                  className="w-full bg-[#CD9F59] hover:bg-[#B88D47] text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <span>{hotelName?.toLowerCase().includes('royal court') ? 'Plan Your Celebration' : 'Plan Your Wedding'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeddingDestinationSection;