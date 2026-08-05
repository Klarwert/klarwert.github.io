import { test, expect } from "@playwright/test";

const KNOWN_TEXTS = [
  "Rewe Sagt Danke · 42,17 €",
  "Miete · 1.200,00 €",
  "Netflix · 12,99 €",
  "Sparplan Depot · 250,00 €",
  "Deutsche Bahn · 89,90 €",
  "Amazon · 34,50 €",
  "Stadtwerke · 96,40 €",
  "Spotify · 9,99 €",
];

test("hero example is a typewriter effect, not the old CSS-fade carousel", async ({ page }) => {
  await page.goto("/");
  // Guards against silently reverting to the earlier fade/crossfade implementations.
  await expect(page.locator(".carousel-item")).toHaveCount(0);
  await expect(page.locator("#tw-text")).toBeAttached();
  await expect(page.locator(".caret")).toBeAttached();
});

test("typewriter types characters in one at a time (length grows), not a fade-in", async ({ page }) => {
  await page.goto("/");
  const textEl = page.locator("#tw-text");

  const lengths: number[] = [];
  for (let i = 0; i < 5; i++) {
    lengths.push((await textEl.innerText()).length);
    await page.waitForTimeout(150);
  }

  // A real typewriter produces a non-decreasing, and at some point strictly increasing,
  // sequence of lengths early on - a fade/crossfade would jump straight to full length.
  const strictlyIncreasedAtLeastOnce = lengths.some((len, i) => i > 0 && len > lengths[i - 1]);
  expect(strictlyIncreasedAtLeastOnce, `lengths sampled: ${lengths.join(", ")}`).toBe(true);
  for (let i = 1; i < lengths.length; i++) {
    expect(lengths[i], `lengths sampled: ${lengths.join(", ")}`).toBeGreaterThanOrEqual(lengths[i - 1]);
  }
});

test("typewriter deletes characters one at a time after the pause, then types the next example", async ({ page }) => {
  await page.goto("/");
  const textEl = page.locator("#tw-text");
  const badgeEl = page.locator("#tw-badge");

  // Wait for the first example to be fully typed (badge fades in only once typing is done).
  await expect(badgeEl).toHaveCSS("opacity", "1", { timeout: 5000 });
  const fullText = await textEl.innerText();
  expect(KNOWN_TEXTS).toContain(fullText);

  // Wait for the pause to end and deletion to begin (badge hides again).
  await expect(badgeEl).toHaveCSS("opacity", "0", { timeout: 3000 });
  await page.waitForTimeout(150);
  const midDeleteLength = (await textEl.innerText()).length;
  expect(midDeleteLength, "text should be shrinking during the delete phase").toBeLessThan(fullText.length);
});

test("cycles through at least 3 of the 8 known examples over time", async ({ page }) => {
  test.setTimeout(30000);
  await page.goto("/");
  const textEl = page.locator("#tw-text");
  const badgeEl = page.locator("#tw-badge");

  const seen = new Set<string>();
  const deadline = Date.now() + 22000;
  while (Date.now() < deadline && seen.size < 3) {
    if ((await badgeEl.evaluate((el) => getComputedStyle(el).opacity)) === "1") {
      const text = await textEl.innerText();
      if (KNOWN_TEXTS.includes(text)) seen.add(text);
    }
    await page.waitForTimeout(200);
  }

  expect(seen.size, `distinct examples seen: ${[...seen].join(" | ")}`).toBeGreaterThanOrEqual(3);
});

test("under prefers-reduced-motion, examples swap instantly (no per-character typing)", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const textEl = page.locator("#tw-text");

  // Full text should appear immediately, not grow character by character.
  await page.waitForTimeout(50);
  const firstText = await textEl.innerText();
  expect(KNOWN_TEXTS).toContain(firstText);

  await page.waitForTimeout(3100);
  const secondText = await textEl.innerText();
  expect(KNOWN_TEXTS).toContain(secondText);
  expect(secondText).not.toBe(firstText);
});
