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
  before(async function () {
    /**
     * File structure (before invoking any generator):
     * temp-cli
     * ├───dist
     * │   ├───angular
     * │   ├───react
     * │   └───vue
     * ├───docs
     * │       pull_request_template.md
     * │
     * ├───example
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

    // temp-cli/docs directory
    fs.mkdirSync(testPath("docs"), { recursive: true });

    // temp-cli/docs files that are not `.jsx`
    fs.writeFileSync(testPath(path.join("docs", "pull_request_template.md")), "# PR Template");
  });

  describe("Should not error and return the correct configuration and output", function () {
    it("Should create two `.jsx` files in the `dist/vue` directory from `src/`", async function () {
      /**
       * Creating directories and writing files take ~300-400ms.
       * Mocha warns and provides a red warning for a slow test.
       * However, our before() hook handles this and is intentional,
       * therefore, we tell mocha this is okay using `this.slow()`
       */
      this.slow(500);

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
      await cli(argv);

      fs.readdir(path.join(directoryPath, "dist", "vue"), { withFileTypes: true }, (err, files) => {
        if (err) {
          throw err;
        }

        const fileNames = [];
        files.forEach((file) => fileNames.push(file.name));

        expect(fileNames).deep.to.equal(expectedFiles);
      });
    });

    it("Should create two `.jsx` files in the `dist/react` directory with default framework from `src/`", async function () {
      const expectedFiles = ["Button.jsx", "Label.jsx"];

      const argv = [
        "node",
        path.join(__dirname, "..", "bin", "uswds-gen.js"),
        "-i",
        path.join(directoryPath, "src"),
        "-o",
        path.join(directoryPath, "dist", "react"),
      ];
      await cli(argv);

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
    });

    it("Should create zero `.jsx` files in the `dist/angular` directory from `example/`", async function () {
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
      await cli(argv);

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
    });

    it("Should create zero `.jsx` files in the `dist/angular` directory from `docs/`", async function () {
      const expectedFiles = [];

      const argv = [
        "node",
        path.join(__dirname, "..", "bin", "uswds-gen.js"),
        "-i",
        path.join(directoryPath, "docs"),
        "-o",
        path.join(directoryPath, "dist", "angular"),
        "-f",
        "Angular",
      ];
      await cli(argv);

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
    });
  });

  after(async function () {
    await fs.rmdir(directoryPath, { recursive: true }, (err) => {
      if (err) throw err;
    });
  });
});
