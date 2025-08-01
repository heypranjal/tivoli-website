import { test, expect } from '@playwright/test';

test('investigate Royal Palace room data source', async ({ page }) => {
  console.log('🏨 Investigating Royal Palace room data and images...');
  
  // Navigate to Royal Palace page
  await page.goto('http://localhost:5174/hotel/tivoli-royal-suite', { waitUntil: 'domcontentloaded' });
  
  // Wait for content to load
  await page.waitForTimeout(5000);
  
  // Check if accommodations section exists
  const hasAccommodations = await page.locator('text=Accommodations').count() > 0;
  console.log(`🏨 Has Accommodations section: ${hasAccommodations}`);
  
  // Look for Deluxe Room specifically
  const hasDeluxeRoom = await page.locator('text=Deluxe Room').count() > 0;
  console.log(`🛏️ Has Deluxe Room: ${hasDeluxeRoom}`);
  
  // Check if there are any room images loading
  const roomImages = await page.locator('img[alt*="Deluxe"]').count();
  console.log(`🖼️ Deluxe room images found: ${roomImages}`);
  
  // Get all images in the accommodations section
  const allRoomImages = await page.locator('[data-testid="room-image"], img[alt*="Room"]').count();
  console.log(`🖼️ Total room images: ${allRoomImages}`);
  
  // Check console for any room data loading errors
  const logs = [];
  page.on('console', msg => {
    if (msg.text().includes('room') || msg.text().includes('image') || msg.text().includes('media')) {
      logs.push(msg.text());
    }
  });
  
  // Take screenshot for analysis
  await page.screenshot({ 
    path: 'royal-palace-rooms-investigation.png',
    fullPage: true 
  });
  
  console.log('\n📋 ROOM DATA INVESTIGATION:');
  console.log(`✅ Accommodations section: ${hasAccommodations}`);
  console.log(`✅ Deluxe Room found: ${hasDeluxeRoom}`);
  console.log(`✅ Room images count: ${allRoomImages}`);
  console.log('📸 Screenshot saved: royal-palace-rooms-investigation.png');
  
  // Log any relevant console messages
  if (logs.length > 0) {
    console.log('\n🔍 Relevant console messages:');
    logs.forEach(log => console.log(`   ${log}`));
  }
});