import { test, expect } from '@playwright/test';

test('Test Upper HSE route and page load', async ({ page }) => {
  // Listen for console errors
  const consoleErrors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  // Navigate to the Upper HSE page
  console.log('Navigating to Upper HSE page...');
  await page.goto('http://localhost:5173/hotel/upper-hse-sultanpur');

  // Wait for navigation to complete
  await page.waitForLoadState('networkidle');

  // Take a screenshot for debugging
  await page.screenshot({ path: 'upper-hse-route-test.png', fullPage: true });

  // Check if the page loaded
  const title = await page.title();
  console.log('Page title:', title);

  // Check for any console errors
  if (consoleErrors.length > 0) {
    console.log('Console errors found:');
    consoleErrors.forEach((error, index) => {
      console.log(`${index + 1}. ${error}`);
    });
  }

  // Check for the presence of navigation
  const navigation = await page.locator('nav').count();
  console.log('Navigation elements found:', navigation);

  // Check for any error messages on the page
  const errorElements = await page.locator('text=Error').count();
  const notFoundElements = await page.locator('text=Not Found').count();
  
  console.log('Error elements:', errorElements);
  console.log('Not found elements:', notFoundElements);

  // Check if the page has actual content
  const bodyText = await page.locator('body').textContent();
  const hasContent = bodyText && bodyText.trim().length > 100;
  
  console.log('Page has substantial content:', hasContent);
  console.log('Body text length:', bodyText?.length || 0);

  // Print first 500 characters of body text for debugging
  if (bodyText) {
    console.log('First 500 characters of page content:');
    console.log(bodyText.substring(0, 500));
  }
});