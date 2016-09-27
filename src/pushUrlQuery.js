import setUrlQuery from './setUrlQuery';
import UrlUpdateTypes from './UrlUpdateTypes';

export default function pushInUrlQuery(newQuery, location, history) {
  return setUrlQuery(UrlUpdateTypes.push, newQuery, location, history);
}
