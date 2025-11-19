import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config();

export const BASE_URL = "https://qa-course-01.andersenlab.com";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 5 : undefined,
  reporter: [["list"], ["allure-playwright"]],
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        headless: true,
        viewport: { width: 1180, height: 620 },
        launchOptions: { slowMo: 50, args: ["--start-maximized"] },
        deviceScaleFactor: 1,
      },
    },
  ],
});
