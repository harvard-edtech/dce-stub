const rewiremock = require('rewiremock');

// Configuration:
rewiremock.overrideEntryPoint(module);

export default (filename, substitutions) => {
  const result = rewiremock.default.proxy(filename, substitutions);
  return result.default;
};
