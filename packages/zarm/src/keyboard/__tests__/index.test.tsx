import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Keyboard from '../index';
// import KeyboardRaw from '../Keyboard';

// function mockLongPressTimer() {
//   let touchLongPressTimer!: number | null;
//   const prop = Symbol('longPressTimer');
//   Object.defineProperty(KeyboardRaw.prototype, 'touchLongPressTimer', {
//     get() {
//       return this[prop];
//     },
//     set(timer) {
//       touchLongPressTimer = timer;
//       this[prop] = timer;
//     },
//     configurable: true,
//   });

//   return {
//     get touchLongPressTimer() {
//       return touchLongPressTimer;
//     },
//   };
// }

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
      jest.useRealTimers();
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

    // it("should handle delete operation once if user's touch event gets interrupted", () => {
    //   jest.useFakeTimers();
    //   const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    //   const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
    //   const lazy = mockLongPressTimer();
    //   const mOnKeyClick = jest.fn();
    //   const wrapper = mount(<Keyboard onKeyClick={mOnKeyClick} />);
    //   wrapper.find('.za-keyboard__handle').childAt(0).simulate('touchstart');
    //   expect(lazy.touchLongPressTimer).toBeDefined();
    //   expect(setTimeoutSpy).toBeCalledWith(expect.any(Function), 800);
    //   const mEvent = { preventDefault: jest.fn() };
    //   wrapper.find('.za-keyboard__handle').childAt(0).simulate('touchcancel', mEvent);
    //   expect(mEvent.preventDefault).toBeCalledTimes(1);
    //   expect(clearIntervalSpy).toBeCalledWith(lazy.touchLongPressTimer);
    //   jest.advanceTimersByTime(800);
    //   expect(mOnKeyClick.mock.calls).toEqual([['delete']]);
    //   jest.advanceTimersByTime(200);
    // });

    // it('should handle delete operation every 100 milliseconds if the user long presses the delete button ', () => {
    //   jest.useFakeTimers();
    //   const setIntervalSpy = jest.spyOn(global, 'setInterval');
    //   const lazy = mockLongPressTimer();
    //   const mOnKeyClick = jest.fn();
    //   const wrapper = mount(<Keyboard onKeyClick={mOnKeyClick} />);
    //   wrapper.find('.za-keyboard__handle').childAt(0).simulate('touchstart');
    //   const longPressTimerOfSetTimeout = lazy.touchLongPressTimer;
    //   expect(longPressTimerOfSetTimeout).toBeDefined();
    //   jest.advanceTimersByTime(800);
    //   expect(setIntervalSpy).toBeCalledWith(expect.any(Function), 100);
    //   const longPressTimerOfSetInterval = lazy.touchLongPressTimer;
    //   expect(longPressTimerOfSetInterval).toBeDefined();
    //   expect(longPressTimerOfSetInterval).not.toEqual(longPressTimerOfSetTimeout);
    //   jest.advanceTimersByTime(100);
    //   expect(mOnKeyClick).toBeCalledTimes(2);
    //   jest.advanceTimersByTime(200);
    //   expect(mOnKeyClick).toBeCalledTimes(4);
    //   expect(mOnKeyClick.mock.calls).toEqual([['delete'], ['delete'], ['delete'], ['delete']]);
    // });

    it('should handle ok', () => {
      const mOnKeyClick = jest.fn();
      const wrapper = mount(<Keyboard onKeyClick={mOnKeyClick} />);
      wrapper.find('.za-keyboard__item--ok').simulate('click');
      expect(mOnKeyClick).toBeCalledWith('ok');
    });
  });
});
