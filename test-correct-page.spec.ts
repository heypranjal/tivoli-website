import { test, expect } from '@playwright/test';

test('check if correct enhanced page renders', async ({ page }) => {
  console.log('🔍 Checking if correct enhanced page renders...');
  
  // Navigate to Royal Palace page
  await page.goto('http://localhost:5174/hotel/tivoli-royal-suite', { waitUntil: 'domcontentloaded' });
  
  // Wait for React to render
  await page.waitForTimeout(8000);
  
  // Check for enhanced page characteristics
  const pageCheck = await page.evaluate(() => {
    const bodyText = document.body.textContent || '';
    
    return {
      // Check for enhanced page classes that should exist
      hasBelowFold: !!document.querySelector('.below-fold'),
      hasAboveFold: !!document.querySelector('.above-fold'),
      
      // Check for experiences content
      hasDiscoverHeritageText: bodyText.includes('Discover Heritage Luxury'),
      hasRoyalWeddingsText: bodyText.includes('Royal Weddings'),
      hasHeritageEventsText: bodyText.includes('Heritage Corporate Events'),
      hasCuratedExperiencesText: bodyText.includes('Curated Experiences'),
      
      // Check H2 count and texts
      totalH2s: Array.from(document.querySelectorAll('h2')).length,
      h2Texts: Array.from(document.querySelectorAll('h2')).map(h2 => h2.textContent?.trim()),
      
      // Check if title changed (enhanced page sets custom title)
      title: document.title,
      
      // Body text length for comparison
      bodyTextLength: bodyText.length
    };
  });
  
  console.log('\n📊 ENHANCED PAGE CHECK:');
  console.log(`Has .below-fold class: ${pageCheck.hasBelowFold ? '✅' : '❌'}`);
  console.log(`Has .above-fold class: ${pageCheck.hasAboveFold ? '✅' : '❌'}`);
  console.log(`Page title: ${pageCheck.title}`);
  console.log(`Has 'Discover Heritage Luxury': ${pageCheck.hasDiscoverHeritageText ? '✅' : '❌'}`);
  console.log(`Has 'Royal Weddings': ${pageCheck.hasRoyalWeddingsText ? '✅' : '❌'}`);
  console.log(`Has 'Heritage Corporate Events': ${pageCheck.hasHeritageEventsText ? '✅' : '❌'}`);
  console.log(`Has 'Curated Experiences': ${pageCheck.hasCuratedExperiencesText ? '✅' : '❌'}`);
  console.log(`Total H2s: ${pageCheck.totalH2s}`);
  console.log(`H2 texts: ${pageCheck.h2Texts.join(', ')}`);
  console.log(`Body text length: ${pageCheck.bodyTextLength} chars`);
  
  // Take screenshot
  await page.screenshot({ 
    path: 'correct-page-check.png',
    fullPage: true 
  });
  
  console.log('\n📸 Screenshot saved: correct-page-check.png');
});