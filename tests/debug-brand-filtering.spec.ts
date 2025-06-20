import { test, expect } from '@playwright/test';

test('Debug Brand Filtering Issue', async ({ page }) => {
  console.log('=== DEBUGGING BRAND FILTERING ISSUE ===');
  
  // Navigate to homepage
  await page.goto('http://localhost:5174', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  console.log('✅ Homepage loaded');

  // Wait for the Our Hotels section to load
  await page.waitForSelector('text=Our Hotels', { timeout: 10000 });
  console.log('✅ Our Hotels section found');

  // Check default state (should be Tivoli)
  const tivoliButton = page.locator('button:has-text("THE TIVOLI")');
  const wedcationButton = page.locator('button:has-text("WEDCATION")');
  const upperHseButton = page.locator('button:has-text("THE UPPER HSE")');
  const omniaButton = page.locator('button:has-text("OMNIA")');

  // Check if all brand buttons exist
  const buttonCounts = await Promise.all([
    tivoliButton.count(),
    wedcationButton.count(),
    upperHseButton.count(),
    omniaButton.count()
  ]);
  
  console.log(`Brand buttons found: Tivoli(${buttonCounts[0]}), Wedcation(${buttonCounts[1]}), Upper HSE(${buttonCounts[2]}), Omnia(${buttonCounts[3]})`);

  // Check initial venues (should be Tivoli venues)
  const initialVenues = await page.locator('.grid .group').count();
  console.log(`Initial venues displayed: ${initialVenues}`);

  // Take screenshot of initial state
  await page.screenshot({ path: 'brand-filtering-initial.png', fullPage: true });
  console.log('📸 Initial state screenshot saved');

  // Test clicking Wedcation
  console.log('=== TESTING WEDCATION CLICK ===');
  await wedcationButton.click();
  await page.waitForTimeout(1000); // Wait for filtering

  const wedcationVenues = await page.locator('.grid .group').count();
  console.log(`Wedcation venues displayed: ${wedcationVenues}`);

  // Check if any venue names contain "Wedcation"
  const wedcationVenueNames = await page.locator('.grid .group h3').allTextContents();
  console.log('Wedcation venue names:', wedcationVenueNames);

  await page.screenshot({ path: 'brand-filtering-wedcation.png', fullPage: true });
  console.log('📸 Wedcation state screenshot saved');

  // Test clicking The Upper HSE
  console.log('=== TESTING THE UPPER HSE CLICK ===');
  await upperHseButton.click();
  await page.waitForTimeout(1000);

  const upperHseVenues = await page.locator('.grid .group').count();
  console.log(`Upper HSE venues displayed: ${upperHseVenues}`);

  const upperHseVenueNames = await page.locator('.grid .group h3').allTextContents();
  console.log('Upper HSE venue names:', upperHseVenueNames);

  await page.screenshot({ path: 'brand-filtering-upper-hse.png', fullPage: true });
  console.log('📸 Upper HSE state screenshot saved');

  // Test clicking Omnia
  console.log('=== TESTING OMNIA CLICK ===');
  await omniaButton.click();
  await page.waitForTimeout(1000);

  const omniaVenues = await page.locator('.grid .group').count();
  console.log(`Omnia venues displayed: ${omniaVenues}`);

  const omniaVenueNames = await page.locator('.grid .group h3').allTextContents();
  console.log('Omnia venue names:', omniaVenueNames);

  await page.screenshot({ path: 'brand-filtering-omnia.png', fullPage: true });
  console.log('📸 Omnia state screenshot saved');

  // Go back to Tivoli to verify it still works
  console.log('=== TESTING TIVOLI RETURN ===');
  await tivoliButton.click();
  await page.waitForTimeout(1000);

  const finalTivoliVenues = await page.locator('.grid .group').count();
  console.log(`Final Tivoli venues displayed: ${finalTivoliVenues}`);

  const finalTivoliVenueNames = await page.locator('.grid .group h3').allTextContents();
  console.log('Final Tivoli venue names:', finalTivoliVenueNames);

  await page.screenshot({ path: 'brand-filtering-final-tivoli.png', fullPage: true });
  console.log('📸 Final Tivoli state screenshot saved');

  // Check page indicators
  const pageIndicators = await page.locator('.flex.space-x-1 button').count();
  console.log(`Page indicators: ${pageIndicators}`);

  console.log('=== DEBUG COMPLETE ===');
});