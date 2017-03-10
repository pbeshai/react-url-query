import {
  configureUrlQuery,
  Serialize,
  encode,
  decode,
  replaceInUrlQuery,
  replaceUrlQuery,
  pushInUrlQuery,
  pushUrlQuery,
  multiReplaceInUrlQuery,
  multiPushInUrlQuery,
  UrlQueryParamTypes,
  UrlUpdateTypes,
  addUrlProps,
  RouterToUrlQuery,
  replaceInUrlQueryFromAction,
  replaceUrlQueryFromAction,
  pushInUrlQueryFromAction,
  pushUrlQueryFromAction,
  urlAction,
  urlReplaceAction,
  urlPushAction,
  urlReplaceInAction,
  urlPushInAction,
  urlQueryMiddleware,
  urlQueryReducer,
  subquery,
  subqueryOmit,
} from '../index';


describe('index', () => {
  it('includes all expected functions without crashing', () => {
    expect(configureUrlQuery).toBeDefined();
    expect(Serialize).toBeDefined();
    expect(encode).toBeDefined();
    expect(decode).toBeDefined();
    expect(replaceInUrlQuery).toBeDefined();
    expect(replaceUrlQuery).toBeDefined();
    expect(pushInUrlQuery).toBeDefined();
    expect(pushUrlQuery).toBeDefined();
    expect(multiReplaceInUrlQuery).toBeDefined();
    expect(multiPushInUrlQuery).toBeDefined();
    expect(UrlQueryParamTypes).toBeDefined();
    expect(UrlUpdateTypes).toBeDefined();
    expect(addUrlProps).toBeDefined();
    expect(RouterToUrlQuery).toBeDefined();
    expect(replaceInUrlQueryFromAction).toBeDefined();
    expect(replaceUrlQueryFromAction).toBeDefined();
    expect(pushInUrlQueryFromAction).toBeDefined();
    expect(pushUrlQueryFromAction).toBeDefined();
    expect(urlAction).toBeDefined();
    expect(urlReplaceAction).toBeDefined();
    expect(urlPushAction).toBeDefined();
    expect(urlReplaceInAction).toBeDefined();
    expect(urlPushInAction).toBeDefined();
    expect(urlQueryMiddleware).toBeDefined();
    expect(urlQueryReducer).toBeDefined();
    expect(subquery).toBeDefined();
    expect(subqueryOmit).toBeDefined();
  });
});
