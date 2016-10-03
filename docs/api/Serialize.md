# Serialize

The `Serialize` module provides a number of utility functions for encoding data as strings and decoding data from strings. Two of these functions are pulled up as top-level exports of React URL Query in addition to being available inside `Serialize`: [encode](#encode) and [decode](#decode).

* [`decode`](#decode) -
* [`decodeArray`](#decodeArray) -
* [`decodeBoolean`](#decodeBoolean) -
* [`decodeDate`](#decodeDate) -
* [`decodeJson`](#decodeJson) -
* [`decodeObject`](#decodeObject) -

* [`encode`](#encode) -
* [`encodeArray`](#encodeArray) -
* [`encodeBoolean`](#encodeBoolean) -
* [`encodeDate`](#encodeDate) -
* [`encodeJson`](#encodeJson) -
* [`encodeObject`](#encodeObject) -

### <a id='decode'></a>[`decode(type, encodedValue, [defaultValue])`](#decode)

Decodes a string into a value of the specified type. It does so by delegating to one of the decode*Type* functions based on `type` or by using the custom function passed in through `type`.

#### Arguments

1. `type` (*String|Function|Object*): The type of the data, typically a string from [UrlQueryParamTypes](UrlQueryParamTypes.md). If a function is provided, that function is called with `encodedValue` and `defaultValue` as its arguments. If an object is provided with shape `{ decode }`, `type.decode` is called with `encodedValue` and `defaultValue` as its arguments. Otherwise, if the encoded value is undefined,  defaultValue is used. If no decoder is found to match the string `type`, the encodedValue is returned unmodified.
1. `encodedValue` (*String*): The string representation of the value.
1. `defaultValue` (*Any*): What the value decodes to if `encodedValue` is `undefined`.

#### Returns

(*Any*): The decoded value, type will be based on what was passed into as `type` arg.

#### Examples

```js
decode(UrlQueryParamTypes.number, '94');
// === 94

decode(d => `custom${d}`, '94');
// === 'custom94'

decode({ decode: d => `custom${d}` }, '94');
// === 'custom94'

decode(UrlQueryParamTypes.number, undefined, 137);
// === 137

decode('some-type', '94');
// === '94'
```

### <a id='decodeArray'></a>[`decodeArray(encodedValue, [entrySeparator])`](#decodeArray)

Decodes a string into an array of strings.

#### Arguments

1. `encodedValue` (*String*): The array as a string with entries separated by `entrySeparator`
1. [`entrySeparator`] (*String*): The string used to separate entries in the encoded array. If not provided, defaults to `'_'`.

#### Returns

(*String[]*): An array representation of the encoded value. Each entry is a string.

#### Examples

```js
decodeArray('one_two_three');
// === ['one', 'two', 'three']

decodeArray('one---two---three', '---');
// === ['one', 'two', 'three']
```


### <a id='decodeBoolean'></a>[`decodeBoolean()`](#decodeBoolean)

Description

#### Arguments

1. `encodedValue` (*String*):

#### Returns

(*String*): The encoded string


### <a id='decodeDate'></a>[`decodeDate()`](#decodeDate)

Description

#### Arguments

1. `encodedValue` (*String*):

#### Returns

(*String*): The encoded string


### <a id='decodeJson'></a>[`decodeJson()`](#decodeJson)

Description

#### Arguments

1. `encodedValue` (*String*):

#### Returns

(*String*): The encoded string


### <a id='decodeObject'></a>[`decodeObject()`](#decodeObject)

Description

#### Arguments

1. `encodedValue` (*String*):

#### Returns

(*String*): The encoded string


### <a id='encode'></a>[`encode()`](#encode)

Description

#### Arguments

1. `encodedValue` (*String*):

#### Returns

(*String*): The encoded string


### <a id='encodeArray'></a>[`encodeArray()`](#encodeArray)

Description

#### Arguments

1. `encodedValue` (*String*):

#### Returns

(*String*): The encoded string


### <a id='encodeBoolean'></a>[`encodeBoolean()`](#encodeBoolean)

Description

#### Arguments

1. `encodedValue` (*String*):

#### Returns

(*String*): The encoded string


### <a id='encodeDate'></a>[`encodeDate()`](#encodeDate)

Description

#### Arguments

1. `encodedValue` (*String*):

#### Returns

(*String*): The encoded string


### <a id='encodeJson'></a>[`encodeJson()`](#encodeJson)

Description

#### Arguments

1. `encodedValue` (*String*):

#### Returns

(*String*): The encoded string


### <a id='encodeObject'></a>[`encodeObject()`](#encodeObject)

Description

#### Arguments

1. `encodedValue` (*String*):

#### Returns

(*String*): The encoded string
