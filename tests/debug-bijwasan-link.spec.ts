import { test, expect } from '@playwright/test';

test('Debug Home Page Tivoli Bijwasan Link', async ({ page }) => {
  console.log('🔍 Debugging Tivoli Bijwasan link on home page...');

  // Navigate to home page
  await page.goto('http://localhost:5173/', {
    waitUntil: 'networkidle',
    timeout: 15000
  });
  
  console.log('🏠 Home page loaded');

  // Look for Tivoli Bijwasan links on the page
  const bijwasanLinks = await page.locator('a').filter({ hasText: /bijwasan/i }).all();
  console.log(`🔗 Found ${bijwasanLinks.length} links containing "bijwasan"`);

  for (let i = 0; i < bijwasanLinks.length; i++) {
    const link = bijwasanLinks[i];
    const href = await link.getAttribute('href');
    const text = await link.textContent();
    console.log(`  Link ${i + 1}: "${text?.trim()}" -> ${href}`);
  }

  // Look for any link that might be for Tivoli Bijwasan (case insensitive)
  const tivoliBijwasanLinks = await page.locator('a').filter({ hasText: /tivoli.*bijwasan|bijwasan.*tivoli/i }).all();
  console.log(`🏨 Found ${tivoliBijwasanLinks.length} links for "Tivoli Bijwasan"`);

  for (let i = 0; i < tivoliBijwasanLinks.length; i++) {
    const link = tivoliBijwasanLinks[i];
    const href = await link.getAttribute('href');
    const text = await link.textContent();
    console.log(`  Tivoli Bijwasan Link ${i + 1}: "${text?.trim()}" -> ${href}`);
  }

  // Look in FeaturedVenues section specifically
  const featuredSection = page.locator('[data-testid="featured-venues"], .featured, section').first();
  const featuredLinks = await featuredSection.locator('a').all();
  console.log(`🌟 Found ${featuredLinks.length} links in featured section`);

  for (let i = 0; i < featuredLinks.length; i++) {
    const link = featuredLinks[i];
    const href = await link.getAttribute('href');
    const text = await link.textContent();
    if (text?.toLowerCase().includes('bijwasan') || href?.includes('bijwasan')) {
      console.log(`  Featured Link ${i + 1}: "${text?.trim()}" -> ${href}`);
    }
  }

  // Check all links that might be hotel links
  const allLinks = await page.locator('a[href*="delhi"], a[href*="tivoli"], a[href*="bijwasan"]').all();
  console.log(`🏨 Found ${allLinks.length} hotel-related links`);

  for (let i = 0; i < allLinks.length; i++) {
    const link = allLinks[i];
    const href = await link.getAttribute('href');
    const text = await link.textContent();
    console.log(`  Hotel Link ${i + 1}: "${text?.trim()}" -> ${href}`);
  }

  // Take a screenshot for visual debugging
  await page.screenshot({ 
    path: 'home-page-bijwasan-links.png', 
    fullPage: true 
  });
  console.log('📸 Screenshot saved as home-page-bijwasan-links.png');

  console.log('🎯 Link debugging complete!');
});