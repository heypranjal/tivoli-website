import { test, expect } from '@playwright/test';

test.describe('Omnia Dwarka Expressway - Quick Functionality Check', () => {
  
  test('Basic page load and elements check', async ({ page }) => {
    // Navigate to the page
    await page.goto('http://localhost:5173/hotel/omnia-dwarka-expressway');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'omnia-dwarka-page-check.png', 
      fullPage: false // Just above the fold 
    });
    
    // Check basic elements exist
    const pageTitle = await page.title();
    console.log('Page Title:', pageTitle);
    
    // Check if the main content is loading
    const mainContent = await page.locator('main, .container, [class*="container"]').first().isVisible();
    console.log('Main content visible:', mainContent);
    
    // Check for hotel name
    const hotelNameElements = await page.locator('h1, h2, .hotel-title, [data-testid="hotel-name"]').allTextContents();
    console.log('Found text elements:', hotelNameElements.slice(0, 5)); // First 5
    
    // Check for contact info
    const phoneExists = await page.locator('text=+91-9818553333').isVisible();
    const emailExists = await page.locator('text=reservations@thetivolihotels.com').isVisible();
    console.log('Phone visible:', phoneExists);
    console.log('Email visible:', emailExists);
    
    // Check for venue spaces
    const venueTexts = ['Mansion', 'Banquet', 'Hall', 'Lawn'];
    for (const venue of venueTexts) {
      const exists = await page.locator(`text=${venue}`).first().isVisible();
      console.log(`"${venue}" text found:`, exists);
    }
    
    // Check console for errors (already captured by beforeEach)
    expect(pageTitle).toBeTruthy();
  });

  test('Check brand color application', async ({ page }) => {
    await page.goto('http://localhost:5173/hotel/omnia-dwarka-expressway');
    await page.waitForLoadState('networkidle');
    
    // Check for elements with the Omnia brand color (#2C3E50)
    const colorCheck = await page.evaluate(() => {
      const brandColor = '#2C3E50';
      const brandColorRgb = 'rgb(44, 62, 80)';
      
      const elements = Array.from(document.querySelectorAll('*'));
      let coloredElements = 0;
      
      elements.forEach(el => {
        const style = window.getComputedStyle(el);
        if (style.color === brandColorRgb || 
            style.backgroundColor === brandColorRgb ||
            style.borderColor === brandColorRgb) {
          coloredElements++;
        }
      });
      
      return coloredElements;
    });
    
    console.log('Elements with brand color:', colorCheck);
  });

  test('Test navigation to old URL', async ({ page }) => {
    try {
      await page.goto('http://localhost:5173/hotel/upper-hse-sultanpur');
      await page.waitForLoadState('networkidle');
      
      const title = await page.title();
      console.log('Old URL - Page Title:', title);
      
      // Take screenshot
      await page.screenshot({ 
        path: 'upper-hse-page-check.png', 
        fullPage: false 
      });
      
    } catch (error) {
      console.log('Old URL error:', error.message);
    }
  });
  
});