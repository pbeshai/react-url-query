import setInUrlQuery from './setInUrlQuery';
import UrlUpdateTypes from './UrlUpdateTypes';

export default function pushInUrlQuery(queryParam, encodedValue, location, history) {
  return setInUrlQuery(UrlUpdateTypes.pushIn, queryParam, encodedValue, location, history);
}
