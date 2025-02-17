import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import Trigger from '../Trigger';

describe('TriggerComponent', () => {
  afterEach(() => {
    Trigger.instanceList = [];
    jest.restoreAllMocks();
  });
  describe('Props initialize the TriggerComponent', () => {
    it('instance list of Trigger component should be empty if visible prop is false', () => {
      render(<Trigger visible={false} disabled={false} />);
      expect(Trigger.count).toBe(1);
      expect(Trigger.instanceList).toEqual([]);
    });
    it('instance list of Trigger component should be empty if onClose prop is null', () => {
      render(<Trigger visible disabled />);
      expect(Trigger.instanceList).toEqual([]);
    });
    it('instance list of Trigger component should not be empty if disable prop is true', () => {
      const mOnClose = jest.fn();
      render(<Trigger visible disabled onClose={mOnClose} />);
      expect(Trigger.instanceList).toEqual([mOnClose]);
      expect(mOnClose).not.toHaveBeenCalled();
    });
    it('should push onClose function to instance list if visible is true and the onClose function does not exist in instance list', () => {
      const mOnClose = jest.fn();
      render(<Trigger visible disabled={false} onClose={mOnClose} />);
      expect(Trigger.instanceList).toEqual([mOnClose]);
      expect(Trigger.count).toBe(1);
      expect(mOnClose).not.toHaveBeenCalled();
    });
  });

  describe('Black-box: onKeydown function was triggered', () => {
    it('should handle escape keyboard event using the last handler of instance list', () => {
      const mOnClose = jest.fn();
      render(<Trigger visible disabled={false} onClose={mOnClose} />);
      expect(Trigger.count).toBe(1);
      expect(mOnClose).not.toHaveBeenCalled();
      expect(Trigger.instanceList).toEqual([mOnClose]);
      expect(Trigger.instanceList[0]?.disabled).toBeFalsy();
      fireEvent.keyDown(document.body, { key: 'Escape', code: 'Escape' });
      expect(Trigger.count).toBe(1);
      expect(mOnClose).toHaveBeenCalled();
      expect(mOnClose).toBeCalledTimes(1);
    });

    it('should do nothing if last handler is disabled', () => {
      const mOnClose = jest.fn();
      render(<Trigger visible disabled onClose={mOnClose} />);
      expect(Trigger.instanceList).toEqual([mOnClose]);
      fireEvent.keyDown(document.body, { key: 'Escape', code: 'Escape' });
      expect(mOnClose).not.toBeCalled();
    });
  });

  it('should add keydown event listener for document.body', () => {
    const mOnClose = jest.fn();
    const addEventListenerSpy = jest.spyOn(document.body, 'addEventListener');
    render(<Trigger visible disabled={false} onClose={mOnClose} />);
    expect(Trigger.count).toBe(1);
    expect(addEventListenerSpy).toBeCalledTimes(1);
  });

  it('should increase the counter in case of multiple trigger components', () => {
    const mOnClose = jest.fn();
    render(<Trigger visible disabled={false} onClose={mOnClose} />);
    expect(Trigger.count).toBe(1);
    render(<Trigger visible disabled={false} onClose={mOnClose} />);
    expect(Trigger.count).toBe(2);
  });

  it('should remove keydown event handler from document.body and decrease counter', () => {
    const mOnClose = jest.fn();
    const removeEventListenerSpy = jest.spyOn(document.body, 'removeEventListener');
    const wrapper = render(<Trigger visible disabled={false} onClose={mOnClose} />);
    expect(Trigger.instanceList).toEqual([mOnClose]);
    expect(Trigger.count).toBe(1);
    wrapper.unmount();
    fireEvent.keyDown(document.body, { key: 'Escape', code: 'Escape' });
    expect(mOnClose).not.toBeCalled();
    expect(removeEventListenerSpy).toBeCalledTimes(1);
    expect(Trigger.instanceList).toEqual([]);
    expect(Trigger.count).toBe(0);
  });
});
