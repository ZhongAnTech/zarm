import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Keyboard from '../index';
import KeyboardRaw from '../Keyboard';

describe('Keyboard', () => {
  describe('snapshot', () => {
    it('renders correctly', () => {
      const wrapper = render(<Keyboard />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('type is price', () => {
      const wrapper = render(<Keyboard type="price" />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('type is idcard', () => {
      const wrapper = render(<Keyboard type="idcard" />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('behaviour', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });
    it('should handle touch and mouse click event', () => {
      const onKeyClick = jest.fn();
      const wrapper = mount(<Keyboard onKeyClick={onKeyClick} />);
      const keys = wrapper.find('.za-keyboard__keys');
      expect(keys.childAt(0).text()).toBe('1');
      keys.childAt(0).simulate('click');
      expect(onKeyClick).toBeCalledWith('1');
      keys.childAt(9).simulate('click');
      keys.childAt(11).simulate('click');
      expect(onKeyClick).toBeCalledWith('close');

      const handles = wrapper.find('.za-keyboard__handle');
      handles.childAt(0).simulate('touchStart');
      expect(onKeyClick).toBeCalledWith('delete');
      handles.childAt(1).simulate('click');
      expect(onKeyClick).toBeCalledWith('ok');
    });

    it('should not trigger onKeyClick handler any more if the touch event gets interrupted', () => {
      jest.useFakeTimers();
      const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
      const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
      const setIntervalSpy = jest.spyOn(global, 'setInterval');
      let longPressTimer!: ReturnType<typeof setTimeout>;
      Object.defineProperty(KeyboardRaw.prototype, 'longPressTimer', {
        get() {
          return this._longPressTimer;
        },
        set(timer) {
          longPressTimer = timer;
          this._longPressTimer = timer;
        },
      });
      const wrapper = mount(<Keyboard />);
      wrapper.find('.za-keyboard__handle').childAt(0).simulate('touchstart');
      expect(longPressTimer).toBeDefined();
      expect(setTimeoutSpy).toBeCalledWith(expect.any(Function), 800);
      const mEvent = { preventDefault: jest.fn() };
      wrapper.find('.za-keyboard__handle').childAt(0).simulate('touchcancel', mEvent);
      expect(mEvent.preventDefault).toBeCalledTimes(1);
      expect(clearIntervalSpy).toBeCalledWith(longPressTimer);
      jest.advanceTimersByTime(800);
      expect(setIntervalSpy).not.toBeCalled();
    });
  });
});
