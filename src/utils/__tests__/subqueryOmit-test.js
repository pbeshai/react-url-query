import subqueryOmit from '../subqueryOmit';

it('works with nully query', () => {
  expect(subqueryOmit(undefined, 'one')).toBeFalsy();
});

it('returns full input object if no params', () => {
  const input = { one: 'one', two: 'two' };
  expect(subqueryOmit(input)).toEqual(input);
});

it('returns proper subquery', () => {
  expect(subqueryOmit({ one: 'one', two: 'two', thr: 'ree' }, 'two', 'one'))
    .toEqual({ thr: 'ree' });
});

it('returns an empty object when all keys omitted', () => {
  expect(subqueryOmit({ one: 'one' }, 'one')).toEqual({});
});
