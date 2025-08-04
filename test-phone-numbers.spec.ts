import { test, expect } from '@playwright/test';

test('Check phone numbers on Upper HSE page', async ({ page }) => {
  await page.goto('http://localhost:5173/hotel/upper-hse-sultanpur');
  await page.waitForLoadState('networkidle');
  
  // Check for the phone numbers in various sections
  const phone1Found = await page.locator('text=8588850354').count();
  const phone2Found = await page.locator('text=981855333').count();
  const combinedPhoneFound = await page.locator('text=8588850354, 981855333').count();
  
  console.log('Phone number 8588850354 found:', phone1Found, 'times');
  console.log('Phone number 981855333 found:', phone2Found, 'times');
  console.log('Combined phone numbers found:', combinedPhoneFound, 'times');
  
  // Check in contact section specifically
  const contactSection = page.locator('text=Contact').first();
  if (await contactSection.count() > 0) {
    await contactSection.scrollIntoView();
    console.log('Contact section found and scrolled to');
  }
  
  // Take a screenshot to see where phone numbers appear
  await page.screenshot({ path: 'phone-numbers-check.png', fullPage: true });
  
  // Check if phone numbers appear in any links or buttons
  const phoneLinks = await page.locator('a[href*="tel:"]').count();
  console.log('Phone links found:', phoneLinks);
  
  if (phoneLinks > 0) {
    const phoneLinkHrefs = await page.locator('a[href*="tel:"]').all();
    for (let i = 0; i < phoneLinkHrefs.length; i++) {
      const href = await phoneLinkHrefs[i].getAttribute('href');
      console.log(`Phone link ${i + 1}: ${href}`);
    }
  }
});