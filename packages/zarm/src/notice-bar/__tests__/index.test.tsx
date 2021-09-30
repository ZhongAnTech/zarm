import React, { useRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import { CloseCircle } from '@zarm-design/icons';
import { createFCRefMock } from '../../../tests/utils';
import NoticeBar from '../index';
import ConfigProvider from '../../n-config-provider';

jest.mock('react', () => {
  return {
    ...(jest.requireActual('react') as typeof React),
    useRef: jest.fn().mockReturnValue({ current: { getBoundingClientRect: jest.fn() } }),
  };
});

const useMockRef = mocked(useRef);

describe('NoticeBar', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test('should render default notice bar', () => {
    const { container } = render(<NoticeBar>普通</NoticeBar>);
    expect(screen.queryByText(/普通/)).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('should render notice bar with custom theme', () => {
    const { container } = render(<NoticeBar theme="danger">自定义主题</NoticeBar>);
    expect(screen.queryByText(/自定义主题/)).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('should render default notice bar', () => {
    const { container } = render(
      <NoticeBar icon={<CloseCircle data-testid="notice-bar-icon" />}>自定义图标</NoticeBar>,
    );
    expect(screen.queryByText(/自定义图标/)).toBeTruthy();
    expect(screen.queryByTestId('notice-bar-icon')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('should add animation style to the content element and append a style tag into document with keyframe animation', () => {
    expect.assertions(3);
    const mWrapperRef = createFCRefMock('getBoundingClientRect', { width: 100 });
    const mContentRef = createFCRefMock('getBoundingClientRect', { width: 200 });
    useMockRef.mockReturnValueOnce(mWrapperRef).mockReturnValueOnce(mContentRef);
    render(<NoticeBar>普通</NoticeBar>);
    const noticeBarContent = document.querySelector('.za-notice-bar__content') as HTMLDivElement;
    if (noticeBarContent) {
      expect(window.getComputedStyle(noticeBarContent).getPropertyValue('animation')).toEqual(
        'za-notice-bar-scrolling 8000ms linear infinite',
      );
    }
    const keyframeStyleElement = document.querySelector('#za-notice-bar-scrolling');
    if (keyframeStyleElement) {
      expect(keyframeStyleElement).toBeTruthy();
      expect(keyframeStyleElement.innerHTML).toMatchSnapshot();
    }
  });

  test('should use prefixCls from context', () => {
    expect.assertions(3);
    render(
      <ConfigProvider prefixCls="zarm">
        <NoticeBar data-testid="message">普通</NoticeBar>
      </ConfigProvider>,
    );
    expect(screen.queryByText(/普通/)).toBeTruthy();
    const messageElement = screen.queryByTestId('message');
    if (messageElement) {
      if (messageElement.parentElement) {
        expect(messageElement.parentElement.className).toEqual('zarm-notice-bar');
      }
      expect(messageElement.className).toEqual('zarm-message zarm-message--warning');
    }
  });

  test('should forward ref from parent', () => {
    expect.assertions(2);
    const ref = React.createRef<HTMLDivElement>();
    render(<NoticeBar ref={ref}>普通</NoticeBar>);
    if (ref.current) {
      expect(ref.current.nodeName.toLowerCase()).toEqual('div');
      expect(ref.current.className).toEqual('za-notice-bar');
    }
  });

  test('should recalculate keyframe of the animation when new value of speed prop comes', () => {
    expect.assertions(4);
    const mWrapperRef = createFCRefMock('getBoundingClientRect', { width: 100 });
    const mContentRef = createFCRefMock('getBoundingClientRect', { width: 200 });
    useMockRef.mockReturnValueOnce(mWrapperRef).mockReturnValueOnce(mContentRef);
    const { rerender } = render(<NoticeBar>普通</NoticeBar>);
    let noticeBarContent = document.querySelector('.za-notice-bar__content') as HTMLDivElement;
    if (noticeBarContent) {
      expect(window.getComputedStyle(noticeBarContent).getPropertyValue('animation')).toEqual(
        'za-notice-bar-scrolling 8000ms linear infinite',
      );
    }
    useMockRef.mockReturnValueOnce(mWrapperRef).mockReturnValueOnce(mContentRef);
    rerender(<NoticeBar speed={100}>普通</NoticeBar>);
    noticeBarContent = document.querySelector('.za-notice-bar__content') as HTMLDivElement;
    if (noticeBarContent) {
      expect(window.getComputedStyle(noticeBarContent).getPropertyValue('animation')).toEqual(
        'za-notice-bar-scrolling 6000ms linear infinite',
      );
    }
    const keyframeStyleElement = document.querySelector('#za-notice-bar-scrolling');
    if (keyframeStyleElement) {
      expect(keyframeStyleElement).toBeTruthy();
      expect(keyframeStyleElement.innerHTML).toMatchSnapshot();
    }
  });

  test('should recalculate keyframe of the animation when new value of delay prop comes', () => {
    expect.assertions(2);
    const mWrapperRef = createFCRefMock('getBoundingClientRect', { width: 100 });
    const mContentRef = createFCRefMock('getBoundingClientRect', { width: 200 });
    useMockRef.mockReturnValueOnce(mWrapperRef).mockReturnValueOnce(mContentRef);
    const { rerender } = render(<NoticeBar>普通</NoticeBar>);
    let noticeBarContent = document.querySelector('.za-notice-bar__content') as HTMLDivElement;
    if (noticeBarContent) {
      expect(window.getComputedStyle(noticeBarContent).getPropertyValue('animation')).toEqual(
        'za-notice-bar-scrolling 8000ms linear infinite',
      );
    }
    useMockRef.mockReturnValueOnce(mWrapperRef).mockReturnValueOnce(mContentRef);
    rerender(<NoticeBar delay={4000}>普通</NoticeBar>);
    noticeBarContent = document.querySelector('.za-notice-bar__content') as HTMLDivElement;
    if (noticeBarContent) {
      expect(window.getComputedStyle(noticeBarContent).getPropertyValue('animation')).toEqual(
        'za-notice-bar-scrolling 12000ms linear infinite',
      );
    }
  });

  test('should be closable(remove from the document when user click the close icon)', () => {
    expect.assertions(4);
    const onClose = jest.fn();
    const { container } = render(
      <NoticeBar closable onClose={onClose} data-testid="root">
        普通
      </NoticeBar>,
    );
    expect(container).toMatchSnapshot();
    const closeIcon = screen.queryByTestId('root')?.querySelector('.za-message__footer')
      ?.firstChild;
    if (closeIcon) {
      fireEvent.click(closeIcon);
      expect(screen.queryByTestId('root')).toBeNull();
    }
    expect(document.querySelector('.za-notice-bar')).toBeNull();
    expect(onClose).toBeCalledTimes(1);
  });

  test('should respond to user click events when notice bar has arrow prop', () => {
    expect.assertions(2);
    const onClick = jest.fn();
    const { container } = render(
      <NoticeBar hasArrow data-testid="root" onClick={onClick}>
        普通
      </NoticeBar>,
    );
    expect(container).toMatchSnapshot();
    const message = screen.queryByTestId('root');
    if (message) {
      fireEvent.click(message);
      expect(onClick).toBeCalledTimes(1);
    }
  });
});
