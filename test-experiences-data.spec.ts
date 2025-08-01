import { test, expect } from '@playwright/test';

test('debug experiences data from hook', async ({ page }) => {
  console.log('🔍 Debugging experiences data from hook...');
  
  // Navigate to Royal Palace page
  await page.goto('http://localhost:5174/hotel/tivoli-royal-suite', { waitUntil: 'domcontentloaded' });
  
  // Wait for React to render
  await page.waitForTimeout(3000);
  
  // Debug what's actually being passed to ExperiencesSection
  const hookData = await page.evaluate(() => {
    // Try to access React internals to see hook data
    // This is hacky but will help debug
    
    // Look for any window variables that might contain the hook data
    const windowKeys = Object.keys(window).filter(key => 
      key.includes('royal') || key.includes('palace') || key.includes('tivoli')
    );
    
    // Check if there are any errors in console
    const errorLogs = [];
    
    // Look for any React component props in the DOM
    const sections = Array.from(document.querySelectorAll('section'));
    const sectionInfo = sections.map((section, i) => ({
      index: i,
      textContent: section.textContent?.substring(0, 100) || '',
      className: section.className,
      hasExperiencesClass: section.className.includes('experiences') || section.className.includes('Experience'),
      dataAttributes: Object.keys(section.dataset)
    }));
    
    return {
      windowKeys: windowKeys.slice(0, 5),
      sectionInfo,
      totalSections: sections.length,
      hasReactDevTools: !!window.__REACT_DEVTOOLS_GLOBAL_HOOK__,
    };
  });
  
  console.log('\n📊 HOOK DATA DEBUG:');
  console.log(`Window keys with royal/palace/tivoli: ${hookData.windowKeys.join(', ')}`);
  console.log(`Has React DevTools: ${hookData.hasReactDevTools}`);
  console.log(`Total sections: ${hookData.totalSections}`);
  
  console.log('\n📝 SECTION INFO:');
  hookData.sectionInfo.forEach((section, i) => {
    console.log(`   ${i + 1}. Section ${section.index}:`);
    console.log(`      Text: "${section.textContent.trim()}"`);
    console.log(`      Class: ${section.className}`);
    console.log(`      Has experiences class: ${section.hasExperiencesClass}`);
    console.log(`      Data attributes: ${section.dataAttributes.join(', ')}`);
  });
  
  // Now let's check the actual component structure for ExperiencesSection
  const experiencesCheck = await page.evaluate(() => {
    // Look for any element that might be the ExperiencesSection
    const possibleExperiencesSections = [];
    
    // Check all elements for experiences-related content
    const allElements = Array.from(document.querySelectorAll('*'));
    allElements.forEach((element, i) => {
      const text = element.textContent || '';
      const className = element.className || '';
      
      if (text.includes('Heritage') || 
          text.includes('Royal Weddings') || 
          text.includes('Experience') ||
          className.includes('experience') ||
          className.includes('Experience')) {
        
        possibleExperiencesSections.push({
          tagName: element.tagName,
          className: className,
          textContent: text.substring(0, 50),
          hasChildren: element.children.length > 0,
          childCount: element.children.length
        });
      }
    });
    
    return {
      possibleSections: possibleExperiencesSections.slice(0, 10), // Limit to first 10
      totalPossible: possibleExperiencesSections.length
    };
  });
  
  console.log('\n🎯 EXPERIENCES COMPONENT CHECK:');
  console.log(`Total possible experiences elements: ${experiencesCheck.totalPossible}`);
  
  if (experiencesCheck.possibleSections.length > 0) {
    console.log('\n📋 POSSIBLE EXPERIENCES ELEMENTS:');
    experiencesCheck.possibleSections.forEach((elem, i) => {
      console.log(`   ${i + 1}. ${elem.tagName}:`);
      console.log(`      Class: ${elem.className}`);
      console.log(`      Text: "${elem.textContent.trim()}"`);
      console.log(`      Children: ${elem.childCount}`);
    });
  } else {
    console.log('❌ No experiences-related elements found');
  }
  
  // Take screenshot
  await page.screenshot({ 
    path: 'experiences-data-debug.png',
    fullPage: true 
  });
  
  console.log('\n📸 Screenshot saved: experiences-data-debug.png');
});