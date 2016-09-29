import React, { PureComponent, PropTypes } from 'react';
import { decode, encode, addUrlProps, UrlQueryParamTypes, replaceInUrlQuery } from 'react-url-query';

/**
 * Map from url query params to props. The values in `url` will still be encoded
 * as strings since we did not pass a `urlPropsQueryConfig` to addUrlProps.
 */
function mapUrlToProps(url, props) {
  return {
    foo: decode(UrlQueryParamTypes.number, url.foo),
    bar: decode(UrlQueryParamTypes.string, url.bar),
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
 * to props for MainPage.
 */
export default addUrlProps({ mapUrlToProps })(MainPage);
