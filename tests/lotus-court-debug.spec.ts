import { test, expect } from '@playwright/test';

test.describe('Tivoli Lotus Court Page Debug', () => {
  test('should debug loading and blank page issue', async ({ page }) => {
    // Enable console logging to catch errors
    const consoleLogs: string[] = [];
    const errors: string[] = [];
    
    page.on('console', msg => {
      consoleLogs.push(`${msg.type()}: ${msg.text()}`);
      console.log(`Console ${msg.type()}: ${msg.text()}`);
    });
    
    page.on('pageerror', error => {
      errors.push(error.message);
      console.log(`Page Error: ${error.message}`);
    });

    // Navigate to the Lotus Court page
    console.log('Navigating to Lotus Court page...');
    await page.goto('http://localhost:5173/hotel/tivoli-lotus-court');
    
    // Wait for initial page load
    await page.waitForLoadState('networkidle');
    
    // Take screenshot of initial state
    await page.screenshot({ path: 'lotus-court-initial.png', fullPage: true });
    
    // Check if navigation is visible
    const navigation = page.locator('nav');
    await expect(navigation).toBeVisible();
    console.log('Navigation is visible');
    
    // Wait a bit to see if page blinks/changes
    await page.waitForTimeout(2000);
    
    // Take screenshot after waiting
    await page.screenshot({ path: 'lotus-court-after-2s.png', fullPage: true });
    
    // Check if main content is visible
    const mainContent = page.locator('main, [data-testid="main-content"], .min-h-screen');
    const isMainVisible = await mainContent.isVisible();
    console.log(`Main content visible: ${isMainVisible}`);
    
    // Check for skeleton components
    const skeletons = page.locator('[class*="skeleton"], [data-testid*="skeleton"]');
    const skeletonCount = await skeletons.count();
    console.log(`Skeleton components found: ${skeletonCount}`);
    
    // Check for error messages
    const errorMessages = page.locator('text="Unable to Load Hotel", text="Error", [class*="error"]');
    const errorCount = await errorMessages.count();
    console.log(`Error messages found: ${errorCount}`);
    
    // Check if specific sections are loading
    const sections = [
      'hero', 'overview', 'accommodations', 'experiences', 
      'spaces', 'dining', 'gallery', 'contact'
    ];
    
    for (const section of sections) {
      const sectionElement = page.locator(`[data-testid="${section}"], [class*="${section}"]`).first();
      const sectionVisible = await sectionElement.isVisible();
      console.log(`${section} section visible: ${sectionVisible}`);
    }
    
    // Wait longer to see if content eventually loads
    console.log('Waiting 5 more seconds to see if content loads...');
    await page.waitForTimeout(5000);
    
    // Take final screenshot
    await page.screenshot({ path: 'lotus-court-final.png', fullPage: true });
    
    // Check if page is completely blank (only navigation visible)
    const bodyText = await page.locator('body').textContent();
    const hasContent = bodyText && bodyText.trim().length > 100; // More than just navigation
    console.log(`Page has substantial content: ${hasContent}`);
    console.log(`Body text length: ${bodyText?.length || 0}`);
    
    // Log all console messages and errors
    console.log('\n=== Console Logs ===');
    consoleLogs.forEach(log => console.log(log));
    
    console.log('\n=== Errors ===');
    errors.forEach(error => console.log(error));
    
    // Check React DevTools info if available
    const reactErrors = await page.evaluate(() => {
      // Check if there are any React errors in the console
      const reactFiberNodes = document.querySelectorAll('[data-reactroot]');
      return {
        reactRootExists: reactFiberNodes.length > 0,
        totalElements: document.querySelectorAll('*').length,
        bodyChildren: document.body.children.length
      };
    });
    
    console.log('\n=== React Debug Info ===');
    console.log(JSON.stringify(reactErrors, null, 2));
    
    // Expect page to have content (this will fail if blank, helping us identify the issue)
    expect(hasContent).toBeTruthy();
  });

  test('should check hook behavior and data loading', async ({ page }) => {
    // Add a test page to check hook directly
    await page.goto('http://localhost:5173/hotel/tivoli-lotus-court');
    
    // Inject debugging script to monitor hook behavior
    await page.addInitScript(() => {
      // Override console to capture hook logs
      const originalLog = console.log;
      const originalError = console.error;
      
      window.debugLogs = [];
      
      console.log = (...args) => {
        window.debugLogs.push({ type: 'log', args });
        originalLog.apply(console, args);
      };
      
      console.error = (...args) => {
        window.debugLogs.push({ type: 'error', args });
        originalError.apply(console, args);
      };
    });
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    
    // Get debug logs
    const debugLogs = await page.evaluate(() => window.debugLogs || []);
    console.log('\n=== Hook Debug Logs ===');
    debugLogs.forEach(log => {
      console.log(`${log.type.toUpperCase()}:`, ...log.args);
    });
    
    // Check if hook is returning data
    const hookData = await page.evaluate(() => {
      // Try to access React component state if possible
      const reactFiber = document.querySelector('[data-reactroot]');
      return {
        reactFiberExists: !!reactFiber,
        hasHookData: window.localStorage.getItem('tivoli-lotus-court-tivoli-lotus-court') !== null
      };
    });
    
    console.log('\n=== Hook Data Check ===');
    console.log(JSON.stringify(hookData, null, 2));
  });

  test('should test progressive loading states', async ({ page }) => {
    await page.goto('http://localhost:5173/hotel/tivoli-lotus-court');
    
    // Monitor loading states over time
    const loadingStates = [];
    
    for (let i = 0; i < 10; i++) {
      await page.waitForTimeout(500);
      
      const state = await page.evaluate(() => {
        const skeletons = document.querySelectorAll('[class*="skeleton"]');
        const content = document.querySelectorAll('[class*="hotel"], [class*="section"]');
        const errors = document.querySelectorAll('[class*="error"]');
        
        return {
          time: Date.now(),
          skeletonCount: skeletons.length,
          contentCount: content.length,
          errorCount: errors.length,
          bodyText: document.body.textContent?.length || 0
        };
      });
      
      loadingStates.push(state);
      console.log(`State ${i}:`, JSON.stringify(state));
    }
    
    // Analyze loading pattern
    const finalState = loadingStates[loadingStates.length - 1];
    const initialState = loadingStates[0];
    
    console.log('\n=== Loading Analysis ===');
    console.log('Initial state:', JSON.stringify(initialState));
    console.log('Final state:', JSON.stringify(finalState));
    
    // Check if content disappears after initial load
    const contentDecreased = finalState.bodyText < initialState.bodyText;
    console.log(`Content decreased over time: ${contentDecreased}`);
    
    if (contentDecreased) {
      console.log('❌ ISSUE IDENTIFIED: Content is disappearing after initial load');
    }
  });
});