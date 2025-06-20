import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  // Listen for all network events
  page.on('request', request => {
    if (request.url().includes('swimming%20pool2rewari.jpg')) {
      console.log(`REQUEST: ${request.url()}`);
    }
  });
  
  page.on('response', response => {
    if (response.url().includes('swimming%20pool2rewari.jpg')) {
      console.log(`RESPONSE: ${response.url()} - Status: ${response.status()}`);
    }
  });
  
  page.on('requestfailed', request => {
    if (request.url().includes('swimming%20pool2rewari.jpg')) {
      console.log(`FAILED REQUEST: ${request.url()} - ${request.failure()?.errorText}`);
    }
  });
  
  console.log('Navigating to the page...');
  await page.goto('http://localhost:5173/rewari-haryana/tivoli-heritage-palace');
  
  // Wait for the page to load
  await page.waitForTimeout(5000);
  
  // Get specific details about the 4th image
  const fourthImageDetails = await page.evaluate(() => {
    const images = document.querySelectorAll('.grid.grid-cols-1.md\\:grid-cols-2 .lg\\:grid-cols-3 .gap-8 img');
    const fourthImg = images[3]; // 0-indexed, so 3 is the 4th image
    
    if (fourthImg) {
      return {
        src: fourthImg.src,
        alt: fourthImg.alt,
        complete: fourthImg.complete,
        naturalWidth: fourthImg.naturalWidth,
        naturalHeight: fourthImg.naturalHeight,
        hasError: fourthImg.complete && fourthImg.naturalWidth === 0,
        computed: window.getComputedStyle(fourthImg),
        visible: fourthImg.offsetWidth > 0 && fourthImg.offsetHeight > 0,
        parentElement: fourthImg.parentElement.className,
        actualDisplayed: fourthImg.style.display !== 'none'
      };
    }
    return null;
  });
  
  console.log('Fourth image details:', fourthImageDetails);
  
  // Try to find all images with the swimming pool URL
  const swimPoolImages = await page.$$eval('img', imgs => 
    imgs.filter(img => img.src.includes('swimming%20pool2rewari.jpg'))
        .map(img => ({
          src: img.src,
          alt: img.alt,
          complete: img.complete,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          hasError: img.complete && img.naturalWidth === 0,
          visible: img.offsetWidth > 0 && img.offsetHeight > 0
        }))
  );
  
  console.log('All swimming pool images found:', swimPoolImages);
  
  // Take a screenshot
  await page.screenshot({ path: 'current-state.png', fullPage: true });
  console.log('Screenshot saved as current-state.png');
  
  await browser.close();
})();