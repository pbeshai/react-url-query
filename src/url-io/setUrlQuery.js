import { stringify } from 'query-string';

import urlQueryOptions from '../urlQueryOptions';
import UrlUpdateTypes from './UrlUpdateTypes';

export default function setUrlQuery(updateType, newQuery, location, history) {
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

  // remove query params that are nully or an empty string when encoded
  Object.keys(newQuery).forEach((queryParam) => {
    const encodedValue = newQuery[queryParam];
    if (encodedValue == null || encodedValue === '') {
      delete newQuery[queryParam];
    }
  });

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

  if (updateType === UrlUpdateTypes.replace || updateType === UrlUpdateTypes.replaceIn) {
    history.replace(newLocation);
  } else if (updateType === UrlUpdateTypes.push || updateType === UrlUpdateTypes.pushIn) {
    history.push(newLocation);
  }

  return newLocation;
}
