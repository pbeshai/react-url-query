import urlQueryConfig from './urlQueryConfig';

export default function configureUrlQuery(options) {
  // update the url options singleton
  Object.assign(urlQueryConfig, options);
}
