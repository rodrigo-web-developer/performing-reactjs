# performing-reactjs
Example of performance issues caused by re-render of multiple components

## Running application
After you cloned the repo, please go to repository's directory and type the following commands:

```
cd project
npm install
npm run dev
```

The application will be running at http://localhost:5173

## API Data
We have a fake API that returns data, to populate data just run the following command:

`node generateShit.js`

It will create 5000 fake customer objects into JSON file, adjust the limit to do what you want in `generateShit.js` file.

To start API, run the following command in other terminal: `npm run api`

The application will be running at http://localhost:3000