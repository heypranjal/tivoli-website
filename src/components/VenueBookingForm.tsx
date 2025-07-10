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
import React, { useState, useEffect } from 'react';
import { Calendar, Users, Phone, Mail, ChevronDown, CheckCircle, AlertCircle, Loader2, MapPin } from 'lucide-react';
import { supabaseHelpers, VenueBooking, Hotel } from '@/lib/supabase';

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
  selectedHotel: string;
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
    selectedHotel: '',
    needsRooms: false,
    budgetRange: '',
    specialRequirements: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Hotel management state
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isLoadingHotels, setIsLoadingHotels] = useState(true);
  const [hotelError, setHotelError] = useState<string | null>(null);
  const [selectedHotelInfo, setSelectedHotelInfo] = useState<Hotel | null>(null);

  // Fetch hotels on component mount
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setIsLoadingHotels(true);
        setHotelError(null);
        
        // Fetch only active hotels by default
        // To exclude specific hotels, pass excludeHotelIds in options
        const activeHotels = await supabaseHelpers.getActiveHotels();
        setHotels(activeHotels);
      } catch (error) {
        console.error('Failed to fetch hotels:', error);
        setHotelError('Failed to load hotels. Please refresh the page.');
      } finally {
        setIsLoadingHotels(false);
      }
    };

    fetchHotels();
  }, []);

  // Handle hotel selection
  const handleHotelChange = (hotelId: string) => {
    setFormData({ ...formData, selectedHotel: hotelId });
    
    // Update selected hotel info for display
    if (hotelId) {
      const hotel = hotels.find(h => h.id === hotelId);
      setSelectedHotelInfo(hotel || null);
    } else {
      setSelectedHotelInfo(null);
    }
  };

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
        venue_id: formData.selectedHotel || null,
        needs_rooms: formData.needsRooms,
        budget_range: formData.budgetRange || null,
        special_requirements: formData.specialRequirements.trim() || null,
        status: 'pending'
      };

      // Submit to Supabase
      const result = await supabaseHelpers.createVenueBooking(booking);
      
      // Create lead entry for tracking with customer information
      await supabaseHelpers.createLead({
        source: 'venue_booking',
        booking_id: result.id,
        customer_name: formData.name.trim(),
        customer_email: formData.email.trim().toLowerCase(),
        customer_phone: formData.phone.trim(),
        status: 'new',
        notes: `Venue booking request${selectedHotelInfo ? ` for ${selectedHotelInfo.name} - ${selectedHotelInfo.city}, ${selectedHotelInfo.state}` : ''} - ${formData.eventType} event on ${formData.eventDate} for ${formData.pax} guests` + 
               (formData.budgetRange ? ` (Budget: ${formData.budgetRange})` : '') +
               (formData.specialRequirements ? ` - ${formData.specialRequirements}` : '')
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
          selectedHotel: '',
          needsRooms: false,
          budgetRange: '',
          specialRequirements: ''
        });
        setSelectedHotelInfo(null);
        setSubmitStatus('idle');
      }, 3000);

    } catch (error) {
      // Enhanced error logging for debugging
      console.error('=== VENUE BOOKING FORM ERROR DEBUG ===');
      console.error('Full error object:', error);
      console.error('Error type:', typeof error);
      console.error('Error constructor:', error?.constructor?.name);
      
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      
      // Check if it's a Supabase error
      if (error && typeof error === 'object' && 'code' in error) {
        console.error('Supabase error code:', (error as any).code);
        console.error('Supabase error details:', (error as any).details);
        console.error('Supabase error hint:', (error as any).hint);
        console.error('Supabase error message:', (error as any).message);
      }
      
      // Log the booking data that failed
      console.error('Failed booking data:', booking);
      console.error('Form data at time of error:', formData);
      console.error('========================================');
      
      setSubmitStatus('error');
      
      // Provide more specific error messages
      let userMessage = 'An unexpected error occurred';
      if (error instanceof Error) {
        userMessage = error.message;
      } else if (error && typeof error === 'object' && 'message' in error) {
        userMessage = (error as any).message;
      }
      
      setErrorMessage(userMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F8F9FA] py-10">
      <div className="max-w-5xl mx-auto">

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
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#CD9F59] transition-colors font-serif text-sm font-light"
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
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#CD9F59] transition-colors appearance-none font-serif text-sm font-light"
                >
                  <option value="">Select event type</option>
                  {eventTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
              </div>
            </div>

            {/* Hotel/Venue Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">
                <MapPin className="w-4 h-4 inline-block mr-1" />
                Hotel/Venue
              </label>
              <div className="relative">
                {isLoadingHotels ? (
                  <div className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg flex items-center font-serif text-sm font-light">
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    <span className="text-neutral-500">Loading hotels...</span>
                  </div>
                ) : hotelError ? (
                  <div className="w-full px-4 py-2.5 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm font-serif font-light">
                    {hotelError}
                  </div>
                ) : (
                  <>
                    <select
                      value={formData.selectedHotel}
                      onChange={(e) => handleHotelChange(e.target.value)}
                      className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#CD9F59] transition-colors appearance-none font-serif text-sm font-light"
                    >
                      <option value="">Select a hotel (Optional)</option>
                      {hotels.map(hotel => (
                        <option key={hotel.id} value={hotel.id}>
                          {hotel.name} - {hotel.city}, {hotel.state}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
                  </>
                )}
              </div>
              {/* Selected hotel location display */}
              {selectedHotelInfo && (
                <div className="mt-2 text-sm text-neutral-600 bg-neutral-50 px-3 py-2 rounded-lg border font-serif font-light">
                  <MapPin className="w-3 h-3 inline-block mr-1" />
                  <span className="font-medium">{selectedHotelInfo.name}</span>
                  <span className="mx-2">•</span>
                  <span>{selectedHotelInfo.city}, {selectedHotelInfo.state}</span>
                </div>
              )}
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
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#CD9F59] transition-colors font-serif text-sm font-light"
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
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#CD9F59] transition-colors font-serif text-sm font-light"
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
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#CD9F59] transition-colors font-serif text-sm font-light"
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
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#CD9F59] transition-colors font-serif text-sm font-light"
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
                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#CD9F59] transition-colors appearance-none font-serif text-sm font-light"
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
              className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#CD9F59] transition-colors resize-none font-serif text-sm font-light"
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