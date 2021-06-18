import { shallow } from 'enzyme';
import React from 'react';
import Trigger from '../Trigger';
import type PropsType from '../PropsType';

describe('Trigger', () => {
  afterEach(() => {
    Trigger.instanceList = [];
    Trigger.count = 0;
    jest.restoreAllMocks();
  });
  describe('static getDerivedStateFromProps', () => {
    it('should return null if visible prop is false and instance list of Trigger component is empty', () => {
      const props: PropsType = {
        disabled: false,
        visible: true,
      };
      const actual = Trigger.getDerivedStateFromProps(props);
      expect(actual).toBeNull();
      expect(Trigger.instanceList).toEqual([]);
    });
    it('should push onclose function to instance list if visible is true and the onclose function does not exist in instance list', () => {
      const props: PropsType = {
        disabled: false,
        visible: true,
        onClose: jest.fn(),
      };
      const actual = Trigger.getDerivedStateFromProps(props);
      expect(actual).toBeNull();
      expect(Trigger.instanceList).toEqual([props.onClose]);
    });
  });

  describe('static onKeydown', () => {
    it('should handle escape keyboard event using the last handler of instance list', () => {
      const mHandler = jest.fn();
      // eslint-disable-next-line dot-notation
      mHandler['disabled'] = false;
      Trigger.instanceList = [mHandler];
      const mEvent = ({ keyCode: 27 } as unknown) as KeyboardEvent;
      Trigger.onKeydown(mEvent);
      expect(mHandler).toBeCalledTimes(1);
    });

    it('should do nothing if the instance list is empty', () => {
      const mEvent = ({ keyCode: 27 } as unknown) as KeyboardEvent;
      expect(Trigger.onKeydown(mEvent)).toBeUndefined();
    });

    it('should do nothing if last handler is disabled', () => {
      const mHandler = jest.fn();
      // eslint-disable-next-line dot-notation
      mHandler['disabled'] = true;
      Trigger.instanceList = [mHandler];
      const mEvent = ({ keyCode: 27 } as unknown) as KeyboardEvent;
      Trigger.onKeydown(mEvent);
      expect(mHandler).not.toBeCalled();
    });
  });

  it('should add keydown event listener for document.body and increase the counter', () => {
    const addEventListenerSpy = jest.spyOn(document.body, 'addEventListener');
    shallow(<Trigger visible disabled={false} />);
    shallow(<Trigger visible disabled={false} />);
    expect(addEventListenerSpy).toBeCalledWith('keydown', Trigger.onKeydown);
    expect(addEventListenerSpy).toBeCalledTimes(1);
    expect(Trigger.count).toBe(2);
  });

  it('should remove keydown event handler from document.body and instance list', () => {
    const removeEventListenerSpy = jest.spyOn(document.body, 'removeEventListener');
    const mOnClose = jest.fn();
    const wrapper = shallow(<Trigger visible disabled={false} onClose={mOnClose} />);
    expect(Trigger.instanceList).toEqual([mOnClose]);
    expect(Trigger.count).toBe(1);
    wrapper.unmount();
    expect(Trigger.instanceList).toHaveLength(0);
    expect(Trigger.count).toBe(0);
    expect(removeEventListenerSpy).toBeCalledWith('keydown', Trigger.onKeydown);
    expect(removeEventListenerSpy).toBeCalledTimes(1);
  });
});
