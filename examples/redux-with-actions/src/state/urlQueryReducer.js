import { CHANGE_FOO } from './actions';
import {
  replaceInUrlQueryFromAction,
  pushUrlQuery,
  pushInUrlQueryFromAction,
  urlQueryReducer as defaultUrlQueryReducer
} from 'react-url-query';

/**
 * Reducer that handles actions that modify the URL query parameters.
 * In this case, the actions replace a single query parameter at a time.
 */
export default function urlQueryReducer(action) {
  switch (action.type) {
    case CHANGE_FOO: {
      const foo = action.payload.decodedValue;
      if (foo < 300) {
        console.log('pushing new URL state since foo < 300');
        pushInUrlQueryFromAction(action);
      } else if (foo > 700) {
        console.log('pushing entire query into URL state since foo > 700');
        const newQuery = {
          [action.payload.queryParam]: [action.payload.encodedValue],
          party: Math.ceil(Math.random() * 100)
        };
        pushUrlQuery(newQuery);
      } else {
        replaceInUrlQueryFromAction(action);
      }
      break;
    }
    default:
      // This will be used for CHANGE_MANY, CHANGE_BAR, and CHANGE_ARR since they
      // are not handled above.
      defaultUrlQueryReducer(action);
      break;
  }
}
