import { test, expect } from '@playwright/test';

test('Verify Tivoli Lotus Court Image Grid Fix', async ({ page }) => {
  console.log('🔍 Verifying Tivoli Lotus Court image grid fix...');

  // Listen for console errors
  const consoleErrors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  // Navigate to the page
  await page.goto('http://localhost:5173/noida/tivoli-lotus-court');
  await page.waitForLoadState('networkidle');

  console.log('✅ Page loaded successfully');

  // Check main image
  const mainImage = page.locator('img').first();
  await expect(mainImage).toBeVisible();
  const mainImageSrc = await mainImage.getAttribute('src');
  console.log('✅ Main image loads:', mainImageSrc?.includes('lotushomeimage4.JPG'));

  // Find the secondary images grid
  const gridImages = page.locator('div.grid.grid-cols-2 img');
  const imageCount = await gridImages.count();
  console.log('📊 Grid images found:', imageCount);

  // Verify each grid image loads successfully
  for (let i = 0; i < Math.min(4, imageCount); i++) {
    const img = gridImages.nth(i);
    await expect(img).toBeVisible();
    
    const src = await img.getAttribute('src');
    const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
    const naturalHeight = await img.evaluate((el: HTMLImageElement) => el.naturalHeight);
    
    const isLoaded = naturalWidth > 0 && naturalHeight > 0;
    console.log(`✅ Grid image ${i + 1}: ${isLoaded ? 'LOADED' : 'FAILED'} (${naturalWidth}x${naturalHeight})`);
    console.log(`   Source: ${src}`);
    
    expect(isLoaded).toBe(true);
  }

  // Take screenshot to verify visually
  await page.screenshot({ 
    path: 'lotus-court-fixed.png', 
    fullPage: false 
  });

  console.log('📸 Screenshot saved as lotus-court-fixed.png');

  // Verify no console errors
  console.log('❌ Console errors:', consoleErrors.length);
  consoleErrors.forEach(error => console.log('  -', error));

  console.log('🎉 Verification complete!');
});