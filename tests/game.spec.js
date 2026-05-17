import { test, expect } from "@playwright/test";

test("Start button navigates to /game", async ({ page }) => {
  await page.goto("/");
  await page.click("text=Start!");
  await expect(page).toHaveURL(/\/game$/);
});

test("Play Again navigates back to /game", async ({ page }) => {
  await page.goto("/results");
  await page.click("text=Play Again");
  await expect(page).toHaveURL(/\/game$/);
});

test("Clicking a card flips it", async ({ page }) => {
  await page.goto("/game");
  const cards = page.locator('[role="button"]');
  const initialLabel = await cards.first().getAttribute("aria-label");
  await cards.first().click();
  await expect(cards.first()).not.toHaveAttribute("aria-label", initialLabel);
});
