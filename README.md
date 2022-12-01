# Getting started with Leaning App

## Domains

- https://learning.app.radiumrocket.com Production (master)
- https://uat.learning.app.radiumrocket.com UAT (uat)
- https://test.learning.app.radiumrocket.com Test (test)
- https://dev.learning.app.radiumrocket.com Develop (develop)

## Features

**TODO**: Add libraries when they are fully integrated

- 🏗 Built with [React](https://reactjs.org/)
- 🚨 Testing powered by [jest](https://jestjs.io/docs/getting-started)

## Set up environment

Before installing the dependencies and running start the project, follow the next steps:

1. Install [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) in case of not have it
2. Run `nvm install && nvm use && node -v` to use the node version defined on `.nvmrc` file
3. Run `yarn` to install all the node dependencies
4. Intall `Java JDK 1.8` to be able to run the allure reports

## Available Scripts

In the project directory, you can run:

- Run `yarn start` to run the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- Run `yarn test` to run all tests.
- Run `yarn wdio-test` to run all the automation tests.
- Run `yarn allure-report` to run the reports
- Run `yarn build` to create a production build.
- Run `yarn lint` to check the lint.
- Run `yarn lint:fix` to fix all the lint issues and format with prettier.

## Basic structure and configurations

```
src/                  // Container to other folders with the source code of the app
  components/         // App components
    layout/           // layout for the different pages
    pages/            // page components
      index.ts        // export all the page components
    shared/           // components that are being used on the entire app
      common/         // app components
        index.ts      // export all app components
      ui/             // atomic components
        index.ts      // export all atomic components
  config/             // configuration files
  constants/          // global constants
  interfaces/         // global interfaces
  utils/              // reusable functions
  redux/              // redux modules
.env                  // environment variables
package.json          // deps and workspace scripts
tsconfig.json         // typescript configuration
README.md             // docs are important
```

## Page or Component structure

**Note**: Consider that is not required to have on all cases the `components` folder

Each Page or Component must follow the next structure and the name of it must be in `kebab-case`:

```
example/
  components/
    component-a/
      components/
        component-c
      component-a.module.css
      index.tsx
    component-b/
      component-b.module.css
      index.tsx
  example.test.tsx              // component test
  example.module.css            // component style
  index.tsx                     // component logic
  types.ts                      // types or interfaces that are being used on the component
```
