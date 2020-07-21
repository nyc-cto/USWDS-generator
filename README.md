# USWDS-generator CLI

This command line interface generates components of a particular framework (React by default, but Vue and Angular will be added).

## Commands

| Command | Full Command | Description |
| --- | --- | --- |
| `-i <directory>` | `--input <directory>` | Specify the name of the folder that is used as input in the original USWDS project. This is optional and will point to ``uswds/src/components`` by default. If the option is specified, the CLI will handle whether the path specified is relative or absolute by using Node.js ``path.isAbsolute()`` and ``__dirname``. |
| `-o` | `--output` | Specify the name of the output file. This command is from an earlier version of the CLI and is still not an optional command at the moment (considered **deprecated**). |
| `-f <framework>` | `--framework <framework>` | Optional command to specify desired framework (will default to React if unspecified). Currently the framework we are working on is React. We will work on adding AngularJS/VueJS once ReactJS is as polished as possible. |
| `-v` | `--verbose` | Optional command that will print the configuration of the CLI options passed in: <ul><li>framework</li><li>inputDirectoryPath</li><li>isDefaultInputPathOverridden</li><li>verbose</li><li>cliUserInput</li><li>cliUserOutput</li></ul> |
| `-h` | `--help` | Display helpful messages next to all available commands, kind of like this readme. :smirk: |
| `-V` | `--version` | Display the version number. |

## Setting up the CLI

1. Clone the repo onto your machine with this command: `git clone https://github.com/nyc-cto/USWDS-generator.git` or if you want to specify your own repository name `git clone https://github.com/nyc-cto/USWDS-generator.git <repository name>`
2. Change directory to the git repo: `cd USWDS-generator` or ``cd <repository name>`` if a different name was specified in the last step.
3. Install any dependencies needed: `npm install`.
4. Run `npm run uswds-gen -- -V` to check your version.
5. You are ready to use the CLI!

## Running the CLI

We have a script you can call with npm run, and as of NodeJS Version 2.0.0 it is possible to pass custom arguments into your script that you specified in _scripts_ in _package.json_ using **--** Below is an example of how you would pass args to the CLI:

### Usage

```shell
npm run uswds-gen -- -v -o outFileName -f Vue
```
