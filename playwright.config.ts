import { defineConfig, devices } from '@playwright/test';

// Headless Chromium renders WebGL2 through SwiftShader (as in BAM). Screenshots are for review,
// not pixel-diff tests. WebKit runs in CI only (it isn't installed in the cloud container).
const webkit = process.env.PW_WEBKIT === '1';

export default defineConfig({
  testDir: 'tests',
  testMatch: /.*\.spec\.ts/,
  timeout: 180_000,
  fullyParallel: false,
  workers: 1,
  reporter: [['list']],
  use: {
    baseURL: 'http://127.0.0.1:5173',
    launchOptions: webkit
      ? {}
      : { args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] },
  },
  projects: webkit
    ? [{ name: 'webkit', use: { ...devices['Desktop Safari'] } }]
    : [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npx vite --host 127.0.0.1',
    url: 'http://127.0.0.1:5173',
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
