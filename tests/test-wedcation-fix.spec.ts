import { test, expect } from '@playwright/test';

test('Test Wedcation Page Fix', async ({ page }) => {
  console.log('=== TESTING WEDCATION PAGE AFTER FIX ===');
  
  // Navigate directly to Wedcation page
  await page.goto('http://localhost:5173/ambala/wedcation-ambala', { 
    waitUntil: 'domcontentloaded',
    timeout: 15000 
  });
  
  console.log('✅ Successfully navigated to Wedcation page');
  
  // Wait for page to load completely
  await page.waitForTimeout(3000);
  
  // Check current URL
  const currentUrl = page.url();
  console.log(`Current URL: ${currentUrl}`);
  
  // Check if we're on the right page
  const isOnWedcationPage = currentUrl.includes('ambala/wedcation-ambala');
  console.log(`On Wedcation page: ${isOnWedcationPage ? 'YES' : 'NO'}`);
  
  // Check page content
  const bodyText = await page.textContent('body');
  const hasWedcationContent = bodyText?.includes('Wedcation') || bodyText?.includes('Ambala');
  console.log(`Has Wedcation content: ${hasWedcationContent ? 'YES' : 'NO'}`);
  
  if (bodyText) {
    console.log(`Page content length: ${bodyText.length} characters`);
    console.log(`Contains "Wedcation": ${bodyText.includes('Wedcation') ? 'YES' : 'NO'}`);
    console.log(`Contains "Ambala": ${bodyText.includes('Ambala') ? 'YES' : 'NO'}`);
    console.log(`Contains "Wedding": ${bodyText.includes('Wedding') ? 'YES' : 'NO'}`);
    console.log(`Contains "Corporate": ${bodyText.includes('Corporate') ? 'YES' : 'NO'}`);
  }
  
  // Check for navigation
  const nav = await page.locator('nav').count();
  console.log(`Navigation elements: ${nav}`);
  
  // Check for main content sections
  const mainContent = await page.locator('main, .container').count();
  console.log(`Main content sections: ${mainContent}`);
  
  // Take screenshot
  await page.screenshot({ path: 'wedcation-fixed.png', fullPage: true });
  console.log('📸 Screenshot saved as wedcation-fixed.png');
  
  // Check for any console errors
  const errors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  
  await page.waitForTimeout(1000);
  
  if (errors.length > 0) {
    console.log('=== ERRORS FOUND ===');
    errors.forEach(error => console.log(`❌ ${error}`));
  } else {
    console.log('✅ No console errors detected');
  }
  
  // Test navigation between pages
  console.log('=== TESTING NAVIGATION ===');
  
  // Try going back to homepage
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);
  
  const homeContent = await page.textContent('body');
  console.log(`Homepage loads: ${homeContent && homeContent.length > 1000 ? 'YES' : 'NO'}`);
  
  // Try going back to Wedcation page
  await page.goto('http://localhost:5173/ambala/wedcation-ambala', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  
  const wedcationContent = await page.textContent('body');
  console.log(`Wedcation page still works: ${wedcationContent && wedcationContent.length > 1000 ? 'YES' : 'NO'}`);
  
  console.log('=== TEST COMPLETE ===');
});