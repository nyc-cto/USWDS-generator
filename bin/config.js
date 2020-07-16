const path = require("path");

/**
 * Invokes the validation and configuration of the CLI options object
 * @param {Object} program
 */
const configureAndValidate = (program) => {
  return validate(configure(program));
};

/**
 * Returns a JSON Object for CLI options
 * @param {Object} program
 */
const configure = (program) => {
  // CLI Framework option defaults to React if not given
  const framework = program.framework ? program.framework : "React";

  // Store the full path in a string
  const fullPath = path.join(
    __dirname,
    "..",
    "node_modules",
    "uswds",
    "src",
    "components",
    program.input
  );

  // Store CLI options in a JSON Object and return
  return {
    framework,
    fullPath,
    input: program.input,
    output: program.output,
  };
};

/**
 * Validates the object by checking if both input and output are defined
 * @param {Object} configObject
 */
const validate = (configObject) => {
  if (!configObject.input) {
    throw "Input file path must be specified!";
  }
  if (!configObject.output) {
    throw "An output file name must be specified!";
  }

  return configObject;
};

module.exports = {
  configureAndValidate,
  validate,
  configure,
};
