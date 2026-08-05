import { test, expect } from "@playwright/test";

test("footer renders GitHub stats structure (Stars/Release/Commit)", async ({ page }) => {
  await page.goto("/");
  const stats = page.locator(".footer-stats .stat");
  await expect(stats).toHaveCount(3);
  await expect(stats.nth(0).locator(".stat-label")).toHaveText("Stars");
  await expect(stats.nth(1).locator(".stat-label")).toHaveText("Release");
  await expect(stats.nth(2).locator(".stat-label")).toHaveText("Commit");

  // Values come from a build-time GitHub API fetch (see src/lib/github-stats.ts) and can
  // legitimately be the "—" fallback if the build/dev machine hit the unauthenticated
  // rate limit - so we only assert the values are non-empty, not what they say.
  for (let i = 0; i < 3; i++) {
    const text = await stats.nth(i).locator(".stat-value").innerText();
    expect(text.trim().length).toBeGreaterThan(0);
  }
});

test("footer year is generated dynamically, not hardcoded", async ({ page }) => {
  await page.goto("/");
  const text = await page.locator(".footer-bottom p").innerText();
  const currentYear = new Date().getFullYear().toString();
  expect(text).toContain(currentYear);
});
