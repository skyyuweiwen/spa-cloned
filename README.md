# Spartacus - Angular Storefront

---

## Minimum Requirements

```
Node.js >= 8.9.0
yarn >= 1.6.0
Read access to Artifactory (https://repository.hybris.com)
```

## Dependencies Configuration

This is a one time setup. We pull all of our dependencies from our internal npm registry (artifactory). In order for you to be able to do this, you need to do the following:

1.  Login to [artifactory](https://repository.hybris.com/webapp/#/login)
2.  Once you have login, there should be an `npm repository` link on the homepage, in the "Set Me Up" section. Click on it and a popup window with instructions will appear.
3.  Enter your password in the upper right. This will populate the commands with your encrypted password. This way you can copy and paste the commands directly in the terminal.
4.  Out of all the commands in the popup, you will only need to run the first one on your machine. It looks like:

```
$ curl -u[firstname.lastname@sap.com]:[encryptedpassword] https://repository.hybris.com/api/npm/auth
```

As instructed next, paste the result in your ~/.npmrc file (create the file if it doesn't exist)

The last step is to add this line to ~/.npmrc:

```
registry=https://repository.hybris.com/api/npm/npm-repository/
```

That's it. For a quick way to confirm your new config, you can run:

```
$ yarn config list
```

You should see your new ~/.npmrc configurations at the end of the list, in the `info npm config` section.

## Installation Steps

Install dependencies:

```
$ yarn install
```

Build the storefrontlib

```
ng build storefrontlib
```

Start the angular app.

```
$ yarn start
```

Then point your browser to http://localhost:4200/

---

## Developing library code

When developing library code, you have to rebuild the library each time you want to see and test your changes in the running app. The Anguar 6 docs give some explanations in [Why do I need to build the library everytime I make changes?](https://github.com/angular/angular-cli/wiki/stories-create-library#why-do-i-need-to-build-the-library-everytime-i-make-changes)

That being said, there is a way to configure the workspace so the lib code is buit like a standalone application, giving the developer the convenience of hot reloading changes.

**WARNING:** This configuration is optional and should only be used for convenience on local development environments. **It should never be commited back to git.**

Here is how it's done: In the tsconfig.json file at the root of the repo, change this:

```
    "paths": {
      "storefrontlib": [
        "dist/storefrontlib"
      ]
    }
```

And use this instead:

```
    "paths": {
      "storefrontlib": [
        "projects/storefrontlib/src/public_api"
      ]
    }
```

## Development tools

### Code Editor: VS Code

This project is intended to be edited with [Microsoft Visial Studio Code](https://code.visualstudio.com)

#### VS Code Workspace Extensions

The development team relies on a few extensions for productivity and code compliance. When you open the source folder in vscode, if you are missing some of these recommended extensions, vscode will prompt you for installation. The list of recommended extensions is found in '.vscode/extensions.json'.

Please make sure you install them.

#### VS Code Workspace settings

These are vscode settings the team relies on. They are shared and enforced via vscode workspace settings. If you want to change something, propose the change don't just commit it, so the whole team uses it.

### Browser: Google Chrome

For development, Google Chrome is recommended. There is a "Debugger for Chrome" extension for vscode in the workspace extensions. This allows you to place breakpoint in typescript from vscode and debug the app from vscode.
Chrome also manages well security exceptions that are needed to get the application running in a development environment.

### Mock data during development

In order to be completely decoupled from the backend we connect our application to a local mock server. This requires the following setup:

* A json-server that provides static or dynamic mock data.
* rerouting of backend calls to the mock server.

This project provides the following commands to run this setup:

* start the webpack dev server with a proxy: `npm run start:mock`
* run [json-server](https://github.com/typicode/json-server): `npm run mockserver`.

The mock data can either be static or dynamically generated. With static mode full CRUD operations are supported. Since the mocked data is not part of the code it will not end up in our production bundles. When mock data is generated, [faker.js](https://github.com/Marak/faker.js) can be used to generate fake data.

All backend request are proxied to the json-server (runs on port 3000 by default). The proxy is part of the embedded webpack dev server. Multiple proxy configurations can be used.
