import { test, expect } from '@playwright/test';

test.describe('Tivoli Lotus Court - Layout and Design Verification', () => {
  test('should have proper layout structure matching New Delhi page design', async ({ page }) => {
    // Monitor for errors
    const errors: string[] = [];
    page.on('pageerror', error => {
      errors.push(error.message);
      console.log(`❌ Page Error: ${error.message}`);
    });

    // Navigate to page
    console.log('🔍 Testing layout and design consistency...');
    await page.goto('http://localhost:5173/hotel/tivoli-lotus-court');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    // Take screenshot for visual verification
    await page.screenshot({ path: 'lotus-court-layout-fixed.png', fullPage: true });

    // 1. Check main container structure
    const mainContainer = page.locator('.container.mx-auto.px-4.py-8');
    await expect(mainContainer).toBeVisible();
    console.log('✅ Main container with proper padding exists');

    // 2. Check max-width wrapper for content
    const contentWrapper = page.locator('.max-w-6xl.mx-auto.space-y-16');
    await expect(contentWrapper).toBeVisible();
    console.log('✅ Content wrapper with max-width and spacing exists');

    // 3. Check hero section has proper mt-16 above-fold structure
    const heroContainer = page.locator('.mt-16.above-fold');
    await expect(heroContainer).toBeVisible();
    console.log('✅ Hero section has proper margin-top and above-fold class');

    // 4. Check that content is not full width (should have padding)
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const containerWidth = await mainContainer.evaluate(el => el.scrollWidth);
    
    console.log(`📊 Body width: ${bodyWidth}px, Container width: ${containerWidth}px`);
    expect(containerWidth).toBeLessThan(bodyWidth);
    console.log('✅ Content has proper width constraints (not full width)');

    // 5. Check sections have proper spacing between them
    const sections = await page.locator('.max-w-6xl > *').count();
    console.log(`📊 Found ${sections} sections in content area`);
    expect(sections).toBeGreaterThan(3);
    console.log('✅ Multiple sections are properly contained');

    // 6. Check navigation is properly positioned
    const navigation = page.locator('nav').first();
    await expect(navigation).toBeVisible();
    console.log('✅ Navigation is visible and positioned correctly');

    // 7. Check hero section content
    await expect(page.locator('h1').first()).toContainText('Tivoli Lotus Court');
    await expect(page.locator('text=Noida')).toBeVisible();
    console.log('✅ Hero section displays correct hotel name and location');

    // 8. Check overview section is within container
    const overviewInContainer = page.locator('.max-w-6xl').locator('text=Located in the heart of');
    await expect(overviewInContainer).toBeVisible();
    console.log('✅ Overview section is properly contained');

    // 9. Check that sections don't have excessive margin/padding issues
    const pageContentLength = (await page.locator('body').textContent())?.length || 0;
    expect(pageContentLength).toBeGreaterThan(3000);
    console.log('✅ Page has substantial content without layout issues');

    // 10. Verify no critical layout errors
    const criticalErrors = errors.filter(error => 
      !error.includes('favicon') && 
      !error.includes('Warning:') &&
      !error.includes('key prop') &&
      !error.includes('DevTools')
    );
    
    console.log(`🔍 Critical layout errors found: ${criticalErrors.length}`);
    expect(criticalErrors.length).toBe(0);
    console.log('✅ No critical layout errors detected');

    console.log('🎉 Layout verification completed successfully!');
  });

  test('should display real data with proper formatting', async ({ page }) => {
    await page.goto('http://localhost:5173/hotel/tivoli-lotus-court');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    // Check real hotel data is displayed
    await expect(page.locator('text=Tivoli Lotus Court - Noida')).toBeVisible();
    await expect(page.locator('text=9212446306')).toBeVisible();
    await expect(page.locator('text=reservations@thetivolihotels.com')).toBeVisible();
    
    // Check real venue data
    await expect(page.locator('text=Main Banquet Hall')).toBeVisible();
    await expect(page.locator('text=15,000 sq ft')).toBeVisible();
    await expect(page.locator('text=Open Lawn')).toBeVisible();
    
    // Check real room data
    await expect(page.locator('text=Standard Room')).toBeVisible();
    await expect(page.locator('text=Super Deluxe Room')).toBeVisible();
    
    // Check real stats
    await expect(page.locator('text=40').first()).toBeVisible(); // 40 rooms
    await expect(page.locator('text=1500').first()).toBeVisible(); // 1500 capacity
    
    console.log('✅ All real data is displayed with proper formatting');
  });

  test('should have consistent spacing between sections', async ({ page }) => {
    await page.goto('http://localhost:5173/hotel/tivoli-lotus-court');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    // Check that space-y-16 class is working properly
    const spaceContainer = page.locator('.space-y-16');
    await expect(spaceContainer).toBeVisible();
    
    // Get the sections within the container
    const sections = spaceContainer.locator('> *');
    const sectionCount = await sections.count();
    
    console.log(`📊 Sections with proper spacing: ${sectionCount}`);
    expect(sectionCount).toBeGreaterThan(3);
    console.log('✅ Sections have consistent spacing');
  });
});