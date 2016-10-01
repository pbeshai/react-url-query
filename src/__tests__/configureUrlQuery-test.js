import configureUrlQuery from '../configureUrlQuery';
import urlQueryConfig from '../urlQueryConfig';

it('updates the singleton query object', () => {
  configureUrlQuery({ test: 99 });
  expect(urlQueryConfig.test).toBe(99);

  configureUrlQuery({ history: 123 });
  expect(urlQueryConfig.history).toBe(123);
  expect(urlQueryConfig.test).toBe(99);
});

it('does not break on undefined options', () => {
  configureUrlQuery();
  expect(Object.keys(urlQueryConfig).length).toBeGreaterThan(0);
});
