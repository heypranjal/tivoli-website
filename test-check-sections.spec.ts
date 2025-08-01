import { test, expect } from '@playwright/test';

test('check all visible sections on Royal Palace page', async ({ page }) => {
  console.log('🔍 Checking all visible sections on Royal Palace page...');
  
  // Navigate to Royal Palace page
  await page.goto('http://localhost:5174/hotel/tivoli-royal-suite', { waitUntil: 'domcontentloaded' });
  
  // Wait longer for progressive loading
  await page.waitForTimeout(15000);
  
  // Get all section headings
  const sections = await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h2, h3'));
    return headings.map(h => ({
      tag: h.tagName,
      text: h.textContent?.trim() || '',
      visible: h.offsetParent !== null
    })).filter(h => h.text.length > 0);
  });
  
  console.log('\\n📋 ALL SECTIONS FOUND:');
  sections.forEach((section, i) => {
    console.log(`   ${i + 1}. [${section.tag}] ${section.text} (visible: ${section.visible})`);
  });
  
  // Check specifically for progressive loading state
  const progressiveLoadingInfo = await page.evaluate(() => {
    const skeletons = document.querySelectorAll('[class*="skeleton"], [class*="Skeleton"]');
    const loadingElements = document.querySelectorAll('[class*="loading"], [class*="Loading"]');
    
    return {
      skeletonCount: skeletons.length,
      loadingCount: loadingElements.length,
      documentReady: document.readyState,
      bodyHeight: document.body.scrollHeight
    };
  });
  
  console.log('\\n📊 PROGRESSIVE LOADING STATE:');
  console.log(`Skeleton elements: ${progressiveLoadingInfo.skeletonCount}`);
  console.log(`Loading elements: ${progressiveLoadingInfo.loadingCount}`);
  console.log(`Document state: ${progressiveLoadingInfo.documentReady}`);
  console.log(`Page height: ${progressiveLoadingInfo.bodyHeight}px`);
  
  // Try scrolling to trigger lazy loading
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  
  await page.waitForTimeout(5000);
  
  // Check again after scrolling
  const sectionsAfterScroll = await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h2'));
    return headings.map(h => h.textContent?.trim() || '').filter(text => text.length > 0);
  });
  
  console.log('\\n📋 SECTIONS AFTER SCROLLING:');
  sectionsAfterScroll.forEach((section, i) => {
    console.log(`   ${i + 1}. ${section}`);
  });
  
  // Take screenshot
  await page.screenshot({ 
    path: 'royal-palace-all-sections-check.png',
    fullPage: true 
  });
  console.log('\\n📸 Screenshot saved: royal-palace-all-sections-check.png');
});