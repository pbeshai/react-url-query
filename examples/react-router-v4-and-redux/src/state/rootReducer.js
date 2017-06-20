import { CHANGE_BAZ } from './actions';

/**
 * Simple redux reducer that handles the CHANGE_BAZ action, updating
 * the redux store to have the new value of baz.
 */
export default function app(state = {}, action) {
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
