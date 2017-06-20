import urlQueryMiddleware from '../urlQueryMiddleware';

import urlQueryReducer from '../urlQueryReducer';
import urlQueryConfig from '../../urlQueryConfig';
import configureUrlQuery from '../../configureUrlQuery';

jest.mock('../urlQueryReducer');

it('only runs on url query actions', () => {
  const options = { reducer: jest.fn(), readLocationFromStore: false };
  const store = { getState: () => ({}) };
  const next = jest.fn();
  const action = { type: 'ACTION_TYPE' };
  urlQueryMiddleware(options)(store)(next)(action);
  expect(next).toBeCalledWith(action);
  expect(options.reducer).not.toBeCalled();

  const action2 = { type: 'ACTION_TYPE', meta: { one: 1 } };
  urlQueryMiddleware(options)(store)(next)(action2);
  expect(next).toBeCalledWith(action2);
  expect(options.reducer).not.toBeCalled();

  const action3 = { type: 'ACTION_TYPE', meta: { urlQuery: true } };
  urlQueryMiddleware(options)(store)(next)(action3);
  expect(next).not.toBeCalledWith(action3);
  expect(options.reducer).toBeCalledWith(action3);
});

it('passes to next reducer if shortciruit is false', () => {
  const options = { reducer: jest.fn(), readLocationFromStore: false, shortcircuit: false };
  const store = { getState: () => ({}) };
  const next = jest.fn();
  const action = { type: 'ACTION_TYPE', meta: { urlQuery: true } };
  urlQueryMiddleware(options)(store)(next)(action);
  expect(options.reducer).toBeCalledWith(action);
  expect(next).toBeCalledWith(action);
});

it('reads location from store', () => {
  const options = { reducer: jest.fn(), readLocationFromStore: state => state.location };
  const store = { getState: () => ({ location: 'location' }) };
  const next = jest.fn();
  const action = { type: 'ACTION_TYPE', meta: { urlQuery: true } };
  urlQueryMiddleware(options)(store)(next)(action);
  expect(options.reducer).toBeCalledWith(action, 'location');
});


it('uses reducer from urlQueryConfig if not passed in', () => {
  configureUrlQuery({ reducer: jest.fn() });
  const options = { readLocationFromStore: false };
  const store = { getState: () => ({}) };
  const next = jest.fn();
  const action = { type: 'ACTION_TYPE', meta: { urlQuery: true } };
  urlQueryMiddleware(options)(store)(next)(action);
  expect(urlQueryConfig.reducer).toBeCalledWith(action);

  // reset urlQueryConfig
  configureUrlQuery({ reducer: undefined });
});


it('uses default reducer if none in options or urlQueryConfig', () => {
  const options = { readLocationFromStore: false };
  const store = { getState: () => ({}) };
  const next = jest.fn();
  const action = { type: 'ACTION_TYPE', meta: { urlQuery: true } };
  urlQueryMiddleware(options)(store)(next)(action);
  expect(urlQueryReducer).toBeCalledWith(action);
});

it('works given no options', () => {
  const options = undefined;
  const store = { getState: () => ({}) };
  const next = jest.fn();
  const action = { type: 'ACTION_TYPE', meta: { urlQuery: true } };
  urlQueryMiddleware(options)(store)(next)(action);
  expect(urlQueryReducer).toBeCalledWith(action, undefined);
});
