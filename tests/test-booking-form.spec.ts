import { test, expect } from '@playwright/test';

test('Test Booking Form Submission', async ({ page }) => {
  console.log('=== TESTING BOOKING FORM SUBMISSION ===');
  
  // Navigate to homepage
  await page.goto('http://localhost:5175', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);
  console.log('✅ Homepage loaded');

  // Click "Book Your Stay" button
  const bookButton = page.locator('text=Book Your Stay');
  await bookButton.click();
  await page.waitForTimeout(1000);
  console.log('✅ Book Your Stay button clicked');

  // Wait for modal to appear
  await page.waitForSelector('.fixed.inset-0.bg-black\\/50', { timeout: 10000 });
  console.log('✅ Booking modal opened');

  // Fill out the form
  await page.fill('input[name="name"]', 'Test User');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="phone"]', '+91 9876543210');
  await page.fill('input[name="eventDate"]', '2024-07-15');
  await page.fill('input[name="guestCount"]', '50');
  
  // Select event type
  await page.selectOption('select[name="eventType"]', 'wedding');
  
  // Select venue
  await page.selectOption('select[name="venue"]', { index: 1 }); // Select first available venue
  
  // Fill special requirements
  await page.fill('textarea[name="specialRequirements"]', 'Test booking submission');

  console.log('✅ Form filled with test data');

  // Take screenshot before submission
  await page.screenshot({ path: 'booking-form-before-submit.png', fullPage: true });

  // Submit the form
  const submitButton = page.locator('button:has-text("Submit Booking Request")');
  await submitButton.click();
  
  console.log('✅ Form submitted');

  // Wait for either success or error response
  await page.waitForTimeout(5000);

  // Check for success message
  const successMessage = page.locator('text=Booking Request Submitted!');
  const errorMessage = page.locator('.bg-red-50');

  const isSuccess = await successMessage.count() > 0;
  const isError = await errorMessage.count() > 0;

  if (isSuccess) {
    console.log('✅ SUCCESS: Booking form submitted successfully!');
    await page.screenshot({ path: 'booking-form-success.png', fullPage: true });
  } else if (isError) {
    const errorText = await errorMessage.textContent();
    console.log('❌ ERROR: Booking form submission failed:', errorText);
    await page.screenshot({ path: 'booking-form-error.png', fullPage: true });
  } else {
    console.log('⚠️  UNKNOWN: No clear success or error message found');
    await page.screenshot({ path: 'booking-form-unknown-state.png', fullPage: true });
  }

  // Also check console logs for any JavaScript errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('JS ERROR:', msg.text());
    }
  });

  console.log('=== TEST COMPLETE ===');
});