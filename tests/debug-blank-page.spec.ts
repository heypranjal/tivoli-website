import { test, expect } from '@playwright/test';

test('Debug blank page issue', async ({ page }) => {
  // Listen for console messages and errors
  const consoleMessages: string[] = [];
  const consoleErrors: string[] = [];
  
  page.on('console', msg => {
    consoleMessages.push(`${msg.type()}: ${msg.text()}`);
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  // Listen for page errors
  const pageErrors: string[] = [];
  page.on('pageerror', error => {
    pageErrors.push(error.message);
  });

  // Navigate to the page
  console.log('Navigating to http://localhost:5173/');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  // Wait a bit for any lazy loading
  await page.waitForTimeout(3000);

  // Take a screenshot
  await page.screenshot({ path: 'debug-screenshot.png', fullPage: true });

  // Check what's in the DOM
  const bodyContent = await page.locator('body').innerHTML();
  console.log('Body content:', bodyContent.slice(0, 500));

  // Check if root div exists and has content
  const rootDiv = page.locator('#root');
  const rootExists = await rootDiv.count();
  console.log('Root div exists:', rootExists > 0);

  if (rootExists > 0) {
    const rootContent = await rootDiv.innerHTML();
    console.log('Root div content:', rootContent.slice(0, 500));
    console.log('Root div full content length:', rootContent.length);
  }

  // Check for specific elements
  const navigation = page.locator('nav');
  const navExists = await navigation.count();
  console.log('Navigation exists:', navExists > 0);

  const hero = page.locator('[class*="hero"], [class*="Hero"]');
  const heroExists = await hero.count();
  console.log('Hero section exists:', heroExists > 0);

  // Check for React
  const reactElements = page.locator('[data-reactroot], [data-react-root]');
  const reactExists = await reactElements.count();
  console.log('React root elements:', reactExists);

  // Log all console messages
  console.log('\n=== CONSOLE MESSAGES ===');
  consoleMessages.forEach(msg => console.log(msg));

  console.log('\n=== CONSOLE ERRORS ===');
  consoleErrors.forEach(error => console.log('ERROR:', error));

  console.log('\n=== PAGE ERRORS ===');
  pageErrors.forEach(error => console.log('PAGE ERROR:', error));

  // Check if any CSS is loaded
  const stylesheets = await page.evaluate(() => {
    return Array.from(document.styleSheets).map(sheet => {
      try {
        return {
          href: sheet.href,
          rules: sheet.cssRules?.length || 0
        };
      } catch (e) {
        return { href: sheet.href, error: e.message };
      }
    });
  });
  console.log('\n=== STYLESHEETS ===');
  console.log(JSON.stringify(stylesheets, null, 2));

  // Check for JavaScript modules
  const scripts = await page.evaluate(() => {
    return Array.from(document.scripts).map(script => ({
      src: script.src,
      type: script.type,
      content: script.innerHTML.slice(0, 100)
    }));
  });
  console.log('\n=== SCRIPTS ===');
  console.log(JSON.stringify(scripts, null, 2));

  // Log page title
  const title = await page.title();
  console.log('\n=== PAGE TITLE ===');
  console.log('Title:', title);

  // Check network requests
  const responses: string[] = [];
  page.on('response', response => {
    responses.push(`${response.status()} ${response.url()}`);
  });

  await page.reload({ waitUntil: 'networkidle' });
  console.log('\n=== NETWORK RESPONSES ===');
  responses.forEach(response => console.log(response));
});