import { test, expect } from '@playwright/test';

test('Quick check - Lotus Court page loads without crashing', async ({ page }) => {
  // Monitor for errors
  const errors: string[] = [];
  page.on('pageerror', error => {
    errors.push(error.message);
    console.log(`❌ Page Error: ${error.message}`);
  });

  // Navigate to page
  console.log('🔍 Testing page load...');
  await page.goto('http://localhost:5173/hotel/tivoli-lotus-court');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);

  // Take screenshot
  await page.screenshot({ path: 'lotus-court-quick-check.png', fullPage: true });

  // Check basic page elements
  const bodyText = await page.locator('body').textContent();
  console.log(`📊 Page content length: ${bodyText?.length || 0} characters`);

  // Check if main content exists
  if (bodyText && bodyText.length > 1000) {
    console.log('✅ Page has substantial content');
  } else {
    console.log('❌ Page content seems insufficient');
  }

  // Check for critical errors
  const criticalErrors = errors.filter(error => 
    !error.includes('favicon') && 
    !error.includes('Warning:') &&
    !error.includes('key prop')
  );
  
  console.log(`🔍 Critical errors found: ${criticalErrors.length}`);
  if (criticalErrors.length > 0) {
    criticalErrors.forEach(error => console.log(`❌ ${error}`));
  }

  // Basic assertion
  expect(criticalErrors.length).toBe(0);
  expect(bodyText?.length || 0).toBeGreaterThan(1000);
});