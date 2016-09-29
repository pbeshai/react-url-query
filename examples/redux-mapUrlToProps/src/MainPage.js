import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { addUrlProps, decode, UrlQueryParamTypes } from 'react-url-query';
import { changeArr, changeBaz, changeFoo, changeBar } from './state/actions';

/**
 * Map from url query params to props. The values in `url` will still be encoded
 * as strings since we did not pass a `urlPropsQueryConfig` to addUrlProps.
 */
function mapUrlToProps(url, props) {
  return {
    arr: decode(UrlQueryParamTypes.array, url.arr),
    bar: decode(UrlQueryParamTypes.string, url.bar),
    foo: decode(UrlQueryParamTypes.number, url.fooInUrl),
  };
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
    onChangeArr(arr) { dispatch(changeArr(arr)); },
    onChangeFoo(foo) { dispatch(changeFoo(foo)); },
    onChangeBar(bar) { dispatch(changeBar(bar)); },
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
    foo: PropTypes.number,
    onChangeArr: PropTypes.func,
    onChangeBar: PropTypes.func,
    onChangeBaz: PropTypes.func,
    onChangeFoo: PropTypes.func,
  }

  static defaultProps = {
    arr: [],
    bar: 'bar',
    baz: 'baz',
    foo: 123,
  }

  /**
   * Log whether or not we are getting a new array decoded for `arr` each time
   * we receive props. Ideally, this only happens when `arr` changes.
   *
   * We are using mapUrlToProps without a urlPropsQueryConfig, so the decoding
   * is done by mapUrlToProps itself. Every time the component receives props,
   * it will re-decode the URL and since we haven't done any caching in our
   * mapUrlToProps function, it will create a new array. This can be a
   * performance issue in more complex cases as it breaks shallow compares in
   * shouldComponentUpdate. One solution is to use something like reselect to
   * do the decoding with some caching. Another is to use urlPropsQueryConfig.
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
    const { arr, foo, bar, baz, onChangeArr, onChangeBar, onChangeBaz, onChangeFoo } = this.props;

    return (
      <div>
        <table>
          <tbody>
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
export default addUrlProps({ mapUrlToProps })(connect(mapStateToProps, mapDispatchToProps)(MainPage));
