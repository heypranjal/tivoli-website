import { test, expect } from '@playwright/test';

test('Test Royal Palace Palwal single fix', async ({ page }) => {
  console.log(`\n=== TESTING: Royal Palace Palwal After Single Fix ===`);

  const pageErrors: string[] = [];

  page.on('pageerror', error => {
    pageErrors.push(error.message);
    console.log(`❌ Error: ${error.message}`);
  });

  try {
    await page.goto('http://localhost:5173/palwal-haryana/tivoli-royal-palace', { 
      waitUntil: 'domcontentloaded',
      timeout: 8000 
    });

    await page.waitForTimeout(2000);

    const rootContent = await page.locator('#root').innerHTML();
    const hasContent = rootContent.length > 0;
    const navExists = await page.locator('nav').count() > 0;

    console.log(`📦 Root content length: ${rootContent.length}`);
    console.log(`🧭 Navigation exists: ${navExists}`);
    console.log(`❌ Page errors: ${pageErrors.length}`);

    if (pageErrors.length > 0) {
      console.log(`Errors: ${pageErrors[0]}`);
    }

    const isWorking = hasContent && navExists && pageErrors.length === 0;
    console.log(`📊 Status: ${isWorking ? '✅ FIXED' : '❌ STILL BROKEN'}`);

  } catch (error) {
    console.log(`❌ Failed to load: ${error}`);
  }
});