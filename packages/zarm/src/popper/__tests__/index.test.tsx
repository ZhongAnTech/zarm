import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import Popper from '../index';

if (global.document) {
  document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    // @ts-ignore
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document,
    },
  });
}

window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

describe('Popper', () => {
  it('renders correctly', () => {
    const onVisibleChange = jest.fn();

    const { container } = render(
      <Popper content="标题" onVisibleChange={onVisibleChange}>
        <p>点我</p>
      </Popper>,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders menu-slide', () => {
    const onVisibleChange = jest.fn();

    const { container } = render(
      <Popper content="标题" onVisibleChange={onVisibleChange} animationType="menu-slide">
        <p>点我</p>
      </Popper>,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders menu-slide bottom', () => {
    const onVisibleChange = jest.fn();

    const { container } = render(
      <Popper
        content="标题"
        onVisibleChange={onVisibleChange}
        animationType="menu-slide"
        direction="bottom"
      >
        <p>点我</p>
      </Popper>,
    );
    expect(container).toMatchSnapshot();
  });

  it('check hasArrow prop', () => {
    const { getByTestId } = render(
      <div data-testid="za-popper-hasArrow">
        <Popper
          trigger="click"
          hasArrow={false}
          content="fdsfsd"
          mouseEnterDelay={0}
          mouseLeaveDelay={0}
        >
          <div className="hello">Hello world!</div>
        </Popper>
        ,
      </div>,
    );

    const wrapper = getByTestId('za-popper-hasArrow');
    const elments = [].slice.call(wrapper.getElementsByClassName('hello'));
    fireEvent.click(elments?.[0]);
    expect(wrapper.getElementsByClassName('.za-popper__arrow')).not.toHaveLength(1);
  });

  it('check onVisibleChange func prop', async () => {
    const onVisibleChange = jest.fn();

    const { getByTestId } = render(
      <div data-testid="za-popper-onVisibleChange">
        <Popper
          trigger="click"
          content="fsdfds"
          mouseEnterDelay={0}
          mouseLeaveDelay={0}
          onVisibleChange={onVisibleChange}
        >
          <div className="hello">Hello world!</div>
        </Popper>
      </div>,
    );

    const wrapper = getByTestId('za-popper-onVisibleChange');
    const elments = [].slice.call(wrapper.getElementsByClassName('hello'));
    fireEvent.click(elments?.[0]);
    await waitFor(() => {
      expect(onVisibleChange).toBeCalled();
    });
  });
});
