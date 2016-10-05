## `<RouterToUrlQuery>`

This component is intended to be used with React Router v4. It passes `router` from `this.context` to the url query configuration via `configureUrlQuery` to be used as the `history` by adapting the interface. It maps:

* `push`: `router.push` or `router.transitionTo`
* `replace`: `router.replace` or `router.replaceWith`

Since it reads from the context, it needs to be placed as a child of `<Router>`.

Note that when using this, you will not be configuring `history` in `configureUrlQuery`, but you still can configure other options.

#### Props

It takes no props besides `children`.

#### Example

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
