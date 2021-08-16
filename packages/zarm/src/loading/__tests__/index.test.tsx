import React from 'react';
import { mount } from 'enzyme';
import Loading from '../index';

describe('Loading', () => {
  it('renders correctly', () => {
    const wrapper = mount(<Loading visible content="foo" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('visible change true', () => {
    const wrapper = mount(<Loading />);
    wrapper.setProps({ visible: true });
    expect(wrapper).toMatchSnapshot();
  });

  // let Loading: typeof import('../index').default;
  // let ReactDOM: typeof import('react-dom');
  // let renderSpy: jest.SpyInstance;
  // let unmountNodeSpy: jest.SpyInstance;
  // let createElementSpy: jest.SpyInstance;
  // beforeEach(() => {
  //   jest.resetModules();
  //   ReactDOM = require('react-dom');
  //   renderSpy = jest.spyOn(ReactDOM, 'render');
  //   createElementSpy = jest.spyOn(document, 'createElement');

  //   // eslint-disable-next-line @typescript-eslint/no-var-requires
  //   Loading = require('../index').default;

  //   unmountNodeSpy = jest.spyOn(Loading, 'unmountNode');
  // });
  // afterEach(() => {
  //   jest.useRealTimers();
  //   jest.restoreAllMocks();
  //   const LoadingContainer = document.body.querySelector('.za-loading-container');
  //   if (LoadingContainer) {
  //     document.body.removeChild(LoadingContainer as Node);
  //   }
  // });

  // it('static function pass params', () => {
  //   jest.useFakeTimers();
  //   Loading.show({
  //     content: <div>loading...</div>,
  //   });
  //   jest.runAllTimers();
  //   const LoadingContainer = document.getElementsByClassName('za-loading-container');
  //   expect(LoadingContainer.length).toEqual(1);
  // });

  // it('should create zarm loading DOM element inside document body and render Loading component inside zarm loading DOM element', () => {
  //   Loading.show();
  //   expect(unmountNodeSpy).toBeCalledTimes(1);
  //   expect(createElementSpy).toBeCalledWith('div');
  //   const zarmLoading = document.body.querySelector('.za-loading-container');
  //   expect(zarmLoading).toBeTruthy();
  //   const LoadingReactElement = (renderSpy.mock.calls[0][0] as unknown) as ReactElement;
  //   expect(LoadingReactElement.props).toEqual({
  //     prefixCls: 'za-loading',
  //     mask: true,
  //     visible: true,
  //     mountContainer: false,
  //   });
  //   expect(renderSpy).toBeCalledWith(LoadingReactElement, zarmLoading);
  // });

  // it('should create zarm loading DOM element inside mount container and render Loading component inside zarm loading DOM element', () => {
  //   const mountContainer = document.createElement('div');
  //   Loading.show({ mountContainer, className: 'test-za-loading' });
  //   expect(unmountNodeSpy).toBeCalledTimes(1);
  //   expect(createElementSpy).toBeCalledWith('div');
  //   const zarmLoading = mountContainer.querySelector('.test-za-loading');
  //   expect(zarmLoading).toBeTruthy();
  //   const LoadingReactElement = (renderSpy.mock.calls[0][0] as unknown) as ReactElement;
  //   expect(LoadingReactElement.props).toEqual({
  //     prefixCls: 'za-loading',
  //     mask: true,
  //     className: 'test-za-loading',
  //     visible: true,
  //     mountContainer: false,
  //   });
  //   expect(renderSpy).toBeCalledWith(LoadingReactElement, zarmLoading);
  // });

  // it('should create hideHelper static method on Loading component class', () => {
  //   Loading.show();
  //   expect(Loading.hideHelper).toBeDefined();
  // });

  // it('should hide loading', () => {
  //   Loading.show();
  //   const hideHelperSpy = jest.spyOn(Loading, 'hideHelper');
  //   let loadingReactElement = (renderSpy.mock.calls[0][0] as unknown) as ReactElement;
  //   expect(loadingReactElement.props.visible).toBeTruthy();
  //   Loading.hide();
  //   expect(hideHelperSpy).toBeCalledTimes(1);
  //   loadingReactElement = (renderSpy.mock.calls[1][0] as unknown) as ReactElement;
  //   expect(loadingReactElement.props.visible).toBeFalsy();
  // });

  // it('should do nothing if zarm loading has been removed when hide it', () => {
  //   Loading.show();
  //   const hideHelperSpy = jest.spyOn(Loading, 'hideHelper');
  //   Loading.zarmLoading = null;
  //   Loading.hide();
  //   expect(hideHelperSpy).not.toBeCalled();
  // });

  // it('should call after close handler and remove zarm loading element from the DOM tree', () => {
  //   const mAfterClose = jest.fn();
  //   Loading.show();
  //   const wrapper = shallow(<Loading afterClose={mAfterClose} />);
  //   let zarmLoading = document.body.querySelector('.za-loading-container');
  //   expect(zarmLoading).toBeTruthy();
  //   wrapper.invoke('afterClose')();
  //   zarmLoading = document.body.querySelector('.za-loading-container');
  //   expect(zarmLoading).toBeFalsy();
  //   expect(Loading.zarmLoading).toBeNull();
  //   expect(mAfterClose).toBeCalledTimes(1);
  // });

  // it('should do nothing after close if someone force remove the zarm loading dom', () => {
  //   Loading.show();
  //   Loading.zarmLoading = null;
  //   const removeChildSpy = jest.spyOn(document.body, 'removeChild');
  //   const wrapper = shallow(<Loading />);
  //   wrapper.invoke('afterClose')();
  //   expect(removeChildSpy).not.toBeCalled();
  // });

  // it('should show loading if nextProps.visible is true', () => {
  //   const wrapper = shallow(<Loading visible={false} />);
  //   expect(wrapper.state('visible')).toBeFalsy();
  //   wrapper.setProps({ visible: true });
  //   expect(wrapper.state('visible')).toBeTruthy();
  // });

  // it('should hide loading if nextProps.visible is false', () => {
  //   const wrapper = shallow(<Loading visible />);
  //   expect(wrapper.state('visible')).toBeTruthy();
  //   wrapper.setProps({ visible: false });
  //   expect(wrapper.state('visible')).toBeFalsy();
  // });

  // it('should render again if zarm loading alreay exists', () => {
  //   jest.spyOn(Loading, 'unmountNode').mockImplementation(() => 'assume this method broken');
  //   renderSpy.mockImplementation();
  //   Loading.show();
  //   expect(renderSpy).toBeCalledTimes(1);
  //   Loading.show();
  //   expect(renderSpy).toBeCalledTimes(2);
  //   expect(createElementSpy).toBeCalledTimes(1);
  // });
});
