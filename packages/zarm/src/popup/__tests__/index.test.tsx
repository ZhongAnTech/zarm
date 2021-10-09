/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable dot-notation */
/* eslint-disable no-unused-expressions */
import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ReactDOM from 'react-dom';
import Portal from '../Portal';
import Popup from '../Popup';
import Events from '../../utils/events';
import Trigger from '../../trigger';
import Mask from '../../mask';

describe('Popup', () => {
  describe('snapshot', () => {
    it('renders correctly', () => {
      const onMaskClick = jest.fn();
      const afterClose = jest.fn();
      const wrapper = mount(
        <Popup direction="bottom" onMaskClick={onMaskClick} afterClose={afterClose}>
          foo
        </Popup>,
      );
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('renders mount node correctly', () => {
      const onMaskClick = jest.fn();
      const afterClose = jest.fn();
      const wrapper = mount(
        <Popup
          visible
          direction="bottom"
          onMaskClick={onMaskClick}
          afterClose={afterClose}
          mountContainer={() => document.body}
        >
          foo
        </Popup>,
      );
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('renders mount without mountContainer', () => {
      const onMaskClick = jest.fn();
      const afterClose = jest.fn();
      const wrapper = mount(
        <Popup
          visible
          direction="bottom"
          onMaskClick={onMaskClick}
          afterClose={afterClose}
          mountContainer={false}
        >
          foo
        </Popup>,
      );
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});

describe('Portal', () => {
  let PortalCJS: typeof import('../Portal').default;
  const events = [
    'webkitTransitionEnd',
    'transitionend',
    'webkitAnimationEnd',
    'animationend',
  ] as const;
  beforeEach(() => {
    jest.resetModules();
    jest.dontMock('../../utils/dom');
    jest.dontMock('react-dom');
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should bind transitionend and animationend events for popup element', () => {
    expect.assertions(events.length);
    const eventsOnSpy = jest.spyOn(Events, 'on').mockImplementation();
    const wrapper = mount(<Portal />);
    events.forEach((e) => {
      expect(eventsOnSpy).toBeCalledWith(wrapper.instance()['popup'], e, expect.any(Function));
    });
  });

  it('should unbind transitionend and animationend events for popup element and do cleanup work', () => {
    expect.assertions(events.length + 2);
    let popupRef: HTMLDivElement;
    Object.defineProperty(Portal.prototype, 'popup', {
      get() {
        return this._popup;
      },
      set(ref) {
        if (ref) {
          popupRef = ref;
        }
        this._popup = ref;
      },
      configurable: true,
    });
    const clearTimeoutSpy = jest.spyOn(window, 'clearTimeout').mockImplementation();
    const eventsOffSpy = jest.spyOn(Events, 'off').mockImplementation();
    const mountContainer = document.createElement('div');
    document.body.appendChild(mountContainer);
    const wrapper = mount(<Portal mountContainer={mountContainer} />);
    wrapper.unmount();
    events.forEach((e) => {
      expect(eventsOffSpy).toBeCalledWith(popupRef, e, expect.any(Function));
    });
    expect(clearTimeoutSpy).toBeCalledTimes(1);
    expect(mountContainer.querySelector('.za-popup-container')).toBeFalsy();
  });

  it('should not handle animation if prevProps visible equal with current props visible', () => {
    const setStateSpy = jest.spyOn(Portal.prototype, 'setState');
    const wrapper = mount(<Portal />);
    expect(wrapper.state('isPending')).toBeTruthy();
    wrapper.setProps({ visible: false });
    expect(setStateSpy).toBeCalledTimes(1);
  });

  it('should create container inside document.body', () => {
    const createElementSpy = jest.spyOn(document, 'createElement');
    const appendChildSpy = jest.spyOn(document.body, 'appendChild');
    mount(<Portal mountContainer={document.body} />);
    expect(createElementSpy).toBeCalledWith('div');
    const container = document.body.querySelector('.za-popup-container');
    expect(container).toBeTruthy();
    expect(container!.className).toEqual('za-popup-container');
    expect(appendChildSpy).toBeCalledTimes(1);
  });

  it('should not create container if mount container is falsy', () => {
    const createElementSpy = jest.spyOn(document, 'createElement');
    shallow(<Portal mountContainer={false} />);
    expect(createElementSpy).not.toBeCalled();
  });

  it('should render null if canUseDOM is false', () => {
    jest.doMock('../../utils/dom', () => {
      const origin = jest.requireActual('../../utils/dom');
      return { ...origin, canUseDOM: false };
    });
    PortalCJS = require('../Portal').default;
    const wrapper = mount(<PortalCJS />);
    expect(wrapper.find(Trigger).children()).toHaveLength(0);
  });

  it('should render popup with normal mask which will perform a fade in animation', () => {
    const wrapper = mount(<Portal visible maskType="normal" />);
    expect(wrapper.find(Mask).exists()).toBeTruthy();
    expect(wrapper.find(Mask).props()).toEqual(
      expect.objectContaining({
        className: 'za-fade-enter',
        style: {
          WebkitAnimationDuration: `200ms`,
          animationDuration: `200ms`,
        },
        visible: true,
        type: 'normal',
      }),
    );
  });

  it('should render a transparent mask which will perform a fade out animation', () => {
    const wrapper = mount(<Portal maskType="transparent" />);
    expect(wrapper.find(Mask).exists()).toBeTruthy();
    expect(wrapper.find(Mask).props()).toEqual(
      expect.objectContaining({
        className: 'za-fade-leave',
        style: {
          WebkitAnimationDuration: `200ms`,
          animationDuration: `200ms`,
        },
        visible: true,
        type: 'transparent',
      }),
    );
  });

  it('should render portal inside the popup container html div element (react version >= 16)', () => {
    const createPortalSpy = jest.spyOn(ReactDOM, 'createPortal');
    const wrapper = mount(<Portal mask={false} mountContainer={document.body} />);
    const popupContainer = document.body.querySelector('.za-popup-container');
    expect(popupContainer!.querySelector('[role="dialog"]')).toBeTruthy();
    expect(createPortalSpy).toBeCalled();
    const portal = wrapper.find(Trigger).childAt(0);
    expect(portal.exists()).toBeTruthy();
    expect(portal.name()).toBe('Portal');
    expect(portal.type().toString()).toBe('Symbol(react.portal)');
  });

  it('should render portal inside the popup container html div element (react version < 16)', () => {
    const { createPortal } = require('react-dom');
    // eslint-disable-next-line camelcase
    const unstable_renderSubtreeIntoContainerProxy = jest.fn((_, element, container) => {
      createPortal(element, container);
    });
    jest.doMock('react-dom', () => {
      const origin = jest.requireActual('react-dom');
      return {
        ...origin,
        unstable_renderSubtreeIntoContainer: unstable_renderSubtreeIntoContainerProxy,
        createPortal: undefined,
      };
    });

    PortalCJS = require('../Portal').default;
    mount(<PortalCJS mask={false} mountContainer={document.body} />);
    expect(unstable_renderSubtreeIntoContainerProxy).toBeCalled();
  });

  it('should handle ESC keyboard input', () => {
    const mOnEsc = jest.fn();
    const wrapper = shallow(<Portal onEsc={mOnEsc} />);
    wrapper.invoke('onClose')();
    expect(mOnEsc).toBeCalledTimes(1);
  });

  it('should not handle animation end event if event target is popup ref', () => {
    let handlerRef!: (e: TransitionEvent | AnimationEvent) => void;
    jest.spyOn(Events, 'on').mockImplementationOnce((_, __, handler) => {
      handlerRef = handler;
    });
    const mAfterOpen = jest.fn();
    mount(<Portal visible afterOpen={mAfterOpen} />);
    const mEvent = ({ stopPropagation: jest.fn() } as unknown) as TransitionEvent;
    handlerRef(mEvent);
    expect(mEvent.stopPropagation).not.toBeCalled();
  });

  it('should handle animation end event if animation state is enter', () => {
    let handlerRef!: (e: TransitionEvent | AnimationEvent) => void;
    jest.spyOn(Events, 'on').mockImplementationOnce((_, __, handler) => {
      handlerRef = handler;
    });
    const mAfterOpen = jest.fn();
    const wrapper = mount(<Portal visible afterOpen={mAfterOpen} />);
    const popupRef = wrapper.instance()['popup'] as HTMLDivElement;
    const mEvent = ({ stopPropagation: jest.fn(), target: popupRef } as unknown) as TransitionEvent;
    handlerRef(mEvent);
    expect(mEvent.stopPropagation).toBeCalledTimes(1);
    expect(mAfterOpen).toBeCalledTimes(1);
  });
});
