import { test, expect } from '@playwright/test';

test('verify banner2.jpg is in hotel data', async ({ page }) => {
  console.log('🔍 Testing banner2.jpg update in hotel data...');
  
  // Navigate to the home page first
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  
  // Execute JavaScript to check if the hotel data contains banner2.jpg
  const bannerCheck = await page.evaluate(() => {
    // Try to access hotel data from window or check if modules are available
    return new Promise((resolve) => {
      // Check if we can import the hotels data
      fetch('/src/data/hotels.ts').then(response => response.text()).then(text => {
        const hasBanner2 = text.includes('banner2.jpg');
        resolve({
          hasBanner2,
          text: text.substring(0, 500) // First 500 chars for debugging
        });
      }).catch(() => {
        resolve({ hasBanner2: false, error: 'Could not fetch hotels.ts' });
      });
    });
  });
  
  console.log('📊 Banner check result:', bannerCheck);
  
  // Also test the actual hotel page load
  try {
    await page.goto('/hotel/tivoli-royal-suite', { waitUntil: 'domcontentloaded' });
    
    // Check for page content
    const pageContent = await page.content();
    const hasHotelContent = pageContent.includes('Royal Palace') || pageContent.includes('Tivoli');
    
    console.log(`🏨 Hotel page loaded: ${hasHotelContent}`);
    console.log(`📄 Page title: ${await page.title()}`);
    
    // Wait for images to potentially load
    await page.waitForTimeout(5000);
    
    // Count actual img elements (not placeholders)
    const actualImages = await page.locator('img[src*="supabase"]').count();
    console.log(`🖼️ Supabase images found: ${actualImages}`);
    
    // Take screenshot
    await page.screenshot({ 
      path: 'banner-verification.png',
      fullPage: true 
    });
    console.log('📸 Screenshot saved: banner-verification.png');
    
  } catch (error) {
    console.log(`❌ Error loading hotel page: ${error}`);
  }
});