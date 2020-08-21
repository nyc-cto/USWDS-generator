const fs = require("fs");
const path = require("path");
const { program } = require("commander");

const config = require("./config");
const generator = require("./generator");
const { searchFiles } = require("./searchFiles");

/**
 * Process command line arguments and invoke configuration and generation
 * @param {String[]} argv The array for running the uswds-gen script
 * @example
 *   npm run uswds-gen
 *   npm run uswds-gen -- -i ./src -o dist/vue -f vue
 *   npm run uswds-gen -- -i ./src -o dist/angular -f angular -v
 * @returns {void} void
 */
const cli = async (argv) => {
  program.version("0.2");

  program
    .option("-i, --input <directory path>", "specified input directory path")
    .option("-o, --output <directory path>", "specified output directory path to be created")
    .option("-f, --framework <framework>", "specified framework (default is React)")
    .option("-R, --no-recursive", "only generate files from current directory")
    .option("-v, --verbose", "verbose mode logs configuration");
  program.parse(argv);

  const configuration = config.configure(program);

  if (configuration.isVerbose) {
    console.log(configuration);
  }

  try {
    /**
     * If the recursive option is passed in:
     * Use searchFiles() to find all file paths recursively.
     * Otherwise, use fs.readdirSync to find all files in root directory.
     */
    let files = [];
    if (configuration.recursive) {
      // Get file paths of all files in a directory with given file extension
      files = searchFiles("jsx", configuration.inputDirectoryPath);
    } else {
      files = fs.readdirSync(configuration.inputDirectoryPath);
    }

    files.forEach((file) => {
      let data;
      if (configuration.recursive) {
        data = fs.readFileSync(file);
      } else if (!configuration.recursive && path.extname(file) === ".jsx") {
        // If a file extension is "jsx", Read file in the path given
        data = fs.readFileSync(path.join(configuration.inputDirectoryPath, file));
      } else {
        return;
      }

      /**
       * Contents of the file
       * @type {string}
       */
      const content = String(data);

      // Index of the component name is after "exports.", which is 8 characters
      const componentIndex = content.indexOf("exports.") + 8;

      // End index of the component name is the first instance of white space, e.g. "Button "
      const componentEndIndex = content.indexOf(" ", componentIndex);
      const componentName = content.substring(componentIndex, componentEndIndex);

      generator.generator(componentName, content, path.basename(file), configuration);
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  cli,
};
