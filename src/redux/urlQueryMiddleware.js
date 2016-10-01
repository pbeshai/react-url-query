import urlQueryReducer from './urlQueryReducer';
import urlQueryConfig from '../urlQueryConfig';

/**
 * Middleware to handle updating the URL query params
 */
const urlQueryMiddleware = (options = {}) => ({ getState }) => next => (action) => {
  // if not a URL action, do nothing.
  if (!action.meta || !action.meta.urlQuery) {
    return next(action);
  }

  // otherwise, handle with URL handler -- doesn't go to Redux dispatcher
  // update the URL

  // use the default reducer if none provided
  const reducer = options.reducer || urlQueryConfig.reducer || urlQueryReducer;

  // if configured to read from the redux store (react-router-redux), do so and pass it to
  // the reducer
  const readLocationFromStore = options.readLocationFromStore == null ?
    urlQueryConfig.readLocationFromStore : options.readLocationFromStore;

  if (readLocationFromStore) {
    const location = readLocationFromStore(getState());
    return reducer(action, location);
  }

  return reducer(action);
};

export default urlQueryMiddleware;
