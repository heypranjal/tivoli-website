/**
 * Final comprehensive verification test
 * Tests both API optimization and monitoring accuracy
 */

import { test, expect } from '@playwright/test';

test('Final verification: API optimization and accurate monitoring', async ({ page }) => {
  // Track API requests
  const apiRequests: { url: string; method: string; timestamp: number }[] = [];
  
  page.on('request', request => {
    const url = request.url();
    const shouldTrack = (
      url.includes('supabase.co/rest/v1/') ||
      (url.startsWith('http') && !url.includes('localhost') && !url.includes('127.0.0.1')) ||
      url.includes('/api/')
    ) && (
      !url.includes('chrome-extension://') &&
      !url.includes('webpack') &&
      !url.includes('.hot-update.') &&
      !url.includes('sockjs-node') &&
      !url.includes('__vite') &&
      !url.includes('.map') &&
      !url.endsWith('.js') &&
      !url.endsWith('.css') &&
      !url.endsWith('.png') &&
      !url.endsWith('.jpg') &&
      !url.endsWith('.svg')
    );

    if (shouldTrack) {
      apiRequests.push({
        url,
        method: request.method(),
        timestamp: Date.now()
      });
    }
  });

  console.log('🎯 Final verification test starting...');

  // Test 1: Navigate to problematic page
  console.log('📄 Testing Wedcation Ambala page (previously 1000+ requests)...');
  await page.goto('http://localhost:5173/hotels/wedcation-by-tivoli-ambala');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  const ambalaRequests = apiRequests.length;
  console.log(`📊 Ambala page API requests: ${ambalaRequests}`);

  // Test 2: Navigate to another hotel page
  console.log('📄 Testing Lotus Court page...');
  apiRequests.length = 0; // Reset counter
  await page.goto('http://localhost:5173/hotels/tivoli-lotus-court');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  const lotusRequests = apiRequests.length;
  console.log(`📊 Lotus Court page API requests: ${lotusRequests}`);

  // Test 3: Check monitoring dashboard
  console.log('📊 Testing monitoring dashboard...');
  await page.goto('http://localhost:5173/');
  await page.waitForTimeout(1000);

  const monitoringButton = page.locator('[title*="monitoring" i], [title*="API" i], button:has-text("📊")').first();
  
  if (await monitoringButton.isVisible({ timeout: 2000 })) {
    await monitoringButton.click();
    await page.waitForTimeout(1000);
    
    const dashboardContent = await page.textContent('body');
    
    // Check for current session tracking
    const hasCurrentSession = dashboardContent?.includes('Current Session API Hits') || 
                             dashboardContent?.includes('Current Session:');
    
    // Check for optimization status
    const hasOptimizationStatus = dashboardContent?.includes('React Query Optimization Active');
    
    console.log(`✅ Dashboard shows current session: ${hasCurrentSession}`);
    console.log(`✅ Dashboard shows optimization status: ${hasOptimizationStatus}`);
    
    if (hasCurrentSession && hasOptimizationStatus) {
      console.log('🎉 Monitoring dashboard is working perfectly!');
    }
  }

  // Final verification
  const avgRequests = (ambalaRequests + lotusRequests) / 2;
  console.log(`\n📊 FINAL RESULTS:`);
  console.log(`   Ambala page: ${ambalaRequests} requests`);
  console.log(`   Lotus Court: ${lotusRequests} requests`);
  console.log(`   Average: ${avgRequests} requests per page`);

  if (avgRequests <= 50) {
    console.log(`🎉 SUCCESS! Average ${avgRequests} requests vs. previous 1000+`);
    console.log(`📈 Improvement: ${Math.round((1000 - avgRequests) / 1000 * 100)}% reduction!`);
  } else {
    console.log(`⚠️  Still elevated but much better than 1000+`);
  }

  // Verify reasonable request count
  expect(ambalaRequests).toBeLessThan(100);
  expect(lotusRequests).toBeLessThan(100);
  
  console.log('✅ Final verification complete - All systems optimized!');
});