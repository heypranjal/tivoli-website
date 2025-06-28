import React from 'react';

const culinaryImages = [
  {
    id: '1',
    image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoli-dining-photo//food-3.png',
    title: 'Exquisite Appetizers',
    description: 'Artfully crafted starters that awaken your palate'
  },
  {
    id: '2',
    image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoli-dining-photo//food-1.png',
    title: 'Gourmet Mains',
    description: 'Masterfully prepared dishes from around the world'
  },
  {
    id: '3',
    image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoli-dining-photo//food-4.png',
    title: 'Local Delicacies',
    description: 'Authentic regional flavors with a contemporary twist'
  },
  {
    id: '4',
    image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoli-dining-photo//food-5.png',
    title: 'Decadent Desserts',
    description: 'Sweet creations that are works of art'
  },
  {
    id: '5',
    image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/experience//cocktail.png',
    title: 'Fine Beverages',
    description: 'Curated selection of wines and artisanal drinks'
  },
  {
    id: '6',
    image: 'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/tivoli-dining-photo//food-2.png',
    title: 'Chef\'s Specials',
    description: 'Signature dishes that define our culinary excellence'
  }
];

export default function CulinaryDelight() {
  return (
    <section className="py-6 md:py-12 relative">
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
            Gastronomic Excellence
          </span>
          <h2 className="font-serif text-3xl md:text-4xl mb-3 text-neutral-600">
            Culinary Delight
          </h2>
          <p className="elegant-text text-sm md:text-base">
            Embark on a culinary journey where every dish tells a story of passion, tradition, and innovation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {culinaryImages.map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg shadow-lg mb-2 md:mb-3 aspect-[4/5]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 transition-opacity duration-700 group-hover:opacity-0" />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/50">
                  <div className="px-3 md:px-6 py-3 md:py-4 mx-3 md:mx-4 text-center">
                    <p className="text-white font-light leading-relaxed text-sm">
                      {item.description}
                    </p>
                    <button className="mt-3 md:mt-4 px-4 md:px-6 py-1.5 md:py-2 bg-[#CD9F59] text-white text-xs uppercase tracking-wider hover:bg-[#B88D47] transition-colors rounded-lg">
                      View Menu
                    </button>
                  </div>
                </div>
              </div>
              
              <h3 className="font-serif text-base md:text-lg text-neutral-600 mb-1 group-hover:text-[#CD9F59] transition-colors text-center">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}