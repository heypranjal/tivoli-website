// Career page component for Tivoli Hotels - Created with luxury theme styling
// Includes professional job application form with Supabase integration

import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Upload, FileText, Heart, Send } from 'lucide-react';
import { careerService } from '@/lib/supabase-services';

export default function CareersPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    cv: null as File | null,
    coverLetter: '',
    role: '',
    whyJoin: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        cv: file
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Submit to Supabase
      await careerService.submitApplication({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        position: formData.role,
        coverLetter: formData.coverLetter,
        motivation: formData.whyJoin,
        cvFilename: formData.cv?.name
      });
      
      setSubmitSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          name: '',
          phone: '',
          email: '',
          address: '',
          cv: null,
          coverLetter: '',
          role: '',
          whyJoin: ''
        });
      }, 3000);
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitError('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableRoles = [
    'Front Desk Associate',
    'Concierge',
    'Housekeeping Supervisor',
    'Food & Beverage Manager',
    'Chef',
    'Banquet Manager',
    'Sales Executive',
    'Marketing Specialist',
    'IT Support',
    'Finance Associate',
    'Human Resources',
    'Maintenance Engineer',
    'Guest Relations',
    'Event Coordinator',
    'Other'
  ];

  return (
    <section className="pt-20 pb-10 md:pt-24 md:pb-14 relative">
      {/* Decorative border elements */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#CD9F59]/30 to-transparent" />
      
      <div className="container mx-auto px-4 md:px-12">
        {/* Hero section */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-sm uppercase tracking-[0.2em] text-[#CD9F59] font-sans">
            Join Our Team
          </span>
          <h1 className="font-serif text-3xl md:text-5xl leading-tight font-medium tracking-wide mt-2 mb-6 text-neutral-600">
            Build Your Career with Tivoli
          </h1>
          <div className="max-w-2xl mx-auto">
            <p className="font-light text-neutral-600 leading-relaxed text-sm md:text-base">
              At Tivoli Hotels, we believe that exceptional hospitality begins with exceptional people. 
              Join our family of dedicated professionals who create unforgettable experiences for our guests.
            </p>
          </div>
        </div>

        {/* Company Culture Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center mb-16 md:mb-20">
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/thetivolinewdelhi1//Aria-2.png"
                alt="Our Culture - Tivoli Hotels Team"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-5 h-5 text-[#CD9F59]" />
                  <span className="text-sm font-medium">Our Culture</span>
                </div>
                <p className="text-xs opacity-90">Excellence in Hospitality</p>
              </div>
            </div>
          </div>
          
          <div className="lg:pl-12">
            <span className="text-sm uppercase tracking-[0.2em] text-[#CD9F59] font-sans">
              Why Choose Tivoli
            </span>
            <h2 className="font-serif text-2xl md:text-4xl leading-tight font-medium tracking-wide mb-4 md:mb-6 text-neutral-600">
              A Place Where Careers Flourish
            </h2>
            <div className="space-y-3 md:space-y-4">
              <p className="font-light text-neutral-600 leading-relaxed text-sm md:text-base">
                We offer a dynamic work environment where creativity meets luxury, and every team member 
                is valued for their unique contributions to our success.
              </p>
              <ul className="space-y-2 text-neutral-600 text-sm md:text-base">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#CD9F59] rounded-full mt-2 flex-shrink-0" />
                  <span>Competitive compensation and benefits</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#CD9F59] rounded-full mt-2 flex-shrink-0" />
                  <span>Professional development opportunities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#CD9F59] rounded-full mt-2 flex-shrink-0" />
                  <span>Collaborative and inclusive work culture</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#CD9F59] rounded-full mt-2 flex-shrink-0" />
                  <span>Employee recognition programs</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Application Form Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-sm uppercase tracking-[0.2em] text-[#CD9F59] font-sans">
              Apply Now
            </span>
            <h2 className="font-serif text-2xl md:text-3xl leading-tight font-medium tracking-wide mt-2 mb-4 text-neutral-600">
              Start Your Journey with Us
            </h2>
            <p className="font-light text-neutral-600 leading-relaxed text-sm md:text-base max-w-2xl mx-auto">
              Submit your application below and become part of our commitment to excellence in hospitality.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-[#CD9F59]/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-700">Full Name *</label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#CD9F59] transition-colors pl-11"
                    placeholder="Enter your full name"
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                </div>
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-700">Phone Number *</label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#CD9F59] transition-colors pl-11"
                    placeholder="Enter your phone number"
                  />
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-700">Email Address *</label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#CD9F59] transition-colors pl-11"
                    placeholder="Enter your email address"
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                </div>
              </div>

              {/* Role Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-700">Position of Interest *</label>
                <div className="relative">
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#CD9F59] transition-colors appearance-none"
                  >
                    <option value="">Select a position</option>
                    {availableRoles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                    <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Field */}
            <div className="space-y-2 mb-6">
              <label className="block text-sm font-medium text-neutral-700">Address *</label>
              <div className="relative">
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#CD9F59] transition-colors pl-11"
                  placeholder="Enter your complete address"
                />
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              </div>
            </div>

            {/* CV Upload */}
            <div className="space-y-2 mb-6">
              <label className="block text-sm font-medium text-neutral-700">Upload CV/Resume *</label>
              <div className="relative">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  required
                  className="hidden"
                  id="cv-upload"
                />
                <label
                  htmlFor="cv-upload"
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none hover:border-[#CD9F59] transition-colors cursor-pointer flex items-center gap-3"
                >
                  <Upload className="w-5 h-5 text-neutral-400" />
                  <span className="text-neutral-600">
                    {formData.cv ? formData.cv.name : 'Choose file (PDF, DOC, DOCX)'}
                  </span>
                </label>
              </div>
            </div>

            {/* Cover Letter */}
            <div className="space-y-2 mb-6">
              <label className="block text-sm font-medium text-neutral-700">Cover Letter</label>
              <div className="relative">
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#CD9F59] transition-colors resize-none"
                  placeholder="Tell us about your background and experience..."
                />
                <FileText className="absolute left-3 top-3 w-5 h-5 text-neutral-400" />
              </div>
            </div>

            {/* Why Join Tivoli */}
            <div className="space-y-2 mb-8">
              <label className="block text-sm font-medium text-neutral-700">Why do you want to join Tivoli? *</label>
              <textarea
                name="whyJoin"
                value={formData.whyJoin}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#CD9F59] transition-colors resize-none"
                placeholder="Share your motivation for wanting to be part of the Tivoli family..."
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-[#CD9F59] text-white rounded-lg hover:bg-[#B88D47] transition-colors duration-300 font-medium tracking-wide disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Submit Application</span>
                  </>
                )}
              </button>
            </div>

            {/* Success Message */}
            {submitSuccess && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-green-700 font-medium">
                    Application submitted successfully! We'll get back to you soon.
                  </span>
                </div>
              </div>
            )}

            {/* Error Message */}
            {submitError && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <span className="text-red-700 font-medium">
                    {submitError}
                  </span>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}