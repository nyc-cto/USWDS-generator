const assert = require("assert");
const fs = require("fs");
const path = require("path");
const searchFiles = require("../src/searchFiles");
const { expect } = require("chai");

const directoryPath = path.join(__dirname, "temp");

describe("File Search", function () {
  before(function (done) {
    /**
     * File structure:
     * temp
     * │   blob.txt
     * │   javascript.js
     * │   words.txt
     * │
     * ├───emptyDir
     * └───innerDir
     *     │   inner.js
     *     │   inner.txt
     *     │
     *     └───src
     *         │   init.py
     *         │
     *         └───components
     *                 app.py
     */

    // temp directory files and directories
    fs.mkdirSync(directoryPath, { recursive: true }, function (err) {
      if (err) throw err;
    });

    fs.writeFileSync(path.join(directoryPath, "words.txt"), "Words file", function (err) {
      if (err) throw err;
    });

    fs.writeFileSync(path.join(directoryPath, "blob.txt"), "Blob file", function (err) {
      if (err) throw err;
    });

    fs.writeFileSync(path.join(directoryPath, "javascript.js"), "JS file", function (err) {
      if (err) throw err;
    });

    // temp/empty directory files and directories
    fs.mkdirSync(path.join(directoryPath, "emptyDir"), { recursive: true }, function (err) {
      if (err) throw err;
    });

    // temp/innerDir directory files and directories
    fs.mkdirSync(path.join(directoryPath, "innerDir"), { recursive: true }, function (err) {
      if (err) throw err;
    });

    fs.writeFileSync(path.join(directoryPath, "innerDir", "inner.txt"), "Inner", function (err) {
      if (err) throw err;
    });

    fs.writeFileSync(path.join(directoryPath, "innerDir", "inner.js"), "Inner", function (err) {
      if (err) throw err;
    });

    // temp/innerDir/src/components files and directories
    fs.mkdirSync(
      path.join(directoryPath, "innerDir", "src", "components"),
      { recursive: true },
      function (err) {
        if (err) throw err;
      }
    );

    fs.writeFileSync(
      path.join(directoryPath, "innerDir", "src", "components", "app.py"),
      "import math",
      function (err) {
        if (err) throw err;
      }
    );

    fs.writeFileSync(
      path.join(directoryPath, "innerDir", "src", "init.py"),
      "import sys",
      function (err) {
        if (err) throw err;
      }
    );

    done();
  });

  describe("Should return the correct file paths in the `temp/` directory", function () {
    it("Should return 3 `temp/` file paths with the file extension `txt`", function (done) {
      // Create an array for the expected result
      const expectedResult = [];
      expectedResult.push(
        path.join(directoryPath, "blob.txt"),
        path.join(directoryPath, "innerDir", "inner.txt"),
        path.join(directoryPath, "words.txt")
      );

      // Invoke the searchFiles function to test
      const result = searchFiles.searchFiles("txt", directoryPath);

      // Conduct a deep comparison to compare indices
      expect(expectedResult).deep.to.equal(result);
      done();
    });

    it("Should return 2 `temp/` file paths with the file extension `js`", function (done) {
      // Create an array for the expected result
      const expectedResult = [];
      expectedResult.push(
        path.join(directoryPath, "innerDir", "inner.js"),
        path.join(directoryPath, "javascript.js")
      );

      // Invoke the searchFiles function to test
      const result = searchFiles.searchFiles("js", directoryPath);

      // Conduct a deep comparison to compare indices
      expect(expectedResult).deep.to.equal(result);
      done();
    });

    it("Should return 2 `temp/` file paths with the file extension `py`", function (done) {
      // Create an array for the expected result
      const expectedResult = [];
      expectedResult.push(
        path.join(directoryPath, "innerDir", "src", "components", "app.py"),
        path.join(directoryPath, "innerDir", "src", "init.py")
      );

      // Invoke the searchFiles function to test
      const result = searchFiles.searchFiles("py", directoryPath);

      // Conduct a deep comparison to compare indices
      expect(expectedResult).deep.to.equal(result);
      done();
    });

    it("Should return 1 `temp/innerDir/` file path with the file extension `txt`", function (done) {
      // Create an array for the expected result
      const expectedResult = [];
      expectedResult.push(path.join(directoryPath, "innerDir", "inner.txt"));

      // Invoke the searchFiles function to test
      const result = searchFiles.searchFiles("txt", path.join(directoryPath, "innerDir"));

      // Conduct a deep comparison to compare indices
      expect(expectedResult).deep.to.equal(result);
      done();
    });

    it("Should return 0 `temp/innerDir/src` file paths with the file extension `txt`", function (done) {
      // Create an array for the expected result
      const expectedResult = [];

      // Invoke the searchFiles function to test
      const result = searchFiles.searchFiles("txt", path.join(directoryPath, "innerDir", "src"));

      // Conduct a deep comparison to compare indices
      expect(expectedResult).deep.to.equal(result);
      done();
    });

    it("Should return 1 `temp/innerDir/src/components` file paths with the file extension `py`", function (done) {
      // Create an array for the expected result
      const expectedResult = [];
      expectedResult.push(path.join(directoryPath, "innerDir", "src", "components", "app.py"));

      // Invoke the searchFiles function to test
      const result = searchFiles.searchFiles(
        "py",
        path.join(directoryPath, "innerDir", "src", "components")
      );

      // Conduct a deep comparison to compare indices
      expect(expectedResult).deep.to.equal(result);
      done();
    });

    it("Should return 0 `temp/emptyDir` file paths with the file extension `cpp`", function (done) {
      // Create an array for the expected result
      const expectedResult = [];

      // Invoke the searchFiles function to test
      const result = searchFiles.searchFiles("cpp", path.join(directoryPath, "emptyDir"));

      // Conduct a deep comparison to compare indices
      expect(expectedResult).deep.to.equal(result);
      done();
    });
  });

  after(function (done) {
    fs.rmdirSync(directoryPath, { recursive: true });
    done();
  });
});
