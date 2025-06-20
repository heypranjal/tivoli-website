import { test, expect } from '@playwright/test';

test('Debug Tivoli Lotus Court Image Grid Issues', async ({ page }) => {
  console.log('🔍 Starting comprehensive debugging of Tivoli Lotus Court page...');

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

  // Navigate to the page
  console.log('📍 Navigating to Tivoli Lotus Court page...');
  await page.goto('http://localhost:5173/noida/tivoli-lotus-court');
  
  // Wait for page to load
  await page.waitForLoadState('networkidle');
  
  console.log('📊 Page loaded, analyzing...');

  // Check if main image loads
  console.log('🖼️ Checking main image...');
  const mainImage = page.locator('img').first();
  await expect(mainImage).toBeVisible();
  const mainImageSrc = await mainImage.getAttribute('src');
  console.log('Main image src:', mainImageSrc);

  // Check the secondary images grid
  console.log('🔍 Analyzing secondary images grid...');
  
  // Find the grid container
  const gridContainer = page.locator('div').filter({ hasText: 'Secondary Images Grid' }).locator('..').locator('div.grid.grid-cols-2');
  
  // Check if grid container exists
  const gridExists = await gridContainer.count();
  console.log('Grid container found:', gridExists > 0);
  
  if (gridExists > 0) {
    // Count images in the grid
    const gridImages = gridContainer.locator('img');
    const imageCount = await gridImages.count();
    console.log('Number of images in grid:', imageCount);
    
    // Check each image in the grid
    for (let i = 0; i < imageCount; i++) {
      const img = gridImages.nth(i);
      const isVisible = await img.isVisible();
      const src = await img.getAttribute('src');
      const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
      const naturalHeight = await img.evaluate((el: HTMLImageElement) => el.naturalHeight);
      
      console.log(`Image ${i + 1}:`);
      console.log(`  - Visible: ${isVisible}`);
      console.log(`  - Source: ${src}`);
      console.log(`  - Natural dimensions: ${naturalWidth}x${naturalHeight}`);
      console.log(`  - Loaded: ${naturalWidth > 0 && naturalHeight > 0}`);
    }
  } else {
    console.log('❌ Grid container not found!');
    
    // Debug: Find all grid containers on the page
    const allGrids = page.locator('div.grid');
    const allGridsCount = await allGrids.count();
    console.log('Total grid containers found:', allGridsCount);
    
    for (let i = 0; i < allGridsCount; i++) {
      const grid = allGrids.nth(i);
      const classes = await grid.getAttribute('class');
      console.log(`Grid ${i + 1} classes:`, classes);
    }
  }

  // Check if hotel data is loaded
  console.log('🏨 Checking hotel data...');
  const hotelTitle = page.locator('h1');
  const titleText = await hotelTitle.textContent();
  console.log('Hotel title:', titleText);

  // Check the DOM structure around images
  console.log('🔍 Checking DOM structure...');
  const imageContainers = page.locator('div.relative.h-\\[190px\\]');
  const containerCount = await imageContainers.count();
  console.log('Image containers found:', containerCount);

  // Check network requests for images
  console.log('🌐 Checking image network requests...');
  const imageRequests: { url: string; status: number }[] = [];
  
  page.on('response', response => {
    if (response.url().includes('image') || response.url().includes('.jpg') || response.url().includes('.JPG') || response.url().includes('.png') || response.url().includes('googleusercontent')) {
      imageRequests.push({
        url: response.url(),
        status: response.status()
      });
    }
  });

  // Reload to capture image requests
  await page.reload();
  await page.waitForLoadState('networkidle');

  console.log('Image requests captured:', imageRequests.length);
  imageRequests.forEach((req, index) => {
    console.log(`  ${index + 1}. ${req.status} - ${req.url}`);
  });

  // Take a screenshot for visual debugging
  console.log('📸 Taking screenshot...');
  await page.screenshot({ 
    path: 'debug-lotus-court.png', 
    fullPage: true 
  });

  // Check if the React component is rendering properly
  console.log('⚛️ Checking React component state...');
  const reactState = await page.evaluate(() => {
    // Try to find React component instances
    const reactRoot = document.querySelector('#root');
    return {
      hasReactRoot: !!reactRoot,
      reactRootChildren: reactRoot?.children.length || 0,
      bodyContent: document.body.innerHTML.length
    };
  });
  
  console.log('React state:', reactState);

  // Final summary
  console.log('\n📋 SUMMARY:');
  console.log('Console Errors:', consoleErrors.length);
  consoleErrors.forEach(error => console.log('  -', error));
  
  console.log('Page Errors:', pageErrors.length);
  pageErrors.forEach(error => console.log('  -', error));

  console.log('Image Requests Status:');
  const failedRequests = imageRequests.filter(req => req.status >= 400);
  console.log('  - Failed requests:', failedRequests.length);
  failedRequests.forEach(req => console.log(`    ${req.status}: ${req.url}`));

  // Verify there are no blocking errors
  expect(pageErrors.length).toBe(0);
});