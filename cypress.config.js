const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const {
  addCucumberPreprocessorPlugin,
} = require('@badeball/cypress-cucumber-preprocessor');
const {
  createEsbuildPlugin,
} = require('@badeball/cypress-cucumber-preprocessor/esbuild');

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
    baseUrl: 'https://www.saucedemo.com',
    specPattern: 'cypress/e2e/**/*.feature',
    supportFile: 'cypress/support/e2e.js',
    async setupNodeEvents(cypressOn, config) {
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
