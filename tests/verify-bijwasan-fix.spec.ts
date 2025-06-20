import { test, expect } from '@playwright/test';

test('Verify Tivoli Bijwasan Page Fix', async ({ page }) => {
  console.log('🔍 Testing if /delhi/tivoli-bijwasan loads correctly after fix...');

  // Listen for console errors
  const consoleErrors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
      console.log('❌ Console Error:', msg.text());
    }
  });

  // Listen for page errors
  const pageErrors: string[] = [];
  page.on('pageerror', error => {
    pageErrors.push(error.message);
    console.log('💥 Page Error:', error.message);
  });

  console.log('📍 Navigating to /delhi/tivoli-bijwasan...');
  
  // Navigate to the page
  const response = await page.goto('http://localhost:5173/delhi/tivoli-bijwasan', {
    waitUntil: 'networkidle',
    timeout: 15000
  });
  
  console.log('📊 Response status:', response?.status());
  
  // Wait for React to render
  await page.waitForTimeout(1000);
  
  // Check if navigation component is rendered
  const navExists = await page.locator('nav').count();
  console.log('🧭 Navigation component found:', navExists > 0);
  
  // Check if hotel title is rendered
  const hotelTitle = await page.locator('h1').textContent().catch(() => '');
  console.log('🏨 Hotel title found:', hotelTitle || 'None');
  
  // Check if main content is rendered
  const mainContent = await page.locator('.container, main, #root > div').count();
  console.log('📄 Main content containers found:', mainContent);
  
  // Take screenshot for verification
  await page.screenshot({ 
    path: 'bijwasan-page-fixed.png', 
    fullPage: false 
  });
  console.log('📸 Screenshot saved as bijwasan-page-fixed.png');

  // Verify the page loaded successfully
  expect(response?.status()).toBe(200);
  expect(navExists).toBeGreaterThan(0);
  expect(mainContent).toBeGreaterThan(0);
  
  // Check for critical errors that would break the page
  const criticalErrors = pageErrors.filter(error => 
    error.includes('setIsMobile') || 
    error.includes('setIsPortrait') || 
    error.includes('setShowAllImages')
  );
  
  console.log('🎯 Critical errors found:', criticalErrors.length);
  criticalErrors.forEach(error => console.log('  -', error));
  
  expect(criticalErrors.length).toBe(0);

  console.log('✅ Bijwasan page verification complete!');
});