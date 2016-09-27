import setUrlQuery from './setUrlQuery';
import UrlUpdateTypes from './UrlUpdateTypes';

export default function replaceInUrlQuery(newQuery, location, history) {
  return setUrlQuery(UrlUpdateTypes.replace, newQuery, location, history);
}
