import { test, expect } from '@playwright/test';

test('Simple page load test', async ({ page }) => {
  // Enable all console logging
  page.on('console', msg => {
    console.log(`CONSOLE [${msg.type()}]:`, msg.text());
  });

  page.on('pageerror', error => {
    console.log('PAGE ERROR:', error.message);
    console.log('ERROR STACK:', error.stack);
  });

  // Navigate to the homepage first to see if that works
  await page.goto('http://localhost:5174/');
  
  // Wait for page to load
  await page.waitForTimeout(3000);
  
  // Take a screenshot
  await page.screenshot({ path: 'homepage-test.png', fullPage: true });
  
  // Check if homepage loads
  const homepageContent = await page.locator('body').textContent();
  console.log('Homepage loaded:', homepageContent?.length > 100 ? 'YES' : 'NO');
  
  // Now try to navigate to the problematic page
  console.log('Navigating to Tivoli Lotus Court page...');
  await page.goto('http://localhost:5174/hotel/tivoli-lotus-court');
  
  // Wait longer to see what happens
  await page.waitForTimeout(5000);
  
  // Take another screenshot
  await page.screenshot({ path: 'simple-debug.png', fullPage: true });
});