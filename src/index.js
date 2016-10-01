import configureUrlQuery from './configureUrlQuery';

import * as Serialize from './serialize';
import {
  replaceInUrlQuery,
  replaceUrlQuery,
  pushInUrlQuery,
  pushUrlQuery,
} from './updateUrlQuery';
import UrlQueryParamTypes from './UrlQueryParamTypes';
import UrlUpdateTypes from './UrlUpdateTypes';

/** React */
import addUrlProps from './react/addUrlProps';
import RouterToUrlQuery from './react/RouterToUrlQuery';

/** Redux */
import {
  replaceInUrlQueryFromAction,
  replaceUrlQueryFromAction,
  pushInUrlQueryFromAction,
  pushUrlQueryFromAction,
} from './redux/updateUrlQueryFromAction';
import urlAction, {
  urlReplaceAction,
  urlPushAction,
  urlReplaceInAction,
  urlPushInAction,
} from './redux/urlAction';
import urlQueryMiddleware from './redux/urlQueryMiddleware';
import urlQueryReducer from './redux/urlQueryReducer';

/** Utils */
import subquery from './utils/subquery';
import subqueryOmit from './utils/subqueryOmit';

// for convenience export these two directly
const decode = Serialize.decode;
const encode = Serialize.encode;

export {
  configureUrlQuery,

  Serialize,
  decode,
  encode,
  pushInUrlQuery,
  pushUrlQuery,
  replaceInUrlQuery,
  replaceUrlQuery,
  UrlQueryParamTypes,
  UrlUpdateTypes,

  addUrlProps,
  RouterToUrlQuery,

  urlAction,
  urlReplaceInAction,
  urlReplaceAction,
  urlPushInAction,
  urlPushAction,
  pushInUrlQueryFromAction,
  pushUrlQueryFromAction,
  replaceInUrlQueryFromAction,
  replaceUrlQueryFromAction,
  urlQueryMiddleware,
  urlQueryReducer,

  subquery,
  subqueryOmit,
};
