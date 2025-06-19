import { test, expect } from '@playwright/test';

test.describe('Tivoli Hotel Link Investigation', () => {
  test('debug Tivoli-New Delhi link behavior', async ({ page }) => {
    // Enable console logging to capture any errors
    page.on('console', msg => {
      console.log(`Browser Console [${msg.type()}]:`, msg.text());
    });

    // Enable error logging
    page.on('pageerror', error => {
      console.log('Page Error:', error.message);
    });

    // Go to homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    console.log('✅ Homepage loaded successfully');

    // Find Our Locations section
    const locationsSection = page.locator('text=Our Locations').or(page.locator('text=Discover Our Properties'));
    await expect(locationsSection).toBeVisible({ timeout: 10000 });
    console.log('✅ Our Locations section found');

    // Look for The Tivoli-New Delhi specifically
    const tivoliLinks = page.locator('text="The Tivoli-New Delhi"').or(
      page.locator('[alt*="Tivoli"]').or(
        page.locator('h3:has-text("The Tivoli-New Delhi")')
      )
    );
    
    const linkCount = await tivoliLinks.count();
    console.log(`Found ${linkCount} potential Tivoli links`);

    if (linkCount > 0) {
      // Check each link's attributes
      for (let i = 0; i < linkCount; i++) {
        const link = tivoliLinks.nth(i);
        const tagName = await link.evaluate(el => el.tagName);
        const href = await link.getAttribute('href');
        const textContent = await link.textContent();
        
        console.log(`Link ${i + 1}:`);
        console.log(`  Tag: ${tagName}`);
        console.log(`  Href: ${href}`);
        console.log(`  Text: ${textContent?.trim()}`);
      }

      // Try to click the first link and track navigation
      const currentUrl = page.url();
      console.log(`Current URL before click: ${currentUrl}`);

      // Click the first Tivoli link
      await tivoliLinks.first().click();
      
      // Wait for navigation
      await page.waitForTimeout(2000);
      const newUrl = page.url();
      console.log(`URL after click: ${newUrl}`);

      // Check if we're still on homepage
      if (newUrl === currentUrl || newUrl.endsWith('/')) {
        console.log('❌ Still on homepage - investigating further...');
        
        // Check if there are any JavaScript errors
        const jsErrors = [];
        page.on('pageerror', error => jsErrors.push(error.message));
        
        // Check network requests
        page.on('response', response => {
          if (!response.ok()) {
            console.log(`Failed request: ${response.url()} - ${response.status()}`);
          }
        });

        // Try direct navigation to the expected URL
        await page.goto('/delhi/tivoli-grand-palace');
        await page.waitForTimeout(2000);
        const directUrl = page.url();
        console.log(`Direct navigation result: ${directUrl}`);
        
      } else {
        console.log('✅ Navigation worked - reached:', newUrl);
      }
    } else {
      console.log('❌ No Tivoli links found');
    }
  });

  test('check specific venue card structure', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Look for venue cards in locations section
    const venueCards = page.locator('[class*="group"]:has(img)').or(
      page.locator('[class*="venue"]:has(img)')
    );
    
    const cardCount = await venueCards.count();
    console.log(`Found ${cardCount} venue cards`);

    // Check the structure of venue cards
    for (let i = 0; i < Math.min(cardCount, 5); i++) {
      const card = venueCards.nth(i);
      const isLink = await card.evaluate(el => el.tagName === 'A');
      const href = await card.getAttribute('href');
      const text = await card.textContent();
      
      console.log(`Card ${i + 1}:`);
      console.log(`  Is Link: ${isLink}`);
      console.log(`  Href: ${href}`);
      console.log(`  Contains Tivoli: ${text?.includes('Tivoli')}`);
      
      if (text?.includes('The Tivoli-New Delhi')) {
        console.log(`  ⭐ Found The Tivoli-New Delhi card!`);
        console.log(`  Full text: ${text?.trim()}`);
      }
    }
  });

  test('verify route handling', async ({ page }) => {
    // Test direct navigation to the route
    console.log('Testing direct route: /delhi/tivoli-grand-palace');
    
    const response = await page.goto('/delhi/tivoli-grand-palace');
    await page.waitForLoadState('networkidle');
    
    const finalUrl = page.url();
    const statusCode = response?.status();
    
    console.log(`Status Code: ${statusCode}`);
    console.log(`Final URL: ${finalUrl}`);
    
    // Check if we got redirected to homepage
    if (finalUrl.endsWith('/') && !finalUrl.includes('tivoli-grand-palace')) {
      console.log('❌ Route redirected to homepage');
      
      // Check for any error messages or console logs
      const pageContent = await page.content();
      if (pageContent.includes('hotel') || pageContent.includes('Tivoli')) {
        console.log('✅ Page contains hotel content');
      } else {
        console.log('❌ Page does not contain expected hotel content');
      }
    } else {
      console.log('✅ Route worked correctly');
    }
  });
});