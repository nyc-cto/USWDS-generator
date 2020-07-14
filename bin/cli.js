//PLACE -- AFTER SCRIPT NAME FOR ARGUMENTS IF USING "npm run uswds-gen"

var genFile = require("../src/generator");
const { program } = require("commander");
const fs = require("fs");
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
    console.log("Path to input file is ", program.input);
    console.log("Name of output file is ", program.output);
    //read file in the path given
    fs.readFile(program.input, (err, data) => {
      if (err) {
        throw err;
      }
      //convert to string
      data = data.toString();
      //store component name
      var componentName = data.substring(0, data.indexOf(" "));
      var content = data.substring(data.indexOf(" ")); //store jsx content
      genFile.generator(componentName, content, program.output + ".jsx"); //pass these to the generator function
    });
  }
  if (!program.framework) {
    console.log("Specified framework is React");
  } else {
    console.log("Specified framework is ", program.framework);
  }
} catch (e) {
  console.log(e);
}
