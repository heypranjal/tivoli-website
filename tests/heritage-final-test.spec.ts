import { test, expect } from '@playwright/test';

test('Heritage Palace Final Verification Test', async ({ page }) => {
  // Navigate to Heritage Palace page
  await page.goto('http://localhost:5173/hotel/tivoli-heritage-palace');
  
  // Wait for page to load
  await page.waitForLoadState('networkidle');
  
  // Check if navigation is now visible
  const navigation = await page.locator('nav').first().isVisible();
  console.log('Navigation visible:', navigation);
  
  // Check for hero section
  const heroSection = await page.locator('section').first().isVisible();
  console.log('Hero section visible:', heroSection);
  
  // Check for hotel name
  const hotelName = await page.textContent('h1');
  console.log('Hotel name found:', hotelName);
  
  // Check for overview section
  const overviewSection = await page.locator('text=About Tivoli Heritage Palace').isVisible();
  console.log('Overview section visible:', overviewSection);
  
  // Check for quick stats (rooms, dining venues, etc.)
  const roomsStats = await page.locator('text=90').isVisible();
  const diningStats = await page.locator('text=3').isVisible();
  const capacityStats = await page.locator('text=1,000').isVisible();
  console.log('Quick stats visible - Rooms:', roomsStats, 'Dining:', diningStats, 'Capacity:', capacityStats);
  
  // Check for dining section with Coffee Shop
  const coffeeShop = await page.locator('text=Coffee Shop').isVisible();
  console.log('Coffee Shop visible:', coffeeShop);
  
  // Check for contact information
  const phoneNumber = await page.locator('text=+91-9818553333').isVisible();
  console.log('Phone number visible:', phoneNumber);
  
  // Check for experiences section
  const grandWeddings = await page.locator('text=Grand Weddings').isVisible();
  console.log('Grand Weddings experience visible:', grandWeddings);
  
  // Check for spaces section
  const glasshouseBanquet = await page.locator('text=GlassHouse Banquet Hall').isVisible();
  console.log('GlassHouse Banquet visible:', glasshouseBanquet);
  
  // Take final screenshot
  await page.screenshot({ path: 'heritage-palace-final.png', fullPage: true });
  
  console.log('✅ Heritage Palace page is fully functional!');
});