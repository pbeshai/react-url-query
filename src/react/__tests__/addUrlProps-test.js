import React from 'react';
import { shallow } from 'enzyme';
import addUrlProps from '../addUrlProps';
import UrlQueryParamTypes from '../../UrlQueryParamTypes';
import UrlUpdateTypes from '../../UrlUpdateTypes';
import urlQueryConfig from '../../urlQueryConfig';
import configureUrlQuery from '../../configureUrlQuery';

const defaultUrlQueryConfig = { ...urlQueryConfig };

const MyComponent = () => <div />;

beforeEach(() => {
  configureUrlQuery({ ...defaultUrlQueryConfig });
});

describe('url query params as props', () => {
  it('passes URL query parameters through', () => {
    const location = { query: { foo: '94', bar: 'baz' } };

    const Wrapped = addUrlProps()(MyComponent);
    const wrapper = shallow(<Wrapped location={location} otherProp foo={1000} />);
    const props = wrapper.first().props(); // this only works when using `shallow` not `mount`

    expect(props.otherProp).toBe(true);
    expect(props.location).toBe(location);
    expect(props.foo).toBe('94');
    expect(props.bar).toBe('baz');
  });

  it('decodes URL query params as props based on config', () => {
    const location = { query: { fooInUrl: '94', bar: 'baz' } };
    const urlPropsQueryConfig = {
      foo: { type: UrlQueryParamTypes.number, queryParam: 'fooInUrl' },
      bar: { type: UrlQueryParamTypes.string },
    };

    const Wrapped = addUrlProps({ urlPropsQueryConfig })(MyComponent);
    const wrapper = shallow(<Wrapped location={location} />);
    const props = wrapper.first().props();

    expect(props.location).toBe(location);
    expect(props.foo).toBe(94);
    expect(props.bar).toBe('baz');
  });

  it('mapUrlToProps updates url query params as props', () => {
    const location = { query: { fooInUrl: '94', bar: 'baz' } };
    function mapUrlToProps(url) {
      return {
        foo: parseInt(url.fooInUrl, 10),
        bar: url.bar,
      };
    }

    const Wrapped = addUrlProps({ mapUrlToProps })(MyComponent);
    const wrapper = shallow(<Wrapped location={location} />);
    const props = wrapper.first().props();

    expect(props.location).toBe(location);
    expect(props.foo).toBe(94);
    expect(props.bar).toBe('baz');
  });

  it('mapUrlToProps given decoded URL params if config also passed', () => {
    const location = { query: { fooInUrl: '94', bar: 'baz' } };
    const urlPropsQueryConfig = {
      foo: { type: UrlQueryParamTypes.number, queryParam: 'fooInUrl' },
      bar: { type: UrlQueryParamTypes.string },
    };

    function mapUrlToProps(url) {
      return {
        foo: url.foo * 100,
        bar: url.bar,
      };
    }

    const Wrapped = addUrlProps({ mapUrlToProps, urlPropsQueryConfig })(MyComponent);
    const wrapper = shallow(<Wrapped location={location} />);
    const props = wrapper.first().props();

    expect(props.location).toBe(location);
    expect(props.foo).toBe(9400);
    expect(props.bar).toBe('baz');
  });

  it('reads query params from urlQueryConfig.history.location', () => {
    const location = { query: { foo: '94', bar: 'baz' } };

    const Wrapped = addUrlProps()(MyComponent);

    // set the history to have our location in it. Configure the history after
    // the Wrapped component is defined as that is likely how it will happen
    // in applications due to the way imports are resolved.
    configureUrlQuery({ history: { location } });

    const wrapper = shallow(<Wrapped />);
    const props = wrapper.first().props();

    expect(props.foo).toBe('94');
    expect(props.bar).toBe('baz');
  });

  // TODO: would be nice to test for reading from window.location
  // but https://github.com/facebook/jest/issues/890
});

describe('adds router params', () => {
  it('url props includes props.params if addRouterParams is true', () => {
    const location = { query: { fooInUrl: '94', bar: 'baz' } };

    const Wrapped = addUrlProps({ addRouterParams: true })(MyComponent);
    const wrapper = shallow(<Wrapped location={location} params={{ word: 'test' }} />);
    const props = wrapper.first().props();

    expect(props.word).toBe('test');
  });


  it('url props does not include props.params if addRouterParams is false', () => {
    const location = { query: { fooInUrl: '94', bar: 'baz' } };

    const Wrapped = addUrlProps({ addRouterParams: false })(MyComponent);
    const wrapper = shallow(<Wrapped location={location} params={{ word: 'test' }} />);
    const props = wrapper.first().props();

    expect(props.word).not.toBeDefined();
  });

  it('reads addRouterParams from urlQueryConfig dynamically', () => {
    const location = { query: { fooInUrl: '94', bar: 'baz' } };

    // set to true before creating component
    configureUrlQuery({ addRouterParams: true });

    const Wrapped = addUrlProps()(MyComponent);

    // update global config to be false after creating component, before rendering
    configureUrlQuery({ addRouterParams: false });

    const wrapper = shallow(<Wrapped location={location} params={{ word: 'test' }} />);
    const props = wrapper.first().props();

    expect(props.word).not.toBeDefined();
  });
});

describe('url change callbacks', () => {
  it('generates change handlers based on config', () => {
    const location = { query: { fooInUrl: '94', bar: 'baz' } };
    const urlPropsQueryConfig = {
      foo: { type: UrlQueryParamTypes.number, queryParam: 'fooInUrl' },
      bar: { type: UrlQueryParamTypes.string },
    };

    const Wrapped = addUrlProps({ urlPropsQueryConfig, addUrlChangeHandlers: true })(MyComponent);
    const wrapper = shallow(<Wrapped location={location} />);
    const props = wrapper.first().props();

    expect(props.onChangeFoo).toBeDefined();
    expect(props.onChangeBar).toBeDefined();
    expect(props.onChangeUrlQueryParams).toBeDefined();
  });

  it('does not generate change handlers when addUrlChangeHandlers is false', () => {
    const location = { query: { fooInUrl: '94', bar: 'baz' } };
    const urlPropsQueryConfig = {
      foo: { type: UrlQueryParamTypes.number, queryParam: 'fooInUrl' },
      bar: { type: UrlQueryParamTypes.string },
    };

    const Wrapped = addUrlProps({ urlPropsQueryConfig, addUrlChangeHandlers: false })(MyComponent);
    const wrapper = shallow(<Wrapped location={location} />);
    const props = wrapper.first().props();

    expect(props.onChangeFoo).not.toBeDefined();
    expect(props.onChangeBar).not.toBeDefined();
    expect(props.onChangeUrlQueryParams).not.toBeDefined();
  });

  it('reads addUrlChangeHandlers from urlQueryConfig', () => {
    const location = { query: { fooInUrl: '94', bar: 'baz' } };
    const urlPropsQueryConfig = {
      foo: { type: UrlQueryParamTypes.number, queryParam: 'fooInUrl' },
      bar: { type: UrlQueryParamTypes.string },
    };

    configureUrlQuery({ addUrlChangeHandlers: false });

    const Wrapped = addUrlProps({ urlPropsQueryConfig })(MyComponent);

    configureUrlQuery({ addUrlChangeHandlers: true });

    let wrapper = shallow(<Wrapped location={location} />);
    let props = wrapper.first().props();

    expect(props.onChangeFoo).toBeDefined();
    expect(props.onChangeBar).toBeDefined();

    configureUrlQuery({ addUrlChangeHandlers: false });

    wrapper = shallow(<Wrapped location={location} />);
    props = wrapper.first().props();

    expect(props.onChangeFoo).not.toBeDefined();
    expect(props.onChangeBar).not.toBeDefined();
  });

  it('generated change handlers have name configured by changeHandlerName', () => {
    configureUrlQuery({ addUrlChangeHandlers: true });

    const location = { query: { fooInUrl: '94', bar: 'baz' } };
    const urlPropsQueryConfig = {
      foo: { type: UrlQueryParamTypes.number, queryParam: 'fooInUrl' },
      bar: { type: UrlQueryParamTypes.string },
    };
    const changeHandlerName = propName => `handle_${propName}`;

    const Wrapped = addUrlProps({ urlPropsQueryConfig, changeHandlerName })(MyComponent);
    const wrapper = shallow(<Wrapped location={location} />);
    const props = wrapper.first().props();

    expect(props.handle_foo).toBeDefined();
    expect(props.handle_bar).toBeDefined();
  });

  it('generated change handlers have name configured by changeHandlerName in urlQueryConfig', () => {
    const location = { query: { fooInUrl: '94', bar: 'baz' } };
    const urlPropsQueryConfig = {
      foo: { type: UrlQueryParamTypes.number, queryParam: 'fooInUrl' },
      bar: { type: UrlQueryParamTypes.string },
    };
    const changeHandlerName = propName => `handle_${propName}`;

    const Wrapped = addUrlProps({ urlPropsQueryConfig })(MyComponent);

    configureUrlQuery({ addUrlChangeHandlers: true, changeHandlerName });

    const wrapper = shallow(<Wrapped location={location} />);
    const props = wrapper.first().props();

    expect(props.handle_foo).toBeDefined();
    expect(props.handle_bar).toBeDefined();
  });

  it('mapUrlChangeHandlersToProps adds props', () => {
    const location = { query: { foo: '94', bar: 'baz' } };

    function onChangeFoo(foo) {
      return foo;
    }

    function mapUrlChangeHandlersToProps() {
      return {
        onChangeFoo,
      };
    }

    const Wrapped = addUrlProps({ mapUrlChangeHandlersToProps })(MyComponent);
    const wrapper = shallow(<Wrapped location={location} />);
    const props = wrapper.first().props();

    expect(props.onChangeFoo).toBe(onChangeFoo);
    expect(props.onChangeBar).not.toBeDefined();

    props.onChangeFoo(123);
  });

  it('mapUrlChangeHandlersToProps can access generated handlers', () => {
    const location = { query: { foo: '94', bar: 'baz' } };
    const urlPropsQueryConfig = {
      foo: { type: UrlQueryParamTypes.number },
      bar: { type: UrlQueryParamTypes.string },
    };
    const onChangeFoo = foo => foo;

    function mapUrlChangeHandlersToProps(props, handlers) {
      return {
        onChangeFoo,
        onChangeBar: handlers.onChangeBar,
      };
    }

    const Wrapped = addUrlProps({
      urlPropsQueryConfig,
      mapUrlChangeHandlersToProps,
      addUrlChangeHandlers: true,
    })(MyComponent);

    const wrapper = shallow(<Wrapped location={location} />);
    const props = wrapper.first().props();

    expect(props.onChangeFoo).toBe(onChangeFoo);
    expect(props.onChangeBar).toBeDefined();
  });

  it('generated change handlers are only generated once, not every render', () => {
    const location = { query: { foo: '94', bar: 'baz' } };
    const urlPropsQueryConfig = {
      foo: { type: UrlQueryParamTypes.number },
      bar: { type: UrlQueryParamTypes.string },
    };

    const Wrapped = addUrlProps({ urlPropsQueryConfig, addUrlChangeHandlers: true })(MyComponent);
    const wrapper = shallow(<Wrapped location={location} />);
    const props = wrapper.first().props();
    const { onChangeFoo, onChangeBar } = props;

    // cause a re-render
    wrapper.setProps({ baz: 123 });

    const newProps = wrapper.first().props();
    expect(newProps.onChangeFoo).toBe(onChangeFoo);
    expect(newProps.onChangeBar).toBe(onChangeBar);
  });

  it('generated change handlers encode values properly and interpret updateType', () => {
    const location = { query: { foo: '94', bar: 'baz' } };
    const urlPropsQueryConfig = {
      foo: { type: UrlQueryParamTypes.number },
      bar: { type: UrlQueryParamTypes.string, updateType: UrlUpdateTypes.pushIn },
    };

    // make the history just return the new location so we can test for logging
    const history = {
      replace: jest.fn().mockImplementation(d => d),
      push: jest.fn().mockImplementation(d => d),
    };

    configureUrlQuery({ history });

    const Wrapped = addUrlProps({
      urlPropsQueryConfig,
      addUrlChangeHandlers: true,
    })(MyComponent);

    const wrapper = shallow(<Wrapped location={location} />);
    const props = wrapper.first().props();
    const { onChangeFoo, onChangeBar } = props;

    const fooChangeResult = onChangeFoo(123);
    expect(history.replace).toBeCalled();
    expect(history.push).not.toBeCalled();
    expect(fooChangeResult).toEqual({ query: { foo: '123', bar: 'baz' } });

    const barChangeResult = onChangeBar('new-bar');
    expect(history.push).toBeCalled();
    expect(barChangeResult).toEqual({ query: { foo: '94', bar: 'new-bar' } });
  });

  it('generated change handlers to read location dynamically from props', () => {
    const location = { query: { foo: '94', bar: 'baz' } };
    const urlPropsQueryConfig = {
      foo: { type: UrlQueryParamTypes.number },
      bar: { type: UrlQueryParamTypes.string, updateType: UrlUpdateTypes.pushIn },
    };

    // make the history just return the new location so we can test for logging
    const history = {
      replace: jest.fn().mockImplementation(d => d),
      push: jest.fn().mockImplementation(d => d),
    };

    configureUrlQuery({ history });

    const Wrapped = addUrlProps({
      urlPropsQueryConfig,
      addUrlChangeHandlers: true,
    })(MyComponent);

    const wrapper = shallow(<Wrapped location={location} />);
    const props = wrapper.first().props();
    const { onChangeFoo, onChangeBar } = props;

    // update the prop location
    const location2 = { query: { foo: '1000', bar: 'BAR' } };
    wrapper.setProps({ location: location2 });

    const fooChangeResult = onChangeFoo(123);
    expect(fooChangeResult).toEqual({ query: { foo: '123', bar: 'BAR' } });

    const barChangeResult = onChangeBar('new-bar');
    expect(barChangeResult).toEqual({ query: { foo: '1000', bar: 'new-bar' } });
  });

  it('generated change handlers do not update if the URL is the same', () => {
    const location = { query: { foo: '94', bar: 'baz' } };
    const urlPropsQueryConfig = {
      foo: { type: UrlQueryParamTypes.number },
      bar: { type: UrlQueryParamTypes.string, updateType: UrlUpdateTypes.pushIn },
    };

    // make the history just return the new location so we can test for logging
    const history = {
      replace: jest.fn().mockImplementation(d => d),
      push: jest.fn().mockImplementation(d => d),
    };

    configureUrlQuery({ history });

    const Wrapped = addUrlProps({
      urlPropsQueryConfig,
      addUrlChangeHandlers: true,
    })(MyComponent);

    const wrapper = shallow(<Wrapped location={location} />);
    const props = wrapper.first().props();
    const { onChangeFoo, onChangeBar } = props;

    onChangeFoo(94);
    expect(history.replace).not.toBeCalled();

    onChangeBar('baz');
    expect(history.push).not.toBeCalled();
  });
});
