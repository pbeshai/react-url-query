import urlQueryOptions from './urlQueryOptions';

export default function setUrlQueryOptions(options) {
  // update the url options singleton
  Object.assign(urlQueryOptions, options);
}
