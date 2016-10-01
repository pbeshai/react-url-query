import { decode } from './serialize';

/**
 * Decodes a query based on the config. It compares against cached values to see
 * if decoding is necessary or if it can reuse old values.
 *
 * @param {Object} query The query object (typically from props.location.query)
 *
 * @return {Object} the decoded values `{ key: decodedValue, ... }`
 */
export default function urlQueryDecoder(config) {
  let cachedQuery;
  let cachedDecodedQuery;

  return function decodeQueryWithCache(query) {
    // decode the query
    const decodedQuery = Object.keys(config).reduce((decoded, key) => {
      const keyConfig = config[key];
      // read from the URL key if provided, otherwise use the key
      const { queryParam = key } = keyConfig;
      const encodedValue = query[queryParam];

      let decodedValue;
      // reused cached value
      if (cachedQuery && cachedQuery[queryParam] !== undefined && cachedQuery[queryParam] === encodedValue) {
        decodedValue = cachedDecodedQuery[key];

      // not cached, decode now
      // only decode if no validate provided or validate is provided and the encoded value is valid
      } else {
        decodedValue = decode(keyConfig.type, encodedValue, keyConfig.defaultValue);
      }

      // validate the decoded value if configured. set to undefined if not valid
      if (decodedValue !== undefined && keyConfig.validate && !keyConfig.validate(decodedValue)) {
        decodedValue = undefined;
      }

      decoded[key] = decodedValue;
      return decoded;
    }, {});

    // update the cache
    cachedQuery = query;
    cachedDecodedQuery = decodedQuery;

    return decodedQuery;
  };
}
