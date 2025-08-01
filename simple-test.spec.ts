import { test, expect } from '@playwright/test';

test('check for media.public_url errors', async ({ page }) => {
  const mediaErrors: string[] = [];
  
  page.on('pageerror', error => {
    if (error.message.includes('public_url') || error.message.includes('media')) {
      mediaErrors.push(error.message);
      console.log(`❌ Media Error: ${error.message}`);
    }
  });
  
  console.log('🔍 Testing for media errors...');
  
  await page.goto('/hotel/tivoli-lotus-court', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5000); // Wait for React to render
  
  console.log(`📊 Media errors found: ${mediaErrors.length}`);
  
  if (mediaErrors.length === 0) {
    console.log('✅ NO MEDIA ERRORS - FIX SUCCESSFUL!');
  } else {
    console.log('❌ Media errors still present:');
    mediaErrors.forEach(error => console.log(`   - ${error}`));
  }
  
  expect(mediaErrors.length).toBe(0);
});