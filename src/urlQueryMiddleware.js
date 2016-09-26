/**
 * Middleware to handle updating the URL query params
 */
const urlQueryMiddleware = urlQueryReducer => () => next => (action) => {
  // if not a URL action, do nothing.
  if (!action.meta || !action.meta.urlQuery) {
    return next(action);
  }

  // otherwise, handle with URL handler -- doesn't go to Redux dispatcher
  // update the URL
  urlQueryReducer(action);

  return undefined;
};

export default urlQueryMiddleware;
