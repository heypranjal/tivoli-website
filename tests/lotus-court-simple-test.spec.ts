import { test, expect } from '@playwright/test';

test.describe('Tivoli Lotus Court Simple Page', () => {
  test('should load and display content without crashing', async ({ page }) => {
    // Enable console logging to catch any errors
    const consoleLogs: string[] = [];
    const errors: string[] = [];
    
    page.on('console', msg => {
      consoleLogs.push(`${msg.type()}: ${msg.text()}`);
      if (msg.type() === 'error') {
        console.log(`Console Error: ${msg.text()}`);
      }
    });
    
    page.on('pageerror', error => {
      errors.push(error.message);
      console.log(`Page Error: ${error.message}`);
    });

    // Navigate to the Lotus Court page
    console.log('Navigating to Lotus Court page...');
    await page.goto('http://localhost:5173/hotel/tivoli-lotus-court');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check that navigation is visible
    await expect(page.locator('nav')).toBeVisible();
    console.log('✅ Navigation is visible');
    
    // Check that the hotel name is displayed
    await expect(page.locator('h1').first()).toContainText('Tivoli Lotus Court');
    console.log('✅ Hotel name is displayed');
    
    // Check that sections are visible
    await expect(page.locator('text=Welcome to Tivoli Lotus Court')).toBeVisible();
    console.log('✅ Overview section is visible');
    
    await expect(page.locator('text=Event Spaces')).toBeVisible();
    console.log('✅ Event Spaces section is visible');
    
    await expect(page.locator('text=Dining Experiences')).toBeVisible();
    console.log('✅ Dining section is visible');
    
    await expect(page.locator('text=Get in Touch')).toBeVisible();
    console.log('✅ Contact section is visible');
    
    // Wait a bit to ensure page remains stable
    await page.waitForTimeout(3000);
    
    // Take a screenshot for verification
    await page.screenshot({ path: 'lotus-court-simple-working.png', fullPage: true });
    
    // Check that page content remains stable
    const finalContent = await page.locator('body').textContent();
    expect(finalContent).toContain('Tivoli Lotus Court');
    expect(finalContent).toContain('Event Spaces');
    expect(finalContent).toContain('Dining Experiences');
    
    // Verify no errors occurred
    expect(errors.length).toBe(0);
    console.log('✅ No page errors detected');
    
    console.log(`✅ Page loaded successfully with ${finalContent?.length || 0} characters of content`);
  });

  test('should verify all event spaces are displayed', async ({ page }) => {
    await page.goto('http://localhost:5173/hotel/tivoli-lotus-court');
    await page.waitForLoadState('networkidle');
    
    // Check for specific event spaces
    await expect(page.locator('text=Lotus Grand Ballroom')).toBeVisible();
    await expect(page.locator('text=Crystal Hall')).toBeVisible();
    await expect(page.locator('text=Garden Pavilion')).toBeVisible();
    
    console.log('✅ All event spaces are visible');
  });

  test('should verify all dining venues are displayed', async ({ page }) => {
    await page.goto('http://localhost:5173/hotel/tivoli-lotus-court');
    await page.waitForLoadState('networkidle');
    
    // Check for specific dining venues
    await expect(page.locator('text=Spice Route')).toBeVisible();
    await expect(page.locator('text=Lotus Café')).toBeVisible();
    await expect(page.locator('text=Courtyard Bar')).toBeVisible();
    
    console.log('✅ All dining venues are visible');
  });

  test('should verify contact information is displayed', async ({ page }) => {
    await page.goto('http://localhost:5173/hotel/tivoli-lotus-court');
    await page.waitForLoadState('networkidle');
    
    // Check for contact information
    await expect(page.locator('text=+91-120-4567-8901')).toBeVisible();
    await expect(page.locator('text=reservations@tivolilotuscourt.com')).toBeVisible();
    
    console.log('✅ Contact information is visible');
  });
});