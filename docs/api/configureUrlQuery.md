### `configureUrlQuery(config)`

This function configures the singleton instance of React URL Query. The available options to configure are:

* `history` (*Object*): Must be provided unless using React Router v4. This object should provide two functions: `push(location)` and `replace(location)` that update the URL based on the `location` provided.

* `addUrlChangeHandlers` (*Boolean*): If true, adds generated URL change handlers when using [`addUrlProps`](addUrlProps.md) with a `urlPropsQueryConfig`. Defaults to `true`.

* `addRouterParams` (*Boolean*): If true, lifts values from `props.params` provided by React Router to direct `props` when using [`addUrlProps`](addUrlProps.md). Defaults to `true`.

* `changeHandlerName` (*Function*): Specifies how change handler names are generated when `addUrlChangeHandlers` is set to `true`. By default, maps `propName` to `onChangePropName`.

* `readLocationFromStore` (*Function*): Reads in `location` from the Redux store if available and passes it to the reducer in [`urlQueryMiddleware`](urlQueryMiddleware.md). This property is only used when the middleware is added to Redux, as in [this example](https://github.com/pbeshai/react-url-query/tree/master/examples/redux-with-actions). Defaults to reading from `state.routing.locationBeforeTransitions`, the standard location for [react-router-redux](https://github.com/reactjs/react-router-redux).

#### Arguments

1. `options` (*Object*): The options to update in the configuration.

#### Returns

(*void*): It does not return anything.

#### Remarks

* If you are using React Router v4, instead of configuring the `history` option here, use [`RouterToUrlQuery`](RouterToUrlQuery.md). All other options can still be configured normally.

#### Examples

```js
import { browserHistory } from 'react-router'; // v2

configureUrlQuery({
  history: browserHistory,
  addRouterParams: false,
});
```
