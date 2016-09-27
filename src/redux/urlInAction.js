import { encode } from '../url-io/serialize';
import UrlUpdateTypes from '../url-io/UrlUpdateTypes';

/**
 * Helper function for creating URL action creators
 *
 * For example in your actions.js file:
 * export const changeFoo = urlInAction('CHANGE_FOO', 'foo', 'number', 'replaceIn');
 *
 */
export default function urlInAction(actionType, queryParam, valueType, updateType) {
  return function urlActionCreator(value) {
    const encodedValue = encode(valueType, value);
    return {
      type: actionType,
      meta: {
        // we need urlQuery set so the middleware knows to read this action
        urlQuery: true,
        updateType,
      },
      payload: { queryParam, encodedValue, decodedValue: value, type: valueType },
    };
  };
}

export function urlReplaceInAction(actionType, queryParam, valueType) {
  return urlInAction(actionType, queryParam, valueType, UrlUpdateTypes.replaceIn);
}

export function urlPushInAction(actionType, queryParam, valueType) {
  return urlInAction(actionType, queryParam, valueType, UrlUpdateTypes.pushIn);
}
