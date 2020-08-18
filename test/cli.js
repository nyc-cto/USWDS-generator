const fs = require("fs");
const path = require("path");
const { expect } = require("chai");

const { cli } = require("../src/cli");

const directoryPath = path.join(__dirname, "temp-cli");

/**
 * Returns a path prepended with `directoryPath`
 * @param {...String} paths The array containing the path
 */
const testPath = (...paths) => {
  return path.join(directoryPath, ...paths);
};

// Variables to hold JSX files
const button = `exports.Button = function(config) {
  return (
    <button
      class={\`usa-button \${config.class}\`}
      autofocus={config.autofocus}
      disabled={config.disabled}
      name={config.name}
      type={config.type}
      value={config.value}
    >
      {config.innerText}
    </button>
  );
};`;

const label = `exports.Label = function (config) {
  return (
    <label class={\`usa-label \${config.class}\`} for={config.for}>
      {config.innerText}
    </label>
  );
};`;

describe("cli()", function () {
  before(function (done) {
    /**
     * File structure (before invoking any generator):
     * temp-cli
     * ├───dist
     * │   ├───angular
     * │   ├───react
     * │   └───vue
     * │
     * └───src
     *        Button.jsx
     *        Button.njk
     *        Label.html
     *        Label.jsx
     */

    // temp-cli directory files and directories
    fs.mkdirSync(directoryPath, { recursive: true });

    // temp-cli/src directory files and directories
    fs.mkdirSync(testPath("src"), { recursive: true });

    fs.writeFileSync(testPath(path.join("src", "Button.jsx")), button);
    fs.writeFileSync(testPath(path.join("src", "Label.jsx")), label);

    // temp-cli/src files that are not `.jsx`
    fs.writeFileSync(testPath(path.join("src", "Button.njk")), button);
    fs.writeFileSync(testPath(path.join("src", "Label.html")), label);

    // temp-cli/dist/react directory
    fs.mkdirSync(testPath(path.join("dist", "react")), { recursive: true });

    // temp-cli/dist/vue directory
    fs.mkdirSync(testPath(path.join("dist", "vue")), { recursive: true });

    // temp-cli/dist/angular directory
    fs.mkdirSync(testPath(path.join("dist", "angular")), { recursive: true });

    // temp-cli/example directory
    fs.mkdirSync(testPath("example"), { recursive: true });

    done();
  });

  describe("Should not error and return the correct configuration and output", function () {
    it("Should create two `.jsx` files in the `dist/vue` directory", function (done) {
      const expectedFiles = ["Button.jsx", "Label.jsx"];

      const argv = [
        "node",
        path.join(__dirname, "..", "bin", "uswds-gen.js"),
        "-i",
        path.join(directoryPath, "src"),
        "-o",
        path.join(directoryPath, "dist", "vue"),
        "-f",
        "Vue",
      ];
      cli(argv);

      fs.readdir(path.join(directoryPath, "dist", "vue"), { withFileTypes: true }, (err, files) => {
        if (err) {
          throw err;
        }

        const fileNames = [];
        files.forEach((file) => fileNames.push(file.name));

        expect(fileNames).deep.to.equal(expectedFiles);
      });

      done();
    });

    it("Should create two `.jsx` files in the `dist/react` directory with default framework", function (done) {
      const expectedFiles = ["Button.jsx", "Label.jsx"];

      const argv = [
        "node",
        path.join(__dirname, "..", "bin", "uswds-gen.js"),
        "-i",
        path.join(directoryPath, "src"),
        "-o",
        path.join(directoryPath, "dist", "react"),
      ];
      cli(argv);

      fs.readdir(
        path.join(directoryPath, "dist", "react"),
        { withFileTypes: true },
        (err, files) => {
          if (err) {
            throw err;
          }

          const fileNames = [];
          files.forEach((file) => fileNames.push(file.name));

          expect(fileNames).deep.to.equal(expectedFiles);
        }
      );

      done();
    });

    it("Should create zero `.jsx` files in the `dist/angular` directory", function (done) {
      const expectedFiles = [];

      const argv = [
        "node",
        path.join(__dirname, "..", "bin", "uswds-gen.js"),
        "-i",
        path.join(directoryPath, "example"),
        "-o",
        path.join(directoryPath, "dist", "angular"),
        "-f",
        "Angular",
      ];
      cli(argv);

      fs.readdir(
        path.join(directoryPath, "dist", "angular"),
        { withFileTypes: true },
        (err, files) => {
          if (err) {
            throw err;
          }

          const fileNames = [];
          files.forEach((file) => fileNames.push(file.name));

          expect(fileNames).deep.to.equal(expectedFiles);
        }
      );

      done();
    });
  });

  after(function (done) {
    fs.rmdir(directoryPath, { recursive: true }, (err) => {
      if (err) throw err;
    });
    done();
  });
});
