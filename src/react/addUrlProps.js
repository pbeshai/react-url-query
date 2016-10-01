import React, { Component } from 'react';
import { parse as parseQueryString } from 'query-string';

import urlQueryDecoder from '../urlQueryDecoder';
import urlQueryConfig from '../urlQueryConfig';

/**
 * Higher order component (HOC) that injects URL query parameters as props.
 *
 * @param {Function} mapUrlToProps `function(url, props) -> {Object}` returns props to inject
 * @return {React.Component}
 */
export default function addUrlProps(options) {
  const {
    mapUrlToProps = d => d,
    urlPropsQueryConfig,
    addRouterParams,
  } = options;

  return function addPropsWrapper(WrappedComponent) {
    let decodeQuery;

    // initialize decode query (with cache) if a config is provided
    if (urlPropsQueryConfig) {
      decodeQuery = urlQueryDecoder(urlPropsQueryConfig);
    }

    function getUrlObject(props) {
      let location;

      // react-router provides it as a prop
      if (props.location && props.location.query) {
        location = props.location;

      // check in history
      } else if (urlQueryConfig.history.location) {
        location = urlQueryConfig.history.location;

      // not found. just use location from window
      } else {
        location = window.location;
      }

      const currentQuery = location.query || parseQueryString(location.search) || {};

      let result;
      // if a url query decoder is provided, decode the query then return that.
      if (decodeQuery) {
        result = decodeQuery(currentQuery);
      } else {
        result = currentQuery;
      }

      // add in react-router params if requested
      if (addRouterParams || (addRouterParams !== false && urlQueryConfig.addRouterParams)) {
        Object.assign(result, props.params);
      }

      return result;
    }

    const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    class AddUrlProps extends Component {
      static displayName = `AddUrlProps(${displayName})`
      static WrappedComponent = WrappedComponent

      render() {
        const url = getUrlObject(this.props);
        const urlProps = mapUrlToProps(url, this.props) || {};

        return <WrappedComponent {...this.props} {...urlProps} />;
      }
    }

    return AddUrlProps;
  };
}
