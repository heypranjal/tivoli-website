/**
 * Server Monitoring Test
 * Monitors server stability while interacting with the application
 */

import { test, expect } from '@playwright/test';

test.describe('Server Stability Monitoring', () => {
  test('Monitor server while navigating home page and Upper HSE brand', async ({ page }) => {
    console.log('🔍 Starting server monitoring test...');

    // Set up console logging to catch any errors
    const consoleMessages: string[] = [];
    const errors: string[] = [];
    const networkFailures: string[] = [];

    page.on('console', msg => {
      const message = `[${msg.type()}] ${msg.text()}`;
      consoleMessages.push(message);
      console.log('Console:', message);
    });

    page.on('pageerror', error => {
      const errorMsg = `Page Error: ${error.message}`;
      errors.push(errorMsg);
      console.error('❌', errorMsg);
    });

    page.on('requestfailed', request => {
      const failureMsg = `Request failed: ${request.url()} - ${request.failure()?.errorText}`;
      networkFailures.push(failureMsg);
      console.error('🌐', failureMsg);
    });

    // Test 1: Load home page
    console.log('📄 Loading home page...');
    try {
      await page.goto('http://localhost:5173/', { 
        waitUntil: 'networkidle',
        timeout: 30000 
      });
      console.log('✅ Home page loaded successfully');
    } catch (error) {
      console.error('❌ Failed to load home page:', error);
      throw error;
    }

    // Wait for initial rendering
    await page.waitForTimeout(2000);

    // Test 2: Check if Our Hotels section is visible
    console.log('🏨 Checking Our Hotels section...');
    const ourHotelsSection = page.locator('text=Our Hotels').first();
    await expect(ourHotelsSection).toBeVisible({ timeout: 10000 });
    console.log('✅ Our Hotels section visible');

    // Test 3: Look for brand tabs
    console.log('🏷️ Looking for brand tabs...');
    const brandTabs = page.locator('[role="button"]').or(page.locator('button')).filter({ hasText: /THE TIVOLI|OMNIA|THE UPPER HSE|WEDCATION/i });
    
    // Wait for tabs to load
    await page.waitForTimeout(3000);
    
    const tabCount = await brandTabs.count();
    console.log(`📊 Found ${tabCount} brand tabs`);

    if (tabCount === 0) {
      console.log('⚠️ No brand tabs found, checking for loading states...');
      
      // Check for loading indicators
      const loadingIndicators = await page.locator('.animate-spin, [class*="loading"], text=/loading/i').count();
      console.log(`🔄 Found ${loadingIndicators} loading indicators`);
      
      // Wait longer for data to load
      await page.waitForTimeout(5000);
      
      // Check again
      const updatedTabCount = await brandTabs.count();
      console.log(`📊 Updated tab count: ${updatedTabCount}`);
    }

    // Test 4: Try to find and click The Upper HSE tab
    console.log('🎯 Looking for The Upper HSE tab...');
    
    const upperHSETab = page.locator('button', { hasText: /THE UPPER HSE/i }).or(
      page.locator('[role="button"]', { hasText: /THE UPPER HSE/i })
    ).or(
      page.locator('text=/THE UPPER HSE/i')
    );

    const upperHSETabCount = await upperHSETab.count();
    console.log(`🔍 Found ${upperHSETabCount} Upper HSE tab elements`);

    if (upperHSETabCount > 0) {
      console.log('🖱️ Clicking The Upper HSE tab...');
      try {
        await upperHSETab.first().click({ timeout: 10000 });
        console.log('✅ Successfully clicked The Upper HSE tab');
        
        // Wait for content to load
        await page.waitForTimeout(3000);
        
        // Check if hotels appear
        const hotelCards = await page.locator('[class*="hotel"], [class*="venue"], [class*="card"]').count();
        console.log(`🏨 Found ${hotelCards} hotel/venue cards after clicking Upper HSE tab`);
        
      } catch (error) {
        console.error('❌ Failed to click The Upper HSE tab:', error);
      }
    } else {
      console.log('⚠️ The Upper HSE tab not found, checking all available tabs...');
      
      // Get all button text content
      const allButtons = page.locator('button');
      const buttonCount = await allButtons.count();
      console.log(`🔍 Total buttons found: ${buttonCount}`);
      
      for (let i = 0; i < Math.min(buttonCount, 10); i++) {
        try {
          const buttonText = await allButtons.nth(i).textContent();
          console.log(`Button ${i}: "${buttonText}"`);
        } catch (e) {
          console.log(`Button ${i}: Could not read text`);
        }
      }
    }

    // Test 5: Check network requests
    console.log('🌐 Monitoring network requests...');
    const responses: any[] = [];
    
    page.on('response', response => {
      responses.push({
        url: response.url(),
        status: response.status(),
        statusText: response.statusText()
      });
    });

    // Wait and monitor for a bit
    await page.waitForTimeout(5000);

    // Test 6: Try to navigate to Upper HSE page directly
    console.log('🔗 Attempting direct navigation to Upper HSE page...');
    try {
      await page.goto('http://localhost:5173/hotel/upper-hse-sultanpur', { 
        waitUntil: 'networkidle',
        timeout: 30000 
      });
      console.log('✅ Upper HSE page loaded successfully');
      
      // Check if page content loaded
      const pageTitle = await page.title();
      console.log(`📄 Page title: "${pageTitle}"`);
      
      const upperHSEHeading = page.locator('h1', { hasText: /Upper HSE/i });
      const headingVisible = await upperHSEHeading.isVisible().catch(() => false);
      console.log(`🏷️ Upper HSE heading visible: ${headingVisible}`);
      
    } catch (error) {
      console.error('❌ Failed to load Upper HSE page:', error);
    }

    // Final monitoring period
    console.log('⏱️ Final monitoring period...');
    await page.waitForTimeout(10000);

    // Report findings
    console.log('\n📊 MONITORING REPORT:');
    console.log(`Console messages: ${consoleMessages.length}`);
    console.log(`Errors: ${errors.length}`);
    console.log(`Network failures: ${networkFailures.length}`);
    console.log(`Recent responses: ${responses.length}`);

    if (errors.length > 0) {
      console.log('\n❌ ERRORS FOUND:');
      errors.forEach(error => console.log(error));
    }

    if (networkFailures.length > 0) {
      console.log('\n🌐 NETWORK FAILURES:');
      networkFailures.forEach(failure => console.log(failure));
    }

    // Check if server is still responding
    console.log('\n🔍 Final server check...');
    try {
      await page.goto('http://localhost:5173/', { timeout: 5000 });
      console.log('✅ Server still responding');
    } catch (error) {
      console.error('❌ Server appears to have stopped:', error);
      throw new Error('Server stopped responding during test');
    }
  });

  test('Database connection monitoring', async ({ page }) => {
    console.log('🗄️ Testing database connections...');

    page.on('console', msg => {
      if (msg.text().includes('error') || msg.text().includes('failed')) {
        console.log('DB Error:', msg.text());
      }
    });

    await page.goto('http://localhost:5173/');
    
    // Test API endpoints that might be causing issues
    const apiEndpoints = [
      'brands',
      'hotels',
      'media'
    ];

    for (const endpoint of apiEndpoints) {
      console.log(`🔍 Testing ${endpoint} endpoint...`);
      await page.waitForTimeout(2000);
    }

    await page.waitForTimeout(10000);
    console.log('✅ Database monitoring complete');
  });
});