import { encode } from '../serialize';
import UrlUpdateTypes from '../UrlUpdateTypes';


export default function urlAction(actionType, payload = d => d, meta = () => {}) {
  return function urlActionCreator(...args) {
    let metaFromAction = meta(...args);
    if (metaFromAction == null) {
      metaFromAction = {};

    // we need meta to be an object so it merges in with the urlQuery meta property.
    } else if (typeof metaFromAction !== 'object') {
      metaFromAction = { value: metaFromAction };
    }

    return {
      type: actionType,
      meta: {
        ...metaFromAction,
        // we need urlQuery set so the middleware knows to read this action
        urlQuery: true,
      },
      payload: payload(...args),
    };
  };
}

/**
 * Helper function for creating URL action creators
 *
 * For example in your actions.js file:
 * export const changeFoo = urlAction('CHANGE_FOO', 'replace');
 *
 */
export function urlUpdateAction(actionType, encodeQuery = d => d, updateType = UrlUpdateTypes.replace) {
  return urlAction(
    actionType,
    decodedQuery => ({
      encodedQuery: encodeQuery(decodedQuery),
      decodedQuery,
    }),
    () => ({ updateType }),
  );
}

export function urlReplaceAction(actionType, encodeQuery) {
  return urlUpdateAction(actionType, encodeQuery, UrlUpdateTypes.replace);
}

export function urlPushAction(actionType, encodeQuery) {
  return urlUpdateAction(actionType, encodeQuery, UrlUpdateTypes.push);
}

/**
 * Helper function for creating URL action creators
 *
 * For example in your actions.js file:
 * export const changeFoo = urlInAction('CHANGE_FOO', 'foo', 'number', 'replaceIn');
 *
 */
export function urlUpdateInAction(actionType, queryParam, valueType, updateType) {
  return urlAction(
    actionType,
    decodedValue => ({
      queryParam,
      encodedValue: encode(valueType, decodedValue),
      decodedValue,
      type: valueType,
    }),
    () => ({ updateType }),
  );
}

export function urlReplaceInAction(actionType, queryParam, valueType) {
  return urlUpdateInAction(actionType, queryParam, valueType, UrlUpdateTypes.replaceIn);
}

export function urlPushInAction(actionType, queryParam, valueType) {
  return urlUpdateInAction(actionType, queryParam, valueType, UrlUpdateTypes.pushIn);
}
