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

it('configures entrySeparator and keyValSeparator global values', () => {
  expect(urlQueryConfig.entrySeparator).toBe('_');
  expect(urlQueryConfig.keyValSeparator).toBe('-');

  configureUrlQuery({ entrySeparator: '__' });
  expect(urlQueryConfig.entrySeparator).toBe('__');
  expect(urlQueryConfig.keyValSeparator).toBe('-');

  configureUrlQuery({ keyValSeparator: '--' });
  expect(urlQueryConfig.entrySeparator).toBe('__');
  expect(urlQueryConfig.keyValSeparator).toBe('--');

  // Reset so it does not effect other tests
  configureUrlQuery({ entrySeparator: '_', keyValSeparator: '-' });
});
