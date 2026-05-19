// @ts-check
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  reporter: "html",
  workers: 1,
  use: {
    baseURL: "http://localhost:5173",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "edge",
      use: { ...devices["Desktop Edge"] },
    },
  ],
  webServer: {
    command: "npx vite --mode test",
    url: "http://localhost:5173",
    reuseExistingServer: false,
  },
});
