import { test, expect } from '@playwright/test';

test('Console Debug Heritage Palace', async ({ page }) => {
  // Capture all console messages
  const consoleMessages: string[] = [];
  page.on('console', msg => {
    consoleMessages.push(`${msg.type()}: ${msg.text()}`);
  });

  // Capture page errors
  const pageErrors: string[] = [];
  page.on('pageerror', error => {
    pageErrors.push(error.message);
  });

  // Navigate to Heritage Palace page
  await page.goto('http://localhost:5173/hotel/tivoli-heritage-palace');
  
  // Wait longer for any errors to show up
  await page.waitForTimeout(5000);
  
  console.log('\n=== CONSOLE MESSAGES ===');
  consoleMessages.forEach(msg => console.log(msg));
  
  console.log('\n=== PAGE ERRORS ===');
  pageErrors.forEach(error => console.log(error));
  
  // Check the actual HTML being rendered
  const html = await page.content();
  const rootDiv = await page.locator('#root').innerHTML().catch(() => 'NOT_FOUND');
  
  console.log('\n=== ROOT DIV CONTENT ===');
  console.log(rootDiv);
  
  // Check if there are any uncaught exceptions
  const uncaughtErrors = await page.evaluate(() => {
    return (window as any).__reactErrors || [];
  });
  
  console.log('\n=== UNCAUGHT ERRORS ===');
  console.log(uncaughtErrors);
});