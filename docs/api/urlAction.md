### `urlAction(actionType, [payload], [meta])`

A helper function to create action creators that can create actions interpretable by [urlQueryMiddleware](urlQueryMiddleware.md) and [urlQueryReducer](urlQueryReducer.md). The standard format of an action produced by the action creators this function creates is:

```js
{
  type: actionType,
  meta: {
    ...meta,
    urlQuery: true
  },
  payload: payload
}
```


#### Arguments

1. `actionType` (*String*): The standard redux action type, maps to `type` in the action.
1. [`payload`] (*Function*): Takes the arguments provided from the action creator and produces what ends up in `payload` in the action. Can return any type. It defaults to the identity function.
1. [`meta`] (*Function*): Takes the arguments provided from the action creator and produces what ends up in  `meta` in the action. It must return an object, otherwise it will show up under `meta.value`.

#### Returns

(*Function*): An action creator that will produce an action that is recognizable by [urlQueryMiddleware](urlQueryMiddleware.md) and [urlQueryReducer](urlQueryReducer.md).

#### Examples

```js
const changeFoo = urlAction('CHANGE_FOO', foo => ({ encodedValue: String(foo) }));
dispatch(changeFoo(94));
/*
dispatches action of form:
  {
    type: 'CHANGE_FOO',
    meta: {
      urlQuery: true
    },
    payload: {
      encodedValue: '94'
    }
  }
*/
```

```js
const changeBar = urlAction(
  'CHANGE_BAR',
  bar => bar,
  bar => ({ updateType: UrlUpdateTypes.pushIn })
);
dispatch(changeBar('some-bar-value'));
/*
dispatches action of form:
  {
    type: 'CHANGE_BAR',
    meta: {
      urlQuery: true,
      updateType: UrlUpdateTypes.pushIn
    },
    payload: 'some-bar-value'
  }
*/
```
