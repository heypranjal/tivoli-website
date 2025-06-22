/**
 * Experiences Section Component
 * Showcases curated experiences and unique offerings
 */

import React from 'react';

interface Experience {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  category: string;
}

interface ExperiencesSectionProps {
  experiences: Experience[];
  className?: string;
}

export const ExperiencesSection: React.FC<ExperiencesSectionProps> = ({
  experiences,
  className = '',
}) => {
  if (!experiences || experiences.length === 0) {
    return null;
  }

  return (
    <section className={`space-y-8 ${className}`}>
      <div className="text-center">
        <span className="text-sm uppercase tracking-[0.2em] text-[#CD9F59] font-sans mb-2 block">
          Curated Experiences
        </span>
        <h2 className="font-serif text-3xl text-neutral-800 mb-4">Discover Heritage Luxury</h2>
        <p className="text-neutral-600 leading-relaxed max-w-2xl mx-auto">
          Immerse yourself in a world of refined experiences, where every moment is crafted to perfection
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map((experience) => (
          <div key={experience.id} className="relative rounded-xl overflow-hidden group cursor-pointer transform hover:scale-105 transition-transform duration-300">
            <div className="aspect-[4/3] bg-gray-200 relative">
              <img
                src={experience.image}
                alt={experience.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              
              {/* Category Badge */}
              <div className="absolute top-4 right-4 bg-[#CD9F59]/90 text-white px-3 py-1 rounded-full">
                <span className="text-xs font-medium">{experience.category}</span>
              </div>
              
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <h3 className="text-xl font-serif mb-2 group-hover:text-[#CD9F59] transition-colors duration-200">
                  {experience.title}
                </h3>
                <p className="text-sm opacity-90 mb-2 font-medium">{experience.subtitle}</p>
                <p className="text-xs opacity-80 line-clamp-3">{experience.description}</p>
              </div>
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-[#CD9F59]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperiencesSection;