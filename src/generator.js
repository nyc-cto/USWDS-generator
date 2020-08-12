const nunjucks = require("nunjucks");
const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");
const t = require("@babel/types");

/**
 * Generates a nunjucks template based on given parameters - Note: runs from root directory
 * @param {String} componentName The name of the react component
 * @param {String} content The content of the render return
 * @param {String} file The name of the output file (.jsx for React)
 * @param {String} outputPath The path where the output files will be created
 * @returns {void} void
 */
const generator = (componentName, content, file, outputPath) => {
  // Check if any parameters are not of type string
  if (
    typeof componentName !== "string" ||
    typeof content !== "string" ||
    typeof file !== "string" ||
    typeof outputPath !== "string"
  ) {
    throw new Error("Error: All arguments must be of type string.");
  }

  // React template is located in ./templates
  nunjucks.configure("templates");
  const res = nunjucks.render("react.njk", { componentName, content });

  /**
   * Use @babel/core transformSync() and @babel/plugin-transform-react-jsx
   * to transform components to pure JSX
   * https://babeljs.io/docs/en/next/babel-core.html
   * https://babeljs.io/docs/en/babel-plugin-transform-react-jsx/
   */
  const cleanResult = babel.transformSync(res, {
    plugins: [
      function transformJSX() {
        return {
          visitor: {
            // "path" is already defined in the upper scope, use "ipath" as alias
            AssignmentExpression(ipath) {
              // look for exports.nameOFTheComponent in the file
              if (
                ipath.get("left").isMemberExpression() &&
                ipath.get("left.object").isIdentifier({ name: "exports" }) &&
                ipath.get("left.property").isIdentifier({ name: componentName })
              ) {
                // Replace "exports.NameOfTheComponent =" with "function nameOFTheComponent"
                const func = ipath.get("right").node;
                ipath.parentPath.replaceWith(
                  t.functionDeclaration(t.identifier(componentName), func.params, func.body)
                );
              }
            },
            Identifier(ipath) {
              // Replace all instances of "config" with "props"
              if (ipath.isIdentifier({ name: "config" })) {
                ipath.node.name = "props";
              }
            },
          },
        };
      },
    ],
  });

  // Create framework directory if it doesn't exist
  fs.mkdirSync(path.join(outputPath), { recursive: true });

  // Write the output file to the specified directory
  fs.writeFileSync(path.join(outputPath, file), cleanResult.code);
};

module.exports = {
  generator,
};
