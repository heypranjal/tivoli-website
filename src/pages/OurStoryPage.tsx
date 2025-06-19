import React from 'react';

export default function OurStory() {
  return (
    <section className="pt-20 pb-10 md:pt-24 md:pb-14 relative">
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
                src="https://i.ibb.co/PzrfHT9j/Screenshot-2025-06-10-at-5-09-45-PM.png"
                alt="Mr. R.R. Gupta with his sons Puneet Gupta and Rohit Gupta"
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
                Founded in 1931
              </span>
            </div>
            <h2 className="font-serif text-2xl md:text-4xl leading-tight font-medium tracking-wide mb-4 md:mb-6 text-neutral-600 text-center lg:text-left">
              A Legacy Born from Vision <br />& Entrepreneurial Spirit
            </h2>
            <div className="space-y-3 md:space-y-4">
              <p className="font-light text-neutral-600 leading-relaxed text-sm md:text-base text-justify">
                What began as the brainchild of the young and ambitious entrepreneur Mr. Balak Ram Gupta decades ago 
                has evolved into a hospitality empire. Founded in 1931, Tivoli Hospitality Group was established to 
                deliver a world of comfort, luxury and elegance that would set new standards in the industry.
              </p>
              <p className="font-light text-neutral-600 leading-relaxed text-sm md:text-base text-justify">
                As the wheels of time rolled, the reins passed into the hands of the newer generation that owns the 
                vivacity, dedication and intellect of three dynamic personalities - Mr. R.R. Gupta (Chairman), 
                Mr. Puneet Gupta and Mr. Rohit Gupta. Under their visionary leadership, Tivoli has transformed from 
                a single property into a distinguished hospitality group.
              </p>
              <p className="font-light text-neutral-600 leading-relaxed text-sm md:text-base text-justify">
                Over the past decades, Tivoli has established itself as the most happening place in town for Parties, 
                Weddings, MICE (Meetings, Incentives, Conferencing, Exhibits) Events and Family Celebrations alike. 
                This success is a result of our group's uncompromising dedication towards providing the best of decor, 
                catering, lodging and banqueting services at various different scales.
              </p>
              <p className="font-light text-neutral-600 leading-relaxed text-sm md:text-base text-justify">
                Following Mr. Balak Ram's tradition of flawless hospitality, Mr. RR Gupta and his sons Mr. Puneet Gupta 
                & Mr. Rohit Gupta have led Tivoli to being one of the most well-recognized and respected Hospitality 
                Groups in the country, carrying forward a legacy that spans over nine decades of excellence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}