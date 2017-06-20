import {
  replaceInUrlQueryFromAction,
  replaceUrlQueryFromAction,
  pushInUrlQueryFromAction,
  pushUrlQueryFromAction,
} from '../updateUrlQueryFromAction';

import {
  replaceInUrlQuery,
  replaceUrlQuery,
  pushInUrlQuery,
  pushUrlQuery,
} from '../../updateUrlQuery';

// mock this module so we can test if it as called with correct args
jest.mock('../../updateUrlQuery');


it('replaceInUrlQueryFromAction extracts correct args from action', () => {
  replaceInUrlQueryFromAction({ payload: { queryParam: 'foo', encodedValue: '94' } }, 'location');
  expect(replaceInUrlQuery).toBeCalledWith('foo', '94', 'location');
});

it('pushInUrlQueryFromAction extracts correct args from action', () => {
  pushInUrlQueryFromAction({ payload: { queryParam: 'foo', encodedValue: '94' } }, 'location');
  expect(pushInUrlQuery).toBeCalledWith('foo', '94', 'location');
});

it('replaceUrlQueryFromAction extracts correct args from action', () => {
  replaceUrlQueryFromAction({ payload: { encodedQuery: { foo: '94' } } }, 'location');
  expect(replaceUrlQuery).toBeCalledWith({ foo: '94' }, 'location');
});

it('pushUrlQueryFromAction extracts correct args from action', () => {
  pushUrlQueryFromAction({ payload: { encodedQuery: { foo: '94' } } }, 'location');
  expect(pushUrlQuery).toBeCalledWith({ foo: '94' }, 'location');
});
