import { test, expect } from '@playwright/test';

test('Debug Hotel Data Structure - Find Royal Court Okhla', async ({ page }) => {
  console.log('🔍 DEBUGGING: Hotel data structure investigation...');

  // Navigate to any page to access the hotels data
  await page.goto('http://localhost:5173/');
  await page.waitForLoadState('networkidle');

  // Execute JavaScript to inspect hotels data
  const hotelDataInspection = await page.evaluate(() => {
    // Access the hotels data (assuming it's imported in the global scope or available)
    // We'll try to access it through window or by navigating to a page that uses it
    
    // First, let's see if we can find it in the page's modules
    const scripts = Array.from(document.querySelectorAll('script[type="module"]'));
    
    return {
      scriptsFound: scripts.length,
      availableProperties: Object.keys(window).filter(key => 
        key.toLowerCase().includes('hotel') || 
        key.toLowerCase().includes('data') ||
        key.toLowerCase().includes('tivoli')
      )
    };
  });

  console.log('📊 Initial page inspection:', hotelDataInspection);

  // Try to access hotel data by navigating to different hotel pages and checking what loads
  const testUrls = [
    'http://localhost:5173/delhi/tivoli-bijwasan',
    'http://localhost:5173/delhi/tivoli-grand-palace',
    'http://localhost:5173/delhi/royal-court-okhla'
  ];

  for (const url of testUrls) {
    console.log(`\n🔍 Testing URL: ${url}`);
    
    try {
      await page.goto(url);
      await page.waitForLoadState('networkidle');
      
      const pageInfo = await page.evaluate(() => {
        return {
          url: window.location.href,
          title: document.title,
          h1Text: document.querySelector('h1')?.textContent || 'No h1',
          hasHotelContent: !!document.querySelector('[class*="hotel"], [class*="venue"]'),
          bodyClasses: document.body.className,
          mainContent: document.querySelector('main')?.textContent?.substring(0, 200) || 'No main content'
        };
      });
      
      console.log('  📄 Page info:', pageInfo);
      
      // Check if we can extract hotel data from this page
      if (url.includes('bijwasan') || url.includes('grand-palace')) {
        const hotelDataFromWorkingPage = await page.evaluate(() => {
          // Try to access React component state or props
          const reactElements = document.querySelectorAll('[data-reactroot]');
          
          // Look for any elements that might contain hotel slug or data
          const hotelElements = document.querySelectorAll('[class*="hotel"], [class*="venue"], [data-hotel]');
          
          return {
            reactElements: reactElements.length,
            hotelElements: hotelElements.length,
            // Try to find hotel-related text in the page
            hotelTexts: Array.from(document.querySelectorAll('*')).map(el => el.textContent)
              .filter(text => text && (
                text.toLowerCase().includes('royal court') ||
                text.toLowerCase().includes('okhla') ||
                text.toLowerCase().includes('bijwasan') ||
                text.toLowerCase().includes('grand palace')
              )).slice(0, 5)
          };
        });
        
        console.log('  🏨 Hotel data from working page:', hotelDataFromWorkingPage);
      }
      
    } catch (error) {
      console.log(`  ❌ Error loading ${url}:`, error.message);
    }
  }

  // Now let's check the source files directly using a different approach
  console.log('\n📁 Checking hotels data files...');
  
  // Navigate to a page and try to load the hotels data module
  await page.goto('http://localhost:5173/');
  
  const moduleInspection = await page.evaluate(async () => {
    try {
      // Try to dynamically import the hotels data
      const hotelsModule = await import('/src/data/hotels.ts');
      const hotels = hotelsModule.hotels || hotelsModule.default || [];
      
      return {
        success: true,
        totalHotels: hotels.length,
        hotelSlugs: hotels.map((hotel: any) => hotel.slug || hotel.id || 'no-slug'),
        okhlaHotels: hotels.filter((hotel: any) => 
          (hotel.name && hotel.name.toLowerCase().includes('royal court')) ||
          (hotel.name && hotel.name.toLowerCase().includes('okhla')) ||
          (hotel.slug && hotel.slug.includes('okhla')) ||
          (hotel.slug && hotel.slug.includes('royal'))
        ).map((hotel: any) => ({
          name: hotel.name,
          slug: hotel.slug || hotel.id,
          location: hotel.location,
          address: hotel.address
        }))
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  });

  console.log('📋 Module inspection results:', moduleInspection);

  // If we found hotels data, let's analyze it further
  if (moduleInspection.success) {
    console.log('\n🎯 ANALYSIS RESULTS:');
    console.log(`  Total hotels in data: ${moduleInspection.totalHotels}`);
    console.log(`  All hotel slugs: ${moduleInspection.hotelSlugs.join(', ')}`);
    
    if (moduleInspection.okhlaHotels.length > 0) {
      console.log(`  ✅ Found ${moduleInspection.okhlaHotels.length} Royal Court/Okhla related hotels:`);
      moduleInspection.okhlaHotels.forEach((hotel: any, index: number) => {
        console.log(`    ${index + 1}. Name: ${hotel.name}, Slug: ${hotel.slug}, Location: ${hotel.location}`);
      });
    } else {
      console.log('  ❌ No Royal Court or Okhla hotels found in data');
    }
    
    // Check if there's a slug mismatch
    const expectedSlug = 'royal-court-okhla';
    const hasExpectedSlug = moduleInspection.hotelSlugs.includes(expectedSlug);
    console.log(`  Expected slug '${expectedSlug}' exists: ${hasExpectedSlug ? 'YES' : 'NO'}`);
    
    if (!hasExpectedSlug) {
      // Look for similar slugs
      const similarSlugs = moduleInspection.hotelSlugs.filter((slug: string) => 
        slug.includes('royal') || slug.includes('court') || slug.includes('okhla')
      );
      console.log(`  Similar slugs found: ${similarSlugs.join(', ') || 'None'}`);
    }
  }

  // Take a screenshot of the current page for reference
  await page.screenshot({ 
    path: 'debug-hotel-data-inspection.png', 
    fullPage: true 
  });
  console.log('📸 Screenshot saved: debug-hotel-data-inspection.png');
});