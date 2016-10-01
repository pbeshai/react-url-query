export const CHANGE_BAZ = 'CHANGE_BAZ';

/**
 * Standard redux action creator
 */
export function changeBaz(baz) {
  return {
    type: CHANGE_BAZ,
    payload: baz
  };
}
