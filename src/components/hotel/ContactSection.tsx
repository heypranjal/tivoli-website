/**
 * Contact Section Component
 * Hotel location, contact information and embedded map
 */

import React from 'react';
import { MapPin, Phone, Mail, Navigation, Instagram, Facebook } from 'lucide-react';

interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

interface Contact {
  phone: string;
  email: string;
}

interface SocialMedia {
  instagram?: string;
  facebook?: string;
}

interface ContactSectionProps {
  address: Address;
  contact: Contact;
  socialMedia?: SocialMedia;
  mapEmbedUrl?: string;
  className?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  address,
  contact,
  socialMedia,
  mapEmbedUrl,
  className = '',
}) => {
  const generateMapUrl = () => {
    if (mapEmbedUrl) return mapEmbedUrl;
    
    // Fallback: Generate Google Maps embed URL from coordinates or address
    if (address.coordinates) {
      return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.6733831702897!2d${address.coordinates.lng}!3d${address.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1sen!2sin!4v1710934800000!5m2!1sen!2sin`;
    }
    
    // Fallback to address search
    const addressQuery = encodeURIComponent(`${address.street}, ${address.city}, ${address.state}, ${address.country}`);
    return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.6733831702897!2d77.18273957549579!3d28.496635075739174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1e25a8f714c1%3A0x9bc15e7b965ec179!2s${addressQuery}!5e0!3m2!1sen!2sin!4v1710934800000!5m2!1sen!2sin`;
  };

  const handleGetDirections = () => {
    if (address.coordinates) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${address.coordinates.lat},${address.coordinates.lng}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      const addressQuery = encodeURIComponent(`${address.street}, ${address.city}, ${address.state}, ${address.country}`);
      const url = `https://www.google.com/maps/dir/?api=1&destination=${addressQuery}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section className={`space-y-8 ${className}`}>
      <div className="text-center">
        <h2 className="font-serif text-3xl text-neutral-800 mb-4">Location & Contact</h2>
        <p className="text-neutral-600 leading-relaxed max-w-2xl mx-auto">
          Find us at our prime location and get in touch for reservations or inquiries
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="space-y-6">
          {/* Address with Social Media */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex items-start space-x-4">
              <div className="bg-[#CD9F59]/10 rounded-lg p-3">
                <MapPin className="w-6 h-6 text-[#CD9F59]" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-neutral-800 mb-2">Address</h4>
                <p className="text-neutral-600 leading-relaxed">
                  {address.street}<br />
                  {address.city}, {address.state} {address.postalCode}<br />
                  {address.country}
                </p>
                {/* Social Media Buttons */}
                {socialMedia && (socialMedia.instagram || socialMedia.facebook) && (
                  <div className="mt-3 flex space-x-2">
                    {socialMedia.instagram && (
                      <a
                        href={socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 bg-white border border-[#CD9F59] text-[#CD9F59] px-2 py-1 rounded text-xs font-medium hover:bg-[#CD9F59] hover:text-white transition-all duration-200"
                      >
                        <Instagram className="w-3 h-3" />
                        <span>Instagram</span>
                      </a>
                    )}
                    {socialMedia.facebook && (
                      <a
                        href={socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 bg-white border border-[#CD9F59] text-[#CD9F59] px-2 py-1 rounded text-xs font-medium hover:bg-[#CD9F59] hover:text-white transition-all duration-200"
                      >
                        <Facebook className="w-3 h-3" />
                        <span>Facebook</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex items-start space-x-4">
              <div className="bg-[#CD9F59]/10 rounded-lg p-3">
                <Phone className="w-6 h-6 text-[#CD9F59]" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-neutral-800 mb-2">Phone</h4>
                <a 
                  href={`tel:${contact.phone.replace(/\s/g, '')}`}
                  className="text-neutral-600 hover:text-[#CD9F59] transition-colors duration-200"
                >
                  {contact.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex items-start space-x-4">
              <div className="bg-[#CD9F59]/10 rounded-lg p-3">
                <Mail className="w-6 h-6 text-[#CD9F59]" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-neutral-800 mb-2">Email</h4>
                <a 
                  href={`mailto:${contact.email}`}
                  className="text-neutral-600 hover:text-[#CD9F59] transition-colors duration-200"
                >
                  {contact.email}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Map */}
        <div className="bg-neutral-100 rounded-xl overflow-hidden shadow-lg">
          <iframe
            src={generateMapUrl()}
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-[500px]"
            title="Hotel Location Map"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
export type { SocialMedia };