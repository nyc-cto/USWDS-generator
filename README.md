# USWDS-generator CLI

This command line interface generates components of a particular JavaScript framework (React by default, but Vue and Angular will be added). The CLI takes a directory as input and will read all the `.jsx` file extensions. Based on configurations given to the `npm run uswds-gen` script, the program will normalize all options and use babel (`@babel/core`) to create an Abstract Syntax Tree (AST) that will transform, parse, and generate components to the given framework.

## Commands

| Command | Full Command | Description |
| --- | --- | --- |
| `-i <directory>` | `--input <directory>` | Specify the name of the input directory. This is optional and will point to ``uswds/src/components`` by default. If the option is specified, the CLI will handle whether the path specified is relative or absolute by using Node.js ``path.isAbsolute()`` and ``__dirname``. |
| `-o <directory>` | `--output <directory>` | Specify the name of the output directory. This is optional and will point to ``/dist/<framework>`` by default (react is the default if no framework is specified). If the option is specified, the CLI will handle whether the path specified is relative or absolute by using Node.js ``path.isAbsolute()`` and ``__dirname``. |
| `-f <framework>` | `--framework <framework>` | Optional command to specify desired framework (will default to React if unspecified). Angular and Vue are to be added in the future. |
| `-R` | `--no-resursive` | Optional command to disable recursive mode to search for files |
| `-v` | `--verbose` | Optional command that will print the configuration of the CLI options passed in: <ul><li>`framework`</li><li>`inputDirectoryPath`</li><li>`isDefaultInputPathOverridden`</li><li>`outputDirectoryPath`</li><li>`isDefaultOutputPathOverridden`</li><li>`recursive`</li><li>`isVerbose`</li><li>`cliUserInput`</li><li>`cliUserOutput`</li></ul> |
| `-h` | `--help` | Display helpful messages next to all available commands. |
| `-V` | `--version` | Display the version number. |

## Setting up the CLI

1. Clone this repository onto your machine with this command: `git clone https://github.com/nyc-cto/USWDS-generator.git` or if you want to specify your own repository name `git clone https://github.com/nyc-cto/USWDS-generator.git <repository name>`
2. Change directory to the git repository: `cd USWDS-generator` or ``cd <repository name>`` if a different name was specified in the last step.
3. Install any dependencies needed: `npm install`.
4. Run `npm run uswds-gen -- -V` to check your version.
5. You are ready to use the CLI!

## Running the CLI

A script is specified with npm run: `npm run uswds-gen`. As of NodeJS Version 2.0.0 it is possible to pass custom arguments into a script that is specified in the `scripts` field in `package.json` using `--` before passing arguments. Below are examples of how one would pass args to the CLI:

### Usage

```shell
# Script has defaults for every option:
# The input will default to uswds src/components/, output to dist/react, and the framework is react
npm run uswds-gen

# Use relative input directory and no output or framework specified (default to react)
npm run uswds-gen -- -i ./node_modules/uswds/src/components

# Use relative input directory, relative output directory, and vue framework
npm run uswds-gen -- -i ./src -o dist/vue -f vue

# Use relative input directory, absolute output directory, angular framework, and print configuration
npm run uswds-gen -- -i ./src -o C:/USWDS-generator/dist/angular -f angular -v

# Use absolute path for input and output, react framework, and print configuration
npm run uswds-gen -- -i C:/uswds/src/components -o C:/USWDS-generator/dist/react -f react -v
```
