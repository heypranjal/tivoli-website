/**
 * Simplified Tivoli Lotus Court Page
 * Basic version to test without complex hooks and progressive loading
 */

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';

const LOTUS_COURT_DATA = {
  name: 'Tivoli Lotus Court',
  description: 'Experience contemporary luxury at Tivoli Lotus Court, where modern elegance meets exceptional hospitality. Located in the heart of Noida, this sophisticated hotel offers a perfect blend of business convenience and leisure comfort.',
  location: 'Noida, Uttar Pradesh',
  phone: '+91-120-4567-8901',
  email: 'reservations@tivolilotuscourt.com',
  rooms: 80,
  spaces: [
    {
      name: 'Lotus Grand Ballroom',
      capacity: 500,
      area: '4,500 sq ft'
    },
    {
      name: 'Crystal Hall',
      capacity: 200,
      area: '2,000 sq ft'
    },
    {
      name: 'Garden Pavilion',
      capacity: 150,
      area: '3,000 sq ft'
    }
  ],
  dining: [
    {
      name: 'Spice Route',
      cuisine: 'Indian',
      hours: '12:00 PM - 11:00 PM'
    },
    {
      name: 'Lotus Café',
      cuisine: 'International',
      hours: '7:00 AM - 11:00 PM'
    },
    {
      name: 'Courtyard Bar',
      cuisine: 'Bar & Grill',
      hours: '6:00 PM - 12:00 AM'
    }
  ]
};

const TivoliLotusCourtPageSimple: React.FC = () => {
  const { hotelSlug } = useParams<{ hotelSlug: string }>();
  
  useEffect(() => {
    document.title = `${LOTUS_COURT_DATA.name} - Luxury Hotel in Noida`;
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-[#CD9F59] to-[#B8934E] flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-serif mb-4">{LOTUS_COURT_DATA.name}</h1>
          <p className="text-xl md:text-2xl font-light">{LOTUS_COURT_DATA.location}</p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-serif text-neutral-800 mb-6">Welcome to Tivoli Lotus Court</h2>
            <p className="text-lg text-neutral-600 leading-relaxed mb-8">
              {LOTUS_COURT_DATA.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-serif text-[#CD9F59] mb-2">{LOTUS_COURT_DATA.rooms}</div>
                <div className="text-neutral-600">Premium Rooms</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-serif text-[#CD9F59] mb-2">{LOTUS_COURT_DATA.dining.length}</div>
                <div className="text-neutral-600">Dining Venues</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-serif text-[#CD9F59] mb-2">{LOTUS_COURT_DATA.spaces.length}</div>
                <div className="text-neutral-600">Event Spaces</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spaces Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-serif text-neutral-800 text-center mb-12">Event Spaces</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {LOTUS_COURT_DATA.spaces.map((space, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-serif text-neutral-800 mb-3">{space.name}</h3>
                  <div className="text-neutral-600 mb-2">
                    <strong>Capacity:</strong> {space.capacity} guests
                  </div>
                  <div className="text-neutral-600">
                    <strong>Area:</strong> {space.area}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dining Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-serif text-neutral-800 text-center mb-12">Dining Experiences</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {LOTUS_COURT_DATA.dining.map((restaurant, index) => (
                <div key={index} className="bg-neutral-50 rounded-lg p-6">
                  <h3 className="text-xl font-serif text-neutral-800 mb-3">{restaurant.name}</h3>
                  <div className="text-neutral-600 mb-2">
                    <strong>Cuisine:</strong> {restaurant.cuisine}
                  </div>
                  <div className="text-neutral-600">
                    <strong>Hours:</strong> {restaurant.hours}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-neutral-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-serif mb-8">Get in Touch</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-serif mb-4">Phone</h3>
                <p className="text-neutral-300">{LOTUS_COURT_DATA.phone}</p>
              </div>
              <div>
                <h3 className="text-xl font-serif mb-4">Email</h3>
                <p className="text-neutral-300">{LOTUS_COURT_DATA.email}</p>
              </div>
            </div>
            
            <div className="mt-12">
              <button className="bg-[#CD9F59] text-white px-8 py-3 rounded hover:bg-[#B8934E] transition-colors">
                Make a Reservation
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TivoliLotusCourtPageSimple;