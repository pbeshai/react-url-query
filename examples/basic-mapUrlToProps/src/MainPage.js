import React, { PureComponent, PropTypes } from 'react';
import { stringify, parse as parseQueryString } from 'query-string'
import { addUrlProps, decode, QueryParamTypes } from 'react-url-query';

import history from './history';

/**
 * Map from url query params to props. The values in `url` will still be encoded
 * as strings since we did not pass a `urlPropsQueryConfig` to addUrlProps.
 */
function mapUrlToProps(url, props) {
  return {
    foo: decode(QueryParamTypes.number, url.foo),
    bar: decode(QueryParamTypes.string, url.bar),
  };
}

class MainPage extends PureComponent {
  static propTypes = {
    foo: PropTypes.number,
    bar: PropTypes.string,
  }

  static defaultProps = {
    foo: 123,
    bar: 'bar',
  }

  onChangeFoo(foo) {
    // get the current query and update the value of foo
    const query = parseQueryString(history.location.search);
    query.foo = foo;
    const queryStr = stringify(query);

    // update the URL with the new encoded value
    history.replace({
      pathname: history.location.pathname,
      search: `?${queryStr}`,
    });
  }

  onChangeBar(bar) {
    // get the current query and update the value of bar
    const query = parseQueryString(history.location.search);
    query.bar = bar;
    const queryStr = stringify(query);

    // update the URL with the new encoded value
    history.replace({
      pathname: history.location.pathname,
      search: `?${queryStr}`,
    });
  }

  render() {
    const { foo, bar } = this.props;

    return (
      <div>
        <ul>
          <li><b>foo: </b>{foo}</li>
          <li><b>bar: </b>{bar}</li>
        </ul>
        <div>
          <button onClick={() => this.onChangeFoo(Math.round(Math.random() * 1000))}>
            Change foo
          </button>
          <button onClick={() => this.onChangeBar(Math.random().toString(32).substring(8))}>
            Change bar
          </button>
        </div>
      </div>
    );
  }
}

/**
 * We use the addUrlProps higher-order component to map URL query parameters
 * to props for MainPage.
 */
export default addUrlProps({ mapUrlToProps, history })(MainPage);
