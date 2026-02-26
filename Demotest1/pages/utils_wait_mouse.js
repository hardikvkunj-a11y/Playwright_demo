// @ts-check
import { expect } from '@playwright/test';

/**
 * Page Object Model for the TSS Sales "Utils" page.
 */
export class utils_Wait_Mouse {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * the wait and scroll.
   */
  async wait(a) {
    await this.page.waitForTimeout(a);
  }
  async scroll(a,b) {
    await this.page.mouse.wheel(a, b);
  }

}