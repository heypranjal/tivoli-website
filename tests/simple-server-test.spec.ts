/**
 * Simple Server Test - Quick diagnosis
 */

import { test, expect } from '@playwright/test';

test('Quick server diagnosis', async ({ page }) => {
  console.log('🔍 Starting quick server diagnosis...');

  // Monitor console and errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('❌ Console Error:', msg.text());
    }
  });

  page.on('pageerror', error => {
    console.error('💥 Page Error:', error.message);
  });

  page.on('requestfailed', request => {
    console.error('🌐 Network Error:', request.url(), '-', request.failure()?.errorText);
  });

  console.log('📄 Loading home page...');
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  
  console.log('⏱️ Waiting 5 seconds to observe...');
  await page.waitForTimeout(5000);
  
  // Check if page is still responsive
  console.log('🔍 Checking page responsiveness...');
  const title = await page.title();
  console.log('📄 Page title:', title);
  
  // Try to reload
  console.log('🔄 Testing reload...');
  await page.reload({ waitUntil: 'domcontentloaded', timeout: 10000 });
  
  console.log('✅ Basic test complete');
});