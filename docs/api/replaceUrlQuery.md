# replaceUrlQuery(newQuery, [location])

Updates the URL to have `newQuery` as the new set of query parameters, completely replacing what was there previously. Uses replace to change the URL, which means nothing gets pushed on to the history stack, so the back button will not be able to return you to the previous state.

#### Arguments

1. `newQuery` (*Object*): An object mapping query parameter names to values (*String*).
1. [`location`] (*Object*): The location from which the current URL state should be read. If not provided, `location` is read from the configured `history` or the `window`.

#### Returns

(*Any*): The result of `history.replace()`, will depend on the history being used.

#### Examples

```js
// Given URL /page?foo=bar&baz=123&jim=bo
replaceUrlQuery({ foo: 'test', jim: 'vlan' });
// URL is now /page?foo=test&jim=vlan
```
