/**
 * DigitalQRPage Component
 * Digital QR experience page for The Tivoli-New Delhi featuring:
 * - Digital Menu with Service Directory, IRD Menu, and The Tivoli-Fact Sheet
 * - Updated: Added The Tivoli-Fact Sheet section with external link
 */
import React from 'react';
import { ExternalLink } from 'lucide-react';
import Navigation from '@/components/Navigation';

const sections = {
  digitalMenu: [
    { 
      title: 'Service Directory',
      icon: ExternalLink,
      link: 'https://drive.google.com/file/d/1thLoTdDvGYMy26WYU6ZjFjVaBDqnvXZh/view?usp=sharing',
      description: 'Access our comprehensive service directory'
    },
    { 
      title: 'IRD Menu',
      icon: ExternalLink,
      link: 'https://drive.google.com/file/d/1KacWTxsSsxajDde6-c95Bvfv7KL81RmX/view?usp=sharing',
      description: 'Browse our in-room dining menu'
    },
    {
      title: 'The Tivoli-Doll House',
      icon: ExternalLink,
      link: 'https://spalba.com/properties/51dvYlEQCd?share=true',
      description: 'Experience our unique Doll House collection'
    },
    {
      title: 'The Tivoli-Fact Sheet',
      icon: ExternalLink,
      link: 'https://drive.google.com/file/d/1rHczQY-8AEpe-zlcvGEpBuBx_lb7trCA/view?usp=sharing',
      description: 'Comprehensive information about The Tivoli hotel'
    }
  ]
};

export default function DigitalQRPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-[#001d3d]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="font-serif text-[44px] mb-4">Digital Experience</h1>
            <p className="text-lg font-light max-w-2xl mx-auto">
              Enhance your stay with our digital services and exclusive offerings
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Digital Menu Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl text-neutral-800 mb-4">Digital Menu</h2>
            <div className="w-20 h-1 bg-[#CD9F59] mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sections.digitalMenu.map((item) => (
              <a
                key={item.title}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center gap-6"
              >
                <div className="w-12 h-12 rounded-full bg-[#CD9F59]/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-[#CD9F59]" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-neutral-800 mb-2">{item.title}</h3>
                  <p className="text-neutral-600">{item.description}</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}