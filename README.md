# Cypress BDD

A behavior-driven end-to-end testing project built with Cypress and Gherkin. The repository demonstrates how a readable feature file maps business scenarios to reusable Cypress step definitions.

> **Modernization in progress:** This project was originally created in 2020 with Cypress 4.6.0. It is being updated incrementally so each change remains easy to understand and review.

## Current example

The existing example describes a visitor navigating the Loanpal website and viewing leadership profiles. Its main pieces are:

- `cypress/integration/automationTest/automationTests.feature` — the Gherkin scenario
- `cypress/integration/automationTest/automationTests/automationTests.js` — Cypress step definitions
- `cypress/integration/Locators/loanpalPage.json` — page selectors
- `cypress/integration/common/hooks.js` — scenario lifecycle hooks

The external site and selectors date from 2020, so the scenario may no longer pass against the current website. Replacing it with a stable modern example is part of the roadmap rather than this initial cleanup.

## Prerequisites

- Node.js 24.18.0 LTS and npm
- A browser supported by Cypress 4.6.0

The repository pins Node.js in both `.nvmrc` and `.node-version`. With `nvm`, activate it before installing dependencies:

```bash
nvm install
nvm use
node --version
```

The expected output is `v24.18.0`. Cypress is still pinned to the legacy 4.6.0 release and will be upgraded separately in controlled steps.

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
- [ ] Upgrade Cypress in controlled major-version steps
- [ ] Migrate to the maintained `@badeball/cypress-cucumber-preprocessor`
- [ ] Replace the obsolete external-site scenario with a reliable example
- [ ] Add GitHub Actions continuous integration
- [ ] Add linting, formatting, and dependency automation

## Security

Never commit passwords, tokens, or personal credentials. Use environment variables or a local ignored `.env` file for sensitive test data.

## License

This project is licensed under the ISC License as declared in `package.json`.
