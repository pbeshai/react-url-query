### `subqueryOmit(query, ...omitParams)`

Given a query object, returns an object with only a subset of the parameters in it. Similar to lodash's `omit`. A similar function that takes a list of parameters to include is [`subquery`](subquery.md).

#### Arguments

1. `query` (*Object*): The query parameters object, mapping from query param to encoded value.
1. `...omitParams` (*String*): The list of query parameters to exclude from the returned result. These values should match a subset of the keys in `query`.

#### Returns

(*type*): Returns `query` with only the keys that are not specified in `omitParams`.

#### Examples

```js
subqueryOmit({ a: 'one', b: 'two', c: 'three' }, 'a', 'c');
// === { b: 'two' }
```
