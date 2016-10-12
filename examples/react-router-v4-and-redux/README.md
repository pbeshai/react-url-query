# React Router v4 and Redux Example

Example of using react-url-query. Start it with `npm start`.

Demonstrates how to use React URL Query with React Router v4 and Redux. This example also demonstrates using a custom type for a URL query parameter. When using React Router v4, we do *not* use [`configureUrlQuery`](api/configureUrlQuery.md) as we do in all the others. Instead we use [`<RouterToUrlQuery>`](api/RouterToUrlQuery.md). The steps are:

1. Use `<RouterToUrlQuery>` to configure React URL Query to use the React Router's history in your application's setup (see [index.js](https://github.com/pbeshai/react-url-query/blob/master/examples/react-router-v4-and-redux/src/index.js)).
1. Use a `urlPropsQueryConfig` and [`addUrlProps`](api/addUrlProps.md) to connect your component to React URL Query. In this case, we wrap the connected component: `addUrlProps(...)(connect(...)(MyComponent))` (see [MainPage.js](https://github.com/pbeshai/react-url-query/blob/master/examples/react-router-v4-and-redux/src/MainPage.js)).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


---

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
