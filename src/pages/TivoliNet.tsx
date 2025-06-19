import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import Navigation from '../components/Navigation';

const regions = [
  {
    name: 'North India',
    email: 'north@tivolihotels.com',
    phone: '+91 123 456 7890',
    address: 'Plot No. 15, Sector 44, Gurugram, Haryana 122001',
    coverage: ['Delhi NCR', 'Punjab', 'Haryana', 'Uttar Pradesh', 'Uttarakhand']
  },
  {
    name: 'South India',
    email: 'south@tivolihotels.com',
    phone: '+91 823 456 7890',
    address: '42, Residency Road, Bangalore, Karnataka 560025',
    coverage: ['Karnataka', 'Tamil Nadu', 'Kerala', 'Andhra Pradesh', 'Telangana']
  },
  {
    name: 'East India',
    email: 'east@tivolihotels.com',
    phone: '+91 333 456 7890',
    address: 'Block EN, Sector V, Salt Lake City, Kolkata, West Bengal 700091',
    coverage: ['West Bengal', 'Odisha', 'Bihar', 'Jharkhand', 'North-East States']
  },
  {
    name: 'West India',
    email: 'west@tivolihotels.com',
    phone: '+91 223 456 7890',
    address: 'Bandra Kurla Complex, Mumbai, Maharashtra 400051',
    coverage: ['Maharashtra', 'Gujarat', 'Rajasthan', 'Madhya Pradesh', 'Goa']
  }
];

export default function TivoliNet() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-[#001d3d]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80')] opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="font-serif text-[44px] mb-4">Tivoli Net</h1>
            <p className="text-lg font-light max-w-2xl mx-auto">
              Our regional sales and reservations network, dedicated to providing personalized service across India
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {regions.map((region) => (
            <div 
              key={region.name}
              className="bg-white p-8 rounded-lg shadow-lg border border-[#CD9F59]/20 hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="font-serif text-2xl text-[#CD9F59] mb-6">{region.name}</h2>
              
              <div className="space-y-6">
                {/* Contact Info */}
                <div className="space-y-4">
                  <a href={`mailto:${region.email}`} className="flex items-center text-neutral-600 hover:text-[#CD9F59] transition-colors">
                    <Mail className="w-5 h-5 mr-3" />
                    <span>{region.email}</span>
                  </a>
                  <a href={`tel:${region.phone}`} className="flex items-center text-neutral-600 hover:text-[#CD9F59] transition-colors">
                    <Phone className="w-5 h-5 mr-3" />
                    <span>{region.phone}</span>
                  </a>
                  <div className="flex items-start text-neutral-600">
                    <MapPin className="w-5 h-5 mr-3 mt-1" />
                    <span>{region.address}</span>
                  </div>
                </div>

                {/* Coverage Area */}
                <div>
                  <h3 className="font-serif text-lg mb-3">Coverage Area</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {region.coverage.map((state) => (
                      <li key={state} className="text-neutral-600">• {state}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}