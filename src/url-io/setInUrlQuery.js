import { stringify, parse as parseQueryString } from 'query-string';

import urlQueryOptions from '../urlQueryOptions';
import UrlUpdateTypes from './UrlUpdateTypes';


export default function setInUrlQuery(updateType, queryParam, encodedValue, location, history) {
  // if not explicitly provided, look for default setting
  if (!history) {
    history = urlQueryOptions.history;
  }

  if (!location) {
    location = history.location;
  }

  if (!location) {
    location = window.location;
  }

  // if a query is there, use it, otherwise parse the search string
  const currQuery = location.query || parseQueryString(location.search);

  const newQuery = {
    ...currQuery,
    [queryParam]: encodedValue,
  };

  // remove if it is nully or an empty string when encoded
  if (encodedValue == null || encodedValue === '') {
    delete newQuery[queryParam];
  }

  let newLocation;

  // if location.query exists, update the query in location. otherwise update the search string
  if (location.query) {
    newLocation = {
      ...location,
      query: newQuery,
    };
  } else {
    const queryStr = stringify(newQuery);

    // create the new location object
    newLocation = {
      ...location,
      search: queryStr.length ? `?${queryStr}` : undefined,
    };
  }

  // remove the key from the location
  delete newLocation.key;

  if (updateType === UrlUpdateTypes.replaceIn || updateType === UrlUpdateTypes.replace) {
    history.replace(newLocation);
  } else if (updateType === UrlUpdateTypes.pushIn || updateType === UrlUpdateTypes.push) {
    history.push(newLocation);
  }

  return newLocation;
}
