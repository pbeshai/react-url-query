import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import { CHANGE_BAZ } from './actions';

/**
 * Simple redux reducer that handles the CHANGE_BAZ action, updating
 * the redux store to have the new value of baz.
 */
function app(state = {}, action) {
  switch (action.type) {
    case CHANGE_BAZ:
      return {
        ...state,
        baz: action.payload,
      };
    default:
      return state;
  }
}

export default combineReducers({
  app,
  routing: routerReducer, // add in state about routing via react-router-redux
});
