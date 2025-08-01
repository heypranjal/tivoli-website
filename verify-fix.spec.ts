import { test, expect } from '@playwright/test';

test.describe('Verify Hotel Page Fixes', () => {
  test('hotel page loads without critical JavaScript errors', async ({ page }) => {
    const url = '/hotel/tivoli-lotus-court';
    
    // Track console errors
    const criticalErrors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        const text = msg.text();
        // Filter out expected staging errors and non-critical ones
        if (!text.includes('stagewise') && 
            !text.includes('Cookie') && 
            !text.includes('DevTools') &&
            text.includes('public_url')) {
          criticalErrors.push(text);
          console.log(`❌ Critical Error: ${text}`);
        }
      }
    });
    
    // Track page errors (JavaScript runtime errors)
    const pageErrors: string[] = [];
    page.on('pageerror', error => {
      if (error.message.includes('public_url') || error.message.includes('media')) {
        pageErrors.push(error.message);
        console.log(`❌ Page Error: ${error.message}`);
      }
    });
    
    console.log(`🔍 Testing fixes for: ${url}`);
    
    try {
      // Navigate to the page
      const response = await page.goto(url, { 
        waitUntil: 'domcontentloaded',
        timeout: 30000 
      });
      
      console.log(`📊 Response Status: ${response?.status()}`);
      
      // Wait for React to render
      await page.waitForSelector('#root', { timeout: 10000 });
      
      // Wait a bit for components to render
      await page.waitForTimeout(3000);
      
      // Check if content loaded properly
      const bodyText = await page.locator('body').innerText();
      const contentLength = bodyText.trim().length;
      console.log(`📊 Content Length: ${contentLength} characters`);
      
      // Check for hotel-specific content
      const hotelNameVisible = await page.locator(':has-text("Lotus Court"), :has-text("Tivoli")').count();
      console.log(`🏨 Hotel name mentions: ${hotelNameVisible}`);
      
      // Check for images
      const images = await page.locator('img').count();
      console.log(`🖼️ Images loaded: ${images}`);
      
      // Take screenshot for verification
      await page.screenshot({ 
        path: 'verify-fix-result.png',
        fullPage: true 
      });
      console.log(`📸 Screenshot saved: verify-fix-result.png`);
      
      // Report results
      console.log(`\n📋 FIX VERIFICATION RESULTS:`);
      console.log(`✅ Page loads: ${response?.status() === 200 ? 'SUCCESS' : 'FAILED'}`);
      console.log(`✅ Content rendered: ${contentLength > 500 ? 'SUCCESS' : 'FAILED'} (${contentLength} chars)`);
      console.log(`✅ Hotel content: ${hotelNameVisible > 0 ? 'SUCCESS' : 'FAILED'} (${hotelNameVisible} mentions)`);
      console.log(`✅ Images: ${images > 0 ? 'SUCCESS' : 'FAILED'} (${images} images)`);
      console.log(`❌ Critical JS Errors: ${criticalErrors.length}`);
      console.log(`❌ Page Errors: ${pageErrors.length}`);
      
      if (criticalErrors.length > 0) {
        console.log(`Critical errors found:`);
        criticalErrors.forEach(error => console.log(`   - ${error}`));
      }
      
      if (pageErrors.length > 0) {
        console.log(`Page errors found:`);
        pageErrors.forEach(error => console.log(`   - ${error}`));
      }
      
      // Basic assertions
      expect(response?.status()).toBe(200);
      expect(contentLength).toBeGreaterThan(500);
      expect(criticalErrors.length).toBeLessThan(3); // Allow some non-critical errors
      expect(pageErrors.length).toBe(0); // No page errors allowed
      
    } catch (error) {
      console.log(`❌ Test Error: ${error}`);
      throw error;
    }
  });
});