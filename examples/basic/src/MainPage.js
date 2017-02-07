import React, { PureComponent, PropTypes } from 'react';
import { addUrlProps, UrlQueryParamTypes } from 'react-url-query';

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
};

class MainPage extends PureComponent {
  static propTypes = {
    bar: PropTypes.string,
    foo: PropTypes.number,
    // change handlers are automatically generated and passed if a config is provided
    // and `addChangeHandlers` isn't false. They use `replaceIn` by default, just
    // updating that single query parameter and keeping the other existing ones.
    onChangeFoo: PropTypes.func,
    onChangeBar: PropTypes.func,
    onChangeUrlQueryParams: PropTypes.func,
  }

  static defaultProps = {
    foo: 123,
    bar: 'bar',
  }

  render() {
    const {
      foo, bar, onChangeFoo, onChangeBar, onChangeUrlQueryParams
    } = this.props;

    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>foo</td>
              <td>{foo}</td>
              <td>(url query param)</td>
              <td>
                <button onClick={() => onChangeFoo(Math.round(Math.random() * 1000))}>
                  Change foo
                </button>
              </td>
            </tr>
            <tr>
              <td>bar</td>
              <td>{bar}</td>
              <td>(url query param)</td>
              <td>
                <button onClick={() => onChangeBar(Math.random().toString(32).substring(8))}>
                  Change bar
                </button>
              </td>
            </tr>
            <tr>
              <td colSpan={4}>
                <button onClick={() => onChangeUrlQueryParams({
                  foo: Math.round(Math.random() * 1000),
                  bar: Math.random().toString(32).substring(8),
                })}>
                  Change both with one URL update
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
