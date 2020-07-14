const OUTPUT_PATH = "react/";

const nunjucks = require("nunjucks");
const fs = require("fs");
const path = require("path");

/**
 * Generates a nunjucks template based on given parameters - Note: runs from root directory
 * @param {String} componentName The name of the react component
 * @param {String} content The content of the render return
 * @param {String} file The name of the output file (.jsx for React)
 */
const generator = (componentName, content, file) => {
  // Check if any parameters are not of type string
  if (
    typeof componentName !== "string" ||
    typeof content !== "string" ||
    typeof file !== "string"
  ) {
    throw "Error: All arguments must be of type string.";
  }

  // React template is located in ./templates
  nunjucks.configure("templates");
  const res = nunjucks.render("react.njk", { componentName, content });

  //Remove nunjucts santax in react component by chaining replace regular expressions
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

  //create framework directory
  fs.mkdir("react", { recursive: true }, (err) => {
    if (err) throw err;
  });

  // Write the output file to the specified directory
  fs.writeFile(path.join(OUTPUT_PATH, file), cleanResult, (err) => {
    if (err) {
      return console.log(err);
    }
  });
};

// Example usage:
// generator("Button", '<button type="submit">Alert</button>', "output.jsx");

module.exports = {
  generator,
};
