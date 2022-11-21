import { render } from '@testing-library/react';
import React from 'react';
import throttle from 'lodash/throttle';
import Scroller from '../index';
import Events from '../../utils/events';

jest.mock('lodash/throttle');

describe('Scroller', () => {
  let eventsOnSpy: jest.SpyInstance;
  // let eventsOffSpy: jest.SpyInstance;
  let scrollContainerSpy: jest.SpyInstance;
  beforeEach(() => {
    eventsOnSpy = jest.spyOn(Events, 'on');
    // eventsOffSpy = jest.spyOn(Events, 'off');
    scrollContainerSpy = jest.spyOn(Scroller.prototype, 'scrollContainer', 'get');
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should render null if no children', () => {
    const { container } = render(<Scroller />);
    expect(container.children).toHaveLength(0);
  });
  it('should bind scroll event on window container', () => {
    const divContainer = document.createElement('div');
    render(<Scroller scrollContainer={divContainer} />);
    expect(scrollContainerSpy).toBeCalledTimes(2);
    expect(eventsOnSpy).toBeCalledWith(divContainer, 'scroll', expect.any(Function));
  });
  it('should not bind scroll event on window container by default', () => {
    render(<Scroller />);
    expect(scrollContainerSpy).toBeCalledTimes(2);
    expect(eventsOnSpy).toBeCalledWith(window, 'scroll', expect.any(Function));
  });

  // it('should unbind event from the container when component wil unmount', () => {
  //   const wrapper = shallow(<Scroller />);
  //   wrapper.unmount();
  //   expect(eventsOffSpy).toBeCalledWith(window, 'scroll', expect.any(Function));
  // });

  it('should throttle the scroll event handler with 250ms', () => {
    const mOnScroll = jest.fn();
    render(<Scroller onScroll={mOnScroll} />);
    expect(throttle).toBeCalledWith(mOnScroll, 250);
  });

  // it('should not call scroll event handler if the component has been unmounted', () => {
  //   let onScrollRef: () => void;
  //   eventsOnSpy.mockImplementationOnce((_, __, onScroll) => {
  //     onScrollRef = onScroll;
  //   });
  //   const mOnScroll = jest.fn();
  //   const wrapper = shallow(<Scroller onScroll={mOnScroll} />);
  //   wrapper.unmount();
  //   onScrollRef!();
  //   expect(mOnScroll).not.toBeCalled();
  // });

  // it('should bind event for new container when component did update', () => {
  //   const wrapper = render(<Scroller />);
  //   const divContainer = document.createElement('div');
  //   expect(eventsOnSpy).toBeCalledWith(window, 'scroll', expect.any(Function));
  //   wrapper.setProps({ scrollContainer: divContainer });
  //   expect(eventsOnSpy).toBeCalledWith(divContainer, 'scroll', expect.any(Function));
  //   expect(eventsOnSpy).toBeCalledTimes(2);
  // });

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
      expect(ScrollerCJS.defaultProps.scrollContainer).toEqual(window);
    });

    it("should set undefined for container if it's not DOM environment", () => {
      jest.doMock('../../utils/dom', () => {
        return { canUseDOM: false };
      });
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const ScrollerCJS = require('../index').default;
      expect(ScrollerCJS.defaultProps.scrollContainer).toBeUndefined();
    });
  });
});
