import React from 'react';
import { MapPin, Hotel } from 'lucide-react';

const upcomingHotels = [
  {
    id: '1',
    name: 'Wedcation by Tivoli-Aligarh',
    location: 'Aligarh',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    brand: 'tivoli',
    openingDate: 'Q4 2024',
    description: 'A modern architectural marvel featuring contemporary design and traditional Indian elements.'
  },
  {
    id: '2',
    name: 'Wedcation by Tivoli-Karnal',
    location: 'Greater Noida',
    image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
    brand: 'tivoli',
    openingDate: 'Q1 2025',
    description: 'Urban luxury redefined with panoramic city views and state-of-the-art amenities.'
  },
  {
    id: '3',
    name: 'Wedcation by Tivoli-Jim Corbett',
    location: 'Chandigarh',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    brand: 'omnia',
    openingDate: 'Q2 2025',
    description: 'A harmonious blend of nature and luxury in the heart of the city beautiful.'
  }
];

export default function UpcomingHotels() {
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
        <div className="max-w-3xl mx-auto text-center mb-8">
          <span className="text-sm uppercase tracking-[0.2em] text-[#CD9F59] font-sans mb-2 block">
            Coming Soon
          </span>
          <h2 className="font-serif text-3xl md:text-4xl mb-3 text-neutral-600">New & Upcoming Hotels</h2>
          <p className="elegant-text text-sm md:text-base">
            Experience the next chapter of luxury as we expand our presence across India
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
          {upcomingHotels.map((hotel) => (
            <div key={hotel.id} className="group">
              <div className="relative overflow-hidden mb-2 md:mb-3 rounded-lg shadow-lg aspect-[4/5]">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
                
                {/* Opening Date Badge */}
                <div className="absolute top-2 right-2 bg-[#CD9F59] text-white px-3 py-1 rounded-lg">
                  <span className="text-xs font-sans tracking-wider">Opening {hotel.openingDate}</span>
                </div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="px-3 md:px-5 py-3 md:py-4 bg-white/95 mx-3 md:mx-4 rounded-lg">
                    <p className="text-neutral-800 text-center font-light text-xs md:text-sm">
                      {hotel.description}
                    </p>
                  </div>
                </div>
              </div>
              
              <h3 className="font-serif text-base md:text-lg text-neutral-600 mb-1 group-hover:text-[#CD9F59] transition-colors">
                {hotel.name}
              </h3>
              <div className="flex items-center justify-between">
                <p className="elegant-text flex items-center text-xs md:text-sm">
                  <MapPin className="w-3 h-3 mr-1" />
                  {hotel.location}
                </p>
                <span className="text-xs uppercase tracking-wider text-[#CD9F59] font-sans">
                  {hotel.brand}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}