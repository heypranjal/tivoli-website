import { test, expect } from '@playwright/test';

test('Test Royal Court Okhla Fix - Check if page loads without errors', async ({ page }) => {
  console.log('🔧 TESTING: Royal Court Okhla fix...');

  // Track errors
  const jsErrors: string[] = [];
  page.on('pageerror', error => {
    jsErrors.push(`${error.name}: ${error.message}`);
  });

  // Navigate to Royal Court Okhla
  await page.goto('http://localhost:5173/delhi/royal-court-okhla');
  await page.waitForLoadState('networkidle');

  // Take screenshot
  await page.screenshot({ 
    path: 'royal-court-okhla-after-fix.png', 
    fullPage: true 
  });

  // Check if page now renders content
  const pageContent = await page.evaluate(() => {
    return {
      bodyText: document.body.textContent?.substring(0, 200) || '',
      h1Text: document.querySelector('h1')?.textContent || 'No h1',
      h1Count: document.querySelectorAll('h1').length,
      sectionsCount: document.querySelectorAll('section').length,
      hasRoyalCourt: (document.body.textContent || '').toLowerCase().includes('royal court'),
      hasOkhla: (document.body.textContent || '').toLowerCase().includes('okhla'),
      hasAmenities: !!document.querySelector('[class*="amenities"]'),
      totalElements: document.querySelectorAll('*').length
    };
  });

  console.log('\n📊 AFTER FIX RESULTS:');
  console.log('  Body text (first 200 chars):', pageContent.bodyText);
  console.log('  H1 text:', pageContent.h1Text);
  console.log('  H1 count:', pageContent.h1Count);
  console.log('  Sections count:', pageContent.sectionsCount);
  console.log('  Contains "Royal Court":', pageContent.hasRoyalCourt);
  console.log('  Contains "Okhla":', pageContent.hasOkhla);
  console.log('  Has amenities:', pageContent.hasAmenities);
  console.log('  Total DOM elements:', pageContent.totalElements);
  console.log('  JavaScript errors:', jsErrors.length);

  if (jsErrors.length > 0) {
    console.log('\n❌ Remaining JS Errors:');
    jsErrors.forEach(error => console.log(`  ${error}`));
  }

  // Determine if fix worked
  const isFixed = pageContent.h1Count > 0 && 
                  pageContent.sectionsCount > 0 && 
                  pageContent.totalElements > 100 &&
                  jsErrors.length === 0;

  console.log('\n🎯 FIX STATUS:', isFixed ? '✅ SUCCESS' : '❌ STILL BROKEN');
  
  if (isFixed) {
    console.log('🎉 Royal Court Okhla page is now working!');
  } else {
    console.log('⚠️ Additional fixes needed');
  }
});