import { test, expect } from '@playwright/test';

test('Debug Tivoli Bijwasan Page Loading Issue', async ({ page }) => {
  console.log('🔍 Starting comprehensive debugging of /delhi/tivoli-bijwasan page...');

  // Listen for console errors
  const consoleErrors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
      console.log('❌ Console Error:', msg.text());
    }
  });

  // Listen for page errors
  const pageErrors: string[] = [];
  page.on('pageerror', error => {
    pageErrors.push(error.message);
    console.log('💥 Page Error:', error.message);
  });

  // Listen for response errors
  const responseErrors: { url: string; status: number }[] = [];
  page.on('response', response => {
    if (response.status() >= 400) {
      responseErrors.push({
        url: response.url(),
        status: response.status()
      });
      console.log(`🚫 HTTP ${response.status()}: ${response.url()}`);
    }
  });

  console.log('📍 Navigating to /delhi/tivoli-bijwasan...');
  
  try {
    // Navigate to the problematic page
    const response = await page.goto('http://localhost:5173/delhi/tivoli-bijwasan', {
      waitUntil: 'networkidle',
      timeout: 30000
    });
    
    console.log('📊 Response status:', response?.status());
    
    // Wait a moment for React to render
    await page.waitForTimeout(2000);
    
    // Check what's actually rendered
    const bodyText = await page.textContent('body');
    console.log('📝 Body content length:', bodyText?.length || 0);
    
    // Check for React error boundaries
    const errorBoundaryText = await page.textContent('body').catch(() => '');
    if (errorBoundaryText?.includes('Error') || errorBoundaryText?.includes('error')) {
      console.log('🚨 Possible React error boundary triggered');
      console.log('Error content:', errorBoundaryText?.substring(0, 500));
    }
    
    // Check if we're on the correct page or redirected
    const currentUrl = page.url();
    console.log('🌐 Current URL:', currentUrl);
    
    // Check page title
    const title = await page.title();
    console.log('📖 Page title:', title);
    
    // Look for navigation component
    const navExists = await page.locator('nav').count();
    console.log('🧭 Navigation component found:', navExists > 0);
    
    // Look for main content
    const mainContent = await page.locator('main, .container, #root > div').count();
    console.log('📄 Main content containers found:', mainContent);
    
    // Check for specific hotel content
    const hotelTitle = await page.locator('h1').textContent().catch(() => '');
    console.log('🏨 Hotel title found:', hotelTitle || 'None');
    
    // Check if this is a 404 or not found page
    const notFoundIndicators = await page.locator('text=404, text=Not Found, text=Page Not Found').count();
    console.log('❓ 404 indicators found:', notFoundIndicators);
    
    // Look for React Router error messages
    const routerErrors = await page.locator('text=Cannot, text=Error, text=Failed').count();
    console.log('🔄 Router error indicators:', routerErrors);
    
  } catch (navigationError) {
    console.log('🚫 Navigation failed:', navigationError.message);
  }

  // Take a screenshot for visual inspection
  await page.screenshot({ 
    path: 'debug-bijwasan-page.png', 
    fullPage: true 
  });
  console.log('📸 Screenshot saved as debug-bijwasan-page.png');

  // Check React DevTools or component tree
  const reactComponents = await page.evaluate(() => {
    // Try to access React DevTools info
    const rootElement = document.querySelector('#root');
    return {
      hasRootElement: !!rootElement,
      rootChildren: rootElement?.children.length || 0,
      bodyClasses: document.body.className,
      htmlContent: document.documentElement.innerHTML.substring(0, 1000)
    };
  });
  
  console.log('⚛️  React info:', reactComponents);

  // Final summary
  console.log('\n📋 DEBUGGING SUMMARY:');
  console.log('Console Errors:', consoleErrors.length);
  consoleErrors.forEach((error, i) => console.log(`  ${i + 1}. ${error}`));
  
  console.log('Page Errors:', pageErrors.length);
  pageErrors.forEach((error, i) => console.log(`  ${i + 1}. ${error}`));
  
  console.log('HTTP Errors:', responseErrors.length);
  responseErrors.forEach((error, i) => console.log(`  ${i + 1}. ${error.status} - ${error.url}`));

  console.log('🎯 Next steps based on findings...');
});