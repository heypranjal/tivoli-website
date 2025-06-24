/**
 * Database Stability Test
 * Monitor specific database queries that might cause server crashes
 */

import { test, expect } from '@playwright/test';

test('Database and server stability test', async ({ page }) => {
  console.log('🗄️ Starting database stability test...');

  let errorCount = 0;
  let networkErrorCount = 0;
  let dbErrorCount = 0;

  page.on('console', msg => {
    const text = msg.text();
    if (msg.type() === 'error') {
      errorCount++;
      console.log(`❌ Console Error ${errorCount}:`, text);
      
      if (text.includes('supabase') || text.includes('database') || text.includes('query')) {
        dbErrorCount++;
        console.log(`🗄️ Database Error ${dbErrorCount}:`, text);
      }
    }
  });

  page.on('requestfailed', request => {
    networkErrorCount++;
    const url = request.url();
    const error = request.failure()?.errorText;
    console.log(`🌐 Network Error ${networkErrorCount}:`, url, '-', error);
    
    if (url.includes('supabase')) {
      console.log('🗄️ Supabase request failed:', url);
    }
  });

  // Test 1: Initial page load
  console.log('📄 Loading page...');
  await page.goto('http://localhost:5173/', { 
    waitUntil: 'domcontentloaded', 
    timeout: 20000 
  });

  // Test 2: Wait for Our Hotels section and monitor
  console.log('🏨 Waiting for Our Hotels section...');
  await page.waitForSelector('text=Our Hotels', { timeout: 15000 });

  // Test 3: Monitor for 10 seconds after initial load
  console.log('⏱️ Monitoring for 10 seconds after load...');
  await page.waitForTimeout(10000);

  // Test 4: Try interacting with brand tabs
  console.log('🏷️ Looking for brand tabs...');
  const brandButtons = await page.locator('button').filter({ hasText: /TIVOLI|OMNIA|UPPER HSE|WEDCATION/i }).count();
  console.log(`📊 Found ${brandButtons} brand buttons`);

  if (brandButtons > 0) {
    // Test 5: Click different brand tabs and monitor stability
    console.log('🖱️ Testing brand tab interactions...');
    
    const tabs = ['THE TIVOLI', 'OMNIA', 'THE UPPER HSE', 'WEDCATION'];
    
    for (const tabName of tabs) {
      try {
        console.log(`🎯 Testing ${tabName} tab...`);
        const tab = page.locator('button', { hasText: new RegExp(tabName, 'i') });
        
        if (await tab.count() > 0) {
          await tab.first().click({ timeout: 5000 });
          console.log(`✅ Clicked ${tabName} tab`);
          
          // Wait and monitor after each click
          await page.waitForTimeout(3000);
        }
      } catch (error) {
        console.log(`❌ Failed to click ${tabName} tab:`, error.message);
      }
    }
  }

  // Test 6: Multiple page reloads to test stability
  console.log('🔄 Testing page stability with reloads...');
  for (let i = 1; i <= 3; i++) {
    try {
      console.log(`🔄 Reload ${i}/3...`);
      await page.reload({ waitUntil: 'domcontentloaded', timeout: 10000 });
      await page.waitForTimeout(2000);
    } catch (error) {
      console.log(`❌ Reload ${i} failed:`, error.message);
      break;
    }
  }

  // Test 7: Final server check
  console.log('🔍 Final server connectivity test...');
  try {
    const response = await page.goto('http://localhost:5173/', { 
      waitUntil: 'domcontentloaded', 
      timeout: 10000 
    });
    
    if (response?.ok()) {
      console.log('✅ Server still responding');
    } else {
      console.log('⚠️ Server response not OK:', response?.status());
    }
  } catch (error) {
    console.log('❌ Server connection failed:', error.message);
    throw new Error('Server stopped responding during test');
  }

  // Final report
  console.log('\n📊 STABILITY TEST REPORT:');
  console.log(`Total Console Errors: ${errorCount}`);
  console.log(`Database Errors: ${dbErrorCount}`);
  console.log(`Network Errors: ${networkErrorCount}`);
  
  if (errorCount > 10) {
    console.log('⚠️ High error count detected - potential stability issue');
  }
  
  if (dbErrorCount > 0) {
    console.log('🗄️ Database errors detected - check Supabase connection');
  }
  
  console.log('✅ Stability test completed');
});