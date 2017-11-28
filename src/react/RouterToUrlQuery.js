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
  };

  static contextTypes = {
    router: PropTypes.object,
  };

  componentWillMount() {
    const { router } = this.context;

    if (process.env.NODE_ENV === 'development' && !router) {
      // eslint-disable-next-line
      console.warn(
        'RouterToUrlQuery: `router` object not found in context. Not configuring history for react-url-query.'
      );
      return;
    }

    let history;
    if (router.history && router.history.push && router.history.replace) {
      history = router.history;
    } else if (router.push && router.replace) {
      history = router;
    } else if (router.transitionTo && router.replaceWith) {
      history = {
        push: router.transitionTo,
        replace: router.replaceWith,
      };
    }

    configureUrlQuery({
      history,
    });
  }

  render() {
    const { children } = this.props;

    return React.Children.only(children);
  }
}
