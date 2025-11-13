import { defineConfig, devices } from '@playwright/test';

export const BASE_URL = 'https://qa-course-01.andersenlab.com';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless: false,
        viewport: { width: 1180, height: 620 },
        launchOptions: { slowMo: 50, args: ['--start-maximized'] },
        deviceScaleFactor: 1,
      },
    },
  ],
});
