import urlQueryEncoder from '../urlQueryEncoder';
import UrlQueryParamTypes from '../UrlQueryParamTypes';

it('works with basic configuration', () => {
  const urlPropsQueryConfig = {
    foo: { type: UrlQueryParamTypes.number },
    bar: { type: UrlQueryParamTypes.string },
  };

  const encode = urlQueryEncoder(urlPropsQueryConfig);
  const encoded = encode({ foo: 137, bar: 'str' });

  expect(encoded).toEqual({ foo: '137', bar: 'str' });
});

it('works with different named query param', () => {
  const urlPropsQueryConfig = {
    foo: { type: UrlQueryParamTypes.number, queryParam: 'fooInUrl' },
    bar: { type: UrlQueryParamTypes.string },
  };

  const encode = urlQueryEncoder(urlPropsQueryConfig);
  const encoded = encode({ foo: 137, bar: 'str' });

  expect(encoded).toEqual({ fooInUrl: '137', bar: 'str' });
});

it('works when the object to encode has got missing properties', () => {
  const urlPropsQueryConfig = {
    foo: { type: UrlQueryParamTypes.number, queryParam: 'fooInUrl' },
    bar: { type: UrlQueryParamTypes.string },
  };

  const encode = urlQueryEncoder(urlPropsQueryConfig);
  const encoded = encode({ foo: 137 });

  expect(encoded).toEqual({ fooInUrl: '137' });
});

it('works when the object to encode has got missing properies with named `queryParam`', () => {
  const urlPropsQueryConfig = {
    foo: { type: UrlQueryParamTypes.number, queryParam: 'fooInUrl' },
    bar: { type: UrlQueryParamTypes.string },
  };

  const encode = urlQueryEncoder(urlPropsQueryConfig);
  const encoded = encode({ bar: 'str' });

  expect(encoded).toEqual({ bar: 'str' });
});

it('respects custom encoders', () => {
  const urlPropsQueryConfig = {
    foo: { type: number => (number + 1).toString() },
    bar: { type: UrlQueryParamTypes.string },
  };

  const encode = urlQueryEncoder(urlPropsQueryConfig);
  const encoded = encode({ foo: 137, bar: 'str' });

  expect(encoded).toEqual({ foo: '138', bar: 'str' });
});

it('respects custom encoders with named `queryParam`', () => {
  const urlPropsQueryConfig = {
    foo: { type: number => (number + 1).toString(), queryParam: 'fooInUrl' },
    bar: { type: UrlQueryParamTypes.string },
  };

  const encode = urlQueryEncoder(urlPropsQueryConfig);
  const encoded = encode({ foo: 137, bar: 'str' });

  expect(encoded).toEqual({ fooInUrl: '138', bar: 'str' });
});
