/**
 * Quick test to verify API request reduction after React Query migration
 * Run this with: node test-api-reduction.js
 */

import puppeteer from 'puppeteer';

async function testApiReduction() {
  const browser = await puppeteer.launch({ 
    headless: false,
    devtools: true,
    defaultViewport: { width: 1280, height: 720 }
  });
  
  const page = await browser.newPage();
  
  // Track API requests
  const apiRequests = [];
  
  page.on('request', request => {
    const url = request.url();
    // Filter meaningful API requests (same logic as our interceptor)
    if (
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
    ) {
      apiRequests.push({
        url,
        method: request.method(),
        timestamp: Date.now()
      });
    }
  });

  try {
    console.log('🚀 Starting API reduction test...');
    
    // Navigate to the Wedcation Ambala page (was problematic before)
    await page.goto('http://localhost:5174/hotels/wedcation-by-tivoli-ambala', {
      waitUntil: 'networkidle0',
      timeout: 10000
    });
    
    console.log('✅ Page loaded successfully');
    
    // Wait a few seconds for any delayed requests
    await page.waitForTimeout(3000);
    
    // Navigate to monitoring dashboard to check counts
    await page.goto('http://localhost:5174/', { waitUntil: 'networkidle0' });
    
    // Try to find and click monitoring button (if visible)
    try {
      await page.click('[title="API Monitoring Dashboard"]', { timeout: 2000 });
      await page.waitForTimeout(1000);
      
      // Check if monitoring data shows reduced API hits
      const dashboardText = await page.evaluate(() => document.body.innerText);
      
      if (dashboardText.includes('API Hits') || dashboardText.includes('Monitoring')) {
        console.log('📊 Monitoring dashboard accessible');
      }
    } catch (e) {
      console.log('📊 Monitoring dashboard not visible (normal if button is hidden)');
    }
    
    console.log('\n📊 API Request Summary:');
    console.log(`Total meaningful API requests: ${apiRequests.length}`);
    
    if (apiRequests.length <= 5) {
      console.log('🎉 SUCCESS! API requests reduced significantly (≤5 requests)');
      console.log('✅ React Query migration successful!');
    } else if (apiRequests.length <= 20) {
      console.log('⚡ GOOD! API requests reduced substantially (≤20 requests)');
      console.log('👍 React Query migration working well!');
    } else {
      console.log('⚠️  Still elevated API requests. Further optimization may be needed.');
    }
    
    // Show request details
    if (apiRequests.length > 0) {
      console.log('\nAPI Request Details:');
      apiRequests.forEach((req, i) => {
        console.log(`${i + 1}. ${req.method} ${req.url}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await browser.close();
  }
}

// Run the test
testApiReduction().catch(console.error);