/**
 * VenueBookingForm Component
 * Enhanced venue booking form with Supabase integration
 * 
 * Features:
 * - Real-time form validation
 * - Supabase database integration
 * - Lead tracking and analytics
 * - Success/error handling with user feedback
 * - Mobile-responsive design
 * 
 * Updated for new Supabase instance: sivirxabbuldqkckjwmu
 */
import React, { useState } from 'react';
import { Calendar, Users, Phone, Mail, ChevronDown, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { supabaseHelpers, VenueBooking } from '@/lib/supabase';

const eventTypes = [
  { id: 'wedding', label: 'Wedding' },
  { id: 'mice', label: 'MICE' },
  { id: 'birthday', label: 'Birthday Party' },
  { id: 'cocktail', label: 'Cocktail Party' },
  { id: 'corporate', label: 'Corporate Event' },
  { id: 'other', label: 'Other' }
];

interface FormData {
  name: string;
  eventDate: string;
  pax: string;
  phone: string;
  email: string;
  eventType: string;
  needsRooms: boolean;
  budgetRange: string;
  specialRequirements: string;
}

export default function VenueBookingForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    eventDate: '',
    pax: '',
    phone: '',
    email: '',
    eventType: '',
    needsRooms: false,
    budgetRange: '',
    specialRequirements: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.phone || !formData.eventDate || !formData.eventType || !formData.pax) {
        throw new Error('Please fill in all required fields');
      }

      // Create venue booking object
      const booking: VenueBooking = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        event_type: formData.eventType,
        event_date: formData.eventDate,
        guest_count: parseInt(formData.pax),
        needs_rooms: formData.needsRooms,
        budget_range: formData.budgetRange || null,
        special_requirements: formData.specialRequirements.trim() || null,
        status: 'pending'
      };

      // Submit to Supabase
      const result = await supabaseHelpers.createVenueBooking(booking);
      
      // Create lead entry for tracking
      await supabaseHelpers.createLead({
        source: 'venue_booking',
        booking_id: result.id,
        status: 'new'
      });

      setSubmitStatus('success');
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          eventDate: '',
          pax: '',
          phone: '',
          email: '',
          eventType: '',
          needsRooms: false,
          budgetRange: '',
          specialRequirements: ''
        });
        setSubmitStatus('idle');
      }, 3000);

    } catch (error) {
      console.error('Error submitting venue booking:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F8F9FA] py-10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6">
          <span className="text-sm uppercase tracking-[0.2em] text-[#CD9F59] font-sans mb-3 block">
            Book Your Event
          </span>
          <h2 className="font-serif text-2xl md:text-3xl text-neutral-800 mb-2">
            Plan Your Special Occasion
          </h2>
          <div className="w-20 h-[1px] bg-[#CD9F59] mx-auto" />
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg border border-[#CD9F59]/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#CD9F59] transition-colors"
                  placeholder="Enter your name"
                />
              </div>
            </div>

            {/* Event Type Select */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">Event Type</label>
              <div className="relative">
                <select
                  required
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#CD9F59] transition-colors appearance-none"
                >
                  <option value="">Select event type</option>
                  {eventTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
              </div>
            </div>

            {/* Event Date Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">Event Date</label>
              <div className="relative">
                <input
                  type="date"
                  required
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#CD9F59] transition-colors"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
              </div>
            </div>

            {/* Pax Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">Number of Guests</label>
              <div className="relative">
                <input
                  type="number"
                  required
                  value={formData.pax}
                  onChange={(e) => setFormData({ ...formData, pax: e.target.value })}
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#CD9F59] transition-colors"
                  placeholder="Enter guest count"
                />
                <Users className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
              </div>
            </div>

            {/* Phone Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">Phone Number</label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#CD9F59] transition-colors"
                  placeholder="Enter phone number"
                />
                <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">Email (Optional)</label>
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#CD9F59] transition-colors"
                  placeholder="Enter email address"
                />
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Additional Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Room Requirements */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">Room Requirements</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="needsRooms"
                    checked={formData.needsRooms === true}
                    onChange={() => setFormData({ ...formData, needsRooms: true })}
                    className="mr-2 text-[#CD9F59] focus:ring-[#CD9F59]"
                  />
                  <span className="text-sm text-neutral-700">Yes, need rooms</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="needsRooms"
                    checked={formData.needsRooms === false}
                    onChange={() => setFormData({ ...formData, needsRooms: false })}
                    className="mr-2 text-[#CD9F59] focus:ring-[#CD9F59]"
                  />
                  <span className="text-sm text-neutral-700">No rooms needed</span>
                </label>
              </div>
            </div>

            {/* Budget Range */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">Budget Range (Optional)</label>
              <select
                value={formData.budgetRange}
                onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#CD9F59] transition-colors appearance-none"
              >
                <option value="">Select budget range</option>
                <option value="under-5-lakhs">Under 5 Lakhs</option>
                <option value="5-10-lakhs">5 - 10 Lakhs</option>
                <option value="10-20-lakhs">10 - 20 Lakhs</option>
                <option value="20-50-lakhs">20 - 50 Lakhs</option>
                <option value="above-50-lakhs">Above 50 Lakhs</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
            </div>
          </div>

          {/* Special Requirements */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral-700">Special Requirements (Optional)</label>
            <textarea
              value={formData.specialRequirements}
              onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
              rows={4}
              className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#CD9F59] transition-colors resize-none"
              placeholder="Any special requirements or additional information..."
            />
          </div>

          {/* Submit Section */}
          <div className="mt-8">
            {/* Success Message */}
            {submitStatus === 'success' && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <div>
                  <p className="text-green-800 font-medium">Booking Request Submitted!</p>
                  <p className="text-green-700 text-sm">Thank you for your inquiry. We'll contact you within 24 hours.</p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {submitStatus === 'error' && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
                <div>
                  <p className="text-red-800 font-medium">Submission Failed</p>
                  <p className="text-red-700 text-sm">{errorMessage}</p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || submitStatus === 'success'}
              className="w-full md:w-auto px-8 py-3 bg-[#CD9F59] text-white rounded-lg hover:bg-[#B88D47] transition-colors duration-300 font-medium tracking-wide disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : submitStatus === 'success' ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Submitted Successfully
                </>
              ) : (
                'Submit Enquiry'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}