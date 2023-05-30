# web

## Current Issues

* node dependency in packages.json "@types/node": "18.8.0" is used as workaround for this [Bug](https://github.com/vuejs/core/pull/6855)

## Configuration
| **Environment Variable**                 | **Description**                                                                                                                                                                                                                                                                                                                                                                                               | 
|------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| VITE_FRONTEND_APP_URL                    | Url of the front end app, i.e. http://localhost:5173                                                                                                                                                                                                                                                                                                                                                          |
| VITE_APP_CONFIGURATION_CONNECTION_STRING | Connection String for Azure App Configuration. Used for feature toggles. You can find it [here](https://portal.azure.com/#@learn4lifeschweiz.onmicrosoft.com/resource/subscriptions/0937e050-07a8-4a38-9b98-fdfd81d50013/resourcegroups/infrastructure/providers/Microsoft.AppConfiguration/configurationStores/l4l-configuration/keys). <br/> **ATTENTION: Make sure to use a read-only connection string.** |
| VITE_APP_SENTRY_CONNECTION_STRING        | Sentry connection string.                                                                                                                                                                                                                                                                                                                                                                                     |


## Development

Install nvm [https://github.com/nvm-sh/nvm#installing-and-updating](https://github.com/nvm-sh/nvm#installing-and-updating)

Install and initialize node with version used in project
```
nvm install
npm install
```

Run app locally in development mode
```
npm run dev
```
open browser at [http://localhost:3000](http://localhost:3000)

Build app locally (bundle will be created in `/dist` folder)
```
npm run build
```

Check code format issues
```
npm run lint
```

Fix automatically fixable format/lint issues
```
npm run fix
```

Check typescript types
```
npm run check-types
```

Run jest test runner in watch mode
```
npm run test
```

Check format/lint issues, typescript types and run tests
```
npm run verify
```

### Views

To add a new example add a vue component file next to the component with a `.example.vue` suffix (e.g MyButton.example.vue).

To view the examples run the dev server
```
npm run dev
```
and open browser at (**trailing '/' is important**)
[http://localhost:3000/examples/](http://localhost:3000/examples/)

### SVG Icons

Place colorizable (color will be defined in css) icons in the `src/application/shared/icons/assets/svg-colorizable` and others in `src/application/shared/icons/assets/svg-original`

After icon changes generate the icon provider file with the command:
```
npm run generate-icons
```

### Dependencies

Check for updated dependencies
```
npx npm-check-updates
```

Update version in package.json
```
npx npm-check-updates -u
```

Updated modules and package-lock file
```
npm update
```

## Docker

run docker locally
```
docker build -t web .
docker run -dp 8080:80 --name web web
```

open browser at [http://localhost:8080](http://localhost:8080)