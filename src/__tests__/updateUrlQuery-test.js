import configureUrlQuery from '../configureUrlQuery';
import UrlUpdateTypes from '../UrlUpdateTypes';
import {
  replaceUrlQuery,
  pushUrlQuery,
  replaceInUrlQuery,
  pushInUrlQuery,
  updateUrlQuerySingle,
  updateUrlQueryMulti,
} from '../updateUrlQuery';

function makeMockHistory() {
  return {
    replace: jest.fn().mockImplementation(location => location),
    push: jest.fn().mockImplementation(location => location),
  };
}

describe('updateUrlQuerySingle', () => {
  it('works with replace', () => {
    const history = makeMockHistory();
    configureUrlQuery({ history });

    const location = { pathname: '/', search: '?foo=99&bar=baz' };
    const newLocation = updateUrlQuerySingle(UrlUpdateTypes.replace, 'foo', '123', location);
    expect(newLocation).toEqual({ pathname: '/', search: '?foo=123' });
    expect(history.replace).toBeCalled();
    expect(history.push).not.toBeCalled();
  });

  it('works with push', () => {
    const history = makeMockHistory();
    configureUrlQuery({ history });

    const location = { pathname: '/', search: '?foo=99&bar=baz' };
    const newLocation = updateUrlQuerySingle(UrlUpdateTypes.push, 'foo', '123', location);
    expect(newLocation).toEqual({ pathname: '/', search: '?foo=123' });
    expect(history.push).toBeCalled();
    expect(history.replace).not.toBeCalled();
  });

  it('works with replaceIn', () => {
    const history = makeMockHistory();
    configureUrlQuery({ history });

    const location = { pathname: '/', search: '?foo=99&bar=baz' };
    const newLocation = updateUrlQuerySingle(UrlUpdateTypes.replaceIn, 'foo', '123', location);
    expect(newLocation).toEqual({ pathname: '/', search: '?bar=baz&foo=123' });
    expect(history.replace).toBeCalled();
    expect(history.push).not.toBeCalled();
  });

  it('works with pushIn', () => {
    const history = makeMockHistory();
    configureUrlQuery({ history });

    const location = { pathname: '/', search: '?foo=99&bar=baz' };
    const newLocation = updateUrlQuerySingle(UrlUpdateTypes.pushIn, 'foo', '123', location);
    expect(newLocation).toEqual({ pathname: '/', search: '?bar=baz&foo=123' });
    expect(history.push).toBeCalled();
    expect(history.replace).not.toBeCalled();
  });
});

describe('replaceUrlQuery', () => {
  it('creates a new query and calls replace in history', () => {
    const history = makeMockHistory();
    configureUrlQuery({ history });

    const location = { pathname: '/', search: '?foo=99&bar=baz' };
    const newLocation = replaceUrlQuery({ foo: '123' }, location);
    expect(newLocation).toEqual({ pathname: '/', search: '?foo=123' });
    expect(history.replace).toBeCalled();
    expect(history.push).not.toBeCalled();
  });
});

describe('pushUrlQuery', () => {
  it('creates a new query and calls push in history', () => {
    const history = makeMockHistory();
    configureUrlQuery({ history });

    const location = { pathname: '/', search: '?foo=99&bar=baz' };
    const newLocation = pushUrlQuery({ foo: '123' }, location);
    expect(newLocation).toEqual({ pathname: '/', search: '?foo=123' });
    expect(history.push).toBeCalled();
    expect(history.replace).not.toBeCalled();
  });
});

describe('replaceInUrlQuery', () => {
  it('replaces the value for the specified param in the query and calls replace in history', () => {
    const history = makeMockHistory();
    configureUrlQuery({ history });

    const location = { pathname: '/', search: '?bar=baz' };
    const newLocation = replaceInUrlQuery('foo', '123', location);
    expect(newLocation).toEqual({ pathname: '/', search: '?bar=baz&foo=123' });
    expect(history.replace).toBeCalled();
    expect(history.push).not.toBeCalled();
  });

  it('works with location that has query field', () => {
    const history = makeMockHistory();
    configureUrlQuery({ history });

    const location = { pathname: '/', query: { foo: '99', bar: 'baz' } };
    const newLocation = replaceInUrlQuery('foo', '123', location);
    expect(newLocation).toEqual({ pathname: '/', query: { foo: '123', bar: 'baz' } });
    expect(history.replace).toBeCalled();
    expect(history.push).not.toBeCalled();
  });

  it('works with location read from history', () => {
    const history = makeMockHistory();
    configureUrlQuery({ history });

    history.location = { pathname: '/', query: { foo: '99', bar: 'baz' } };

    const newLocation = replaceInUrlQuery('foo', '123');
    expect(newLocation).toEqual({ pathname: '/', query: { foo: '123', bar: 'baz' } });
    expect(history.replace).toBeCalled();
    expect(history.push).not.toBeCalled();
  });

  // TODO: would be good to have a test for window.location, but I can't seem to get
  // it working properly. See https://github.com/facebook/jest/issues/890
  // it('works with location read from window.location', () => {
  //   const history = makeMockHistory();
  //   configureUrlQuery({ history });
  //
  //   window.location.pathname = '/';
  //   window.location.search = '?bar=baz&foo=99';
  //
  //   const newLocation = replaceInUrlQuery('foo', '123');
  //   expect(newLocation).toEqual({ pathname: '/', search: '?bar=baz&foo=123' });
  //   expect(history.replace).toBeCalled();
  //   expect(history.push).not.toBeCalled();
  // });
});

describe('pushInUrlQuery', () => {
  it('replaces the value for the specified param in the query and calls push in history', () => {
    const history = makeMockHistory();
    configureUrlQuery({ history });

    const location = { pathname: '/', search: '?foo=99&bar=baz' };
    const newLocation = pushInUrlQuery('foo', '123', location);
    expect(newLocation).toEqual({ pathname: '/', search: '?bar=baz&foo=123' });
    expect(history.push).toBeCalled();
    expect(history.replace).not.toBeCalled();
  });
});

describe('updateUrlQueryMulti', () => {
  it('works with replace', () => {
    const history = makeMockHistory();
    configureUrlQuery({ history });

    const location = { pathname: '/', search: '?foo=99&bar=baz&blatt=david' };
    const newLocation = updateUrlQueryMulti(UrlUpdateTypes.replace, { bar: 'test', foo: '123' }, location);
    expect(newLocation).toEqual({ pathname: '/', search: '?bar=test&foo=123' });
    expect(history.replace).toBeCalled();
    expect(history.push).not.toBeCalled();
  });

  it('works with push', () => {
    const history = makeMockHistory();
    configureUrlQuery({ history });

    const location = { pathname: '/', search: '?foo=99&bar=baz&blatt=david' };
    const newLocation = updateUrlQueryMulti(UrlUpdateTypes.push, { bar: 'test', foo: '123' }, location);
    expect(newLocation).toEqual({ pathname: '/', search: '?bar=test&foo=123' });
    expect(history.push).toBeCalled();
    expect(history.replace).not.toBeCalled();
  });

  it('works with replaceIn', () => {
    const history = makeMockHistory();
    configureUrlQuery({ history });

    const location = { pathname: '/', search: '?foo=99&bar=baz&blatt=david' };
    const newLocation = updateUrlQueryMulti(UrlUpdateTypes.replaceIn, { bar: 'test', foo: '123' }, location);
    expect(newLocation).toEqual({ pathname: '/', search: '?bar=test&blatt=david&foo=123' });
    expect(history.replace).toBeCalled();
    expect(history.push).not.toBeCalled();
  });

  it('works with pushIn', () => {
    const history = makeMockHistory();
    configureUrlQuery({ history });

    const location = { pathname: '/', search: '?foo=99&bar=baz&blatt=david' };
    const newLocation = updateUrlQueryMulti(UrlUpdateTypes.pushIn, { bar: 'test', foo: '123' }, location);
    expect(newLocation).toEqual({ pathname: '/', search: '?bar=test&blatt=david&foo=123' });
    expect(history.push).toBeCalled();
    expect(history.replace).not.toBeCalled();
  });
});
