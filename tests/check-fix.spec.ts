import { test, expect } from '@playwright/test';

test('Check if website is now working', async ({ page }) => {
  // Navigate to the page
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  // Take a screenshot
  await page.screenshot({ path: 'after-fix-screenshot.png', fullPage: true });

  // Check if root div now has content
  const rootDiv = page.locator('#root');
  const rootContent = await rootDiv.innerHTML();
  console.log('Root div content length:', rootContent.length);
  console.log('Root div has content:', rootContent.length > 0);

  // Check for navigation
  const navigation = page.locator('nav');
  const navExists = await navigation.count() > 0;
  console.log('Navigation exists:', navExists);

  // Check for hero section
  const heroSection = page.locator('div[class*="h-"]').first();
  const heroExists = await heroSection.count() > 0;
  console.log('Hero-like section exists:', heroExists);

  // Check page title
  const title = await page.title();
  console.log('Page title:', title);

  // Check for any React content
  const anyContent = await page.locator('div').count();
  console.log('Total div elements:', anyContent);

  // Listen for any console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('Console error:', msg.text());
    }
  });

  page.on('pageerror', error => {
    console.log('Page error:', error.message);
  });

  // Wait a bit to catch any late errors
  await page.waitForTimeout(2000);
});