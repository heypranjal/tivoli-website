import { test, expect } from '@playwright/test';

test('verify experiences section with immediate loading', async ({ page }) => {
  console.log('🔍 Verifying experiences section with immediate loading...');
  
  // Navigate to Royal Palace page
  await page.goto('http://localhost:5174/hotel/tivoli-royal-suite', { waitUntil: 'domcontentloaded' });
  
  // Wait shorter time since it should load immediately
  await page.waitForTimeout(5000);
  
  // Look for the Discover Heritage Luxury section
  const hasHeritageSection = await page.locator('text=Discover Heritage Luxury').count() > 0;
  console.log(`✅ Has 'Discover Heritage Luxury' section: ${hasHeritageSection}`);
  
  // Check for experiences content
  const experienceKeywords = ['Royal Weddings', 'Heritage Corporate Events', 'Royal Suite Experience'];
  for (const keyword of experienceKeywords) {
    const hasKeyword = await page.locator(`text=${keyword}`).count() > 0;
    console.log(`✅ Has '${keyword}': ${hasKeyword}`);
  }
  
  // Check for restaurant images
  const restaurantImages = await page.evaluate(() => {
    const allImages = Array.from(document.querySelectorAll('img'));
    return allImages.filter(img => 
      img.src.includes('Restaurant1.jpg') || 
      img.src.includes('Restaurant2.jpg') || 
      img.src.includes('Restaurant3.jpg')
    ).map(img => ({
      src: img.src,
      alt: img.alt
    }));
  });
  
  console.log(`\n🖼️ Restaurant images found: ${restaurantImages.length}`);
  restaurantImages.forEach((img, i) => {
    const filename = img.src.split('/').pop()?.split('?')[0];
    console.log(`   ${i + 1}. ${filename}`);
  });
  
  // Get all sections
  const allSections = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('h2')).map(h2 => h2.textContent?.trim());
  });
  
  console.log(`\n📋 All sections: ${allSections.join(', ')}`);
  
  // Take screenshot
  await page.screenshot({ 
    path: 'immediate-experiences-test.png',
    fullPage: true 
  });
  console.log('\n📸 Screenshot saved: immediate-experiences-test.png');
});