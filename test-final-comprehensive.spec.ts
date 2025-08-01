import { test, expect } from '@playwright/test';

test('comprehensive final check of Royal Palace page', async ({ page }) => {
  console.log('🔍 Running comprehensive final check...');
  
  // Capture any errors
  const errors = [];
  page.on('pageerror', error => {
    errors.push(`PAGE ERROR: ${error.message}`);
    console.log(`🚨 PAGE ERROR: ${error.message}`);
  });
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(`CONSOLE ERROR: ${msg.text()}`);
      console.log(`🚨 CONSOLE ERROR: ${msg.text()}`);
    }
  });
  
  // Navigate to Royal Palace page
  console.log('📍 Navigating to Royal Palace page...');
  await page.goto('http://localhost:5174/hotel/tivoli-royal-suite', { waitUntil: 'domcontentloaded' });
  
  // Wait for page to fully load
  await page.waitForTimeout(8000);
  
  // Check if page loaded at all
  const title = await page.title();
  console.log(`📝 Page title: ${title}`);
  
  // Check if React loaded
  const reactRoot = await page.locator('#root').count();
  console.log(`⚛️ React root found: ${reactRoot > 0}`);
  
  // Check what's actually on the page
  const pageContent = await page.evaluate(() => {
    const body = document.body;
    const hasContent = body.textContent && body.textContent.length > 100;
    const allHeadings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h => ({
      tag: h.tagName,
      text: h.textContent?.trim() || ''
    }));
    
    // Check for our test div
    const testDiv = document.querySelector('div[style*="background: red"]');
    
    return {
      hasContent,
      bodyTextLength: body.textContent?.length || 0,
      headings: allHeadings,
      hasTestDiv: !!testDiv,
      testDivText: testDiv?.textContent || 'Not found'
    };
  });
  
  console.log('\n📊 PAGE CONTENT ANALYSIS:');
  console.log(`Has substantial content: ${pageContent.hasContent}`);
  console.log(`Body text length: ${pageContent.bodyTextLength} characters`);
  console.log(`Total headings found: ${pageContent.headings.length}`);
  console.log(`Test div found: ${pageContent.hasTestDiv}`);
  console.log(`Test div text: ${pageContent.testDivText}`);
  
  console.log('\n📝 ALL HEADINGS:');
  pageContent.headings.forEach((heading, i) => {
    console.log(`   ${i + 1}. [${heading.tag}] ${heading.text}`);
  });
  
  // Check for experiences-specific content
  const experiencesCheck = await page.evaluate(() => {
    const bodyText = document.body.textContent || '';
    return {
      hasDiscover: bodyText.includes('Discover Heritage Luxury'),
      hasRoyalWeddings: bodyText.includes('Royal Weddings'),
      hasCorporateEvents: bodyText.includes('Heritage Corporate Events'),
      hasRestaurantImages: bodyText.includes('Restaurant1.jpg') || bodyText.includes('Restaurant2.jpg'),
      hasTestText: bodyText.includes('TEST: This should be visible')
    };
  });
  
  console.log('\n🎯 EXPERIENCES CONTENT CHECK:');
  Object.entries(experiencesCheck).forEach(([key, value]) => {
    console.log(`   ${key}: ${value ? '✅' : '❌'}`);
  });
  
  // Take final screenshot
  await page.screenshot({ 
    path: 'final-comprehensive-check.png',
    fullPage: true 
  });
  console.log('\n📸 Screenshot saved: final-comprehensive-check.png');
  
  // Report errors
  if (errors.length > 0) {
    console.log('\n🚨 ERRORS DETECTED:');
    errors.forEach(error => console.log(`   ${error}`));
  } else {
    console.log('\n✅ No JavaScript errors detected');
  }
  
  console.log('\n📋 SUMMARY:');
  console.log(`✅ Page loads: ${pageContent.hasContent}`);
  console.log(`✅ React works: ${reactRoot > 0}`);
  console.log(`✅ Test div visible: ${pageContent.hasTestDiv}`);
  console.log(`✅ Experiences section: ${experiencesCheck.hasDiscover}`);
  console.log(`✅ Restaurant images: ${experiencesCheck.hasRestaurantImages}`);
});