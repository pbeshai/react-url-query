import setUrlQueryOptions from './setUrlQueryOptions';

/** URL input/output */
import * as Serialize from './url-io/serialize';
import {
  replaceInUrlQuery,
  replaceUrlQuery,
  pushInUrlQuery,
  pushUrlQuery,
} from './url-io/updateUrlQuery';
import urlQueryDecoder from './url-io/urlQueryDecoder';
import UrlQueryParamTypes from './url-io/UrlQueryParamTypes';
import UrlUpdateTypes from './url-io/UrlUpdateTypes';

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
  setUrlQueryOptions,

  Serialize,
  decode,
  encode,
  pushInUrlQuery,
  pushUrlQuery,
  replaceInUrlQuery,
  replaceUrlQuery,
  urlQueryDecoder,
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
