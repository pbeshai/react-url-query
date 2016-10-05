# subquery(query, ...params)

Given a query object, returns an object with only a subset of the parameters in it. Similar to lodash's `pick`. A similar function that takes a list of parameters to exclude is [`subqueryOmit`](subqueryOmit.md).

#### Arguments

1. [`query`] (*Object*): The query parameters object, mapping from query param to encoded value.
1. [`...params`] (*String*): The list of query parameters to keep in the returned result. These values should match a subset of the keys in `query`.

#### Returns

(*type*): Returns `query` with only the keys defined in `params`.

#### Examples

```js
subquery({ a: 'one', b: 'two', c: 'three' }, 'a', 'c');
// === { a: 'one', c: 'three' }
```
