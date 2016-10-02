# API Reference

### Top-Level Exports

React URL Query provides a number of top-level exports.


#### Higher-order Component
* [addUrlProps([options])](addUrlProps.md)

#### Library Configuration
* [configureUrlQuery([config])](configureUrlQuery.md)

#### Type Enums
* [UrlQueryParamTypes](UrlQueryParamTypes.md)
* [UrlUpdateTypes](UrlUpdateTypes.md)

#### Serialization
* [Serialize](Serialize.md)
* [decode(type, encodedValue, [defaultValue])](Serialize.md#decode), _alias of Serialize.decode for convenience_
* [encode(type, decodedValue)](Serialize.md#encode), _alias of Serialize.encode for convenience_

#### Helpers for Subsetting Queries
* [subquery(query, ...params)](subquery.md)
* [subqueryOmit(query, ...omitParams)](subqueryOmit.md)

#### URL Update Helpers
* [replaceInUrlQuery(queryParam, encodedValue, [location])](replaceInUrlQuery.md)
* [pushInUrlQuery(queryParam, encodedValue, [location])](pushInUrlQuery.md)
* [replaceUrlQuery(newQuery, [location])](replaceUrlQuery.md)
* [pushUrlQuery(newQuery, [location])](pushUrlQuery.md)

#### Integration with React-Router v4
* [<RouterToUrlQuery />](RouterToUrlQuery.md)

#### Helpers for alternative Redux integration
* [replaceInUrlQueryFromAction(action, [location])](replaceInUrlQueryFromAction.md)
* [replaceUrlQueryFromAction(action, [location])](replaceUrlQueryFromAction.md)
* [pushInUrlQueryFromAction(action, [location])](pushInUrlQueryFromAction.md)
* [pushUrlQueryFromAction(action, [location])](pushUrlQueryFromAction.md)
* [urlAction(actionType, payload, [meta])](urlAction.md)
* [urlReplaceInAction(actionType, queryParam, valueType)](urlReplaceInAction.md)
* [urlPushInAction(actionType, queryParam, valueType)](urlPushInAction.md)
* [urlReplaceAction(actionType, [encodeQuery])](urlReplaceAction.md)
* [urlPushAction(actionType, [encodeQuery])](urlPushAction.md)
* [urlQueryMiddleware([options])](urlQueryMiddleware.md)
* [urlQueryReducer(action, [location])](urlQueryReducer.md)


### Importing

You can import any of the **Top-Level Exports** as follows:

#### ES6

```js
import { addUrlProps } from 'react-url-query'
```
