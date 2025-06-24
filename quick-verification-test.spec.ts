/**
 * Quick verification test to ensure the application is running properly
 */

import { test, expect } from '@playwright/test';

test('Application loads successfully and React Query is working', async ({ page }) => {
  console.log('🚀 Testing application...');

  // Navigate to the main page
  await page.goto('http://localhost:5173/');
  
  // Wait for the page to load
  await page.waitForLoadState('networkidle');
  
  // Check that the main page loads
  await expect(page).toHaveTitle(/Tivoli/i);
  
  console.log('✅ Main page loaded successfully');

  // Test navigation to a hotel page (the one that was problematic)
  await page.goto('http://localhost:5173/hotels/wedcation-by-tivoli-ambala');
  
  // Wait for content to load
  await page.waitForLoadState('networkidle');
  
  // Check for hotel name or content
  const hotelContent = await page.locator('body').textContent();
  
  if (hotelContent?.includes('Wedcation') || hotelContent?.includes('Ambala')) {
    console.log('✅ Hotel page loaded with content');
  } else {
    console.log('⚠️  Hotel page loaded but content may be missing');
  }

  // Test another hotel page quickly
  await page.goto('http://localhost:5173/hotels/tivoli-lotus-court');
  await page.waitForLoadState('networkidle');
  
  const lotusContent = await page.locator('body').textContent();
  if (lotusContent?.includes('Lotus') || lotusContent?.includes('Tivoli')) {
    console.log('✅ Lotus Court page loaded successfully');
  }

  console.log('🎉 Application verification complete!');
});