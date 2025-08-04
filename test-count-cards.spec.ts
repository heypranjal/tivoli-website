import { test, expect } from '@playwright/test';

test('Count cards in Discover Heritage Luxury section', async ({ page }) => {
  // Navigate to the Upper HSE page
  await page.goto('http://localhost:5173/hotel/upper-hse-sultanpur');

  // Wait for page to fully load
  await page.waitForLoadState('networkidle');
  
  // Scroll to the experiences section
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight / 2);
  });
  
  await page.waitForTimeout(2000);
  
  // Find the Discover Heritage Luxury section
  const discoverSection = page.locator('text=Discover Heritage Luxury').first();
  await discoverSection.scrollIntoViewIfNeeded();
  
  // Take a screenshot of just the experiences section
  await page.screenshot({ path: 'experiences-cards-count.png' });
  
  // Count different types of card elements
  const allCards = await page.locator('.grid > div').count();
  console.log('Total grid div elements:', allCards);
  
  // Look for cards with images
  const imageCards = await page.locator('img[alt*="experience"], img[alt*="Grand"], img[alt*="Oval"], img[alt*="Corporate"], img[alt*="Social"], img[alt*="Pre-Wedding"]').count();
  console.log('Image cards found:', imageCards);
  
  // Count by specific card containers near the Discover Heritage Luxury section
  const cardContainers = await page.locator('text=Discover Heritage Luxury >> .. >> .grid >> div').count();
  console.log('Card containers in experiences section:', cardContainers);
  
  // Check if all 5 experience titles are present
  const titles = [
    'Grand Weddings',
    'Oval Glass House Events', 
    'Corporate Conferences',
    'Social Gatherings',
    'Pre-Wedding Shoots'
  ];
  
  for (const title of titles) {
    const count = await page.locator(`text=${title}`).count();
    console.log(`"${title}" found: ${count} times`);
  }
  
  // Check the HTML structure around the experiences section
  const experiencesHTML = await page.locator('text=Discover Heritage Luxury >> ..').first().innerHTML();
  console.log('Experiences section HTML length:', experiencesHTML.length);
  
  // Look for any console errors that might be affecting rendering
  const logs: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      logs.push(msg.text());
    }
  });
  
  // Reload page to capture any console errors
  await page.reload();
  await page.waitForLoadState('networkidle');
  
  if (logs.length > 0) {
    console.log('Console errors found:');
    logs.forEach((log, i) => console.log(`${i + 1}. ${log}`));
  } else {
    console.log('No console errors detected');
  }
});