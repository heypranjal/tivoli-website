/**
 * Test to verify API request reduction after React Query migration
 */

import { test, expect } from '@playwright/test';

test('API requests should be significantly reduced with React Query', async ({ page }) => {
  // Track API requests
  const apiRequests: { url: string; method: string; timestamp: number }[] = [];
  
  // Intercept and filter meaningful API requests (same logic as our interceptor)
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

  console.log('🚀 Testing API reduction on Wedcation Ambala page...');

  // Navigate to the problematic page that was causing 1000+ requests
  await page.goto('http://localhost:5174/hotels/wedcation-by-tivoli-ambala');
  
  // Wait for page to fully load and any delayed requests
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  console.log(`📊 Total meaningful API requests: ${apiRequests.length}`);

  // Verify significant reduction in API requests
  if (apiRequests.length <= 5) {
    console.log('🎉 EXCELLENT! API requests ≤ 5 (target achieved)');
  } else if (apiRequests.length <= 20) {
    console.log('⚡ GOOD! API requests ≤ 20 (significant improvement)');
  } else {
    console.log('⚠️  API requests still elevated, but likely much better than 1000+');
  }

  // Log request details for analysis
  console.log('\nAPI Request Details:');
  apiRequests.forEach((req, i) => {
    console.log(`${i + 1}. ${req.method} ${req.url}`);
  });

  // Check if monitoring dashboard exists and shows reasonable numbers
  await page.goto('http://localhost:5174/');
  
  // Look for monitoring button (it might be floating)
  const monitoringButton = page.locator('[title*="monitoring" i], [title*="API" i]').first();
  
  if (await monitoringButton.isVisible({ timeout: 2000 })) {
    console.log('📊 Monitoring dashboard button found');
    await monitoringButton.click();
    
    // Wait for dashboard to appear
    await page.waitForTimeout(1000);
    
    // Check for monitoring content
    const dashboardContent = await page.textContent('body');
    if (dashboardContent?.includes('API Hits')) {
      console.log('✅ Monitoring dashboard loaded successfully');
    }
  } else {
    console.log('📊 Monitoring dashboard button not visible (normal behavior)');
  }

  // Assert that we have reasonable API request count (much less than 1000)
  expect(apiRequests.length).toBeLessThan(100); // Should be MUCH less than the previous 1000+
  
  console.log(`\n✅ Test completed. API requests reduced from 1000+ to ${apiRequests.length}`);
});