### `pushInUrlQueryFromAction(action, [location])`

A helper function for when you want to use redux `dispatch` to handle your URL updating actions, an optional way of combining Redux with React URL Query. It expects the action to have the form:

```
{
  payload: {
    queryParam: String,
    encodedValue: String,
  }
  ...
}
```

This function is typically only useful when using your own urlReducer, as shown in [this example](https://github.com/pbeshai/react-url-query/tree/master/examples/redux-with-actions).

Uses push to change the URL, which means the new state will be pushed on to the history stack, so the back button will be able to return you to the previous state.

#### Arguments

1. `action` (*Object*): An action, typically from [`urlPushInAction`](urlPushInAction.md). Shape described above.
1. [`location`] (*Object*): The location from which the current URL state should be read. If not provided, `location` is read from the configured `history` or the `window`.

#### Returns

(*void*): It does not return anything.


#### Examples

```js
// create an action creator
const changeFoo = urlPushInAction('CHANGE_FOO', 'foo', UrlQueryParamTypes.number);

// call an action creator to get an action
const action = changeFoo(94);

// typically in a reducer, call this helper to update the URL
// e.g. URL was /page?foo=123&bar=baz
pushInUrlQueryFromAction(action)
// e.g. URL now is /page?foo=94&bar=baz
```
