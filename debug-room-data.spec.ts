import { test, expect } from '@playwright/test';

test('debug Royal Palace room data and image loading', async ({ page }) => {
  console.log('🔍 Debugging Royal Palace room data...');
  
  // Navigate to Royal Palace page
  await page.goto('http://localhost:5174/hotel/tivoli-royal-suite', { waitUntil: 'domcontentloaded' });
  
  // Wait for content to load
  await page.waitForTimeout(5000);
  
  // Debug room data by examining the page structure
  const roomData = await page.evaluate(() => {
    // Get all room elements
    const roomElements = document.querySelectorAll('[class*="room"], [data-testid*="room"]');
    const roomInfo = [];
    
    roomElements.forEach((element, index) => {
      const roomName = element.querySelector('h3')?.textContent || 'Unknown';
      const images = element.querySelectorAll('img');
      const imageUrls = Array.from(images).map(img => img.src);
      
      roomInfo.push({
        index,
        roomName,
        imageCount: images.length,
        imageUrls
      });
    });
    
    return {
      url: window.location.pathname,
      roomCount: roomElements.length,
      rooms: roomInfo,
      allImages: Array.from(document.querySelectorAll('img')).map(img => ({
        src: img.src,
        alt: img.alt,
        className: img.className
      }))
    };
  });
  
  console.log('\\n🔍 DEBUG INFORMATION:');
  console.log(`Current URL: ${roomData.url}`);
  console.log(`Total room elements found: ${roomData.roomCount}`);
  
  if (roomData.rooms.length > 0) {
    roomData.rooms.forEach(room => {
      console.log(`\\n🛏️ Room ${room.index + 1}:`);
      console.log(`   Name: ${room.roomName}`);
      console.log(`   Image count: ${room.imageCount}`);
      if (room.imageUrls.length > 0) {
        room.imageUrls.forEach((url, i) => {
          console.log(`   Image ${i + 1}: ${url}`);
        });
      }
    });
  }
  
  console.log(`\\n🖼️ All images on page (${roomData.allImages.length}):`);
  roomData.allImages.forEach((img, i) => {
    if (img.src.includes('supabase') || img.src.includes('royal') || img.src.includes('deluxe')) {
      console.log(`   ${i + 1}. ${img.src} (alt: ${img.alt})`);
    }
  });
  
  // Check console for errors
  const logs = [];
  page.on('console', msg => {
    if (msg.text().includes('error') || msg.text().includes('fail') || msg.text().includes('hotel')) {
      logs.push(msg.text());
    }
  });
  
  // Take a focused screenshot of just the accommodations section
  const accommodationsSection = page.locator('text=Accommodations').locator('..');
  if (await accommodationsSection.count() > 0) {
    await accommodationsSection.screenshot({ 
      path: 'debug-accommodations-section.png'
    });
    console.log('📸 Accommodations section screenshot: debug-accommodations-section.png');
  }
  
  console.log('\\n📋 DEBUGGING COMPLETE');
});