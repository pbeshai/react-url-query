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
