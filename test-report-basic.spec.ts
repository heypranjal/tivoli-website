import { test, expect } from '@playwright/test';

test.describe('Basic Health Check', () => {
  test('server responds to requests', async ({ page }) => {
    // Simple connectivity test
    const response = await page.goto('http://localhost:5173/');
    expect(response?.status()).toBe(200);
    
    // Check page contains expected title
    await expect(page).toHaveTitle(/Tivoli/);
  });

  test('page loads core elements', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    
    // Wait for React app to initialize
    await page.waitForSelector('#root', { timeout: 10000 });
    
    // Check for basic page structure
    const rootContent = await page.locator('#root').textContent();
    expect(rootContent).toBeTruthy();
  });

  test('no critical JavaScript errors', async ({ page }) => {
    const errors = [];
    
    page.on('pageerror', (error) => {
      errors.push(error.message);
    });
    
    await page.goto('http://localhost:5173/');
    await page.waitForTimeout(5000); // Wait for initial load
    
    // Filter out non-critical errors
    const criticalErrors = errors.filter(error => 
      !error.includes('net::ERR_') && 
      !error.includes('favicon') &&
      !error.includes('ResizeObserver')
    );
    
    expect(criticalErrors.length).toBe(0);
  });
});