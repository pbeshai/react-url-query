### `urlMultiPushInAction(actionType, [encodeQuery])`

A helper function to create action creators that can create actions interpretable by [urlQueryMiddleware](urlQueryMiddleware.md) and [urlQueryReducer](urlQueryReducer.md) to push a change to several query parameters into the URL, adding an entry to the history stack. The standard format of an action produced by the action creators this function creates is:

```js
{
  type: actionType,
  meta: {
    updateType: UrlUpdateTypes.multiPushIn,
    urlQuery: true
  },
  payload: {
    encodedQuery: Object,
    decodedQuery: Object,
  }
}
```


#### Arguments

1. `actionType` (*String*): The standard redux action type, maps to `type` in the action.
1. [`encodeQuery`] (*Function*): A function that takes in a query object and maps it to an *Object* where the keys represent query parameters and the values represent encoded *String* values.

#### Returns

(*Function*): An action creator that will produce an action that is recognizable by [urlQueryMiddleware](urlQueryMiddleware.md) and [urlQueryReducer](urlQueryReducer.md).

#### Remarks

* The default [urlQueryReducer](urlQueryReducer.md) provided by React URL Query interprets the `updateType` property in the meta of the action to update the URL accordingly. If you are not using it, you'll need to do so manually.

#### Examples

```js
const changeFooBar = urlMultiPushInAction(
  'CHANGE_FOO_BAR',
  query => ({ foo: String(query.foo), bar: query.bar })
);
dispatch(changeFooBar({ foo: 137, bar: 'baz' }));
/*
dispatches action of form:
  {
    type: 'CHANGE_FOO_BAR',
    meta: {
      urlQuery: true,
      updateType: UrlUpdateTypes.multiPushIn
    },
    payload: {
      encodedQuery: { foo: '137', bar: 'baz' },
      decodedQuery: { foo: 137, bar: 'baz' }
    }
  }
*/
```
