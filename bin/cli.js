//PLACE -- AFTER SCRIPT NAME FOR ARGUMENTS IF USING "npm run uswds-gen"
//path to all USWDS components

const genFile = require("../src/generator");
const { program } = require("commander");
const fs = require("fs");
const path = require("path");
const process = require("process");
program.version("0.1");

program
  .option("-i, --input <path>", "specified path of input file")
  .option("-o, --output <name>", "name of output file to be created")
  .option(
    "-f, --framework <type>",
    "framework specified(should default to React) "
  );
program.parse(process.argv);

try {
  if (!program.input) {
    throw "Input file path must be specified!";
  }
  if (!program.output) {
    throw "An output file name must be specified!";
  }
  if (program.input && program.output) {
    // console.log("Path to input file is ", COMPS_PATH + program.input);
    console.log("Name of output file is ", program.output);

    // Get names of all files in directory
    fs.readdir(
      path.join(
        __dirname,
        "..",
        "node_modules",
        "uswds",
        "src",
        "components",
        program.input
      ),
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
              path.join(
                __dirname,
                "..",
                "node_modules",
                "uswds",
                "src",
                "components",
                program.input,
                file.name
              ),
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
    // fs.readFile(COMPS_PATH + program.input, (err, data) => {
    //   if (err) {
    //     throw err;
    //   }
    //   //store component name
    //   const componentName = data.substring(0, data.lastIndexOf(" "));
    //   const content = data.substring(data.lastIndexOf(" ")); //store jsx content
    //   genFile.generator(componentName, content, program.output + ".jsx"); //pass these to the generator function
    // });
  }
  if (!program.framework) {
    console.log("Specified framework is React");
  } else {
    console.log("Specified framework is ", program.framework);
  }
} catch (e) {
  console.log(e);
}
