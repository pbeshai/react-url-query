import { encode } from './serialize';

/**
 * Encodes a query based on the config. Similarly to `encode`, it does not respect the `defaultValue`
 * field, so any missing values must be specified explicitly.
 *
 * @param {Object} query The query object (typically from props.location.query)
 *
 * @return {Object} the encoded values `{ key: encodedValue, ... }`
 */
export default function urlQueryEncoder(config) {
  return function encodeQuery(query) {
    // encode the query
    const encodedQuery = Object.keys(config).reduce((encoded, key) => {
      const keyConfig = config[key];
      // read from the URL key if provided, otherwise use the key
      const { queryParam = key } = keyConfig;
      const decodedValue = query[key];

      const encodedValue = encode(keyConfig.type, decodedValue);

      encoded[queryParam] = encodedValue;
      return encoded;
    }, {});

    return encodedQuery;
  };
}
