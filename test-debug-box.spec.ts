import { test, expect } from '@playwright/test';

test('check debug box with experiences data', async ({ page }) => {
  console.log('🔍 Checking debug box with experiences data...');
  
  // Navigate to Royal Palace page
  await page.goto('http://localhost:5174/hotel/tivoli-royal-suite', { waitUntil: 'domcontentloaded' });
  
  // Wait for React to render
  await page.waitForTimeout(3000);
  
  // Look for the debug box
  const debugInfo = await page.evaluate(() => {
    const debugBox = document.querySelector('div[style*="border: 2px solid red"]');
    
    if (debugBox) {
      return {
        hasDebugBox: true,
        debugContent: debugBox.textContent || '',
        innerHTML: debugBox.innerHTML
      };
    }
    
    return {
      hasDebugBox: false,
      debugContent: '',
      innerHTML: ''
    };
  });
  
  console.log('\n📊 DEBUG BOX INFO:');
  console.log(`Has debug box: ${debugInfo.hasDebugBox ? '✅' : '❌'}`);
  
  if (debugInfo.hasDebugBox) {
    console.log('📋 DEBUG CONTENT:');
    console.log(debugInfo.debugContent);
  }
  
  // Take screenshot
  await page.screenshot({ 
    path: 'debug-box-test.png',
    fullPage: true 
  });
  
  console.log('\n📸 Screenshot saved: debug-box-test.png');
});