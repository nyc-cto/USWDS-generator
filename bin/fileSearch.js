// https://coderrocketfuel.com/article/recursively-list-all-the-files-in-a-directory-using-node-js

const fs = require("fs");
const path = require("path");

/**
 * Find all files with a given file extension
 * @param {String} directoryPath The directory to search in
 * @param {String} fileExtension The file extension (e.g. ".njk")
 */
const searchFiles = (directoryPath, fileExtension) => {
  // Recursive inner function that performs the search and appends to the array
  const getAllFiles = (directoryPath, arrayOfFiles = []) => {
    const files = fs.readdirSync(directoryPath);

    files.forEach((file) => {
      const filePath = path.join(directoryPath, "/", file);
      // If the "file" is a directory, recurse through the sub-directory finding all the files within the sub-directory
      if (fs.statSync(filePath).isDirectory()) {
        getAllFiles(filePath, arrayOfFiles);
      } else {
        // If it is a file, compare if the file extension matches the file format parameter. If so, push it to the array
        if (file.substring(file.lastIndexOf(".") + 1) === fileExtension) {
          arrayOfFiles.push(filePath);
        }
      }
    });

    return arrayOfFiles;
  };

  return getAllFiles(directoryPath);
};

// Example usage
const result = searchFiles(
  path.join(
    __dirname,
    "..",
    "node_modules",
    "uswds",
    "src",
    "components",
    "07-form"
  ),
  "njk"
);
console.log(result);

module.exports = {
  searchFiles,
};
