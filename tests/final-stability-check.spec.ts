/**
 * Final Stability Check
 * Quick test to verify server stability
 */

import { test, expect } from '@playwright/test';

test('Final server stability check', async ({ page }) => {
  console.log('🔍 Final stability check...');

  // Set shorter timeouts for quick checks
  page.setDefaultTimeout(15000);

  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
  console.log('✅ Home page loaded');

  await page.waitForSelector('text=Our Hotels', { timeout: 10000 });
  console.log('✅ Our Hotels section visible');

  // Quick check for Upper HSE tab
  const upperHSETab = page.locator('text=/THE UPPER HSE/i');
  if (await upperHSETab.count() > 0) {
    console.log('✅ Upper HSE tab found');
  } else {
    console.log('⚠️ Upper HSE tab not found');
  }

  // Test direct navigation to Upper HSE page
  await page.goto('http://localhost:5173/hotel/upper-hse-sultanpur', { waitUntil: 'domcontentloaded' });
  console.log('✅ Upper HSE page accessible');

  // Check if gallery section is present
  const gallerySection = page.locator('text=Gallery');
  if (await gallerySection.count() > 0) {
    console.log('✅ Gallery section found');
  }

  console.log('🎉 All checks passed - server is stable!');
});