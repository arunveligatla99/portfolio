import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const PAGES = [
  { name: 'home', path: '/', heading: /Arun Veligatla/i },
  { name: 'projects', path: '/projects', heading: /Projects/i },
  {
    name: 'project-agentix',
    path: '/projects/agentix-erp',
    heading: /Agentix ERP/i,
  },
  {
    name: 'project-policymind',
    path: '/projects/policymind',
    heading: /PolicyMind/i,
  },
  {
    name: 'project-collectmind',
    path: '/projects/collectmind',
    heading: /CollectMind/i,
  },
  { name: 'about', path: '/about', heading: /Senior software engineer/i },
  { name: 'contact', path: '/contact', heading: /Let.{0,4}s talk/i },
  { name: 'resume', path: '/resume', heading: /Arun Veligatla/i },
  { name: 'writing', path: '/writing', heading: /Writing/i },
];

const SCREENSHOT_VIEWPORTS = [
  { label: '375', width: 375, height: 812 },
  { label: '768', width: 768, height: 1024 },
  { label: '1440', width: 1440, height: 900 },
];

const SCREENSHOT_DIR = path.resolve(__dirname, 'screenshots');

test.describe('site smoke', () => {
  for (const p of PAGES) {
    test(`${p.name}: renders, no axe violations, screenshots`, async ({
      page,
      browserName,
    }) => {
      // Only run viewport screenshot capture once per page (chromium project).
      await page.goto(p.path, { waitUntil: 'networkidle' });
      await expect(page.locator('h1').first()).toContainText(p.heading);

      const accessibility = await new AxeBuilder({ page })
        .disableRules(['color-contrast'])
        .analyze();
      expect(accessibility.violations, JSON.stringify(accessibility.violations, null, 2)).toEqual([]);

      if (browserName !== 'chromium') return;
      await mkdir(SCREENSHOT_DIR, { recursive: true });
      for (const v of SCREENSHOT_VIEWPORTS) {
        await page.setViewportSize({ width: v.width, height: v.height });
        await page.waitForTimeout(150);
        await page.screenshot({
          path: path.join(SCREENSHOT_DIR, `${p.name}-${v.label}.png`),
          fullPage: true,
        });
      }
    });
  }
});

test.describe('not found', () => {
  test('404 renders with home link', async ({ page }) => {
    const res = await page.goto('/this-route-does-not-exist');
    expect(res?.status()).toBe(404);
    await expect(page.locator('h1')).toContainText('Page not found');
    await expect(page.getByRole('link', { name: 'Go home' })).toBeVisible();
  });
});

test.describe('contact form posts to API', () => {
  test('submits and shows the stub success state', async ({ page }) => {
    await page.goto('/contact');
    await page.getByRole('textbox', { name: 'Name' }).fill('Recruiter');
    await page.getByRole('textbox', { name: 'Email' }).fill('r@example.com');
    await page
      .getByRole('textbox', { name: 'Message' })
      .fill('Long enough message body for the test.');
    await page.getByRole('button', { name: 'Send' }).click();
    await expect(page.getByText(/stub mode/i)).toBeVisible({ timeout: 5000 });
  });
});
