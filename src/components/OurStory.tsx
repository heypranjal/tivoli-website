import React from 'react';
import { getOurStoryImage } from '@/utils/image-catalog';

export default function OurStory() {
  return (
    <section className="py-10 md:py-14 relative">
      {/* Elegant Decorative Elements */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#CD9F59]/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#CD9F59]/30 to-transparent" />
      <div className="absolute left-0 inset-y-0 w-px bg-gradient-to-b from-transparent via-[#CD9F59]/30 to-transparent" />
      <div className="absolute right-0 inset-y-0 w-px bg-gradient-to-b from-transparent via-[#CD9F59]/30 to-transparent" />
      
      {/* Corner Accents */}
      <div className="absolute top-4 left-4 w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#CD9F59] to-transparent" />
        <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-[#CD9F59] to-transparent" />
      </div>
      <div className="absolute top-4 right-4 w-16 h-16">
        <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-[#CD9F59] to-transparent" />
        <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-[#CD9F59] to-transparent" />
      </div>
      <div className="absolute bottom-4 left-4 w-16 h-16">
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#CD9F59] to-transparent" />
        <div className="absolute bottom-0 left-0 w-[1px] h-full bg-gradient-to-t from-[#CD9F59] to-transparent" />
      </div>
      <div className="absolute bottom-4 right-4 w-16 h-16">
        <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-[#CD9F59] to-transparent" />
        <div className="absolute bottom-0 right-0 w-[1px] h-full bg-gradient-to-t from-[#CD9F59] to-transparent" />
      </div>

      <div className="container mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Image Container */}
          <div className="relative max-w-[480px] mx-auto h-[400px] md:h-[550px]">
            <div className="relative h-full overflow-hidden md:rounded-[80px_15px_80px_15px] rounded-full">
              <img
                src={getOurStoryImage()}
                alt="Luxury Hotel Interior"
                className="w-full h-full object-cover"
              />
              {/* Golden Border Overlay */}
              <div className="absolute inset-0 border-[8px] border-[#CD9F59]/30 md:rounded-[80px_15px_80px_15px] rounded-full" />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-60 h-60 border-[8px] border-[#CD9F59]/10 md:rounded-[60px_12px_60px_12px] rounded-full -z-10 hidden md:block" />
            <div className="absolute -bottom-6 -left-6 w-60 h-60 border-[8px] border-[#CD9F59]/10 md:rounded-[60px_12px_60px_12px] rounded-full -z-10 hidden md:block" />
            {/* Mobile Decorative Elements */}
            <div className="absolute -inset-3 border-[8px] border-[#CD9F59]/10 rounded-full -z-10 md:hidden" />
            <div className="absolute -inset-6 border-[8px] border-[#CD9F59]/5 rounded-full -z-10 md:hidden" />
          </div>

          {/* Content */}
          <div className="lg:pl-12 mt-2 lg:mt-0">
            <div className="mb-6 text-center lg:text-left">
              <span className="text-sm uppercase tracking-[0.2em] text-[#CD9F59] font-sans">
                The Tivoli Experience
              </span>
            </div>
            <h2 className="font-serif text-2xl md:text-4xl leading-tight font-medium tracking-wide mb-4 md:mb-6 text-neutral-600 text-center lg:text-left">
              A Legacy of Luxury <br />& Timeless Elegance
            </h2>
            <div className="space-y-3 md:space-y-4">
              <p className="font-light text-neutral-600 leading-relaxed text-sm md:text-base text-justify">
                Since our founding in 1988, Tivoli Hotels & Resorts has set the standard for luxury hospitality. 
                What began as a single property has blossomed into a collection of extraordinary destinations, 
                each embodying our commitment to unparalleled service and timeless elegance.
              </p>
              <p className="font-light text-neutral-600 leading-relaxed text-sm md:text-base text-justify">
                Our philosophy is rooted in the art of gracious hospitality, where every detail is crafted to 
                create memorable experiences. From the architectural grandeur of our properties to the 
                personalized attention we provide each guest, we strive to exceed expectations at every turn.
              </p>
              <p className="font-light text-neutral-600 leading-relaxed text-sm md:text-base text-justify">
                Today, the Tivoli brand stands as a symbol of luxury across the globe, with properties in 
                the world's most coveted destinations. Each hotel and resort in our collection tells its own 
                unique story while maintaining the exceptional standards that define the Tivoli experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}