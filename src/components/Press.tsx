import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const pressReleases = [
  {
    id: '1',
    title: 'Tivoli Hotels Announces Expansion into Southeast Asia',
    publication: 'Hospitality Today',
    date: 'March 15, 2024',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80',
    excerpt: 'Luxury hotel chain Tivoli Hotels & Resorts reveals ambitious expansion plans across major Southeast Asian destinations.',
    link: '#'
  },
  {
    id: '2',
    title: 'Sustainable Luxury: Tivoli\'s Green Initiative',
    publication: 'Forbes',
    date: 'February 28, 2024',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80',
    excerpt: 'Leading the way in sustainable luxury hospitality, Tivoli Hotels implements groundbreaking environmental practices.',
    link: '#'
  },
  {
    id: '3',
    title: 'The Future of Luxury Hospitality',
    publication: 'Bloomberg',
    date: 'January 20, 2024',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80',
    excerpt: 'Interview with Tivoli\'s CEO on the evolving landscape of luxury hospitality and future industry trends.',
    link: '#'
  }
];

export default function Press() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
            In the News
          </span>
          <h2 className="font-serif text-3xl md:text-4xl mb-3 text-neutral-600">
            Latest Press Coverage
          </h2>
          <p className="elegant-text text-sm md:text-base">
            Discover the latest news and updates from Tivoli Hotels & Resorts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {pressReleases.map((press) => (
            <div 
              key={press.id}
              className="group cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden mb-2 md:mb-3 rounded-lg shadow-lg aspect-[4/3]">
                <img
                  src={press.image}
                  alt={press.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                
                {/* Publication Badge */}
                <div className="absolute top-2 left-2">
                  <span className="bg-white/95 text-neutral-900 px-2 md:px-3 py-1 rounded-lg text-xs font-sans">
                    {press.publication}
                  </span>
                </div>
                
                {/* Date Badge */}
                <div className="absolute top-2 right-2">
                  <span className="bg-[#CD9F59] text-white px-2 md:px-3 py-1 rounded-lg text-xs font-sans">
                    {press.date}
                  </span>
                </div>
              </div>
              
              {/* Content */}
              <div className="space-y-2 md:space-y-3">
                <h3 className="font-serif text-base md:text-lg text-neutral-800 group-hover:text-[#CD9F59] transition-colors line-clamp-2">
                  {press.title}
                </h3>
                <p className="elegant-text text-xs md:text-sm line-clamp-2">
                  {press.excerpt}
                </p>
                <a 
                  href={press.link}
                  className="inline-flex items-center text-[#CD9F59] hover:text-[#B88D47] transition-colors font-sans text-xs uppercase tracking-wider"
                >
                  Read Full Article
                  <ArrowUpRight className="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View All Press Button */}
        <div className="text-center mt-6 md:mt-10">
          <button className="px-6 py-2 bg-[#CD9F59] text-white rounded-lg hover:bg-[#B88D47] transition-colors text-xs uppercase tracking-wider font-sans">
            View All Press Releases
          </button>
        </div>
      </div>
    </section>
  );
}