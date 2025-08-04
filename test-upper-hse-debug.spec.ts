import { test, expect } from '@playwright/test';

test('Debug Upper HSE page loading', async ({ page }) => {
  // Listen for all console messages
  const consoleMessages: string[] = [];
  page.on('console', (msg) => {
    consoleMessages.push(`${msg.type()}: ${msg.text()}`);
  });

  // Listen for page errors
  const pageErrors: string[] = [];
  page.on('pageerror', (error) => {
    pageErrors.push(error.message);
  });

  // Navigate to the Upper HSE page
  console.log('Navigating to Upper HSE page...');
  await page.goto('http://localhost:5173/hotel/upper-hse-sultanpur');

  // Wait for page to fully load
  await page.waitForLoadState('domcontentloaded');
  
  // Take screenshot
  await page.screenshot({ path: 'upper-hse-debug.png', fullPage: true });

  // Check if the main components are rendered
  const navigation = await page.locator('nav').count();
  const heroSection = await page.locator('[class*="hero"]').count();
  const overviewSection = await page.locator('[class*="overview"]').count();
  const accommodationsSection = await page.locator('[class*="accommodations"]').count();

  console.log('Navigation elements:', navigation);
  console.log('Hero sections:', heroSection);
  console.log('Overview sections:', overviewSection);
  console.log('Accommodations sections:', accommodationsSection);

  // Check for specific content
  const pageContent = await page.textContent('body');
  const hasHotelName = pageContent?.includes('Upper HSE');
  const hasLocation = pageContent?.includes('Delhi');
  const hasStageWise = pageContent?.includes('stagewise');

  console.log('Has hotel name:', hasHotelName);
  console.log('Has Delhi location:', hasLocation);
  console.log('Has StagWise toolbar:', hasStageWise);

  // Check page structure
  const mainElements = await page.locator('main').count();
  const divElements = await page.locator('div').count();
  
  console.log('Main elements:', mainElements);
  console.log('Div elements:', divElements);

  // Print console messages
  if (consoleMessages.length > 0) {
    console.log('\nConsole messages:');
    consoleMessages.forEach((msg, index) => {
      console.log(`${index + 1}. ${msg}`);
    });
  }

  // Print page errors
  if (pageErrors.length > 0) {
    console.log('\nPage errors:');
    pageErrors.forEach((error, index) => {
      console.log(`${index + 1}. ${error}`);
    });
  }

  // Check if route is correctly matched
  const url = page.url();
  console.log('Current URL:', url);
  console.log('Expected URL:', 'http://localhost:5173/hotel/upper-hse-sultanpur');
  
  // Try to get the HTML content
  const htmlContent = await page.content();
  const isMinimalHtml = htmlContent.length < 5000;
  console.log('HTML content length:', htmlContent.length);
  console.log('Is minimal HTML (likely blank):', isMinimalHtml);
  
  if (isMinimalHtml) {
    console.log('First 1000 chars of HTML:');
    console.log(htmlContent.substring(0, 1000));
  }
});