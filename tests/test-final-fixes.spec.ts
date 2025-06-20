import { test, expect } from '@playwright/test';

const previouslyBrokenPages = [
  { name: 'Royal Palace Palwal', url: '/palwal-haryana/tivoli-royal-palace' },
  { name: 'Heritage Palace Rewari', url: '/rewari-haryana/tivoli-heritage-palace' },
  { name: 'Lotus Court Noida', url: '/noida/tivoli-lotus-court' },
  { name: 'Wedcation Ambala', url: '/ambala/wedcation-ambala' },
  { name: 'Wedcation Israna', url: '/israna/wedcation-israna' },
  { name: 'Omnia Dwarka', url: '/delhi/omnia-dwarka-expressway' },
];

test.describe('Test final fixes for all broken pages', () => {
  for (const pageTest of previouslyBrokenPages) {
    test(`Test ${pageTest.name} after all fixes`, async ({ page }) => {
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
        console.log(`❌ Error: ${error.message}`);
      });

      try {
        await page.goto(`http://localhost:5173${pageTest.url}`, { 
          waitUntil: 'domcontentloaded',
          timeout: 8000 
        });

        await page.waitForTimeout(2000);

        const rootContent = await page.locator('#root').innerHTML();
        const hasContent = rootContent.length > 0;
        const navExists = await page.locator('nav').count() > 0;

        console.log(`📦 Root content length: ${rootContent.length}`);
        console.log(`🧭 Navigation exists: ${navExists}`);
        console.log(`❌ Page errors: ${pageErrors.length}`);
        console.log(`❌ Console errors: ${consoleErrors.length}`);

        const isWorking = hasContent && navExists && pageErrors.length === 0;
        console.log(`📊 Status: ${isWorking ? '✅ FIXED' : '❌ STILL BROKEN'}`);

      } catch (error) {
        console.log(`❌ Failed to load: ${error}`);
      }

      console.log(`=== END ${pageTest.name} ===\n`);
    });
  }
});