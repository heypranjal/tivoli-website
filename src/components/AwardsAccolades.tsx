import React from 'react';

const awards = [
  {
    id: '1',
    name: 'World Luxury Hotel Awards',
    category: 'Best Luxury Hotel Brand',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1579975096649-e773152b04cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'Recognized for exceptional luxury hospitality across our global portfolio'
  },
  {
    id: '2',
    name: 'Forbes Travel Guide',
    category: 'Five-Star Rating',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'Awarded to multiple Tivoli properties for outstanding service excellence'
  },
  {
    id: '3',
    name: 'Condé Nast Traveler',
    category: "Readers' Choice Awards",
    year: '2023',
    image: 'https://images.unsplash.com/photo-1565728744382-61accd4aa148?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'Voted among the top 50 hotel brands worldwide'
  },
  {
    id: '4',
    name: 'Travel + Leisure',
    category: "World's Best Awards",
    year: '2023',
    image: 'https://images.unsplash.com/photo-1586105449897-20b5efeb3233?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'Recognized for exceptional guest experiences and service standards'
  }
];

export default function AwardsAccolades() {
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
            Recognition of Excellence
          </span>
          <h2 className="font-serif text-3xl md:text-4xl mb-3 text-neutral-600">
            Awards & Accolades
          </h2>
          <p className="elegant-text text-sm md:text-base">
            Our commitment to excellence has been recognized by the most prestigious institutions in hospitality
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {awards.map((award) => {
            const IconComponent = award.icon;
            return (
              <div 
                key={award.id} 
                className="group bg-white p-4 md:p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618221469555-7f3ad97540d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80')] opacity-[0.02]" />
                
                {/* Content */}
                <div className="relative">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-[#CD9F59] overflow-hidden">
                        <img
                          src={award.image}
                          alt={award.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    </div>
                    <div className="text-center md:text-left">
                      <div className="flex flex-col md:flex-row items-center md:items-center gap-1 md:gap-2 mb-1 md:mb-2">
                        <h3 className="font-serif text-base md:text-lg text-neutral-800">
                          {award.name}
                        </h3>
                        <span className="text-xs text-[#CD9F59] font-sans">
                          {award.year}
                        </span>
                      </div>
                      <p className="text-sm md:text-base font-serif text-[#CD9F59] mb-1 md:mb-2">
                        {award.category}
                      </p>
                      <p className="elegant-text text-xs md:text-sm">
                        {award.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}