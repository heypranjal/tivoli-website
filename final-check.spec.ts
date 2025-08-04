import { test, expect } from '@playwright/test';

test('Final Tivoli Lotus Court Page Verification', async ({ page }) => {
  console.log('=== FINAL PAGE VERIFICATION ===');
  
  // Navigate to the page
  await page.goto('http://localhost:5174/hotel/tivoli-lotus-court');
  
  // Wait for the page to load
  await page.waitForLoadState('networkidle');
  
  // Check page title
  const title = await page.title();
  console.log('Page Title:', title);
  
  // Check if main content is visible
  const mainHeading = await page.locator('h1').first();
  const isMainHeadingVisible = await mainHeading.isVisible().catch(() => false);
  console.log('Main heading visible:', isMainHeadingVisible ? '✅ YES' : '❌ NO');
  
  if (isMainHeadingVisible) {
    const headingText = await mainHeading.textContent();
    console.log('Heading text:', headingText);
  }
  
  // Check navigation
  const nav = await page.locator('nav').first();
  const isNavVisible = await nav.isVisible().catch(() => false);
  console.log('Navigation visible:', isNavVisible ? '✅ YES' : '❌ NO');
  
  // Check for any sections that loaded
  const sections = await page.locator('section').all();
  console.log('Number of sections found:', sections.length);
  
  // Check for any hotel content
  const hotelContent = await page.locator('text=Tivoli').first();
  const hasHotelContent = await hotelContent.isVisible().catch(() => false);
  console.log('Hotel content visible:', hasHotelContent ? '✅ YES' : '❌ NO');
  
  // Take final screenshot
  await page.screenshot({ path: 'final-tivoli-lotus-court.png', fullPage: true });
  
  // Count interactive elements
  const buttons = await page.locator('button').all();
  const links = await page.locator('a').all();
  console.log('Interactive elements - Buttons:', buttons.length, 'Links:', links.length);
  
  console.log('=== VERIFICATION COMPLETE ===');
});