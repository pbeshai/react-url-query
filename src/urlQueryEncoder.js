import { encode } from './serialize';

export default function urlQueryEncoder(config) {
  return function encodeQuery(query) {
    // encode the query
    const encodedQuery = Object.keys(config).reduce((encoded, key) => {
      const keyConfig = config[key];
      // read from the URL key if provided, otherwise use the key
      const { queryParam = key } = keyConfig;
      const decodedValue = query[queryParam];

      const encodedValue = encode(
        keyConfig.type,
        decodedValue
      );

      encoded[key] = encodedValue;
      return encoded;
    }, {});

    return encodedQuery;
  };
}
