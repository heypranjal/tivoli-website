import { test, expect } from '@playwright/test';

test('Debug Royal Court Okhla page - Initial Investigation', async ({ page }) => {
  // Set up console and network logging
  const consoleMessages: string[] = [];
  const networkRequests: string[] = [];
  const networkErrors: string[] = [];

  page.on('console', msg => {
    consoleMessages.push(`${msg.type()}: ${msg.text()}`);
  });

  page.on('request', request => {
    networkRequests.push(`${request.method()} ${request.url()}`);
  });

  page.on('requestfailed', request => {
    networkErrors.push(`FAILED: ${request.method()} ${request.url()} - ${request.failure()?.errorText}`);
  });

  console.log('🔍 DEBUGGING: Starting Royal Court Okhla page investigation...');

  // Navigate to the target URL
  const targetUrl = 'http://localhost:5173/delhi/royal-court-okhla';
  console.log(`📍 Navigating to: ${targetUrl}`);
  
  const response = await page.goto(targetUrl);
  console.log(`📡 Response status: ${response?.status()}`);

  // Wait for page to load completely
  await page.waitForLoadState('networkidle');

  // Check current URL after navigation (to detect redirects)
  const currentUrl = page.url();
  console.log(`🔗 Current URL after navigation: ${currentUrl}`);
  
  if (currentUrl !== targetUrl) {
    console.log(`⚠️  REDIRECT DETECTED: ${targetUrl} → ${currentUrl}`);
  }

  // Take full page screenshot
  await page.screenshot({ 
    path: 'debug-royal-court-okhla-current-state.png', 
    fullPage: true 
  });
  console.log('📸 Screenshot saved: debug-royal-court-okhla-current-state.png');

  // Check if we're on home page (indicates redirect due to hotel not found)
  const isHomePage = await page.locator('text=Welcome to Tivoli').isVisible().catch(() => false);
  const heroSection = await page.locator('[class*="hero"]').isVisible().catch(() => false);
  
  if (isHomePage || heroSection || currentUrl === 'http://localhost:5173/') {
    console.log('🏠 ISSUE DETECTED: Page redirected to home - likely hotel not found in data');
  }

  // Check page title and main heading
  const pageTitle = await page.title();
  console.log(`📄 Page title: ${pageTitle}`);

  const mainHeading = await page.locator('h1').first().textContent().catch(() => 'No h1 found');
  console.log(`📝 Main heading: ${mainHeading}`);

  // Look for any hotel-related content
  const hotelName = await page.locator('text*=Royal Court').textContent().catch(() => null);
  const okhlaText = await page.locator('text*=Okhla').textContent().catch(() => null);
  
  console.log(`🏨 Hotel name found: ${hotelName || 'None'}`);
  console.log(`📍 Okhla text found: ${okhlaText || 'None'}`);

  // Check for error messages or missing hotel indicators
  const errorMessages = await page.locator('[class*="error"], [class*="not-found"]').allTextContents();
  if (errorMessages.length > 0) {
    console.log(`❌ Error messages found: ${errorMessages.join(', ')}`);
  }

  // Log all console messages
  console.log('\n📋 CONSOLE MESSAGES:');
  consoleMessages.forEach(msg => console.log(`  ${msg}`));

  // Log network errors
  if (networkErrors.length > 0) {
    console.log('\n🚫 NETWORK ERRORS:');
    networkErrors.forEach(error => console.log(`  ${error}`));
  }

  // Check DOM structure for debugging
  const sectionsCount = await page.locator('section').count();
  const allHeadings = await page.locator('h1, h2, h3').allTextContents();
  
  console.log(`\n🏗️  DOM STRUCTURE:`);
  console.log(`  Sections count: ${sectionsCount}`);
  console.log(`  All headings: ${allHeadings.join(', ')}`);

  // Summary report
  console.log('\n📊 SUMMARY REPORT:');
  console.log(`  Target URL: ${targetUrl}`);
  console.log(`  Final URL: ${currentUrl}`);
  console.log(`  Redirected: ${currentUrl !== targetUrl ? 'YES' : 'NO'}`);
  console.log(`  Page Title: ${pageTitle}`);
  console.log(`  Main Heading: ${mainHeading}`);
  console.log(`  Royal Court mentioned: ${hotelName ? 'YES' : 'NO'}`);
  console.log(`  Console errors: ${consoleMessages.filter(msg => msg.includes('error')).length}`);
  console.log(`  Network errors: ${networkErrors.length}`);
});