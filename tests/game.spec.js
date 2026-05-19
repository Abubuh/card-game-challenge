import { test, expect } from "@playwright/test";
import { GAME_DURATION, CLEANUP_DELAY } from "../src/constants/gameConstants";

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
  await cards.nth(1).click();
  await expect(cards.nth(2)).toHaveAttribute("aria-disabled", "true", {
    timeout: CLEANUP_DELAY,
  });
});

test("Matching cards stay flipped", async ({ page }) => {
  await page.goto("/game");

  const cards = page
    .getByRole("region", { name: /memory cards/i })
    .getByRole("button");
  await cards.nth(0).click();
  await cards.nth(4).click();

  await page.waitForTimeout(CLEANUP_DELAY + 100);

  await expect(cards.nth(0)).not.toHaveAttribute(
    "aria-label",
    "Face down card",
  );

  await expect(cards.nth(4)).not.toHaveAttribute(
    "aria-label",
    "Face down card",
  );
});

test("Non-matching cards flip back", async ({ page }) => {
  await page.goto("/game");
  const cards = page
    .getByRole("region", { name: /memory cards/i })
    .getByRole("button");
  await cards.nth(0).click();
  await cards.nth(1).click();
  await page.waitForTimeout(CLEANUP_DELAY + 100);
  await expect(cards.nth(0)).toHaveAttribute("aria-label", "Face down card");
  await expect(cards.nth(1)).toHaveAttribute("aria-label", "Face down card");
});

test("Matching all pairs navigates to results with win", async ({ page }) => {
  await page.goto("/game");
  const cards = page
    .getByRole("region", { name: /memory cards/i })
    .getByRole("button");

  const pairs = [
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7],
  ];
  for (const [a, b] of pairs) {
    await cards.nth(a).click();
    await cards.nth(b).click();
    await page.waitForTimeout(CLEANUP_DELAY + 100);
  }
  await expect(page).toHaveURL(/\/results$/);
  await expect(page.getByRole("status")).toHaveText("you did it");
});

test("Timer reaching 0 navigates to results with lose", async ({ page }) => {
  await page.clock.install();
  await page.goto("/game");

  await page.clock.runFor(GAME_DURATION * 1000);

  await expect(page).toHaveURL(/\/results$/);
  await expect(page.getByRole("status")).toHaveText(
    "oops you didn't find them all",
  );
});
