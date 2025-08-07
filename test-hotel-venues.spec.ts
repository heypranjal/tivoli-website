import { test, expect } from '@playwright/test';

// Test all 12 hotel venues are accessible
const hotels = [
  // TIVOLI BRAND
  { name: 'The Tivoli-New Delhi', url: '/hotel/tivoli-grand-palace' },
  { name: 'Tivoli Royal Palace', url: '/hotel/tivoli-royal-suite' },
  { name: 'Tivoli Heritage Palace', url: '/hotel/tivoli-heritage-palace' },
  { name: 'Tivoli Lotus Court', url: '/hotel/tivoli-lotus-court' },
  { name: 'Tivoli Bijwasan', url: '/hotel/tivoli-bijwasan' },
  { name: 'Tivoli Royal Court - Okhla', url: '/hotel/tivoli-royal-court-okhla' },
  
  // OMNIA BRAND
  { name: 'Omnia by Tivoli-Dwarka Expressway', url: '/hotel/omnia-dwarka-expressway' },
  { name: 'Omnia by Tivoli-Greater Noida', url: '/hotel/omnia-greater-noida' },
  { name: 'Omnia by Tivoli-Noida', url: '/hotel/omnia-noida' },
  
  // UPPER HSE BRAND
  { name: 'The Upper HSE - Sultanpur by Tivoli', url: '/hotel/upper-hse-sultanpur' },
  
  // WEDCATION BRAND
  { name: 'Wedcation by Tivoli-Ambala', url: '/hotel/wedcation-by-tivoli-ambala' },
  { name: 'Wedcation by Tivoli-Israna', url: '/hotel/wedcation-by-tivoli-israna' }
];

test.describe('Hotel Venues Accessibility Test', () => {
  for (const hotel of hotels) {
    test(`should load ${hotel.name} at ${hotel.url}`, async ({ page }) => {
      // Navigate to the hotel page
      await page.goto(`http://localhost:5173${hotel.url}`);
      
      // Wait for the page to load
      await page.waitForLoadState('networkidle', { timeout: 30000 });
      
      // Check that the page doesn't show a 404 or error
      const title = await page.title();
      expect(title).not.toContain('404');
      expect(title).not.toContain('Error');
      
      // Check that the main content loaded (hotel name should be visible)
      const bodyText = await page.textContent('body');
      expect(bodyText).toBeTruthy();
      
      // Look for common hotel page elements
      const hasHotelContent = await page.locator('h1, h2, .hotel-name, [data-testid="hotel-name"]').count() > 0;
      expect(hasHotelContent).toBeTruthy();
      
      // Take a screenshot for verification
      await page.screenshot({ 
        path: `hotel-${hotel.url.replace('/hotel/', '').replace('/', '-')}.png`,
        fullPage: true 
      });
      
      console.log(`✅ ${hotel.name} loaded successfully at ${hotel.url}`);
    });
  }
});

test('should have corrected Heritage Palace URL', async ({ page }) => {
  // Test the corrected Heritage Palace URL
  await page.goto('http://localhost:5173/hotel/tivoli-heritage-palace');
  
  // Wait for the page to load
  await page.waitForLoadState('networkidle', { timeout: 30000 });
  
  // Check that it loads successfully
  const title = await page.title();
  expect(title).not.toContain('404');
  
  // Check that the page contains Heritage Palace content
  const bodyText = await page.textContent('body');
  expect(bodyText).toContain('Heritage Palace');
  
  console.log('✅ Heritage Palace URL corrected and working: /hotel/tivoli-heritage-palace');
});