import { test, expect } from '@playwright/test';

test('debug progressive loading for experiences section', async ({ page }) => {
  console.log('🔍 Debugging progressive loading for experiences section...');
  
  // Navigate to Royal Palace page
  await page.goto('http://localhost:5174/hotel/tivoli-royal-suite', { waitUntil: 'domcontentloaded' });
  
  // Check progressive loading state at different intervals
  const checkIntervals = [3000, 6000, 10000, 15000];
  
  for (const interval of checkIntervals) {
    await page.waitForTimeout(interval);
    
    const progressiveState = await page.evaluate(() => {
      // Check if ExperiencesSection component is mounted
      const experiencesSection = document.querySelector('[data-testid="experiences-section"]') || 
                                document.querySelector('*[class*="experiences"]');
      
      // Check for specific text content
      const hasHeritageText = document.body.textContent?.includes('Discover Heritage Luxury') || false;
      const hasWeddingText = document.body.textContent?.includes('Royal Weddings') || false;
      const hasCorporateText = document.body.textContent?.includes('Heritage Corporate Events') || false;
      
      // Check for restaurant images
      const allImages = Array.from(document.querySelectorAll('img'));
      const restaurantImages = allImages.filter(img => 
        img.src.includes('Restaurant1.jpg') || 
        img.src.includes('Restaurant2.jpg') || 
        img.src.includes('Restaurant3.jpg')
      );
      
      return {
        experiencesSectionExists: !!experiencesSection,
        hasHeritageText,
        hasWeddingText,
        hasCorporateText,
        restaurantImagesCount: restaurantImages.length,
        totalImages: allImages.length,
        bodyTextLength: document.body.textContent?.length || 0
      };
    });
    
    console.log(`\n⏱️ At ${interval}ms:`);
    console.log(`   ExperiencesSection exists: ${progressiveState.experiencesSectionExists}`);
    console.log(`   Has 'Discover Heritage Luxury' text: ${progressiveState.hasHeritageText}`);
    console.log(`   Has 'Royal Weddings' text: ${progressiveState.hasWeddingText}`);
    console.log(`   Has 'Heritage Corporate Events' text: ${progressiveState.hasCorporateText}`);
    console.log(`   Restaurant images found: ${progressiveState.restaurantImagesCount}`);
    console.log(`   Total images: ${progressiveState.totalImages}`);
    console.log(`   Body text length: ${progressiveState.bodyTextLength} chars`);
  }
  
  // Try to force scroll to trigger any lazy loading
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight / 2);
  });
  await page.waitForTimeout(2000);
  
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await page.waitForTimeout(3000);
  
  // Final check after scrolling
  const finalState = await page.evaluate(() => {
    const hasHeritageText = document.body.textContent?.includes('Discover Heritage Luxury') || false;
    const experiencesSection = document.querySelector('section') ? 
      Array.from(document.querySelectorAll('section')).find(section => 
        section.textContent?.includes('Discover Heritage Luxury')
      ) : null;
    
    return {
      hasHeritageTextAfterScroll: hasHeritageText,
      experiencesSectionAfterScroll: !!experiencesSection,
      allSectionTexts: Array.from(document.querySelectorAll('h2')).map(h2 => h2.textContent?.trim())
    };
  });
  
  console.log(`\n📊 AFTER SCROLLING:`);
  console.log(`   Has 'Discover Heritage Luxury' text: ${finalState.hasHeritageTextAfterScroll}`);
  console.log(`   ExperiencesSection exists: ${finalState.experiencesSectionAfterScroll}`);
  console.log(`   All section headings: ${finalState.allSectionTexts.join(', ')}`);
  
  // Take screenshot
  await page.screenshot({ 
    path: 'progressive-loading-debug.png',
    fullPage: true 
  });
  console.log('\n📸 Screenshot saved: progressive-loading-debug.png');
});