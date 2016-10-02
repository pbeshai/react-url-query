import urlAction, {
  urlUpdateAction,
  urlReplaceAction,
  urlPushAction,
  urlUpdateInAction,
  urlReplaceInAction,
  urlPushInAction,
} from '../urlAction';
import UrlQueryParamTypes from '../../UrlQueryParamTypes';
import UrlUpdateTypes from '../../UrlUpdateTypes';


it('urlAction creates the proper action creator -> action', () => {
  const creator = urlAction('TEST_ACTION', payload => payload.toUpperCase(),
    meta => meta.toLowerCase());
  const action = creator('teStStrING');
  expect(action).toEqual({
    type: 'TEST_ACTION',
    meta: {
      urlQuery: true,
      value: 'teststring',
    },
    payload: 'TESTSTRING',
  });
});

it('urlAction payload and meta defaults work', () => {
  const creator = urlAction('TEST_ACTION');
  const action = creator({ foo: '123' });
  expect(action).toEqual({
    type: 'TEST_ACTION',
    meta: {
      urlQuery: true,
    },
    payload: {
      foo: '123',
    },
  });
});

it('urlAction handles nully meta', () => {
  const creator = urlAction('TEST_ACTION', undefined, () => null);
  const action = creator({ foo: '123' });
  expect(action).toEqual({
    type: 'TEST_ACTION',
    meta: {
      urlQuery: true,
    },
    payload: {
      foo: '123',
    },
  });
});

it('urlUpdateAction creates the proper action creator -> action', () => {
  const creator = urlUpdateAction('TEST_ACTION', query => ({ foo: String(query.foo), bar: '1' }),
    UrlUpdateTypes.push);
  const action = creator({ foo: 137 });
  expect(action).toEqual({
    type: 'TEST_ACTION',
    meta: {
      urlQuery: true,
      updateType: UrlUpdateTypes.push,
    },
    payload: {
      encodedQuery: { foo: '137', bar: '1' },
      decodedQuery: { foo: 137 },
    },
  });
});

it('urlUpdateAction default encodeQuery and updateType work', () => {
  const creator = urlUpdateAction('TEST_ACTION');
  const action = creator({ foo: '137' });
  expect(action).toEqual({
    type: 'TEST_ACTION',
    meta: {
      urlQuery: true,
      updateType: UrlUpdateTypes.replace,
    },
    payload: {
      encodedQuery: { foo: '137' },
      decodedQuery: { foo: '137' },
    },
  });
});

it('urlReplaceAction creates the proper action creator -> action', () => {
  const creator = urlReplaceAction('TEST_ACTION', query => ({ foo: String(query.foo), bar: '1' }));
  const action = creator({ foo: 137 });
  expect(action).toEqual({
    type: 'TEST_ACTION',
    meta: {
      urlQuery: true,
      updateType: UrlUpdateTypes.replace,
    },
    payload: {
      encodedQuery: { foo: '137', bar: '1' },
      decodedQuery: { foo: 137 },
    },
  });
});

it('urlPushAction creates the proper action creator -> action', () => {
  const creator = urlPushAction('TEST_ACTION', query => ({ foo: String(query.foo), bar: '1' }));
  const action = creator({ foo: 137 });
  expect(action).toEqual({
    type: 'TEST_ACTION',
    meta: {
      urlQuery: true,
      updateType: UrlUpdateTypes.push,
    },
    payload: {
      encodedQuery: { foo: '137', bar: '1' },
      decodedQuery: { foo: 137 },
    },
  });
});

it('urlUpdateInAction creates the proper action creator -> action', () => {
  const creator = urlUpdateInAction('TEST_ACTION', 'foo', UrlQueryParamTypes.number, UrlUpdateTypes.push);
  const action = creator(99);
  expect(action).toEqual({
    type: 'TEST_ACTION',
    meta: {
      urlQuery: true,
      updateType: UrlUpdateTypes.push,
    },
    payload: {
      queryParam: 'foo',
      encodedValue: '99',
      decodedValue: 99,
      type: UrlQueryParamTypes.number,
    },
  });
});

it('urlReplaceInAction creates the proper action creator -> action', () => {
  const creator = urlReplaceInAction('TEST_ACTION', 'foo', UrlQueryParamTypes.array);
  const action = creator(['bar', 'baz']);
  expect(action).toEqual({
    type: 'TEST_ACTION',
    meta: {
      urlQuery: true,
      updateType: UrlUpdateTypes.replaceIn,
    },
    payload: {
      queryParam: 'foo',
      encodedValue: 'bar_baz',
      decodedValue: ['bar', 'baz'],
      type: UrlQueryParamTypes.array,
    },
  });
});

it('urlPushInAction creates the proper action creator -> action', () => {
  const creator = urlPushInAction('TEST_ACTION', 'foo', UrlQueryParamTypes.number);
  const action = creator(123);
  expect(action).toEqual({
    type: 'TEST_ACTION',
    meta: {
      urlQuery: true,
      updateType: UrlUpdateTypes.pushIn,
    },
    payload: {
      queryParam: 'foo',
      encodedValue: '123',
      decodedValue: 123,
      type: UrlQueryParamTypes.number,
    },
  });
});
