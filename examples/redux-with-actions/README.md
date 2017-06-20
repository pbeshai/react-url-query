# Redux with actions Example

Example of using react-url-query. Start it with `npm start`.

Demonstrates how to integrate React URL Query with Redux (and no React Router). The only difference between this and the basic example is how you wrap your component with `addUrlProps`. The steps are:

1. Use a [history](https://github.com/mjackson/history) of some sort to control pushing or replacing items in the browser's history stack. Be sure to listen for changes to the history and force an update when they occur (see [App.js](https://github.com/pbeshai/react-url-query/blob/master/examples/redux-with-actions/src/App.js))
1. Configure React URL Query to use the history in your application's setup (see [index.js](https://github.com/pbeshai/react-url-query/blob/master/examples/redux-with-actions/src/index.js)). Disable auto-generation of change handlers by passing `addChangeHandlers: false`.
1. Attach the [`urlQueryMiddleware`](api/urlQueryMiddleware.md) to Redux, optionally instantiating with a custom [URL query reducer](api/urlQueryReducer). (see [index.js](https://github.com/pbeshai/react-url-query/blob/master/examples/redux-with-actions/src/index.js))
1. Create actions for URL updates with [`urlAction`](api/urlAction.md), [`urlReplaceInAction`](api/urlReplaceInAction.md), [`urlPushInAction`](api/urlPushInAction.md), etc. (see [actions.js](https://github.com/pbeshai/react-url-query/blob/master/examples/redux-with-actions/src/state/actions.js))
1. Create change handlers in `mapDispatchToProps` for the actions you've made. (see [MainPage.js](https://github.com/pbeshai/react-url-query/blob/master/examples/redux-with-actions/src/MainPage.js))
1. Use a `urlPropsQueryConfig` and [`addUrlProps`](api/addUrlProps.md) to connect your component to React URL Query (see [MainPage.js](https://github.com/pbeshai/react-url-query/blob/master/examples/redux-with-actions/src/MainPage.js)). In this case, we wrap the connected component: `addUrlProps(...)(connect(...)(MyComponent))`.


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
