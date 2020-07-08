const OUTPUT_PATH = "dist/react/";

const nunjucks = require("nunjucks");
const fs = require("fs");
const path = require("path");

/**
 * Generates a nunjucks template based on given parameters - Note: runs from root directory
 * @param {String} componentName The name of the react component
 * @param {String} content The content of the render return
 * @param {String} file The name of the output file
 */
const generator = (componentName, content, file) => {
    // Check if any parameters are not of type string
    if (typeof componentName !== 'string' || typeof content !== 'string' || typeof file !== 'string') {
        throw "Error: All arguments must be of type string.";
    }

    // React template is located in ./templates
    nunjucks.configure("templates");
    const res = nunjucks.render(
        "react.njk",
        { componentName, content }
    );

    // Write the output file to the specified directory
    fs.writeFile(path.join(OUTPUT_PATH, file), res, (err) => {
      if (err) {
          return console.log(err)
      };
    });
}

// Example usage:
// generator("Button", '<button type="submit">Alert</button>', "output.njk");

module.exports = {
    generator
};
