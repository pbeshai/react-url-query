### `multiPushInUrlQuery(queryReplacements, [location])`

Updates the URL to have the specified query parameter's values set to those in the `queryReplacements` object, while keeping all the other query parameters the same. The `queryReplacements` object has the form:

```
{
  queryParamName: encodedValue,
  ...
}
```

Uses push to change the URL, which means the new state will be pushed on to the history stack, so the back button will be able to return you to the previous state.

#### Arguments

1. `queryReplacements` (*Object*): The object representing the query parameters and their encoded values to update.
1. [`location`] (*Object*): The location from which the current URL state should be read. If not provided, `location` is read from the configured `history` or the `window`.

#### Returns

(*Any*): The result of `history.push()`, will depend on the history being used.

#### Examples

```js
// Given URL /page?foo=bar&baz=123&jim=bo
multiPushInUrlQuery({ foo: 'test', baz: '99' });
// URL is now /page?foo=test&baz=99&jim=bo
```
