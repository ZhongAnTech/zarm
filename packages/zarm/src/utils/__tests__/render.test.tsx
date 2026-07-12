import { act } from '@testing-library/react';
import React from 'react';
import { render, unmount } from '../dom';

const waitForMaybePromise = async (value: ReturnType<typeof unmount> | undefined) => {
  if (value && typeof (value as Promise<void>).then === 'function') {
    await value;
  }
};

const supportsAsyncAct = () => {
  const [major, minor] = React.version.split('.').map(Number);
  return major > 16 || (major === 16 && minor >= 9);
};

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
    let unmountResult: ReturnType<typeof unmount> | undefined;

    if (supportsAsyncAct()) {
      await act(async () => {
        unmountResult = unmount(wrapper);
        await waitForMaybePromise(unmountResult);
      });
    } else {
      act(() => {
        unmountResult = unmount(wrapper);
      });
      await waitForMaybePromise(unmountResult);
    }

    expect(wrapper.querySelector('span')).toBeNull();
  });
});
