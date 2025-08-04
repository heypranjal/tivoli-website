import { test, expect } from '@playwright/test';

test('Test the 6th card - Luxury Events', async ({ page }) => {
  await page.goto('http://localhost:5173/hotel/upper-hse-sultanpur');
  await page.waitForLoadState('networkidle');
  
  // Check for the new Luxury Events card
  const luxuryEventsFound = await page.locator('text=Luxury Events').count();
  const exclusiveOccasionsFound = await page.locator('text=Exclusive Occasions').count();
  
  console.log('Luxury Events title found:', luxuryEventsFound);
  console.log('Exclusive Occasions subtitle found:', exclusiveOccasionsFound);
  
  // Check if it's visible
  if (luxuryEventsFound > 0) {
    const visible = await page.locator('text=Luxury Events').isVisible();
    console.log('Luxury Events visible:', visible);
  }
  
  // Count all experience titles to confirm we have 6
  const titles = [
    'Grand Weddings',
    'Oval Glass House Events', 
    'Corporate Conferences',
    'Social Gatherings',
    'Pre-Wedding Shoots',
    'Luxury Events'
  ];
  
  let totalFound = 0;
  for (const title of titles) {
    const found = await page.locator(`text="${title}"`).count();
    const visible = found > 0 ? await page.locator(`text="${title}"`).first().isVisible() : false;
    console.log(`"${title}": found=${found}, visible=${visible}`);
    if (found > 0) totalFound++;
  }
  
  console.log(`Total unique experience titles found: ${totalFound}/6`);
  
  // Take a screenshot to see the updated section
  await page.screenshot({ path: 'six-cards-section.png', fullPage: true });
});