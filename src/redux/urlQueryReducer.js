import {
  replaceInUrlQueryFromAction,
  replaceUrlQueryFromAction,
  pushInUrlQueryFromAction,
  pushUrlQueryFromAction,
} from './updateUrlQueryFromAction';
import UrlUpdateTypes from '../UrlUpdateTypes';

/**
 * Reducer that handles actions that modify the URL query parameters.
 * In this case, the actions replace a single query parameter at a time.
 *
 * NOTE: This is *NOT* a Redux reducer. It does not map from (state, action) -> state.
 * Instead it "reduces" actions into URL query parameter state. NOT redux state.
 */
export default function urlQueryReducer(action, location) {
  const updateType = action && action.meta && action.meta.updateType;

  switch (updateType) {
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
    console.warn(`urlQueryReducer encountered unhandled action.meta.updateType ${updateType}.`, // eslint-disable-line no-console
      'action =', action);
  }

  return undefined;
}
