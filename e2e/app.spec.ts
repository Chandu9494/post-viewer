import { test, expect } from '@playwright/test';

test.describe('Posts Viewer App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display the page title', async ({ page }) => {
    const title = page.locator('h1.post-viewer-wrapper__header__title');
    await expect(title).toHaveText('Posts Viewer');
  });

  test('should load and display post cards', async ({ page }) => {
    const cards = page.locator('app-post-viewer-card .post-viewer-card');
    await expect(cards.first()).toBeVisible();
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should show post info when a card is clicked', async ({ page }) => {
    const cards = page.locator('app-post-viewer-card .post-viewer-card');
    await expect(cards.first()).toBeVisible();

    await cards.first().click();

    const info = page.locator(
      '.post-viewer-wrapper__info_section__selected_post_id'
    );
    await expect(info).toContainText('Current post id');
  });

  test('should reset selection when Reset button is clicked', async ({
    page,
  }) => {
    const cards = page.locator('app-post-viewer-card .post-viewer-card');
    await expect(cards.first()).toBeVisible();

    // Select a card first
    await cards.first().click();
    const info = page.locator(
      '.post-viewer-wrapper__info_section__selected_post_id'
    );
    await expect(info).toContainText('Current post id');

    // Click Reset
    const resetBtn = page.locator(
      '.post-viewer-wrapper__info_section__reset_btn'
    );
    await resetBtn.click();

    await expect(info).toContainText('View the content by clicking on each tile');
  });

  test('should disable Reset button when no card is selected', async ({
    page,
  }) => {
    const resetBtn = page.locator(
      '.post-viewer-wrapper__info_section__reset_btn'
    );
    await expect(resetBtn).toBeDisabled();
  });
});
