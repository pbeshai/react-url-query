import React, { Component, PropTypes } from 'react';
import setUrlQueryOptions from '../setUrlQueryOptions';

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
    setUrlQueryOptions({
      history: {
        push: router.transitionTo,
        replace: router.replaceWith,
      },
    });
  }

  render() {
    const { children } = this.props;

    return React.Children.only(children);
  }
}
