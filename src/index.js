import setUrlQueryOptions from './setUrlQueryOptions';

import * as Serialize from './url-io/serialize';
import pushUrlQuery from './url-io/pushUrlQuery';
import pushInUrlQuery from './url-io/pushInUrlQuery';
import replaceUrlQuery from './url-io/replaceUrlQuery';
import replaceInUrlQuery from './url-io/replaceInUrlQuery';
import urlQueryDecoder from './url-io/urlQueryDecoder';
import QueryParamTypes from './url-io/QueryParamTypes';
import UrlUpdateTypes from './url-io/UrlUpdateTypes';

import addUrlProps from './react/addUrlProps';

import pushUrlQueryFromAction from './redux/pushUrlQueryFromAction';
import pushInUrlQueryFromAction from './redux/pushInUrlQueryFromAction';
import replaceUrlQueryFromAction from './redux/replaceUrlQueryFromAction';
import replaceInUrlQueryFromAction from './redux/replaceInUrlQueryFromAction';
import urlAction, { urlReplaceAction, urlPushAction } from './redux/urlAction';
import urlInAction, { urlReplaceInAction, urlPushInAction } from './redux/urlInAction';
import urlQueryMiddleware from './redux/urlQueryMiddleware';
import urlQueryReducer from './redux/urlQueryReducer';

import subquery from './utils/subquery';
import subqueryOmit from './utils/subqueryOmit';

// for convenience export these two directly
const decode = Serialize.decode;
const encode = Serialize.encode;

export {
  addUrlProps,
  decode,
  encode,
  QueryParamTypes,
  pushInUrlQuery,
  pushInUrlQueryFromAction,
  pushUrlQuery,
  pushUrlQueryFromAction,
  replaceInUrlQuery,
  replaceInUrlQueryFromAction,
  replaceUrlQuery,
  replaceUrlQueryFromAction,
  Serialize,
  setUrlQueryOptions,
  subquery,
  subqueryOmit,
  urlAction,
  urlInAction,
  urlReplaceInAction,
  urlReplaceAction,
  urlPushInAction,
  urlPushAction,
  urlQueryDecoder,
  urlQueryMiddleware,
  urlQueryReducer,
  UrlUpdateTypes,
};
