import { test, expect } from '@playwright/test';

test.describe('Tivoli Lotus Court - Final Integration Test', () => {
  test('should load with real data from Supabase and display correctly', async ({ page }) => {
    // Enable console logging to monitor the data flow
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
    console.log('Navigating to Tivoli Lotus Court with real data...');
    await page.goto('http://localhost:5173/hotel/tivoli-lotus-court');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Wait a bit more for data loading
    await page.waitForTimeout(3000);
    
    // Check that navigation is visible (use first() to handle multiple nav elements)
    await expect(page.locator('nav').first()).toBeVisible();
    console.log('✅ Navigation is visible');
    
    // Check that the correct hotel name is displayed
    await expect(page.locator('h1').first()).toContainText('Tivoli Lotus Court');
    console.log('✅ Hotel name contains "Tivoli Lotus Court"');
    
    // Check for real data elements
    await expect(page.locator('text=Noida')).toBeVisible();
    console.log('✅ Location "Noida" is displayed');
    
    // Check for real phone number
    await expect(page.locator('text=9212446306')).toBeVisible();
    console.log('✅ Real phone number is displayed');
    
    // Check for real email
    await expect(page.locator('text=reservations@thetivolihotels.com')).toBeVisible();
    console.log('✅ Real email is displayed');
    
    // Verify sections load without crashing
    await expect(page.locator('text=Welcome').first()).toBeVisible();
    console.log('✅ Overview section loaded');
    
    // Check for real venue capacity
    await expect(page.locator('text=1500').first()).toBeVisible();
    console.log('✅ Real event capacity (1500) is displayed');
    
    // Check for real room count
    await expect(page.locator('text=40').first()).toBeVisible();
    console.log('✅ Real room count (40) is displayed');
    
    // Wait to ensure page remains stable
    await page.waitForTimeout(5000);
    
    // Take a screenshot for verification
    await page.screenshot({ path: 'lotus-court-final-real-data.png', fullPage: true });
    
    // Check that page content remains stable and contains real data
    const finalContent = await page.locator('body').textContent();
    expect(finalContent).toContain('Tivoli Lotus Court');
    expect(finalContent).toContain('Noida');
    expect(finalContent).toContain('9212446306');
    expect(finalContent).toContain('reservations@thetivolihotels.com');
    
    // Verify no critical errors occurred
    const criticalErrors = errors.filter(error => !error.includes('favicon'));
    expect(criticalErrors.length).toBe(0);
    console.log('✅ No critical errors detected');
    
    console.log(`✅ Page loaded successfully with real data (${finalContent?.length || 0} characters)`);
  });

  test('should display real venue spaces from database', async ({ page }) => {
    await page.goto('http://localhost:5173/hotel/tivoli-lotus-court');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    
    // Check for real venue spaces
    await expect(page.locator('text=Main Banquet Hall')).toBeVisible();
    await expect(page.locator('text=15,000 sq ft')).toBeVisible();
    await expect(page.locator('text=Open Lawn')).toBeVisible();
    await expect(page.locator('text=Glasshouse')).toBeVisible();
    
    console.log('✅ All real venue spaces are displayed');
  });

  test('should display real room types from database', async ({ page }) => {
    await page.goto('http://localhost:5173/hotel/tivoli-lotus-court');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    
    // Check for real room types
    await expect(page.locator('text=Standard Room')).toBeVisible();
    await expect(page.locator('text=Super Deluxe Room')).toBeVisible();
    await expect(page.locator('text=200 sq.ft')).toBeVisible();
    await expect(page.locator('text=260 sq.ft')).toBeVisible();
    
    console.log('✅ All real room types are displayed');
  });

  test('should have functional contact and social media links', async ({ page }) => {
    await page.goto('http://localhost:5173/hotel/tivoli-lotus-court');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    
    // Check social media links work (should have href attributes)
    const instagramLink = page.locator('a[href*="instagram.com/tivolilotuscourt"]');
    const facebookLink = page.locator('a[href*="facebook.com/tivolilotuscourt"]');
    
    await expect(instagramLink).toBeVisible();
    await expect(facebookLink).toBeVisible();
    
    console.log('✅ Social media links are functional');
  });
});