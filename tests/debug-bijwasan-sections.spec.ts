import { test, expect } from '@playwright/test';

test('Debug Tivoli Bijwasan page sections', async ({ page }) => {
  // Navigate to the page
  await page.goto('http://localhost:5173/delhi/tivoli-bijwasan');
  
  // Wait for page to load
  await page.waitForLoadState('networkidle');
  
  // Take a screenshot
  await page.screenshot({ path: 'bijwasan-current-sections.png', fullPage: true });
  
  // Get all major sections
  const sections = await page.locator('section, div[class*="py-"], div[class*="mb-"]').all();
  
  console.log(`Found ${sections.length} potential sections`);
  
  // Log section details
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const textContent = await section.textContent();
    const className = await section.getAttribute('class');
    
    if (textContent && textContent.trim().length > 0) {
      console.log(`Section ${i + 1}:`);
      console.log(`  Class: ${className}`);
      console.log(`  Text preview: ${textContent.substring(0, 100)}...`);
      console.log('---');
    }
  }
  
  // Look for specific sections we want to keep/remove
  const imageSection = page.locator('div').filter({ hasText: 'Tivoli Bijwasan' }).first();
  const heritageSection = page.locator('text=Discover Heritage Luxury, text=Royal Luxury, text=Curated Experiences').first();
  const diningSection = page.locator('text=Dining').first();
  const contactSection = page.locator('text=Contact & Location').first();
  
  console.log('Key sections found:');
  console.log('Image section exists:', await imageSection.count() > 0);
  console.log('Heritage/Luxury section exists:', await heritageSection.count() > 0);
  console.log('Dining section exists:', await diningSection.count() > 0);
  console.log('Contact section exists:', await contactSection.count() > 0);
  
  // Look for all headings to understand structure
  const headings = await page.locator('h1, h2, h3').all();
  console.log('\nAll headings found:');
  for (let i = 0; i < headings.length; i++) {
    const heading = headings[i];
    const text = await heading.textContent();
    const tagName = await heading.evaluate(el => el.tagName);
    console.log(`${tagName}: ${text}`);
  }
});