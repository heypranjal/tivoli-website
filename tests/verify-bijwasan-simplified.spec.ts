import { test, expect } from '@playwright/test';

test('Verify Tivoli Bijwasan page is simplified', async ({ page }) => {
  // Navigate to the page
  await page.goto('http://localhost:5173/delhi/tivoli-bijwasan');
  
  // Wait for page to load
  await page.waitForLoadState('networkidle');
  
  // Take a screenshot of the simplified page
  await page.screenshot({ path: 'bijwasan-simplified.png', fullPage: true });
  
  // Check that only expected sections remain
  
  // Images section should exist
  const imageSection = page.locator('img[alt*="Tivoli Bijwasan"]').first();
  await expect(imageSection).toBeVisible();
  
  // Discover Heritage Luxury section should exist
  const heritageSection = page.locator('text=Discover Heritage Luxury');
  await expect(heritageSection).toBeVisible();
  
  // Sections that should NOT exist anymore
  const amenitiesSection = page.locator('text=Key Amenities');
  await expect(amenitiesSection).not.toBeVisible();
  
  const diningSection = page.locator('h2:has-text("Dining")');
  await expect(diningSection).not.toBeVisible();
  
  const contactSection = page.locator('text=Contact & Location');
  await expect(contactSection).not.toBeVisible();
  
  const virtualTourSection = page.locator('text=360° Virtual Tour');
  await expect(virtualTourSection).not.toBeVisible();
  
  const experienceSpaceSection = page.locator('text=Experience Our Space');
  await expect(experienceSpaceSection).not.toBeVisible();
  
  // Log remaining headings
  const headings = await page.locator('h1, h2, h3').allTextContents();
  console.log('Remaining headings:', headings);
  
  // Count sections to ensure page is simplified
  const sections = await page.locator('section').count();
  console.log(`Number of sections: ${sections}`);
  
  // Should have minimal sections now
  expect(sections).toBeLessThan(5);
});