import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import { __RouterContext as RouterContext } from 'react-router';
import RouterToUrlQuery from '../RouterToUrlQuery';
import urlQueryConfig from '../../urlQueryConfig';

/* eslint-disable react/no-multi-comp */

describe('<RouterToUrlQuery />', () => {
  describe('with old style context (React Router < v5)', () => {
    it('reads router in from context and can push and replace', () => {
      class PutRouterInContext extends Component {
        static propTypes = {
          children: PropTypes.node,
        };

        static childContextTypes = {
          router: PropTypes.object,
        };

        // eslint-disable-next-line
        getChildContext() {
          return {
            router: {
              replace: jest.fn().mockImplementation(location => location),
              push: jest.fn().mockImplementation(location => location),
            },
          };
        }

        render() {
          return React.Children.only(this.props.children);
        }
      }

      const wrapper = mount(
        <PutRouterInContext>
          <RouterToUrlQuery>
            <div className="test" />
          </RouterToUrlQuery>
        </PutRouterInContext>
      );

      expect(wrapper.contains(<div className="test" />)).toBe(true);

      expect(urlQueryConfig.history).toBeDefined();
      expect(urlQueryConfig.history.push).toBeDefined();
      expect(urlQueryConfig.history.replace).toBeDefined();

      urlQueryConfig.history.push();
      expect(urlQueryConfig.history.push).toBeCalled();

      urlQueryConfig.history.replace();
      expect(urlQueryConfig.history.replace).toBeCalled();
    });

    it('reads router in from context and can push and replace when router has transitionTo and replaceWith', () => {
      class PutRouterInContext extends Component {
        static propTypes = {
          children: PropTypes.node,
        };

        static childContextTypes = {
          router: PropTypes.object,
        };

        // eslint-disable-next-line
        getChildContext() {
          return {
            router: {
              replaceWith: jest.fn().mockImplementation(location => location),
              transitionTo: jest.fn().mockImplementation(location => location),
            },
          };
        }

        render() {
          return React.Children.only(this.props.children);
        }
      }

      const wrapper = mount(
        <PutRouterInContext>
          <RouterToUrlQuery>
            <div className="test" />
          </RouterToUrlQuery>
        </PutRouterInContext>
      );

      expect(wrapper.contains(<div className="test" />)).toBe(true);

      expect(urlQueryConfig.history).toBeDefined();
      expect(urlQueryConfig.history.push).toBeDefined();
      expect(urlQueryConfig.history.replace).toBeDefined();

      urlQueryConfig.history.push();
      expect(urlQueryConfig.history.push).toBeCalled();

      urlQueryConfig.history.replace();
      expect(urlQueryConfig.history.replace).toBeCalled();
    });
  });

  describe('with new style context (React Router v5+)', () => {
    it('reads router in from context and can push and replace', () => {
      const wrapper = mount(
        <RouterContext.Provider value={{
          replace: jest.fn().mockImplementation(location => location),
          push: jest.fn().mockImplementation(location => location),
        }}>
        <RouterToUrlQuery routerContext={RouterContext}>
          <div className="test" />
        </RouterToUrlQuery>
      </RouterContext.Provider>
      );

      expect(wrapper.contains(<div className="test" />)).toBe(true);

      expect(urlQueryConfig.history).toBeDefined();
      expect(urlQueryConfig.history.push).toBeDefined();
      expect(urlQueryConfig.history.replace).toBeDefined();

      urlQueryConfig.history.push();
      expect(urlQueryConfig.history.push).toBeCalled();

      urlQueryConfig.history.replace();
      expect(urlQueryConfig.history.replace).toBeCalled();
    });

    it('reads router in from context and can push and replace when router has transitionTo and replaceWith', () => {
      const wrapper = mount(
        <RouterContext.Provider value={{
          replaceWith: jest.fn().mockImplementation(location => location),
          transitionTo: jest.fn().mockImplementation(location => location),
        }}>
        <RouterToUrlQuery routerContext={RouterContext}>
          <div className="test" />
        </RouterToUrlQuery>
      </RouterContext.Provider>
      );

      expect(wrapper.contains(<div className="test" />)).toBe(true);

      expect(urlQueryConfig.history).toBeDefined();
      expect(urlQueryConfig.history.push).toBeDefined();
      expect(urlQueryConfig.history.replace).toBeDefined();

      urlQueryConfig.history.push();
      expect(urlQueryConfig.history.push).toBeCalled();

      urlQueryConfig.history.replace();
      expect(urlQueryConfig.history.replace).toBeCalled();
    });

  });
});
