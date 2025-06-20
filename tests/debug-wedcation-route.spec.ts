import { test, expect } from '@playwright/test';

test('Debug Wedcation Route Issue', async ({ page }) => {
  console.log('=== DEBUGGING WEDCATION ROUTE ===');
  
  // Navigate to homepage first
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(1000);
  console.log('✅ Homepage loaded');

  // Check current route
  console.log(`Current URL: ${page.url()}`);

  // Try navigating to Wedcation page
  console.log('=== NAVIGATING TO WEDCATION PAGE ===');
  await page.goto('http://localhost:5173/ambala/wedcation-ambala');
  await page.waitForTimeout(2000);

  const currentUrl = page.url();
  console.log(`URL after navigation: ${currentUrl}`);

  // Check if page redirected or stayed on same route
  if (currentUrl.includes('ambala')) {
    console.log('✅ Successfully stayed on Wedcation route');
  } else {
    console.log('❌ Route redirected away from Wedcation page');
  }

  // Check page content
  const bodyText = await page.textContent('body');
  console.log(`Page contains "Wedcation": ${bodyText?.includes('Wedcation') ? 'YES' : 'NO'}`);
  console.log(`Page contains "Ambala": ${bodyText?.includes('Ambala') ? 'YES' : 'NO'}`);
  console.log(`Page contains "Wedding": ${bodyText?.includes('Wedding') ? 'YES' : 'NO'}`);

  // Check if any error occurred in React
  const errors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  // Check React component rendering
  const rootDiv = await page.locator('#root').textContent();
  if (rootDiv) {
    console.log(`Root content length: ${rootDiv.length}`);
    console.log(`First 300 chars: ${rootDiv.substring(0, 300)}...`);
  }

  // Take screenshot for visual debugging
  await page.screenshot({ path: 'wedcation-route-debug.png', fullPage: true });
  console.log('📸 Screenshot saved as wedcation-route-debug.png');

  // Check if navigation element exists
  const nav = await page.locator('nav').count();
  console.log(`Navigation elements: ${nav}`);

  // Look for specific components
  const hotelDetails = await page.locator('[data-testid="hotel-details"]').count();
  const bookingForm = await page.locator('[data-testid="booking-form"]').count();
  console.log(`Hotel details components: ${hotelDetails}`);
  console.log(`Booking form components: ${bookingForm}`);
});