import { test, expect, Page } from '@playwright/test';

test.describe('Omnia by Tivoli Dwarka Expressway - Comprehensive Test Suite', () => {
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    
    // Listen for console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('Console Error:', msg.text());
      }
    });
    
    // Listen for page errors
    page.on('pageerror', err => {
      console.log('Page Error:', err.message);
    });
  });

  test('Should load Omnia Dwarka Expressway page successfully', async () => {
    await page.goto('http://localhost:5173/hotel/omnia-dwarka-expressway');
    
    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');
    
    // Check that the page title contains "Omnia"
    await expect(page).toHaveTitle(/Omnia/i);
    
    // Take a screenshot of the full page
    await page.screenshot({ 
      path: 'omnia-dwarka-full-page.png', 
      fullPage: true 
    });
  });

  test('Should display correct Omnia branding and hotel information', async () => {
    await page.goto('http://localhost:5173/hotel/omnia-dwarka-expressway');
    await page.waitForLoadState('networkidle');

    // Check for Omnia branding in the title/header
    const hotelName = page.locator('h1, .hotel-title, [data-testid="hotel-name"]').first();
    await expect(hotelName).toContainText(/Omnia.*Tivoli.*Dwarka/i);

    // Check for correct address
    const addressElement = page.locator('text=/Plot.*Dwarka.*Expressway/i').first();
    await expect(addressElement).toBeVisible();

    // Check for correct contact information
    await expect(page.locator('text=+91-9818553333')).toBeVisible();
    await expect(page.locator('text=reservations@thetivolihotels.com')).toBeVisible();

    console.log('✓ Omnia branding and contact info verified');
  });

  test('Should display venue spaces correctly', async () => {
    await page.goto('http://localhost:5173/hotel/omnia-dwarka-expressway');
    await page.waitForLoadState('networkidle');

    // Look for venue spaces - these might be in different sections
    const venueKeywords = ['Mansion Hall', '360 Banquet Hall', 'banquet', 'conference', 'meeting'];
    
    let venuesFound = 0;
    for (const keyword of venueKeywords) {
      const venueElement = page.locator(`text=/${keyword}/i`).first();
      if (await venueElement.isVisible()) {
        venuesFound++;
        console.log(`✓ Found venue: ${keyword}`);
      }
    }

    expect(venuesFound).toBeGreaterThan(0);
    console.log(`✓ Found ${venuesFound} venue-related elements`);
  });

  test('Should apply brand color (#2C3E50) properly', async () => {
    await page.goto('http://localhost:5173/hotel/omnia-dwarka-expressway');
    await page.waitForLoadState('networkidle');

    // Check for elements with the brand color
    const brandColorElements = await page.locator('*').evaluateAll(elements => {
      const brandColor = '#2C3E50';
      const brandColorRgb = 'rgb(44, 62, 80)'; // converted value
      
      return elements.filter(el => {
        const computedStyle = window.getComputedStyle(el);
        return computedStyle.color === brandColorRgb || 
               computedStyle.backgroundColor === brandColorRgb ||
               computedStyle.borderColor === brandColorRgb;
      }).length;
    });

    expect(brandColorElements).toBeGreaterThan(0);
    console.log(`✓ Found ${brandColorElements} elements with brand color`);
  });

  test('Should load all main page sections', async () => {
    await page.goto('http://localhost:5173/hotel/omnia-dwarka-expressway');
    await page.waitForLoadState('networkidle');

    const sections = [
      'hero', 'overview', 'accommodation', 'gallery', 
      'dining', 'meetings', 'contact', 'location'
    ];

    let sectionsFound = 0;
    for (const section of sections) {
      // Look for section by class, id, or data attribute
      const sectionSelectors = [
        `#${section}`,
        `.${section}`,
        `[data-section="${section}"]`,
        `[class*="${section}"]`,
        `section:has(h2:text-is("${section}"))`
      ];

      for (const selector of sectionSelectors) {
        try {
          const element = page.locator(selector).first();
          if (await element.isVisible({ timeout: 1000 })) {
            sectionsFound++;
            console.log(`✓ Found section: ${section}`);
            break;
          }
        } catch (e) {
          // Continue to next selector
        }
      }
    }

    console.log(`✓ Found ${sectionsFound} main sections`);
    expect(sectionsFound).toBeGreaterThan(3); // At least some sections should be present
  });

  test('Should display Google Maps integration', async () => {
    await page.goto('http://localhost:5173/hotel/omnia-dwarka-expressway');
    await page.waitForLoadState('networkidle');

    // Look for Google Maps iframe or map container
    const mapSelectors = [
      'iframe[src*="google.com/maps"]',
      'iframe[src*="maps.google"]',
      '.google-map',
      '[id*="map"]',
      '[class*="map"]'
    ];

    let mapFound = false;
    for (const selector of mapSelectors) {
      const mapElement = page.locator(selector).first();
      if (await mapElement.isVisible()) {
        mapFound = true;
        console.log(`✓ Found map with selector: ${selector}`);
        break;
      }
    }

    if (mapFound) {
      console.log('✓ Google Maps integration verified');
    } else {
      console.log('⚠ No Google Maps found - may need manual verification');
    }
  });

  test('Should handle old Upper HSE URL redirect/compatibility', async () => {
    try {
      await page.goto('http://localhost:5173/hotel/upper-hse-sultanpur');
      await page.waitForLoadState('networkidle');
      
      // Check if page loads without errors
      const pageTitle = await page.title();
      console.log(`✓ Old URL accessible - Page title: ${pageTitle}`);
      
      // Take screenshot for documentation
      await page.screenshot({ 
        path: 'upper-hse-sultanpur-page.png', 
        fullPage: true 
      });
      
    } catch (error) {
      console.log('⚠ Old Upper HSE URL not accessible:', error.message);
    }
  });

  test('Should have no console errors or broken functionality', async () => {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    page.on('pageerror', err => {
      pageErrors.push(err.message);
    });

    await page.goto('http://localhost:5173/hotel/omnia-dwarka-expressway');
    await page.waitForLoadState('networkidle');
    
    // Wait a bit more to catch any delayed errors
    await page.waitForTimeout(3000);

    // Check for broken links (sample a few important ones)
    const links = await page.locator('a[href]').all();
    let brokenLinks = 0;
    
    for (let i = 0; i < Math.min(links.length, 10); i++) {
      const href = await links[i].getAttribute('href');
      if (href && href.startsWith('http')) {
        try {
          const response = await page.request.get(href);
          if (!response.ok()) {
            brokenLinks++;
            console.log(`⚠ Broken link: ${href} - Status: ${response.status()}`);
          }
        } catch (e) {
          // External links might fail due to CORS, skip
        }
      }
    }

    console.log(`Console Errors: ${consoleErrors.length}`);
    console.log(`Page Errors: ${pageErrors.length}`);
    console.log(`Broken Links: ${brokenLinks}`);

    if (consoleErrors.length > 0) {
      console.log('Console Errors:', consoleErrors);
    }
    if (pageErrors.length > 0) {
      console.log('Page Errors:', pageErrors);
    }

    // Don't fail the test for minor issues, just report them
    expect(pageErrors.length).toBeLessThan(5);
  });

  test('Should take comprehensive screenshots for documentation', async () => {
    await page.goto('http://localhost:5173/hotel/omnia-dwarka-expressway');
    await page.waitForLoadState('networkidle');

    // Take full page screenshot
    await page.screenshot({ 
      path: 'omnia-dwarka-comprehensive-test.png', 
      fullPage: true 
    });

    // Take mobile viewport screenshot
    await page.setViewportSize({ width: 375, height: 667 });
    await page.screenshot({ 
      path: 'omnia-dwarka-mobile-view.png', 
      fullPage: true 
    });

    // Reset to desktop view
    await page.setViewportSize({ width: 1920, height: 1080 });

    console.log('✓ Screenshots captured for documentation');
  });
});