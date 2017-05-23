import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { parse as parseQueryString } from 'query-string';

import urlQueryDecoder from '../urlQueryDecoder';
import urlQueryConfig from '../urlQueryConfig';
import { updateUrlQuerySingle, updateUrlQueryMulti } from '../updateUrlQuery';
import { encode } from '../serialize';
import UrlUpdateTypes from '../UrlUpdateTypes';

/**
 * Higher order component (HOC) that injects URL query parameters as props.
 *
 * @param {Function} mapUrlToProps `function(url, props) -> {Object}` returns props to inject
 * @return {React.Component}
 */
export default function addUrlProps(options = {}) {
  const {
    mapUrlToProps = d => d,
    mapUrlChangeHandlersToProps,
    urlPropsQueryConfig,
    addRouterParams,
    addUrlChangeHandlers,
  } = options;

  let {
    changeHandlerName,
  } = options;

  return function addPropsWrapper(WrappedComponent) {
    // caching to prevent unnecessary generation of new onChange functions
    let cachedHandlers;

    let decodeQuery;

    // initialize decode query (with cache) if a config is provided
    if (urlPropsQueryConfig) {
      decodeQuery = urlQueryDecoder(urlPropsQueryConfig);
    }

    /**
     * Parse the URL query into an object. If a urlPropsQueryConfig is provided
     * the values are decoded based on type.
     */
    function getUrlObject(props) {
      let location;

      // react-router provides it as a prop
      if (props.location && (props.location.query || props.location.search != null)) {
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
      static propTypes = {
        location: PropTypes.any, // eslint-disable-line react/forbid-prop-types
      }

      /**
       * Create URL change handlers based on props, the urlPropsQueryConfig (if provided),
       * and mapUrlChangeHandlersToProps (if provided).
       * As a member function so we can read `this.props` in generated handlers dynamically.
       */
      getUrlChangeHandlerProps(propsWithUrl) {
        let handlers;

        if (urlPropsQueryConfig) {
          // if we have a props->query config, generate the change handler props unless
          // addUrlChangeHandlers is false
          if (addUrlChangeHandlers || (addUrlChangeHandlers == null && urlQueryConfig.addUrlChangeHandlers)) {
            // use cache if available. Have to do this since urlQueryConfig can change between
            // renders (although that is unusual).
            if (cachedHandlers) {
              handlers = cachedHandlers;
            } else {
              // read in function from options for how to generate a name from a prop
              if (!changeHandlerName) {
                changeHandlerName = urlQueryConfig.changeHandlerName;
              }

              // for each URL config prop, create a handler
              handlers = Object.keys(urlPropsQueryConfig).reduce((handlersAccum, propName) => {
                const { updateType, queryParam = propName, type } = urlPropsQueryConfig[propName];

                // name handler for `foo` => `onChangeFoo`
                const handlerName = changeHandlerName(propName);

                // handler encodes the value and updates the URL with the encoded value
                // based on the `updateType` in the config. Default is `replaceIn`
                handlersAccum[handlerName] = function generatedUrlChangeHandler(value) {
                  const { location } = this.props;
                  const encodedValue = encode(type, value);

                  // add a simple check when we have props.location.query to see if
                  // we even need to update.
                  if (location && location.query && location.query[queryParam] === encodedValue) {
                    return undefined; // skip updating
                  }

                  return updateUrlQuerySingle(updateType, queryParam, encodedValue, location);
                }.bind(this); // bind this so we can access props dynamically

                return handlersAccum;
              }, {});

              // add in a batch change handler
              const batchHandlerName = changeHandlerName('urlQueryParams');
              handlers[batchHandlerName] = function generatedBatchUrlChangeHandler(queryValues,
                updateType = UrlUpdateTypes.replaceIn) {
                const { location } = this.props;

                let allEncodedValuesUnchanged = true;

                // encode each value
                const queryReplacements = Object.keys(queryValues).reduce((accum, propName) => {
                  const { queryParam = propName, type } = urlPropsQueryConfig[propName];
                  const value = queryValues[propName];

                  const encodedValue = encode(type, value);
                  accum[queryParam] = encodedValue;

                  // add a simple check when we have props.location.query to see if
                  // we even need to update.
                  if (location && location.query && location.query[queryParam] !== encodedValue) {
                    allEncodedValuesUnchanged = false;
                  }

                  return accum;
                }, {});

                if (location && location.query && allEncodedValuesUnchanged) {
                  return undefined; // skip updating if no encoded values changed
                }

                return updateUrlQueryMulti(updateType, queryReplacements, location);
              }.bind(this);

              // cache these so we don't regenerate new functions every render
              cachedHandlers = handlers;
            }
          }
        }

        // if a manual mapping function is provided, use it, passing in the auto-generated
        // handlers as an optional secondary argument.
        if (mapUrlChangeHandlersToProps) {
          handlers = mapUrlChangeHandlersToProps.call(this, propsWithUrl, handlers);
        }

        return handlers;
      }


      render() {
        // get the url query parameters as an object mapping name to value.
        // if a config is provided, these are decoded based on their `type` and their
        // name will match the prop name.
        // if no config is provided, they are not decoded and their names are whatever
        // they were in the URL.
        const url = getUrlObject(this.props);

        // pass to mapUrlToProps for further decoding if provided
        this.propsWithUrl = Object.assign({}, this.props, mapUrlToProps(url, this.props));

        // add in the URL change handlers - either auto-generated based on config
        // or from mapUrlChangeHandlersToProps.
        Object.assign(this.propsWithUrl, this.getUrlChangeHandlerProps(this.propsWithUrl));


        // render the wrapped component with the URL props added in.
        return <WrappedComponent {...this.propsWithUrl} />;
      }
    }

    return AddUrlProps;
  };
}
