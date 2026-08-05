import { test, expect } from "@playwright/test";

for (const os of ["windows", "macos", "linux"] as const) {
  test(`/${os} redirects to /download#${os}`, async ({ page }) => {
    await page.goto(`/${os}`);
    await page.waitForURL(`**/download#${os}`);
    await expect(page).toHaveURL(`/download#${os}`);
    await expect(page.locator(`#${os}[data-panel="${os}"]`)).toBeVisible();
  });
}

test("OS redirect pages carry no duplicated install instructions", async ({ request, baseURL }) => {
  // Fetch raw HTML directly (no JS/meta-refresh execution) to inspect the page as shipped,
  // before the browser would follow the redirect.
  const res = await request.get(`${baseURL}/windows`);
  const html = await res.text();
  expect(html).toContain('http-equiv="refresh"');
  expect(html).not.toContain("SmartScreen");
});
