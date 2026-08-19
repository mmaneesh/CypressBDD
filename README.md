# Cypress BDD

A behavior-driven end-to-end testing project built with Cypress and Gherkin. The repository demonstrates how a readable feature file maps business scenarios to reusable Cypress step definitions.

> **Modernization in progress:** This project was originally created in 2020 with a legacy Cypress release. It is being updated incrementally so each change remains easy to understand and review. The current milestone uses Cypress 15.21.0; the next milestone replaces the temporary Loanpal scenario with a maintainable SauceDemo BDD suite.

## Current example

The existing example describes a visitor navigating the Loanpal website and viewing leadership profiles. Its main pieces are:

- `cypress.config.js` — Cypress configuration and Node event registration
- `cypress/e2e/automationTest/automationTests.feature` — the Gherkin scenario
- `cypress/e2e/automationTest/automationTests/automationTests.js` — Cypress step definitions
- `cypress/e2e/Locators/loanpalPage.json` — page selectors
- `cypress/e2e/common/hooks.js` — scenario lifecycle hooks
- `cypress/support/e2e.js` — browser-side support setup

The external site now redirects to GoodLeap and fails in that application's live-preview initialization. This scenario remains only as a temporary smoke test proving Cypress can discover and compile the BDD feature. The next milestone replaces it with SauceDemo page objects and independent positive, negative, and parameterized scenarios.

## Prerequisites

- Node.js 24.18.0 LTS and npm
- A browser supported by Cypress 15.21.0

The repository pins the development version in `.nvmrc`, while `package.json` declares the supported Node.js 24 range. With `nvm`, activate the pinned version before installing dependencies:

```bash
nvm install
nvm use
node --version
```

The expected output is `v24.18.0`. Cypress is pinned to 15.21.0.

## Install

```bash
npm ci
```

## Run

Open the Cypress Test Runner:

```bash
npm run cy:open
```

Run the BDD suite headlessly:

```bash
npm test
```

Generate a combined Mochawesome report after a test run, including after a failed test run:

```bash
npm run report
```

Generated dependencies, screenshots, videos, downloads, and test reports are intentionally excluded from version control.

## Code quality

Check JavaScript for common errors:

```bash
npm run lint
```

Check formatting without changing files:

```bash
npm run format:check
```

Apply automatic lint and formatting fixes with `npm run lint:fix` and `npm run format`.

## Technology

- Cypress
- Gherkin and Cucumber step definitions
- Mochawesome reporting
- JavaScript

## Modernization roadmap

- [x] Remove committed dependencies, generated reports, and embedded credentials from the maintained source
- [x] Document the project and its current limitations
- [x] Simplify local test and reporting commands
- [x] Establish Node.js 24 LTS as the development baseline
- [x] Add linting and formatting tools
- [x] Upgrade Cypress in controlled milestones through 15.21.0
- [x] Migrate to the maintained `@badeball/cypress-cucumber-preprocessor`
- [ ] Replace the obsolete external-site scenario with a SauceDemo POM suite
- [ ] Add GitHub Actions continuous integration
- [ ] Add Git hooks and dependency automation

## Security

Never commit passwords, tokens, or personal credentials. Use environment variables or a local ignored `.env` file for sensitive test data.

## License

This project is licensed under the ISC License as declared in `package.json`.
