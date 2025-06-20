import { test, expect } from '@playwright/test';

const pagesToTest = [
  { name: 'Home Page', url: '/', shouldWork: true },
  { name: 'Tivoli Grand Palace Hotel', url: '/delhi/tivoli-grand-palace', shouldWork: true },
  { name: 'Investors/People Page', url: '/people', shouldWork: true },
  { name: 'Locations Page', url: '/locations', shouldWork: true },
  { name: 'Delhi Location', url: '/locations/delhi', shouldWork: true },
  { name: 'Tivoli Brand', url: '/brands/tivoli', shouldWork: true },
  { name: 'Our Story', url: '/our-story', shouldWork: true },
  { name: 'Royal Palace Palwal', url: '/palwal-haryana/tivoli-royal-palace', shouldWork: true },
  { name: 'Heritage Palace Rewari', url: '/rewari-haryana/tivoli-heritage-palace', shouldWork: true },
  { name: 'Lotus Court Noida', url: '/noida/tivoli-lotus-court', shouldWork: true },
];

test.describe('Page-by-page debugging', () => {
  for (const pageTest of pagesToTest) {
    test(`Debug ${pageTest.name} (${pageTest.url})`, async ({ page }) => {
      console.log(`\n=== TESTING: ${pageTest.name} ===`);
      console.log(`URL: ${pageTest.url}`);

      // Collect console messages and errors
      const consoleMessages: string[] = [];
      const consoleErrors: string[] = [];
      const pageErrors: string[] = [];

      page.on('console', msg => {
        const message = `${msg.type()}: ${msg.text()}`;
        consoleMessages.push(message);
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      page.on('pageerror', error => {
        pageErrors.push(error.message);
        console.log(`❌ Page Error: ${error.message}`);
      });

      // Navigate to the page
      try {
        await page.goto(`http://localhost:5173${pageTest.url}`, { 
          waitUntil: 'domcontentloaded',
          timeout: 10000 
        });

        // Wait a moment for React to render
        await page.waitForTimeout(2000);

        // Take screenshot
        await page.screenshot({ 
          path: `debug-${pageTest.name.replace(/[^a-zA-Z0-9]/g, '-')}.png`, 
          fullPage: true 
        });

        // Check basic page info
        const title = await page.title();
        console.log(`📄 Title: ${title}`);

        // Check if root div has content
        const rootDiv = page.locator('#root');
        const rootContent = await rootDiv.innerHTML();
        const hasContent = rootContent.length > 0;
        console.log(`📦 Root content length: ${rootContent.length}`);
        console.log(`✅ Has content: ${hasContent}`);

        // Check for navigation
        const navExists = await page.locator('nav').count() > 0;
        console.log(`🧭 Navigation exists: ${navExists}`);

        // Check for main content area
        const mainContent = await page.locator('main').count();
        console.log(`📄 Main sections: ${mainContent}`);

        // Check for specific page elements
        const totalDivs = await page.locator('div').count();
        console.log(`🏗️  Total divs: ${totalDivs}`);

        // Look for specific page indicators
        if (pageTest.url === '/') {
          const heroExists = await page.locator('[class*="h-"]').count() > 0;
          console.log(`🖼️  Hero section: ${heroExists}`);
        } else if (pageTest.url.includes('/delhi/') || pageTest.url.includes('/palwal-') || pageTest.url.includes('/rewari-')) {
          // Hotel pages should have hotel-specific content
          const hotelContent = await page.locator('h1').count();
          console.log(`🏨 Hotel headers: ${hotelContent}`);
        } else if (pageTest.url === '/people') {
          const investorContent = await page.locator('h1').count();
          console.log(`👥 Investor headers: ${investorContent}`);
        }

        // Log console errors
        if (consoleErrors.length > 0) {
          console.log(`❌ Console Errors (${consoleErrors.length}):`);
          consoleErrors.forEach(error => console.log(`   - ${error}`));
        } else {
          console.log(`✅ No console errors`);
        }

        // Log page errors
        if (pageErrors.length > 0) {
          console.log(`❌ Page Errors (${pageErrors.length}):`);
          pageErrors.forEach(error => console.log(`   - ${error}`));
        } else {
          console.log(`✅ No page errors`);
        }

        // Determine if page loaded successfully
        const isWorking = hasContent && navExists && pageErrors.length === 0;
        console.log(`📊 Page Status: ${isWorking ? '✅ WORKING' : '❌ BROKEN'}`);

        // If it's broken, try to get more details
        if (!isWorking) {
          console.log(`🔍 DEBUGGING BROKEN PAGE:`);
          
          // Check if it's a routing issue
          const currentUrl = page.url();
          console.log(`   - Current URL: ${currentUrl}`);
          
          // Check if there's any text content at all
          const bodyText = await page.locator('body').textContent();
          console.log(`   - Body text length: ${bodyText?.length || 0}`);
          
          // Check if React Router is working
          const routerElements = await page.locator('[data-reactrouter-*]').count();
          console.log(`   - React Router elements: ${routerElements}`);
        }

        console.log(`=== END ${pageTest.name} ===\n`);

      } catch (error) {
        console.log(`❌ Failed to load ${pageTest.name}: ${error}`);
      }
    });
  }
});