import rewiremock from 'rewiremock';

// Configuration:
rewiremock.overrideEntryPoint(module);

export default (...args) => {
  const result = rewiremock.proxy(...args);
  return result.default;
};
