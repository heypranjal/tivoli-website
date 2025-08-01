import { test, expect } from '@playwright/test';

test('check if forced experiences appear', async ({ page }) => {
  console.log('🔍 Checking if forced experiences appear...');
  
  // Navigate to Royal Palace page
  await page.goto('http://localhost:5174/hotel/tivoli-royal-suite', { waitUntil: 'domcontentloaded' });
  
  // Wait for React to render
  await page.waitForTimeout(5000);
  
  // Check for experiences content
  const experiencesCheck = await page.evaluate(() => {
    const bodyText = document.body.textContent || '';
    
    return {
      hasDiscoverHeritageText: bodyText.includes('Discover Heritage Luxury'),
      hasRoyalWeddingsText: bodyText.includes('Royal Weddings'),
      hasHeritageEventsText: bodyText.includes('Heritage Corporate Events'),
      hasRoyalSuiteText: bodyText.includes('Royal Suite Experience'),
      hasCuratedExperiencesText: bodyText.includes('Curated Experiences'),
      totalH2s: Array.from(document.querySelectorAll('h2')).length,
      h2Texts: Array.from(document.querySelectorAll('h2')).map(h2 => h2.textContent?.trim()),
      bodyTextLength: bodyText.length
    };
  });
  
  console.log('\n📊 FORCED EXPERIENCES CHECK:');
  console.log(`Has 'Discover Heritage Luxury': ${experiencesCheck.hasDiscoverHeritageText ? '✅' : '❌'}`);
  console.log(`Has 'Royal Weddings': ${experiencesCheck.hasRoyalWeddingsText ? '✅' : '❌'}`);
  console.log(`Has 'Heritage Corporate Events': ${experiencesCheck.hasHeritageEventsText ? '✅' : '❌'}`);
  console.log(`Has 'Royal Suite Experience': ${experiencesCheck.hasRoyalSuiteText ? '✅' : '❌'}`);
  console.log(`Has 'Curated Experiences': ${experiencesCheck.hasCuratedExperiencesText ? '✅' : '❌'}`);
  console.log(`Total H2s: ${experiencesCheck.totalH2s}`);
  console.log(`H2 texts: ${experiencesCheck.h2Texts.join(', ')}`);
  console.log(`Body text length: ${experiencesCheck.bodyTextLength} chars`);
  
  // Take screenshot
  await page.screenshot({ 
    path: 'forced-experiences.png',
    fullPage: true 
  });
  
  console.log('\n📸 Screenshot saved: forced-experiences.png');
});