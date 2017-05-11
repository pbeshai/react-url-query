import React, { Component } from 'react';
import PropTypes from 'prop-types';
import configureUrlQuery from '../configureUrlQuery';

/**
 * This class exists to read in the router from context (useful in react-router v4)
 * to get an equivalent history object so we can push and replace the URL.
 */
export default class RouterToUrlQuery extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  componentWillMount() {
    const { router } = this.context;

    if (process.env.NODE_ENV === 'development' && !router) {
      // eslint-disable-next-line
      console.warn('RouterToUrlQuery: `router` object not found in context. Not configuring history for react-url-query.');
      return;
    }

    configureUrlQuery({
      history: {
        push: (router.history && router.history.push) || router.push || router.transitionTo,
        replace: (router.history && router.history.replace) || router.replace || router.replaceWith,
      },
    });
  }

  render() {
    const { children } = this.props;

    return React.Children.only(children);
  }
}
