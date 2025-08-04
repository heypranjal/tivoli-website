import { test, expect } from '@playwright/test';

test('Debug Tivoli Lotus Court Page Error', async ({ page }) => {
  // Enable detailed console logging
  page.on('console', msg => {
    console.log(`CONSOLE [${msg.type()}]:`, msg.text());
  });

  page.on('pageerror', error => {
    console.log('PAGE ERROR:', error.message);
  });

  // Navigate to the page
  await page.goto('http://localhost:5174/hotel/tivoli-lotus-court');
  
  // Wait for the page to load
  await page.waitForTimeout(5000);
  
  // Check if the page has any content at all
  const body = await page.locator('body').textContent();
  console.log('Page body content:', body?.substring(0, 200));
  
  // Take a screenshot to see what's actually rendered
  await page.screenshot({ path: 'debug-tivoli-lotus-court.png', fullPage: true });
  
  // Try to find any error messages on the page
  const errorMessages = await page.locator('[role="alert"], .error, .error-message').all();
  for (let i = 0; i < errorMessages.length; i++) {
    const errorText = await errorMessages[i].textContent();
    console.log(`Error message ${i + 1}:`, errorText);
  }
});