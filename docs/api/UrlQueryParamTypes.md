# UrlQueryParamTypes

An enum listing all the query parameter types that have built-in [serializers](Serialize.md) for encoding in and decoding from the URL.

* `number` - Used for numbers (integers or floats)
* `string` - Used for strings
* `object` - Used for objects
* `array` - Used for arrays
* `json` - Used for generic JSON values
* `date` - Used for Date values
* `boolean` - Used for boolean values

#### Examples

```js
import { UrlQueryParamTypes } from 'react-url-query';

const urlPropsQueryConfig = {
  foo: { type: UrlQueryParamTypes.number },
};
```
