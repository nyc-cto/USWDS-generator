const path = require("path");

/**
 * Recieves a program object and returns a JSON Object for CLI options
 * @param {Object} program The program object given by the commander package
 * @returns {Object} The normalized configuration object
 */
const configure = (program) => {
  // CLI Framework option defaults to React if not given, and lowercases it
  const framework = program.framework ? program.framework.toLowerCase() : "react";

  // Determine if the default path option (-i) is overriden using Boolean() cast
  // (note: !!program.input provides the same result)
  const isDefaultInputPathOverridden = Boolean(program.input);

  // Do the same for the output directory path
  const isDefaultOutputPathOverridden = Boolean(program.output);

  /** @type {string} */
  let inputDirectoryPath;

  /** @type {string} */
  let outputDirectoryPath;

  /**
   * If no input option is provided, default to uswds components folder
   * Otherwise, use the provided input option depending on whether it's an absolute or relative path
   */
  if (!program.input) {
    // Default: Use dirname to point to the uswds components folder
    inputDirectoryPath = path.join(__dirname, "..", "node_modules", "uswds", "src", "components");
  } else {
    if (path.isAbsolute(program.input)) {
      // If the input path is absolute, use it without modification
      inputDirectoryPath = program.input;
    } else {
      // If the input path is relative, prepend the input with process.cwd()
      inputDirectoryPath = path.join(process.cwd(), program.input);
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
      // If the output path is relative, join it with process.cwd()
      outputDirectoryPath = path.join(process.cwd(), program.output);
    }
  }

  /**
   * Store CLI options in a JSON Object and return
   * @property {string} framework - framework specified by user (will default to React)
   * @property {string} inputDirectoryPath - path where template HTML component files are looked for
   * @property {Boolean} isDefaultInputPathOverridden - true if the default input path isn't used, false otherwise
   * @property {string} outputDirectoryPath - path where framework component files will be created
   * @property {Boolean} isDefaultOutputPathOverridden - true if the default output path isn't used, false otherwise
   * @property {Boolean} rescursive - Recursive read specified by user (default is true)
   * @property {Boolean} isVerbose - boolean to determine if the CLI should operate in verbose mode or not
   * @property {string} cliUserInput - input path originally passed into the CLI from user
   * @property {string} cliUserOutput - output path originally passed into the CLI from user
   */
  return {
    framework,
    inputDirectoryPath,
    isDefaultInputPathOverridden,
    outputDirectoryPath,
    isDefaultOutputPathOverridden,
    recursive: program.recursive,
    isVerbose: program.verbose,
    cliUserInput: program.input,
    cliUserOutput: program.output,
  };
};

module.exports = {
  configure,
};
