/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable dot-notation */
import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { DragEvent } from '../../drag';

describe('Slider', () => {
  const marks = {
    0: '0',
    26: '26',
    60: '60',
    100: '100',
  };
  let Slider: typeof import('../index').default;
  let Events: typeof import('../../utils/events').default;
  beforeEach(() => {
    jest.resetModules();
    Slider = require('../index').default;
    Events = require('../../utils/events').default;
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
      const wrapper = shallow(<Slider showMark />);
      expect(toJson(wrapper)).toMatchSnapshot();
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

  it('should initialize offset start and bind resize event for a horizontal slider', () => {
    const EventsOnSpy = jest.spyOn(Events, 'on');
    const lineRefKey = Symbol('line');
    Object.defineProperty(Slider.prototype, 'line', {
      get() {
        return this[lineRefKey];
      },
      set(ref) {
        if (ref) {
          Object.defineProperty(ref, 'offsetWidth', {
            value: 30,
            configurable: true,
          });
          this[lineRefKey] = ref;
        }
        this[lineRefKey] = ref;
      },
      configurable: true,
    });
    const wrapper = mount(<Slider value={20} vertical={false} />);
    expect(EventsOnSpy).toBeCalledWith(window, 'resize', expect.any(Function));
    expect(wrapper.state('value')).toEqual(20);
    // maxOffset * ((value - min) / range) => 30 * ((20 - 0) / (100 - 0))
    expect(wrapper.instance()['offsetStart']).toEqual(6);
  });

  it('should initialize offset start and bind resize event for a vertical slider', () => {
    const EventsOnSpy = jest.spyOn(Events, 'on');
    const lineRefKey = Symbol('line');
    Object.defineProperty(Slider.prototype, 'line', {
      get() {
        return this[lineRefKey];
      },
      set(ref) {
        if (ref) {
          Object.defineProperty(ref, 'offsetHeight', {
            value: 30,
            configurable: true,
          });
          this[lineRefKey] = ref;
        }
        this[lineRefKey] = ref;
      },
      configurable: true,
    });
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
});
