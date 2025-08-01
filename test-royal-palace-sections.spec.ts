import { test, expect } from '@playwright/test';

test('check all sections on Royal Palace page', async ({ page }) => {
  console.log('🔍 Checking all sections on Royal Palace page...');
  
  // Navigate to Royal Palace page
  await page.goto('http://localhost:5174/hotel/tivoli-royal-suite', { waitUntil: 'domcontentloaded' });
  
  // Wait for content to load
  await page.waitForTimeout(8000);
  
  // Get all h2 headings (section titles)
  const sections = await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h2'));
    return headings.map(h => ({
      text: h.textContent?.trim() || '',
      className: h.className,
      parentClass: h.parentElement?.className || ''
    }));
  });
  
  console.log('\\n📋 SECTIONS FOUND:');
  sections.forEach((section, i) => {
    console.log(`   ${i + 1}. ${section.text}`);
  });
  
  // Check specifically for experiences-related content
  const experienceContent = await page.evaluate(() => {
    const keywords = ['Wedding', 'Corporate', 'Destination', 'Experience', 'Heritage', 'Luxury'];
    const results = {};
    
    keywords.forEach(keyword => {
      const elements = Array.from(document.querySelectorAll(`*:contains("${keyword}")`))
        .filter(el => el.textContent?.includes(keyword));
      results[keyword] = elements.length > 0;
    });
    
    return results;
  });
  
  console.log('\\n🔍 EXPERIENCE-RELATED CONTENT:');
  Object.entries(experienceContent).forEach(([keyword, found]) => {
    console.log(`   ${keyword}: ${found ? '✅' : '❌'}`);
  });
  
  // Look for any section that might contain experiences
  const possibleExperienceSections = await page.locator('text=/experience|wedding|corporate|destination/i').count();
  console.log(`\\n📊 Possible experience sections found: ${possibleExperienceSections}`);
  
  // Take a screenshot
  await page.screenshot({ 
    path: 'royal-palace-all-sections.png',
    fullPage: true 
  });
  console.log('\\n📸 Screenshot saved: royal-palace-all-sections.png');
});