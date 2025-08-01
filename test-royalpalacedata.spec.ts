import { test, expect } from '@playwright/test';

test('debug royalPalaceData.experiences', async ({ page }) => {
  console.log('🔍 Debugging royalPalaceData.experiences...');
  
  // Navigate to Royal Palace page
  await page.goto('http://localhost:5174/hotel/tivoli-royal-suite', { waitUntil: 'domcontentloaded' });
  
  // Wait for page to load
  await page.waitForTimeout(3000);
  
  // Debug by injecting console.log statements into the page
  const debugData = await page.evaluate(() => {
    // Check if React DevTools can show us the component state
    const reactRoot = document.querySelector('#root');
    
    // Try to access window variables that might contain the data
    const windowKeys = Object.keys(window).filter(key => 
      key.includes('royal') || key.includes('palace') || key.includes('experience')
    );
    
    // Look for any elements that might contain the experiences data
    const scriptsWithData = Array.from(document.querySelectorAll('script')).map(script => ({
      content: script.textContent?.substring(0, 200) || '',
      hasExperiences: script.textContent?.includes('experiences') || false,
      hasRestaurant: script.textContent?.includes('Restaurant') || false
    })).filter(script => script.hasExperiences || script.hasRestaurant);
    
    return {
      reactRootExists: !!reactRoot,
      windowKeysCount: windowKeys.length,
      relevantWindowKeys: windowKeys,
      scriptsWithDataCount: scriptsWithData.length,
      scriptsWithData: scriptsWithData.slice(0, 3) // First 3 only
    };
  });
  
  console.log('\n🔍 DEBUG DATA:');
  console.log(`React root exists: ${debugData.reactRootExists}`);
  console.log(`Window keys with 'royal/palace/experience': ${debugData.relevantWindowKeys.join(', ')}`);
  console.log(`Scripts with experiences data: ${debugData.scriptsWithDataCount}`);
  
  if (debugData.scriptsWithData.length > 0) {
    console.log('\n📜 SCRIPTS WITH RELEVANT DATA:');
    debugData.scriptsWithData.forEach((script, i) => {
      console.log(`   ${i+1}. Has experiences: ${script.hasExperiences}, Has restaurant: ${script.hasRestaurant}`);
      console.log(`      Content preview: ${script.content.substring(0, 100)}...`);
    });
  }
  
  // Check if there are any error messages in console
  const consoleMessages = [];
  page.on('console', msg => {
    consoleMessages.push(`${msg.type()}: ${msg.text()}`);
  });
  
  // Wait a bit more for any console messages
  await page.waitForTimeout(2000);
  
  console.log('\n📝 CONSOLE MESSAGES:');
  consoleMessages.forEach(msg => console.log(`   ${msg}`));
  
  // Check for any network requests to the hook
  await page.route('**/*', route => {
    const url = route.request().url();
    if (url.includes('royal') || url.includes('experience')) {
      console.log(`🌐 Network request: ${url}`);
    }
    route.continue();
  });
  
  // Try to trigger a re-render by scrolling
  await page.evaluate(() => window.scrollTo(0, 100));
  await page.waitForTimeout(1000);
  
  console.log('\n✅ Debug completed');
});