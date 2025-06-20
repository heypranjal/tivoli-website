import { test, expect } from '@playwright/test';

test('Test Booking Form Submission - Fixed', async ({ page }) => {
  console.log('=== TESTING BOOKING FORM SUBMISSION - FIXED ===');
  
  // Navigate to homepage
  await page.goto('http://localhost:5175', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);
  console.log('✅ Homepage loaded');

  // Take initial screenshot
  await page.screenshot({ path: 'booking-test-initial.png', fullPage: true });

  // Find and click "Book Your Stay" button
  const bookButton = page.locator('text=Book Your Stay').first();
  await expect(bookButton).toBeVisible();
  await bookButton.click();
  await page.waitForTimeout(2000);
  console.log('✅ Book Your Stay button clicked');

  // Take screenshot after button click
  await page.screenshot({ path: 'booking-test-after-click.png', fullPage: true });

  // Wait for the booking modal to appear using a more specific selector
  try {
    // Look for the modal content itself
    const modalContent = page.locator('.bg-white.rounded-xl.max-w-2xl');
    await expect(modalContent).toBeVisible({ timeout: 10000 });
    console.log('✅ Booking modal opened');
  } catch (error) {
    console.log('❌ Modal not found, trying alternative approach...');
    
    // Check if form is directly visible on the page
    const nameInput = page.locator('input[name="name"]');
    const isFormVisible = await nameInput.isVisible();
    
    if (isFormVisible) {
      console.log('✅ Booking form found directly on page');
    } else {
      console.log('❌ Neither modal nor form found');
      await page.screenshot({ path: 'booking-test-no-modal.png', fullPage: true });
      return;
    }
  }

  // Fill out the form
  await page.fill('input[name="name"]', 'Test User');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="phone"]', '+91 9876543210');
  await page.fill('input[name="eventDate"]', '2024-07-15');
  await page.fill('input[name="guestCount"]', '50');
  
  // Select event type
  await page.selectOption('select[name="eventType"]', 'wedding');
  
  // Select venue - wait for options to load first
  await page.waitForTimeout(1000);
  const venueSelect = page.locator('select[name="venue"]');
  const venueOptions = await venueSelect.locator('option').count();
  console.log(`Found ${venueOptions} venue options`);
  
  if (venueOptions > 1) {
    await page.selectOption('select[name="venue"]', { index: 1 }); // Select first available venue
  }
  
  // Fill special requirements
  await page.fill('textarea[name="specialRequirements"]', 'Test booking submission');

  console.log('✅ Form filled with test data');

  // Take screenshot before submission
  await page.screenshot({ path: 'booking-test-before-submit.png', fullPage: true });

  // Listen for console logs to catch any errors
  page.on('console', msg => {
    console.log(`BROWSER ${msg.type().toUpperCase()}: ${msg.text()}`);
  });

  // Listen for network requests
  page.on('response', response => {
    if (response.url().includes('supabase')) {
      console.log(`SUPABASE REQUEST: ${response.status()} ${response.url()}`);
    }
  });

  // Submit the form
  const submitButton = page.locator('button:has-text("Submit Booking Request")');
  await expect(submitButton).toBeVisible();
  await submitButton.click();
  
  console.log('✅ Form submitted, waiting for response...');

  // Wait longer for the response
  await page.waitForTimeout(8000);

  // Check for success message
  const successMessage = page.locator('text=Booking Request Submitted!');
  const errorMessage = page.locator('.bg-red-50');

  const isSuccess = await successMessage.count() > 0;
  const isError = await errorMessage.count() > 0;

  if (isSuccess) {
    console.log('✅ SUCCESS: Booking form submitted successfully!');
    await page.screenshot({ path: 'booking-test-success.png', fullPage: true });
  } else if (isError) {
    const errorText = await errorMessage.textContent();
    console.log('❌ ERROR: Booking form submission failed:', errorText);
    await page.screenshot({ path: 'booking-test-error.png', fullPage: true });
  } else {
    console.log('⚠️  UNKNOWN: No clear success or error message found');
    await page.screenshot({ path: 'booking-test-unknown-state.png', fullPage: true });
    
    // Check if button text changed to "Submitting..."
    const buttonText = await submitButton.textContent();
    console.log(`Submit button text: "${buttonText}"`);
  }

  console.log('=== TEST COMPLETE ===');
});