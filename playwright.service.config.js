const { defineConfig } = require('@playwright/test');
const { createAzurePlaywrightConfig, ServiceOS } = require('@azure/playwright');
const { DefaultAzureCredential } = require('@azure/identity');
const config = require('./playwright.config');

/* Learn more about service configuration at https://aka.ms/pww/docs/config */
export default defineConfig(
  config,

  createAzurePlaywrightConfig(config, {
    exposeNetwork: '<loopback>',
    connectTimeout: 3 * 60 * 1000, // 3 minutes
    os: ServiceOS.LINUX,
    credential: new DefaultAzureCredential(),
  }),

  {
    // Ignore these test files when running with playwright.service.config.js
    testIgnore: [
      '**/ClientAppPO.spec.js',
      '**/MoreValidations.spec.js',
      '**/upload-download.spec.js',
      '**/WebAPIPart2.spec.js',
    ],

    reporter: [
      ['html', { open: 'never' }],
      ['@azure/playwright/reporter'],
    ],
  }
);