### `urlQueryReducer(action, [location])`

This is the default url query reducer that ships with React URL Query. It is only used when you integrating with Redux via [`urlQueryMiddleware`](urlQueryMiddleware.md) as shown in [this example](https://github.com/pbeshai/react-url-query/tree/master/examples/redux-with-actions). Note that you do not need to use the middleware and the reducer when integrating with Redux, they're only necessary if you want to dispatch actions to change the URL.

This reducer reads in the `updateType` from `action.meta` and modifies the URL accordingly by delegating to the corresponding `fromAction` function (e.g., [`replaceInUrlQueryFromAction`](replaceInUrlQueryFromAction.md)). See [`UrlUpdateTypes`](UrlUpdateTypes.md) for all supported update types.

NOTE: This is *NOT* a Redux reducer. It does not map from (state, action) -> state.
Instead it "reduces" actions into URL query parameter state. *NOT* redux state.

#### Arguments

1. `action` (*Object*): An action, typically from [`urlAction`](urlAction.md) or similar.
1. [`location`] (*Object*): The location from which the current URL state should be read. If not provided, `location` is read from the configured `history` or the `window`.

#### Returns

(*void*): It does not return anything.

#### Examples

This is typically just used by `urlQueryMiddleware` since it is the default `reducer` option, but if you provide your own reducer, you can defer to this reducer after handling a subset of the URL update actions.

```js
import {
  replaceInUrlQueryFromAction,
  pushUrlQuery,
  pushInUrlQueryFromAction,
  urlQueryReducer as defaultUrlQueryReducer
} from 'react-url-query';

function myUrlQueryReducer(action) {
  switch (action.type) {
    case CHANGE_FOO: {
      const foo = action.payload.decodedValue;
      if (foo < 300) {
        // pushing new URL state since foo < 300
        pushInUrlQueryFromAction(action);
      } else if (foo > 700) {
        // pushing entire query into URL state since foo > 700: { foo, party }
        const newQuery = {
          [action.payload.queryParam]: [action.payload.encodedValue],
          party: Math.ceil(Math.random() * 100)
        };
        pushUrlQuery(newQuery);
      } else {
        // just replace this value otherwise (normal behavior)
        replaceInUrlQueryFromAction(action);
      }
      break;
    }
    default:
      // all other actions can be handled by the default reducer
      defaultUrlQueryReducer(action);
      break;
  }
}
```
