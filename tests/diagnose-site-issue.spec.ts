import { test, expect } from '@playwright/test';

test('Complete Site Diagnosis', async ({ page }) => {
  // Enable console logging
  const consoleMessages: string[] = [];
  const errors: string[] = [];
  const networkFailures: string[] = [];

  page.on('console', msg => {
    consoleMessages.push(`${msg.type()}: ${msg.text()}`);
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  page.on('requestfailed', request => {
    networkFailures.push(`Failed: ${request.method()} ${request.url()} - ${request.failure()?.errorText}`);
  });

  // Navigate to the site
  console.log('=== NAVIGATING TO LOCALHOST:5173 ===');
  try {
    await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded', timeout: 10000 });
    console.log('✅ Successfully navigated to localhost:5173');
  } catch (error) {
    console.log('❌ Failed to navigate:', error);
    throw error;
  }

  // Wait a bit for any async loading
  await page.waitForTimeout(2000);

  // Check page title
  const title = await page.title();
  console.log(`Page Title: "${title}"`);

  // Check if React root div is present
  const rootDiv = await page.locator('#root');
  const rootExists = await rootDiv.count() > 0;
  console.log(`Root div exists: ${rootExists}`);

  if (rootExists) {
    const rootContent = await rootDiv.textContent();
    console.log(`Root div has content: ${rootContent ? 'YES' : 'NO'}`);
    if (rootContent) {
      console.log(`Root content length: ${rootContent.length} characters`);
    }
  }

  // Check for specific app elements
  const navigation = await page.locator('nav').count();
  const header = await page.locator('header').count();
  const main = await page.locator('main').count();

  console.log(`Navigation elements: ${navigation}`);
  console.log(`Header elements: ${header}`);
  console.log(`Main elements: ${main}`);

  // Take screenshot of current state
  await page.screenshot({ path: 'diagnosis-screenshot.png', fullPage: true });
  console.log('📸 Screenshot saved as diagnosis-screenshot.png');

  // Check URL after navigation
  const currentUrl = page.url();
  console.log(`Current URL: ${currentUrl}`);

  // Log all console messages
  console.log('=== CONSOLE MESSAGES ===');
  consoleMessages.forEach(msg => console.log(msg));

  // Log any errors
  if (errors.length > 0) {
    console.log('=== JAVASCRIPT ERRORS ===');
    errors.forEach(error => console.log(`❌ ${error}`));
  } else {
    console.log('✅ No JavaScript errors detected');
  }

  // Log network failures
  if (networkFailures.length > 0) {
    console.log('=== NETWORK FAILURES ===');
    networkFailures.forEach(failure => console.log(`❌ ${failure}`));
  } else {
    console.log('✅ No network failures detected');
  }

  // Check page content
  const bodyText = await page.locator('body').textContent();
  console.log(`Page has content: ${bodyText && bodyText.length > 0 ? 'YES' : 'NO'}`);
  
  if (bodyText) {
    console.log(`Body content preview (first 200 chars): ${bodyText.substring(0, 200)}...`);
  }

  // Try to navigate to WedcationAmbalaPage specifically
  console.log('=== TESTING WEDCATION AMBALA PAGE ===');
  try {
    await page.goto('http://localhost:5173/ambala/wedcation-ambala', { waitUntil: 'domcontentloaded', timeout: 10000 });
    await page.waitForTimeout(1000);
    
    const pageContent = await page.locator('body').textContent();
    console.log(`Wedcation page loaded: ${pageContent && pageContent.includes('Wedcation') ? 'YES' : 'NO'}`);
    
    await page.screenshot({ path: 'wedcation-page-screenshot.png', fullPage: true });
    console.log('📸 Wedcation page screenshot saved');
  } catch (error) {
    console.log('❌ Failed to load Wedcation page:', error);
  }
});