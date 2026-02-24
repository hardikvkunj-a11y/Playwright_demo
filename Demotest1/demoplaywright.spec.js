import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('I need bag');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('I need bike');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('I need sofa');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');

  await expect(page.getByTestId('todo-title')).toHaveCount(3);

  // If 'feed the dog' item exists, toggle it; otherwise just continue
  const feedDogCheckbox = page
    .getByRole('listitem')
    .filter({ hasText: 'feed the dog' })
    .getByRole('checkbox', { name: 'Toggle Todo' });

  if ((await feedDogCheckbox.count()) > 0) {
    await feedDogCheckbox.check();
  }
    
  await page.getByRole('link', { name: 'All' }).click();
  await page.getByRole('listitem').filter({ hasText: 'I need bike' }).getByLabel('Toggle Todo').check();
  await page.getByRole('listitem').filter({ hasText: 'I need bag' }).getByLabel('Toggle Todo').check();
  await page.getByRole('link', { name: 'Active' }).click();
  await page.getByRole('link', { name: 'Active' }).click();
  await expect(page.getByTestId('todo-title')).toHaveCount(1);
  await page.getByRole('link', { name: 'All' }).click();
  await page.getByRole('listitem').filter({ hasText: 'I need bike' }).getByLabel('Toggle Todo').uncheck();

  await page.getByRole('link', { name: 'Active' }).click();
  await expect(page.getByTestId('todo-title')).toHaveCount(2);

  await page.getByRole('link', { name: 'Completed' }).click();
  await page.getByRole('link', { name: 'Active' }).click();
  await page.getByRole('link', { name: 'All' }).click();
});

