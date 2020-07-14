//PLACE -- AFTER SCRIPT NAME FOR ARGUMENTS IF USING "npm run uswds-gen"
//path to all USWDS components
const COMPS_PATH = "/home/john/Apps/uswds/src/components/";

const genFile = require("../src/generator");
const { program } = require("commander");
const fs = require("fs");
const path = require("path");
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
    console.log("Path to input file is ", COMPS_PATH + program.input);
    console.log("Name of output file is ", program.output);

    // Get names of all files in directory
    fs.readdir(
      path.join(COMPS_PATH, program.input),
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
              path.join(COMPS_PATH, program.input, "/", file.name),
              (err, data) => {
                if (err) {
                  throw err;
                }

                // The name of the file is the name of the component
                let componentName =
                  file.name.charAt(0).toUpperCase() +
                  file.name.substring(1, file.name.lastIndexOf("."));

                // camelCase the component if need be
                if (componentName.includes("-")) {
                  const sub = componentName.substring(
                    componentName.lastIndexOf("-")
                  );
                  const rpl = sub.charAt(1).toUpperCase() + sub.substring(2);
                  console.log("sub is ", sub);
                  console.log("rpl is ", rpl);
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
