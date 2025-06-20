import { test, expect } from '@playwright/test';

test('Debug Royal Court Okhla Component Rendering', async ({ page }) => {
  console.log('🔍 DEBUGGING: Component rendering investigation...');

  // Set up error tracking
  const consoleErrors: string[] = [];
  const jsErrors: string[] = [];
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', error => {
    jsErrors.push(`${error.name}: ${error.message}`);
  });

  // Navigate to Royal Court Okhla page
  const targetUrl = 'http://localhost:5173/delhi/royal-court-okhla';
  console.log(`📍 Navigating to: ${targetUrl}`);
  
  await page.goto(targetUrl);
  await page.waitForLoadState('networkidle');

  // Take screenshot of current state
  await page.screenshot({ 
    path: 'debug-royal-court-component-state.png', 
    fullPage: true 
  });

  // Check if we can access the hotel data from the page
  const componentState = await page.evaluate(() => {
    // Try to find React component and its state
    const bodyText = document.body.textContent || '';
    
    return {
      // Check if we're loading the right component
      bodyTextLength: bodyText.length,
      containsRoyalCourt: bodyText.toLowerCase().includes('royal court'),
      containsOkhla: bodyText.toLowerCase().includes('okhla'),
      containsTivoli: bodyText.toLowerCase().includes('tivoli'),
      
      // Check document structure
      hasMainContent: !!document.querySelector('main'),
      hasNavigation: !!document.querySelector('nav'),
      h1Count: document.querySelectorAll('h1').length,
      h2Count: document.querySelectorAll('h2').length,
      h3Count: document.querySelectorAll('h3').length,
      sectionsCount: document.querySelectorAll('section').length,
      
      // Check for specific content
      hasHotelImages: document.querySelectorAll('img[alt*="Tivoli"]').length,
      hasAmenities: !!document.querySelector('[class*="amenity"], [class*="amenities"]'),
      hasBookingForm: !!document.querySelector('form'),
      
      // Check for React-specific elements
      hasReactRoot: !!document.querySelector('#root'),
      rootChildren: document.querySelector('#root')?.children.length || 0,
      
      // URL and title verification
      currentUrl: window.location.href,
      currentTitle: document.title,
      
      // Check if content is hidden
      hiddenElements: document.querySelectorAll('[style*="display: none"], [style*="visibility: hidden"]').length
    };
  });

  console.log('\n📊 COMPONENT STATE ANALYSIS:');
  console.log('  URL:', componentState.currentUrl);
  console.log('  Title:', componentState.currentTitle);
  console.log('  Body text length:', componentState.bodyTextLength);
  console.log('  Contains "Royal Court":', componentState.containsRoyalCourt);
  console.log('  Contains "Okhla":', componentState.containsOkhla);
  console.log('  Contains "Tivoli":', componentState.containsTivoli);
  console.log('  H1 headings:', componentState.h1Count);
  console.log('  H2 headings:', componentState.h2Count);
  console.log('  Sections:', componentState.sectionsCount);
  console.log('  Hotel images:', componentState.hasHotelImages);
  console.log('  Has booking form:', componentState.hasBookingForm);
  console.log('  React root children:', componentState.rootChildren);

  // Check errors
  if (consoleErrors.length > 0) {
    console.log('\n❌ CONSOLE ERRORS:');
    consoleErrors.forEach(error => console.log(`  ${error}`));
  }

  if (jsErrors.length > 0) {
    console.log('\n💥 JAVASCRIPT ERRORS:');
    jsErrors.forEach(error => console.log(`  ${error}`));
  }

  // Now let's compare with a working page (Bijwasan) to see the difference
  console.log('\n🔄 Comparing with working page (Bijwasan)...');
  
  await page.goto('http://localhost:5173/delhi/tivoli-bijwasan');
  await page.waitForLoadState('networkidle');

  const bijwasanState = await page.evaluate(() => {
    const bodyText = document.body.textContent || '';
    
    return {
      bodyTextLength: bodyText.length,
      h1Count: document.querySelectorAll('h1').length,
      h1Text: document.querySelector('h1')?.textContent || 'No h1',
      sectionsCount: document.querySelectorAll('section').length,
      hasHotelImages: document.querySelectorAll('img[alt*="Tivoli"]').length,
      currentUrl: window.location.href,
      rootChildren: document.querySelector('#root')?.children.length || 0
    };
  });

  console.log('\n✅ BIJWASAN (WORKING) COMPARISON:');
  console.log('  URL:', bijwasanState.currentUrl);
  console.log('  Body text length:', bijwasanState.bodyTextLength);
  console.log('  H1 text:', bijwasanState.h1Text);
  console.log('  H1 count:', bijwasanState.h1Count);
  console.log('  Sections:', bijwasanState.sectionsCount);
  console.log('  Hotel images:', bijwasanState.hasHotelImages);
  console.log('  React root children:', bijwasanState.rootChildren);

  // Now test with specific React DevTools-like inspection
  console.log('\n🧪 Testing React component inspection...');
  
  await page.goto(targetUrl);
  await page.waitForLoadState('networkidle');

  const reactInspection = await page.evaluate(() => {
    try {
      // Check if hotel data is accessible in the component
      const scripts = Array.from(document.querySelectorAll('script[type="module"]'));
      
      // Look for any error indicators in the DOM
      const possibleErrors = Array.from(document.querySelectorAll('*')).filter(el => {
        const text = el.textContent?.toLowerCase() || '';
        return text.includes('error') || text.includes('not found') || text.includes('loading');
      }).map(el => el.textContent?.substring(0, 100));

      // Check if the page has minimal structure (just navigation)
      const onlyHasNavigation = document.querySelector('nav') && 
                                document.querySelectorAll('section').length === 0 &&
                                document.querySelectorAll('main').length === 0;

      return {
        scriptCount: scripts.length,
        possibleErrors: possibleErrors.slice(0, 3), // First 3 error messages
        onlyHasNavigation,
        totalElements: document.querySelectorAll('*').length,
        interactiveElements: document.querySelectorAll('button, input, a').length
      };
    } catch (error) {
      return {
        error: error.message,
        scriptCount: 0,
        possibleErrors: [],
        onlyHasNavigation: false,
        totalElements: 0,
        interactiveElements: 0
      };
    }
  });

  console.log('\n🔬 REACT INSPECTION:');
  console.log('  Scripts loaded:', reactInspection.scriptCount);
  console.log('  Only has navigation:', reactInspection.onlyHasNavigation);
  console.log('  Total DOM elements:', reactInspection.totalElements);
  console.log('  Interactive elements:', reactInspection.interactiveElements);
  
  if (reactInspection.possibleErrors.length > 0) {
    console.log('  Possible error messages:', reactInspection.possibleErrors);
  }

  // Summary and diagnosis
  console.log('\n🔍 DIAGNOSIS:');
  
  if (componentState.bodyTextLength < 1000) {
    console.log('  ⚠️  Page has very little content - likely not rendering properly');
  }
  
  if (componentState.h1Count === 0) {
    console.log('  ⚠️  No H1 headings found - main content not rendering');
  }
  
  if (componentState.sectionsCount < 3) {
    console.log('  ⚠️  Very few sections - content not loading');
  }
  
  if (!componentState.containsRoyalCourt && !componentState.containsOkhla) {
    console.log('  ⚠️  No Royal Court or Okhla text found - hotel data not being displayed');
  }
  
  if (jsErrors.length > 0) {
    console.log('  💥 JavaScript errors present - check component logic');
  }
  
  if (reactInspection.onlyHasNavigation) {
    console.log('  🚨 CRITICAL: Only navigation present - main component not rendering');
  }

  // Final recommendation
  if (reactInspection.onlyHasNavigation || componentState.h1Count === 0) {
    console.log('\n🎯 RECOMMENDATION: The component is loading but not rendering content.');
    console.log('   This suggests an issue with:');
    console.log('   1. Hotel data lookup in component');
    console.log('   2. Component state management');
    console.log('   3. Conditional rendering logic');
    console.log('   4. Component mounting/rendering cycle');
  }
});