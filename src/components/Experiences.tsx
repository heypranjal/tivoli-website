import React from 'react';
import { Heart, Crown, Coffee, Users, Utensils, BellRing as Ring } from 'lucide-react';
import { getExperienceImages, homepageImages } from '@/utils/image-catalog';

const experienceImageUrls = getExperienceImages();

const experiences = [
  {
    id: '1',
    name: 'Weddings & Celebrations',
    description: 'Extravagant ceremonies, custom catering, private ballrooms, and impeccable wedding coordination.',
    image: experienceImageUrls[0], // wedding.jpg
    icon: Coffee
  },
  {
    id: '2',
    name: 'Corporate Events',
    description: 'Corporate Events personalised boardroom, Cutting edge Technology, impeccable hospitality elevates business gatherings.',
    image: experienceImageUrls[1], // corporate-hp.jpg
    icon: Heart
  },
  {
    id: '3',
    name: 'Fine Dining',
    description: 'Fine Dining Masterful chefs craft regional delicacies with international flair, royal service ensured.',
    image: experienceImageUrls[2], // foodblue_thetivoli.jpg
    icon: Crown
  },
  {
    id: '4',
    name: ' Luxurious Stays',
    description: 'Luxurious Stays Silk-adorned suites, personal butlers, and heritage-inspired décor create unforgettable memories.',
    image: experienceImageUrls[3], // Luxurious-stays.jpg
    icon: Users
  },
  {
    id: '5',
    name: 'Cocktail Parties',
    description: 'Cocktail Parties Artisanal mixologists blend rare spirits with Indian spices, creating magical evenings.',
    image: experienceImageUrls[4], // cocktail-aprty.jpg
    icon: Utensils
  },
  {
    id: '6',
    name: 'Wellness & Spa',
    description: 'Wellness & Spa Ancient Ayurvedic rituals blend with modern therapies, rejuvenating body and soul.',
    image: experienceImageUrls[5], // spa.jpg
    icon: Ring
  }
];

export default function Experiences() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="py-6 md:py-12 bg-neutral-50 relative">
      {/* Decorative Elements */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#CD9F59]/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#CD9F59]/30 to-transparent" />
      
      <div className="container mx-auto px-4 md:px-12">
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-10">
          {/* Decorative Lines */}
          <div className="flex items-center justify-center mb-4 md:mb-6">
            <div className="w-12 h-[1px] bg-[#CD9F59]" />
            <div className="w-2 h-2 rotate-45 border border-[#CD9F59] mx-3" />
            <div className="w-12 h-[1px] bg-[#CD9F59]" />
          </div>
          
          <span className="text-sm uppercase tracking-[0.2em] text-[#CD9F59] font-sans mb-2 block">
            Curated for You
          </span>
          <h2 className="font-serif text-3xl md:text-4xl mb-3 text-neutral-600">
            Unforgettable Experiences.<br />Unmatched Curations.
          </h2>
          <p className="elegant-text text-sm md:text-base">
            Discover our collection of bespoke experiences designed to create lasting memories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {experiences.map((experience) => {
            const IconComponent = experience.icon;
            return (
              <div key={experience.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg shadow-lg mb-2 md:mb-3 aspect-[4/5]">
                  <img
                    src={experience.image}
                    alt={experience.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 transition-opacity duration-700 group-hover:opacity-0" />
                  
                  {/* Icon Overlay */}
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/90 flex items-center justify-center">
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/50">
                    <div className="px-3 md:px-6 py-3 md:py-4 mx-3 md:mx-4 text-center">
                      <p className="text-white font-light leading-relaxed text-sm">
                        {experience.description}
                      </p>
                      <button className="mt-3 md:mt-4 px-4 md:px-6 py-1.5 md:py-2 bg-[#CD9F59] text-white text-xs uppercase tracking-wider hover:bg-[#B88D47] transition-colors rounded-lg">
                        Discover More
                      </button>
                    </div>
                  </div>
                </div>
                
                <h3 className="font-serif text-base md:text-lg text-neutral-600 mb-1 group-hover:text-[#CD9F59] transition-colors text-center">
                  {experience.name}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}