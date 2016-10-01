import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { addUrlProps, UrlQueryParamTypes, subquery } from 'react-url-query';
import { changeBaz } from './state/actions';

/**
 * To specify a custom type, pass a decode and an encode function
 */
const customType = {
  decode: (encoded) => (encoded ? encoded.substring(6) : 'mystery'),
  encode: (decoded) => (decoded ? `custom${decoded}` : undefined),
};

/**
 * Specify how the URL gets decoded here. This is an object that takes the prop
 * name as a key, and a query param specifier as the value. The query param
 * specifier can have a `type`, indicating how to decode the value from the
 * URL, and a `queryParam` field that indicates which key in the query
 * parameters should be read (this defaults to the prop name if not provided).
 *
 * The queryParam value for `foo` here matches the one used in the changeFoo
 * action.
 */
const urlPropsQueryConfig = {
  arr: { type: UrlQueryParamTypes.array },
  bar: { type: UrlQueryParamTypes.string, validate: bar => bar && bar.length < 6 },
  foo: { type: UrlQueryParamTypes.number, queryParam: 'fooInUrl' },
  custom: { type: customType }
}

/**
 * Standard react-redux mapStateToProps -- maps state from the Redux store to
 * the `baz` prop in MainPage. Used via the higher-order component `connect`.
 */
function mapStateToProps(state, props) {
  return {
    baz: state.baz,
  };
}

/**
 * Standard react-redux mapDispatchToProps
 */
function mapDispatchToProps(dispatch) {
  return {
    onChangeBaz(baz) { dispatch(changeBaz(baz)); },
  };
}

/**
 * The MainPage container. Note that none of the code within this component
 * indicates which values are stored in the URL and which are stored in the Redux
 * store.
 */
class MainPage extends PureComponent {
  static propTypes = {
    arr: PropTypes.array,
    bar: PropTypes.string,
    baz: PropTypes.string,
    custom: PropTypes.string,
    foo: PropTypes.number,
    onChangeArr: PropTypes.func,
    onChangeBar: PropTypes.func,
    onChangeBaz: PropTypes.func,
    onChangeCustom: PropTypes.func,
    onChangeFoo: PropTypes.func,
    word: PropTypes.string,
  }

  static defaultProps = {
    arr: [],
    bar: 'bar',
    baz: 'baz',
    custom: 'custom',
    foo: 123,
  }

  static contextTypes = {
    // router: RouterPropTypes.router,
    router: PropTypes.any,
  }

  /**
   * Log whether or not we are getting a new array decoded for `arr` each time
   * we receive props. Ideally, this only happens when `arr` changes.
   *
   * We are using urlPropsQueryConfig, so the decoding is handled by addUrlProps
   * as opposed to mapUrlToProps. The decoding within addUrlProps only re-decodes
   * a value if it has changed, so we get the desired behavior.
   */
  componentWillReceiveProps(nextProps) {
    const { arr } = this.props;
    if (arr !== nextProps.arr) {
      console.log('got new arr:', arr, '->', nextProps.arr);
    } else {
      console.log('arr did not change:', arr, '===', nextProps.arr);
    }
  }

  render() {
    const { arr, foo, bar, baz, custom, word, location, onChangeArr,
      onChangeBar, onChangeBaz, onChangeFoo, onChangeCustom } = this.props;

    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>word</td>
              <td>{word}</td>
              <td>(url param)</td>
              <td>
                <Link to={{ pathname: `/${Math.random().toString(32).substring(8)}`}}>
                  <button>Change word (reset query)</button>
                </Link>
                {' '}
                <Link to={{ pathname: `/${Math.random().toString(32).substring(8)}`, query: location.query }}>
                  <button>Change word (maintain query)</button>
                </Link>
                <Link to={{ pathname: `/${Math.random().toString(32).substring(8)}`, query: subquery(location.query, 'arr', 'bar') }}>
                  <button>Change word (maintain partial query)</button>
                </Link>
              </td>
            </tr>
            <tr>
              <td>arr</td>
              <td>{JSON.stringify(arr)}</td>
              <td>(url query param)</td>
              <td>
                <button onClick={() => onChangeArr([Math.round(Math.random() * 9), Math.round(Math.random() * 9)])}>
                  Change arr
                </button>
              </td>
            </tr>
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
              <td>custom</td>
              <td>{custom}</td>
              <td>(url query param)</td>
              <td>
                <button onClick={() => onChangeCustom(Math.random().toString(32).substring(9))}>
                  Change custom
                </button>
              </td>
            </tr>
            <tr>
              <td>baz</td>
              <td>{baz}</td>
              <td>(redux state)</td>
              <td>
                <button onClick={() => onChangeBaz(Math.random().toString(32).substring(10))}>
                  Change baz
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
export default addUrlProps({ urlPropsQueryConfig })(connect(mapStateToProps, mapDispatchToProps)(MainPage));
