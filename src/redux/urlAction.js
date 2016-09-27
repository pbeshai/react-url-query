import UrlUpdateTypes from '../url-io/UrlUpdateTypes';

/**
 * Helper function for creating URL action creators
 *
 * For example in your actions.js file:
 * export const changeFoo = urlAction('CHANGE_FOO', 'replace');
 *
 */
export default function urlAction(actionType, encodeQuery = d => d, updateType) {
  return function urlActionCreator(newQuery) {
    const encodedQuery = encodeQuery(newQuery);
    return {
      type: actionType,
      meta: {
        // we need urlQuery set so the middleware knows to read this action
        urlQuery: true,
        updateType,
      },
      payload: { encodedQuery, decodedQuery: newQuery },
    };
  };
}

export function urlReplaceAction(actionType, encodeQuery) {
  return urlAction(actionType, encodeQuery, UrlUpdateTypes.replace);
}

export function urlPushAction(actionType, encodeQuery) {
  return urlAction(actionType, encodeQuery, UrlUpdateTypes.push);
}
