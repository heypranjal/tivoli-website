/**
 * RoyalcourtokhlaPage Component
 * Displays detailed information about Tivoli Royal Court-Okhla
 * Features:
 * - Comprehensive hotel information display
 * - Image gallery with main and secondary images
 * - Amenities and features showcase
 * - Dining section with restaurant details
 * - Location and contact information
 * - Booking widget integration
 */
import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { MapPin, Phone, Mail, Star, Users, Calendar, Share2, Heart, Signal, School, Dumbbell, Utensils, Car, Wine, Space, Coffee, ChevronLeft, ChevronRight, Flame, Wind, Music, Tv, Armchair as Wheelchair, Sprout, Clock } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { hotels } from '@/data/hotels';
import VenueBookingForm from '@/components/VenueBookingForm';
import HotelBookingWidget from '@/components/HotelBookingWidget';

const amenityIcons = {
  Signal,
  Wifi: Signal,
  Pool: School,
  School,
  Dumbbell,
  Utensils,
  Car,
  Wine,
  Spa: Space,
  Space,
  Coffee
};

export default function RoyalcourtokhlaPage() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const checkLayout = () => {
      setIsMobile(window.innerWidth < 768);
      setIsPortrait(window.innerHeight > window.innerWidth);
    };
    checkLayout();
    window.addEventListener('resize', checkLayout);
    return () => window.removeEventListener('resize', checkLayout);
  }, []);

  // Find hotel by slug
  const hotel = hotels.find(h => h.slug === 'royal-court-okhla');

  // Debug logging
  console.log('Hotels array length:', hotels.length);
  console.log('Looking for hotel with slug: royal-court-okhla');
  console.log('Found hotel:', hotel);
  console.log('All hotel slugs:', hotels.map(h => h.slug));

  // If no hotel found, redirect to home
  if (!hotel) {
    console.error('Hotel with slug "royal-court-okhla" not found!');
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="container mx-auto px-4 md:px-8 lg:px-12 pt-16 md:pt-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Main Image */}
          <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
            <img
              src={hotel.images[0]}
              alt={hotel.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
          </div>
          
          {/* Secondary Images Grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              hotel.images[1],
              hotel.images[2],
              hotel.images[3],
              hotel.images[4]
            ].map((image, index) => (
              <div key={index} className="relative h-[190px] md:h-[240px] rounded-lg overflow-hidden border border-neutral-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                <img
                  src={image}
                  alt={`${hotel.name} - ${index + 2}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Hotel Title Section */}
        <div className="max-w-4xl mx-auto px-4 md:px-0 space-y-6">
          <h1 className="font-serif text-3xl md:text-4xl text-neutral-800 mb-2">Tivoli Royal Court - Okhla</h1>
          <div className="flex items-center gap-4">
            <p className="flex items-center text-neutral-600">
              <MapPin className="w-4 h-4 mr-1" />
              D-185, Pocket D, Okhla Phase I, Okhla Industrial Area, New Delhi – 110020
            </p>
            <button className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
              <Share2 className="w-5 h-5 text-neutral-600" />
            </button>
            <button 
              className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
              onClick={() => setIsWishlist(!isWishlist)}
            >
              <Heart className={`w-5 h-5 ${isWishlist ? 'fill-[#CD9F59] text-[#CD9F59]' : 'text-neutral-600'}`} />
            </button>
          </div>
        </div>

        {/* Your Extraordinary Moments Section */}
        <section className="py-8 md:py-12 bg-white">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            <div className="text-center mb-8">
              <span className="text-sm uppercase tracking-[0.2em] text-[#CD9F59] font-sans mb-2 block">
                Premier Destination
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-neutral-800 mb-6">
                Your Extraordinary Moments, Our Signature Spaces
              </h2>
              <p className="text-neutral-600 max-w-4xl mx-auto leading-relaxed">
                Step into a world where every celebration becomes extraordinary. Tivoli Royal Court presents two magnificent halls – REGENCY and ASTORIA – each designed to transform your vision into reality. Whether you're planning an intimate gathering of 100 or a grand celebration for 450 guests, our versatile spaces adapt seamlessly to your needs.
              </p>
            </div>

            {/* Venue Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              <div className="text-center bg-neutral-50 p-6 rounded-xl">
                <div className="text-2xl md:text-3xl font-serif text-[#CD9F59] mb-2">200</div>
                <div className="text-sm text-neutral-600">Parking Spaces</div>
              </div>
              <div className="text-center bg-neutral-50 p-6 rounded-xl">
                <div className="text-2xl md:text-3xl font-serif text-[#CD9F59] mb-2">100-450</div>
                <div className="text-sm text-neutral-600">Guest Capacity</div>
              </div>
              <div className="text-center bg-neutral-50 p-6 rounded-xl">
                <div className="text-2xl md:text-3xl font-serif text-[#CD9F59] mb-2">6,500</div>
                <div className="text-sm text-neutral-600">Sq. Ft. Event Space</div>
              </div>
              <div className="text-center bg-neutral-50 p-6 rounded-xl">
                <div className="text-2xl md:text-3xl font-serif text-[#CD9F59] mb-2">2</div>
                <div className="text-sm text-neutral-600">Signature Halls</div>
              </div>
            </div>

            {/* Venue Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* ASTORIA */}
              <div className="bg-neutral-50 rounded-xl p-8">
                <h3 className="font-serif text-2xl text-neutral-800 mb-4">ASTORIA</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Location:</span>
                    <span className="font-medium">1st & 2nd Floor Combined</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Space:</span>
                    <span className="font-medium">9,000 sq ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Features:</span>
                    <span className="font-medium">Green rooms for VIP guests</span>
                  </div>
                </div>
              </div>

              {/* REGENCY */}
              <div className="bg-neutral-50 rounded-xl p-8">
                <h3 className="font-serif text-2xl text-neutral-800 mb-4">REGENCY</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Location:</span>
                    <span className="font-medium">Ground Floor</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Space:</span>
                    <span className="font-medium">8,000 sq ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Features:</span>
                    <span className="font-medium">Dedicated valet parking area</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Wedding Section */}
        <section className="py-8 md:py-12 bg-neutral-50">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            <div className="text-center mb-8">
              <span className="text-sm uppercase tracking-[0.2em] text-[#CD9F59] font-sans mb-2 block">
                Dream Weddings
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-neutral-800 mb-6">
                Wedding
              </h2>
              <div className="max-w-4xl mx-auto text-neutral-600 leading-relaxed">
                <p className="mb-6">
                  Experience the pinnacle of luxury and sophistication at Tivoli Royal Court, Okhla, where every wedding is a masterpiece crafted to perfection. Situated in the vibrant area of Okhla, this exquisite venue offers a stunning backdrop for your special day, combining elegance with modern amenities.
                </p>
                <p className="mb-6">
                  Tivoli Royal Court spans beautifully landscaped gardens, providing ample space for both intimate gatherings and grand celebrations. Choose from various indoor and outdoor settings, including a lavish ballroom and picturesque lawns, each designed to accommodate weddings of any scale. The venue is adorned with opulent decor, featuring elegant chandeliers and intricate details that create a romantic atmosphere.
                </p>
                <p className="mb-6">
                  Our dedicated team at Tivoli Royal Court is committed to bringing your vision to life. With meticulous attention to detail, we offer: From bespoke floral arrangements to customized catering options, every element is carefully curated to reflect your unique style. Delight your guests with gourmet catering services that offer a diverse range of cuisines, ensuring a memorable dining experience.
                </p>
                <p>
                  At Tivoli Royal Court, we understand that your wedding day is one of the most significant moments of your life. Our promise is to deliver an unforgettable experience filled with luxury and grace. Celebrate amidst our manicured gardens and elegant interiors, where every moment is crafted to create cherished memories for years to come.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Gatherings Section */}
        <section className="py-8 md:py-12 bg-white">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            <div className="text-center mb-8">
              <span className="text-sm uppercase tracking-[0.2em] text-[#CD9F59] font-sans mb-2 block">
                Memorable Events
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-neutral-800 mb-6">
                Social Gatherings
              </h2>
              <div className="max-w-4xl mx-auto text-neutral-600 leading-relaxed">
                <p className="mb-6">
                  At Tivoli Royal Court, Okhla, we believe that every social gathering deserves a touch of elegance and sophistication. Our venue is meticulously designed to cater to a variety of events, ensuring that each occasion is memorable and seamlessly executed.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-8">
                  <div>
                    <h3 className="font-serif text-xl text-neutral-800 mb-4">Spacious Banquet Halls</h3>
                    <p className="text-neutral-600 mb-4">
                      With two luxurious indoor venues, Regency and Astoria, we can accommodate gatherings of up to 600 guests. The pillarless design and high ceilings create an open and inviting atmosphere for any celebration.
                    </p>
                    
                    <h3 className="font-serif text-xl text-neutral-800 mb-4">Beautiful Outdoor Areas</h3>
                    <p className="text-neutral-600">
                      Our lush gardens provide a stunning backdrop for outdoor events, perfect for cocktail parties, family gatherings, and more.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-serif text-xl text-neutral-800 mb-4">Perfect For</h3>
                    <ul className="space-y-2 text-neutral-600">
                      <li>• Birthday parties</li>
                      <li>• Anniversary celebrations</li>
                      <li>• Corporate events</li>
                      <li>• Any special occasion</li>
                    </ul>
                    
                    <h3 className="font-serif text-xl text-neutral-800 mb-4 mt-6">Our Services</h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-neutral-800">In-House Catering</h4>
                        <p className="text-sm text-neutral-600">Diverse menu with both vegetarian and non-vegetarian options</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-neutral-800">Customized Decor</h4>
                        <p className="text-sm text-neutral-600">Thematic decorations that reflect your vision and style</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-neutral-800">Entertainment Options</h4>
                        <p className="text-sm text-neutral-600">In-house DJ services and live music accommodation</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Location & Map Section */}
        <section className="py-8 md:py-12 bg-neutral-50">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            <div className="text-center mb-8">
              <span className="text-sm uppercase tracking-[0.2em] text-[#CD9F59] font-sans mb-2 block">
                Visit Us
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-neutral-800 mb-6">
                Location & Directions
              </h2>
            </div>
            
            <div className="w-full h-[450px] rounded-xl overflow-hidden shadow-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14022.452802100332!2d77.27713!3d28.521283!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce170c07e2e9b%3A0x95b531847cdf6946!2sTivoli%20Royal%20Court!5e0!3m2!1sen!2sus!4v1750361698528!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{border: 0}} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>

        {/* Venue Booking Form */}
        <div id="venue-booking-form">
          <VenueBookingForm />
        </div>
      </div>
    </div>
  );
}