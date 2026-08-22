const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const {
  addCucumberPreprocessorPlugin,
} = require('@badeball/cypress-cucumber-preprocessor');
const {
  createEsbuildPlugin,
} = require('@badeball/cypress-cucumber-preprocessor/esbuild');
const {
  DEFAULT_BASE_URL,
  resolveEnvironment,
} = require('./config/environment');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    charts: true,
    reportPageTitle: 'Cypress BDD SauceDemo Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  screenshotOnRunFailure: true,
  video: false,
  e2e: {
    baseUrl: DEFAULT_BASE_URL,
    specPattern: 'cypress/e2e/**/*.feature',
    supportFile: 'cypress/support/e2e.js',
    async setupNodeEvents(cypressOn, config) {
      const environment = resolveEnvironment({
        targetEnvironment: config.env.targetEnvironment,
        baseUrl: process.env.CYPRESS_BASE_URL || config.baseUrl,
      });
      config.baseUrl = environment.baseUrl;
      config.env.targetEnvironment = environment.name;

      const on = require('cypress-on-fix')(cypressOn);
      require('cypress-mochawesome-reporter/plugin')(on);
      await addCucumberPreprocessorPlugin(on, config);
      on(
        'file:preprocessor',
        createBundler({ plugins: [createEsbuildPlugin(config)] })
      );
      return config;
    },
  },
});
