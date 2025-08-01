import { test, expect } from '@playwright/test';

test('investigate standard room data and images', async ({ page }) => {
  console.log('🔍 Investigating standard room data and images...');
  
  // Navigate to Royal Palace page
  await page.goto('http://localhost:5174/hotel/tivoli-royal-suite', { waitUntil: 'domcontentloaded' });
  
  // Wait for content to load
  await page.waitForTimeout(5000);
  
  // Get all room information from the page
  const roomInfo = await page.evaluate(() => {
    const rooms = [];
    
    // Find all room cards/sections
    const roomElements = document.querySelectorAll('h3, [class*="room"]');
    
    roomElements.forEach((element, index) => {
      const roomName = element.textContent;
      if (roomName && (roomName.toLowerCase().includes('room') || roomName.toLowerCase().includes('suite'))) {
        
        // Find the parent container that might have images
        let parent = element.parentElement;
        while (parent && !parent.querySelector('img') && parent.parentElement) {
          parent = parent.parentElement;
        }
        
        const images = parent ? parent.querySelectorAll('img') : [];
        const imageData = Array.from(images).map(img => ({
          src: img.src,
          alt: img.alt,
          className: img.className
        }));
        
        // Get room description and details
        const roomContainer = parent || element.parentElement;
        const description = roomContainer?.querySelector('p')?.textContent || '';
        const amenities = Array.from(roomContainer?.querySelectorAll('li, [class*="amenity"]') || [])
          .map(item => item.textContent?.trim())
          .filter(text => text && text.length > 0);
        
        rooms.push({
          index,
          name: roomName.trim(),
          description: description.substring(0, 200),
          imageCount: imageData.length,
          images: imageData,
          amenities: amenities.slice(0, 5) // First 5 amenities
        });
      }
    });
    
    return rooms;
  });
  
  console.log('\\n🛏️ ROOM INVESTIGATION RESULTS:');
  console.log(`Total rooms found: ${roomInfo.length}`);
  
  if (roomInfo.length > 0) {
    roomInfo.forEach((room, i) => {
      console.log(`\\n📋 Room ${i + 1}: ${room.name}`);
      console.log(`   Description: ${room.description.substring(0, 100)}...`);
      console.log(`   Images: ${room.imageCount}`);
      
      if (room.images.length > 0) {
        room.images.forEach((img, imgIndex) => {
          if (img.src.includes('supabase')) {
            console.log(`     Image ${imgIndex + 1}: ${img.src}`);
            console.log(`     Alt: ${img.alt}`);
          }
        });
      }
      
      if (room.amenities.length > 0) {
        console.log(`   Amenities: ${room.amenities.join(', ')}`);
      }
    });
  }
  
  // Look specifically for standard room
  const hasStandardRoom = roomInfo.some(room => 
    room.name.toLowerCase().includes('standard')
  );
  
  console.log(`\\n🎯 Has Standard Room: ${hasStandardRoom}`);
  
  // Check what types of rooms exist
  const roomTypes = roomInfo.map(room => room.name.toLowerCase());
  console.log(`\\n📊 Room types found: ${roomTypes.join(', ')}`);
  
  // Take screenshot
  await page.screenshot({ 
    path: 'standard-room-investigation.png',
    fullPage: true 
  });
  console.log('📸 Screenshot saved: standard-room-investigation.png');
});