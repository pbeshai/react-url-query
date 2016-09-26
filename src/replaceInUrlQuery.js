import { stringify, parse as parseQueryString } from 'query-string';
import urlQueryOptions from './urlQueryOptions';

export default function replaceInUrlQuery(queryParam, encodedValue, history) {
  // if not explicitly provided, look for default setting
  if (!history) {
    history = urlQueryOptions.history;
  }

  const { location } = history;
  const currQuery = parseQueryString(location.search);
  const newQuery = {
    ...currQuery,
    [queryParam]: encodedValue,
  };

  // remove if it is the default value or if it is an empty string when encoded
  if (encodedValue == null || encodedValue === '') {
    delete newQuery[queryParam];
  }

  const queryStr = stringify(newQuery);

  // create the new location object
  const newLocation = {
    ...location,
    search: queryStr.length ? `?${queryStr}` : undefined,
  };
  delete newLocation.key;

  history.replace(newLocation);

  return newLocation;
}
