const path = require("path");

// /**
//  * Invokes the validation and configuration of the CLI options object
//  * @param {Object} program
//  */
// const configureAndValidate = (program) => {
//   return validate(configure(program));
// };

/**
 * Returns a JSON Object for CLI options
 * @param {Object} program
 */
const configure = (program) => {
  // CLI Framework option defaults to React if not given
  const framework = program.framework ? program.framework : "react";

  // Determine if the default path option (-i) is overriden using Boolean() cast (note: !!program.input provides the same result)
  const isDefaultInputPathOverridden = Boolean(program.input);

  //Do the same for the output directory path
  const isDefaultOutputPathOverridden = Boolean(program.output);

  let inputDirectoryPath, outputDirectoryPath;

  /**
   * If no input option is provided, default to uswds components folder
   * Otherwise, use the provided input option depending on whether it's an absolute or relative path
   */
  if (!program.input) {
    // Default: Use dirname to point to the uswds components folder
    inputDirectoryPath = path.join(
      __dirname,
      "..",
      "node_modules",
      "uswds",
      "src",
      "components"
    );
  } else {
    if (path.isAbsolute(program.input)) {
      // If the input path is absolute, use it without modification
      inputDirectoryPath = program.input;
    } else {
      // If the input path is relative, prepend the input with the gloval variable __dirname
      inputDirectoryPath = path.join(
        __dirname,
        "..",
        "node_modules",
        "uswds",
        "src",
        "components",
        program.input
      );
    }
  }

  // If no output path is specified, it will default to dist/<whatever framework was specified, React by default>
  if (!program.output) {
    outputDirectoryPath = path.join(__dirname, "..", "dist", framework);
  } else {
    if (path.isAbsolute(program.output)) {
      // If output path is absolute, use it as is
      outputDirectoryPath = program.output;
    } else {
      // If the output path is relative, join it with the __dirname global variable
      outputDirectoryPath = path.join(__dirname, "..", program.output);
    }
  }

  // Store CLI options in a JSON Object and return
  return {
    framework,
    inputDirectoryPath,
    isDefaultInputPathOverridden,
    outputDirectoryPath,
    isDefaultOutputPathOverridden,
    isVerbose: program.verbose,
    cliUserInput: program.input,
    cliUserOutput: program.output,
  };
};

// /**
//  * Validates the object by checking if output is defined
//  * @param {Object} configObject
//  */
// const validate = (configObject) => {
//   if (!configObject.cliUserOutput) {
//     throw "An output file name must be specified!";
//   }

//   return configObject;
// };

module.exports = {
  // configureAndValidate,
  // validate,
  configure,
};
