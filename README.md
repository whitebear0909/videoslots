## Command
### `npm run serve`

Runs the app in the development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

## About Project

### Project structure
    - assets
        neccessary images
    - components
        reusable components
    - core/services
        service.api.js //define axios functions interacting with api
    - store
        define store modules
    - views
        define page components
### Dependencies
    "@babel/core": "^7.12.16",
    "@babel/eslint-parser": "^7.12.16",
    "@vue/cli-plugin-babel": "~5.0.0",
    "@vue/cli-plugin-eslint": "~5.0.0",
    "@vue/cli-service": "~5.0.0",
    "eslint": "^7.32.0",
    "eslint-plugin-vue": "^8.0.3",
    "node-sass": "^7.0.1",
    "sass-loader": "^12.6.0"
### Note
    implemented pagination without response header info(Link)
    because it doesn't have total count of images
