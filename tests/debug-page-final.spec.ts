import { test, expect } from '@playwright/test';

test('Debug final page state', async ({ page }) => {
  // Navigate to the page
  await page.goto('http://localhost:5173/delhi/tivoli-bijwasan');
  
  // Wait for page to load
  await page.waitForLoadState('networkidle');
  
  // Take a screenshot
  await page.screenshot({ path: 'bijwasan-final-state.png', fullPage: true });
  
  // Get all text content
  const pageText = await page.textContent('body');
  console.log('Page text preview:', pageText?.substring(0, 500));
  
  // Get all headings
  const headings = await page.locator('h1, h2, h3').allTextContents();
  console.log('All headings:', headings);
  
  // Check specific sections
  const sections = [
    'Tivoli Bijwasan',
    'Key Amenities', 
    'Discover Royal Luxury',
    'Experience Our Space',
    '360° Virtual Tour',
    'Dining',
    'Contact & Location'
  ];
  
  for (const section of sections) {
    const exists = await page.locator(`text="${section}"`).count() > 0;
    console.log(`${section}: ${exists ? 'EXISTS' : 'NOT FOUND'}`);
  }
});