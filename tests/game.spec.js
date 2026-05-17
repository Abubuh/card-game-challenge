import { test, expect } from "@playwright/test";

test("Start button navigates to /game", async ({ page }) => {
  await page.goto("/");
  await page.click("text=Start!");
  await expect(page).toHaveURL(/\/game$/);
});
