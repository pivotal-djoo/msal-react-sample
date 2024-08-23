import { test, expect } from '@playwright/test';

const WEB_URL = process.env.WEB_URL || '';
const USERNAME = process.env.USERNAME || '';
const PASSWORD = process.env.PASSWORD || '';

test('has title', async ({ page }) => {
  await page.goto(WEB_URL);

  await expect(page).toHaveTitle('MSAL.js + React Sample');
});

test('login and call backend', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await page.getByRole('button', { name: /Login/i }).click();

  await page
    .getByRole('textbox', {
      name: /username or email/i
    })
    .fill(USERNAME);
  await page
    .getByRole('textbox', {
      name: /password/i
    })
    .fill(PASSWORD);
  await page.getByRole('button', { name: /Sign In/i }).click();

  await page.getByRole('button', { name: /Get user content/i }).click();
  await expect(
    page.getByText('Backend app validated auth token for user test.')
  ).toBeVisible();

  await page.getByRole('button', { name: /Get user roles/i }).click();
  await expect(page.getByText('test-role-1,')).toBeVisible();
  await expect(page.getByText('test-role-2,')).toBeVisible();
});
