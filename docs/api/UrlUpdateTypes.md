### UrlUpdateTypes

An enum listing all the available update types that can be used to indicate how the URL updates.

* `replaceIn` - Update a single value in the set of query parameters, retaining the existing values for all others. Uses replace when modifying the history, so it does not add anything to the history stack.

* `pushIn` - Update a single value in the set of query parameters, retaining the existing values for all others. Uses push when modifying the history, meaning it pushes an entry on to the history stack. This enables using the back button to go to the previous state.

* `replace` - Update all values in the query parameters. Uses replace when modifying the history, so it does not add anything to the history stack.

* `push` - Update all values in the query parameters. Uses push when modifying the history, meaning it pushes an entry on to the history stack. This enables using the back button to go to the previous state.


#### Examples

```js
import { UrlUpdateTypes } from 'react-url-query';

const urlPropsQueryConfig = {
  foo: { type: ..., updateType: UrlUpdateTypes.pushIn },
};
```
