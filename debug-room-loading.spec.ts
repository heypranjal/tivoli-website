import { test, expect } from '@playwright/test';

test('debug room loading errors and database calls', async ({ page }) => {
  console.log('🔍 Debugging room loading and database calls...');
  
  // Capture all console messages
  const logs = [];
  page.on('console', msg => {
    logs.push({
      type: msg.type(),
      text: msg.text(),
      timestamp: new Date().toISOString()
    });
  });
  
  // Capture network requests to Supabase
  const networkRequests = [];
  page.on('request', request => {
    if (request.url().includes('supabase') && request.url().includes('room')) {
      networkRequests.push({
        url: request.url(),
        method: request.method(),
        timestamp: new Date().toISOString()
      });
    }
  });
  
  // Capture network responses
  const networkResponses = [];
  page.on('response', response => {
    if (response.url().includes('supabase') && response.url().includes('room')) {
      networkResponses.push({
        url: response.url(),
        status: response.status(),
        statusText: response.statusText(),
        timestamp: new Date().toISOString()
      });
    }
  });
  
  // Navigate to Royal Palace page
  await page.goto('http://localhost:5174/hotel/tivoli-royal-suite', { waitUntil: 'domcontentloaded' });
  
  // Wait longer for all API calls to complete
  await page.waitForTimeout(8000);
  
  // Check if the accommodations section shows loading or error state
  const accommodationsHTML = await page.locator('text=Accommodations').locator('..').innerHTML();
  const hasLoadingState = accommodationsHTML.includes('Loading') || accommodationsHTML.includes('loading');
  const hasErrorState = accommodationsHTML.includes('error') || accommodationsHTML.includes('Failed');
  const hasNoRoomMessage = accommodationsHTML.includes('No room information available');
  
  console.log('\\n🔍 ROOM LOADING DEBUG:');
  console.log(`Loading state present: ${hasLoadingState}`);
  console.log(`Error state present: ${hasErrorState}`);
  console.log(`No room information message: ${hasNoRoomMessage}`);
  
  // Log all Supabase network requests
  console.log('\\n🌐 SUPABASE NETWORK REQUESTS:');
  if (networkRequests.length > 0) {
    networkRequests.forEach((req, i) => {
      console.log(`   ${i + 1}. ${req.method} ${req.url}`);
    });
  } else {
    console.log('   No Supabase room-related requests found');
  }
  
  console.log('\\n🌐 SUPABASE NETWORK RESPONSES:');
  if (networkResponses.length > 0) {
    networkResponses.forEach((res, i) => {
      console.log(`   ${i + 1}. ${res.status} ${res.statusText} - ${res.url}`);
    });
  } else {
    console.log('   No Supabase room-related responses found');
  }
  
  // Filter and show relevant console logs
  console.log('\\n📋 RELEVANT CONSOLE LOGS:');
  const relevantLogs = logs.filter(log => 
    log.text.toLowerCase().includes('room') || 
    log.text.toLowerCase().includes('hotel') ||
    log.text.toLowerCase().includes('error') ||
    log.text.toLowerCase().includes('fail') ||
    log.text.toLowerCase().includes('supabase') ||
    log.text.toLowerCase().includes('fd50d2a7')
  );
  
  if (relevantLogs.length > 0) {
    relevantLogs.forEach((log, i) => {
      console.log(`   ${i + 1}. [${log.type}] ${log.text}`);
    });
  } else {
    console.log('   No relevant console logs found');
  }
  
  // Check the exact hotel ID being used
  const hotelIdInfo = await page.evaluate(() => {
    // Try to find any reference to the hotel ID in the DOM or window
    const scripts = Array.from(document.querySelectorAll('script'));
    const hotelIdMatches = [];
    
    scripts.forEach(script => {
      if (script.textContent && script.textContent.includes('fd50d2a7')) {
        hotelIdMatches.push(script.textContent.substring(0, 200) + '...');
      }
    });
    
    return {
      url: window.location.pathname,
      hotelIdReferences: hotelIdMatches
    };
  });
  
  console.log('\\n🏨 HOTEL ID VERIFICATION:');
  console.log(`Current URL: ${hotelIdInfo.url}`);
  console.log(`Hotel ID references found: ${hotelIdInfo.hotelIdReferences.length}`);
  if (hotelIdInfo.hotelIdReferences.length > 0) {
    hotelIdInfo.hotelIdReferences.forEach((ref, i) => {
      console.log(`   ${i + 1}. ${ref}`);
    });
  }
  
  console.log('\\n📋 DEBUGGING COMPLETE');
});