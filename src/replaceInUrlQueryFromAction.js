import replaceInUrlQuery from './replaceInUrlQuery';

export default function replaceInUrlQueryFromAction(action) {
  const { queryParam, encodedValue } = action.payload;
  replaceInUrlQuery(queryParam, encodedValue);
}
