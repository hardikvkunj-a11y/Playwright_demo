// @ts-check
import { test, expect } from '@playwright/test';

test('TSS Sales – header, manufacturers, machinery, search', async ({ browser }) => {
  const url = 
  'https://dev83.octosglobal.info/tss_2025/';
  // 'https://stg83.octosglobal.info/tss_2025/';
  //'https://tss-sales.com/';

  const context = await browser.newContext({ recordVideo: { dir: 'videos/' } });
  const page = await context.newPage();

  try {
    console.log('=== TSS Sales - header/manufacturers/machinery/search test start ===');

    const response = await page.goto(url, { waitUntil: 'domcontentloaded' });
    if (!response) {
      throw new Error('Home page should respond');
    }
    expect(response.ok(), 'Home page response should be OK').toBeTruthy();

    await expect(page).toHaveTitle(/tss|sales/i);

    const header = page.locator('header, nav').first();
    await expect(header).toBeVisible();

    // Print only the "Manufacturers" menu item from header
    const manufacturersMenu = header.getByRole('link', { name: /manufacturers/i });
    await expect(manufacturersMenu).toBeVisible();
    const manufacturersText = (await manufacturersMenu.innerText()).trim();
    console.log(`Header menu - Manufacturers: "${manufacturersText}"`);

    const footer = page.locator('footer, [role="contentinfo"]').first();
    await expect(footer).toBeVisible();

    // 2. Scroll down page to the end
    console.log('Step 2: Scroll down to page end (footer)...');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(footer).toBeVisible();
    await footer.waitFor({ state: 'visible', timeout: 30000 });
    await expect(footer).toBeVisible({ timeout: 150000 });
    console.log('✓ Reached footer\n');

    // 3. Scroll up page to the top
    console.log('Step 3: Scroll back to top...');
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(header).toBeVisible();
    await header.waitFor({ state: 'visible', timeout: 30000 });
    await expect(header).toBeVisible({ timeout: 150000 });
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
          //console.log(`  [${i}] "${text}"`);
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
          //console.log(`  [${i}] "${text}"`);
        }
      }
    }
    // SEARCH DATA 
    /*await page.getByRole('link', { name: 'search-icon' }).click();
    await page.getByRole('textbox', { name: 'Search here' }).click();
    await page.getByRole('textbox', { name: 'Search here' }).fill('I');
    await page.getByRole('link', { name: 'Dynamiki Industrial' }).click();
    console.log(`✓ Clicked 2nd suggestion, current URL: ${page.url()}`);
    */
    // SEARCH DATA - home page search with waits
    // const searchIcon = page.locator('a.search-bar-icon');
    // await searchIcon.waitFor({ state: 'visible', timeout: 15000 });
    // await expect(searchIcon).toBeVisible({ timeout: 200000 });
    // await searchIcon.click();

   const searchIcon = page.getByRole('link', { name: 'search-icon' });
   await searchIcon.waitFor({ state: 'visible', timeout: 5000 });
   await expect(searchIcon).toBeVisible({ timeout: 200000 });
   await searchIcon.click();

    const searchBox = page.getByRole('textbox', { name: 'Search here' });
    await searchBox.waitFor({ state: 'visible', timeout: 50000 });
    await expect(searchBox).toBeVisible({ timeout: 200000 });
    await searchBox.click();
    await expect(searchBox).toBeVisible({ timeout: 200000 });
    await searchBox.fill('I');
    await expect(searchBox).toBeVisible({ timeout: 200000 });

    const resultLink = page.getByRole('link', { name: 'Dynamiki Industrial' });
    await searchBox.waitFor({ state: 'visible', timeout: 10000 });
    await resultLink.click();

    console.log(`✓ Clicked search result, current URL: ${page.url()}`);


    console.log('=== TSS Sales - header/manufacturers/machinery/search test end ===');
  } finally {
    // Make sure to await close, so that videos are saved.
    await context.close();
  }
});

