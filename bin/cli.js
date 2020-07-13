//PLACE -- AFTER SCRIPT NAME FOR ARGUMENTS IF USING "npm run uswds-gen"
//path to all USWDS components
const COMPS_PATH = "/home/john/Apps/uswds/src/components/";

const genFile = require("../src/generator");
const { program } = require("commander");
const fs = require("fs");
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
    //get names of all files in directory
    fs.readdir(
      COMPS_PATH + program.input,
      { withFileTypes: true },
      (err, files) => {
        if (err) {
          throw err;
        }
        console.log(files);
        for (let i = 0; i < files.length; i++) {
          //if a file in the directory ends in .njk
          if (
            files[i].name.substring(files[i].name.lastIndexOf(".")) === ".njk"
          ) {
            //read file in the path given
            fs.readFile(
              COMPS_PATH + program.input + "/" + files[i].name,
              (err, data) => {
                if (err) {
                  throw err;
                }
                //the name of the file is the name of the component
                let componentName =
                  files[i].name.charAt(0).toUpperCase() +
                  files[i].name.substring(1, files[i].name.lastIndexOf("."));
                //camelCase the component if need be
                if (componentName.includes("-")) {
                  const sub = componentName.substring(
                    componentName.lastIndexOf("-")
                  );
                  const rpl = sub.charAt(1).toUpperCase() + sub.substr(2);
                  console.log("sub is ", sub);
                  console.log("rpl is ", rpl);
                  componentName = componentName.replace(sub, rpl);
                }
                //console.log(componentName);
                const content = data.toString();
                genFile.generator(
                  componentName,
                  content,
                  files[i].name.substring(0, files[i].name.lastIndexOf(".")) +
                    ".jsx"
                );
              }
            );
          }
        }
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
