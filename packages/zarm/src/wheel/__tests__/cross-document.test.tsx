import BScroll from '@better-scroll/core';
import { render } from '@testing-library/react';
import React from 'react';
import Wheel from '../index';

jest.mock('@better-scroll/core', () => ({
  __esModule: true,
  default: Object.assign(
    jest.fn(() => ({
      on: jest.fn(),
      destroy: jest.fn(),
      getSelectedIndex: jest.fn(),
      refresh: jest.fn(),
      wheelTo: jest.fn(),
      disable: jest.fn(),
      stop: jest.fn(),
    })),
    { use: jest.fn() },
  ),
}));

jest.mock('@better-scroll/wheel', () => ({
  __esModule: true,
  default: {},
}));

const mockBScroll = BScroll as unknown as jest.Mock;

const dataSource = [
  { value: '1', label: '选项一' },
  { value: '2', label: '选项二' },
];

describe('Wheel cross-document events', () => {
  afterEach(() => {
    mockBScroll.mockClear();
  });

  it('binds move and end events to window in the current document', () => {
    render(<Wheel dataSource={dataSource} />);

    expect(mockBScroll).toHaveBeenCalledWith(
      expect.any(HTMLElement),
      expect.objectContaining({ bindToWrapper: false }),
    );
  });

  it('binds move and end events to the wrapper when rendered into another document', () => {
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    const container = iframe.contentDocument!.createElement('div');
    iframe.contentDocument!.body.appendChild(container);

    const { unmount } = render(<Wheel dataSource={dataSource} />, { container });

    expect(mockBScroll.mock.calls[0][0].ownerDocument).toBe(iframe.contentDocument);
    expect(mockBScroll).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ bindToWrapper: true }),
    );

    unmount();
    iframe.remove();
  });
});
