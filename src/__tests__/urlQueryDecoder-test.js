import urlQueryDecoder from '../urlQueryDecoder';
import UrlQueryParamTypes from '../UrlQueryParamTypes';

it('works with basic configuration', () => {
  const urlPropsQueryConfig = {
    foo: { type: UrlQueryParamTypes.number },
    bar: { type: UrlQueryParamTypes.string },
  };

  const decode = urlQueryDecoder(urlPropsQueryConfig);
  const decoded = decode({ foo: '137', bar: 'str' });

  expect(decoded).toEqual({ foo: 137, bar: 'str' });
});

it('works with different named query param', () => {
  const urlPropsQueryConfig = {
    foo: { type: UrlQueryParamTypes.number, queryParam: 'fooInUrl' },
    bar: { type: UrlQueryParamTypes.string },
  };

  const decode = urlQueryDecoder(urlPropsQueryConfig);
  const decoded = decode({ fooInUrl: '137', bar: 'str' });

  expect(decoded).toEqual({ foo: 137, bar: 'str' });
});

it('validate filters out invalid params', () => {
  const urlPropsQueryConfig = {
    foo: { type: UrlQueryParamTypes.number, validate: foo => foo > 100 },
    bar: { type: UrlQueryParamTypes.string },
  };

  const decode = urlQueryDecoder(urlPropsQueryConfig);
  expect(decode({ foo: '137', bar: 'str' })).toEqual({ foo: 137, bar: 'str' });
  expect(decode({ foo: '99', bar: 'str' })).toEqual({ bar: 'str' });
});

it('uses cached decoded values if encoded values have not changed', () => {
  const urlPropsQueryConfig = {
    foo: { type: UrlQueryParamTypes.array },
    bar: { type: UrlQueryParamTypes.string },
  };

  const decode = urlQueryDecoder(urlPropsQueryConfig);
  const decoded = decode({ foo: '137_94', bar: 'str' });
  expect(decode({ foo: '137_94', bar: 'bar' }).foo).toBe(decoded.foo);
  expect(decode({ foo: '137_95', bar: 'bar' }).foo).not.toBe(decoded.foo);
});

it('respects the `defaultValue` configuration', () => {
  const urlPropsQueryConfig = {
    foo: { type: UrlQueryParamTypes.number, defaultValue: 42 },
    bar: { type: UrlQueryParamTypes.string },
  };

  const decode = urlQueryDecoder(urlPropsQueryConfig);
  const decoded = decode({ bar: 'str' });

  expect(decoded).toEqual({ foo: 42, bar: 'str' });
});

it('respects the `defaultValue` configuration for the properties with named `queryParam`', () => {
  const urlPropsQueryConfig = {
    foo: {
      type: UrlQueryParamTypes.number,
      queryParam: 'fooInUrl',
      defaultValue: 42,
    },
    bar: { type: UrlQueryParamTypes.string },
  };

  const decode = urlQueryDecoder(urlPropsQueryConfig);
  const decoded = decode({ bar: 'str' });

  expect(decoded).toEqual({ foo: 42, bar: 'str' });
});

it('respects custom decoders', () => {
  const urlPropsQueryConfig = {
    foo: { type: value => Number(value) + 1 },
    bar: { type: UrlQueryParamTypes.string },
  };

  const decode = urlQueryDecoder(urlPropsQueryConfig);
  const decoded = decode({ foo: '137', bar: 'str' });

  expect(decoded).toEqual({ foo: 138, bar: 'str' });
});

it('respects custom decoders with named `queryParam`', () => {
  const urlPropsQueryConfig = {
    foo: { type: value => Number(value) + 1, queryParam: 'fooInUrl' },
    bar: { type: UrlQueryParamTypes.string },
  };

  const decode = urlQueryDecoder(urlPropsQueryConfig);
  const decoded = decode({ fooInUrl: '137', bar: 'str' });

  expect(decoded).toEqual({ foo: 138, bar: 'str' });
});

it('respects the `defaultValue` configuration with a custom decoder', () => {
  const urlPropsQueryConfig = {
    foo: {
      type: (value, defaultValue) =>
        value === '137' ? defaultValue : Number(value),
      defaultValue: 42,
    },
    bar: { type: UrlQueryParamTypes.string },
  };

  const decode = urlQueryDecoder(urlPropsQueryConfig);
  const decoded = decode({ foo: '137', bar: 'str' });

  expect(decoded).toEqual({ foo: 42, bar: 'str' });
});

it('respects the `defaultValue` configuration with a custom decoder and a named `queryParam`', () => {
  const urlPropsQueryConfig = {
    foo: {
      type: (value, defaultValue) =>
        value === '137' ? defaultValue : Number(value),
      defaultValue: 42,
      queryParam: 'fooInUrl',
    },
    bar: { type: UrlQueryParamTypes.string },
  };

  const decode = urlQueryDecoder(urlPropsQueryConfig);
  const decoded = decode({ fooInUrl: '137', bar: 'str' });

  expect(decoded).toEqual({ foo: 42, bar: 'str' });
});
