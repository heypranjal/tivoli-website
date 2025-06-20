import { test, expect } from '@playwright/test';

test('Verify Tivoli Bijwasan Grid Images Update', async ({ page }) => {
  console.log('🔍 Testing updated grid images on Tivoli Bijwasan detail page...');

  // Navigate to Tivoli Bijwasan detail page
  await page.goto('http://localhost:5173/delhi/tivoli-bijwasan', {
    waitUntil: 'networkidle',
    timeout: 15000
  });
  
  console.log('🏨 Tivoli Bijwasan detail page loaded');

  // Wait for React to render
  await page.waitForTimeout(2000);

  // Find the secondary images grid (should be 4 images in 2x2 grid)
  const gridImages = page.locator('div.grid.grid-cols-2 img');
  const imageCount = await gridImages.count();
  console.log('📊 Grid images found:', imageCount);

  // Expected URLs
  const expectedUrls = [
    'https://lh3.googleusercontent.com/p/AF1QipP1r_igTNb3Z6DIMer5Pmg9RkzIK4NPZZGN-jg=s1360-w1360-h1020-rw',
    'https://lh3.googleusercontent.com/p/AF1QipOg3JBaIJNBTDx3_QykesTahu1CGHUOE3zqG54=s1360-w1360-h1020-rw',
    'https://lh3.googleusercontent.com/p/AF1QipNaFd5bEQT8Xr2-6sFg5XUmayKsn85dDrEvebI=s1360-w1360-h1020-rw',
    'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqNHa3j_mvecMzpw2FoDNWa9d8Iaren2l50c407ftGKo7yhhs_1bVPCe9BPM-EJwiWLjpejhpR9cSG0ZdYGOQba4QTfZMMprh9PLKs4Wnjlud1Am3t-RiFHV2D78sNrSz3gJGw08g=s1360-w1360-h1020-rw'
  ];

  // Check each grid image
  for (let i = 0; i < Math.min(4, imageCount); i++) {
    const img = gridImages.nth(i);
    const src = await img.getAttribute('src');
    const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
    const naturalHeight = await img.evaluate((el: HTMLImageElement) => el.naturalHeight);
    
    const isLoaded = naturalWidth > 0 && naturalHeight > 0;
    console.log(`📷 Grid image ${i + 1}:`);
    console.log(`   Source: ${src}`);
    console.log(`   Expected: ${expectedUrls[i]}`);
    console.log(`   Loaded: ${isLoaded ? 'YES' : 'NO'} (${naturalWidth}x${naturalHeight})`);
    
    // Verify the URL matches expected
    expect(src).toBe(expectedUrls[i]);
    
    // Verify the image loaded successfully
    expect(isLoaded).toBe(true);
  }

  // Take screenshot for verification
  await page.screenshot({ 
    path: 'bijwasan-updated-images.png', 
    fullPage: false 
  });
  console.log('📸 Screenshot saved as bijwasan-updated-images.png');

  // Verify we have exactly 4 grid images
  expect(imageCount).toBe(4);

  console.log('✅ Tivoli Bijwasan grid images verification complete!');
});