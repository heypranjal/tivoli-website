import { test, expect } from '@playwright/test';

test('debug shouldLoad progressive loading', async ({ page }) => {
  console.log('🔍 Debugging shouldLoad progressive loading...');
  
  // Navigate to Royal Palace page
  await page.goto('http://localhost:5174/hotel/tivoli-royal-suite', { waitUntil: 'domcontentloaded' });
  
  // Wait for React to load
  await page.waitForTimeout(3000);
  
  // Check what the shouldLoad function is returning for different sections
  const shouldLoadResults = await page.evaluate(() => {
    // Try to access the progressive loading hook state
    // This is a hack to debug React hooks - normally not possible
    
    // Check if the ExperiencesSection component exists in DOM
    const experiencesSection = document.querySelector('section h2');
    const allSections = Array.from(document.querySelectorAll('section h2')).map(h2 => h2.textContent);
    
    // Check for any experiences-related text
    const hasExperiencesText = document.body.textContent?.includes('Discover Heritage Luxury');
    const hasWeddingText = document.body.textContent?.includes('Royal Weddings');
    
    // Check for the ExperiencesSection component specifically
    const experiencesSectionElements = Array.from(document.querySelectorAll('section')).filter(section => 
      section.textContent?.includes('Discover Heritage Luxury') || 
      section.textContent?.includes('Curated Experiences')
    );
    
    return {
      allSections,
      hasExperiencesText,
      hasWeddingText,
      experiencesSectionCount: experiencesSectionElements.length,
      bodyIncludes: {
        'testExperiences': document.body.textContent?.includes('testExperiences'),
        'shouldLoad': document.body.textContent?.includes('shouldLoad'),
        'experiences': document.body.textContent?.includes('experiences')
      }
    };
  });
  
  console.log('\n📊 SHOULDLOAD DEBUG RESULTS:');
  console.log(`All sections: ${shouldLoadResults.allSections.join(', ')}`);
  console.log(`Has 'Discover Heritage Luxury' text: ${shouldLoadResults.hasExperiencesText}`);
  console.log(`Has 'Royal Weddings' text: ${shouldLoadResults.hasWeddingText}`);
  console.log(`ExperiencesSection components found: ${shouldLoadResults.experiencesSectionCount}`);
  
  console.log('\n📝 BODY TEXT INCLUDES:');
  Object.entries(shouldLoadResults.bodyIncludes).forEach(([key, value]) => {
    console.log(`   ${key}: ${value}`);
  });
  
  // Also check for any errors in the browser console
  const consoleMessages = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleMessages.push(msg.text());
    }
  });
  
  // Wait a bit more for any console errors
  await page.waitForTimeout(2000);
  
  if (consoleMessages.length > 0) {
    console.log('\n🚨 CONSOLE ERRORS:');
    consoleMessages.forEach(msg => console.log(`   ${msg}`));
  } else {
    console.log('\n✅ No console errors found');
  }
});