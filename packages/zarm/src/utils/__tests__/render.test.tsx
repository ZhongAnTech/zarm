import React from 'react';
import { render, unmount } from '../dom';

describe('renderToContainer', () => {
  const wrapper = document.createElement('div');
  render(<span />, wrapper);

  test('insert', () => {
    expect(wrapper.querySelector('span')).toBeInstanceOf(HTMLElement);
  });

  test('unmount', () => {
    unmount(wrapper);
    expect(wrapper.querySelector('span')).toBeNull();
  });
});
