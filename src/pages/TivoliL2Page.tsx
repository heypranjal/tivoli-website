/**
 * TivoliL2Page Component
 * A modern, responsive landing page for Tivoli L2 hotel featuring:
 * - Hero section with full-width background
 * - Features section with animated cards
 * - Rooms showcase
 * - Dining options
 * - Events & banquets section
 * - Location and contact information
 */
import React from 'react';
import { Wifi, Dumbbell, School as Pool, Utensils, Clock, MapPin, Phone, Mail, Facebook, Instagram, Twitter, Heart } from 'lucide-react';
import Navigation from '@/components/Navigation';

const features = [
  { id: 'wifi', name: 'Free Wi-Fi', icon: Wifi, description: 'High-speed internet throughout the property' },
  { id: 'fitness', name: 'Fitness Centre', icon: Dumbbell, description: 'State-of-the-art equipment and trainers' },
  { id: 'pool', name: 'Swimming Pool', icon: Pool, description: 'Temperature-controlled pool with loungers' },
  { id: 'dining', name: 'Multi-cuisine Restaurant', icon: Utensils, description: 'Global flavors and local delicacies' },
  { id: 'service', name: '24x7 Room Service', icon: Clock, description: 'Round-the-clock guest assistance' },
  { id: 'events', name: 'Event Spaces', icon: Heart, description: 'Indoor & outdoor venues for all occasions' }
];

const rooms = [
  {
    type: 'Deluxe Room',
    description: 'Modern comfort meets elegant design in our spacious deluxe rooms',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    price: '₹8,000'
  },
  {
    type: 'Executive Room',
    description: 'Premium amenities and city views for the discerning traveler',
    image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
    price: '₹12,000'
  },
  {
    type: 'Suite',
    description: 'Luxurious suites with separate living area and premium services',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    price: '₹18,000'
  }
];

const restaurants = [
  {
    name: 'Orchid Restaurant',
    type: 'Multi-cuisine',
    description: 'A culinary journey through global flavors',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  },
  {
    name: 'Neptune Bar',
    type: 'Drinks & Spirits',
    description: 'Premium beverages in an elegant setting',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80'
  },
  {
    name: 'Fortune Deli',
    type: 'Quick Bites',
    description: 'Fresh pastries and gourmet sandwiches',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=2047&q=80'
  }
];

const venues = [
  {
    name: 'Crystal Ballroom',
    capacity: '280 guests',
    type: 'Indoor Banquet',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2098&q=80'
  },
  {
    name: 'Garden Terrace',
    capacity: '500 guests',
    type: 'Outdoor Lawn',
    image: 'https://images.unsplash.com/photo-1464808322410-1a934aab61e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  },
  {
    name: 'Poolside Deck',
    capacity: '30-35 guests',
    type: 'Intimate Gatherings',
    image: 'https://images.unsplash.com/photo-1504814532849-cff240bbc503?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80'
  }
];

export default function TivoliL2Page() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Tivoli L2"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-white text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="font-serif text-5xl md:text-6xl mb-6">Tivoli L2</h1>
            <p className="text-xl md:text-2xl mb-8 font-light">
              Where luxury meets contemporary elegance
            </p>
            <button className="px-8 py-3 bg-[#CD9F59] text-white rounded-lg hover:bg-[#B88D47] transition-colors text-lg font-medium tracking-wide">
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.2em] text-[#CD9F59] font-sans mb-2 block">
              Hotel Features
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-neutral-800 mb-4">
              Modern Comfort & Luxury
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={feature.id}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-full bg-[#CD9F59]/10 flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-[#CD9F59]" />
                  </div>
                  <h3 className="font-serif text-xl text-neutral-800 mb-2">{feature.name}</h3>
                  <p className="text-neutral-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.2em] text-[#CD9F59] font-sans mb-2 block">
              Accommodations
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-neutral-800 mb-4">
              Luxurious Rooms & Suites
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <div key={room.type} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-4">
                  <img
                    src={room.image}
                    alt={room.type}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-lg font-serif">{room.type}</p>
                    <p className="text-[#CD9F59]">From {room.price}/night</p>
                  </div>
                </div>
                <p className="text-neutral-600">{room.description}</p>
                <button className="mt-4 px-6 py-2 border-2 border-[#CD9F59] text-[#CD9F59] rounded-lg hover:bg-[#CD9F59] hover:text-white transition-colors">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dining Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.2em] text-[#CD9F59] font-sans mb-2 block">
              Dining
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-neutral-800 mb-4">
              Culinary Excellence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {restaurants.map((restaurant) => (
              <div key={restaurant.name} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-4">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-lg font-serif">{restaurant.name}</p>
                    <p className="text-[#CD9F59]">{restaurant.type}</p>
                  </div>
                </div>
                <p className="text-neutral-600">{restaurant.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events & Banquets Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.2em] text-[#CD9F59] font-sans mb-2 block">
              Events & Banquets
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-neutral-800 mb-4">
              Perfect Venues for Every Occasion
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {venues.map((venue) => (
              <div key={venue.name} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-4">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-lg font-serif">{venue.name}</p>
                    <p className="text-[#CD9F59]">{venue.type}</p>
                    <p className="text-sm text-white/90">Capacity: {venue.capacity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Contact Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.2em] text-[#CD9F59] font-sans mb-2 block">
              Location & Contact
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-neutral-800 mb-4">
              Get in Touch
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="font-serif text-2xl text-neutral-800 mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center text-neutral-600">
                  <MapPin className="w-5 h-5 mr-3" />
                  <span>abc</span>
                </div>
                <a href="tel:+911234567890" className="flex items-center text-neutral-600 hover:text-[#CD9F59] transition-colors">
                  <Phone className="w-5 h-5 mr-3" />
                  <span>+91 123 456 7890</span>
                </a>
                <a href="mailto:info@tivolil2.com" className="flex items-center text-neutral-600 hover:text-[#CD9F59] transition-colors">
                  <Mail className="w-5 h-5 mr-3" />
                  <span>info@tivolil2.com</span>
                </a>
              </div>

              <div className="mt-8">
                <h4 className="font-serif text-lg text-neutral-800 mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-neutral-600 hover:text-[#CD9F59] transition-colors">
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-neutral-600 hover:text-[#CD9F59] transition-colors">
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-neutral-600 hover:text-[#CD9F59] transition-colors">
                    <Twitter className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="font-serif text-2xl text-neutral-800 mb-6">Send us a Message</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CD9F59]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CD9F59]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CD9F59]"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#CD9F59] text-white py-3 rounded-lg hover:bg-[#B88D47] transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}