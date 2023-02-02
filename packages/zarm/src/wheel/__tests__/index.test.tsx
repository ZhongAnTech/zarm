import React from 'react';
import { fireEvent, render } from '@testing-library/react';
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

  it('Wheel set fieldNames', () => {
    const { container } = render(
      <Wheel
        dataSource={[
          { value: '1', label: '选项一' },
          { value: '2', label: '选项二' },
        ]}
        fieldNames={{ value: 'value' }}
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

  it('Wheel set props disabled', () => {
    const { container } = render(
      <Wheel
        dataSource={[
          { value: '1', label: '选项一' },
          { value: '2', label: '选项二' },
        ]}
        defaultValue="1"
        value="1"
        disabled
      />,
    );
    const disabled = container.querySelectorAll('.za-wheel__item--disabled');
    expect(disabled?.length).toBeGreaterThan(0);
  });

  // it('Wheel touch move', () => {
  //   // jest.useFakeTimers();
  //   const { container } = render(
  //     <Wheel
  //       dataSource={[
  //         { value: '1', label: '选项一' },
  //         { value: '2', label: '选项二' },
  //       ]}
  //       defaultValue="1"
  //       value="1"
  //     />
  //   );

  //   // scroll = new BScroll(wrapper.ref('secondRef'), scrollOptions);
  //   // wrapper = scroll.wrapper;
  //   const wheel = container.querySelector('.za-wheel');
  //   fireEvent.touchStart(wheel!, { pointerId: 12, clientY: 0, buttons: 1 });
  //   fireEvent.touchMove(wheel!, { pointerId: 12, clientY: -100, buttons: 1 });
  //   fireEvent.touchMove(wheel!, { pointerId: 12, clientY: -200, buttons: 1 });
  //   fireEvent.touchEnd(wheel!, { pointerId: 12 });

  // });
});
