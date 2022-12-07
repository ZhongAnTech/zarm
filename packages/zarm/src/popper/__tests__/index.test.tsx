import React from 'react';
import { render, fireEvent } from '@testing-library/react';
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
      <Popper title="标题" onVisibleChange={onVisibleChange}>
        <p>点我</p>
      </Popper>,
    );
    expect(container).toMatchSnapshot();
    // wrapper.unmount();
  });

  // it('check visible prop', () => {
  //   const wrapper = mount(
  //     <Popper title="" mouseEnterDelay={0} mouseLeaveDelay={0}>
  //       <div id="hello">Hello world!</div>
  //     </Popper>,
  //   );

  //   const div = wrapper.find('#hello').at(0);
  //   div.simulate('mouseover');
  //   // expect(wrapper.instance().props.visible).toBe(false);

  //   div.simulate('mouseleave');
  //   expect(wrapper.instance().props.visible).toBe(false);
  // });

  it('check hasArrow prop', () => {
    const { getByTestId } = render(
      <div data-testid="za-popper-hasArrow">
        <Popper
          trigger="click"
          hasArrow={false}
          title="fdsfsd"
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

  it('check onVisibleChange func prop', () => {
    const onVisibleChange = jest.fn();

    const { getByTestId } = render(
      <div data-testid="za-popper-onVisibleChange">
        <Popper
          trigger="click"
          title="fsdfds"
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
    setTimeout(() => {
      expect(onVisibleChange).toBeCalled();
    });
    // expect(wrapper.instance().props.visible).toBe(false);

    // div.simulate('click');
    // setTimeout(() => {
    //   expect(onVisibleChange).toBeCalled();
    // });
    // expect(wrapper.instance().props.visible).toBe(false);
  });
});
