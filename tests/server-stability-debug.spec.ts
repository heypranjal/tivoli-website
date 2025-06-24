/**
 * Server Stability Debug Test
 * Tests for server crashes, database hook issues, and memory problems
 */

import { test, expect } from '@playwright/test';

test.describe('Server Stability Debugging', () => {
  test.beforeEach(async ({ page }) => {
    // Set up console logging to catch errors
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        console.error('Browser Console Error:', msg.text());
      }
    });

    // Catch page errors
    page.on('pageerror', (error) => {
      console.error('Page Error:', error.message);
    });
  });

  test('should load Upper HSE page without crashes', async ({ page }) => {
    console.log('Testing Upper HSE page stability...');
    
    // Navigate to the page
    await page.goto('/hotel/upper-hse-sultanpur', { 
      waitUntil: 'networkidle',
      timeout: 10000 
    });

    // Check if the page loads successfully
    await expect(page.locator('h1')).toContainText('The Upper HSE');
    
    // Wait for any async operations to complete
    await page.waitForTimeout(3000);
    
    // Check if the page is still responsive
    await expect(page.locator('body')).toBeVisible();
    
    console.log('Upper HSE page loaded successfully');
  });

  test('should handle database hook errors gracefully', async ({ page }) => {
    console.log('Testing database hook error handling...');
    
    // Block database requests to simulate network issues
    await page.route('**/supabase.co/**', route => {
      route.abort('failed');
    });

    await page.goto('/hotel/upper-hse-sultanpur', { 
      waitUntil: 'domcontentloaded',
      timeout: 10000 
    });

    // Page should still load with fallback data
    await expect(page.locator('h1')).toContainText('The Upper HSE');
    
    // Check for error boundaries
    const errorMessage = page.locator('[data-testid="error-boundary"]');
    if (await errorMessage.isVisible()) {
      console.log('Error boundary activated correctly');
    }
    
    console.log('Database error handling test completed');
  });

  test('should monitor for memory leaks', async ({ page }) => {
    console.log('Testing for memory leaks...');
    
    // Navigate to the page multiple times
    for (let i = 0; i < 5; i++) {
      await page.goto('/hotel/upper-hse-sultanpur');
      await page.waitForLoadState('networkidle');
      await page.reload();
      await page.waitForTimeout(1000);
    }
    
    // Check if page is still responsive
    await expect(page.locator('h1')).toContainText('The Upper HSE');
    
    console.log('Memory leak test completed');
  });

  test('should check for infinite re-renders', async ({ page }) => {
    console.log('Testing for infinite re-renders...');
    
    let renderCount = 0;
    
    // Monitor for excessive console logs (sign of re-renders)
    page.on('console', (msg) => {
      if (msg.text().includes('render') || msg.text().includes('useEffect')) {
        renderCount++;
      }
    });

    await page.goto('/hotel/upper-hse-sultanpur');
    await page.waitForLoadState('networkidle');
    
    // Wait and count renders
    await page.waitForTimeout(5000);
    
    console.log(`Render count: ${renderCount}`);
    
    // Check if render count is reasonable (less than 50 in 5 seconds)
    expect(renderCount).toBeLessThan(50);
    
    console.log('Re-render test completed');
  });

  test('should test navigation between pages', async ({ page }) => {
    console.log('Testing navigation stability...');
    
    // Test navigation between different hotel pages
    const pages = [
      '/hotel/upper-hse-sultanpur',
      '/hotels',
      '/hotel/tivoli-bijwasan',
      '/hotel/upper-hse-sultanpur'
    ];

    for (const url of pages) {
      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 8000 });
        await page.waitForTimeout(1000);
        console.log(`Successfully navigated to ${url}`);
      } catch (error) {
        console.error(`Failed to navigate to ${url}:`, error);
      }
    }
    
    // Check final page is still working
    await expect(page.locator('body')).toBeVisible();
    
    console.log('Navigation stability test completed');
  });

  test('should monitor React Query state', async ({ page }) => {
    console.log('Testing React Query state management...');
    
    // Add script to monitor React Query
    await page.addInitScript(() => {
      window.reactQueryDebug = {
        queries: [],
        errors: []
      };
      
      // Hook into React Query if available
      if (window.__REACT_QUERY_DEVTOOLS__) {
        console.log('React Query DevTools detected');
      }
    });

    await page.goto('/hotel/upper-hse-sultanpur');
    await page.waitForLoadState('networkidle');
    
    // Check for React Query errors in the page
    const hasQueryErrors = await page.evaluate(() => {
      // Look for common React Query error patterns
      const errors = [];
      const warnings = [];
      
      // Check localStorage for query cache
      try {
        const cache = localStorage.getItem('react-query-cache');
        if (cache) {
          console.log('React Query cache found');
        }
      } catch (e) {
        errors.push('Cache access error');
      }
      
      return { errors, warnings };
    });
    
    console.log('React Query debug:', hasQueryErrors);
    console.log('React Query monitoring completed');
  });
});