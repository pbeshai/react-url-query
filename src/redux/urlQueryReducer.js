import {
  replaceInUrlQueryFromAction,
  replaceUrlQueryFromAction,
  pushInUrlQueryFromAction,
  pushUrlQueryFromAction,
} from './updateUrlQueryFromAction';
import UrlUpdateTypes from '../url-io/UrlUpdateTypes';

/**
 * Reducer that handles actions that modify the URL query parameters.
 * In this case, the actions replace a single query parameter at a time.
 */
export default function urlQueryReducer(action = { meta: {} }, location) {
  switch (action.meta.updateType) {
    case UrlUpdateTypes.replaceIn:
      return replaceInUrlQueryFromAction(action, location);
    case UrlUpdateTypes.replace:
      return replaceUrlQueryFromAction(action, location);
    case UrlUpdateTypes.pushIn:
      return pushInUrlQueryFromAction(action, location);
    case UrlUpdateTypes.push:
      return pushUrlQueryFromAction(action, location);
    default:
      break;
  }

  if (process.env.NODE_ENV === 'development') {
    console.warn(`urlQueryReducer encountered unhandled action.meta.updateType ${action.meta.updateType}.`, // eslint-disable-line no-console
      'action =', action);
  }

  return undefined;
}
