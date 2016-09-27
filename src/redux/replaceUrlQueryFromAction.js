import replaceUrlQuery from '../url-io/replaceUrlQuery';

export default function replaceUrlQueryFromAction(action, location, history) {
  const { encodedQuery } = action.payload;
  replaceUrlQuery(encodedQuery, location, history);
}
