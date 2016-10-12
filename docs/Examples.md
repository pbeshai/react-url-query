# Examples

The examples are included in the [repository on GitHub](https://github.com/pbeshai/react-url-query/tree/master/examples).


### [basic](https://github.com/pbeshai/react-url-query/tree/master/examples/basic)

Shows the bare minimum amount of work to get React URL Query working in your application when you are not using React Router or Redux. The basic steps are:

1. Use a [history](https://github.com/mjackson/history) of some sort to control pushing or replacing items in the browser's history stack. Be sure to listen for changes to the history and force an update when they occur (see [App.js](https://github.com/pbeshai/react-url-query/blob/master/examples/basic/src/App.js))
1. Configure React URL Query to use the history in your application's setup (see [index.js](https://github.com/pbeshai/react-url-query/blob/master/examples/basic/src/index.js)).
1. Use a `urlPropsQueryConfig` and [`addUrlProps`](api/addUrlProps.md) to connect your component to React URL Query (see [MainPage.js](https://github.com/pbeshai/react-url-query/blob/master/examples/basic/src/MainPage.js)).


### [basic-mapUrlToProps](https://github.com/pbeshai/react-url-query/tree/master/examples/basic-mapUrlToProps)

Shows a basic configuration to get React URL Query working in your application when you are not using React Router or Redux. Uses alternative approach of `mapUrlToProps` instead of `urlPropsQueryConfig`. The steps are:

1. Use a [history](https://github.com/mjackson/history) of some sort to control pushing or replacing items in the browser's history stack. Be sure to listen for changes to the history and force an update when they occur (see [App.js](https://github.com/pbeshai/react-url-query/blob/master/examples/basic-mapUrlToProps/src/App.js))
1. Configure React URL Query to use the history in your application's setup (see [index.js](https://github.com/pbeshai/react-url-query/blob/master/examples/basic-mapUrlToProps/src/index.js)).
1. Use a `mapUrlToProps`, `mapUrlChangeHandlersToProps` and [`addUrlProps`](api/addUrlProps.md) to connect your component to React URL Query (see [MainPage.js](https://github.com/pbeshai/react-url-query/blob/master/examples/basic-mapUrlToProps/src/MainPage.js)).



### [redux](https://github.com/pbeshai/react-url-query/tree/master/examples/redux)

Demonstrates how to integrate React URL Query with Redux (and no React Router). The only difference between this and the basic example is how you wrap your component with `addUrlProps`. The steps are:

1. Use a [history](https://github.com/mjackson/history) of some sort to control pushing or replacing items in the browser's history stack. Be sure to listen for changes to the history and force an update when they occur (see [App.js](https://github.com/pbeshai/react-url-query/blob/master/examples/redux/src/App.js))
1. Configure React URL Query to use the history in your application's setup (see [index.js](https://github.com/pbeshai/react-url-query/blob/master/examples/redux/src/index.js)).
1. Use a `urlPropsQueryConfig` and [`addUrlProps`](api/addUrlProps.md) to connect your component to React URL Query. In this case, we wrap the connected component: `addUrlProps(...)(connect(...)(MyComponent))` (see [MainPage.js](https://github.com/pbeshai/react-url-query/blob/master/examples/redux/src/MainPage.js))


### [redux-with-actions](https://github.com/pbeshai/react-url-query/tree/master/examples/redux-with-actions)

The most common way of integrating Redux with React URL Query is shown in the [redux example](https://github.com/pbeshai/react-url-query/tree/master/examples/redux). This project demonstrates an alternative approach, using `dispatch` and actions to change the URL. React Router is not used. The steps are:

1. Use a [history](https://github.com/mjackson/history) of some sort to control pushing or replacing items in the browser's history stack. Be sure to listen for changes to the history and force an update when they occur (see [App.js](https://github.com/pbeshai/react-url-query/blob/master/examples/redux-with-actions/src/App.js))
1. Configure React URL Query to use the history in your application's setup (see [index.js](https://github.com/pbeshai/react-url-query/blob/master/examples/redux-with-actions/src/index.js)). Disable auto-generation of change handlers by passing `addChangeHandlers: false`.
1. Attach the [`urlQueryMiddleware`](api/urlQueryMiddleware.md) to Redux, optionally instantiating with a custom [URL query reducer](api/urlQueryReducer). (see [index.js](https://github.com/pbeshai/react-url-query/blob/master/examples/redux-with-actions/src/index.js))
1. Create actions for URL updates with [`urlAction`](api/urlAction.md), [`urlReplaceInAction`](api/urlReplaceInAction.md), [`urlPushInAction`](api/urlPushInAction.md), etc. (see [actions.js](https://github.com/pbeshai/react-url-query/blob/master/examples/redux-with-actions/src/state/actions.js))
1. Create change handlers in `mapDispatchToProps` for the actions you've made. (see [MainPage.js](https://github.com/pbeshai/react-url-query/blob/master/examples/redux-with-actions/src/MainPage.js))
1. Use a `urlPropsQueryConfig` and [`addUrlProps`](api/addUrlProps.md) to connect your component to React URL Query. In this case, we wrap the connected component: `addUrlProps(...)(connect(...)(MyComponent))` (see [MainPage.js](https://github.com/pbeshai/react-url-query/blob/master/examples/redux-with-actions/src/MainPage.js))


### [react-router-v2-and-redux](https://github.com/pbeshai/react-url-query/tree/master/examples/react-router-v2-and-redux)

Demonstrates how to use React URL Query with React Router v2 and Redux. This example also demonstrates using a custom type for a URL query parameter. The steps are:

1. Configure React URL Query to use the React Router's history in your application's setup (see [index.js](https://github.com/pbeshai/react-url-query/blob/master/examples/react-router-v2-and-redux/src/index.js)).
1. Use a `urlPropsQueryConfig` and [`addUrlProps`](api/addUrlProps.md) to connect your component to React URL Query. In this case, we wrap the connected component: `addUrlProps(...)(connect(...)(MyComponent))` (see [MainPage.js](https://github.com/pbeshai/react-url-query/blob/master/examples/react-router-v2-and-redux/src/MainPage.js)).




### [react-router-v4-and-redux](https://github.com/pbeshai/react-url-query/tree/master/examples/react-router-v4-and-redux)

Demonstrates how to use React URL Query with React Router v4 and Redux. This example also demonstrates using a custom type for a URL query parameter. When using React Router v4, we do *not* use [`configureUrlQuery`](api/configureUrlQuery.md) as we do in all the others. Instead we use [`<RouterToUrlQuery>`](api/RouterToUrlQuery.md). The steps are:

1. Use `<RouterToUrlQuery>` to configure React URL Query to use the React Router's history in your application's setup (see [index.js](https://github.com/pbeshai/react-url-query/blob/master/examples/react-router-v4-and-redux/src/index.js)).
1. Use a `urlPropsQueryConfig` and [`addUrlProps`](api/addUrlProps.md) to connect your component to React URL Query. In this case, we wrap the connected component: `addUrlProps(...)(connect(...)(MyComponent))` (see [MainPage.js](https://github.com/pbeshai/react-url-query/blob/master/examples/react-router-v4-and-redux/src/MainPage.js)).
