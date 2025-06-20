import { test, expect } from '@playwright/test';

test('Verify Bijwasan Link Fix', async ({ page }) => {
  console.log('🔍 Testing if Tivoli Bijwasan link now points to correct URL...');

  // Navigate to home page
  await page.goto('http://localhost:5173/', {
    waitUntil: 'networkidle',
    timeout: 15000
  });
  
  console.log('🏠 Home page loaded');

  // Find the Tivoli Bijwasan link
  const bijwasanLink = page.locator('a').filter({ hasText: /tivoli.*bijwasan/i }).first();
  
  // Check if the link exists
  const linkExists = await bijwasanLink.count() > 0;
  console.log('🔗 Tivoli Bijwasan link found:', linkExists);
  
  if (linkExists) {
    // Get the href attribute
    const href = await bijwasanLink.getAttribute('href');
    console.log('📍 Link href:', href);
    
    // Verify it's the correct URL
    expect(href).toBe('/delhi/tivoli-bijwasan');
    console.log('✅ Link href is correct!');
    
    // Click the link and verify it navigates correctly
    console.log('🖱️ Clicking the Tivoli Bijwasan link...');
    await bijwasanLink.click();
    
    // Wait for navigation
    await page.waitForLoadState('networkidle');
    
    // Check current URL
    const currentUrl = page.url();
    console.log('🌐 Current URL after click:', currentUrl);
    
    // Verify we're on the correct page
    expect(currentUrl).toBe('http://localhost:5173/delhi/tivoli-bijwasan');
    
    // Check if the page content loads correctly
    const hotelTitle = await page.locator('h1').textContent();
    console.log('🏨 Hotel title on page:', hotelTitle);
    
    // Verify the hotel title contains Bijwasan
    expect(hotelTitle).toContain('Bijwasan');
    
    // Check if navigation component loads
    const navExists = await page.locator('nav').count() > 0;
    expect(navExists).toBe(true);
    console.log('🧭 Navigation component loaded:', navExists);
    
    console.log('✅ Bijwasan link fix verification complete!');
  } else {
    throw new Error('❌ Tivoli Bijwasan link not found on home page');
  }
});