# React URL Query

[![npm version](https://badge.fury.io/js/react-url-query.svg)](https://badge.fury.io/js/react-url-query)
[![Build Status](https://travis-ci.org/pbeshai/react-url-query.svg?branch=master)](https://travis-ci.org/pbeshai/react-url-query)

A library for managing state through query parameters in the URL in [React](https://facebook.github.io/react/). It integrates well with [React Router](https://github.com/ReactTraining/react-router) and [Redux](https://github.com/reactjs/redux) and provides additional tools specifically targeted at serializing and deserializing state in URL query parameters.

For details on how to use it, read the [docs](https://pbeshai.github.io/react-url-query) or browse the [examples](https://github.com/pbeshai/react-url-query/tree/master/examples).

### Installation

```
npm install --save react-url-query
```

### How do I use it?

A [number of examples](https://github.com/pbeshai/react-url-query/tree/master/examples) have been created demonstrating a variety of methods of using the library with different technologies. Here is the most basic form of using it in a component:

```js
import React, { PureComponent, PropTypes } from 'react';
import { addUrlProps, UrlQueryParamTypes } from 'react-url-query';

/**
 * Specify how the URL gets decoded here. This is an object that takes the prop
 * name as a key, and a query param specifier as the value. The query param
 * specifier can have a `type`, indicating how to decode the value from the
 * URL, and a `queryParam` field that indicates which key in the query
 * parameters should be read (this defaults to the prop name if not provided).
 *
 * Here we specify two props,  `bar` and `foo` that correspond to query parameters
 * `bar` and `fooInUrl` respectively. React URL Query will interpret URLs like
 * /app?bar=react&fooInUrl=137 and pass the props `{ bar: "react", foo: 137 }`
 * to the MainPage component.
 */
const urlPropsQueryConfig = {
  bar: { type: UrlQueryParamTypes.string },
  foo: { type: UrlQueryParamTypes.number, queryParam: 'fooInUrl' },
};

class MainPage extends PureComponent {
  static propTypes = {
    // URL props are automatically decoded and passed in based on the config
    bar: PropTypes.string,
    foo: PropTypes.number,

    // change handlers are automatically generated when given a config.
    // By default they updating that single query parameter and maintaining existing
    // values in the other parameters.
    onChangeFoo: PropTypes.func,
    onChangeBar: PropTypes.func,
  }

  static defaultProps = {
    foo: 123,
    bar: 'bar',
  }

  render() {
    const { foo, bar, onChangeFoo, onChangeBar } = this.props;

    return (
      <div>
        <div>
          foo={foo}
          <button onClick={() => onChangeFoo(999)}>Set foo to 999</button>
        </div>
        <div>
          bar={bar}
          <button onClick={() => onChangeBar('testing')}>
            Set bar to "testing"
          </button>
        </div>
      </div>
    );
  }
}

/**
 * Use the addUrlProps higher-order component to hook-in react-url-query.
 */
export default addUrlProps({ urlPropsQueryConfig })(MainPage);
```

If you prefer, instead of using a `urlPropsQueryConfig` you can provide the functions `mapUrlToProps` and `mapUrlChangeHandlersToProps`, as shown in the [basic-mapUrlToProps](https://github.com/pbeshai/react-url-query/tree/master/examples/basic-mapUrlToProps) example.


You'll also need to configure which `history` to use, typically done wherever you initialize your application. Examples of doing this with different setups are shown in the [examples section](https://github.com/pbeshai/react-url-query/tree/master/examples).

If you are using react-router, how you link in the history depends on the version.

**React Router v2**

```js
import { configureUrlQuery } from 'react-url-query';
import { browserHistory } from 'react-router'

configureUrlQuery({ history: browserHistory });
```

**React Router v4**

```js
import { RouterToUrlQuery } from 'react-url-query';
import Router from 'react-router/BrowserRouter';

ReactDOM.render(
  <Router>
    <RouterToUrlQuery>
      <App />
    </RouterToUrlQuery>
  </Router>,
  document.getElementById('root')
);
```


**Not using React Router.** If you're not using react-router, you'll need to instantiate the history yourself manually:

```js
import { configureUrlQuery } from 'react-url-query';
import createHistory from 'history/createBrowserHistory';
const history = createHistory();

configureUrlQuery({ history });
```

### Examples

- [basic](https://github.com/pbeshai/react-url-query/tree/master/examples/basic) - Basic usage of React URL Query without any third party tools
- [basic-mapUrlToProps](https://github.com/pbeshai/react-url-query/tree/master/examples/basic-mapUrlToProps) - Basic usage of React URL Query without any third party tools, uses alternative approach of `mapUrlToProps` instead of `urlPropsQueryConfig`.
- [redux](https://github.com/pbeshai/react-url-query/tree/master/examples/redux) - Integration with Redux
- [redux-with-actions](https://github.com/pbeshai/react-url-query/tree/master/examples/redux-with-actions) - Alternative integration with Redux using dispatched actions
- [react-router-v2-and-redux](https://github.com/pbeshai/react-url-query/tree/master/examples/react-router-v2-and-redux) - Integration with React Router v2 and Redux
- [react-router-v4-and-redux](https://github.com/pbeshai/react-url-query/tree/master/examples/react-router-v4-and-redux) - Integration with React Router v4 and Redux


### Development

During development of examples, it can be helpful to have a watch running automatically rebuilding the package when changes take place. To get this running run:

```
npm run dev
```

#### Building

```
npm run build
```

#### Linting

```
npm run lint
```

To lint examples, run:

```
npm run lint:examples
```

#### Testing

```
npm run test
```

To test examples, run:

```
npm run test:examples
```

### Working on docs

When editing the docs, it helps to have a dev server watching changes. To do this, run:

```
npm run docs:watch
```

To build the docs, run:

```
npm run docs:build
```

To publish the docs, run:

```
npm run docs:publish
```


### License

MIT
