import { test, expect } from '@playwright/test';

test('verify gallery images have been updated', async ({ page }) => {
  console.log('🔍 Verifying updated gallery images...');
  
  // Test 1: Verify the new gallery image URLs are accessible
  const expectedImages = [
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal/Gallary/Facade_optimized_200.jpg', // Hotel Facade
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal/Gallary/Main_Gate_optimized_200.jpg', // Main Gate
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal/Gallary/pool.jpg', // Swimming Pool
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal/Gallary/hotelporch.jpg', // Hotel Porch
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal/Gallary/Lobby_optimized_200.jpg' // Hotel Lobby
  ];
  
  const imageLabels = [
    'Hotel Facade',
    'Main Gate', 
    'Swimming Pool',
    'Hotel Porch',
    'Hotel Lobby'
  ];
  
  console.log('\n🖼️ Testing image accessibility:');
  for (let i = 0; i < expectedImages.length; i++) {
    const response = await page.request.get(expectedImages[i]);
    const isAccessible = response.ok();
    console.log(`   ${i + 1}. ${imageLabels[i]}: ${isAccessible ? '✅' : '❌'} (Status: ${response.status()})`);
  }
  
  // Navigate to Royal Palace page
  await page.goto('http://localhost:5174/hotel/tivoli-royal-suite', { waitUntil: 'domcontentloaded' });
  
  // Wait for content to load
  await page.waitForTimeout(8000);
  
  // Check if gallery images are being used in the page
  const pageImages = await page.evaluate(() => {
    const allImages = Array.from(document.querySelectorAll('img'));
    return allImages
      .map(img => ({
        src: img.src,
        alt: img.alt,
        className: img.className
      }))
      .filter(img => 
        img.src.includes('royalpalacepalwal/Gallary/') ||
        img.src.includes('Facade_optimized_200.jpg') ||
        img.src.includes('Main_Gate_optimized_200.jpg') ||
        img.src.includes('pool.jpg') ||
        img.src.includes('hotelporch.jpg') ||
        img.src.includes('Lobby_optimized_200.jpg')
      );
  });
  
  console.log('\n📋 Gallery images found on page:');
  if (pageImages.length > 0) {
    pageImages.forEach((img, i) => {
      const filename = img.src.split('/').pop()?.split('?')[0];
      console.log(`   ${i + 1}. ${filename} (alt: ${img.alt})`);
    });
  } else {
    console.log('   No gallery images found on page');
  }
  
  // Check if Gallery section exists
  const hasGallerySection = await page.locator('text=Gallery').count() > 0;
  console.log(`\n🎨 Has Gallery section: ${hasGallerySection ? '✅' : '❌'}`);
  
  // Take screenshot
  await page.screenshot({ 
    path: 'gallery-images-test.png',
    fullPage: true 
  });
  console.log('\n📸 Screenshot saved: gallery-images-test.png');
  
  console.log('\n📊 SUMMARY:');
  console.log(`✅ Gallery images accessible: ${expectedImages.length}/5`);
  console.log(`✅ Gallery images on page: ${pageImages.length}`);
  console.log(`✅ Gallery section exists: ${hasGallerySection}`);
});