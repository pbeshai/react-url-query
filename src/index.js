export configureUrlQuery from './configureUrlQuery';

export * as Serialize, { encode, decode } from './serialize';
export {
  replaceInUrlQuery,
  replaceUrlQuery,
  pushInUrlQuery,
  pushUrlQuery,
  multiReplaceInUrlQuery,
  multiPushInUrlQuery,
} from './updateUrlQuery';
export UrlQueryParamTypes from './UrlQueryParamTypes';
export UrlUpdateTypes from './UrlUpdateTypes';

/** React */
export addUrlProps from './react/addUrlProps';
export RouterToUrlQuery from './react/RouterToUrlQuery';

/** Redux */
export {
  replaceInUrlQueryFromAction,
  replaceUrlQueryFromAction,
  pushInUrlQueryFromAction,
  pushUrlQueryFromAction,
} from './redux/updateUrlQueryFromAction';
export urlAction, {
  urlReplaceAction,
  urlPushAction,
  urlReplaceInAction,
  urlPushInAction,
} from './redux/urlAction';
export urlQueryMiddleware from './redux/urlQueryMiddleware';
export urlQueryReducer from './redux/urlQueryReducer';

/** Utils */
export subquery from './utils/subquery';
export subqueryOmit from './utils/subqueryOmit';
