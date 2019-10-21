const rewiremock = require('rewiremock');

// Configuration:
rewiremock.overrideEntryPoint(module);

module.exports = (filename, substitutions) => {
  const result = rewiremock.proxy(filename, substitutions);
  return result.default;
};
