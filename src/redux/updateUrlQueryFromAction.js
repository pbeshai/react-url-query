import {
  replaceInUrlQuery,
  replaceUrlQuery,
  multiReplaceInUrlQuery,
  pushInUrlQuery,
  pushUrlQuery,
  multiPushInUrlQuery,
} from '../updateUrlQuery';

export function replaceUrlQueryFromAction(action, location) {
  const { encodedQuery } = action.payload;
  replaceUrlQuery(encodedQuery, location);
}

export function pushUrlQueryFromAction(action, location) {
  const { encodedQuery } = action.payload;
  pushUrlQuery(encodedQuery, location);
}

export function replaceInUrlQueryFromAction(action, location) {
  const { queryParam, encodedValue } = action.payload;
  replaceInUrlQuery(queryParam, encodedValue, location);
}

export function pushInUrlQueryFromAction(action, location) {
  const { queryParam, encodedValue } = action.payload;
  pushInUrlQuery(queryParam, encodedValue, location);
}

export function multiReplaceInUrlQueryFromAction(action, location) {
  const { encodedQuery } = action.payload;
  multiReplaceInUrlQuery(encodedQuery, location);
}

export function multiPushInUrlQueryFromAction(action, location) {
  const { encodedQuery } = action.payload;
  multiPushInUrlQuery(encodedQuery, location);
}
