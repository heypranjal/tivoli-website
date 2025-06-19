import { test, expect } from '@playwright/test';

test('homepage loads successfully', async ({ page }) => {
  await page.goto('/');
  
  // Wait for the page to load
  await page.waitForLoadState('networkidle');
  
  // Check if the page title is correct
  await expect(page).toHaveTitle(/Tivoli/);
  
  // Check if navigation is present
  await expect(page.locator('nav')).toBeVisible();
});

test('navigation links are working', async ({ page }) => {
  await page.goto('/');
  
  // Wait for the page to load
  await page.waitForLoadState('networkidle');
  
  // Test if main navigation elements are present and clickable
  const navLinks = page.locator('nav a');
  const count = await navLinks.count();
  
  expect(count).toBeGreaterThan(0);
  
  // Check first navigation link is clickable
  if (count > 0) {
    await expect(navLinks.first()).toBeVisible();
  }
});

test('booking widget is present', async ({ page }) => {
  await page.goto('/');
  
  // Wait for the page to load
  await page.waitForLoadState('networkidle');
  
  // Look for booking-related elements
  const bookingElements = page.locator('[data-testid*="booking"], .booking, [class*="booking"]');
  const hasBookingElement = await bookingElements.count() > 0;
  
  // If no booking elements found, check for date picker or hotel selection
  if (!hasBookingElement) {
    const dateElements = page.locator('input[type="date"], [class*="date"], [class*="calendar"]');
    const hotelElements = page.locator('[class*="hotel"], [class*="venue"]');
    
    const hasDateElement = await dateElements.count() > 0;
    const hasHotelElement = await hotelElements.count() > 0;
    
    expect(hasDateElement || hasHotelElement).toBeTruthy();
  } else {
    expect(hasBookingElement).toBeTruthy();
  }
});