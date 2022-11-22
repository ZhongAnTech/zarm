import React from 'react';
import { render } from '@testing-library/react';
import Wheel from '../index';

// function fakeTimers() {
//   performance.timing = {};
//   performance.timing.navigationStart = 0;
// }
// fakeTimers();

describe('Wheel', () => {
  it('Wheel render visible', () => {
    const { container } = render(
      <Wheel
        dataSource={[
          { value: '1', label: '选项一' },
          { value: '2', label: '选项二' },
        ]}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('Wheel set props value', () => {
    const { container } = render(
      <Wheel
        dataSource={[
          { value: '1', label: '选项一' },
          { value: '2', label: '选项二' },
        ]}
        defaultValue="1"
        value="1"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('Wheel render defaultValue', () => {
    const { container } = render(
      <Wheel
        dataSource={[
          { value: '1', label: '选项一' },
          { value: '2', label: '选项二' },
        ]}
        defaultValue="1"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('Wheel disabled', () => {
    const { container } = render(
      <Wheel
        dataSource={[
          { value: '1', label: '选项一' },
          { value: '2', label: '选项二' },
        ]}
        disabled
      />,
    );
    expect(container).toMatchSnapshot();
  });

  // it('Wheel set props disabled', () => {
  //   const wrapper = mount(
  //     <Wheel
  //       dataSource={[
  //         { value: '1', label: '选项一' },
  //         { value: '2', label: '选项二' },
  //       ]}
  //       defaultValue="1"
  //       value="1"
  //     />,
  //   );
  //   expect(toJson(wrapper)).toMatchSnapshot();
  //   wrapper.setProps({ disabled: true });
  //   wrapper.unmount();
  // });

  // it('Wheel touch move', () => {
  //   // jest.useFakeTimers();
  //   let wrapper = mount(
  //     <Wheel
  //       dataSource={[
  //         { value: '1', label: '选项一' },
  //         { value: '2', label: '选项二' },
  //       ]}
  //       defaultValue="1"
  //       value="1"
  //       ref="wheelRef"
  //     />
  //   );

  //   // scroll = new BScroll(wrapper.ref('secondRef'), scrollOptions);
  //   // wrapper = scroll.wrapper;
  //   dispatchTouchStart(wrapper.ref('secondRef'), {
  //     pageX: 100,
  //     pageY: 100,
  //   });
  //   dispatchTouchMove(wrapper.ref('secondRef'), {
  //     pageX: 100,
  //     pageY: 50,
  //   });

  // });
});
