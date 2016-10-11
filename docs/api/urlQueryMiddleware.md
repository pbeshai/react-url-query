### `urlQueryMiddleware([options])`

If you want to have URL update actions dispatched via Redux as shown in [this example](https://github.com/pbeshai/react-url-query/tree/master/examples/redux-with-actions), you need to use this Redux middleware. It intercepts actions where `meta.urlQuery` is true and passes them to the configured `reducer` (by default [urlQueryReducer](urlQueryReducer)) to be interpreted.

If you are using [react-router-redux](https://github.com/reactjs/react-router-redux), you will want to read `location` from the store. The default setting for `readLocationFromStore` does this. If you want to read `location` from another place in the store, specify a different `readLocationStore` in the options.

Default settings result in URL actions not making it to the final Redux store, so listeners to the store won't be notified of a change. This is because usually there is something else listening for changes to the URL and causing the components to update, so we'd end up with an unnecessary second render. If you want the store to be notified, you need to set the `shortcircuit` option to `false`.


#### Arguments

1. [`options`] (*Object*): The options for configuring the middleware. They include:
  * `reducer` (*Function*): A function that takes `action, location` and updates the URL. If not specified in `options`, it is read from the [configuration](configureUrlQuery.md), and finally defaults to  [urlQueryReducer](urlQueryReducer) if no value is provided.
  * `readLocationFromStore` (*Function*): A function that takes `state`, the Redux store state, and returns the current URL location to pass to the reducer. If not specified, defaults to reading from `react-router-redux`'s default location.
  * `shortcircuit` (*Boolean*): A flag on whether or not we should pass on to the next Redux middleware, and thus eventually receive notifications from the Redux store.

#### Returns

(*Function*): A redux middleware function.

#### Remarks

* You must instantiate `urlQueryMiddleware` with options. You cannot run `applyMiddleware(urlQueryMiddleware)`. If you do not want to supply options, you can run: `applyMiddleware(urlQueryMiddleware())`.

#### Examples

```js
import { createStore, applyMiddleware } from 'redux';
import { urlQueryMiddleware } from 'react-url-query';
import './myUrlQueryReducer';
import './rootReducer';

// get the new create store with middleware
const createStoreWithMiddleware = applyMiddleware(
  urlQueryMiddleware({
    reducer: myUrlQueryReducer
  })
)(createStore);

// create the store
const store = createStoreWithMiddleware(rootReducer);
```
