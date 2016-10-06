### `urlReplaceInAction(actionType, queryParam, valueType)`

A helper function to create action creators that can create actions interpretable by [urlQueryMiddleware](urlQueryMiddleware.md) and [urlQueryReducer](urlQueryReducer.md) to change one query parameter in the URL without adding an entry to the history stack. The standard format of an action produced by the action creators this function creates is:

```js
{
  type: actionType,
  meta: {
    updateType: UrlUpdateTypes.replaceIn,
    urlQuery: true
  },
  payload: {
    queryParam: String,
    encodedValue: String,
    decodedValue: Any,
    type: valueType,
  }
}
```


#### Arguments

1. `actionType` (*String*): The standard redux action type, maps to `type` in the action.
1. `queryParam` (*String*): The name of the query parameter to update in the URL.
1. `valueType` (*String|Function|Object*): The type of the data. This is used to encode the data via [`encode`](Serialize.md#encode).

#### Returns

(*Function*): An action creator that will produce an action that is recognizable by [urlQueryMiddleware](urlQueryMiddleware.md) and [urlQueryReducer](urlQueryReducer.md).

#### Remarks

* The default [urlQueryReducer](urlQueryReducer.md) provided by React URL Query interprets the `updateType` property in the meta of the action to update the URL accordingly. If you are not using it, you'll need to do so manually.

#### Examples

```js
const changeFoo = urlReplaceInAction('CHANGE_FOO', 'foo', UrlQueryParamTypes.number);
dispatch(changeFoo(137));
/*
dispatches action of form:
  {
    type: 'CHANGE_FOO',
    meta: {
      urlQuery: true,
      updateType: UrlUpdateTypes.replaceIn
    },
    payload: {
      queryParam: 'foo',
      encodedValue: '137',
      decodeValue: 137,
      type: UrlQueryParamTypes.number
    }
  }
*/
```
