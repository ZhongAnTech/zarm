/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable dot-notation */
import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import type { TouchEvent } from 'react';
import { NonFunctionPropertyNames } from '../../utils/utilityTypes';

function mockLineRef(
  componentClass: typeof import('../index').default,
  prop: Exclude<NonFunctionPropertyNames<HTMLDivElement>, undefined>,
  value: any,
) {
  const lineRefKey = Symbol('line');
  Object.defineProperty(componentClass.prototype, 'line', {
    get() {
      return this[lineRefKey];
    },
    set(ref) {
      if (ref) {
        Object.defineProperty(ref, prop, {
          value,
          configurable: true,
        });
        this[lineRefKey] = ref;
      }
      this[lineRefKey] = ref;
    },
    configurable: true,
  });
}

describe('Slider', () => {
  const marks = {
    0: '0',
    26: '26',
    60: '60',
    100: '100',
  };
  let Slider: typeof import('../index').default;
  let Events: typeof import('../../utils/events').default;
  let ToolTip: typeof import('../../tooltip').default;
  beforeEach(() => {
    jest.resetModules();
    Slider = require('../index').default;
    Events = require('../../utils/events').default;
    ToolTip = require('../../tooltip').default;
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('snapshot', () => {
    it('shallows correctly', () => {
      const wrapper = shallow(<Slider />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('min', () => {
      const wrapper = shallow(<Slider min={0} />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('max', () => {
      const wrapper = shallow(<Slider max={100} />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('step', () => {
      const wrapper = shallow(<Slider step={5} />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('disabled', () => {
      const wrapper = shallow(<Slider disabled />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('defaultValue', () => {
      const wrapper = shallow(<Slider defaultValue={10} />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('value', () => {
      const wrapper = shallow(<Slider value={10} />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('showMark', () => {
      const wrapper = shallow(<Slider showMark marks={marks} />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('marks', () => {
      const wrapper = shallow(<Slider marks={marks} />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('marks error', () => {
      const errorLogSpy = jest.spyOn(console, 'error').mockImplementationOnce(() => 'Suppress');
      const wrapper = shallow(<Slider showMark />);
      expect(toJson(wrapper)).toMatchSnapshot();
      expect(errorLogSpy).toBeCalledWith('请输入有效的 marks');
    });

    it('vertical', () => {
      const wrapper = shallow(<Slider vertical />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  it('mouse event', () => {
    const onChange = jest.fn();

    const wrapper = mount(<Slider onChange={onChange} />).find('.za-slider__handle');
    wrapper.simulate('mouseDown', {
      clientX: 0,
      clientY: 0,
    });
    wrapper.simulate('mouseMove', {
      clientX: 10,
      clientY: 0,
    });
    wrapper.simulate('mouseUp', {
      clientX: 30,
      clientY: 0,
    });

    expect(onChange).toBeCalled();
  });

  it('vertical mouse event', () => {
    const onChange = jest.fn();

    const wrapper = mount(<Slider onChange={onChange} step={5.5} vertical />).find(
      '.za-slider__handle',
    );
    wrapper.simulate('mouseDown', {
      clientX: 0,
      clientY: 0,
    });
    wrapper.simulate('mouseMove', {
      clientX: 0,
      clientY: -10,
    });
    wrapper.simulate('mouseUp', {
      clientX: 0,
      clientY: -20,
    });

    expect(onChange).toBeCalled();
  });

  it('should ', () => {});

  it('should initialize offset start and bind resize event for a horizontal slider', () => {
    const EventsOnSpy = jest.spyOn(Events, 'on');
    mockLineRef(Slider, 'offsetWidth', 30);
    const wrapper = mount(<Slider value={20} vertical={false} />);
    expect(EventsOnSpy).toBeCalledWith(window, 'resize', expect.any(Function));
    expect(wrapper.state('value')).toEqual(20);
    // maxOffset * ((value - min) / range) => 30 * ((20 - 0) / (100 - 0))
    expect(wrapper.instance()['offsetStart']).toEqual(6);
  });

  it('should initialize offset start and bind resize event for a vertical slider', () => {
    const EventsOnSpy = jest.spyOn(Events, 'on');
    mockLineRef(Slider, 'offsetHeight', 30);
    const wrapper = mount(<Slider value={20} vertical />);
    expect(EventsOnSpy).toBeCalledWith(window, 'resize', expect.any(Function));
    expect(wrapper.state('value')).toEqual(20);
    // maxOffset * ((max - value) / range) => 30 * ((100 - 20) / (100 - 0))
    expect(wrapper.instance()['offsetStart']).toEqual(24);
  });

  it('should initialize offset start to 0 if line ref does not exist', () => {
    const lineRefKey = Symbol('line');
    Object.defineProperty(Slider.prototype, 'line', {
      get() {
        return this[lineRefKey];
      },
      set() {
        this[lineRefKey] = null;
      },
      configurable: true,
    });
    const wrapper = mount(<Slider value={20} vertical />);
    expect(wrapper.state('value')).toEqual(20);
    expect(wrapper.instance()['offsetStart']).toEqual(0);
  });

  it('should bind touchstart event for root element', () => {
    const wrapper = shallow(<Slider />);
    const mRef = {
      addEventListener: jest.fn(),
    };
    wrapper.getElement()['ref'](mRef);
    expect(mRef.addEventListener).toBeCalledWith('touchstart', expect.any(Function), {
      passive: false,
    });
  });

  it('should remove touchstart event for root element', () => {
    const wrapper = shallow(<Slider />);
    const mPrevRef = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };
    const mNextRef = {
      addEventListener: jest.fn(),
    };
    wrapper.getElement()['ref'](mPrevRef);
    wrapper.getElement()['ref'](mNextRef);
    expect(mPrevRef.removeEventListener).toBeCalledWith('touchstart', expect.any(Function));
    expect(mNextRef.addEventListener).toBeCalledWith('touchstart', expect.any(Function), {
      passive: false,
    });
  });

  it('should handle drag start event set state.tooltip to true', () => {
    const wrapper = mount(<Slider disabled={false} />);
    expect(wrapper.state('tooltip')).toBeFalsy();
    const mEvent = {} as any;
    wrapper.find('.za-slider__handle').invoke('onTouchStart')!(mEvent);
    expect(wrapper.state('tooltip')).toBeTruthy();
  });

  it('should do nothing if slider is disabled when drag start', () => {
    const wrapper = mount(<Slider disabled />);
    expect(wrapper.state('tooltip')).toBeFalsy();
    const mEvent = {} as any;
    wrapper.find('.za-slider__handle').invoke('onTouchStart')!(mEvent);
    expect(wrapper.state('tooltip')).toBeFalsy();
  });

  it('should not render mark info if marks is an empty object and props.showMark is true', () => {
    const errorLogSpy = jest.spyOn(console, 'error').mockImplementationOnce(() => 'Suppress');
    const wrapper = mount(<Slider showMark marks={{}} />);
    expect(wrapper.find('.za-slider__marks').exists()).toBeFalsy();
    expect(errorLogSpy).toBeCalledWith('请输入有效的 marks');
  });

  it('should not render mark info if marks is NOT an object and props.showMark is true', () => {
    const errorLogSpy = jest.spyOn(console, 'error').mockImplementationOnce(() => 'Suppress');
    const wrapper = mount(<Slider showMark marks={null as any} />);
    expect(wrapper.find('.za-slider__marks').exists()).toBeFalsy();
    expect(errorLogSpy).toBeCalledWith('请输入有效的 marks');
  });

  it('should render mark info with custom marks', () => {
    const MARKS = {
      0: '0°C',
      26: '26°C',
      65: '65°C',
      100: '100°C',
    };
    const wrapper = mount(<Slider showMark marks={MARKS} value={55} />);
    expect(wrapper.find('.za-slider__mark')).toHaveLength(4);
    expect(wrapper.find('.za-slider__mark').map((mark) => mark.text())).toEqual(
      expect.arrayContaining(['100°C', '0°C', '26°C', '65°C']),
    );
    expect(
      wrapper.find('.za-slider__mark').map((mark) => {
        const style = mark.prop('style');
        return style ? style.left : '';
      }),
    ).toEqual(expect.arrayContaining(['0%', '26%', '65%', '100%']));
    expect(
      wrapper
        .find('.za-slider__line__dot')
        .map((dot) => dot.prop('className'))
        .filter((className) => {
          if (className) {
            return className.includes('za-slider__line__dot--active');
          }
          return false;
        }),
    ).toHaveLength(2);
  });

  it('should handle drag end event and set new offset start for a horizontal slider if offset > 0 and offset < maxOffset', () => {
    const updateAllSpy = jest.spyOn(ToolTip, 'updateAll').mockReturnValueOnce(undefined);
    const mOnChange = jest.fn();
    mockLineRef(Slider, 'offsetWidth', 200);
    const wrapper = mount(<Slider value={20} vertical={false} onChange={mOnChange} />);
    expect(wrapper.state('tooltip')).toBeFalsy();
    const touchStartEvent = ({ touches: [{ pageX: 100, pageY: 0 }] } as unknown) as TouchEvent;
    const sliderHandleWrapper = wrapper.find('.za-slider__handle');
    sliderHandleWrapper.invoke('onTouchStart')!(touchStartEvent);
    expect(wrapper.state('tooltip')).toBeTruthy();
    const touchMoveEvent = ({
      stopPropagation: jest.fn(),
      preventDefault: jest.fn(),
      touches: [{ pageX: 200, pageY: 0 }],
    } as unknown) as TouchEvent;
    sliderHandleWrapper.invoke('onTouchMove')!(touchMoveEvent);
    sliderHandleWrapper.invoke('onTouchEnd')!(({} as unknown) as TouchEvent);
    expect(wrapper.state('tooltip')).toBeFalsy();
    expect(wrapper.instance()['offsetStart']).toEqual(140);
    expect(mOnChange).toBeCalledWith(70);
    expect(touchMoveEvent.stopPropagation).toBeCalledTimes(1);
    // expect(touchMoveEvent.preventDefault).toBeCalledTimes(1);
    expect(updateAllSpy).toBeCalledTimes(1);
  });

  it('should handle drag end event and set new offset start for a horizontal slider if offset > maxOffset', () => {
    const updateAllSpy = jest.spyOn(ToolTip, 'updateAll').mockReturnValueOnce(undefined);
    const mOnChange = jest.fn();
    mockLineRef(Slider, 'offsetWidth', 20);
    const wrapper = mount(<Slider value={20} vertical={false} onChange={mOnChange} />);
    expect(wrapper.state('tooltip')).toBeFalsy();
    const touchStartEvent = ({ touches: [{ pageX: 100, pageY: 0 }] } as unknown) as TouchEvent;
    const sliderHandleWrapper = wrapper.find('.za-slider__handle');
    sliderHandleWrapper.invoke('onTouchStart')!(touchStartEvent);
    expect(wrapper.state('tooltip')).toBeTruthy();
    const touchMoveEvent = ({
      stopPropagation: jest.fn(),
      preventDefault: jest.fn(),
      touches: [{ pageX: 200, pageY: 0 }],
    } as unknown) as TouchEvent;
    sliderHandleWrapper.invoke('onTouchMove')!(touchMoveEvent);
    sliderHandleWrapper.invoke('onTouchEnd')!(({} as unknown) as TouchEvent);
    expect(wrapper.state('tooltip')).toBeFalsy();
    expect(mOnChange).toBeCalledWith(100);
    expect(touchMoveEvent.stopPropagation).toBeCalledTimes(1);
    // expect(touchMoveEvent.preventDefault).toBeCalledTimes(1);
    expect(updateAllSpy).toBeCalledTimes(1);
  });

  it('should handle drag end event and set new offset start for a horizontal slider if offset < 0', () => {
    const mOnChange = jest.fn();
    const wrapper = mount(<Slider value={20} vertical={false} onChange={mOnChange} />);
    expect(wrapper.state('tooltip')).toBeFalsy();
    const touchStartEvent = ({ touches: [{ pageX: 100, pageY: 0 }] } as unknown) as TouchEvent;
    const sliderHandleWrapper = wrapper.find('.za-slider__handle');
    sliderHandleWrapper.invoke('onTouchStart')!(touchStartEvent);
    expect(wrapper.state('tooltip')).toBeTruthy();
    const touchMoveEvent = ({
      stopPropagation: jest.fn(),
      preventDefault: jest.fn(),
      touches: [{ pageX: 0, pageY: 0 }],
    } as unknown) as TouchEvent;
    sliderHandleWrapper.invoke('onTouchMove')!(touchMoveEvent);
    sliderHandleWrapper.invoke('onTouchEnd')!(({} as unknown) as TouchEvent);
    expect(wrapper.state('tooltip')).toBeFalsy();
    expect(mOnChange).toBeCalledWith(0);
  });

  it('should do nothing if slider is disabled when handle drag start event', () => {
    const mOnChange = jest.fn();
    const wrapper = mount(<Slider value={20} vertical={false} onChange={mOnChange} disabled />);
    expect(wrapper.state('tooltip')).toBeFalsy();
    const touchStartEvent = ({ touches: [{ pageX: 100, pageY: 0 }] } as unknown) as TouchEvent;
    const sliderHandleWrapper = wrapper.find('.za-slider__handle');
    sliderHandleWrapper.invoke('onTouchStart')!(touchStartEvent);
    expect(wrapper.state('tooltip')).toBeFalsy();
  });

  it('should do nothing if slider is disabled when handle drag move event', () => {
    const mOnChange = jest.fn();
    const wrapper = mount(<Slider value={20} vertical={false} onChange={mOnChange} disabled />);
    expect(wrapper.state('tooltip')).toBeFalsy();
    const touchMoveEvent = ({
      stopPropagation: jest.fn(),
      preventDefault: jest.fn(),
      touches: [{ pageX: 0, pageY: 0 }],
    } as unknown) as TouchEvent;
    const sliderHandleWrapper = wrapper.find('.za-slider__handle');
    sliderHandleWrapper.invoke('onTouchMove')!(touchMoveEvent);
    expect(wrapper.state('tooltip')).toBeFalsy();
    expect(touchMoveEvent.stopPropagation).not.toBeCalled();
    expect(touchMoveEvent.preventDefault).not.toBeCalled();
  });
});
