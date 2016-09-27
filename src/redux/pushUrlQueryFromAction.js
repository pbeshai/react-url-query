import pushUrlQuery from '../url-io/pushUrlQuery';

export default function pushUrlQueryFromAction(action, location, history) {
  const { encodedQuery } = action.payload;
  pushUrlQuery(encodedQuery, location, history);
}
