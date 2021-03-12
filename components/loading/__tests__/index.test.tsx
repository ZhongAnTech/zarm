import React from 'react';
import type { ReactElement } from 'react';
import { mount, shallow } from 'enzyme';
import ReactDOM from 'react-dom';
import Loading from '../index';

describe('Loading', () => {
  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });
  describe('snapshot', () => {
    it('renders correctly', () => {
      const wrapper = mount(<Loading visible>foo</Loading>);
      expect(wrapper).toMatchSnapshot();
    });

    it('visible change true', () => {
      const wrapper = mount(<Loading />);
      wrapper.setProps({ visible: true });
      expect(wrapper).toMatchSnapshot();
    });

    it('visible change false', () => {
      const afterClose = jest.fn();
      const wrapper = mount(<Loading visible afterClose={afterClose} />);
      wrapper.setProps({ visible: false });
      wrapper.simulate('transitionEnd');
      wrapper.simulate('animationEnd');
      expect(wrapper.state('visible')).toEqual(false);
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('static function pass params', () => {
    jest.useFakeTimers();
    Loading.show({
      content: <div>loading...</div>,
    });
    jest.runAllTimers();
    const LoadingContainer = document.getElementsByClassName('za-loading-container');
    expect(LoadingContainer.length).toEqual(1);
  });

  it('should create zarm loading DOM element inside document body and render Loading component inside zarm loading DOM element', () => {
    const renderSpy = jest.spyOn(ReactDOM, 'render');
    const unmountNodeSpy = jest.spyOn(Loading, 'unmountNode');
    const createElementSpy = jest.spyOn(document, 'createElement');
    Loading.show();
    expect(unmountNodeSpy).toBeCalledTimes(1);
    expect(createElementSpy).toBeCalledWith('div');
    const zarmLoading = document.body.querySelector('.za-loading-container');
    expect(zarmLoading).toBeTruthy();
    const LoadingReactElement = (renderSpy.mock.calls[1][0] as unknown) as ReactElement;
    expect(LoadingReactElement.props).toEqual({
      prefixCls: 'za-loading',
      mask: true,
      visible: true,
      mountContainer: false,
    });
    expect(renderSpy).toBeCalledWith(LoadingReactElement, zarmLoading);
  });

  it('should create zarm loading DOM element inside mount container and render Loading component inside zarm loading DOM element', () => {
    const renderSpy = jest.spyOn(ReactDOM, 'render');
    const unmountNodeSpy = jest.spyOn(Loading, 'unmountNode');
    const createElementSpy = jest.spyOn(document, 'createElement');
    const mountContainer = document.createElement('div');
    Loading.show({ mountContainer, className: 'test-za-loading' });
    expect(unmountNodeSpy).toBeCalledTimes(1);
    expect(createElementSpy).toBeCalledWith('div');
    const zarmLoading = mountContainer.querySelector('.test-za-loading');
    expect(zarmLoading).toBeTruthy();
    const LoadingReactElement = (renderSpy.mock.calls[1][0] as unknown) as ReactElement;
    expect(LoadingReactElement.props).toEqual({
      prefixCls: 'za-loading',
      mask: true,
      className: 'test-za-loading',
      visible: true,
      mountContainer: false,
    });
    expect(renderSpy).toBeCalledWith(LoadingReactElement, zarmLoading);
  });

  it('should create hideHelper static method on Loading component class', () => {
    Loading.show();
    expect(Loading.hideHelper).toBeDefined();
  });

  it('should hide loading', () => {
    const renderSpy = jest.spyOn(ReactDOM, 'render');
    Loading.show();
    const hideHelperSpy = jest.spyOn(Loading, 'hideHelper');
    let loadingReactElement = (renderSpy.mock.calls[1][0] as unknown) as ReactElement;
    expect(loadingReactElement.props.visible).toBeTruthy();
    Loading.hide();
    expect(hideHelperSpy).toBeCalledTimes(1);
    loadingReactElement = (renderSpy.mock.calls[2][0] as unknown) as ReactElement;
    expect(loadingReactElement.props.visible).toBeFalsy();
  });

  it('should unmount zarm loading from the DOM tree', () => {
    expect.assertions(5);
    Loading.show();
    let zarmLoading = document.body.querySelector('.za-loading-container');
    expect(zarmLoading).toBeTruthy();
    if (zarmLoading) {
      const loadingReactElement = zarmLoading.firstChild;
      expect(loadingReactElement).toBeTruthy();
      Loading.unmountNode();
      expect(zarmLoading.firstChild).toBeFalsy();
      zarmLoading = document.body.querySelector('.za-loading-container');
      expect(zarmLoading).toBeFalsy();
      expect(Loading.zarmLoading).toBeNull();
    }
  });

  it('should auto close loading if stay time greater than 0', () => {
    jest.useFakeTimers();
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
    const wrapper = shallow(<Loading visible stayTime={100} />);
    expect(wrapper.state('visible')).toBeTruthy();
    expect(setTimeoutSpy).toBeCalledWith(expect.any(Function), 100);
    jest.advanceTimersByTime(100);
    expect(wrapper.state('visible')).toBeFalsy();
    expect(clearTimeoutSpy).toBeCalledWith(expect.any(Number));
  });

  it('should call after close handler', () => {
    const mAfterClose = jest.fn();
    Loading.show();
    const wrapper = shallow(<Loading afterClose={mAfterClose} />);
    let zarmLoading = document.body.querySelector('.za-loading-container');
    expect(zarmLoading).toBeTruthy();
    wrapper.invoke('afterClose')();
    zarmLoading = document.body.querySelector('.za-loading-container');
    expect(zarmLoading).toBeFalsy();
    expect(Loading.zarmLoading).toBeNull();
    expect(mAfterClose).toBeCalledTimes(1);
  });

  it('should show loading if nextProps.visible is true', () => {
    const wrapper = shallow(<Loading visible={false} />);
    expect(wrapper.state('visible')).toBeFalsy();
    wrapper.setProps({ visible: true });
    expect(wrapper.state('visible')).toBeTruthy();
  });

  it('should hide loading if nextProps.visible is false', () => {
    const wrapper = shallow(<Loading visible />);
    expect(wrapper.state('visible')).toBeTruthy();
    wrapper.setProps({ visible: false });
    expect(wrapper.state('visible')).toBeFalsy();
  });
});
