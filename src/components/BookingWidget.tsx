import React, { useState } from 'react';
import { Calendar, Users, MessageSquare, CheckCircle, MapPin, AlertCircle } from 'lucide-react';
import { supabaseHelpers } from '@/lib/supabase';
import { getVenueOptions, getVenueById } from '@/utils/venues';

export default function BookingWidget() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    guestCount: '',
    eventType: '',
    venue: '',
    specialRequirements: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const venueOptions = getVenueOptions();

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      eventDate: '',
      guestCount: '',
      eventType: '',
      venue: '',
      specialRequirements: ''
    });
    setIsSubmitted(false);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Get selected venue details
      const selectedVenue = getVenueById(formData.venue);
      
      // Create venue booking record
      const venueBooking = await supabaseHelpers.createVenueBooking({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        event_type: formData.eventType,
        event_date: formData.eventDate,
        guest_count: parseInt(formData.guestCount),
        venue_id: formData.venue,
        needs_rooms: false, // Default for now
        special_requirements: formData.specialRequirements || null,
        status: 'pending'
      });

      // Create lead record for tracking
      await supabaseHelpers.createLead({
        source: 'venue_booking',
        booking_id: venueBooking.id,
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        status: 'new',
        notes: `Venue booking request for ${selectedVenue?.displayName || 'Unknown venue'} - ${formData.eventType} for ${formData.guestCount} guests`
      });

      console.log('Booking submitted successfully:', venueBooking);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Booking submission failed:', error);
      setError(error instanceof Error ? error.message : 'Failed to submit booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSubmitted) {
    const selectedVenue = getVenueById(formData.venue);
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 text-center">
        <div className="flex flex-col items-center space-y-4">
          <CheckCircle className="w-16 h-16 text-green-500" />
          <h3 className="text-2xl font-serif text-neutral-800">Booking Request Submitted!</h3>
          <p className="text-neutral-600">
            Thank you for your interest in Tivoli Hotels. Our team will contact you within 24 hours to confirm your booking details.
          </p>
          <div className="bg-neutral-50 p-4 rounded-lg mt-6 text-left">
            <h4 className="font-semibold text-sm text-neutral-800 mb-2">Booking Summary:</h4>
            <div className="space-y-1 text-sm text-neutral-700">
              <p><strong>Venue:</strong> {selectedVenue?.displayName || 'Selected venue'}</p>
              <p><strong>Event:</strong> {formData.eventType.charAt(0).toUpperCase() + formData.eventType.slice(1)}</p>
              <p><strong>Date:</strong> {new Date(formData.eventDate).toLocaleDateString()}</p>
              <p><strong>Guests:</strong> {formData.guestCount} people</p>
              <p><strong>Contact:</strong> {formData.email}</p>
            </div>
          </div>
          <button
            onClick={resetForm}
            className="mt-6 px-6 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors text-sm"
          >
            Submit Another Booking
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
          <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-red-800">Submission Error</h4>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CD9F59] focus:border-[#CD9F59]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CD9F59] focus:border-[#CD9F59]"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CD9F59] focus:border-[#CD9F59]"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              <Calendar className="w-4 h-4 inline-block mr-2" />
              Event Date
            </label>
            <input
              type="date"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CD9F59] focus:border-[#CD9F59]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              <Users className="w-4 h-4 inline-block mr-2" />
              Guest Count
            </label>
            <input
              type="number"
              name="guestCount"
              value={formData.guestCount}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CD9F59] focus:border-[#CD9F59]"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Event Type
          </label>
          <select
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CD9F59] focus:border-[#CD9F59]"
            required
          >
            <option value="">Select event type</option>
            <option value="wedding">Wedding</option>
            <option value="mice">MICE (Meetings, Incentives, Conferences, Exhibitions)</option>
            <option value="corporate">Corporate Event</option>
            <option value="birthday">Birthday Celebration</option>
            <option value="cocktail">Cocktail Party</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            <MapPin className="w-4 h-4 inline-block mr-2" />
            Preferred Venue
          </label>
          <select
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CD9F59] focus:border-[#CD9F59]"
            required
          >
            <option value="">Select a venue</option>
            {venueOptions.map((venue) => (
              <option key={venue.id} value={venue.id}>
                {venue.displayName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            <MessageSquare className="w-4 h-4 inline-block mr-2" />
            Special Requirements
          </label>
          <textarea
            name="specialRequirements"
            value={formData.specialRequirements}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CD9F59] focus:border-[#CD9F59]"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#CD9F59] text-white py-3 rounded-lg hover:bg-[#B88D47] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
        </button>
      </form>
    </div>
  );
}