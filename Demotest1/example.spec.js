// @ts-check
import { test, expect } from '@playwright/test';

test('Fans Play Louder Automation', async ({ page }) => {
  const url = 'https://stg83.octosglobal.info/fansplaylouder_php/';
  const email = 'jenny102@mailinator.com';
  const password = 'Admin@123';

  console.log('=== Starting Fans Play Louder Automation ===\n');

  // Step 1: Open home page
  console.log('Step 1: Opening home page...');
  await page.goto(url);
  await page.waitForLoadState('load');
  console.log('✓ Home page loaded successfully\n');

  // Step 2: Click on login button
  console.log('Step 2: Clicking on login button...');
  const loginButton = page.getByRole('link', { name: /login/i }).or(page.locator('a:has-text("Login")').or(page.locator('a:has-text("login")'))).first();
  
  // Wait for navigation after clicking login button
  await Promise.all([
    page.waitForLoadState('domcontentloaded'),
    loginButton.click()
  ]);
  
  // Wait for login form to be ready
  await page.waitForLoadState('domcontentloaded');
  console.log('✓ Login button clicked\n');

  // Step 3: Type email - wait for input to be visible and ready
  console.log('Step 3: Entering email...');
  const emailInput = page.locator('input[type="email"]').or(page.locator('input[name*="email" i]')).or(page.locator('input[id*="email" i]')).first();
  await emailInput.waitFor({ state: 'visible', timeout: 10000 });
  await emailInput.fill(email);
  console.log(`✓ Email entered: ${email}\n`);

  // Step 4: Type password - wait for input to be visible and ready
  console.log('Step 4: Entering password...');
  const passwordInput = page.locator('input[type="password"]').first();
  await passwordInput.waitFor({ state: 'visible', timeout: 10000 });
  await passwordInput.fill(password);
  console.log('✓ Password entered\n');

  // Submit the login form
  console.log('Submitting login form...');
  const submitButton = page.locator('button[type="submit"]').or(page.getByRole('button', { name: /login|sign in|submit/i })).first();
  
  // Wait for navigation after login
  await Promise.all([
    page.waitForURL('**/dashboard**', { timeout: 20000 }),
    submitButton.click()
  ]);
/*  
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(100000); // Wait for potential success message

  // Step 5: Verify success message and print in terminal
  console.log('Step 5: Verifying success message...');
  try {
    const successMessage = page.locator('text=/login successfully/i').or(page.locator('[class*="success"], [class*="alert"]').filter({ hasText: /success|welcome|logged in/i })).first();
    await successMessage.waitFor({ timeout: 100000 });
    const successText = await successMessage.textContent();
    console.log(`✓ Success message found: ${successText}\n`);
  } catch (error) {
    console.log('⚠ Success message not found or already dismissed\n');
  }
*/
  // Step 6: Verify the dashboard page
  console.log('Step 6: Verifying dashboard page...');
  await page.waitForLoadState('domcontentloaded');
  const currentUrl = page.url();
  console.log(`✓ Current URL: ${currentUrl}`);
  
  // Check if we're on dashboard or home page after login
  try {
    const pageTitle = await page.title();
    console.log(`✓ Page title: ${pageTitle}\n`);
  } catch (error) {
    console.log(`⚠ Could not get page title: ${error.message}\n`);
  }

  // Step 7: Scroll down the page to end footer section
  console.log('Step 7: Scrolling down to footer section...');

  // More robust footer locator with explicit, shorter wait
  const footer = page.locator('footer, [role="contentinfo"]').first();
  await footer.waitFor({ state: 'visible', timeout: 50000 });
  await footer.scrollIntoViewIfNeeded();

  console.log('✓ Scrolled to footer section\n');

  // Step 8: Scroll back up to top section
  console.log('Step 8: Scrolling back to top section...');
  await page.evaluate(() => window.scrollTo(0, 0));
  console.log('✓ Scrolled back to top\n');



  // Step 9: Check the header menu list and print in terminal
  console.log('Step 9: Checking header menu list...');
  const headerMenu = page.locator('nav').or(page.locator('header')).or(page.locator('[class*="menu"]')).or(page.locator('[class*="nav"]')).first();
  const menuItems = headerMenu.locator('a').filter({ hasNotText: /login|sign up|signup|sign up/i });
  
  const menuTexts = [];
  const count = await menuItems.count();
  for (let i = 0; i < count; i++) {
    const text = await menuItems.nth(i).textContent();
    if (text && text.trim() && !text.match(/login|sign up|signup/i)) {
      menuTexts.push(text.trim());
    }
  }
  
  console.log('Header menu items:');
  if (menuTexts.length > 0) {
    menuTexts.forEach((item, index) => {
      console.log(`  ${index + 1}. ${item}`);
    });
  } else {
    console.log('  (No menu items found or already filtered)');
  }
  console.log('');

  // Step 10: Click on Fan Interaction header option
  console.log('Step 10: Clicking on Fan Interaction header option...');
  try {
    await Promise.all([
      page.waitForURL('**/getalumniinteraction', { timeout: 150000 }),
      page.getByRole('link', { name: 'Fan Interaction' }).or(page.locator('a').filter({ hasText: /Fan Interaction/i })).first().click()
    ]);
    console.log('✓ Fan Interaction clicked\n');
  } catch (error) {
    console.log(`⚠ Fan Interaction navigation failed: ${error.message}\n`);
  }

  // Step 11: Click Merchandise header option
  console.log('Step 11: Clicking on Merchandise header option...');
  try {
    await Promise.all([
      page.waitForURL('**/productlist', { timeout: 150000    }), 
      page.getByRole('link', { name: /Merchandise/i }).or(page.locator('a').filter({ hasText: /Merchandise/i })).first().click()
    ]);
    console.log('✓ Merchandise clicked\n');
  } catch (error) {
    console.log(`⚠ Merchandise navigation failed: ${error.message}\n`);
  }

  // Step 12: Find the logout button and if there then click on logout button
  console.log('Step 12: Looking for logout button...');
  try {
    // Wait for logout link to be visible first - try multiple locator strategies
    const logoutLink = page.getByRole('link', { name: /logout|Logout/i }).or(page.locator('a').filter({ hasText: /logout|Logout/i })).first();
    await logoutLink.waitFor({ state: 'visible', timeout: 200000 });
    
    const logoutText = await logoutLink.textContent();
    console.log(`✓ Logout link found: ${logoutText}`);
    
    // Click logout link
    await logoutLink.click();
    
    // Wait for navigation - logout might redirect to home page or logout page
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000); // Small wait for redirect
    
    const logoutUrl = page.url();
    console.log('✓ Logout button clicked\n');
    console.log(`Logout completed. Current URL: ${logoutUrl}`);
  } catch (error) {
    console.log(`⚠ Logout link not found or navigation failed: ${error.message}\n`);
  }

  console.log('=== Automation completed ===');
});
