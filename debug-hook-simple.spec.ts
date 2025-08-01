import { test, expect } from '@playwright/test';

test('simple hook debug', async ({ page }) => {
  console.log('🔍 Simple hook debug...');
  
  // Add console logging to track hook data
  await page.addInitScript(() => {
    window.debugHookData = {};
    
    // Override console.log to capture hook data
    const originalLog = console.log;
    window.console.log = (...args) => {
      if (args[0] && typeof args[0] === 'string' && args[0].includes('experiences')) {
        window.debugHookData.experiences = args;
      }
      originalLog.apply(console, args);
    };
  });
  
  // Navigate to Royal Palace page
  await page.goto('http://localhost:5174/hotel/tivoli-royal-suite', { waitUntil: 'domcontentloaded' });
  
  // Wait for React to render
  await page.waitForTimeout(3000);
  
  // Directly check what the hook returns
  const hookDebug = await page.evaluate(() => {
    // Check if useTivoliRoyalPalace is accessible somehow
    return {
      hasDebugData: !!window.debugHookData,
      debugKeys: Object.keys(window.debugHookData || {}),
      
      // Let's manually check the hook by looking at DOM data attributes or similar
      bodyInnerHTML: document.body.innerHTML.substring(0, 500), // First 500 chars
      
      // Check if the experiences data is in the DOM somehow
      hasRestaurant1: document.body.innerHTML.includes('Restaurant1.jpg'),
      hasRestaurant2: document.body.innerHTML.includes('Restaurant2.jpg'),  
      hasRestaurant3: document.body.innerHTML.includes('Restaurant3.jpg'),
      hasRoyalWeddings: document.body.innerHTML.includes('Royal Weddings'),
      hasHeritageEvents: document.body.innerHTML.includes('Heritage Corporate Events'),
    };
  });
  
  console.log('\n📊 HOOK DEBUG:');
  console.log(`Has debug data: ${hookDebug.hasDebugData}`);
  console.log(`Debug keys: ${hookDebug.debugKeys.join(', ')}`);
  console.log(`Has Restaurant1.jpg: ${hookDebug.hasRestaurant1 ? '✅' : '❌'}`);
  console.log(`Has Restaurant2.jpg: ${hookDebug.hasRestaurant2 ? '✅' : '❌'}`);
  console.log(`Has Restaurant3.jpg: ${hookDebug.hasRestaurant3 ? '✅' : '❌'}`);
  console.log(`Has Royal Weddings: ${hookDebug.hasRoyalWeddings ? '✅' : '❌'}`);
  console.log(`Has Heritage Events: ${hookDebug.hasHeritageEvents ? '✅' : '❌'}`);
  
  console.log('\n📄 BODY PREVIEW:');
  console.log(hookDebug.bodyInnerHTML);
  
  // Take screenshot
  await page.screenshot({ 
    path: 'hook-debug-simple.png',
    fullPage: true 
  });
  
  console.log('\n📸 Screenshot saved: hook-debug-simple.png');
});