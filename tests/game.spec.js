import { test, expect } from "@playwright/test";

test("Start button navigates to /game", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /start/i }).click();
  await expect(page).toHaveURL(/\/game$/);
});

test("Play Again navigates back to /game", async ({ page }) => {
  await page.goto("/results");
  await page.getByRole("button", { name: /play again/i }).click();
  await expect(page).toHaveURL(/\/game$/);
});

test("Clicking a card flips it", async ({ page }) => {
  await page.goto("/game");
  const cards = page
    .getByRole("region", { name: /memory cards/i })
    .getByRole("button");
  const initialLabel = await cards.first().getAttribute("aria-label");
  await cards.first().click();
  await expect(cards.first()).not.toHaveAttribute("aria-label", initialLabel);
});

test("Keyboard Enter flips a card", async ({ page }) => {
  await page.goto("/game");
  const cards = page
    .getByRole("region", { name: /memory cards/i })
    .getByRole("button");
  const initialLabel = await cards.first().getAttribute("aria-label");
  await cards.first().focus();
  await page.keyboard.press("Enter");
  await expect(cards.first()).not.toHaveAttribute("aria-label", initialLabel);
});

test("Keyboard Space flips a card", async ({ page }) => {
  await page.goto("/game");
  const cards = page
    .getByRole("region", { name: /memory cards/i })
    .getByRole("button");
  const initialLabel = await cards.first().getAttribute("aria-label");
  await cards.first().focus();
  await page.keyboard.press("Space");
  await expect(cards.first()).not.toHaveAttribute("aria-label", initialLabel);
});

test("Cannot flip third card while two are being evaluated", async ({
  page,
}) => {
  await page.goto("/game");
  const cards = page
    .getByRole("region", { name: /memory cards/i })
    .getByRole("button");
  await cards.nth(0).click();
  await cards.nth(7).click();
  await expect(cards.nth(2)).toHaveAttribute("aria-disabled", "true", {
    timeout: 4000,
  });
});
