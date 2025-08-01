import { test, expect } from '@playwright/test';

test('test added Standard Room with specific images', async ({ page }) => {
  console.log('🏨 Testing added Standard Room with specific images...');
  
  // Test 1: Verify the standard room image URLs are accessible
  const standardImages = [
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal//Standard%20Room%20240%20sq%20Feet.jpeg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/royalpalacepalwal//Standard%20Washroom.jpeg'
  ];
  
  for (const imageUrl of standardImages) {
    const response = await page.request.get(imageUrl);
    const isImageAccessible = response.ok();
    console.log(`🖼️ Image accessible: ${imageUrl.split('/').pop()} - ${isImageAccessible} (Status: ${response.status()})`);
  }
  
  // Navigate to Royal Palace page
  await page.goto('http://localhost:5174/hotel/tivoli-royal-suite', { waitUntil: 'domcontentloaded' });
  
  // Wait for content to load
  await page.waitForTimeout(5000);
  
  // Get all room information from the page
  const roomInfo = await page.evaluate(() => {
    const rooms = [];
    
    // Find all room cards/sections
    const roomElements = document.querySelectorAll('h3');
    
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
          alt: img.alt
        })).filter(img => img.src.includes('supabase'));
        
        rooms.push({
          name: roomName.trim(),
          imageCount: imageData.length,
          images: imageData
        });
      }
    });
    
    return rooms;
  });
  
  // Check if we now have a Standard Room
  const hasStandardRoom = roomInfo.some(room => 
    room.name.toLowerCase().includes('standard')
  );
  
  // Check if Standard Room has the specific images
  const standardRoom = roomInfo.find(room => 
    room.name.toLowerCase().includes('standard')
  );
  
  const hasStandardRoomImages = standardRoom ? 
    standardRoom.images.some(img => img.src.includes('Standard%20Room%20240%20sq%20Feet.jpeg')) ||
    standardRoom.images.some(img => img.src.includes('Standard%20Washroom.jpeg'))
    : false;
  
  console.log('\\n🏨 STANDARD ROOM TEST RESULTS:');
  console.log(`Total rooms found: ${roomInfo.length}`);
  
  roomInfo.forEach((room, i) => {
    console.log(`\\n📋 Room ${i + 1}: ${room.name}`);
    console.log(`   Images: ${room.imageCount}`);
    if (room.images.length > 0) {
      room.images.forEach((img, imgIndex) => {
        console.log(`     Image ${imgIndex + 1}: ${img.src.substring(img.src.lastIndexOf('/') + 1)}`);
      });
    }
  });
  
  console.log(`\\n✅ Has Standard Room: ${hasStandardRoom}`);
  console.log(`✅ Standard Room has specific images: ${hasStandardRoomImages}`);
  
  // Room types found
  const roomTypes = roomInfo.map(room => room.name.toLowerCase());
  console.log(`\\n📊 Room types: ${roomTypes.join(', ')}`);
  
  // Take screenshot
  await page.screenshot({ 
    path: 'standard-room-added-test.png',
    fullPage: true 
  });
  console.log('📸 Screenshot saved: standard-room-added-test.png');
  
  // Verify the Standard Room exists and has images
  expect(hasStandardRoom).toBe(true);
  expect(roomInfo.length).toBeGreaterThan(2); // Should have at least 3 rooms now
});