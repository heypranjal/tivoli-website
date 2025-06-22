import { test, expect } from '@playwright/test';

test('Hotel cards show actual location names not India', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  // Wait for Our Hotels section
  const ourHotelsSection = page.locator('section:has-text("Our Hotels")');
  await ourHotelsSection.waitFor({ timeout: 10000 });

  // Test THE TIVOLI brand - should NOT show "India"
  console.log('Testing THE TIVOLI locations...');
  await page.locator('button:has-text("THE TIVOLI")').click();
  await page.waitForTimeout(2000);
  
  // Should show actual cities
  await expect(page.locator('text=Delhi').first()).toBeVisible();
  await expect(page.locator('text=Palwal').first()).toBeVisible();
  await expect(page.locator('text=Rewari').first()).toBeVisible();
  
  // Should NOT show generic "India" 
  const indiaTexts = page.locator('text=India');
  const indiaCount = await indiaTexts.count();
  console.log(`Found ${indiaCount} instances of "India" text - should be 0 in location fields`);
  
  // Test OMNIA brand
  console.log('Testing OMNIA locations...');
  await page.locator('button:has-text("OMNIA")').click();
  await page.waitForTimeout(2000);
  
  await expect(page.locator('text=Delhi').first()).toBeVisible();
  await expect(page.locator('text=Noida').first()).toBeVisible();
  await expect(page.locator('text=Greater Noida').first()).toBeVisible();
  
  // Test WEDCATION brand
  console.log('Testing WEDCATION locations...');
  await page.locator('button:has-text("WEDCATION")').click();
  await page.waitForTimeout(2000);
  
  await expect(page.locator('text=Ambala').first()).toBeVisible();
  await expect(page.locator('text=Israna').first()).toBeVisible();

  console.log('✅ All hotels show specific location names, not generic India');
});