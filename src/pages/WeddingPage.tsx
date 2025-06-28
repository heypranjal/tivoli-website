/**
 * Wedding Page Component
 * Showcases wedding videos by categories with lead generation form
 * Features embedded YouTube videos with custom styling
 */
import React from 'react';
import { Heart, Sparkles, Crown } from 'lucide-react';
import VideoPlayer from '@/components/VideoPlayer';
import VenueBookingForm from '@/components/VenueBookingForm';

// Wedding video data organized by categories
const weddingVideos = {
  wedding: [
    {
      id: 'wedding-1',
      url: 'https://youtu.be/ZKPBBMYWGDs',
      title: 'Elegant Wedding Ceremony'
    },
    {
      id: 'wedding-2', 
      url: 'https://youtu.be/fvo2sM8gl3U',
      title: 'Grand Wedding Celebration'
    }
  ],
  haldi: [
    {
      id: 'haldi-1',
      url: 'https://youtu.be/k8Vkh3avPyc',
      title: 'Traditional Haldi Ceremony'
    }
  ],
  mehndi: [
    {
      id: 'mehndi-1',
      url: 'https://youtu.be/59VnJYy2TC0',
      title: 'Beautiful Mehndi Celebration'
    }
  ],
  cocktail: [
    {
      id: 'cocktail-1',
      url: 'https://youtu.be/SZRw_acTSkU',
      title: 'Elegant Cocktail Party'
    }
  ]
};

export default function WeddingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-12 md:pt-24 md:pb-16 bg-gradient-to-b from-neutral-50 to-white relative">
        {/* Decorative Elements */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#CD9F59]/30 to-transparent" />
        
        <div className="container mx-auto px-4 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            {/* Decorative Lines */}
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-[1px] bg-[#CD9F59]" />
              <div className="w-3 h-3 rotate-45 border border-[#CD9F59] mx-4" />
              <div className="w-16 h-[1px] bg-[#CD9F59]" />
            </div>
            
            <span className="text-sm uppercase tracking-[0.3em] text-[#CD9F59] font-sans mb-4 block">
              Your Dream Wedding Awaits
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 text-neutral-800 leading-tight">
              Wedding Celebrations<br />at Tivoli
            </h1>
            <p className="elegant-text text-lg md:text-xl mb-8 text-neutral-600 max-w-2xl mx-auto">
              Experience the magic of your special day with our exquisite venues, 
              personalized service, and unforgettable celebrations that create memories for a lifetime.
            </p>
            
            {/* Decorative Icons */}
            <div className="flex items-center justify-center space-x-8 text-[#CD9F59]">
              <Heart className="w-6 h-6" />
              <Sparkles className="w-6 h-6" />
              <Crown className="w-6 h-6" />
            </div>
          </div>
        </div>
      </section>

      {/* Wedding Videos Section */}
      <section className="py-12 md:py-16 bg-neutral-50 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#CD9F59]/30 to-transparent" />
        
        <div className="container mx-auto px-4 md:px-12">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-sm uppercase tracking-[0.2em] text-[#CD9F59] font-sans mb-3 block">
              Wedding Celebrations
            </span>
            <h2 className="font-serif text-3xl md:text-4xl mb-4 text-neutral-800">
              Magical Wedding Moments
            </h2>
            <p className="elegant-text text-base md:text-lg text-neutral-600">
              Witness the grandeur and elegance of weddings at our venues
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
            {weddingVideos.wedding.map((video) => (
              <VideoPlayer
                key={video.id}
                url={video.url}
                title={video.title}
                className="h-full"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Haldi Ceremony Section */}
      <section className="py-12 md:py-16 bg-white relative">
        <div className="container mx-auto px-4 md:px-12">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-sm uppercase tracking-[0.2em] text-[#CD9F59] font-sans mb-3 block">
              Traditional Ceremonies
            </span>
            <h2 className="font-serif text-3xl md:text-4xl mb-4 text-neutral-800">
              Haldi Ceremony
            </h2>
            <p className="elegant-text text-base md:text-lg text-neutral-600">
              Celebrate traditional rituals with joy and cultural richness
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {weddingVideos.haldi.map((video) => (
              <VideoPlayer
                key={video.id}
                url={video.url}
                title={video.title}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Mehndi Celebration Section */}
      <section className="py-12 md:py-16 bg-neutral-50 relative">
        <div className="container mx-auto px-4 md:px-12">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-sm uppercase tracking-[0.2em] text-[#CD9F59] font-sans mb-3 block">
              Pre-Wedding Celebrations
            </span>
            <h2 className="font-serif text-3xl md:text-4xl mb-4 text-neutral-800">
              Mehndi Celebration
            </h2>
            <p className="elegant-text text-base md:text-lg text-neutral-600">
              Artistic traditions come alive with music, dance, and intricate designs
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {weddingVideos.mehndi.map((video) => (
              <VideoPlayer
                key={video.id}
                url={video.url}
                title={video.title}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Cocktail Party Section */}
      <section className="py-12 md:py-16 bg-white relative">
        <div className="container mx-auto px-4 md:px-12">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-sm uppercase tracking-[0.2em] text-[#CD9F59] font-sans mb-3 block">
              Evening Celebrations
            </span>
            <h2 className="font-serif text-3xl md:text-4xl mb-4 text-neutral-800">
              Cocktail Party
            </h2>
            <p className="elegant-text text-base md:text-lg text-neutral-600">
              Sophisticated evening celebrations with curated cocktails and elegant ambiance
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {weddingVideos.cocktail.map((video) => (
              <VideoPlayer
                key={video.id}
                url={video.url}
                title={video.title}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-neutral-50 to-white relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#CD9F59]/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#CD9F59]/30 to-transparent" />
        
        <div className="container mx-auto px-4 md:px-12">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-[1px] bg-[#CD9F59]" />
              <div className="w-3 h-3 rotate-45 border border-[#CD9F59] mx-4" />
              <div className="w-16 h-[1px] bg-[#CD9F59]" />
            </div>
            
            <span className="text-sm uppercase tracking-[0.2em] text-[#CD9F59] font-sans mb-3 block">
              Start Planning Today
            </span>
            <h2 className="font-serif text-3xl md:text-4xl mb-4 text-neutral-800">
              Plan Your Dream Wedding
            </h2>
            <p className="elegant-text text-base md:text-lg text-neutral-600">
              Let our expert team help you create the wedding of your dreams. 
              Share your vision and we'll make it a reality.
            </p>
          </div>

          {/* Venue Booking Form */}
          <div className="max-w-5xl mx-auto">
            <VenueBookingForm />
          </div>
        </div>
      </section>
    </div>
  );
}