import { test, expect } from '@playwright/test';

test('debug experiences section rendering', async ({ page }) => {
  console.log('🔍 Debugging experiences section rendering...');
  
  // Navigate to Royal Palace page
  await page.goto('http://localhost:5174/hotel/tivoli-royal-suite', { waitUntil: 'domcontentloaded' });
  
  // Wait for React to render
  await page.waitForTimeout(3000);
  
  // Debug the progressive loading state
  const progressiveState = await page.evaluate(() => {
    // Check if progressive loading is working
    const sections = Array.from(document.querySelectorAll('section'));
    const bodyText = document.body.textContent || '';
    
    // Look for any experiences-related content
    const experiencesKeywords = [
      'Discover Heritage Luxury',
      'Royal Weddings',
      'Heritage Corporate Events',
      'Royal Suite Experience',
      'Restaurant1.jpg',
      'Restaurant2.jpg',
      'Restaurant3.jpg'
    ];
    
    const foundKeywords = experiencesKeywords.filter(keyword => 
      bodyText.includes(keyword)
    );
    
    // Check if ExperiencesSection component exists in DOM at all
    const experiencesElements = [];
    sections.forEach((section, i) => {
      const sectionText = section.textContent || '';
      if (sectionText.includes('Heritage') || 
          sectionText.includes('Royal') || 
          sectionText.includes('Experience')) {
        experiencesElements.push({
          index: i,
          textContent: sectionText.substring(0, 100),
          className: section.className,
          id: section.id
        });
      }
    });
    
    return {
      totalSections: sections.length,
      foundKeywords,
      experiencesElements,
      hasDiscoverText: bodyText.includes('Discover Heritage Luxury'),
      hasRoyalWeddingsText: bodyText.includes('Royal Weddings'),
      bodyTextPreview: bodyText.substring(0, 500)
    };
  });
  
  console.log('\n📊 PROGRESSIVE STATE:');
  console.log(`Total sections: ${progressiveState.totalSections}`);
  console.log(`Found keywords: ${progressiveState.foundKeywords.join(', ')}`);
  console.log(`Has 'Discover Heritage Luxury': ${progressiveState.hasDiscoverText ? '✅' : '❌'}`);
  console.log(`Has 'Royal Weddings': ${progressiveState.hasRoyalWeddingsText ? '✅' : '❌'}`);
  console.log(`Experience elements found: ${progressiveState.experiencesElements.length}`);
  
  if (progressiveState.experiencesElements.length > 0) {
    console.log('\n📝 EXPERIENCE ELEMENTS:');
    progressiveState.experiencesElements.forEach((elem, i) => {
      console.log(`   ${i + 1}. Section ${elem.index}: "${elem.textContent.trim()}"`);
      console.log(`      Class: ${elem.className}`);
      console.log(`      ID: ${elem.id}`);
    });
  }
  
  console.log('\n📄 BODY TEXT PREVIEW:');
  console.log(progressiveState.bodyTextPreview);
  
  // Now check if progressive loading hook is loaded at right time
  await page.waitForTimeout(2000); // Wait for tertiary loading (500ms + buffer)
  
  const afterWaitState = await page.evaluate(() => {
    const bodyText = document.body.textContent || '';
    return {
      hasDiscoverText: bodyText.includes('Discover Heritage Luxury'),
      hasRoyalWeddingsText: bodyText.includes('Royal Weddings'),
      totalH2s: Array.from(document.querySelectorAll('h2')).length,
      h2Texts: Array.from(document.querySelectorAll('h2')).map(h2 => h2.textContent?.trim())
    };
  });
  
  console.log('\n⏰ AFTER WAIT STATE (2000ms):');
  console.log(`Has 'Discover Heritage Luxury': ${afterWaitState.hasDiscoverText ? '✅' : '❌'}`);
  console.log(`Has 'Royal Weddings': ${afterWaitState.hasRoyalWeddingsText ? '✅' : '❌'}`);
  console.log(`Total H2s: ${afterWaitState.totalH2s}`);
  console.log(`H2 texts: ${afterWaitState.h2Texts.join(', ')}`);
  
  // Take screenshot
  await page.screenshot({ 
    path: 'experiences-debug.png',
    fullPage: true 
  });
  
  console.log('\n📸 Screenshot saved: experiences-debug.png');
});