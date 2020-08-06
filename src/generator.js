const nunjucks = require("nunjucks");
const fs = require("fs");
const path = require("path");
const { type } = require("os");

/**
 * Generates a nunjucks template based on given parameters - Note: runs from root directory
 * @typedef {Function} generator
 * @returns {void}
 * @param {String} componentName The name of the react component
 * @param {String} content The content of the render return
 * @param {String} file The name of the output file (.jsx for React)
 * @param {String} outputPath The path where the output files will be created
 */
const generator = (componentName, content, file, outputPath) => {
  // Check if any parameters are not of type string
  if (
    typeof componentName !== "string" ||
    typeof content !== "string" ||
    typeof file !== "string" ||
    typeof outputPath !== "string"
  ) {
    throw "Error: All arguments must be of type string.";
  }

  // React template is located in ./templates
  nunjucks.configure("templates");
  const res = nunjucks.render("react.njk", { componentName, content });

  // Remove nunjucts santax in react component by chaining replace regular expressions
  const cleanResult = res
    // Clears all {%...end...%}
    .replace(/(\{%.end.*})|(\{%..end.*})/gm, "}")

    // Capture {%...if( and replace with if(
    .replace(/\{%.* if[^a-z]\(|\{%.* if[^a-z]|\{%\n..if/gm, "if (")

    //clears ending of if tag ) %}
    .replace(/\) %\}/gm, " ) {")

    //clears nested if statement (only if (... and ...) right now)
    .replace(/\) [^and].*%\}/gm, ") {")

    // Nunjucks 'for' syntax cleanse
    .replace(/{% for/gm, "for (")
    .replace(/%}/gm, ") {");

  // Create framework directory if it doesn't exist
  fs.mkdirSync(path.join(outputPath), { recursive: true }, (err) => {
    if (err) throw err;
  });

  // Write the output file to the specified directory
  fs.writeFile(path.join(outputPath, file), cleanResult, (err) => {
    if (err) {
      return console.log(err);
    }
  });
};

module.exports = {
  generator,
};
