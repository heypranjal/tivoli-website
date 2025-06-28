/**
 * SustainabilityPage Component
 * Updated: Replaced content with ESG Summary for Tivoli New Delhi, Chhatarpur
 * - Added Vatavaran logo prominently in hero section
 * - Organized content into Environmental, Social, and Governance sections
 * - Added specific metrics and initiatives for Tivoli New Delhi
 * - Maintained consistent design language with icons and styling
 */
import React from 'react';
import { Leaf, Recycle, Heart, Globe, Droplets, Sun, Wind, Sprout, Users, Car, Zap, Building } from 'lucide-react';
import Navigation from '@/components/Navigation';

const environmentalInitiatives = [
  {
    id: 'waste',
    name: 'Waste Management & Composting',
    description: 'Organic waste is processed into 100–150 kg of manure monthly using an on-site compost machine, reducing landfill waste and supporting sustainable landscaping practices.',
    icon: Recycle,
    stats: '100-150 kg manure monthly',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  },
  {
    id: 'solar',
    name: 'Renewable Energy',
    description: 'The property is equipped with a 65-watt rooftop solar panel, generating approximately 300–400 kWh of clean energy monthly, contributing to energy efficiency and lower carbon emissions.',
    icon: Sun,
    stats: '300-400 kWh monthly',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  },
  {
    id: 'water',
    name: 'Water Conservation',
    description: '17 rainwater harvesting pits can store 5,000–7,000 litres of water, improving water sustainability and groundwater recharge. 2,000 litres of greywater are treated and reused daily.',
    icon: Droplets,
    stats: '5,000-7,000L rainwater storage, 2,000L greywater reuse daily',
    image: 'https://images.unsplash.com/photo-1589634749000-1e72ec00a13f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80'
  },
  {
    id: 'transport',
    name: 'Green Transportation',
    description: 'The facility uses 5 electric vehicles: 2 golf carts for on-site guest transport and 3 electric vehicles powered by dry lithium batteries, reducing air and noise pollution.',
    icon: Car,
    stats: '5 electric vehicles in operation',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80'
  }
];

const socialInitiatives = [
  {
    title: 'Inclusive Employment',
    description: 'Tivoli is differently-abled friendly, actively providing employment opportunities to individuals with disabilities, fostering inclusivity and empowerment.',
    icon: Users
  },
  {
    title: 'Community Impact',
    description: 'Promotes sustainable practices among staff and guests with commitment to green hospitality and ethical operations.',
    icon: Heart
  }
];

const governancePoints = [
  'On-site composting and recycling system ensuring responsible waste handling',
  'Water and energy-saving systems regularly monitored for compliance and efficiency',
  'Long-term environmental and social sustainability through policy and operational commitment'
];

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section with Vatavaran Logo */}
      <div className="relative h-[80vh]">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1501426026826-31c667bdf23d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Sustainability"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-5xl mx-auto px-4">
            {/* Vatavaran Logo */}
            <div className="flex justify-center mb-8">
              <img 
                src="/vatavaran logo.jpg" 
                alt="Vatavaran - Environment, Society and Governance"
                className="h-32 md:h-40 w-auto"
              />
            </div>
            <h1 className="font-serif text-3xl md:text-5xl mb-6">ESG Summary</h1>
            <h2 className="font-serif text-2xl md:text-3xl mb-4 text-[#CD9F59]">Tivoli New Delhi, Chhatarpur</h2>
            <p className="text-lg md:text-xl font-light max-w-3xl mx-auto">
              Leading sustainable luxury hospitality through comprehensive Environmental, Social, and Governance initiatives
            </p>
          </div>
        </div>
      </div>

      {/* Environmental Initiatives */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Leaf className="w-12 h-12 text-[#CD9F59]" />
            </div>
            <span className="text-sm uppercase tracking-[0.2em] text-[#CD9F59] font-sans mb-4 block">
              ♻️ Environmental Initiatives
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-neutral-800 mb-4">
              Our Environmental Impact
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Comprehensive sustainability measures reducing our environmental footprint
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {environmentalInitiatives.map((initiative) => {
              const IconComponent = initiative.icon;
              return (
                <div key={initiative.id} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-2xl shadow-lg aspect-video mb-6">
                    <img
                      src={initiative.image}
                      alt={initiative.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
                    <div className="absolute top-6 right-6">
                      <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-[#CD9F59]" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="font-serif text-2xl mb-2">{initiative.name}</h3>
                      <p className="text-[#CD9F59] font-medium text-sm mb-2">{initiative.stats}</p>
                    </div>
                  </div>
                  <p className="text-neutral-600 leading-relaxed">
                    {initiative.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Social Responsibility */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Users className="w-12 h-12 text-[#CD9F59]" />
            </div>
            <span className="text-sm uppercase tracking-[0.2em] text-[#CD9F59] font-sans mb-4 block">
              🤝 Social Responsibility
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-neutral-800 mb-4">
              Community & Social Impact
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Fostering inclusivity and empowerment through responsible employment practices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {socialInitiatives.map((initiative, index) => {
              const IconComponent = initiative.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#CD9F59]/10 flex items-center justify-center mb-6">
                    <IconComponent className="w-8 h-8 text-[#CD9F59]" />
                  </div>
                  <h3 className="font-serif text-xl text-neutral-800 mb-4">{initiative.title}</h3>
                  <p className="text-neutral-600 leading-relaxed">{initiative.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Governance */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Building className="w-12 h-12 text-[#CD9F59]" />
            </div>
            <span className="text-sm uppercase tracking-[0.2em] text-[#CD9F59] font-sans mb-4 block">
              🏛️ Governance
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-neutral-800 mb-4">
              Responsible Management
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Ensuring accountability and transparency in our sustainability practices
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg border border-[#CD9F59]/10">
              <div className="space-y-6">
                {governancePoints.map((point, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-[#CD9F59] flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <span className="text-white text-sm font-medium">{index + 1}</span>
                    </div>
                    <p className="text-neutral-700 leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-[#001d3d]">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
              Join Our Sustainability Journey
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Experience luxury hospitality that cares for the environment and community. 
              Together, we're building a more sustainable future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-[#CD9F59] text-white rounded-lg hover:bg-[#B88D47] transition-colors font-medium">
                Learn More About Our Initiatives
              </button>
              <button className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-[#001d3d] transition-colors font-medium">
                Book Your Sustainable Stay
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}