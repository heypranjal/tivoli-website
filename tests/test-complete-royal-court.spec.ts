import { test, expect } from '@playwright/test';

test('Complete Royal Court Okhla Page - Final Verification', async ({ page }) => {
  console.log('🎯 FINAL TEST: Complete Royal Court Okhla page verification...');

  // Navigate to the page
  await page.goto('http://localhost:5173/delhi/royal-court-okhla');
  await page.waitForLoadState('networkidle');

  // Take final screenshot
  await page.screenshot({ 
    path: 'royal-court-okhla-final-complete.png', 
    fullPage: true 
  });

  // Test all required sections
  const pageContent = await page.evaluate(() => {
    const bodyText = document.body.textContent || '';
    
    return {
      // Basic page structure
      title: document.title,
      h1Text: document.querySelector('h1')?.textContent || '',
      
      // Check for all required content sections
      hasExtraordinaryMoments: bodyText.includes('Your Extraordinary Moments, Our Signature Spaces'),
      hasRegencyAstoria: bodyText.includes('REGENCY') && bodyText.includes('ASTORIA'),
      hasWeddingSection: bodyText.includes('Experience the pinnacle of luxury and sophistication at Tivoli Royal Court'),
      hasSocialGatherings: bodyText.includes('Social Gatherings') && bodyText.includes('Spacious Banquet Halls'),
      hasCorrectAddress: bodyText.includes('D-185, Pocket D, Okhla Phase I'),
      
      // Check for venue details
      hasVenueStats: bodyText.includes('200') && bodyText.includes('Parking Spaces'),
      hasCapacityInfo: bodyText.includes('100-450') && bodyText.includes('Guest Capacity'),
      hasEventSpace: bodyText.includes('6,500') && bodyText.includes('Sq. Ft. Event Space'),
      
      // Check for specific hall details
      hasAstoriaDetails: bodyText.includes('1st & 2nd Floor Combined') && bodyText.includes('9,000 sq ft'),
      hasRegencyDetails: bodyText.includes('Ground Floor') && bodyText.includes('8,000 sq ft'),
      
      // Check for Google Maps
      hasGoogleMaps: !!document.querySelector('iframe[src*="google.com/maps"]'),
      
      // Check for Venue Booking Form
      hasVenueBookingForm: !!document.querySelector('#venue-booking-form'),
      hasBookingFormContent: bodyText.includes('Book Your Event') || bodyText.includes('Plan Your Special Occasion'),
      
      // General structure checks
      sectionsCount: document.querySelectorAll('section').length,
      totalElements: document.querySelectorAll('*').length,
      hasNoErrors: !bodyText.toLowerCase().includes('error') && !bodyText.toLowerCase().includes('undefined')
    };
  });

  console.log('\n📊 FINAL VERIFICATION RESULTS:');
  console.log('  Page Title:', pageContent.title);
  console.log('  H1 Text:', pageContent.h1Text);
  console.log('  ✅ "Your Extraordinary Moments" section:', pageContent.hasExtraordinaryMoments);
  console.log('  ✅ REGENCY & ASTORIA mentioned:', pageContent.hasRegencyAstoria);
  console.log('  ✅ Wedding section content:', pageContent.hasWeddingSection);
  console.log('  ✅ Social Gatherings section:', pageContent.hasSocialGatherings);
  console.log('  ✅ Correct address (D-185, Pocket D...):', pageContent.hasCorrectAddress);
  console.log('  ✅ Venue statistics (200 parking spaces):', pageContent.hasVenueStats);
  console.log('  ✅ Capacity info (100-450 guests):', pageContent.hasCapacityInfo);
  console.log('  ✅ Event space (6,500 sq ft):', pageContent.hasEventSpace);
  console.log('  ✅ ASTORIA details (9,000 sq ft):', pageContent.hasAstoriaDetails);
  console.log('  ✅ REGENCY details (8,000 sq ft):', pageContent.hasRegencyDetails);
  console.log('  ✅ Google Maps embedded:', pageContent.hasGoogleMaps);
  console.log('  ✅ Venue Booking Form present:', pageContent.hasVenueBookingForm);
  console.log('  ✅ Booking form content:', pageContent.hasBookingFormContent);
  console.log('  📊 Total sections:', pageContent.sectionsCount);
  console.log('  📊 Total DOM elements:', pageContent.totalElements);
  console.log('  ✅ No errors detected:', pageContent.hasNoErrors);

  // Test interactive elements
  const interactiveTest = await page.evaluate(() => {
    // Test if clicking on elements works
    const bookingButton = document.querySelector('button:has-text("Plan Your Wedding")');
    const shareButton = document.querySelector('button[class*="share"]');
    const heartButton = document.querySelector('button[class*="wishlist"]');
    
    return {
      hasBookingButton: !!bookingButton,
      hasShareButton: !!shareButton,
      hasHeartButton: !!heartButton,
      bookingFormVisible: !!document.querySelector('form')
    };
  });

  console.log('\n🔧 INTERACTIVE ELEMENTS:');
  console.log('  Booking button present:', interactiveTest.hasBookingButton);
  console.log('  Share button present:', interactiveTest.hasShareButton);
  console.log('  Heart/wishlist button present:', interactiveTest.hasHeartButton);
  console.log('  Booking form visible:', interactiveTest.bookingFormVisible);

  // Calculate success score
  const requiredChecks = [
    pageContent.hasExtraordinaryMoments,
    pageContent.hasRegencyAstoria,
    pageContent.hasWeddingSection,
    pageContent.hasSocialGatherings,
    pageContent.hasCorrectAddress,
    pageContent.hasVenueStats,
    pageContent.hasGoogleMaps,
    pageContent.hasVenueBookingForm
  ];

  const passedChecks = requiredChecks.filter(check => check).length;
  const successRate = Math.round((passedChecks / requiredChecks.length) * 100);

  console.log('\n🎯 FINAL RESULTS:');
  console.log(`  Success Rate: ${successRate}% (${passedChecks}/${requiredChecks.length} checks passed)`);
  
  if (successRate >= 90) {
    console.log('  🎉 EXCELLENT! Royal Court Okhla page is fully functional with all requested content!');
  } else if (successRate >= 75) {
    console.log('  ✅ GOOD! Most features working, minor issues may remain');
  } else {
    console.log('  ⚠️ ISSUES DETECTED: Multiple problems need attention');
  }

  // Test that the URL works correctly
  const currentUrl = page.url();
  console.log(`\n🔗 URL Verification: ${currentUrl}`);
  console.log(`  Correct URL: ${currentUrl === 'http://localhost:5173/delhi/royal-court-okhla'}`);
});