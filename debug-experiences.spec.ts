import { test, expect } from '@playwright/test';

test('Debug experiences data', async ({ page }) => {
  await page.goto('http://localhost:5173/hotel/upper-hse-sultanpur');
  await page.waitForLoadState('networkidle');
  
  const experiencesInfo = await page.evaluate(() => {
    const experiencesSection = document.querySelector('h2:has-text("Discover Heritage Luxury")');
    if (!experiencesSection) return { found: false };
    
    const gridContainer = experiencesSection.closest('section')?.querySelector('.grid');
    if (!gridContainer) return { found: true, hasGrid: false };
    
    const cards = gridContainer.querySelectorAll('div[class*="relative"]');
    const cardData = Array.from(cards).map((card, index) => {
      const title = card.querySelector('h3')?.textContent || 'No title';
      const subtitle = card.querySelector('p')?.textContent || 'No subtitle';
      const img = card.querySelector('img');
      return {
        index,
        title,
        subtitle,
        hasImage: !!img,
        imageSrc: img?.src || 'No image'
      };
    });
    
    return {
      found: true,
      hasGrid: true,
      cardCount: cards.length,
      cards: cardData
    };
  });

  console.log('Experiences analysis:', JSON.stringify(experiencesInfo, null, 2));
  
  const socialVisible = await page.locator('text=Social Gatherings').isVisible();
  const preWeddingVisible = await page.locator('text=Pre-Wedding Shoots').isVisible();
  
  console.log('Social Gatherings visible:', socialVisible);
  console.log('Pre-Wedding Shoots visible:', preWeddingVisible);
  
  await page.screenshot({ path: 'experiences-debug.png', fullPage: true });
});