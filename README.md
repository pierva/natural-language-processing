# Natural Processing Language

This simple app leverages the Aylien text analysis api to process text and reviews. Aylien uses machine learning to understand sentiments, positivity, etc.

An example of the hosted app can be found [here](https://natural-language-process.herokuapp.com/).

## Get Started
Before getting started you need to create your own API credentials at [aylien.com](https://developer.aylien.com/)

After creating the app, aylien will provide you with:
- APP ID
- APP KEY

### Configure dotenv
We use dotenv to keep sensitive information out of the repository. In this case we'll store in the `env` file the Aylien APP_ID e APP_KEY.

In the root of your project create a new file called `.env`

```sh
$ touch .env
```
Open the file and insert the below lines:
```js
AYLIEN_APP_ID=<YOUR_APP_ID>
AYLIEN_API_KEY=<YOUR_API_KEY>
```
### Install all the dependencies
Before starting the server we need to configure all the dependencies necessary to the project.
In the terminal, in the root of the project, where the package.json file is located type:

```sh
$ npm install
```

## Creating the build
The project has two commands to start the server, one for development and one for production. Since the command `npm run build-dev` uses the webpack dev-server it is necessary that the express server for the backend runs on different port. 

In this project, webpack dev-server uses port 8080 and the express server uses port 8081.

For development make sure that you use `http://localhost:8081/process/` to fetch data from the server, for the production build, instead, you can use `window.location.origin` as base url.

This setup is done in the `formHandler.js` file located in `./src/client/js/`.

There is a comment that explains the above.

To start the development application, we need to start two servers. The backend (express) with:
```sh
$ npm run start-dev
```

and the webpack server with (in another terminal):
```sh
$ npm run build-dev
```

To create the production distribution use the command:
```
$ npm run build-dev
```

To serve the production build, you need to start only the express server and then navigate to `http://localhost:8081`