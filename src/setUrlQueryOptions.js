import urlHandlerOptions from './urlQueryOptions';

export default function setUrlHandlerOptions(options) {
  const { history } = options;
  urlHandlerOptions.history = history;
}
