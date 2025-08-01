import { test, expect } from '@playwright/test';

test('check global debug output', async ({ page }) => {
  console.log('🔍 Checking global debug output...');
  
  // Navigate to Royal Palace page
  await page.goto('http://localhost:5174/hotel/tivoli-royal-suite', { waitUntil: 'domcontentloaded' });
  
  // Wait for React to render
  await page.waitForTimeout(5000);
  
  // Look for the global debug box
  const debugInfo = await page.evaluate(() => {
    const globalDebugBox = document.querySelector('div[style*="background: red"]');
    
    if (globalDebugBox) {
      return {
        hasGlobalDebugBox: true,
        debugContent: globalDebugBox.textContent || '',
        innerHTML: globalDebugBox.innerHTML
      };
    }
    
    // Also check if we can find the text anywhere
    const bodyText = document.body.textContent || '';
    const hasGlobalDebugText = bodyText.includes('GLOBAL DEBUG');
    
    return {
      hasGlobalDebugBox: false,
      hasGlobalDebugText,
      debugContent: '',
      innerHTML: '',
      bodyTextStart: bodyText.substring(0, 200)
    };
  });
  
  console.log('\n📊 GLOBAL DEBUG INFO:');
  console.log(`Has global debug box: ${debugInfo.hasGlobalDebugBox ? '✅' : '❌'}`);
  
  if (debugInfo.hasGlobalDebugBox) {
    console.log('📋 GLOBAL DEBUG CONTENT:');
    console.log(debugInfo.debugContent);
  } else {
    console.log(`Has global debug text: ${debugInfo.hasGlobalDebugText ? '✅' : '❌'}`);
    console.log('Body text start:', debugInfo.bodyTextStart);
  }
  
  // Take screenshot
  await page.screenshot({ 
    path: 'global-debug.png',
    fullPage: true 
  });
  
  console.log('\n📸 Screenshot saved: global-debug.png');
});