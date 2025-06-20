import { test, expect } from '@playwright/test';

const remainingPages = [
  { name: 'Our Story', url: '/our-story' },
  { name: 'Royal Palace Palwal', url: '/palwal-haryana/tivoli-royal-palace' },
  { name: 'Heritage Palace Rewari', url: '/rewari-haryana/tivoli-heritage-palace' },
  { name: 'Lotus Court Noida', url: '/noida/tivoli-lotus-court' },
  { name: 'Wedcation Ambala', url: '/ambala/wedcation-ambala' },
  { name: 'Wedcation Israna', url: '/israna/wedcation-israna' },
  { name: 'Omnia Dwarka', url: '/delhi/omnia-dwarka-expressway' },
  { name: 'Brands Page', url: '/brands' },
  { name: 'Sustainability', url: '/sustainability' },
];

test.describe('Test remaining pages', () => {
  for (const pageTest of remainingPages) {
    test(`Test ${pageTest.name}`, async ({ page }) => {
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
        console.log(`❌ Page Error: ${error.message}`);
      });

      try {
        await page.goto(`http://localhost:5173${pageTest.url}`, { 
          waitUntil: 'domcontentloaded',
          timeout: 8000 
        });

        await page.waitForTimeout(1500);

        const rootContent = await page.locator('#root').innerHTML();
        const hasContent = rootContent.length > 0;
        const navExists = await page.locator('nav').count() > 0;

        console.log(`📦 Root content length: ${rootContent.length}`);
        console.log(`🧭 Navigation exists: ${navExists}`);
        console.log(`❌ Page errors: ${pageErrors.length}`);

        if (pageErrors.length > 0) {
          console.log('Errors:', pageErrors.slice(0, 2));
        }

        const isWorking = hasContent && navExists && pageErrors.length === 0;
        console.log(`📊 Status: ${isWorking ? '✅ WORKING' : '❌ BROKEN'}`);

      } catch (error) {
        console.log(`❌ Failed to load: ${error}`);
      }

      console.log(`=== END ${pageTest.name} ===\n`);
    });
  }
});