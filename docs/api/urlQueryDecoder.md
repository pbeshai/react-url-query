### `urlQueryDecoder(config)`

A helper function to create a query decoder from [`urlPropsQueryConfig`](addUrlProps.md#urlPropsQueryConfig).


#### Arguments

1. `config` (*Object*): The `urlPropsQueryConfig` object, [see urlPropsQueryConfig for details](addUrlProps.md#urlPropsQueryConfig).

#### Returns

(*Function*): A function which, given an object with encoded parameters, returns the decoded equivalent. It compares against cached values to see
if decoding is necessary or if it can reuse old values.

#### Examples

```js
const urlPropsQueryConfig = {
  foo: { type: UrlQueryParamTypes.number, queryParam: 'fooInUrl' },
  bar: { type: UrlQueryParamTypes.string },
};

const decode = urlQueryDecoder(urlPropsQueryConfig);

decode({ fooInUrl: '137', bar: 'str' });
// === { foo: 137, bar: 'str' }
```
