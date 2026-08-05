import { test, expect } from "@playwright/test";

test("homepage has correct title and favicon, no Astro default", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Klarwert/);
  await expect(page).not.toHaveTitle(/Astro/i);
  const icon = page.locator('link[rel="icon"]');
  await expect(icon).toHaveAttribute("href", /klarwert-icon\.svg/);
});

test("logo image loads without error", async ({ page }) => {
  await page.goto("/");
  const logo = page.locator(".header-logo-icon");
  await expect(logo).toBeVisible();
  const naturalWidth = await logo.evaluate((img: HTMLImageElement) => img.naturalWidth);
  expect(naturalWidth).toBeGreaterThan(0);
});

test("header nav anchors scroll to the right section, not hidden under sticky header", async ({ page }) => {
  await page.goto("/");
  await page.locator('.header-nav a[href="/#features"]').click();
  await expect(page.locator("#features")).toBeInViewport();

  await page.locator('.header-nav a[href="/#faq"]').click();
  await expect(page.locator("#faq")).toBeInViewport();
});

test("footer download-anchor scroll target exists on the homepage", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#download")).toBeAttached();
});

test("footer links to /datenschutz, not in main nav", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".header-nav a", { hasText: "Datenschutz" })).toHaveCount(0);
  await expect(page.locator("footer a[href='/datenschutz']")).toBeVisible();
});
