#! /bin/cli.js
//PLACE -- AFTER SCRIPT NAME FOR ARGUMENTS IF USING "npm run uswds-gen"

const { program } = require("commander");
program.version("0.0.1");

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
  if (program.input) {
    console.log("Path to input file is ", program.input);
  }
  if (program.output) {
    console.log("Name of output file is ", program.output);
  }
  if (!program.framework) {
    console.log("Specified framework is React");
  } else {
    console.log("Specified framework is ", program.framework);
  }
} catch (e) {
  console.log(e);
}
