import { encode } from './serialize';

export const URL_REPLACE_IN = 'URL_REPLACE_IN';

/**
 * Helper function for creating URL action creators
 *
 * For example in your actions.js file:
 * export const changeFoo = urlAction('CHANGE_FOO', 'foo', 'number');
 *
 */
export default function urlAction(actionType, queryParam, valueType) {
  return function urlActionCreator(value) {
    const encodedValue = encode(valueType, value);
    return {
      type: actionType,
      meta: {
        // we need urlQuery set so the middleware knows to read this action
        urlQuery: true,
      },
      payload: { queryParam, encodedValue, decodedValue: value, type: valueType },
    };
  };
}
