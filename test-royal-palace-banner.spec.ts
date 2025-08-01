import { test, expect } from '@playwright/test';

test('Tivoli Royal Palace banner image update', async ({ page }) => {
  console.log('🏰 Testing Tivoli Royal Palace banner image...');
  
  // Go to the Royal Palace page (based on the component it should be under /hotel/ route)
  await page.goto('/hotel/tivoli-royal-suite', { waitUntil: 'domcontentloaded' });
  
  // Wait for the page to load
  await page.waitForTimeout(3000);
  
  // Check if the main image (first image) loads
  const mainImage = page.locator('img').first();
  await expect(mainImage).toBeVisible();
  
  // Check if the second image (banner2.jpg) is present in the secondary images grid
  const secondaryImages = page.locator('img');
  const imageCount = await secondaryImages.count();
  console.log(`📊 Found ${imageCount} images on the page`);
  
  // Check if banner2.jpg is loaded as one of the images
  let banner2Found = false;
  for (let i = 0; i < imageCount; i++) {
    const src = await secondaryImages.nth(i).getAttribute('src');
    if (src && src.includes('banner2.jpg')) {
      banner2Found = true;
      console.log(`✅ Found banner2.jpg at image position ${i + 1}: ${src}`);
      break;
    }
  }
  
  if (!banner2Found) {
    console.log('❌ banner2.jpg not found in page images');
    // List all image sources for debugging
    for (let i = 0; i < imageCount; i++) {
      const src = await secondaryImages.nth(i).getAttribute('src');
      console.log(`   Image ${i + 1}: ${src}`);
    }
  }
  
  // Take a screenshot to verify visually
  await page.screenshot({ 
    path: 'royal-palace-banner-test.png',
    fullPage: true 
  });
  console.log('📸 Screenshot saved: royal-palace-banner-test.png');
  
  expect(banner2Found).toBe(true);
});