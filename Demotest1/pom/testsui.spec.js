// @ts-check
import { test } from '@playwright/test';
import { ContactUsPage } from './contactUs.page.js';

test.describe('TSS Sales Website - Contact Us (POM)', () => {
  // 5️⃣ Contact Form - Positive Test
  test('Submit Contact Form with valid data', async ({ page }) => {
    console.log('5 Contact Form - Positive Test start ===');

    const contactUsPage = new ContactUsPage(page);
    await contactUsPage.goto();

    await page.mouse.wheel(0, 750);

    await contactUsPage.fillForm({
      firstName: 'John',
      lastName: 'Parker',
      email: 'jems@mailinator.com',
      phone: '965-811-2345',
      company: 'Parts pvt limited',
      productType: 'Tooling & Supplies',
      description: 'This is demo contact us',
    });

    await contactUsPage.submit();
    await contactUsPage.expectThankYou();
    console.log('5 Contact Form - Positive Test end ===');
  });

  // 6️⃣ Contact Form - Negative Test
  test('Submit Contact Form with invalid email', async ({ page }) => {
    const contactUsPage = new ContactUsPage(page);
    await contactUsPage.goto();
    console.log('6 Contact Form - Negative Test start ===');

    await contactUsPage.fillForm({ email: 'invalidemail' });
    await contactUsPage.submit();
    await contactUsPage.expectEmailValidationMessage('Please enter an email address.');
    console.log('6 Contact Form - Negative Test End ===');
  });
});

