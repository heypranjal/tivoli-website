import { test, expect } from '@playwright/test';

test('Test Supabase image accessibility', async ({ page, request }) => {
  const imageUrls = [
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/hsesultanpur/banner/Screenshot%202025-07-25%20144720.jpg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/hsesultanpur/banner/Screenshot%202025-07-25%20144527.jpg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/hsesultanpur/banner/Screenshot%202025-07-25%20144817.jpg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/hsesultanpur/banner/Screenshot%202025-07-25%20144846.jpg',
    'https://sivirxabbuldqkckjwmu.supabase.co/storage/v1/object/public/hsesultanpur/banner/Screenshot%202025-07-25%20144409.jpg'
  ];

  for (let i = 0; i < imageUrls.length; i++) {
    const url = imageUrls[i];
    console.log(`Testing image ${i + 1}: ${url}`);
    
    try {
      const response = await request.get(url);
      console.log(`Image ${i + 1} status: ${response.status()}`);
      console.log(`Image ${i + 1} headers:`, response.headers());
      
      if (response.status() !== 200) {
        console.log(`Image ${i + 1} failed to load with status ${response.status()}`);
      } else {
        console.log(`Image ${i + 1} loaded successfully`);
      }
    } catch (error) {
      console.log(`Image ${i + 1} error:`, error);
    }
  }

  // Also test by navigating to the page and checking if images load
  await page.goto('http://localhost:5173/hotel/upper-hse-sultanpur');
  
  // Listen for network responses
  const imageResponses: any[] = [];
  page.on('response', (response) => {
    if (response.url().includes('hsesultanpur')) {
      imageResponses.push({
        url: response.url(),
        status: response.status(),
        statusText: response.statusText()
      });
    }
  });

  await page.waitForLoadState('networkidle');
  
  console.log('Image responses during page load:');
  imageResponses.forEach((resp, index) => {
    console.log(`${index + 1}. ${resp.url} - Status: ${resp.status} (${resp.statusText})`);
  });

  // Take a screenshot
  await page.screenshot({ path: 'image-test-result.png', fullPage: true });
});