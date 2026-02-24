// @ts-check
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.getByPlaceholder('What needs to be done?').click();
  await page.getByPlaceholder('What needs to be done?').fill('feed the dog');
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  await page.getByPlaceholder('What needs to be done?').fill('water the plants');
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  await expect(page.getByTestId('todo-title')).toHaveCount(2);
  await page.getByRole('listitem')
  .filter({ hasText: 'feed the dog' })
  .getByRole('checkbox', { name: 'Toggle Todo' }).check();
  await page.getByRole('link', { name: 'Active' }).click();
  await expect(page.getByTestId('todo-title')).toHaveCount(1);
  await page.getByRole('link', { name: 'Completed' }).click();
  await expect(page.getByTestId('todo-title')).toHaveCount(1);
  
});

