# Cypress 12 Upgrade Design

## Goal

Move CypressBDD from Cypress 4.6.0 to Cypress 12.17.4 in one focused pull request, leaving the subsequent Cypress 15.21.0 upgrade for a separate pull request.

## Scope

This pull request will:

- pin Cypress to 12.17.4 and regenerate the npm lockfile;
- replace `cypress.json` with `cypress.config.js`;
- move Node event registration from `cypress/plugins/index.js` into `e2e.setupNodeEvents`;
- replace the deprecated `cypress-cucumber-preprocessor` package with a Cypress-12-compatible release of `@badeball/cypress-cucumber-preprocessor` and its required bundler adapter;
- update feature-file discovery, support-file paths, and step-definition paths for the Cypress 10+ project layout;
- preserve the existing Gherkin scenario and its behavior;
- upgrade or remove only dependencies that block Cypress 12 installation, configuration, or execution;
- update the README with the new version, commands, project structure, and known external-site limitation.

This pull request will not modernize the Loanpal scenario, selectors, page abstractions, reporting architecture, GitHub Actions, or developer automation. Those remain separate roadmap items.

## Architecture

`cypress.config.js` will become the single Cypress configuration entry point. Its `e2e` section will declare the `.feature` spec pattern and support file, while `setupNodeEvents` will register the maintained Cucumber preprocessor and its file preprocessor adapter. The obsolete `cypress/plugins/index.js` and `cypress.json` files will be removed after their settings have been translated.

Feature files and step definitions will use the Cypress 10+ `cypress/e2e` layout. Shared browser-side setup will move from `cypress/support/index.js` to `cypress/support/e2e.js`. Existing commands, fixtures, locator data, and scenario hooks will be retained unless a path change is required for discovery.

## Dependency Policy

Dependencies will be pinned or constrained to versions that work together on Cypress 12 and Node 24. This is a compatibility migration, not an indiscriminate update of every package. Deprecated packages replaced by maintained equivalents will be removed from both `package.json` and `package-lock.json`.

Reporter packages will remain on their current versions unless Cypress 12 cannot execute with them. A broader reporter refresh belongs to the reporting roadmap item or the Cypress 15 pull request.

No `npm audit fix --force` command will be used. Vulnerabilities remaining in legacy transitive dependencies will be reported rather than hidden through unrelated upgrades.

## Runtime Behavior and Errors

Configuration or preprocessor failures must stop the run with their original diagnostic output. The migration will not add retries, exception suppression, forced interactions, or test-specific workarounds.

The Loanpal site is an external dependency from 2020. A failure caused by that site or its stale selectors is an accepted known limitation only after Cypress starts, discovers the feature, compiles its step definitions, and begins executing the scenario.

## Verification

The pull request must verify:

- `npm ci` succeeds from the regenerated lockfile;
- the manifest and lockfile both resolve Cypress 12.17.4;
- `npx cypress verify` succeeds on the current Apple silicon environment;
- `npm run lint` succeeds;
- `npm run format:check` succeeds;
- Cypress discovers and compiles the Gherkin feature without a configuration, bundling, support-file, or missing-step-definition error;
- any later test failure is recorded accurately as an external Loanpal workflow limitation.

## Follow-up Pull Request

After this pull request is reviewed and merged, a separate branch will upgrade Cypress 12.17.4 to Cypress 15.21.0. That pull request will evaluate the Cypress 13, 14, and 15 migration requirements, update the remaining compatible dependencies, and verify the suite again without mixing those changes into this migration.
