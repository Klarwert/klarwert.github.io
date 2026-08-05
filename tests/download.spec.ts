import { test, expect } from "@playwright/test";

test("hero shows three equal download buttons for Windows/macOS/Linux", async ({ page }) => {
  await page.goto("/");
  const buttons = page.locator(".dl-buttons-row .dl-btn");
  await expect(buttons).toHaveCount(3);
  await expect(buttons.nth(0)).toContainText("Windows");
  await expect(buttons.nth(1)).toContainText("macOS");
  await expect(buttons.nth(2)).toContainText("Linux");
});

test("download page tabs switch panels, update the URL hash and aria-selected", async ({ page }) => {
  await page.goto("/download");
  await expect(page.locator('[data-panel="windows"]')).toBeVisible();
  await expect(page.locator('[data-panel="macos"]')).toBeHidden();
  await expect(page.locator('.os-tab[data-os="windows"]')).toHaveAttribute("aria-selected", "true");

  await page.locator('.os-tab[data-os="macos"]').click();
  await expect(page.locator('[data-panel="macos"]')).toBeVisible();
  await expect(page.locator('[data-panel="windows"]')).toBeHidden();
  await expect(page).toHaveURL(/#macos$/);
  await expect(page.locator('.os-tab[data-os="macos"]')).toHaveAttribute("aria-selected", "true");
  await expect(page.locator('.os-tab[data-os="windows"]')).toHaveAttribute("aria-selected", "false");
});

test("copy button on the macOS terminal command copies to clipboard", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/download#macos");
  await page.locator('.os-tab[data-os="macos"]').click();

  const copyBtn = page.locator('[data-panel="macos"] .copy-btn');
  await copyBtn.click();

  await expect(copyBtn.locator(".icon-check")).toBeVisible();
  const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
  expect(clipboardText).toContain("xattr -cr /Applications/Klarwert.app");
});
