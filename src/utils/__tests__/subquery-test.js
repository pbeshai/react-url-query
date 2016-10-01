import subquery from '../subquery';

it('works with nully query', () => {
  expect(subquery(undefined, 'one')).toBeFalsy();
});

it('returns empty object if no params', () => {
  expect(subquery({ one: 'one', two: 'two' })).toEqual({});
});

it('returns proper subquery', () => {
  expect(subquery({ one: 'one', two: 'two', thr: 'ree' }, 'two', 'one'))
    .toEqual({ one: 'one', two: 'two' });
});

it('returns a new object even if all keys match', () => {
  const input = { one: 'one' };
  const result = subquery(input, 'one');
  expect(result).toEqual({ one: 'one' });
  expect(result).not.toBe(input);
});
