/**
 * Wedcation Ambala Press Component
 * Hotel-specific press coverage section displaying media coverage for Wedcation by Tivoli Ambala
 * Features: Luxury styling, responsive design, hover effects, optimized image loading
 */

import React from 'react';
import { ArrowUpRight, Newspaper } from 'lucide-react';
import { SmartImage } from '@/components/ui/SmartImage';

interface PressItem {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  publication: string;
  date: string;
}

const pressItems: PressItem[] = [
  {
    id: '1',
    title: 'Wedcation by Tivoli Ambala - Premier Wedding Destination',
    excerpt: 'Discover the luxury wedding venue that combines elegance with exceptional service in the heart of Ambala',
    image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//Ambalapress-2.jpeg',
    publication: 'Wedding Today',
    date: 'Recent'
  },
  {
    id: '2',
    title: 'Tivoli Ambala Sets New Standards in Wedding Hospitality',
    excerpt: 'Experience world-class wedding venues and comprehensive wedding planning services at this premier destination',
    image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//Ambalapress-1.jpeg',
    publication: 'Luxury Weddings',
    date: 'Recent'
  }
];

const WedcationAmbalaPress: React.FC = () => {
  return (
    <section className="py-8 md:py-12 bg-gradient-to-br from-[#FEFEFE] to-[#F8F9FA] relative">
      {/* Decorative Elements */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#CD9F59]/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#CD9F59]/30 to-transparent" />
      
      <div className="container mx-auto px-4 md:px-16">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 md:mb-10">
            {/* Decorative Lines */}
            <div className="flex items-center justify-center mb-4 md:mb-6">
              <div className="w-12 h-[1px] bg-[#CD9F59]" />
              <div className="w-2 h-2 rotate-45 border border-[#CD9F59] mx-3" />
              <div className="w-12 h-[1px] bg-[#CD9F59]" />
            </div>
            
            <div className="flex items-center justify-center mb-3">
              <Newspaper className="w-5 h-5 text-[#CD9F59] mr-2" />
              <span className="text-sm uppercase tracking-[0.2em] text-[#CD9F59] font-sans font-medium">
                Featured In The Press
              </span>
            </div>
            
            <h2 className="elegant-heading text-3xl md:text-4xl mb-4 text-neutral-800">
              Media Recognition
            </h2>
            <p className="elegant-text text-base md:text-lg max-w-2xl mx-auto">
              Discover how leading media outlets recognize Wedcation by Tivoli Ambala as 
              the premier wedding destination in Haryana
            </p>
          </div>

          {/* Press Items Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {pressItems.map((press) => (
              <div 
                key={press.id}
                className="group cursor-pointer block bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Image Container - Dynamic Height */}
                <div className="relative overflow-hidden bg-gradient-to-br from-neutral-50 to-neutral-100">
                  <SmartImage
                    src={press.image}
                    alt={press.title}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    style={{
                      maxHeight: '400px',
                      minHeight: '250px'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
                  
                  {/* Publication Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-white/95 backdrop-blur-sm text-neutral-900 px-3 py-1.5 rounded-full text-xs font-sans font-semibold shadow-lg">
                      {press.publication}
                    </span>
                  </div>
                  
                  {/* Date Badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="bg-[#CD9F59] text-white px-3 py-1.5 rounded-full text-xs font-sans font-semibold shadow-lg">
                      {press.date}
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 space-y-4">
                  <h3 className="elegant-subheading text-xl md:text-2xl text-neutral-800 group-hover:text-[#CD9F59] transition-colors duration-300 leading-tight">
                    {press.title}
                  </h3>
                  <p className="elegant-text text-sm md:text-base text-neutral-600 leading-relaxed">
                    {press.excerpt}
                  </p>
                  
                  {/* Read More Link */}
                  <div className="pt-2">
                    <span className="inline-flex items-center text-[#CD9F59] hover:text-[#B88D47] transition-colors font-sans text-sm uppercase tracking-wider font-semibold group-hover:translate-x-1 transition-transform duration-300">
                      Read Full Coverage
                      <ArrowUpRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WedcationAmbalaPress;