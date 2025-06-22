import { test, expect } from '@playwright/test';

test.describe('Heritage Palace Page Debug', () => {
  test('should load Heritage Palace page and debug issues', async ({ page }) => {
    // Enable console logging to catch JavaScript errors
    page.on('console', msg => {
      console.log(`Console ${msg.type()}: ${msg.text()}`);
    });

    // Listen for uncaught exceptions
    page.on('pageerror', error => {
      console.log(`Page error: ${error.message}`);
    });

    // Listen for failed requests
    page.on('requestfailed', request => {
      console.log(`Request failed: ${request.url()} - ${request.failure()?.errorText}`);
    });

    // Navigate to Heritage Palace page
    console.log('Navigating to Heritage Palace page...');
    await page.goto('http://localhost:5173/hotel/tivoli-heritage-palace');

    // Wait for navigation to complete
    await page.waitForLoadState('networkidle');

    // Check if navigation component loads
    console.log('Checking navigation...');
    await expect(page.locator('nav')).toBeVisible({ timeout: 10000 });

    // Check for skeleton loading states
    console.log('Checking for skeleton components...');
    const skeletonHero = page.locator('[class*="skeleton"], [class*="SkeletonHero"]');
    const skeletonOverview = page.locator('[class*="SkeletonOverview"]');
    
    // Take screenshot during skeleton loading
    await page.screenshot({ path: 'skeleton-loading.png', fullPage: true });

    // Wait for skeleton to disappear and content to load
    console.log('Waiting for content to load...');
    
    // Wait for hero section to load
    await page.waitForSelector('section', { timeout: 15000 });
    
    // Check if heritage-specific CSS classes are present
    const heritageElements = await page.locator('[class*="heritage-"]').count();
    console.log(`Found ${heritageElements} heritage-specific elements`);

    // Check for main content
    const mainContent = page.locator('main, [class*="container"]');
    await expect(mainContent).toBeVisible({ timeout: 15000 });

    // Check for specific Heritage Palace content
    const pageTitle = page.locator('h1');
    await expect(pageTitle).toBeVisible({ timeout: 10000 });
    
    // Check for hotel name
    const hotelName = await page.textContent('h1');
    console.log(`Page title: ${hotelName}`);

    // Check if page becomes blank (no visible content)
    const visibleContent = await page.locator('body *:visible').count();
    console.log(`Visible elements count: ${visibleContent}`);

    if (visibleContent < 10) {
      console.log('WARNING: Page appears to be mostly blank!');
      await page.screenshot({ path: 'blank-page-issue.png', fullPage: true });
    }

    // Check for React component errors
    const reactErrors = await page.evaluate(() => {
      // Check for React error boundaries or console errors
      return window.console.error || null;
    });

    // Check if Progressive Loading hook is working
    const progressiveElements = await page.locator('[class*="should-load"], [class*="progressive"]').count();
    console.log(`Progressive loading elements: ${progressiveElements}`);

    // Final screenshot
    await page.screenshot({ path: 'final-page-state.png', fullPage: true });

    // Get page content for analysis
    const pageContent = await page.content();
    const hasContent = pageContent.includes('Tivoli Heritage Palace');
    console.log(`Page contains Heritage Palace content: ${hasContent}`);

    // Check for specific components that should be loaded
    const expectedSections = [
      'section', // Hero section
      '[class*="overview"]', // Overview section
      '[class*="experience"]', // Experiences
    ];

    for (const selector of expectedSections) {
      const element = page.locator(selector);
      const isVisible = await element.isVisible().catch(() => false);
      console.log(`${selector} visible: ${isVisible}`);
    }
  });

  test('should test useHotel hook and data loading', async ({ page }) => {
    // Navigate to page
    await page.goto('http://localhost:5173/hotel/tivoli-heritage-palace');

    // Check network requests for Supabase data
    const requests = [];
    page.on('request', request => {
      if (request.url().includes('supabase') || request.url().includes('api')) {
        requests.push(request.url());
      }
    });

    await page.waitForLoadState('networkidle');

    console.log('Supabase/API requests made:');
    requests.forEach(url => console.log(`- ${url}`));

    // Check if data is loading from Supabase
    const loadingStates = await page.evaluate(() => {
      // Check if there are any loading indicators
      const loadingElements = document.querySelectorAll('[class*="loading"], [class*="skeleton"]');
      return loadingElements.length;
    });

    console.log(`Loading elements found: ${loadingStates}`);
  });

  test('should check component imports and hooks', async ({ page }) => {
    // Navigate to page
    await page.goto('http://localhost:5173/hotel/tivoli-heritage-palace');

    // Check for component mount errors
    const componentErrors = await page.evaluate(() => {
      const errors = [];
      
      // Check if useProgressiveLoading hook exists
      if (!window.React) {
        errors.push('React not loaded');
      }
      
      return errors;
    });

    console.log('Component analysis:', componentErrors);

    // Check if the page route is correctly matching
    const currentUrl = page.url();
    console.log(`Current URL: ${currentUrl}`);
    
    // Verify the page component is the right one
    const pageComponent = await page.evaluate(() => {
      return document.body.innerHTML.includes('heritage-section-reveal') ? 'TivoliHeritagePalacePage' : 'Generic HotelPage';
    });
    
    console.log(`Detected page component: ${pageComponent}`);
  });
});