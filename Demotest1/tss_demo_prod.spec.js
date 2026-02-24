// @ts-check
import { test, expect } from '@playwright/test';

test('TSS Sales – header, manufacturers, machinery, search', async ({ page }) => {
  const url = 'https://tss-sales.com/';

  console.log('=== TSS Sales - header/manufacturers/machinery/search test start ===');

  const response = await page.goto(url, { waitUntil: 'domcontentloaded' });
  expect(response, 'Home page should respond').not.toBeNull();
  expect(response.ok(), 'Home page response should be OK').toBeTruthy();

  await expect(page).toHaveTitle(/tss|sales/i);

  const header = page.locator('header, nav').first();
  await expect(header).toBeVisible();

  // Print all top-level header links
  const headerItems = header.locator('a[href]').filter({
    hasText: /./,
  });
  const headerCount = await headerItems.count();
  console.log('Header menu items (names only):');
  for (let i = 0; i < headerCount; i++) {
    const text = (await headerItems.nth(i).innerText()).trim();
    if (text) {
      console.log(`  [${i}] "${text}"`);
    }
  }

  const footer = page.locator('footer, [role="contentinfo"]').first();
  await expect(footer).toBeVisible();

  // 2. Scroll down page to the end
  console.log('Step 2: Scroll down to page end (footer)...');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect(footer).toBeVisible();
  console.log('✓ Reached footer\n');

  // 3. Scroll up page to the top
  console.log('Step 3: Scroll back to top...');
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(header).toBeVisible();
  console.log('✓ Back at top\n');

  // 5. Manufacturers list (items under Manufacturers section)
  console.log('Manufacturers items (names only):');
  const manufacturerItems = page.locator('a[href*="/manufacturerdetail/"]');
  const manuCount = await manufacturerItems.count();
  if (manuCount === 0) {
    console.log('  (no manufacturer links found)');
  } else {
    for (let i = 0; i < manuCount; i++) {
      const text = (await manufacturerItems.nth(i).innerText()).trim();
      if (text) {
        console.log(`  [${i}] "${text}"`);
      }
    }
  }

  // 6. Machinery list (items under Machinery section)
  console.log('Machinery items (names only):');
  const machineryItems = page.locator('a[href*="/machinery/"]');
  const machCount = await machineryItems.count();
  if (machCount === 0) {
    console.log('  (no machinery links found)');
  } else {
    for (let i = 0; i < machCount; i++) {
      const text = (await machineryItems.nth(i).innerText()).trim();
      if (text) {
        console.log(`  [${i}] "${text}"`);
      }
    }
  }

  // 7–8. Search section in header: type "i", list suggestions, click 2nd option if exists
  console.log('Step 7: Go to search section in header and type "i"...');
  const searchTrigger = header.getByRole('link', { name: /search/i }).first();
  if (await searchTrigger.count()) {
    await searchTrigger.click();
  }

  const searchInput = page
    .locator(
      'input[type=\"search\"], ' +
        'input[placeholder*=\"search\" i], ' +
        'input[aria-label*=\"search\" i], ' +
        'input[name=\"s\"], ' +
        'input[name*=\"search\" i], ' +
        'input[id*=\"search\" i], ' +
        'input[class*=\"search\" i]'
    )
    .first();

  if (await searchInput.count()) {
    await searchInput.click();
    await searchInput.fill('');
    await searchInput.type('i', { delay: 100 });
    await page.waitForTimeout(500); // small settle time

    // Try to capture common suggestion patterns
    const suggestions = page.locator(
      '[role=\"listbox\"] [role=\"option\"], .autocomplete-result, .ui-menu-item a, .search-suggest li a, .search-suggest li'
    );

    //demo HsF 
    ffff
    const suggestionCount = await suggestions.count();
    console.log(`Search suggestions count: ${suggestionCount}`);
    for (let i = 0; i < suggestionCount; i++) {
      const text = (await suggestions.nth(i).innerText()).trim();
      console.log(`  [${i}] "${text}"`);
    }

    if (suggestionCount >= 2) {
      console.log('Step 8: Clicking 2nd suggestion...');
      await suggestions.nth(1).click();
      console.log(`✓ Clicked 2nd suggestion, current URL: ${page.url()}`);
    } else {
      console.log('⚠ Less than 2 suggestions available; skipping click.');
    }
  } else {
    console.log('⚠ Search input not found in header.');
  }

  console.log('=== TSS Sales - header/manufacturers/machinery/search test end ===');
});

