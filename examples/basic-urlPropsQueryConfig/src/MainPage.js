import React, { PureComponent, PropTypes } from 'react';
import { stringify, parse as parseQueryString } from 'query-string'
import { addUrlProps, QueryParamTypes } from 'react-url-query';

import history from './history';

/**
 * Specify how the URL gets decoded here. This is an object that takes the prop
 * name as a key, and a query param specifier as the value. The query param
 * specifier can have a `type`, indicating how to decode the value from the
 * URL, and a `queryParam` field that indicates which key in the query
 * parameters should be read (this defaults to the prop name if not provided).
 */
const urlPropsQueryConfig = {
  bar: { type: QueryParamTypes.string },
  foo: { type: QueryParamTypes.number, queryParam: 'fooInUrl' },
}

class MainPage extends PureComponent {
  static propTypes = {
    bar: PropTypes.string,
    foo: PropTypes.number,
  }

  static defaultProps = {
    foo: 123,
    bar: 'bar',
  }

  onChangeFoo(foo) {
    // get the current query and update the value of foo
    const query = parseQueryString(history.location.search);
    query.fooInUrl = foo;
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
 * to props for MainPage. In this case the mapping happens automatically by
 * first decoding the URL query parameters based on the urlPropsQueryConfig.
 */
export default addUrlProps({ urlPropsQueryConfig, history })(MainPage);
