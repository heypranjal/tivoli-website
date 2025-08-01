import { test, expect } from '@playwright/test';

test('debug why sections are not loading', async ({ page }) => {
  console.log('🔍 Debugging why sections are not loading...');
  
  // Capture JavaScript errors
  const jsErrors = [];
  page.on('pageerror', error => {
    jsErrors.push(error.message);
    console.log(`🚨 JavaScript Error: ${error.message}`);
  });
  
  // Capture console messages
  const consoleMessages = [];
  page.on('console', msg => {
    if (msg.type() === 'error' || msg.type() === 'warn') {
      consoleMessages.push(`${msg.type().toUpperCase()}: ${msg.text()}`);
      console.log(`🔧 Console ${msg.type()}: ${msg.text()}`);
    }
  });
  
  // Navigate to Royal Palace page
  await page.goto('http://localhost:5174/hotel/tivoli-royal-suite', { waitUntil: 'domcontentloaded' });
  
  // Wait for React to render
  await page.waitForTimeout(10000);
  
  // Check if the main app is loading at all
  const appState = await page.evaluate(() => {
    const reactRoot = document.querySelector('#root');
    const bodyText = document.body.textContent || '';
    
    // Check for progressive loading indicators
    const skeletons = document.querySelectorAll('[class*="skeleton"], [class*="Skeleton"]');
    const loadingElements = document.querySelectorAll('[class*="loading"], [class*="Loading"]');
    
    // Check if main sections exist at all
    const sections = Array.from(document.querySelectorAll('section')).map(section => ({
      innerHTML: section.innerHTML.substring(0, 100),
      textContent: section.textContent?.substring(0, 50) || ''
    }));
    
    return {
      hasReactRoot: !!reactRoot,
      bodyTextLength: bodyText.length,
      hasWelcomeText: bodyText.includes('Welcome to Tivoli Royal Palace'),
      hasGalleryText: bodyText.includes('Gallery'),
      hasAccommodationsText: bodyText.includes('Accommodations'),
      hasDiningText: bodyText.includes('Dining'),
      hasExperiencesText: bodyText.includes('Discover Heritage Luxury'),
      skeletonCount: skeletons.length,
      loadingCount: loadingElements.length,
      sectionCount: sections.length,
      sections: sections.slice(0, 3) // First 3 sections only
    };
  });
  
  console.log('\n📊 APPLICATION STATE:');
  console.log(`React Root exists: ${appState.hasReactRoot}`);
  console.log(`Body text length: ${appState.bodyTextLength} chars`);
  console.log(`Welcome text: ${appState.hasWelcomeText ? '✅' : '❌'}`);
  console.log(`Gallery text: ${appState.hasGalleryText ? '✅' : '❌'}`);
  console.log(`Accommodations text: ${appState.hasAccommodationsText ? '✅' : '❌'}`);
  console.log(`Dining text: ${appState.hasDiningText ? '✅' : '❌'}`);
  console.log(`Experiences text: ${appState.hasExperiencesText ? '✅' : '❌'}`);
  console.log(`Skeleton elements: ${appState.skeletonCount}`);
  console.log(`Loading elements: ${appState.loadingCount}`);
  console.log(`Total sections: ${appState.sectionCount}`);
  
  console.log('\n📝 FIRST 3 SECTIONS:');
  appState.sections.forEach((section, i) => {
    console.log(`   ${i + 1}. ${section.textContent.trim()}`);
  });
  
  // Check progressive loading state specifically
  const progressiveState = await page.evaluate(() => {
    // Try to access window variables that might show progressive loading state
    const windowKeys = Object.keys(window).filter(key => 
      key.includes('progressive') || key.includes('load') || key.includes('should')
    );
    
    return {
      windowKeys: windowKeys.slice(0, 10), // First 10 only
      locationPathname: window.location.pathname,
      locationHash: window.location.hash,
      locationSearch: window.location.search
    };
  });
  
  console.log('\n🔧 PROGRESSIVE LOADING DEBUG:');
  console.log(`Window keys: ${progressiveState.windowKeys.join(', ')}`);
  console.log(`Pathname: ${progressiveState.locationPathname}`);
  console.log(`Hash: ${progressiveState.locationHash}`);
  console.log(`Search: ${progressiveState.locationSearch}`);
  
  // Take screenshot
  await page.screenshot({ 
    path: 'debug-sections.png',
    fullPage: true 
  });
  
  console.log('\n📸 Screenshot saved: debug-sections.png');
  
  if (jsErrors.length > 0) {
    console.log('\n🚨 JAVASCRIPT ERRORS:');
    jsErrors.forEach(error => console.log(`   ${error}`));
  }
  
  if (consoleMessages.length > 0) {
    console.log('\n🔧 CONSOLE MESSAGES:');
    consoleMessages.forEach(msg => console.log(`   ${msg}`));
  }
  
  if (jsErrors.length === 0 && consoleMessages.length === 0) {
    console.log('\n✅ No JavaScript errors or console warnings detected');
  }
});