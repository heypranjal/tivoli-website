/**
 * App Component - Refactored for Supabase
 * Phase 4: Component Refactoring
 * Updated: 2025-06-20
 * 
 * Now uses dynamic HotelPage component instead of individual hotel pages
 */
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';
import { StagewiseToolbar } from '@stagewise/toolbar-react';
import { ReactPlugin } from '@stagewise-plugins/react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import OurHotels from './components/OurHotels';
import Locations from './components/Locations';
import Experiences from './components/Experiences';
import CulinaryDelight from './components/CulinaryDelight';
import UpcomingHotels from './components/UpcomingHotels';
import OurStory from './components/OurStory';
import AwardsAccolades from './components/AwardsAccolades';
import Press from './components/Press';
import LinkedInFeed from './components/LinkedInFeed';
import HotelPage from './pages/HotelPage';
import People from './pages/Investors';
import DigitalQRPage from './pages/DigitalQRPage';
import LocationsPage from './pages/LocationsPage';
import BrandsPage from './pages/BrandsPage';
import SustainabilityPage from './pages/SustainabilityPage';
import OurStoryPage from './pages/OurStoryPage';
import MonitoringPage from './pages/MonitoringPage';
import WeddingPage from './pages/WeddingPage';

function App() {
  return (
    <div className="min-h-screen bg-white">
    <StagewiseToolbar
      config={{
        plugins: [ReactPlugin],
      }}
    />
      <Navigation />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <main>
              <OurHotels />
              <OurStory />
              <Locations />
              <Experiences />
              <CulinaryDelight />
              <AwardsAccolades />
              <Press />
              <LinkedInFeed />
              <UpcomingHotels />
            </main>
          </>
        } />
        <Route path="/people" element={<People />} />
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="/locations/:location" element={<LocationsPage />} />
        <Route path="/brands/:brand" element={<LocationsPage />} />
        <Route path="/brands" element={<BrandsPage />} />
        <Route path="/our-story" element={<OurStoryPage />} />
        <Route path="/sustainability" element={<SustainabilityPage />} />
        <Route path="/digital-qr" element={<DigitalQRPage />} />
        <Route path="/monitoring" element={<MonitoringPage />} />
        <Route path="/weddings" element={<WeddingPage />} />
        {/* Dynamic hotel pages - all hotels now use single HotelPage component */}
        <Route path="/hotel/:hotelSlug" element={<HotelPage />} />
        {/* Redirect for renamed hotel */}
        <Route path="/hotel/tivoli-grand-palace" element={<Navigate to="/hotel/the-tivoli" replace />} />
        {/* Legacy route support for SEO - redirects to new dynamic routing */}
        <Route path="/:location/:hotelSlug" element={<HotelPage />} />
        <Route path="/:brand/:hotelSlug" element={<HotelPage />} />
      </Routes>
      <footer className="bg-[#001d3d] text-white py-6 md:py-10">
        <div className="container mx-auto px-4 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Head Office */}
            <div className="space-y-4">
              <div>
                <h4 className="font-sans text-xs uppercase tracking-widest mb-2">Head Office</h4>
                <div className="space-y-3">
                  <div className="flex items-start text-neutral-300">
                    <MapPin className="w-5 h-5 mr-2 mt-1 text-[#CD9F59] flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">Tivoli Hospitality Group</p>
                      <p className="font-light text-xs text-neutral-400">1-Chhatrpur, New Delhi-110074, India</p>
                    </div>
                  </div>
                  <a href="mailto:amit.sood@thetivolihotels.com" className="flex items-center text-neutral-300 hover:text-[#CD9F59] transition-colors">
                    <Mail className="w-4 h-4 mr-2" />
                    <span className="font-light text-xs">amit.sood@thetivolihotels.com</span>
                  </a>
                  <a href="tel:01147479999" className="flex items-center text-neutral-300 hover:text-[#CD9F59] transition-colors">
                    <Phone className="w-4 h-4 mr-2" />
                    <span className="font-light text-xs">01147479999</span>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Tivoli Net */}
            <div className="space-y-3 md:space-y-4">
              <h4 className="font-sans text-xs uppercase tracking-widest mb-1">Tivoli Net</h4>
              <p className="text-neutral-400 text-xs font-light mb-1">Regional Sales & Reservations</p>
              <div className="space-y-2">
                <p className="text-neutral-300 font-medium text-sm">The Tivoli</p>
                <p className="text-neutral-300 font-medium text-sm">Omnia</p>
                <p className="text-neutral-300 font-medium text-sm">The Upper HSE</p>
                <p className="text-neutral-300 font-medium text-sm">Wedcation</p>
              </div>
              <div className="space-y-3">
                <a href="/tivolinet" className="flex items-center text-neutral-300 hover:text-[#CD9F59] transition-colors">
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="font-light text-xs">View All Regional Offices</span>
                </a>
                <a href="tel:01147479999" className="flex items-center text-neutral-300 hover:text-[#CD9F59] transition-colors">
                  <Phone className="w-4 h-4 mr-2" />
                  <span className="font-light text-xs">Central Reservations: 01147479999</span>
                </a>
              </div>
            </div>
            
            <div className="space-y-3 md:space-y-4">
              <h4 className="font-sans text-xs uppercase tracking-widest mb-1">Hotel Locations</h4>
              <ul className="space-y-3">
                <li className="flex items-start text-neutral-300">
                  <MapPin className="w-5 h-5 mr-2 mt-1 text-[#CD9F59] flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Delhi location</p>
                    <p className="font-light text-xs text-neutral-400">The Tivoli New Delhi, Tivoli Bijwasan, Tivoli Royal court - Okhla, Tivoli Upper HSE, Omnia by Tivoli Dwarka Expressway</p>
                  </div>
                </li>
                <li className="flex items-start text-neutral-300">
                  <MapPin className="w-5 h-5 mr-2 mt-1 text-[#CD9F59] flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Noida location</p>
                    <p className="font-light text-xs text-neutral-400">Tivoli Lotus court - Noida</p>
                  </div>
                </li>
                <li className="flex items-start text-neutral-300">
                  <MapPin className="w-5 h-5 mr-2 mt-1 text-[#CD9F59] flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">PANIPAT</p>
                    <p className="font-light text-xs text-neutral-400">Wedcation by Tivoli Israna Panipat</p>
                  </div>
                </li>
                <li className="flex items-start text-neutral-300">
                  <MapPin className="w-5 h-5 mr-2 mt-1 text-[#CD9F59] flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">AMBALA</p>
                    <p className="font-light text-xs text-neutral-400">Wedcation by Tivoli Ambala</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="space-y-3 md:space-y-4 md:col-span-3">
              <h4 className="font-sans text-xs uppercase tracking-widest mb-1">Find Us</h4>
              <div className="w-full h-[100px] md:h-[150px] rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.6733831702897!2d77.18273957549579!3d28.496635075739174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1e25a8f714c1%3A0x9bc15e7b965ec179!2sThe%20Tivoli!5e0!3m2!1sen!2sin!4v1710934800000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
         <div className="mt-5 md:mt-8 pt-4 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
              <p className="text-neutral-400 text-xs">
                © 2025 Tivoli Hotels & Resorts. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center gap-3 md:gap-4 text-xs text-neutral-400">
                <a href="https://docs.google.com/document/d/1u-V_fFaQ38qcNdsPJHTkgSfqM5ZNQr8IO0cRCJdkQZ8/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="hover:text-[#CD9F59] transition-colors">Privacy Policy</a>
                <a href="https://docs.google.com/document/d/1ZhGmgPL8-UrSvSTQdR8RMRV3XYZvSFCyYXpghNfKop0/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="hover:text-[#CD9F59] transition-colors">Terms of Service</a>
                <a href="/digital-qr" target="_blank" rel="noopener noreferrer" className="hover:text-[#CD9F59] transition-colors">Digital QR</a>
                <a href="#" className="hover:text-[#CD9F59] transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
