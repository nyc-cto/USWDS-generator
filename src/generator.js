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

  //Remove nunjucts santax in react component
  //nunjucks 'if' syntax cleanse
  let rez = res
  let clearEnd =rez.replace(/(\{%.end.*})|(\{%..end.*})/gm, "}")// clears all {%...end...%}
  let cleanIf = clearEnd.replace(/\{%.* if[^a-z]\(|\{%.* if[^a-z]|\{%\n..if/gm, "if (")//capture {%...if( and replace with if(
  let cleanIfMore = cleanIf.replace(/\) %\}/gm, " ) {")//clears ending of if tag ) %}
  let cleanInnerIf = cleanIfMore.replace(/\) [^and].*%\}/gm, ") {")//clears nested if statement (only if (... and ...) right now)
  

  //nunjucks 'for' syntax cleanse
  let cleanFor=cleanInnerIf.replace(/{% for/gm,"for (")
  let cleanForEnd=cleanFor.replace(/%}/gm,") {") 
  //console.log("Clean Nunjucks:  "+cleanInnerIf)//test 

  //create framework directory
  fs.mkdir("react", { recursive: true }, (err) => {
    if (err) throw err;
  });

  // Write the output file to the specified directory
  fs.writeFile(path.join(OUTPUT_PATH, file), cleanForEnd, (err) => {
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
