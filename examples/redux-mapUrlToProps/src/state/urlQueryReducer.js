import { CHANGE_FOO, CHANGE_BAR, CHANGE_ARR } from './actions';
import { replaceInUrlQueryFromAction } from 'react-url-query';

/**
 * Reducer that handles actions that modify the URL query parameters.
 * In this case, the actions replace a single query parameter at a time.
 */
export default function urlQueryReducer(action) {
  switch (action.type) {
    case CHANGE_FOO:
    case CHANGE_BAR:
    case CHANGE_ARR:
      replaceInUrlQueryFromAction(action);
      break;
    default:
      break;
  }
}
