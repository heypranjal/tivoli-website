import { test, expect } from '@playwright/test';

test.describe('Troubleshoot Tivoli Lotus Court Hotel Page', () => {
  test('comprehensive troubleshooting analysis', async ({ page }) => {
    const url = '/hotel/tivoli-lotus-court';
    
    // Track console messages and errors
    const consoleMessages: string[] = [];
    const errors: string[] = [];
    const networkFailures: string[] = [];
    
    page.on('console', msg => {
      consoleMessages.push(`${msg.type()}: ${msg.text()}`);
      console.log(`🔍 Console [${msg.type()}]: ${msg.text()}`);
    });
    
    page.on('pageerror', error => {
      errors.push(error.message);
      console.log(`❌ Page Error: ${error.message}`);
    });
    
    page.on('requestfailed', request => {
      networkFailures.push(`${request.method()} ${request.url()} - ${request.failure()?.errorText}`);
      console.log(`🌐 Request Failed: ${request.method()} ${request.url()}`);
    });
    
    // Performance tracking
    const startTime = Date.now();
    
    console.log(`🔍 Starting troubleshoot of: ${url}`);
    
    try {
      // Navigate to the page
      const response = await page.goto(url, { 
        waitUntil: 'domcontentloaded',
        timeout: 30000 
      });
      
      console.log(`📊 Response Status: ${response?.status()}`);
      console.log(`📊 Response URL: ${response?.url()}`);
      
      // Wait for network idle
      await page.waitForLoadState('networkidle', { timeout: 15000 });
      
      const loadTime = Date.now() - startTime;
      console.log(`⚡ Page Load Time: ${loadTime}ms`);
      
      // Check page title
      const title = await page.title();
      console.log(`📄 Page Title: "${title}"`);
      
      // Check if content is present
      const bodyText = await page.locator('body').innerText();
      const contentLength = bodyText.trim().length;
      console.log(`📊 Content Length: ${contentLength} characters`);
      
      // Check for common elements
      const elements = {
        headings: await page.locator('h1, h2, h3').count(),
        images: await page.locator('img').count(),
        buttons: await page.locator('button').count(),
        links: await page.locator('a').count(),
        forms: await page.locator('form').count(),
        navigation: await page.locator('nav').count()
      };
      
      console.log(`🧩 Element Analysis:`);
      Object.entries(elements).forEach(([key, count]) => {
        console.log(`   ${key}: ${count}`);
      });
      
      // Check for loading states
      const loadingElements = await page.locator('[class*="loading"], [class*="spinner"], [class*="skeleton"]').count();
      console.log(`⏳ Loading Elements: ${loadingElements}`);
      
      // Check for React/JS framework indicators
      const reactRoot = await page.locator('#root').count();
      const reactElements = await page.locator('[data-reactroot], [data-testid]').count();
      console.log(`⚛️ React Root: ${reactRoot}, React Elements: ${reactElements}`);
      
      // Take screenshot
      await page.screenshot({ 
        path: 'troubleshoot-lotus-court.png',
        fullPage: true 
      });
      console.log(`📸 Screenshot saved: troubleshoot-lotus-court.png`);
      
      // Test basic interactions
      console.log(`🖱️ Testing Interactions:`);
      
      // Try to find and click navigation elements
      const navElements = page.locator('nav a, header a, [role="navigation"] a').first();
      if (await navElements.count() > 0) {
        console.log(`   Navigation elements found: ${await navElements.count()}`);
      }
      
      // Check for booking/CTA buttons
      const ctaButtons = page.locator('button:has-text("Book"), button:has-text("Reserve"), button:has-text("Contact")');
      const ctaCount = await ctaButtons.count();
      console.log(`   CTA Buttons found: ${ctaCount}`);
      
      // Check for hotel-specific content
      const hotelContent = {
        hotelName: await page.locator(':has-text("Lotus Court"), :has-text("Tivoli")').count(),
        amenities: await page.locator(':has-text("amenities"), :has-text("facilities")').count(),
        rooms: await page.locator(':has-text("room"), :has-text("suite")').count(),
        contact: await page.locator(':has-text("contact"), :has-text("phone"), :has-text("email")').count()
      };
      
      console.log(`🏨 Hotel Content Analysis:`);
      Object.entries(hotelContent).forEach(([key, count]) => {
        console.log(`   ${key}: ${count} mentions`);
      });
      
      // Performance metrics
      const performanceMetrics = await page.evaluate(() => {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const paintMetrics = performance.getEntriesByType('paint');
        
        return {
          loadComplete: Math.round(perfData.loadEventEnd - perfData.navigationStart),
          domReady: Math.round(perfData.domContentLoadedEventEnd - perfData.navigationStart),
          firstPaint: paintMetrics.find(p => p.name === 'first-paint')?.startTime || 0,
          firstContentfulPaint: paintMetrics.find(p => p.name === 'first-contentful-paint')?.startTime || 0
        };
      });
      
      console.log(`⚡ Performance Metrics:`);
      console.log(`   Load Complete: ${performanceMetrics.loadComplete}ms`);
      console.log(`   DOM Ready: ${performanceMetrics.domReady}ms`);
      console.log(`   First Paint: ${Math.round(performanceMetrics.firstPaint)}ms`);
      console.log(`   First Contentful Paint: ${Math.round(performanceMetrics.firstContentfulPaint)}ms`);
      
      // Summary Report
      console.log(`\n📋 TROUBLESHOOTING SUMMARY:`);
      console.log(`✅ Page loads successfully (${response?.status()})`);
      console.log(`⚡ Load time: ${loadTime}ms`);
      console.log(`📄 Title: "${title}"`);
      console.log(`📊 Content: ${contentLength} characters`);
      console.log(`🧩 Elements: ${Object.values(elements).reduce((a, b) => a + b, 0)} total`);
      
      if (consoleMessages.length > 0) {
        console.log(`🔍 Console Messages: ${consoleMessages.length}`);
        consoleMessages.slice(0, 5).forEach(msg => console.log(`   ${msg}`));
      }
      
      if (errors.length > 0) {
        console.log(`❌ JavaScript Errors: ${errors.length}`);
        errors.forEach(error => console.log(`   ${error}`));
      }
      
      if (networkFailures.length > 0) {
        console.log(`🌐 Network Failures: ${networkFailures.length}`);
        networkFailures.forEach(failure => console.log(`   ${failure}`));
      }
      
      // Basic assertions
      expect(response?.status()).toBe(200);
      expect(title).toBeTruthy();
      expect(contentLength).toBeGreaterThan(100);
      expect(reactRoot).toBeGreaterThan(0);
      
    } catch (error) {
      console.log(`❌ Troubleshooting Error: ${error}`);
      
      // Take error screenshot
      await page.screenshot({ 
        path: 'troubleshoot-error.png',
        fullPage: true 
      });
      
      throw error;
    }
  });
});