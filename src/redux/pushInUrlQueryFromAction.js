import pushInUrlQuery from '../url-io/pushInUrlQuery';

export default function pushInUrlQueryFromAction(action, location, history) {
  const { queryParam, encodedValue } = action.payload;
  pushInUrlQuery(queryParam, encodedValue, location, history);
}
