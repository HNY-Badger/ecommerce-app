# eCommerce App
An eCommerce application made in collaboration with [@marinrika](https://github.com/marinrika) and [@pakhomovivan](https://github.com/pakhomovivan) to test our teamwork skills. In this app users can browse through a vast range of products, view detailed descriptions, add their favorite items to the cart, and proceed to checkout. It also includes features such as user registration and login, product search, product categorization, and sorting to make the shopping experience more streamlined and convenient.  
App powered by [Webpack](https://webpack.js.org), [React JS](https://react.dev), [Redux](https://redux.js.org) ([RTK](https://redux-toolkit.js.org)) and [CommerceTools](https://commercetools.com/) as API provider.  
Guidance during the project provided by [@Lneer](https://github.com/Lneer) and [@OrangeJazz](https://github.com/OrangeJazz).

## Available scripts
 - ```start``` - run application in the development mode and opens it in the browser
 - ```test``` - run Jest tests
 - ```test:coverage``` - display coverage of the tests (aka test report)
 - ```build``` - build the project with production mode into ```dist/bundle.js``` file
 - ```lint``` - run ESlint checks
 - ```lint:fix``` - fix ESlint fixable errors
 - ```format``` - run prettier and format the code
 - ```prepare``` - set up Husky

## Setting up project locally 🚀
1. After project installation, run ```npm intall``` to install all dependencies.
2. Setup enviremental variables in ```.env``` file. All variables are taken from CommerceTools.
3. Run ```npm run prepare``` to set up Husky.
4. Run ```npm start``` to start the App.
5. In case of encountering error ```'Cannot find module...'``` while trying to import assets, add your asset extension to the ```declarations.d.ts``` file.

## Folders structure 📁
- ```/api``` - api-related manipulations
- ```/assets``` - self-explanatory
- ```/components``` - custom React components
  - ```/components/common``` - common components (i.e. Button, Card, etc.)
  - ```/components/[page]``` - page-specific components
- ```/pages``` - complete pages, ready to be put in router
- ```/store``` - global store, managing app state (Redux)
- ```/tests``` - Jest test files