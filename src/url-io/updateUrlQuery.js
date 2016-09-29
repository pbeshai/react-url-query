import { stringify, parse as parseQueryString } from 'query-string';

import urlQueryOptions from '../urlQueryOptions';

function getLocation(location) {
  if (location) {
    return location;
  }

  // if no location provided, check history
  const { history } = urlQueryOptions;

  // if not in history, use window
  return history.location ? history.location : window.location;
}

function mergeLocationQueryOrSearch(location, newQuery) {
  // if location.query exists, update the query in location. otherwise update the search string
  // replace location.query
  if (location.query) {
    return {
      ...location,
      query: newQuery,
    };
  }

  // replace location.search
  const queryStr = stringify(newQuery);
  return {
    ...location,
    search: queryStr.length ? `?${queryStr}` : undefined,
  };
}

function updateLocation(newQuery, location) {
  location = getLocation(location);

  // remove query params that are nully or an empty strings.
  // note: these values are assumed to be already encoded as strings.
  const filteredQuery = Object.keys(newQuery).reduce((queryAccumulator, queryParam) => {
    const encodedValue = newQuery[queryParam];
    if (encodedValue != null && encodedValue !== '') {
      queryAccumulator[queryParam] = encodedValue;
    }

    return queryAccumulator;
  }, {});

  const newLocation = mergeLocationQueryOrSearch(location, filteredQuery);

  // remove the key from the location
  delete newLocation.key;

  return newLocation;
}

function updateInLocation(queryParam, encodedValue, location) {
  location = getLocation(location);

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

  const newLocation = mergeLocationQueryOrSearch(location, newQuery);

  // remove the key from the location
  delete newLocation.key;

  return newLocation;
}

export function replaceUrlQuery(newQuery, location) {
  const newLocation = updateLocation(newQuery, location);
  return urlQueryOptions.history.replace(newLocation);
}

export function pushUrlQuery(newQuery, location) {
  const newLocation = updateLocation(newQuery, location);
  return urlQueryOptions.history.push(newLocation);
}

export function replaceInUrlQuery(queryParam, encodedValue, location) {
  const newLocation = updateInLocation(queryParam, encodedValue, location);
  return urlQueryOptions.history.replace(newLocation);
}

export function pushInUrlQuery(queryParam, encodedValue, location) {
  const newLocation = updateInLocation(queryParam, encodedValue, location);
  return urlQueryOptions.history.push(newLocation);
}
