import {
  replaceInUrlQuery,
  replaceUrlQuery,
  pushInUrlQuery,
  pushUrlQuery,
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
