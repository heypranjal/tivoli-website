import { test, expect } from '@playwright/test';

test('debug why room-specific images not loading', async ({ page }) => {
  console.log('🔧 Debugging why room-specific images are not loading...');
  
  // Capture console logs to see what's happening
  const logs = [];
  page.on('console', msg => {
    if (msg.text().includes('Falling back') || 
        msg.text().includes('Found hotel') || 
        msg.text().includes('room') ||
        msg.text().includes('image') ||
        msg.text().includes('default')) {
      logs.push(msg.text());
    }
  });
  
  // Navigate to Royal Palace page
  await page.goto('http://localhost:5174/hotel/tivoli-royal-suite', { waitUntil: 'domcontentloaded' });
  
  // Wait for content to load
  await page.waitForTimeout(8000);
  
  // Check what data source is being used
  const dataSourceInfo = await page.evaluate(() => {
    // Check if there are any elements with data attributes or signs of database usage
    const dbIndicators = document.querySelectorAll('[data-hotel-id], [data-room-id]');
    const staticIndicators = document.querySelectorAll('h3');
    
    return {
      url: window.location.pathname,
      dbIndicators: dbIndicators.length,
      roomTitles: Array.from(staticIndicators).map(el => el.textContent).filter(text => 
        text && (text.includes('Room') || text.includes('Suite'))
      ),
      totalImages: document.querySelectorAll('img').length,
      supabaseImages: document.querySelectorAll('img[src*="supabase"]').length
    };
  });
  
  console.log('\\n🔧 DATA SOURCE DEBUG:');
  console.log(`URL: ${dataSourceInfo.url}`);
  console.log(`DB indicators: ${dataSourceInfo.dbIndicators}`);
  console.log(`Room titles: ${dataSourceInfo.roomTitles.join(', ')}`);
  console.log(`Total images: ${dataSourceInfo.totalImages}`);
  console.log(`Supabase images: ${dataSourceInfo.supabaseImages}`);
  
  // Show relevant console logs
  console.log('\\n📋 RELEVANT CONSOLE LOGS:');
  if (logs.length > 0) {
    logs.forEach((log, i) => {
      console.log(`   ${i + 1}. ${log}`);
    });
  } else {
    console.log('   No relevant logs found');
  }
  
  // Check what specific images are being loaded
  const imageInfo = await page.evaluate(() => {
    const images = Array.from(document.querySelectorAll('img'));
    return images.map(img => ({
      src: img.src,
      alt: img.alt,
      isRoomImage: img.alt && (img.alt.includes('Room') || img.alt.includes('Suite')),
      isSupabase: img.src.includes('supabase')
    })).filter(img => img.isSupabase);
  });
  
  console.log('\\n🖼️ IMAGE ANALYSIS:');
  if (imageInfo.length > 0) {
    imageInfo.forEach((img, i) => {
      const filename = img.src.split('/').pop()?.split('?')[0];
      console.log(`   ${i + 1}. ${filename} (${img.alt}) - Room: ${img.isRoomImage}`);
    });
  } else {
    console.log('   No Supabase images found');
  }
  
  console.log('\\n🎯 The issue seems to be that room-specific images are not being used from the static data');
});