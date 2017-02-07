import { stringify, parse as parseQueryString } from 'query-string';

import urlQueryConfig from './urlQueryConfig';
import UrlUpdateTypes from './UrlUpdateTypes';

function getLocation(location) {
  if (location) {
    return location;
  }

  // if no location provided, check history
  const { history } = urlQueryConfig;

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
      search: undefined, // this is necessary at least for React Router v4
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

/**
 * Update multiple parts of the location at once
 */
function multiUpdateInLocation(queryReplacements, location) {
  location = getLocation(location);

  // if a query is there, use it, otherwise parse the search string
  const currQuery = location.query || parseQueryString(location.search);

  const newQuery = {
    ...currQuery,
    ...queryReplacements,
  };

  // remove if it is nully or an empty string when encoded
  Object.keys(queryReplacements).forEach((queryParam) => {
    const encodedValue = queryReplacements[queryParam];
    if (encodedValue == null || encodedValue === '') {
      delete newQuery[queryParam];
    }
  });

  const newLocation = mergeLocationQueryOrSearch(location, newQuery);

  // remove the key from the location
  delete newLocation.key;

  return newLocation;
}

export function replaceUrlQuery(newQuery, location) {
  const newLocation = updateLocation(newQuery, location);
  return urlQueryConfig.history.replace(newLocation);
}

export function pushUrlQuery(newQuery, location) {
  const newLocation = updateLocation(newQuery, location);
  return urlQueryConfig.history.push(newLocation);
}

export function replaceInUrlQuery(queryParam, encodedValue, location) {
  const newLocation = updateInLocation(queryParam, encodedValue, location);
  return urlQueryConfig.history.replace(newLocation);
}

export function pushInUrlQuery(queryParam, encodedValue, location) {
  const newLocation = updateInLocation(queryParam, encodedValue, location);
  return urlQueryConfig.history.push(newLocation);
}

/**
 * Replace multiple query parameters in a URL at once with only one
 * call to `history.replace`
 *
 * @param {Object} queryReplacements Object representing the params and
 *   their encoded values. { queryParam: encodedValue, ... }
 */
export function multiReplaceInUrlQuery(queryReplacements, location) {
  const newLocation = multiUpdateInLocation(queryReplacements, location);
  return urlQueryConfig.history.replace(newLocation);
}

export function multiPushInUrlQuery(queryReplacements, location) {
  const newLocation = multiUpdateInLocation(queryReplacements, location);
  return urlQueryConfig.history.push(newLocation);
}

/**
 * Updates a single value in a query based on the type
 */
export function updateUrlQuerySingle(updateType = UrlUpdateTypes.replaceIn,
    queryParam, encodedValue, location) {
  if (updateType === UrlUpdateTypes.replaceIn) {
    return replaceInUrlQuery(queryParam, encodedValue, location);
  }
  if (updateType === UrlUpdateTypes.pushIn) {
    return pushInUrlQuery(queryParam, encodedValue, location);
  }

  // for these, wrap it in a whole new query object
  const newQuery = { [queryParam]: encodedValue };
  if (updateType === UrlUpdateTypes.replace) {
    return replaceUrlQuery(newQuery, location);
  }
  if (updateType === UrlUpdateTypes.push) {
    return pushUrlQuery(newQuery, location);
  }

  return undefined;
}


/**
 * Updates a multiple values in a query based on the type
 */
export function updateUrlQueryMulti(updateType = UrlUpdateTypes.replaceIn,
    queryReplacements, location) {
  if (updateType === UrlUpdateTypes.replaceIn) {
    return multiReplaceInUrlQuery(queryReplacements, location);
  }
  if (updateType === UrlUpdateTypes.pushIn) {
    return multiPushInUrlQuery(queryReplacements, location);
  }

  if (updateType === UrlUpdateTypes.replace) {
    return replaceUrlQuery(queryReplacements, location);
  }
  if (updateType === UrlUpdateTypes.push) {
    return pushUrlQuery(queryReplacements, location);
  }

  return undefined;
}
