import React, { PureComponent, PropTypes } from 'react';
import { encode, addUrlProps, UrlQueryParamTypes, replaceInUrlQuery } from 'react-url-query';

/**
 * Specify how the URL gets decoded here. This is an object that takes the prop
 * name as a key, and a query param specifier as the value. The query param
 * specifier can have a `type`, indicating how to decode the value from the
 * URL, and a `queryParam` field that indicates which key in the query
 * parameters should be read (this defaults to the prop name if not provided).
 */
const urlPropsQueryConfig = {
  bar: { type: UrlQueryParamTypes.string },
  foo: { type: UrlQueryParamTypes.number, queryParam: 'fooInUrl' },
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
    // update the URL with the new encoded value
    replaceInUrlQuery('fooInUrl', encode(UrlQueryParamTypes.number, foo));
  }

  onChangeBar(bar) {
    // update the URL with the new encoded value
    replaceInUrlQuery('bar', bar);
  }

  render() {
    const { foo, bar } = this.props;

    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>foo</td>
              <td>{foo}</td>
              <td>(url query param)</td>
              <td>
                <button onClick={() => this.onChangeFoo(Math.round(Math.random() * 1000))}>
                  Change foo
                </button>
              </td>
            </tr>
            <tr>
              <td>bar</td>
              <td>{bar}</td>
              <td>(url query param)</td>
              <td>
                <button onClick={() => this.onChangeBar(Math.random().toString(32).substring(8))}>
                  Change bar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

/**
 * We use the addUrlProps higher-order component to map URL query parameters
 * to props for MainPage. In this case the mapping happens automatically by
 * first decoding the URL query parameters based on the urlPropsQueryConfig.
 */
export default addUrlProps({ urlPropsQueryConfig })(MainPage);
