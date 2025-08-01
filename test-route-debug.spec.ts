import { test, expect } from '@playwright/test';

test('debug routing and component rendering', async ({ page }) => {
  console.log('🔍 Debugging routing and component rendering...');
  
  // Navigate to Royal Palace page
  await page.goto('http://localhost:5174/hotel/tivoli-royal-suite', { waitUntil: 'domcontentloaded' });
  
  // Wait for React to render
  await page.waitForTimeout(5000);
  
  // Check routing and component state
  const routeInfo = await page.evaluate(() => {
    return {
      currentURL: window.location.href,
      pathname: window.location.pathname,
      search: window.location.search,
      hash: window.location.hash,
      title: document.title,
      reactRootExists: !!document.querySelector('#root'),
      mainContentExists: !!document.querySelector('.container'),
      belowFoldExists: !!document.querySelector('.below-fold'),
      heroSectionExists: !!document.querySelector('.above-fold'),
      
      // Check if the EnhancedTivoliRoyalPalacePage is rendered
      bodyClasses: document.body.className,
      htmlClasses: document.documentElement.className,
      
      // Check for any error messages
      hasErrorText: document.body.textContent?.includes('error') || false,
      hasLoadingText: document.body.textContent?.includes('loading') || false,
      hasNotFoundText: document.body.textContent?.includes('not found') || false,
      
      // Get all section elements
      totalSections: document.querySelectorAll('section').length,
      sectionClasses: Array.from(document.querySelectorAll('section')).map(s => s.className)
    };
  });
  
  console.log('\n📊 ROUTE & COMPONENT DEBUG:');
  console.log(`Current URL: ${routeInfo.currentURL}`);
  console.log(`Pathname: ${routeInfo.pathname}`);
  console.log(`Title: ${routeInfo.title}`);
  console.log(`React root exists: ${routeInfo.reactRootExists ? '✅' : '❌'}`);
  console.log(`Main container exists: ${routeInfo.mainContentExists ? '✅' : '❌'}`);
  console.log(`Below fold exists: ${routeInfo.belowFoldExists ? '✅' : '❌'}`);
  console.log(`Hero section exists: ${routeInfo.heroSectionExists ? '✅' : '❌'}`);
  console.log(`Has error text: ${routeInfo.hasErrorText ? '✅' : '❌'}`);
  console.log(`Has loading text: ${routeInfo.hasLoadingText ? '✅' : '❌'}`);
  console.log(`Has not found text: ${routeInfo.hasNotFoundText ? '✅' : '❌'}`);
  console.log(`Total sections: ${routeInfo.totalSections}`);
  
  if (routeInfo.sectionClasses.length > 0) {
    console.log('\n📋 SECTION CLASSES:');
    routeInfo.sectionClasses.forEach((className, i) => {
      console.log(`   ${i + 1}. ${className || 'no-class'}`);
    });
  }
  
  // Take screenshot
  await page.screenshot({ 
    path: 'route-debug.png',
    fullPage: true 
  });
  
  console.log('\n📸 Screenshot saved: route-debug.png');
});