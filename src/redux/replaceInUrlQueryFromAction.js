import replaceInUrlQuery from '../url-io/replaceInUrlQuery';

export default function replaceInUrlQueryFromAction(action, location, history) {
  const { queryParam, encodedValue } = action.payload;
  replaceInUrlQuery(queryParam, encodedValue, location, history);
}
