// https://coderrocketfuel.com/article/recursively-list-all-the-files-in-a-directory-using-node-js

const fs = require("fs");
const path = require("path");

const getAllFiles = (dirPath, arrayOfFiles, fileExtension) => {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach((file) => {
    // If the "file" is a directory, recurse through the sub-directory finding all the files within the sub-directory
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(
        path.join(dirPath, "/", file),
        arrayOfFiles,
        fileExtension
      );
    } else {
      // If it is a file, compare if the file extension matches the file format parameter. If so, push it to the array
      if (file.substring(file.lastIndexOf(".") + 1) === fileExtension) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });

  return arrayOfFiles;
};

// Example usage
const result = getAllFiles(
  path.join(
    __dirname,
    "..",
    "node_modules",
    "uswds",
    "src",
    "components",
    "07-form"
  ),
  null,
  "njk"
);
console.log(result);

module.exports = {
  getAllFiles,
};
