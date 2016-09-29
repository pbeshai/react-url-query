import {
  replaceInUrlQuery,
  replaceUrlQuery,
  pushInUrlQuery,
  pushUrlQuery,
} from '../url-io/updateUrlQuery';

export function replaceUrlQueryFromAction(action, location, history) {
  const { encodedQuery } = action.payload;
  replaceUrlQuery(encodedQuery, location, history);
}

export function pushUrlQueryFromAction(action, location, history) {
  const { encodedQuery } = action.payload;
  pushUrlQuery(encodedQuery, location, history);
}

export function replaceInUrlQueryFromAction(action, location, history) {
  const { queryParam, encodedValue } = action.payload;
  replaceInUrlQuery(queryParam, encodedValue, location, history);
}

export function pushInUrlQueryFromAction(action, location, history) {
  const { queryParam, encodedValue } = action.payload;
  pushInUrlQuery(queryParam, encodedValue, location, history);
}
