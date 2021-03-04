import { shallow } from 'enzyme';
import React from 'react';
import Scroller from '../index';
import Events from '../../utils/events';
import throttle from '../../utils/throttle';

jest.mock('../../utils/throttle');

describe('Scroller', () => {
  let eventsOnSpy: jest.SpyInstance;
  let eventsOffSpy: jest.SpyInstance;
  let scrollContainerSpy: jest.SpyInstance;
  beforeEach(() => {
    eventsOnSpy = jest.spyOn(Events, 'on');
    eventsOffSpy = jest.spyOn(Events, 'off');
    scrollContainerSpy = jest.spyOn(Scroller.prototype, 'scrollContainer', 'get');
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should render null if no children', () => {
    const wrapper = shallow(<Scroller />);
    expect(wrapper.isEmptyRender()).toBeTruthy();
  });
  it('should bind scroll event on window container', () => {
    const divContainer = document.createElement('div');
    shallow(<Scroller container={divContainer} />);
    expect(scrollContainerSpy).toBeCalledTimes(2);
    expect(eventsOnSpy).toBeCalledWith(divContainer, 'scroll', expect.any(Function));
  });
  it('should not bind scroll event on window container by default', () => {
    shallow(<Scroller />);
    expect(scrollContainerSpy).toBeCalledTimes(2);
    expect(eventsOnSpy).toBeCalledWith(window, 'scroll', expect.any(Function));
  });

  it('should unbind event from the container when component wil unmount', () => {
    const wrapper = shallow(<Scroller />);
    wrapper.unmount();
    expect(eventsOffSpy).toBeCalledWith(window, 'scroll', expect.any(Function));
  });

  it('should throttle the scroll event handler with 250ms', () => {
    const mOnScroll = jest.fn();
    shallow(<Scroller onScroll={mOnScroll} />);
    expect(throttle).toBeCalledWith(mOnScroll, 250);
  });

  it('should not call scroll event handler if the component has been unmounted', () => {
    let onScrollRef: () => void;
    eventsOnSpy.mockImplementationOnce((_, __, onScroll) => {
      onScrollRef = onScroll;
    });
    const mOnScroll = jest.fn();
    const wrapper = shallow(<Scroller onScroll={mOnScroll} />);
    wrapper.unmount();
    onScrollRef!();
    expect(mOnScroll).not.toBeCalled();
  });

  it('should bind event for new container when component did update', () => {
    const wrapper = shallow(<Scroller />);
    const divContainer = document.createElement('div');
    expect(eventsOnSpy).toBeCalledWith(window, 'scroll', expect.any(Function));
    wrapper.setProps({ container: divContainer });
    expect(eventsOnSpy).toBeCalledWith(divContainer, 'scroll', expect.any(Function));
    expect(eventsOnSpy).toBeCalledTimes(2);
  });

  describe('default container', () => {
    beforeEach(() => {
      jest.resetModules();
    });
    it("should use window as default container if it's DOM environment", () => {
      jest.doMock('../../utils/dom', () => {
        return { canUseDOM: true };
      });
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const ScrollerCJS = require('../index').default;
      expect(ScrollerCJS.defaultProps.container).toEqual(window);
    });

    it("should set undefined for container if it's not DOM environment", () => {
      jest.doMock('../../utils/dom', () => {
        return { canUseDOM: false };
      });
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const ScrollerCJS = require('../index').default;
      expect(ScrollerCJS.defaultProps.container).toBeUndefined();
    });
  });
});
