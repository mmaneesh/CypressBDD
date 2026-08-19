# Cypress 12 Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade CypressBDD from Cypress 4.6.0 to Cypress 12.17.4 with the Cypress 10+ configuration layout and a maintained Cucumber preprocessor.

**Architecture:** A root CommonJS `cypress.config.js` will own Cypress configuration and Node event registration. Gherkin specs and colocated step definitions will live under `cypress/e2e`, while browser support setup will use `cypress/support/e2e.js`.

**Tech Stack:** Node.js 24, npm, Cypress 12.17.4, `@badeball/cypress-cucumber-preprocessor` 18.0.6, esbuild, ESLint, Prettier

**Spec:** `docs/superpowers/specs/2026-08-19-cypress-12-upgrade-design.md`

## Global Constraints

- Preserve the existing Loanpal Gherkin scenario and runtime behavior.
- Do not modernize selectors, reporting architecture, CI, or developer automation in this pull request.
- Do not use `npm audit fix --force`.
- Pin Cypress to exactly `12.17.4`.
- Treat a failure from the obsolete external Loanpal workflow as known only after Cypress discovers and compiles the feature and step definitions.

---

### Task 1: Replace the Cypress and Cucumber dependency stack

**Files:**

- Modify: `package.json`
- Modify: `package-lock.json`

**Interfaces:**

- Consumes: npm registry metadata and the existing development dependency manifest
- Produces: exact Cypress 12.17.4, `@badeball/cypress-cucumber-preprocessor` 18.0.6, and `@bahmutov/cypress-esbuild-preprocessor` 2.2.4 dependencies

- [ ] **Step 1: Capture the failing dependency assertion**

Run:

```bash
node -e "const p=require('./package.json'); if (p.devDependencies.cypress !== '12.17.4') throw new Error('Cypress 12.17.4 is not pinned'); if (!p.devDependencies['@badeball/cypress-cucumber-preprocessor']) throw new Error('maintained Cucumber preprocessor is missing')"
```

Expected: FAIL with `Cypress 12.17.4 is not pinned`.

- [ ] **Step 2: Replace the dependencies and regenerate the lockfile**

Run:

```bash
npm uninstall cypress-cucumber-preprocessor
npm install --save-dev --save-exact cypress@12.17.4 @badeball/cypress-cucumber-preprocessor@18.0.6 @bahmutov/cypress-esbuild-preprocessor@2.2.4
```

Keep `cypress-xpath`, `cypress-wait-until`, and the current reporter packages in this milestone because removing or modernizing them would change unrelated test or reporting behavior.

- [ ] **Step 3: Verify the dependency assertion and lockfile**

Run:

```bash
node -e "const p=require('./package.json'); const l=require('./package-lock.json'); if (p.devDependencies.cypress !== '12.17.4') throw new Error('manifest mismatch'); if (l.packages['node_modules/cypress'].version !== '12.17.4') throw new Error('lock mismatch'); if (p.devDependencies['cypress-cucumber-preprocessor']) throw new Error('deprecated preprocessor remains'); console.log('dependency stack verified')"
npm ci
npx cypress version
```

Expected: the assertion prints `dependency stack verified`, `npm ci` exits 0, and both Cypress package and binary versions are 12.17.4.

- [ ] **Step 4: Commit the dependency migration**

```bash
git add package.json package-lock.json
git commit -m "chore: upgrade Cypress dependency stack"
```

### Task 2: Migrate Cypress configuration and Node events

**Files:**

- Create: `cypress.config.js`
- Delete: `cypress.json`
- Delete: `cypress/plugins/index.js`
- Modify: `eslint.config.mjs`

**Interfaces:**

- Consumes: the preprocessor packages installed in Task 1
- Produces: Cypress 12 `e2e` configuration with `.feature` discovery and esbuild preprocessing

- [ ] **Step 1: Capture the failing configuration assertion**

Run:

```bash
node -e "const fs=require('fs'); if (!fs.existsSync('cypress.config.js')) throw new Error('Cypress 12 config is missing')"
```

Expected: FAIL with `Cypress 12 config is missing`.

- [ ] **Step 2: Create the Cypress 12 configuration**

Create `cypress.config.js` with:

```js
const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const {
  addCucumberPreprocessorPlugin,
} = require('@badeball/cypress-cucumber-preprocessor');
const {
  createEsbuildPlugin,
} = require('@badeball/cypress-cucumber-preprocessor/esbuild');

module.exports = defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/mocha',
    quiet: true,
    overwrite: false,
    html: false,
    json: true,
    timestamp: 'mmddyyyy_HHMMss',
  },
  screenshotOnRunFailure: false,
  video: false,
  e2e: {
    specPattern: 'cypress/e2e/**/*.feature',
    supportFile: 'cypress/support/e2e.js',
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on(
        'file:preprocessor',
        createBundler({ plugins: [createEsbuildPlugin(config)] })
      );
      return config;
    },
  },
});
```

Delete `cypress.json` and `cypress/plugins/index.js` after translating their active settings.

- [ ] **Step 3: Teach ESLint about the root Node configuration**

Add this configuration object before the browser-side `cypress/**/*.js` block in `eslint.config.mjs`:

```js
{
  files: ['cypress.config.js'],
  languageOptions: {
    sourceType: 'commonjs',
    globals: globals.node,
  },
},
```

Remove the obsolete `ignores: ['cypress/plugins/**/*.js']` entry and the separate `cypress/plugins/**/*.js` configuration block.

- [ ] **Step 4: Verify configuration loading**

Run:

```bash
node -e "const c=require('./cypress.config.js'); if (c.e2e.specPattern !== 'cypress/e2e/**/*.feature') throw new Error('spec pattern mismatch'); if (typeof c.e2e.setupNodeEvents !== 'function') throw new Error('setupNodeEvents missing'); console.log('Cypress configuration loads')"
npm run lint
npm run format:check
```

Expected: configuration assertion, lint, and formatting all exit 0.

- [ ] **Step 5: Commit the configuration migration**

```bash
git add cypress.config.js cypress.json cypress/plugins/index.js eslint.config.mjs
git commit -m "chore: migrate Cypress configuration"
```

### Task 3: Move the E2E suite and migrate step imports

**Files:**

- Rename: `cypress/support/index.js` to `cypress/support/e2e.js`
- Rename: `cypress/integration/automationTest/automationTests.feature` to `cypress/e2e/automationTest/automationTests.feature`
- Rename: `cypress/integration/automationTest/automationTests/automationTests.js` to `cypress/e2e/automationTest/automationTests/automationTests.js`
- Rename: `cypress/integration/common/hooks.js` to `cypress/e2e/common/hooks.js`
- Rename: `cypress/integration/Locators/loanpalPage.json` to `cypress/e2e/Locators/loanpalPage.json`
- Modify: `cypress/e2e/automationTest/automationTests/automationTests.js`

**Interfaces:**

- Consumes: `specPattern` and support path from Task 2
- Produces: one discoverable `.feature` file with colocated Badeball step definitions and explicit shared hooks

- [ ] **Step 1: Capture the failing layout assertion**

Run:

```bash
node -e "const fs=require('fs'); if (!fs.existsSync('cypress/e2e/automationTest/automationTests.feature')) throw new Error('E2E feature has not moved')"
```

Expected: FAIL with `E2E feature has not moved`.

- [ ] **Step 2: Move the support and E2E files**

Run:

```bash
mkdir -p cypress/e2e/automationTest/automationTests cypress/e2e/common cypress/e2e/Locators
git mv cypress/support/index.js cypress/support/e2e.js
git mv cypress/integration/automationTest/automationTests.feature cypress/e2e/automationTest/automationTests.feature
git mv cypress/integration/automationTest/automationTests/automationTests.js cypress/e2e/automationTest/automationTests/automationTests.js
git mv cypress/integration/common/hooks.js cypress/e2e/common/hooks.js
git mv cypress/integration/Locators/loanpalPage.json cypress/e2e/Locators/loanpalPage.json
```

Remove the empty `cypress/integration` directories after Git has recorded all file moves.

- [ ] **Step 3: Migrate step-definition imports and load hooks**

At the top of `cypress/e2e/automationTest/automationTests/automationTests.js`, replace:

```js
import { Given, Then, When, And } from 'cypress-cucumber-preprocessor/steps';
```

with:

```js
import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import '../../common/hooks';
```

Replace the three legacy `And(...)` registrations for menu selection and profile navigation with `Given(...)`. Cucumber matches step text independently of whether the feature line uses `Given` or `And`, so the Gherkin scenario remains unchanged. Keep the locator import as `../../Locators/loanpalPage.json` because the relative layout remains equivalent.

- [ ] **Step 4: Verify the new layout statically**

Run:

```bash
node -e "const fs=require('fs'); const p=require('./package.json'); if (!fs.existsSync('cypress/e2e/automationTest/automationTests.feature')) throw new Error('feature missing'); if (!fs.existsSync('cypress/support/e2e.js')) throw new Error('support file missing'); if (fs.existsSync('cypress/integration')) throw new Error('legacy integration directory remains'); if (p['cypress-cucumber-preprocessor']) throw new Error('legacy package configuration remains'); console.log('E2E layout verified')"
npm run lint
npm run format:check
```

Delete the top-level `cypress-cucumber-preprocessor` configuration object from `package.json` before running this assertion.

Expected: the layout assertion, lint, and formatting exit 0.

- [ ] **Step 5: Commit the suite migration**

```bash
git add package.json cypress
git commit -m "test: migrate BDD suite to Cypress E2E layout"
```

### Task 4: Update project documentation

**Files:**

- Modify: `README.md`

**Interfaces:**

- Consumes: the final paths, versions, and commands from Tasks 1–3
- Produces: accurate developer setup and roadmap documentation

- [ ] **Step 1: Capture stale documentation references**

Run:

```bash
rg -n 'Cypress 4\.6\.0|cypress/integration|cypress/plugins|cypress\.json' README.md
```

Expected: matches showing the old version and layout.

- [ ] **Step 2: Update the README**

Make these exact documentation changes:

- identify Cypress 12.17.4 as the current milestone;
- replace `cypress/integration/...` paths with their `cypress/e2e/...` equivalents;
- list `cypress.config.js` and `cypress/support/e2e.js` in the project structure description;
- state that the next upgrade PR targets Cypress 15.21.0;
- retain the warning that the Loanpal site and selectors are obsolete;
- retain the existing install, run, report, lint, and format commands.

- [ ] **Step 3: Verify documentation and formatting**

Run:

```bash
if rg -n 'Cypress 4\.6\.0|cypress/integration|cypress/plugins|cypress\.json' README.md; then exit 1; fi
npm run format:check
```

Expected: no stale references and formatting exits 0.

- [ ] **Step 4: Commit documentation**

```bash
git add README.md
git commit -m "docs: document Cypress 12 milestone"
```

### Task 5: Run end-to-end verification and prepare the PR

**Files:**

- Modify only if verification exposes a migration defect in files already listed above

**Interfaces:**

- Consumes: the completed Cypress 12 migration
- Produces: fresh validation evidence and a focused branch ready for review

- [ ] **Step 1: Verify the clean install and static checks**

Run:

```bash
npm ci
npm run lint
npm run format:check
npx cypress version
npx cypress verify
```

Expected: every command exits 0 and Cypress reports package and binary version 12.17.4.

- [ ] **Step 2: Run the Gherkin spec**

Run:

```bash
npx cypress run --spec cypress/e2e/automationTest/automationTests.feature
```

Expected migration result: Cypress discovers the feature, compiles the step definitions and hooks, and begins the scenario without configuration, preprocessor, missing-step, or bundling errors. The command may later fail because the external Loanpal workflow is obsolete; capture the exact first application-level failure if it does.

- [ ] **Step 3: Inspect the final branch**

Run:

```bash
git status --short --branch
git diff --check master...HEAD
git diff --stat master...HEAD
git log --oneline master..HEAD
```

Expected: no uncommitted changes, no whitespace errors, and only the design, plan, dependency, configuration, suite-layout, and README commits are present.

- [ ] **Step 4: Push and open a draft pull request**

Push `codex/chore/upgrade-cypress-12` and open a draft PR targeting `master`. The PR body must distinguish fully passing static/configuration checks from any known Loanpal application-level failure and must not claim the obsolete scenario passes unless the run proves it.
