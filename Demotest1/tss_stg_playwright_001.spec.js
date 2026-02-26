import { test, expect } from '@playwright/test';
import { utils_Wait_Mouse } from './pages/utils_wait_mouse.js';


test('test', async ({ page }) => {

  const utils= new utils_Wait_Mouse(page);
  

  await page.goto('https://stg83.octosglobal.info/tss_2025/');
  await page.mouse.wheel(0, 500);
  await page.locator('#tss-rep-sec').click();
  await page.mouse.wheel(0, 500);
  await page.locator('.video-btn').first().click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('link', { name: 'Explore More' }).click();
  await page.getByRole('link', { name: 'Manufacturers' }).click();
  await page.getByRole('link', { name: 'BVC' }).click();
  await page.waitForTimeout(500);
  await page.getByRole('link', { name: 'Machinery' }).click();
  await page.waitForTimeout(500);
  await page.getByRole('link', { name: 'Auxillary IG-Equipment' }).click();
  await utils.wait(5000);
  // await page.waitForTimeout(50000);
  await page.mouse.wheel(0, 500);
  await page.mouse.wheel(0, 500);
  await page.getByRole('link', { name: 'View More' }).first().click();
  await page.getByRole('link', { name: 'Get A Quote' }).nth(1).click();
  await page.getByRole('textbox', { name: 'First Name *' }).click();
  await page.getByRole('textbox', { name: 'First Name *' }).fill('Martin');
  await page.getByRole('textbox', { name: 'Last Name *' }).click();
  await page.getByRole('textbox', { name: 'Last Name *' }).fill('Gill');
  await page.getByRole('textbox', { name: 'Email *' }).click();
  await page.getByRole('textbox', { name: 'Email *' }).fill('martin@mailinatyor.com');
  await page.getByRole('textbox', { name: 'Email *' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Email *' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Email *' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Email *' }).fill('martin@mailinator.com');
  await page.getByRole('textbox', { name: 'Phone Number *' }).click();
  await page.getByRole('textbox', { name: 'Phone Number *' }).fill('648-223-1502');
  await page.getByRole('textbox', { name: 'Company Name *' }).click();
  await page.getByRole('textbox', { name: 'Company Name *' }).fill('Glass pvt limited');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('link', { name: 'Labels & Sample Boxes' }).click();
  await page.locator('.w-100').first().click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('div:nth-child(3) > .block-inner > .block-image > .w-100').click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('link', { name: 'Consumables' }).click();
  await page.getByRole('link', { name: 'CNC Pods' }).click();
  await page.getByRole('img', { name: 'banner image' }).nth(1).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('link', { name: 'View More' }).first().click();
  await page.goto('https://stg83.octosglobal.info/tss_2025/consumables/cnc-pod');
  await page.getByRole('link', { name: 'View More' }).nth(1).click();
  await expect(page.locator('#navbarNav')).toMatchAriaSnapshot(`
    - link "Grizzly":
      - /url: https://stg83.octosglobal.info/tss_2025/grizzly
      - text: ""
      - img
    `);
  await page.getByRole('link', { name: 'Grizzly' }).click();
  await page.getByRole('link', { name: 'search-icon', exact: true }).click();
  await page.getByRole('textbox', { name: 'Search here' }).click();
  await page.getByRole('textbox', { name: 'Search here' }).fill('i');
  await page.locator('.manufacturer-list > div:nth-child(2)').click();
});