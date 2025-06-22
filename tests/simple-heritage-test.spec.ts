import { test, expect } from '@playwright/test';

test('Simple Heritage Palace Page Test', async ({ page }) => {
  // Navigate to Heritage Palace page
  await page.goto('http://localhost:5173/hotel/tivoli-heritage-palace');
  
  // Wait for page to load
  await page.waitForLoadState('networkidle');
  
  // Check if ANY React content is rendered
  const bodyContent = await page.textContent('body');
  console.log('Body content preview:', bodyContent?.substring(0, 200) || 'EMPTY');
  
  // Check if React root exists
  const reactRoot = await page.locator('#root').isVisible();
  console.log('React root visible:', reactRoot);
  
  // Check if any text content exists
  const hasHeritagePalace = bodyContent?.includes('Heritage');
  console.log('Contains "Heritage":', hasHeritagePalace);
  
  // Check for JavaScript errors in console
  const errors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  
  // Wait a bit to catch errors
  await page.waitForTimeout(3000);
  
  console.log('JavaScript errors found:', errors);
  
  // Take screenshot
  await page.screenshot({ path: 'simple-heritage-debug.png', fullPage: true });
  
  // Check if Navigation exists with different selector
  const navigation = await page.locator('header, .navigation, [class*="navigation"], [class*="Navigation"]').count();
  console.log('Navigation elements found:', navigation);
  
  // Check the HTML structure
  const htmlContent = await page.content();
  const hasReactId = htmlContent.includes('data-reactroot') || htmlContent.includes('id="root"');
  console.log('Has React markers:', hasReactId);
  
  // Check if the page has basic structure
  const elementCount = await page.locator('*').count();
  console.log('Total DOM elements:', elementCount);
});