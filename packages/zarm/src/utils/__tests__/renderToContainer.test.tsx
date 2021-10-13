import React from 'react';
import renderToContainer from '../renderToContainer';

describe('renderToContainer', () => {
  const wrapper = document.createElement('div');
  const unmount = renderToContainer(wrapper, <span />);

  test('insert', () => {
    expect(wrapper.querySelector('span')).toBeInstanceOf(HTMLElement);
  });

  test('unmount', () => {
    unmount();
    expect(wrapper.querySelector('span')).toBeNull();
  });
});
