// @ts-check
import { expect } from '@playwright/test';

/**
 * Page Object Model for the TSS Sales "Contact Us" page.
 */
export class ContactUsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to the Contact Us page.
   */
  async goto() {
    await this.page.goto('/tss_2025/contactus');
  }

  // Locators
  get firstNameInput() {
    return this.page.getByLabel(/First Name/i);
  }

  get lastNameInput() {
    return this.page.getByPlaceholder('Last Name');
  }

  get emailInput() {
    return this.page.getByPlaceholder('Email');
  }

  get phoneInput() {
    return this.page.getByPlaceholder('Phone Number');
  }

  get companyInput() {
    return this.page.getByPlaceholder('Company Name');
  }

  get productTypeSelect() {
    return this.page.getByLabel('Type of Product *');
  }

  get descriptionInput() {
    return this.page.getByPlaceholder('Description');
  }

  get submitButton() {
    return this.page.getByRole('button', { name: 'Submit' });
  }

  /**
   * Fill the contact form with the provided data.
   * @param {{
   *  firstName?: string;
   *  lastName?: string;
   *  email?: string;
   *  phone?: string;
   *  company?: string;
   *  productType?: string;
   *  description?: string;
   * }} data
   */
  async fillForm(data) {
    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      productType,
      description,
    } = data;

    if (firstName !== undefined) {
      await expect(this.firstNameInput).toBeVisible();
      await this.firstNameInput.fill(firstName);
    }

    if (lastName !== undefined) {
      await expect(this.lastNameInput).toBeVisible();
      await this.lastNameInput.fill(lastName);
    }

    if (email !== undefined) {
      await expect(this.emailInput).toBeVisible();
      await this.emailInput.fill(email);
    }

    if (phone !== undefined) {
      await expect(this.phoneInput).toBeVisible();
      await this.phoneInput.fill(phone);
    }

    if (company !== undefined) {
      await expect(this.companyInput).toBeVisible();
      await this.companyInput.fill(company);
    }

    if (productType !== undefined) {
      await expect(this.productTypeSelect).toBeVisible();
      await this.productTypeSelect.selectOption(productType);
    }

    if (description !== undefined) {
      await expect(this.descriptionInput).toBeVisible();
      await this.descriptionInput.fill(description);
    }
  }

  async submit() {
    await expect(this.submitButton).toBeEnabled();
    await this.submitButton.click();
  }

  async expectThankYou() {
    await expect(this.page.locator('text=Thank')).toBeVisible({ timeout: 10000 });
  }

  /**
   * Assert the browser's built-in validation message on the email field.
   * @param {string | RegExp} message
   */
  async expectEmailValidationMessage(message) {
    const emailField = this.page.locator('input[type="email"]');
    await expect(emailField).toHaveJSProperty('validationMessage', message);
  }
}

