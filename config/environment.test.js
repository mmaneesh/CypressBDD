const assert = require('node:assert/strict');
const { describe, it } = require('node:test');

const {
  DEFAULT_BASE_URL,
  SUPPORTED_ENVIRONMENTS,
  resolveEnvironment,
} = require('./environment');

describe('resolveEnvironment', () => {
  it('defaults to the production SauceDemo environment', () => {
    assert.deepEqual(resolveEnvironment(), {
      name: 'prod',
      baseUrl: DEFAULT_BASE_URL,
    });
  });

  it('supports prod, stg, and preview with the shared initial URL', () => {
    for (const name of SUPPORTED_ENVIRONMENTS) {
      assert.deepEqual(resolveEnvironment({ targetEnvironment: name }), {
        name,
        baseUrl: 'https://www.saucedemo.com',
      });
    }
  });

  it('uses one base URL override for every environment', () => {
    assert.deepEqual(
      resolveEnvironment({
        targetEnvironment: 'preview',
        baseUrl: ' https://environment-url.example/ ',
      }),
      {
        name: 'preview',
        baseUrl: 'https://environment-url.example/',
      }
    );
  });

  it('rejects unsupported environment names', () => {
    assert.throws(
      () => resolveEnvironment({ targetEnvironment: 'qa' }),
      /Unsupported test environment "qa"\. Choose one of: prod, stg, preview\./
    );
  });
});
