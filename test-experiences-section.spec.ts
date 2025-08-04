import { test, expect } from '@playwright/test';

test('Test Upper HSE Discover Heritage Luxury section', async ({ page }) => {
  // Navigate to the Upper HSE page
  await page.goto('http://localhost:5173/hotel/upper-hse-sultanpur');

  // Wait for page to fully load
  await page.waitForLoadState('networkidle');
  
  // Scroll down to make sure all sections load
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  
  // Wait a moment for any lazy loading
  await page.waitForTimeout(2000);
  
  // Check for the Discover Heritage Luxury section
  const discoverSection = await page.locator('text=Discover Heritage Luxury').count();
  console.log('Discover Heritage Luxury sections found:', discoverSection);
  
  // Check for experience cards
  const experienceCards = await page.locator('[class*="experience"]').count();
  console.log('Experience cards found:', experienceCards);
  
  // Look for specific experience titles
  const weddingCard = await page.locator('text=Grand Weddings').count();
  const glassHouseCard = await page.locator('text=Oval Glass House Events').count();
  const corporateCard = await page.locator('text=Corporate Conferences').count();
  const socialCard = await page.locator('text=Social Gatherings').count();
  const preWeddingCard = await page.locator('text=Pre-Wedding Shoots').count();
  
  console.log('Grand Weddings cards:', weddingCard);
  console.log('Oval Glass House Events cards:', glassHouseCard);
  console.log('Corporate Conferences cards:', corporateCard);
  console.log('Social Gatherings cards:', socialCard);
  console.log('Pre-Wedding Shoots cards:', preWeddingCard);
  
  // Take a screenshot showing the full page
  await page.screenshot({ path: 'upper-hse-full-page.png', fullPage: true });
  
  // Also take a screenshot of just the experiences section if it exists
  const experiencesSection = page.locator('text=Discover Heritage Luxury').first();
  if (await experiencesSection.count() > 0) {
    await experiencesSection.scrollIntoView();
    await page.screenshot({ path: 'experiences-section-detail.png' });
  }
});