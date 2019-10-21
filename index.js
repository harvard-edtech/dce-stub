import rewiremock from 'rewiremock';

// Configuration:
rewiremock.overrideEntryPoint(module);

export default (filename, substitutions) => {
  const result = rewiremock.proxy(filename, substitutions);
  return result.default;
};
