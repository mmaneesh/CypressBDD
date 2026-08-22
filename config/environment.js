const DEFAULT_BASE_URL = 'https://www.saucedemo.com';
const SUPPORTED_ENVIRONMENTS = Object.freeze(['prod', 'stg', 'preview']);

function resolveEnvironment({ targetEnvironment = 'prod', baseUrl } = {}) {
  if (!SUPPORTED_ENVIRONMENTS.includes(targetEnvironment)) {
    throw new Error(
      `Unsupported test environment "${targetEnvironment}". Choose one of: ${SUPPORTED_ENVIRONMENTS.join(', ')}.`
    );
  }

  const configuredBaseUrl = baseUrl?.trim();

  return {
    name: targetEnvironment,
    baseUrl: configuredBaseUrl || DEFAULT_BASE_URL,
  };
}

module.exports = {
  DEFAULT_BASE_URL,
  SUPPORTED_ENVIRONMENTS,
  resolveEnvironment,
};
