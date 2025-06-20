import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  // Navigate to the page
  await page.goto('http://localhost:5173/rewari-haryana/tivoli-heritage-palace');
  
  // Wait for the page to load
  await page.waitForTimeout(3000);
  
  // Find all images in the curated experiences section
  const images = await page.$$eval('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3.gap-8 img', imgs => 
    imgs.map((img, index) => ({
      index,
      src: img.src,
      alt: img.alt,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      complete: img.complete,
      hasError: img.complete && img.naturalWidth === 0
    }))
  );
  
  console.log('Images in Curated Experiences section:');
  images.forEach((img, i) => {
    console.log(`Image ${i + 1}:`);
    console.log(`  Source: ${img.src}`);
    console.log(`  Alt: ${img.alt}`);
    console.log(`  Complete: ${img.complete}`);
    console.log(`  Has Error: ${img.hasError}`);
    console.log(`  Dimensions: ${img.naturalWidth}x${img.naturalHeight}`);
    console.log('---');
  });
  
  // Take a screenshot
  await page.screenshot({ path: 'debug-screenshot.png', fullPage: true });
  
  // Check for console errors
  const consoleMessages = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleMessages.push(msg.text());
    }
  });
  
  // Check network requests for failed images
  const failedRequests = [];
  page.on('response', response => {
    if (response.url().includes('sivirxabbuldqkckjwmu.supabase.co') && !response.ok()) {
      failedRequests.push({
        url: response.url(),
        status: response.status(),
        statusText: response.statusText()
      });
    }
  });
  
  await page.reload();
  await page.waitForTimeout(5000);
  
  if (failedRequests.length > 0) {
    console.log('\nFailed image requests:');
    failedRequests.forEach(req => {
      console.log(`  ${req.url} - ${req.status} ${req.statusText}`);
    });
  } else {
    console.log('\nNo failed image requests detected');
  }
  
  if (consoleMessages.length > 0) {
    console.log('\nConsole errors:');
    consoleMessages.forEach(msg => {
      console.log(`  ${msg}`);
    });
  }
  
  await browser.close();
})();