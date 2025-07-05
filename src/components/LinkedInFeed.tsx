/**
 * LinkedInFeed Component
 * Updated: 2025-07-05
 * 
 * Displays latest 3 posts from The Tivoli Group LinkedIn company page
 * Styled to match existing Press component design
 */
import React from 'react';
import { ArrowUpRight, Heart, MessageCircle, Share2, Calendar } from 'lucide-react';
import { linkedinPosts } from '../data/linkedin-posts';

// LinkedIn brand icon component
const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export default function LinkedInFeed() {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatEngagement = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  return (
    <section className="py-6 md:py-12 relative bg-gradient-to-b from-white to-neutral-50">
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
            Latest from LinkedIn
          </span>
          <h2 className="font-serif text-3xl md:text-4xl mb-3 text-neutral-600">
            Stay Connected with Us
          </h2>
          <p className="elegant-text text-sm md:text-base">
            Follow our journey and latest updates from The Tivoli Group
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {linkedinPosts.map((post) => (
            <a 
              key={post.id}
              href={post.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group cursor-pointer block"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden mb-2 md:mb-3 rounded-lg shadow-lg aspect-[4/3]">
                <img
                  src={post.image}
                  alt={post.excerpt}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                
                {/* LinkedIn Icon Overlay */}
                <div className="absolute top-3 right-3 w-8 h-8 bg-[#0077B5] rounded-md flex items-center justify-center shadow-lg">
                  <LinkedInIcon className="w-4 h-4 text-white" />
                </div>

                {/* Date Badge */}
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md">
                  <div className="flex items-center text-white text-xs">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(post.date)}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <p className="elegant-text text-xs md:text-sm line-clamp-3 text-neutral-700 leading-relaxed">
                  {post.excerpt}
                </p>
                
                {/* Engagement Stats */}
                {post.engagement && (
                  <div className="flex items-center space-x-4 text-xs text-neutral-500">
                    <div className="flex items-center">
                      <Heart className="w-3 h-3 mr-1" />
                      {formatEngagement(post.engagement.likes)}
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="w-3 h-3 mr-1" />
                      {formatEngagement(post.engagement.comments)}
                    </div>
                    <div className="flex items-center">
                      <Share2 className="w-3 h-3 mr-1" />
                      {formatEngagement(post.engagement.shares)}
                    </div>
                  </div>
                )}

                <span className="inline-flex items-center text-[#0077B5] hover:text-[#005885] transition-colors font-sans text-xs uppercase tracking-wider">
                  View on LinkedIn
                  <ArrowUpRight className="w-3 h-3 ml-1" />
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* See All Posts Link */}
        <div className="text-center mt-8 md:mt-10">
          <a 
            href="https://www.linkedin.com/company/the-tivoli-group"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-[#0077B5] hover:bg-[#005885] text-white px-6 py-3 rounded-lg font-sans text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <LinkedInIcon className="w-4 h-4 mr-2" />
            Follow Us on LinkedIn
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
}