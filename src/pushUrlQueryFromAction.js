import pushUrlQuery from './pushUrlQuery';

export default function pushUrlQueryFromAction(action, location, history) {
  const { encodedQuery } = action.payload;
  pushUrlQuery(encodedQuery, location, history);
}
