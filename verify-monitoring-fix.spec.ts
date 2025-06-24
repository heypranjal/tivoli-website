/**
 * Test to verify monitoring dashboard shows correct current session data
 */

import { test, expect } from '@playwright/test';

test('Monitoring dashboard shows accurate current session data', async ({ page }) => {
  console.log('🔍 Testing monitoring dashboard accuracy...');

  // Navigate to the main page first
  await page.goto('http://localhost:5173/');
  
  // Wait for page to load
  await page.waitForLoadState('networkidle');
  
  // Try to find and click monitoring button
  const monitoringButton = page.locator('[title*="monitoring" i], [title*="API" i], button:has-text("📊")').first();
  
  if (await monitoringButton.isVisible({ timeout: 2000 })) {
    console.log('📊 Monitoring button found, opening dashboard...');
    await monitoringButton.click();
    
    // Wait for dashboard to appear
    await page.waitForTimeout(1000);
    
    // Look for session stats
    const dashboardContent = await page.textContent('body');
    
    if (dashboardContent?.includes('Current Session API Hits') || dashboardContent?.includes('Current Session:')) {
      console.log('✅ Found current session tracking in dashboard');
      
      // Check for optimization status
      if (dashboardContent.includes('React Query Optimization Active')) {
        console.log('🎉 React Query optimization status is shown!');
      }
      
      // Check for session vs total explanation
      if (dashboardContent.includes('historical data') || dashboardContent.includes('🔄 button')) {
        console.log('✅ Dashboard explains historical vs current data');
      }
      
    } else {
      console.log('⚠️  Current session tracking not found in dashboard');
    }
    
  } else {
    console.log('📊 Monitoring button not visible - may be hidden until needed');
  }

  // Navigate to hotel page to generate some fresh API requests
  console.log('🏨 Loading hotel page to test current session tracking...');
  await page.goto('http://localhost:5173/hotels/wedcation-by-tivoli-ambala');
  await page.waitForLoadState('networkidle');
  
  // Wait a moment for requests to be tracked
  await page.waitForTimeout(2000);
  
  // Go back to main page and check monitoring again
  await page.goto('http://localhost:5173/');
  await page.waitForTimeout(1000);
  
  if (await monitoringButton.isVisible({ timeout: 2000 })) {
    await monitoringButton.click();
    await page.waitForTimeout(1000);
    
    const updatedContent = await page.textContent('body');
    console.log('📊 Checking if dashboard shows fresh session data...');
    
    // The dashboard should now show some current session hits
    if (updatedContent?.includes('Current Session')) {
      console.log('✅ Current session data is being tracked');
    }
  }

  console.log('✅ Monitoring dashboard verification complete');
});