/**
 * Routing Update Example
 * How to integrate the enhanced Tivoli page into your routing system
 */

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import the enhanced page
import EnhancedTivoliNewDelhiPage from '@/pages/EnhancedTivoliNewDelhiPage';

// Import existing pages for comparison
import TivoliGrandPalacePage from '@/pages/TivoliGrandPalacePage'; // Original page

/**
 * Option 1: Replace the existing route entirely
 */
export const RoutingOption1 = () => (
  <Routes>
    {/* Other routes */}
    <Route path="/hotels" element={<HotelsPage />} />
    
    {/* Replace original with enhanced page */}
    <Route 
      path="/hotels/tivoli-grand-palace" 
      element={<EnhancedTivoliNewDelhiPage />} 
    />
    
    {/* Other hotel routes */}
    <Route path="/hotels/:slug" element={<HotelPage />} />
  </Routes>
);

/**
 * Option 2: A/B testing approach (run both pages)
 */
export const RoutingOption2 = () => (
  <Routes>
    {/* Original page (for comparison/fallback) */}
    <Route 
      path="/hotels/tivoli-grand-palace" 
      element={<TivoliGrandPalacePage />} 
    />
    
    {/* Enhanced page with new path */}
    <Route 
      path="/hotels/tivoli-grand-palace-enhanced" 
      element={<EnhancedTivoliNewDelhiPage />} 
    />
    
    {/* Redirect to enhanced by default */}
    <Route 
      path="/hotels/tivoli-new-delhi" 
      element={<EnhancedTivoliNewDelhiPage />} 
    />
  </Routes>
);

/**
 * Option 3: Feature flag controlled (recommended for production)
 */
const USE_ENHANCED_PAGE = process.env.REACT_APP_USE_ENHANCED_TIVOLI === 'true';

export const RoutingOption3 = () => (
  <Routes>
    <Route 
      path="/hotels/tivoli-grand-palace" 
      element={
        USE_ENHANCED_PAGE 
          ? <EnhancedTivoliNewDelhiPage /> 
          : <TivoliGrandPalacePage />
      } 
    />
  </Routes>
);

/**
 * Option 4: Integrated into existing dynamic routing
 */
export const RoutingOption4 = () => (
  <Routes>
    {/* Generic hotel page route */}
    <Route path="/hotels/:slug" element={<DynamicHotelPage />} />
  </Routes>
);

// Dynamic hotel page component
const DynamicHotelPage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Use enhanced page for Tivoli New Delhi
  if (slug === 'tivoli-grand-palace') {
    return <EnhancedTivoliNewDelhiPage />;
  }
  
  // Use generic page for other hotels
  return <GenericHotelPage slug={slug} />;
};

/**
 * Environment Variables for Feature Control
 * Add to your .env.local file:
 */
/*
# Feature flags
REACT_APP_USE_ENHANCED_TIVOLI=true
REACT_APP_ENABLE_VIRTUAL_TOURS=true
REACT_APP_ENABLE_DATABASE_MODE=true
*/

/**
 * Quick Migration Guide:
 * 
 * 1. Backup existing routing:
 *    cp src/App.tsx src/App.tsx.backup
 * 
 * 2. Update your main routing file:
 *    - Import EnhancedTivoliNewDelhiPage
 *    - Replace the route for 'tivoli-grand-palace'
 *    - Test the new page functionality
 * 
 * 3. Verify everything works:
 *    - Database connectivity
 *    - Image loading
 *    - Virtual tour integration
 *    - Contact forms
 *    - Mobile responsiveness
 * 
 * 4. Deploy and monitor:
 *    - Check performance metrics
 *    - Monitor error rates
 *    - Validate user experience
 */

export default {
  RoutingOption1,
  RoutingOption2,
  RoutingOption3,
  RoutingOption4,
};