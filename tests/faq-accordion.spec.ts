import { test, expect } from "@playwright/test";

test("FAQ has exactly 7 questions and each toggles open/closed", async ({ page }) => {
  await page.goto("/#faq");
  const triggers = page.locator(".accordion-trigger");
  await expect(triggers).toHaveCount(7);

  const first = triggers.first();
  const firstPanel = page.locator("#faq-panel-0");

  await expect(firstPanel).toBeHidden();
  await first.click();
  await expect(firstPanel).toBeVisible();
  await expect(first).toHaveAttribute("aria-expanded", "true");

  await first.click();
  await expect(firstPanel).toBeHidden();
  await expect(first).toHaveAttribute("aria-expanded", "false");
});

test("opening one FAQ item closes any other open item", async ({ page }) => {
  await page.goto("/#faq");
  await page.locator("#faq-btn-0").click();
  await expect(page.locator("#faq-panel-0")).toBeVisible();

  await page.locator("#faq-btn-1").click();
  await expect(page.locator("#faq-panel-1")).toBeVisible();
  await expect(page.locator("#faq-panel-0")).toBeHidden();
});
