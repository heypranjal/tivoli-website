import { test, expect } from '@playwright/test';

test('Debug Brand Filtering Issue - Fixed Selectors', async ({ page }) => {
  console.log('=== DEBUGGING BRAND FILTERING ISSUE - FIXED ===');
  
  // Navigate to homepage
  await page.goto('http://localhost:5174', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);
  console.log('✅ Homepage loaded');

  // Scroll to Our Hotels section
  await page.evaluate(() => {
    const ourHotelsElement = Array.from(document.querySelectorAll('h2')).find(el => el.textContent.includes('Our Hotels'));
    if (ourHotelsElement) {
      ourHotelsElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
  await page.waitForTimeout(1000);

  // Find the Our Hotels section specifically
  const ourHotelsSection = page.locator('section:has(h2:has-text("Our Hotels"))');
  await expect(ourHotelsSection).toBeVisible();
  console.log('✅ Our Hotels section found');

  // Check brand buttons within the Our Hotels section
  const tivoliButton = ourHotelsSection.locator('button:has-text("THE TIVOLI")');
  const wedcationButton = ourHotelsSection.locator('button:has-text("WEDCATION")');
  const upperHseButton = ourHotelsSection.locator('button:has-text("THE UPPER HSE")');
  const omniaButton = ourHotelsSection.locator('button:has-text("OMNIA")');

  // Check if all brand buttons exist
  const buttonCounts = await Promise.all([
    tivoliButton.count(),
    wedcationButton.count(),
    upperHseButton.count(),
    omniaButton.count()
  ]);
  
  console.log(`Brand buttons found: Tivoli(${buttonCounts[0]}), Wedcation(${buttonCounts[1]}), Upper HSE(${buttonCounts[2]}), Omnia(${buttonCounts[3]})`);

  // Check initial venues (should be Tivoli venues) within Our Hotels section
  const venueGrid = ourHotelsSection.locator('.grid').first();
  const initialVenues = await venueGrid.locator('.group').count();
  console.log(`Initial venues displayed: ${initialVenues}`);

  // Get initial venue names within Our Hotels section only
  const initialVenueNames = await venueGrid.locator('.group h3').allTextContents();
  console.log('Initial venue names (Tivoli):', initialVenueNames);

  // Take screenshot of initial state
  await page.screenshot({ path: 'brand-filtering-fixed-initial.png', fullPage: true });
  console.log('📸 Initial state screenshot saved');

  // Test clicking Wedcation
  console.log('=== TESTING WEDCATION CLICK ===');
  await wedcationButton.click();
  await page.waitForTimeout(1000); // Wait for filtering

  const wedcationVenues = await venueGrid.locator('.group').count();
  console.log(`Wedcation venues displayed: ${wedcationVenues}`);

  const wedcationVenueNames = await venueGrid.locator('.group h3').allTextContents();
  console.log('Wedcation venue names:', wedcationVenueNames);

  await page.screenshot({ path: 'brand-filtering-fixed-wedcation.png', fullPage: true });
  console.log('📸 Wedcation state screenshot saved');

  // Test clicking The Upper HSE
  console.log('=== TESTING THE UPPER HSE CLICK ===');
  await upperHseButton.click();
  await page.waitForTimeout(1000);

  const upperHseVenues = await venueGrid.locator('.group').count();
  console.log(`Upper HSE venues displayed: ${upperHseVenues}`);

  const upperHseVenueNames = await venueGrid.locator('.group h3').allTextContents();
  console.log('Upper HSE venue names:', upperHseVenueNames);

  await page.screenshot({ path: 'brand-filtering-fixed-upper-hse.png', fullPage: true });
  console.log('📸 Upper HSE state screenshot saved');

  // Test clicking Omnia
  console.log('=== TESTING OMNIA CLICK ===');
  await omniaButton.click();
  await page.waitForTimeout(1000);

  const omniaVenues = await venueGrid.locator('.group').count();
  console.log(`Omnia venues displayed: ${omniaVenues}`);

  const omniaVenueNames = await venueGrid.locator('.group h3').allTextContents();
  console.log('Omnia venue names:', omniaVenueNames);

  await page.screenshot({ path: 'brand-filtering-fixed-omnia.png', fullPage: true });
  console.log('📸 Omnia state screenshot saved');

  // Go back to Tivoli to verify it still works
  console.log('=== TESTING TIVOLI RETURN ===');
  await tivoliButton.click();
  await page.waitForTimeout(1000);

  const finalTivoliVenues = await venueGrid.locator('.group').count();
  console.log(`Final Tivoli venues displayed: ${finalTivoliVenues}`);

  const finalTivoliVenueNames = await venueGrid.locator('.group h3').allTextContents();
  console.log('Final Tivoli venue names:', finalTivoliVenueNames);

  // Check page indicators within Our Hotels section
  const pageIndicators = await ourHotelsSection.locator('.flex.space-x-1 button').count();
  console.log(`Page indicators: ${pageIndicators}`);

  // Check active brand button
  const activeBrandText = await ourHotelsSection.locator('button[class*="text-[#CD9F59]"]').textContent();
  console.log(`Active brand: ${activeBrandText}`);

  console.log('=== DEBUG COMPLETE ===');
});