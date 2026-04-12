import { test, expect } from '@playwright/test';

test.describe('Dark Mode Toggle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Clear localStorage so each test starts fresh
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForLoadState('networkidle');
  });

  test('should render a slide toggle between sun and moon icons', async ({
    page,
  }) => {
    const toggleContainer = page.locator(
      '.post-viewer-wrapper__header__theme-toggle'
    );
    await expect(toggleContainer).toBeVisible();

    const slideToggle = toggleContainer.locator('mat-slide-toggle');
    await expect(slideToggle).toBeVisible();

    // Sun and moon icons should be present
    const icons = toggleContainer.locator('mat-icon');
    await expect(icons).toHaveCount(2);
  });

  test('should toggle from light to dark mode', async ({ page }) => {
    // Get initial data-theme (depends on OS preference, likely "light" in headless)
    const initialTheme = await page.evaluate(() =>
      document.documentElement.getAttribute('data-theme')
    );

    // Click the slide toggle
    const slideToggle = page.locator('mat-slide-toggle');
    await slideToggle.click();

    // data-theme should have changed
    const newTheme = await page.evaluate(() =>
      document.documentElement.getAttribute('data-theme')
    );
    expect(newTheme).not.toBe(initialTheme);
  });

  test('should toggle back from dark to light mode', async ({ page }) => {
    const slideToggle = page.locator('mat-slide-toggle');

    // Toggle once
    await slideToggle.click();
    const themeAfterFirst = await page.evaluate(() =>
      document.documentElement.getAttribute('data-theme')
    );

    // Toggle again
    await slideToggle.click();
    const themeAfterSecond = await page.evaluate(() =>
      document.documentElement.getAttribute('data-theme')
    );

    expect(themeAfterSecond).not.toBe(themeAfterFirst);
  });

  test('should persist theme preference in localStorage', async ({ page }) => {
    // Toggle the theme
    const slideToggle = page.locator('mat-slide-toggle');
    await slideToggle.click();

    const themeAfterToggle = await page.evaluate(() =>
      document.documentElement.getAttribute('data-theme')
    );

    // Verify localStorage was updated
    const storedTheme = await page.evaluate(() =>
      localStorage.getItem('post-viewer-theme')
    );
    expect(storedTheme).toBe(themeAfterToggle);
  });

  test('should restore theme from localStorage on reload', async ({
    page,
  }) => {
    // Set theme to dark via toggle
    const slideToggle = page.locator('mat-slide-toggle');
    await slideToggle.click();

    const themeBeforeReload = await page.evaluate(() =>
      document.documentElement.getAttribute('data-theme')
    );

    // Reload the page
    await page.reload();
    await page.waitForLoadState('networkidle');

    const themeAfterReload = await page.evaluate(() =>
      document.documentElement.getAttribute('data-theme')
    );

    expect(themeAfterReload).toBe(themeBeforeReload);
  });

  test('should reflect checked state on the slide toggle', async ({ page }) => {
    const slideToggle = page.locator('mat-slide-toggle');
    const toggleButton = slideToggle.locator('button[role="switch"]');

    // Initially unchecked (light mode)
    await expect(toggleButton).toHaveAttribute('aria-checked', 'false');

    // Toggle to dark
    await slideToggle.click();
    await expect(toggleButton).toHaveAttribute('aria-checked', 'true');

    // Toggle back to light
    await slideToggle.click();
    await expect(toggleButton).toHaveAttribute('aria-checked', 'false');
  });
});
