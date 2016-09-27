import setInUrlQuery from './setInUrlQuery';
import UrlUpdateTypes from './UrlUpdateTypes';

export default function replaceInUrlQuery(queryParam, encodedValue, location, history) {
  return setInUrlQuery(UrlUpdateTypes.replaceIn, queryParam, encodedValue, location, history);
}
