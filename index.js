module.exports = async (origReplacements, test) => {
  // Make replacements into a list of it isn't one
  const replacements = (
    Array.isArray(origReplacements)
      ? origReplacements
      : [origReplacements]
  );

  // Swap for stubs
  replacements.forEach((replacement, i) => {
    const { dep, stub } = replacement;

    // Back up the dependency
    replacements[i].backup = dep.default;

    // Swap for the stub
    dep.default = stub;
  });

  // Run the code
  await test();

  // Put back the original values
  replacements.forEach((replacement) => {
    const { dep, backup } = replacement;
    dep.default = backup;
  });
};
