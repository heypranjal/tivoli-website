import { test, expect } from '@playwright/test';

test('find Discover Heritage Luxury images on Royal Palace page', async ({ page }) => {
  console.log('🔍 Finding Discover Heritage Luxury images...');
  
  // Navigate to Royal Palace page
  await page.goto('http://localhost:5174/hotel/tivoli-royal-suite', { waitUntil: 'domcontentloaded' });
  
  // Wait for content to load
  await page.waitForTimeout(5000);
  
  // Look for the Discover Heritage Luxury section
  const hasHeritageSection = await page.locator('text=Discover Heritage Luxury').count() > 0;
  console.log(`✅ Has 'Discover Heritage Luxury' section: ${hasHeritageSection}`);
  
  // Find all images in the experiences/heritage section
  const heritageImages = await page.evaluate(() => {
    // Find the section containing "Discover Heritage Luxury"
    const headings = Array.from(document.querySelectorAll('h2'));
    const heritageHeading = headings.find(h => h.textContent?.includes('Discover Heritage Luxury'));
    
    if (!heritageHeading) {
      return { found: false, images: [] };
    }
    
    // Get the parent section
    let section = heritageHeading.parentElement;
    while (section && !section.querySelector('img') && section.parentElement) {
      section = section.parentElement;
    }
    
    // Find all images in this section
    const images = section ? Array.from(section.querySelectorAll('img')) : [];
    
    return {
      found: true,
      sectionClass: section?.className || '',
      sectionId: section?.id || '',
      images: images.map(img => ({
        src: img.src,
        alt: img.alt,
        className: img.className
      }))
    };
  });
  
  console.log('\\n🖼️ HERITAGE LUXURY SECTION ANALYSIS:');
  console.log(`Section found: ${heritageImages.found}`);
  if (heritageImages.found) {
    console.log(`Section class: ${heritageImages.sectionClass}`);
    console.log(`Total images in section: ${heritageImages.images.length}`);
    
    if (heritageImages.images.length > 0) {
      console.log('\\n📷 Images found:');
      heritageImages.images.forEach((img, i) => {
        const filename = img.src.split('/').pop()?.split('?')[0];
        console.log(`   ${i + 1}. ${filename} (alt: ${img.alt})`);
      });
    } else {
      console.log('   No images found in the Heritage Luxury section');
    }
  }
  
  // Take a screenshot of the page
  await page.screenshot({ 
    path: 'heritage-luxury-section.png',
    fullPage: true 
  });
  console.log('\\n📸 Screenshot saved: heritage-luxury-section.png');
});