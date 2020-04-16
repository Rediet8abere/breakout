# Breakout

Breakout game is based on [MDN 2D breakout game using pure JavaScript Tutorial](https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript)

## Technologies Used:
  1. Started with Vanilla JS: plain JavaScript without any additional libraries like jQuery and P5*js
  2. ESlint: a tool that flag inconsistent style and suspicious code 
      ### Installing ESlint
          * Set up npm: npm init -y
          * Install ESLint: npm install eslint --save-dev
          * Setup a config file: npx eslint --init
  3. webpack: Bundling processes the sources to reduces file size by removing unnecessary characters, renames elements to obsecure code, Converts .ts files into .js files, Convert ES6 JS into JS that is compatible with older browsers, and finally combining all .js files into a single bundle.js file.
      ### Installing webpack
          * npm install --save-dev webpack webpack-cli
      ### Directory Setup
          * |- package.json
            |- webpack.config.js
            |- /src
              |- index.js
            |- /dist
              |- index.html
      ### webpack.config.js
          * 
            ```javascript
                const path = require('path')

                module.exports = {
                 entry: './src/index.js',
                 output: {
                 filename: 'bundle.js',
                 path: path.resolve(__dirname, 'dist')
                 }
                }
            ```
       ### Running script
       
            {
              ```javascript
                  ...
                  "scripts": {
                    "develop": "webpack --mode development --watch",
                    "build": "webpack --mode production"
                  },
                  ...
                }
              ```
            * Bundling project in develop mode: npm run develop
            * production mode: npm run build
