import { test, expect } from '@playwright/test';

const brokenPages = [
  { name: 'Locations Page', url: '/locations' },
  { name: 'Delhi Location', url: '/locations/delhi' },
  { name: 'Tivoli Brand', url: '/brands/tivoli' },
];

test.describe('Test LocationsPage fix', () => {
  for (const pageTest of brokenPages) {
    test(`Test ${pageTest.name} after fix`, async ({ page }) => {
      console.log(`\n=== TESTING: ${pageTest.name} ===`);

      const consoleErrors: string[] = [];
      const pageErrors: string[] = [];

      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      page.on('pageerror', error => {
        pageErrors.push(error.message);
      });

      await page.goto(`http://localhost:5173${pageTest.url}`, { 
        waitUntil: 'domcontentloaded',
        timeout: 10000 
      });

      await page.waitForTimeout(2000);

      const rootContent = await page.locator('#root').innerHTML();
      const hasContent = rootContent.length > 0;
      const navExists = await page.locator('nav').count() > 0;

      console.log(`📦 Root content length: ${rootContent.length}`);
      console.log(`🧭 Navigation exists: ${navExists}`);
      console.log(`❌ Page errors: ${pageErrors.length}`);
      console.log(`❌ Console errors: ${consoleErrors.length}`);

      if (pageErrors.length > 0) {
        console.log('Page Errors:', pageErrors);
      }

      const isWorking = hasContent && navExists && pageErrors.length === 0;
      console.log(`📊 Status: ${isWorking ? '✅ FIXED' : '❌ STILL BROKEN'}`);

      console.log(`=== END ${pageTest.name} ===\n`);
    });
  }
});