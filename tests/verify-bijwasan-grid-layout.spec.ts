import { test, expect } from '@playwright/test';

test('Verify Tivoli Bijwasan Grid Layout Fix', async ({ page }) => {
  console.log('🔍 Testing that Tivoli Bijwasan grid shows exactly 4 images without overflow...');

  // Navigate to Tivoli Bijwasan detail page
  await page.goto('http://localhost:5173/delhi/tivoli-bijwasan', {
    waitUntil: 'networkidle',
    timeout: 15000
  });
  
  console.log('🏨 Tivoli Bijwasan detail page loaded');

  // Wait for React to render
  await page.waitForTimeout(2000);

  // Find the secondary images grid
  const gridContainer = page.locator('div.grid.grid-cols-2').first();
  const gridImages = gridContainer.locator('img');
  const imageCount = await gridImages.count();
  
  console.log('📊 Grid images found:', imageCount);

  // Should have exactly 4 images (not 5)
  expect(imageCount).toBe(4);

  // Check that the grid container has proper grid-cols-2 class
  const hasGridCols2 = await gridContainer.evaluate(el => el.classList.contains('grid-cols-2'));
  console.log('🎯 Has grid-cols-2 class:', hasGridCols2);
  expect(hasGridCols2).toBe(true);

  // Verify each image source
  const expectedUrls = [
    'https://lh3.googleusercontent.com/p/AF1QipP1r_igTNb3Z6DIMer5Pmg9RkzIK4NPZZGN-jg=s1360-w1360-h1020-rw',
    'https://lh3.googleusercontent.com/p/AF1QipOg3JBaIJNBTDx3_QykesTahu1CGHUOE3zqG54=s1360-w1360-h1020-rw',
    'https://lh3.googleusercontent.com/p/AF1QipNaFd5bEQT8Xr2-6sFg5XUmayKsn85dDrEvebI=s1360-w1360-h1020-rw'
  ];

  for (let i = 0; i < Math.min(3, imageCount); i++) {
    const img = gridImages.nth(i);
    const src = await img.getAttribute('src');
    console.log(`📷 Grid image ${i + 1}: ${src}`);
    
    if (i < expectedUrls.length) {
      expect(src).toBe(expectedUrls[i]);
    }
  }

  // Take screenshot for verification
  await page.screenshot({ 
    path: 'bijwasan-grid-layout-fixed.png', 
    fullPage: false 
  });
  console.log('📸 Screenshot saved as bijwasan-grid-layout-fixed.png');

  console.log('✅ Tivoli Bijwasan grid layout verification complete!');
  console.log(`   - Expected: 4 images in 2x2 grid`);
  console.log(`   - Actual: ${imageCount} images`);
  console.log(`   - Status: ${imageCount === 4 ? 'FIXED' : 'NEEDS ATTENTION'}`);
});