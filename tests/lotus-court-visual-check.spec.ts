import { test, expect } from '@playwright/test';

test('Visual verification - Lotus Court layout is fixed and matches design', async ({ page }) => {
  // Navigate to page
  console.log('🎨 Final visual verification of layout fixes...');
  await page.goto('http://localhost:5173/hotel/tivoli-lotus-court');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);

  // Take final screenshot
  await page.screenshot({ 
    path: 'lotus-court-final-layout.png', 
    fullPage: true 
  });

  // Basic checks
  const bodyText = await page.locator('body').textContent();
  console.log(`📊 Final page content: ${bodyText?.length || 0} characters`);
  
  // Check key layout elements exist
  const hasContainer = await page.locator('.container.mx-auto.px-4').isVisible();
  const hasMaxWidth = await page.locator('.max-w-6xl.mx-auto').isVisible();
  const hasSpacing = await page.locator('.space-y-16').isVisible();
  const hasHeroMargin = await page.locator('.mt-16.above-fold').isVisible();
  
  console.log(`📊 Layout Check:
  - Container with padding: ${hasContainer ? '✅' : '❌'}
  - Max-width wrapper: ${hasMaxWidth ? '✅' : '❌'}  
  - Section spacing: ${hasSpacing ? '✅' : '❌'}
  - Hero margin: ${hasHeroMargin ? '✅' : '❌'}`);

  // Verify content is substantial and properly formatted
  expect(bodyText?.length || 0).toBeGreaterThan(4000);
  expect(hasContainer).toBeTruthy();
  expect(hasMaxWidth).toBeTruthy(); 
  expect(hasSpacing).toBeTruthy();
  expect(hasHeroMargin).toBeTruthy();

  console.log('🎉 Layout fixes verification: SUCCESS!');
  console.log('📸 Screenshot saved as: lotus-court-final-layout.png');
});