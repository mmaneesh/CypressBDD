# Cypress BDD SauceDemo

[![CI](https://github.com/mmaneesh/CypressBDD/actions/workflows/ci.yml/badge.svg)](https://github.com/mmaneesh/CypressBDD/actions/workflows/ci.yml)

A maintainable end-to-end test portfolio using Cypress 15, Gherkin, page objects, parameterized scenarios, and the hosted [SauceDemo](https://www.saucedemo.com/) e-commerce application. No application build or local web server is required.

## Test coverage

The suite executes 20 independent scenarios across four business areas:

- Authentication: successful login, locked user, and parameterized invalid credentials
- Inventory: catalog visibility, product details, and four parameterized sort modes
- Cart: single and data-table-driven multi-product additions, removal, and product details
- Checkout: parameterized required-field validation, cancellation, and successful completion

Tests use stable `data-test` selectors and avoid forced interactions or assertions against third-party asset URLs.

## Project structure

```text
cypress/
├── e2e/features/              # Gherkin feature files
├── fixtures/sauceDemo.json    # Test users, products, and checkout data
├── pages/                     # Page Object Model classes
└── support/
    ├── e2e.js                 # Browser support and reporter registration
    └── step_definitions/      # Reusable Cucumber steps
.github/workflows/ci.yml       # Quality and Cypress CI jobs
```

Page objects own selectors and browser interactions. Step definitions express business behavior and assertions, while fixtures keep test data separate from both.

## Prerequisites

- Node.js 24.18.0 or another version in the declared Node 24 range
- npm

```bash
nvm install
nvm use
npm ci
```

## Commands

```bash
npm run cy:open       # Open the interactive Cypress runner
npm test              # Run all BDD scenarios headlessly
npm run lint          # Check JavaScript
npm run format:check  # Check repository formatting
npm run validate      # Run every local validation
```

Each Cypress run creates an inline-asset Mochawesome HTML report under `cypress/reports`. Failed tests retain screenshots, and CI uploads reports, screenshots, and videos when present.

## Developer automation

`npm ci` runs the Husky prepare script. Before each commit, lint-staged checks formatting for staged source files and runs ESLint on staged JavaScript files. Dependabot checks npm packages weekly and GitHub Actions monthly.

## Technology

- Cypress 15.21.0
- `@badeball/cypress-cucumber-preprocessor`
- Gherkin Scenario Outlines and Data Tables
- Page Object Model
- `cypress-mochawesome-reporter`
- ESLint, Prettier, Husky, and lint-staged
- GitHub Actions and Dependabot

## Security

SauceDemo publishes its demonstration credentials on its login page. Never commit private passwords, tokens, or personal credentials; use ignored environment files or CI secrets for sensitive systems.

## License

This project is licensed under the ISC License as declared in `package.json`.
