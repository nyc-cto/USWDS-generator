//PLACE -- AFTER SCRIPT NAME FOR ARGUMENTS IF USING "npm run uswds-gen"

const genFile = require("../src/generator");
const { program } = require("commander");
const fs = require("fs");
const path = require("path");
const process = require("process");
const config = require("./config");
program.version("0.1");

program
  .option("-i, --input <path>", "specified path of input file")
  .option("-o, --output <name>", "name of output file to be created")
  .option(
    "-f, --framework <type>",
    "framework specified(should default to React) "
  )
  .option("-v, --verbose", "verbose mode logs configuration");
program.parse(process.argv);

const configuration = config.configureAndValidate(program);

if (configuration.isVerbose) {
  console.log(configuration);
}

try {
  if (configuration.cliUserOutput) {
    // Get names of all files in directory
    fs.readdir(
      configuration.inputDirectoryPath,
      { withFileTypes: true },
      (err, files) => {
        if (err) {
          throw err;
        }
        console.log(files);

        files.forEach((file) => {
          // If a file in the directory ends in .njk
          if (file.name.substring(file.name.lastIndexOf(".")) === ".njk") {
            // Read file in the path given
            fs.readFile(
              path.join(configuration.inputDirectoryPath, file.name),
              (err, data) => {
                if (err) {
                  throw err;
                }

                // The name of the component is the name of the file
                let componentName =
                  // Uppercase the first letter of the file name
                  file.name.charAt(0).toUpperCase() +
                  // And then add the rest of the file name up until the '.'
                  file.name.substring(1, file.name.lastIndexOf("."));

                /**
                 * PascalCase the component name if need be
                 * If the name of the file includes a '-', store a substring starting from '-' up until the end of the file name
                 */
                if (componentName.includes("-")) {
                  const sub = componentName.substring(
                    componentName.lastIndexOf("-")
                  );

                  // Then uppercase the letter right after the '-' and add along the rest of the characters and store that in another variable
                  const rpl = sub.charAt(1).toUpperCase() + sub.substring(2);
                  console.log("sub is ", sub);
                  console.log("rpl is ", rpl);

                  // Then use the replace method to replace the string with the hyphen with the one without the hyphen and store it
                  componentName = componentName.replace(sub, rpl);
                }

                const content = String(data);
                genFile.generator(
                  componentName,
                  content,
                  `${file.name.substring(0, file.name.lastIndexOf("."))}.jsx`
                );
              }
            );
          }
        });
      }
    );
  }
} catch (e) {
  console.log(e);
}
