import { test, expect } from '@playwright/test';

test('test progressive loading timing for experiences', async ({ page }) => {
  console.log('🔍 Testing progressive loading timing...');
  
  // Navigate to Royal Palace page
  await page.goto('http://localhost:5174/hotel/tivoli-royal-suite', { waitUntil: 'domcontentloaded' });
  
  // Test at different intervals to see when experiences loads
  const testIntervals = [500, 1000, 2000, 3000, 5000, 8000, 10000, 15000];
  
  for (const interval of testIntervals) {
    await page.waitForTimeout(interval - (testIntervals[testIntervals.indexOf(interval) - 1] || 0));
    
    const sectionState = await page.evaluate(() => {
      const hasExperiences = document.body.textContent?.includes('Discover Heritage Luxury') || false;
      const hasRoyalWeddings = document.body.textContent?.includes('Royal Weddings') || false;
      const allH2s = Array.from(document.querySelectorAll('h2')).map(h2 => h2.textContent?.trim());
      
      return {
        hasExperiences,
        hasRoyalWeddings,
        sectionCount: allH2s.length,
        sections: allH2s
      };
    });
    
    console.log(`\n⏱️ At ${interval}ms:`);
    console.log(`   Experiences text: ${sectionState.hasExperiences ? '✅' : '❌'}`);
    console.log(`   Royal Weddings: ${sectionState.hasRoyalWeddings ? '✅' : '❌'}`);
    console.log(`   Total H2 sections: ${sectionState.sectionCount}`);
    console.log(`   Sections: ${sectionState.sections.join(', ')}`);
    
    if (sectionState.hasExperiences) {
      console.log(`\n🎉 Experiences section loaded at ${interval}ms!`);
      break;
    }
  }
  
  // Final comprehensive check
  const finalState = await page.evaluate(() => {
    // Look for any elements that might contain the experiences
    const experiencesElements = [];
    
    // Check for any section with experiences-related text
    const sections = Array.from(document.querySelectorAll('section'));
    sections.forEach((section, i) => {
      if (section.textContent?.includes('Heritage') || 
          section.textContent?.includes('Royal Weddings') ||
          section.textContent?.includes('Discover')) {
        experiencesElements.push({
          index: i,
          textContent: section.textContent?.substring(0, 100) || '',
          className: section.className,
          innerHTML: section.innerHTML.substring(0, 200)
        });
      }
    });
    
    return {
      experiencesElementsFound: experiencesElements.length,
      experiencesElements: experiencesElements,
      totalSections: sections.length
    };
  });
  
  console.log(`\n📊 FINAL STATE:`);
  console.log(`Total sections: ${finalState.totalSections}`);
  console.log(`Experiences elements found: ${finalState.experiencesElementsFound}`);
  
  if (finalState.experiencesElements.length > 0) {
    console.log(`\n📝 EXPERIENCES ELEMENTS:`)
    finalState.experiencesElements.forEach((elem, i) => {
      console.log(`   ${i + 1}. Section ${elem.index}: ${elem.textContent}`);
    });
  }
  
  // Take screenshot
  await page.screenshot({ 
    path: 'progressive-timing-test.png',
    fullPage: true 
  });
  console.log('\n📸 Screenshot saved: progressive-timing-test.png');
});