import urlQueryReducer from '../urlQueryReducer';
import UrlUpdateTypes from '../../UrlUpdateTypes';

import {
  replaceInUrlQueryFromAction,
  replaceUrlQueryFromAction,
  pushInUrlQueryFromAction,
  pushUrlQueryFromAction,
} from '../updateUrlQueryFromAction';

// mock this module so we can test if it as called with correct args
jest.mock('../updateUrlQueryFromAction');

it('reduces replaceIn', () => {
  const action = { meta: { updateType: UrlUpdateTypes.replaceIn } };
  urlQueryReducer(action, 'location');
  expect(replaceInUrlQueryFromAction).toBeCalledWith(action, 'location');
});

it('reduces pushIn', () => {
  const action = { meta: { updateType: UrlUpdateTypes.pushIn } };
  urlQueryReducer(action, 'location');
  expect(pushInUrlQueryFromAction).toBeCalledWith(action, 'location');
});

it('reduces replace', () => {
  const action = { meta: { updateType: UrlUpdateTypes.replace } };
  urlQueryReducer(action, 'location');
  expect(replaceUrlQueryFromAction).toBeCalledWith(action, 'location');
});

it('reduces push', () => {
  const action = { meta: { updateType: UrlUpdateTypes.push } };
  urlQueryReducer(action, 'location');
  expect(pushUrlQueryFromAction).toBeCalledWith(action, 'location');
});

it('does not fail with nully action', () => {
  urlQueryReducer(undefined, 'location');
});

it('does not fail with action with no meta', () => {
  urlQueryReducer({}, 'location');
});
