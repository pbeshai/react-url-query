### `urlQueryEncoder(config)`

A helper function to create a query encoder from [`urlPropsQueryConfig`](addUrlProps.md#urlPropsQueryConfig).


#### Arguments

1. `config` (*Object*): The `urlPropsQueryConfig` object, [see urlPropsQueryConfig for details](addUrlProps.md#urlPropsQueryConfig).

#### Returns

(*Function*): A function which, given an object with decoded parameters, returns the encoded equivalent.

#### Examples

```js
const urlPropsQueryConfig = {
  foo: { type: UrlQueryParamTypes.number, queryParam: 'fooInUrl' },
  bar: { type: UrlQueryParamTypes.string },
};

const encode = urlQueryEncoder(urlPropsQueryConfig);

encode({ foo: 137, bar: 'str' });
// === { fooInUrl: '137', bar: 'str' }
```
