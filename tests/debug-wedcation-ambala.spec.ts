import { test, expect } from '@playwright/test';

test.describe('Wedcation Ambala Page Analysis', () => {
  test('analyze current state and structure', async ({ page }) => {
    console.log('\n=== WEDCATION AMBALA PAGE ANALYSIS ===\n');
    
    // Navigate to Wedcation Ambala page
    await page.goto('http://localhost:5174/ambala/wedcation-ambala');
    await page.waitForLoadState('networkidle');
    
    // Take full page screenshot
    await page.screenshot({ 
      path: 'wedcation-ambala-current-state.png', 
      fullPage: true 
    });
    console.log('✓ Screenshot saved: wedcation-ambala-current-state.png');
    
    // Check page title and basic loading
    const title = await page.title();
    console.log(`Page Title: ${title}`);
    
    // Analyze page structure
    console.log('\n--- PAGE STRUCTURE ANALYSIS ---');
    
    // Check for main sections
    const sections = await page.$$('section, .section, [class*="section"]');
    console.log(`Total sections found: ${sections.length}`);
    
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const className = await section.getAttribute('class');
      const id = await section.getAttribute('id');
      const textContent = await section.textContent();
      const firstWords = textContent?.trim().substring(0, 100) || '';
      
      console.log(`Section ${i + 1}:`);
      console.log(`  - Class: ${className || 'none'}`);
      console.log(`  - ID: ${id || 'none'}`);
      console.log(`  - Content preview: ${firstWords}...`);
    }
    
    // Check for specific content areas
    console.log('\n--- CONTENT AREAS ANALYSIS ---');
    
    const contentAreas = [
      { selector: 'header', name: 'Header' },
      { selector: '[class*="hero"]', name: 'Hero Section' },
      { selector: '[class*="about"]', name: 'About Section' },
      { selector: '[class*="amenities"]', name: 'Amenities Section' },
      { selector: '[class*="gallery"]', name: 'Gallery Section' },
      { selector: '[class*="events"]', name: 'Events Section' },
      { selector: '[class*="dining"]', name: 'Dining Section' },
      { selector: '[class*="rooms"]', name: 'Rooms Section' },
      { selector: '[class*="contact"]', name: 'Contact Section' },
      { selector: 'footer', name: 'Footer' }
    ];
    
    for (const area of contentAreas) {
      const element = await page.$(area.selector);
      if (element) {
        const isVisible = await element.isVisible();
        const text = await element.textContent();
        const preview = text?.trim().substring(0, 80) || '';
        console.log(`✓ ${area.name}: Found (visible: ${isVisible}) - "${preview}..."`);
      } else {
        console.log(`✗ ${area.name}: Not found`);
      }
    }
    
    // Check for images
    console.log('\n--- IMAGES ANALYSIS ---');
    const images = await page.$$('img');
    console.log(`Total images: ${images.length}`);
    
    let loadedImages = 0;
    let brokenImages = 0;
    
    for (const img of images) {
      const src = await img.getAttribute('src');
      const alt = await img.getAttribute('alt');
      const isVisible = await img.isVisible();
      
      // Check if image is loaded
      const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
      if (naturalWidth > 0) {
        loadedImages++;
      } else {
        brokenImages++;
        console.log(`  ⚠ Broken image: ${src} (alt: ${alt})`);
      }
      
      if (isVisible) {
        console.log(`  - Image: ${src?.substring(0, 50)}... (alt: ${alt || 'none'})`);
      }
    }
    
    console.log(`Images loaded: ${loadedImages}, Broken: ${brokenImages}`);
    
    // Check styling and design patterns
    console.log('\n--- STYLING ANALYSIS ---');
    
    const body = await page.$('body');
    const bodyClasses = await body?.getAttribute('class');
    console.log(`Body classes: ${bodyClasses || 'none'}`);
    
    // Check for common design patterns
    const designElements = [
      { selector: '.container', name: 'Container' },
      { selector: '.grid', name: 'Grid Layout' },
      { selector: '.flex', name: 'Flex Layout' },
      { selector: '[class*="bg-"]', name: 'Background Classes' },
      { selector: '[class*="text-"]', name: 'Text Classes' },
      { selector: '.btn, .button', name: 'Buttons' },
      { selector: '.card', name: 'Cards' }
    ];
    
    for (const element of designElements) {
      const elements = await page.$$(element.selector);
      if (elements.length > 0) {
        console.log(`✓ ${element.name}: ${elements.length} instances found`);
      } else {
        console.log(`✗ ${element.name}: Not found`);
      }
    }
    
    // Check viewport and responsive behavior
    console.log('\n--- RESPONSIVE ANALYSIS ---');
    const viewportSize = page.viewportSize();
    console.log(`Current viewport: ${viewportSize?.width}x${viewportSize?.height}`);
    
    // Test different viewport sizes
    const viewports = [
      { width: 1920, height: 1080, name: 'Desktop Large' },
      { width: 1024, height: 768, name: 'Desktop Small' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 375, height: 667, name: 'Mobile' }
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForTimeout(500);
      
      const isScrollable = await page.evaluate(() => {
        return document.body.scrollHeight > window.innerHeight;
      });
      
      console.log(`${viewport.name} (${viewport.width}x${viewport.height}): Scrollable: ${isScrollable}`);
    }
    
    // Reset viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
  });
  
  test('compare with Royal Court Okhla page', async ({ page }) => {
    console.log('\n=== COMPARISON WITH ROYAL COURT OKHLA ===\n');
    
    // Analyze Royal Court Okhla page first
    console.log('Analyzing Royal Court Okhla page...');
    await page.goto('http://localhost:5174/delhi/royal-court-okhla');
    await page.waitForLoadState('networkidle');
    
    // Take screenshot for comparison
    await page.screenshot({ 
      path: 'royal-court-okhla-reference.png', 
      fullPage: true 
    });
    
    // Analyze structure
    const okhlaTitle = await page.title();
    const okhlaSections = await page.$$('section, .section, [class*="section"]');
    const okhlaImages = await page.$$('img');
    
    console.log(`Royal Court Okhla - Title: ${okhlaTitle}`);
    console.log(`Royal Court Okhla - Sections: ${okhlaSections.length}`);
    console.log(`Royal Court Okhla - Images: ${okhlaImages.length}`);
    
    // Document the structure
    console.log('\n--- ROYAL COURT OKHLA STRUCTURE ---');
    for (let i = 0; i < okhlaSections.length; i++) {
      const section = okhlaSections[i];
      const className = await section.getAttribute('class');
      const textContent = await section.textContent();
      const firstWords = textContent?.trim().substring(0, 80) || '';
      
      console.log(`Okhla Section ${i + 1}: ${className || 'no-class'} - "${firstWords}..."`);
    }
    
    // Now analyze Wedcation Ambala
    console.log('\nAnalyzing Wedcation Ambala page...');
    await page.goto('http://localhost:5174/ambala/wedcation-ambala');
    await page.waitForLoadState('networkidle');
    
    const ambalaTitle = await page.title();
    const ambalaSections = await page.$$('section, .section, [class*="section"]');
    const ambalaImages = await page.$$('img');
    
    console.log(`Wedcation Ambala - Title: ${ambalaTitle}`);
    console.log(`Wedcation Ambala - Sections: ${ambalaSections.length}`);
    console.log(`Wedcation Ambala - Images: ${ambalaImages.length}`);
    
    // Document the structure
    console.log('\n--- WEDCATION AMBALA STRUCTURE ---');
    for (let i = 0; i < ambalaSections.length; i++) {
      const section = ambalaSections[i];
      const className = await section.getAttribute('class');
      const textContent = await section.textContent();
      const firstWords = textContent?.trim().substring(0, 80) || '';
      
      console.log(`Ambala Section ${i + 1}: ${className || 'no-class'} - "${firstWords}..."`);
    }
    
    // Compare structures
    console.log('\n--- STRUCTURAL COMPARISON ---');
    console.log(`Sections difference: ${ambalaSections.length - okhlaSections.length}`);
    console.log(`Images difference: ${ambalaImages.length - okhlaImages.length}`);
    
    if (ambalaSections.length < okhlaSections.length) {
      console.log('⚠ Wedcation Ambala has fewer sections than Royal Court Okhla');
    } else if (ambalaSections.length > okhlaSections.length) {
      console.log('✓ Wedcation Ambala has more sections than Royal Court Okhla');
    } else {
      console.log('= Both pages have the same number of sections');
    }
  });
  
  test('identify insertion points for new sections', async ({ page }) => {
    console.log('\n=== INSERTION POINTS ANALYSIS ===\n');
    
    await page.goto('http://localhost:5174/ambala/wedcation-ambala');
    await page.waitForLoadState('networkidle');
    
    // Get current page structure
    const sections = await page.$$('section, .section, [class*="section"], main > div, main > *');
    
    console.log('Current page flow and recommended insertion points:');
    
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const tagName = await section.evaluate(el => el.tagName);
      const className = await section.getAttribute('class');
      const textContent = await section.textContent();
      const firstWords = textContent?.trim().substring(0, 60) || '';
      
      console.log(`\n${i + 1}. ${tagName}: ${className || 'no-class'}`);
      console.log(`   Content: "${firstWords}..."`);
      
      // Suggest insertion points based on content
      if (firstWords.toLowerCase().includes('hero') || firstWords.toLowerCase().includes('welcome')) {
        console.log('   → Good spot AFTER this for: About section, Overview');
      } else if (firstWords.toLowerCase().includes('about')) {
        console.log('   → Good spot AFTER this for: Amenities, Features');
      } else if (firstWords.toLowerCase().includes('amenities')) {
        console.log('   → Good spot AFTER this for: Gallery, Rooms');
      } else if (firstWords.toLowerCase().includes('gallery')) {
        console.log('   → Good spot AFTER this for: Dining, Events');
      } else if (firstWords.toLowerCase().includes('contact')) {
        console.log('   → Good spot BEFORE this for: Final CTA, Booking widget');
      }
    }
    
    console.log('\n--- RECOMMENDED INSERTION STRATEGY ---');
    console.log('Based on common hotel website patterns:');
    console.log('1. Hero Section (existing)');
    console.log('2. → INSERT: Brief About/Overview');
    console.log('3. → INSERT: Key Amenities Highlight');
    console.log('4. Gallery Section (if existing)');
    console.log('5. → INSERT: Detailed Amenities Grid');
    console.log('6. → INSERT: Dining Options');
    console.log('7. → INSERT: Events & Conferences');
    console.log('8. → INSERT: Rooms & Suites');
    console.log('9. Contact/Footer (existing)');
  });
});