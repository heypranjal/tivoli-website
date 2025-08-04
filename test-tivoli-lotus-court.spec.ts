import { test, expect } from '@playwright/test';

test.describe('Tivoli Lotus Court Page Tests', () => {
  test('should load the Tivoli Lotus Court page successfully', async ({ page }) => {
    // Navigate to the page
    await page.goto('http://localhost:5174/hotel/tivoli-lotus-court');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Check if the page loaded without errors
    await expect(page).toHaveTitle(/Tivoli/i);
    
    // Take a screenshot for visual verification
    await page.screenshot({ path: 'tivoli-lotus-court-full.png', fullPage: true });
    
    console.log('Page loaded successfully');
  });

  test('should check for key page elements', async ({ page }) => {
    await page.goto('http://localhost:5174/hotel/tivoli-lotus-court');
    await page.waitForLoadState('networkidle');
    
    // Check for common hotel page elements
    const elementsToCheck = [
      'h1', // Main heading
      'nav', // Navigation
      '[data-testid="hero-section"], .hero', // Hero section
      '[data-testid="accommodation"], .accommodation', // Accommodations
      '[data-testid="dining"], .dining', // Dining
      '[data-testid="spaces"], .spaces', // Event spaces
      '[data-testid="contact"], .contact', // Contact info
    ];
    
    for (const selector of elementsToCheck) {
      const element = await page.locator(selector).first();
      const isVisible = await element.isVisible().catch(() => false);
      console.log(`${selector}: ${isVisible ? '✅ Found' : '❌ Not found'}`);
    }
  });

  test('should check for console errors and network failures', async ({ page }) => {
    const consoleErrors = [];
    const networkErrors = [];
    
    // Listen for console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    // Listen for network failures
    page.on('response', response => {
      if (response.status() >= 400) {
        networkErrors.push(`${response.status()} - ${response.url()}`);
      }
    });
    
    await page.goto('http://localhost:5174/hotel/tivoli-lotus-court');
    await page.waitForLoadState('networkidle');
    
    // Wait a bit more to catch any delayed errors
    await page.waitForTimeout(2000);
    
    console.log('Console Errors:', consoleErrors);
    console.log('Network Errors:', networkErrors);
    
    // Report findings
    if (consoleErrors.length === 0 && networkErrors.length === 0) {
      console.log('✅ No errors detected');
    } else {
      console.log(`❌ Found ${consoleErrors.length} console errors and ${networkErrors.length} network errors`);
    }
  });

  test('should test page responsiveness', async ({ page }) => {
    await page.goto('http://localhost:5174/hotel/tivoli-lotus-court');
    
    // Test different viewport sizes
    const viewports = [
      { width: 1920, height: 1080, name: 'Desktop' },
      { width: 1024, height: 768, name: 'Tablet' },
      { width: 375, height: 667, name: 'Mobile' }
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForLoadState('networkidle');
      
      // Take screenshot for each viewport
      await page.screenshot({ 
        path: `tivoli-lotus-court-${viewport.name.toLowerCase()}.png`,
        fullPage: true 
      });
      
      console.log(`✅ ${viewport.name} (${viewport.width}x${viewport.height}) screenshot taken`);
    }
  });

  test('should check for interactive elements', async ({ page }) => {
    await page.goto('http://localhost:5174/hotel/tivoli-lotus-court');
    await page.waitForLoadState('networkidle');
    
    // Check for interactive elements
    const interactiveElements = [
      'button',
      'a[href]',
      'input',
      '[role="button"]',
      '.cta-button',
      '.book-now',
      '.contact-button'
    ];
    
    for (const selector of interactiveElements) {
      const elements = await page.locator(selector).all();
      console.log(`${selector}: ${elements.length} found`);
      
      // Test first few elements if they exist
      for (let i = 0; i < Math.min(elements.length, 3); i++) {
        const element = elements[i];
        const isVisible = await element.isVisible().catch(() => false);
        const isEnabled = await element.isEnabled().catch(() => false);
        console.log(`  - Element ${i + 1}: ${isVisible ? 'visible' : 'hidden'}, ${isEnabled ? 'enabled' : 'disabled'}`);
      }
    }
  });

  test('should check page performance', async ({ page }) => {
    // Start performance measurement
    const startTime = Date.now();
    
    await page.goto('http://localhost:5174/hotel/tivoli-lotus-court');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Get performance metrics
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
        firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
      };
    });
    
    console.log('Performance Metrics:');
    console.log(`Load Time: ${loadTime}ms`);
    console.log(`DOM Content Loaded: ${performanceMetrics.domContentLoaded}ms`);
    console.log(`Load Complete: ${performanceMetrics.loadComplete}ms`);
    console.log(`First Paint: ${performanceMetrics.firstPaint}ms`);
    console.log(`First Contentful Paint: ${performanceMetrics.firstContentfulPaint}ms`);
    
    // Performance assertions
    expect(loadTime).toBeLessThan(10000); // Should load within 10 seconds
  });
});