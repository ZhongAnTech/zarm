/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prefer-destructuring */
/* eslint-disable dot-notation */
import React from 'react';
import type { CSSProperties, ReactElement } from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import BackToTop from '../index';
import Scroller from '../../scroller';

function genItems(count: number): ReactElement[] {
  const list: ReactElement[] = [];
  for (let i = 0; i < count; i++) {
    list.push(<li key={+i}>第 {i + 1} 行</li>);
  }
  return list;
}

describe('BackToTop', () => {
  let scrollTo: typeof window.scrollTo;
  let BackToTopCJS: typeof import('../index').default;
  beforeAll(() => {
    scrollTo = window.scrollTo;
    window.scrollTo = jest.fn();
  });
  beforeEach(() => {
    jest.resetModules();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  afterAll(() => {
    window.scrollTo = scrollTo;
  });
  describe('snapshot', () => {
    it('renders correctly', () => {
      const wrapper = mount(<BackToTop>Up</BackToTop>);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('scrollContainer', () => {
      const containerStyle: CSSProperties = {
        overflowY: 'auto',
        maxHeight: 400,
      };
      let container;
      const wrapper = mount(
        <>
          <ul
            ref={(ele) => {
              container = ele;
            }}
            style={containerStyle}
          >
            {genItems(100)}
          </ul>
          <BackToTop scrollContainer={() => container}>Up</BackToTop>
        </>,
      );
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  it('should handle click event and scroll to the top with animation', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<BackToTop onClick={onClick}>Up</BackToTop>);
    window.scrollTo(0, 1000);
    jest.useFakeTimers();
    wrapper.find('.za-back-to-top').simulate('click');
    jest.runAllTimers();
    expect(window.scrollTo).toBeCalledWith(0, 0);
    expect(onClick).toBeCalled();
  });

  it('should scroll to the top immediately without animation ', () => {
    const wrapper = shallow(<BackToTop speed={0}>Up</BackToTop>);
    window.scrollTo(0, 1000);
    wrapper.find('.za-back-to-top').simulate('click');
    expect(window.scrollTo).toBeCalledWith(0, 0);
  });

  it('should append portal container to document body when component did mount', () => {
    const appendChildSpy = jest.spyOn(document.body, 'appendChild');
    const createElementSpy = jest.spyOn(document, 'createElement');
    const wrapper = shallow(<BackToTop>Up</BackToTop>);
    expect(createElementSpy).toBeCalledWith('div');
    expect(appendChildSpy).toBeCalledWith(wrapper.instance()['portalContainer']);
    const portalContainer = document.body.querySelector('.za-back-to-top-container');
    expect(portalContainer).toBeTruthy();
  });

  it('should remove portal container from the document body when component will unmount', () => {
    const removeChildSpy = jest.spyOn(document.body, 'removeChild');
    const wrapper = shallow(<BackToTop>Up</BackToTop>);
    const portalContainer = wrapper.instance()['portalContainer'];
    wrapper.unmount();
    expect(removeChildSpy).toBeCalledWith(portalContainer);
  });

  it('should render null if environment does NOT support DOM', () => {
    jest.doMock('../../utils/dom', () => {
      const oDom = jest.requireActual('../../utils/dom');
      return {
        ...oDom,
        canUseDOM: false,
      };
    });
    BackToTopCJS = require('../index').default;
    const wrapper = shallow(<BackToTopCJS>Up</BackToTopCJS>);
    expect(BackToTopCJS.defaultProps.scrollContainer).toBeUndefined();
    expect(wrapper.instance()['parent']).toEqual(document.body);
    expect(wrapper.isEmptyRender()).toBeTruthy();
  });

  it('should handle scroll and set visible to false if scrollTop greater than props.visibleDistance', () => {
    const wrapper = shallow(<BackToTop>Up</BackToTop>);
    wrapper.find(Scroller).invoke('onScroll')!(300);
    expect(wrapper.find('.za-back-to-top').prop('style')).toEqual({
      display: 'none',
      position: 'fixed',
      bottom: 50,
      right: 50,
    });
  });

  it('should use scrollContainer as this.parent', () => {
    const scrollContainer = document.createElement('div');
    const wrapper = mount(<BackToTop scrollContainer={scrollContainer}>Up</BackToTop>);
    expect(wrapper.instance()['parent']).toEqual(scrollContainer);
  });

  it('should append new portal container if scrollContainer changed', () => {
    const appendChildSpy = jest.spyOn(document.body, 'appendChild');
    const scrollContainer = document.createElement('div');
    const wrapper = mount(<BackToTop>Up</BackToTop>);
    wrapper.setProps({ scrollContainer });
    expect(appendChildSpy).toBeCalledWith(wrapper.instance()['portalContainer']);
  });

  it('should render portal with correct style', () => {
    const scrollContainer = document.createElement('div');
    const wrapper = mount(
      <BackToTop scrollContainer={scrollContainer} style={{ color: 'blue' }}>
        Up
      </BackToTop>,
    );
    wrapper.find(Scroller).invoke('onScroll')!(500);
    expect(wrapper.find('.za-back-to-top').prop('style')).toEqual({
      display: 'inline',
      position: 'absolute',
      bottom: 50,
      right: 50,
      color: 'blue',
    });
  });
});
