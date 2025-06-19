/**
 * Navigation Component
 * Updated: Implemented fixed navigation that stays at top while scrolling
 * - Added fixed positioning with smooth transitions
 * - Implemented background blur and shadow effects on scroll
 * - Maintained responsive design and mobile menu functionality
 * - Added proper z-index layering to stay above content
 * - Smooth transition between transparent and solid backgrounds
 * - Removed "Meetings" and moved "Weddings" to main navigation
 */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Hotel, MapPin } from 'lucide-react';

const brands = [
  { id: 'tivoli', name: 'The Tivoli', path: '/brands/tivoli' },
  { id: 'wedcation', name: 'Wedcation', path: '/brands/wedcation' },
  { id: 'upper-hse', name: 'The Upper HSE', path: '/brands/upper-hse' },
  { id: 'omnia', name: 'Omnia', path: '/brands/omnia' }
];

const locations = [
  { id: 'delhi', name: 'Delhi', path: '/locations/delhi' },
  { id: 'noida', name: 'Noida', path: '/locations/noida' },
  { id: 'greater-noida', name: 'Greater Noida', path: '/locations/greater-noida' },
  { id: 'ambala', name: 'Ambala', path: '/locations/ambala' },
  { id: 'israna', name: 'Israna', path: '/locations/israna' }
];

export default function Navigation() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scroll state for background effects
      setIsScrolled(currentScrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  // Close mobile menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };

    if (activeDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [activeDropdown]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-neutral-200/20' 
        : isHomePage 
          ? 'bg-transparent' 
          : 'bg-white shadow-sm'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className={`${
                isScrolled || !isHomePage ? 'text-neutral-800' : 'text-white'
              } md:hidden mr-4 hover:opacity-80 transition-opacity`}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <Link 
              to="/" 
              className={`${
                isScrolled || !isHomePage ? 'text-neutral-800' : 'text-white'
              } hover:opacity-80 font-serif text-xl md:text-2xl tracking-wider transition-all duration-300`}
            >
              TIVOLI
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <Link 
                to="/" 
                className={`${
                  isScrolled || !isHomePage ? 'text-neutral-800 hover:text-[#CD9F59]' : 'text-white hover:text-white/80'
                } text-sm uppercase tracking-widest font-sans font-light transition-colors`}
              >
                Hotels
              </Link>
              
              <div className="relative group">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveDropdown(activeDropdown === 'brands' ? null : 'brands');
                  }}
                  className={`${
                    isScrolled || !isHomePage ? 'text-neutral-800 hover:text-[#CD9F59]' : 'text-white hover:text-white/80'
                  } text-sm uppercase tracking-widest font-sans font-light transition-colors flex items-center`}
                >
                  <span>Brands</span>
                  <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-300 ${
                    activeDropdown === 'brands' ? 'rotate-180' : ''
                  }`} />
                </button>
                <div className={`absolute left-0 top-full pt-2 transition-all duration-300 z-50 ${
                  activeDropdown === 'brands' 
                    ? 'opacity-100 pointer-events-auto translate-y-0' 
                    : 'opacity-0 pointer-events-none -translate-y-2'
                }`}>
                  <div className="bg-white py-2 rounded-lg shadow-xl min-w-[200px] border border-neutral-200/20">
                    {brands.map((brand) => (
                      <Link
                        key={brand.id}
                        to={brand.path}
                        className="flex items-center px-4 py-2 text-sm text-neutral-600 hover:text-[#CD9F59] hover:bg-neutral-50 transition-colors"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <Hotel className="w-4 h-4 mr-2" />
                        {brand.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="relative group">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveDropdown(activeDropdown === 'locations' ? null : 'locations');
                  }}
                  className={`${
                    isScrolled || !isHomePage ? 'text-neutral-800 hover:text-[#CD9F59]' : 'text-white hover:text-white/80'
                  } text-sm uppercase tracking-widest font-sans font-light transition-colors flex items-center`}
                >
                  <span>Locations</span>
                  <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-300 ${
                    activeDropdown === 'locations' ? 'rotate-180' : ''
                  }`} />
                </button>
                <div className={`absolute left-0 top-full pt-2 transition-all duration-300 z-50 ${
                  activeDropdown === 'locations' 
                    ? 'opacity-100 pointer-events-auto translate-y-0' 
                    : 'opacity-0 pointer-events-none -translate-y-2'
                }`}>
                  <div className="bg-white py-2 rounded-lg shadow-xl min-w-[200px] border border-neutral-200/20">
                    {locations.map((location) => (
                      <Link
                        key={location.id}
                        to={location.path}
                        className="flex items-center px-4 py-2 text-sm text-neutral-600 hover:text-[#CD9F59] hover:bg-neutral-50 transition-colors"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <MapPin className="w-4 h-4 mr-2" />
                        {location.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              
              <button className={`${
                isScrolled || !isHomePage ? 'text-neutral-800 hover:text-[#CD9F59]' : 'text-white hover:text-white/80'
              } text-sm uppercase tracking-widest font-sans font-light transition-colors`}>
                Offers
              </button>
              
              <button className={`${
                isScrolled || !isHomePage ? 'text-neutral-800 hover:text-[#CD9F59]' : 'text-white hover:text-white/80'
              } text-sm uppercase tracking-widest font-sans font-light transition-colors`}>
                Loyalty
              </button>
              
              <a 
                href="/weddings"
                target="_blank"
                rel="noopener noreferrer" 
                className={`${
                  isScrolled || !isHomePage ? 'text-neutral-800 hover:text-[#CD9F59]' : 'text-white hover:text-white/80'
                } text-sm uppercase tracking-widest font-sans font-light transition-colors`}
              >
                Weddings
              </a>
              
              <Link 
                to="/our-story" 
                className={`${
                  isScrolled || !isHomePage ? 'text-neutral-800 hover:text-[#CD9F59]' : 'text-white hover:text-white/80'
                } text-sm uppercase tracking-widest font-sans font-light transition-colors`}
              >
                Our Story
              </Link>
              
              <Link 
                to="/sustainability" 
                className={`${
                  isScrolled || !isHomePage ? 'text-neutral-800 hover:text-[#CD9F59]' : 'text-white hover:text-white/80'
                } text-sm uppercase tracking-widest font-sans font-light transition-colors`}
              >
                Sustainability
              </Link>
              
              <Link 
                to="/people" 
                className={`${
                  isScrolled || !isHomePage ? 'text-neutral-800 hover:text-[#CD9F59]' : 'text-white hover:text-white/80'
                } text-sm uppercase tracking-widest font-sans font-light transition-colors`}
              >
                People
              </Link>
            </div>
          </div>
        </div>
      </div>
      

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden z-40 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed inset-y-0 left-0 w-[80%] max-w-sm bg-white transform transition-transform duration-300 ease-out md:hidden z-50 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <Link 
            to="/" 
            className="font-serif text-2xl text-neutral-800"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            TIVOLI
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6 text-neutral-600" />
          </button>
        </div>
        <div className="py-4 overflow-y-auto h-full">
          <div className="space-y-1">
            <Link
              to="/"
              className="block px-4 py-3 text-neutral-600 hover:bg-neutral-50 hover:text-[#CD9F59] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Hotels
            </Link>
            <div className="border-b border-neutral-100">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'brands' ? null : 'brands')}
                className="w-full flex items-center justify-between px-4 py-3 text-neutral-600 hover:bg-neutral-50 hover:text-[#CD9F59] transition-colors"
              >
                Brands
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'brands' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'brands' && (
                <div className="bg-neutral-50">
                  {brands.map((brand) => (
                    <Link
                      key={brand.id}
                      to={brand.path}
                      className="block px-8 py-3 text-neutral-600 hover:text-[#CD9F59] transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {brand.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div className="border-b border-neutral-100">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'locations' ? null : 'locations')}
                className="w-full flex items-center justify-between px-4 py-3 text-neutral-600 hover:bg-neutral-50 hover:text-[#CD9F59] transition-colors"
              >
                Locations
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'locations' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'locations' && (
                <div className="bg-neutral-50">
                  {locations.map((location) => (
                    <Link
                      key={location.id}
                      to={location.path}
                      className="flex items-center px-8 py-2 text-sm text-neutral-600 hover:text-[#CD9F59] transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      {location.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <a
              href="#"
              className="block px-4 py-3 text-neutral-600 hover:bg-neutral-50 hover:text-[#CD9F59] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Offers
            </a>
            <a
              href="#"
              className="block px-4 py-3 text-neutral-600 hover:bg-neutral-50 hover:text-[#CD9F59] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Loyalty
            </a>
            <a
              href="/weddings"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-3 text-neutral-600 hover:bg-neutral-50 hover:text-[#CD9F59] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Weddings
            </a>
            <Link
              to="/our-story"
              className="block px-4 py-3 text-neutral-600 hover:bg-neutral-50 hover:text-[#CD9F59] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Our Story
            </Link>
            <Link
              to="/sustainability"
              className="block px-4 py-3 text-neutral-600 hover:bg-neutral-50 hover:text-[#CD9F59] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sustainability
            </Link>
            <Link
              to="/people"
              className="block px-4 py-3 text-neutral-600 hover:bg-neutral-50 hover:text-[#CD9F59] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              People
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}