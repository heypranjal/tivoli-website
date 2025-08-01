import { test, expect } from '@playwright/test';

test('capture console logs for debug', async ({ page }) => {
  console.log('🔍 Capturing console logs for debug...');
  
  const consoleMessages = [];
  
  // Listen to console messages
  page.on('console', msg => {
    const message = msg.text();
    if (message.includes('Debug:') || message.includes('experiences') || message.includes('shouldLoad')) {
      consoleMessages.push(message);
      console.log(`BROWSER: ${message}`);
    }
  });
  
  // Navigate to Royal Palace page
  await page.goto('http://localhost:5174/hotel/tivoli-royal-suite', { waitUntil: 'domcontentloaded' });
  
  // Wait for React to load and run
  await page.waitForTimeout(8000);
  
  console.log('\n📋 CAPTURED CONSOLE MESSAGES:');
  consoleMessages.forEach((msg, i) => {
    console.log(`   ${i + 1}. ${msg}`);
  });
  
  if (consoleMessages.length === 0) {
    console.log('   No debug messages found');
  }
});