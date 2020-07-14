# USWDS-generator CLI

This command line interface will(when complete) generate components of a particular framework (React by default, but Vue and Angular will be added).

## Commands

**-i** or **--input** should specify the name of the folder in the original USWDS project. The CLI program has a variable that already points to the _src/components_ folder in the original USWDS project.(A different strategy such as an environment variable will likely be implemented later because different people have the repo in different locations on their computer)

**-o** or **--output** specify the name of the output file. This command will be outdated and should be removed once [this pull request](https://github.com/nyc-cto/USWDS-generator/pull/19) is merged. This command is from an earlier version of the CLI and is still not an optional command at the moment.

**-f** or **--framework** optional command to specify desired framework(should default to React if unspecified). Currently the framework we are working on is React. We will work on adding AngularJS/VueJS once ReactJS is as polished as possible.

**-h** or **--help** Display helpful messages next to all available commands, kind of like this readme :smirk:

**-V** **--version** Display version no.

## Setting up the CLI

1. Clone the repo onto your machine with this command: `git clone https://github.com/nyc-cto/USWDS-generator.git` "optional argument to name your directory"
2. Change directory to the git repo: `cd USWDS-generator` or replace USWDS-generator with whatever you named it if you did.
3. Install any dependencies needed: `npm install`.
4. Run `npm run uswds-gen -- -V` to check your version.
5. If your version is 0.1 or less, the functionality to create .jsx from the USWDS _components_ directory isn't yet available, it will be soon.
6. Otherwise if you have version 0.2 you can try an example call like the one at the bottom of this readme, see if a _react_ folder gets created with .jsx files inside named the same as the .njk files from the USWDS _components_ directory.
7. If it doesn't seem to work, you may need to edit the **COMPS_PATH** variable in _cli.js_ so it has access to your specific location of the original USWDS repo and its _src/components_ folder.

## Running the CLI

We have a script you can call with npm run, and as of NodeJS Version 2.0.0 it is possible to pass custom arguments into your script that you specified in _scripts_ in _package.json_ using **--** Below is an example of how you would pass args to the CLI:

**Example call:** npm run uswds-gen -- -i 01-type -o outFileName -f Vue
