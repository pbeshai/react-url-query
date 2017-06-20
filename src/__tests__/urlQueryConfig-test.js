import urlQueryConfig from '../urlQueryConfig';

it('provides defaults for all options', () => {
  expect(Object.keys(urlQueryConfig)).toContain('addUrlChangeHandlers');
  expect(Object.keys(urlQueryConfig)).toContain('addRouterParams');
  expect(Object.keys(urlQueryConfig)).toContain('changeHandlerName');
  expect(Object.keys(urlQueryConfig)).toContain('history');
  expect(Object.keys(urlQueryConfig)).toContain('readLocationFromStore');
});

it('changeHandlerName produces a string based on the prop name', () => {
  expect(urlQueryConfig.changeHandlerName('foo').toLowerCase()).toContain('foo');
});

it('provides a history with push and replace functions', () => {
  expect(typeof urlQueryConfig.history.push).toBe('function');
  expect(typeof urlQueryConfig.history.replace).toBe('function');
});

it('provides readLocationFromStore that reads from react-router-redux location', () => {
  expect(typeof urlQueryConfig.readLocationFromStore).toBe('function');
  const reactRouterReduxState = { routing: { locationBeforeTransitions: { foo: 'bar' } } };
  expect(urlQueryConfig.readLocationFromStore(reactRouterReduxState))
    .toEqual({ foo: 'bar' });

  expect(urlQueryConfig.readLocationFromStore()).not.toBeDefined();
  expect(urlQueryConfig.readLocationFromStore({})).not.toBeDefined();
  expect(urlQueryConfig.readLocationFromStore({ routing: {} })).not.toBeDefined();
});
