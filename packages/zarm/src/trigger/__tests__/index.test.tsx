import { shallow, mount } from 'enzyme';
import React from 'react';
import Trigger from '../Trigger';
import PropsType from '../interface';

describe('TriggerComponent', () => {
  afterEach(() => {
    Trigger.instanceList = [];
    jest.restoreAllMocks();
  });
  describe('the very first effect hooks', () => {
    it('instance list of Trigger component should be empty if visible prop is false', () => {
      const props: PropsType = {
        disabled: false,
        visible: false,
      };
      const wrapper = mount(<Trigger visible={props.visible} disabled={props.disabled} />);
      expect(Trigger.instanceList).toEqual([]);
    });
    it('instance list of Trigger component should be empty if onClose prop is null', () => {
      const props: PropsType = {
        disabled: true,
        visible: true,
      };
      Trigger(props);
      expect(Trigger.instanceList).toEqual([]);
    });
    it('instance list of Trigger component should be empty if disable prop is true', () => {
      const props: PropsType = {
        disabled: true,
        visible: true,
        onClose: jest.fn(),
      };
      Trigger(props);
      expect(Trigger.instanceList).toEqual([]);
    });
    it('should push onClose function to instance list if visible is true and the onClose function does not exist in instance list', () => {
      const props: PropsType = {
        disabled: false,
        visible: true,
        onClose: jest.fn(),
      };
      Trigger(props);
      expect(Trigger.instanceList).toEqual([props.onClose]);
    });
  });

  describe('Black-box: onKeydown function was triggered', () => {
    it('should handle escape keyboard event using the last handler of instance list', () => {
      const mOnClose = jest.fn();
      const wrapper = mount(<Trigger visible disabled={false} onClose={mOnClose} />);
      expect(mOnClose.mock.results[0][1]).toBeFalsy();
      expect(Trigger.instanceList).toEqual([mOnClose]);
      const body = wrapper.find('document.body');
      body.simulate('Escape');
      expect(mOnClose).toBeCalledTimes(1);
    });

    it('should do nothing if last handler is disabled', () => {
      const mOnClose = jest.fn();
      const wrapper = mount(<Trigger visible disabled={false} onClose={mOnClose} />);
      expect(Trigger.instanceList).toEqual([mOnClose]);
      const body = wrapper.find('document.body');
      body.simulate('Escape');
      expect(mOnClose).not.toBeCalled();
    });
  });

  it('should add keydown event listener for document.body', () => {
    const addEventListenerSpy = jest.spyOn(document.body, 'addEventListener');
    shallow(<Trigger visible disabled={false} />);
    expect(addEventListenerSpy).toBeCalledTimes(1);
  });

  it('should remove keydown event handler from document.body and instance list', () => {
    const removeEventListenerSpy = jest.spyOn(document.body, 'removeEventListener');
    const mOnClose = jest.fn();
    const wrapper = shallow(<Trigger visible disabled={false} onClose={mOnClose} />);
    expect(Trigger.instanceList).toEqual([mOnClose]);
    wrapper.unmount();
    expect(Trigger.instanceList).toHaveLength(0);
    expect(mOnClose).not.toBeCalled();
    expect(removeEventListenerSpy).toBeCalledTimes(1);
  });
});
