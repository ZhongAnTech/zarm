import { act } from '@testing-library/react';
import React from 'react';
import { render, unmount } from '../dom';

describe('renderToContainer', () => {
  const wrapper = document.createElement('div');

  test('insert and update using the same container', () => {
    act(() => {
      render(<span>first</span>, wrapper);
      render(<span>second</span>, wrapper);
    });
    expect(wrapper.querySelector('span')).toBeInstanceOf(HTMLElement);
    expect(wrapper.textContent).toBe('second');
  });

  test('unmount', async () => {
    let unmountResult: ReturnType<typeof unmount>;
    await act(async () => {
      unmountResult = unmount(wrapper);
      if (unmountResult && typeof (unmountResult as Promise<void>).then === 'function') {
        await (unmountResult as Promise<void>);
      }
    });
    expect(wrapper.querySelector('span')).toBeNull();
  });
});
