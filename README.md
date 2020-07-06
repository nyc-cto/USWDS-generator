
# USWDS-generator
A CLI to automatically generate framework components from the US Web Design System

## Why?
There is a lot of copy/paste of HTML involved in the USWDS, which leads to difficult refactoring if and when it is needed.

Libraries exist that implement USWDS in various frameworks (React, Angular, etc). However, most of these are abandoned, or not fully up to date.

This component generator aims to build a CLI tool that takes the USWDS and automatically generates componentized versions of each element in the design system.

## What it's not:
It is not currently a goal of this project to generate "controlled" components, components that manage their own state, or components that have full lifecylce function integration. The initial goal is only to enable automatic wrapping of the HTML into convenience components to make the design system more straightforward to implement and/or prototype with.

## Architecture:
 - Templates: Every USWDS component has a machine readable template built with Nunjucks or Twig (TBD) that can be maintained with minimal effort by someone unfamiliar with any JavaScript frameworks
 - Parser: When invoked, a Parser goes through the whole USWDS GitHub project, identifies each component template in the project, identifies each template variable in the template and passes an input object into each of the generator(s)
 - Generators: A generator exists for each output framework (initially React, WebComponents, Angular, VueJS in that order), takes in the parsed object, and wraps it in framework-specific code needed for a component.
 - Tests: Every generator must have sufficient tests to cover core and edge cases for typical components.
 - Command Line User Interface: when the CLI is run, a user should be prompted with questions such as css namespace (usa), frameworks to compile (all), output folder (dist)

## Inputs:
 - USWDS GitHub URL, USWDS file system, or a single USWDS component folder, which contains one or more Component.njk or Component.twig files

## Outputs:
 - An output folder containing one folder for each of the generated frameworks. The folder name should match the framework name, in lowercase.
 - Each framework folder should contain exactly one folder for each component. The folder name should match the component name, following the folder naming best practices for the framework, else use PascalCase.
 - Each component folder should contain exactly on file with an appropriate extension for that framework. The file name should match the exported component name, following the file naming best practices for the framework, else use PascalCase.

## Targets:
 1. Generate a single React stateless functional component from a single HTML template
 2. Generate the entire USWDS in React components given a source folder (i.e. can run against a local copy of USWDS)
 3. Generate the entire USWDS in React components given the GitHub project URL (i.e. can run against a remote copy of USWDS)
 4. Write tests for the Parser and Generator (if it hasn't already been done along the way)
 7. Write an interactive CLI prompt
 8. Trigger a re-build of the hosted frameworks once per week (stretch goal: trigger whenever the USWDS repository is updated).
 4. Generate a single WebComponent from a single HTML template
 5. Generate the entire USWDS in WebComponents from the GitHub project URL
 6. Repeat for Angular, VueJS

## Style Guide:
 - Use standard ES6, unless the framework you are working with requires/encourages something else
 - Follow AirBnB's style guides https://github.com/airbnb/javascript/ (use their specific guides where they apply)

## Git workflow:
 - When working on a story, create a branch with the same name as the story
 - Use meaningful commit messages on every commit!
 - When you are ready to merge
   - Pull Master into your local branch
   - Resolve any conflicts
   - Push your local branch to Origin
   - Create a Pull Request on the GitHub repository
 - Maintainer(s) will review and optionally give feedback on your code
 - Resolve any comments on your Pull Request
 - Maintainer(s) will merge your Pull Request when all comments have been satisfactorily resolved
 - The story branch will be deleted for keep the tree clean
