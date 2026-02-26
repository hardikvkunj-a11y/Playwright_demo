// @ts-check
// import { test, expect } from '@playwright/test';

// test('TSS Sales – header, manufacturers, machinery, search', async ({ browser }) => {
//   const url = 
//   'https://dev83.octosglobal.info/tss_2025/';
//   // 'https://stg83.octosglobal.info/tss_2025/';
//   //'https://tss-sales.com/';

import { test, expect } from '@playwright/test';

const BASE_URL =
  // 'https://dev83.octosglobal.info/tss_2025/';
  'https://stg83.octosglobal.info/tss_2025/';
//'https://tss-sales.com/';


test.describe('TSS Sales Website - End to End Automation', () => {

  // test.beforeEach(async ({ page }) => {
  //   await page.goto(BASE_URL);
  // });
  /*
    // 1️⃣ Homepage Load Test
    console.log('***1*** TSS Sales - Homepage load test start ===');
    test('Verify homepage loads successfully', async ({ page }) => {
      await expect(page).toHaveURL(BASE_URL);
      await expect(page).toHaveTitle(/TSS/i);
      await expect(page.locator('header')).toBeVisible();
      await page.screenshot({ path: 'screenshots/homepage.png' });
      console.log('***1*** TSS Sales - Homepage load test end ===');
    });
  
    // 2️⃣ Navigation Menu Test
    console.log('2 Navigation Menu Test start ===');
    test('Verify main navigation links are visible', async ({ page }) => {
      await expect(page.getByRole('link', { name: /Manufacturers/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /Machinery/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /Shop Now/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /Contact/i })).toBeVisible();
      console.log('2️⃣ Navigation Menu Test End ===');
    });
  */
  // 3️⃣ Manufacturers Page Test
  /*
  test('Navigate to Manufacturers and validate content', async ({ page }) => {
    console.log('3 Manufacturers page Test start ===');
  
    await page.getByRole('link', { name: 'Manufacturers' }).click();
    await page.getByRole('link', { name: 'BVC' }).click();
  
    // Scroll if needed
    await page.mouse.wheel(0, 1000);
    await page.mouse.wheel(0, 2000);
  
    // Prefer a single, visible element
    const videoButton = page.locator('.video-btn').first();
    await expect(videoButton).toBeVisible();
    await videoButton.click();
  
    await page.getByRole('button', { name: 'Close' }).click();
  
    console.log('3 Manufacturers page Test End ===');
  });
*/
  // 4️⃣ Request a Quote Button Test
  /* 
   test('Verify Request a Quote navigation works', async ({ page }) => {
     console.log('4 Request a Quote Button Test start ===');
     const quoteButton = page.getByRole('link', { name: /Request a Quote/i }).first();
     await quoteButton.click();
 
     await expect(page).toHaveURL(/contact|quote/i);
     console.log('4 Request a Quote Button Test end ===');
   });
 */
  // 5️⃣ Contact Form - Positive Test

  test('Submit Contact Form with valid data', async ({ page }) => {
    console.log('5 Contact Form - Positive Test start ===');
    // await page.goto(BASE_URL + 'contactus');
    await page.goto('/tss_2025/contactus');
    // await page.getByRole('link', { name: 'search-icon Request a Quote' }).click();

    // Scroll if needed
    await page.mouse.wheel(0, 750);

    const firstNameInput = page.getByLabel(/First Name/i);
    await expect(firstNameInput).toBeVisible();
    await firstNameInput.fill('John');

    const lastNameInput = page.getByPlaceholder('Last Name');
    await expect(lastNameInput).toBeVisible();
    // await page.waitForTimeout(2000);
    await lastNameInput.fill('Parker');
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill('jems@mailinator.com');
    await page.getByPlaceholder('Phone Number').fill('965-811-2345');
    await page.getByPlaceholder('Company Name').fill('Parts pvt limited');
    // await page.waitForTimeout(2000);
    await page.getByPlaceholder('Description').click();
    await page.getByPlaceholder('Description').fill('This is demo contact us');
    await page.waitForTimeout(2000);
    await page.getByLabel('Type of Product *').selectOption('Tooling & Supplies');
    await page.getByRole('button', { name: 'Submit' }).click();
    // await expect(page.locator('text=Thank')).toBeVisible({ timeout: 10000 });
    console.log('5 Contact Form - Positive Test end ===');
  });
  
    // 6️⃣ Contact Form - Negative Test
    
    test('Submit Contact Form with invalid email', async ({ page }) => {
      // await page.goto(BASE_URL + 'contactus');
      await page.goto('/tss_2025/contactus');
console.log('6 Contact Form - Negative Test start ===');

      await page.fill('input[type="email"]', 'invalidemail');
      await page.locator('button[type="submit"]').click();
  
      const emailField = page.locator('input[type="email"]');
      await expect(emailField).toHaveJSProperty('validationMessage', 'Please enter an email address.');
      console.log('6 Contact Form - Negative Test End ===');
    });
 /* 
    // 7️⃣ Footer Links Validation
    console.log('7 Footer Links Validation Test start ===');
    test('Verify footer links are clickable', async ({ page }) => {
      const footer = page.locator('footer');
      await expect(footer).toBeVisible();
  
      const footerLinks = footer.locator('a');
      const count = await footerLinks.count();
  
      for (let i = 0; i < count; i++) {
        const link = footerLinks.nth(i);
        const href = await link.getAttribute('href');
        if (href && !href.includes('#')) {
          await expect(link).toBeVisible();
        }
      }
      console.log('7 Footer Links Validation Test End ===');
    });
    */

});
