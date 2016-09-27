import { urlInAction, urlPushAction, QueryParamTypes, encode } from 'react-url-query';

export const CHANGE_BAZ = 'CHANGE_BAZ';
export const CHANGE_FOO = 'CHANGE_FOO';
export const CHANGE_BAR = 'CHANGE_BAR';
export const CHANGE_ARR = 'CHANGE_ARR';
export const CHANGE_MANY = 'CHANGE_MANY';

/**
 * Standard redux action creator
 */
export function changeBaz(baz) {
  return {
    type: CHANGE_BAZ,
    payload: baz
  };
}

/**
 * Action creators for the urlQueryReducer. The first argument specifies
 * the action type, the second the query parameter name (what shows up in
 * the URL), and the third argument specifies the value type (used to
 * encode the value as a string for the URL).
 *
 * Application code uses these the same way standard redux action creators
 * are used. (e.g., `dispatch(changeFoo(94))`)
 */
export const changeFoo = urlInAction(CHANGE_FOO, 'fooInUrl', QueryParamTypes.number);
export const changeBar = urlInAction(CHANGE_BAR, 'bar', QueryParamTypes.string);
export const changeArr = urlInAction(CHANGE_ARR, 'arr', QueryParamTypes.array);

/**
 * Example of pushing a whole new query. The second argument specifies how to
 * encode the query for the URL
 */
export const changeMany = urlPushAction(CHANGE_MANY,
  (newQuery) => ({
    fooInUrl: encode(QueryParamTypes.number, newQuery.foo),
    bar: 'par',
    arr: 'T_Y'
  }));
