import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import useToast from '../useToast';
import ConfigProvider from '../../n-config-provider';

describe('useToast', () => {
  test('should create zarm toast container each time when call toast.show() method in a period of time ', () => {
    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.show({ content: "I'm a toast" });
      result.current.show({ content: "I'm a toast" });
      result.current.show({ content: "I'm a toast" });
    });
    expect(document.querySelectorAll('.za-toast-container')).toHaveLength(1);
    act(() => {
      result.current.hide();
    });
  });

  test('should render toast inside document.body', () => {
    expect.assertions(4);
    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.show({ content: "I'm a toast" });
    });
    const zaToastContainer = document.querySelector('.za-toast-container');
    expect(zaToastContainer).toBeTruthy();
    if (zaToastContainer) {
      expect(zaToastContainer.parentElement).toEqual(document.body);
    }
    const zaToastTextContainer = document.querySelector('.za-toast__container');
    if (zaToastTextContainer) {
      expect(zaToastTextContainer.textContent).toEqual("I'm a toast");
    }
    act(() => {
      result.current.hide();
    });
    expect(document.querySelector('.za-toast-container')).toBeFalsy();
  });

  test('should render toast inside custom mount container', () => {
    expect.assertions(4);
    const { result } = renderHook(() => useToast());
    const mountContainer = document.createElement('div');
    document.body.appendChild(mountContainer);
    act(() => {
      result.current.show({ content: "I'm a toast", mountContainer });
    });
    const zaToastContainer = document.querySelector('.za-toast-container');
    expect(zaToastContainer).toBeTruthy();
    if (zaToastContainer) {
      expect(zaToastContainer.parentElement).toEqual(mountContainer);
    }
    const zaToastTextContainer = document.querySelector('.za-toast__container');
    if (zaToastTextContainer) {
      expect(zaToastTextContainer.textContent).toEqual("I'm a toast");
    }
    act(() => {
      result.current.hide();
    });
    expect(document.querySelector('.za-toast-container')).toBeFalsy();
    mountContainer.remove();
  });

  test('should call after close callback', () => {
    const mAfterClose = jest.fn();
    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.show({ content: "I'm a toast", afterClose: mAfterClose });
    });
    expect(document.querySelector('.za-toast-container')).toBeTruthy();
    act(() => {
      result.current.hide();
    });
    expect(mAfterClose).toBeCalledTimes(1);
    expect(document.querySelector('.za-toast-container')).toBeFalsy();
  });

  test('should add custom className to za toast container', () => {
    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.show({ content: "I'm a toast", className: 'ui-toast' });
    });
    expect(document.querySelector('.za-toast-container.ui-toast')).toBeTruthy();
    act(() => {
      result.current.hide();
    });
  });

  test('should use prefixCls from context', () => {
    const wrapper = ({ children }) => <ConfigProvider prefixCls="zarm">{children}</ConfigProvider>;
    const { result } = renderHook(() => useToast(), { wrapper });
    act(() => {
      result.current.show({ content: "I'm a toast" });
    });
    expect(document.querySelector('.zarm-toast-container')).toBeTruthy();
    act(() => {
      result.current.hide();
    });
  });

  test('should render custom content', () => {
    expect.assertions(3);
    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.show({ content: <div className="custom-content">custom content</div> });
    });
    expect(document.querySelector('.za-toast-container')).toBeTruthy();
    const customContent = document.querySelector('.custom-content');
    expect(customContent).toBeTruthy();
    if (customContent) {
      expect(customContent.textContent).toEqual('custom content');
    }
    act(() => {
      result.current.hide();
    });
  });
});
