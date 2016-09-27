import { CHANGE_FOO, CHANGE_BAR, CHANGE_ARR } from './actions';
import { replaceInUrlQueryFromAction, pushUrlQuery, pushInUrlQueryFromAction } from 'react-url-query';

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
    case CHANGE_BAR:
    case CHANGE_ARR:
      replaceInUrlQueryFromAction(action);
      break;
    default:
      break;
  }
}
