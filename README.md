# React URL Query

[![npm version](https://badge.fury.io/js/react-url-query.svg)](https://badge.fury.io/js/react-url-query)
[![Build Status](https://travis-ci.org/pbeshai/react-url-query.svg?branch=master)](https://travis-ci.org/pbeshai/react-url-query)

A library for managing state through query parameters in the URL in [React](https://facebook.github.io/react/). It integrates well with [React Router](https://github.com/ReactTraining/react-router) and [Redux](https://github.com/reactjs/redux) and provides additional tools specifically targeted at serializing and deserializing state in URL query parameters.  With React URL Query, you can create components where there is no difference in handling state from an external store like Redux and state from the URL.

* [API Reference](https://pbeshai.github.io/react-url-query/docs/api/)
* [Examples](https://pbeshai.github.io/react-url-query/docs/Examples.html)


### Motivation

When developing web applications, it's really common to want to encode parts of the state in URL query parameters to capture what users are seeing on screen. Think of things like filters, toggles, selected items, and so on. Storing them in the URL allows users to easily link others to what they are seeing and [facilitates discussion](http://dl.acm.org/citation.cfm?id=1240781). React URL Query makes doing this really easy.

The current set of tools for React does not provide facilities for easy interaction with query parameters.

The fantastic library [React Router](https://github.com/ReactTraining/react-router) is the standard for integrating URL changes in React applications and provides us access to the query parameters as an object, but the fields within are always represented as strings-- just as they appear in the URL. This makes sense, but means developers must work to decode the strings into the proper types depending on what is being stored in a given param (e.g. numbers, booleans, arrays, objects). Furthermore, when one wants to update the query parameters in the URL, React Router gives us functions to do so via [`context.router`](https://github.com/ReactTraining/react-router/blob/master/docs/API.md#contextrouter), but no facilities for encoding our values as strings.

The current front-runner for state management in React app's is [Redux](https://github.com/reactjs/redux). When first dealing with encoding state in URL query parameters, it's common to wonder how to get them in sync with what is in the Redux store. Dan Abramov, Redux's creator, [suggests that you don't do that](http://stackoverflow.com/a/36657751). Instead, he puts forth the idea of decoding the query parameters in the `mapStateToProps` function (you can look into `props.location.query` if you're using React Router). However, when it comes to encoding changes to the query parameters back into the URL, we're back to calling router functions directly.

React URL Query is based off the idea that we can have an equivalent to `mapStateToProps` and `mapDispatchToProps` (see [Redux's Usage with React](http://redux.js.org/docs/basics/UsageWithReact.html)) but for the URL. In fact, it allows you to provide [`mapUrlToProps`](https://pbeshai.github.io/react-url-query/docs/api/addUrlProps.html) and [`mapUrlChangeHandlersToProps`](https://pbeshai.github.io/react-url-query/docs/api/addUrlProps.html) when configuring components to do just that. You can decode URL query params into props in `mapUrlToProps` and you can encode them back into params through change handlers in `mapUrlChangeHandlersToProps`. This means the component code itself doesn't need to be aware of which props are managed by Redux and which props are managed by the URL-- it can just read props and call change handlers, and the application will update appropriately.

There are some very common patterns when encoding and decoding URL query parameters: each parameter has a type and a name in the URL and parameters of a given type should always be encoded or decoded the same way. It's cumbersome and repetitive to always create the `map___ToProps` functions to handle this common use case, so React URL Query provides a succinct way of describing URL query parameters through its [`urlPropsQueryConfig`](https://pbeshai.github.io/react-url-query/docs/api/addUrlProps.html). You can just describe the type and names of the query parameters, and the decoded query params along with their change handlers will be passed in as props to the wrapped component.

Check it out below or in the other [examples](https://pbeshai.github.io/react-url-query/docs/Examples.html) to see how it works.

### Installation

```
npm install --save react-url-query
```

### How do I use it?

A [number of examples](https://pbeshai.github.io/react-url-query/docs/Examples.html) have been created demonstrating a variety of methods of using the library with different technologies. Here is the most basic form of using it in a component:

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
    // By default they update that single query parameter and maintain existing
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


You'll also need to configure which `history` to use, typically done wherever you initialize your application. Examples of doing this with different setups are shown in the [examples section](https://pbeshai.github.io/react-url-query/docs/Examples.html).

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
