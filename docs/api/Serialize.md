# Serialize

The `Serialize` module provides a number of utility functions for encoding data as strings and decoding data from strings. Two of these functions are pulled up as top-level exports of React URL Query in addition to being available inside `Serialize`: [encode](#encode) and [decode](#decode).

* [`decode(type, encodedValue, [defaultVale])`](#decode)
* [`decodeArray(encodedValue, [entrySeparator])`](#decodeArray)
* [`decodeBoolean(encodedValue)`](#decodeBoolean)
* [`decodeDate(encodedValue)`](#decodeDate)
* [`decodeJson(encodedValue)`](#decodeJson)
* [`decodeObject(encodedValue, [keyValSeparator], [entrySeparator])`](#decodeObject)
* [`encode(type, decodedValue)`](#encode)
* [`encodeArray(decodedValue)`](#encodeArray)
* [`encodeBoolean(decodedValue)`](#encodeBoolean)
* [`encodeDate(decodedValue)`](#encodeDate)
* [`encodeJson(decodedValue)`](#encodeJson)
* [`encodeObject(decodedValue)`](#encodeObject)

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


### <a id='decodeBoolean'></a>[`decodeBoolean(encodedValue)`](#decodeBoolean)

Decodes a string into a boolean.

#### Arguments

1. `encodedValue` (*String*): The boolean value as a string, where `'1'` is `true`, `'0'` is false, and everything else is `undefined`.

#### Returns

(*Boolean*): The boolean representation of the encoded value.

#### Examples

```js
decodeBoolean('1');
// === true

decodeBoolean('0');
// === false

decodeBoolean('true');
// === undefined
```

### <a id='decodeDate'></a>[`decodeDate(encodedValue)`](#decodeDate)

Decodes a string into a Date. The string can be of form `YYYY`, `YYYY-MM`, or `YYYY-MM-DD`.

#### Arguments

1. `encodedValue` (*String*): The Date value as a string, can be of form `YYYY`, `YYYY-MM`, or `YYYY-MM-DD`.

#### Returns

(*Date*): The Date representation of the encoded value. If the input string is invalid, it returns `undefined`.

#### Examples

```js
decodeDate('2014-04-21');
// === new Date(2014, 3, 21)

decodeDate('2015');
// === new Date(2015 0, 1);
```


### <a id='decodeJson'></a>[`decodeJson(encodedValue)`](#decodeJson)

Decodes a string into javascript based on `JSON.parse`.


#### Arguments

1. `encodedValue` (*String*): The javascript data to parse.


#### Returns

(*Any*): The javascript representation of the encoded value. If the input string is invalid, it returns `undefined`.

#### Examples

```js
decodeJson('{"foo": "bar", "jim": ["grill"]}');
// === {'foo': 'bar', 'jim': ['grill']}

decodeJson('["one", "two", "three"]');
// === ['one', 'two', 'three']
```


### <a id='decodeObject'></a>[`decodeObject(encodedValue, [keyValSeparator], [entrySeparator])`](#decodeObject)

Decodes a string into an object. Only supports simple, flat objects where the values are strings.

#### Arguments

1. `encodedValue` (*String*): The object value as a string where keys and values are separated by `keyValSeparator` and entries are separated by `entrySeparator`.
1. [`keyValSeparator`] (*String*): The string used to separate keys from values in the encoded object. If not provided, defaults to `'-'`.
1. [`entrySeparator`] (*String*): The string used to separate entries in the encoded object. If not provided, defaults to `'_'`.

#### Returns

(*Object*): The Object representation of the encoded value.

#### Examples

```js
decodeObject('foo-bar_boo-baz');
// === { foo: 'bar', boo: 'baz' }

decodeObject('foo---bar___boo---baz', '---', '___');
// === { foo: 'bar', boo: 'baz' }
```


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
