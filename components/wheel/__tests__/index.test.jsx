import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Wheel from '../index';

describe('Wheel', () => {
  it('Wheel render visible', () => {
    // jest.useFakeTimers();
    const wrapper = mount(
      <Wheel
        dataSource={[
          { value: '1', label: '选项一' },
          { value: '2', label: '选项二' },
        ]}
        defaultValue="1"
        value="1"
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.setProps({ value: '2' });
    // jest.runAllTimers();
    wrapper.unmount();
  });

  it('Wheel render visible', () => {
    // jest.useFakeTimers();
    const wrapper = mount(
      <Wheel
        dataSource={[
          { value: '1', label: '选项一' },
          { value: '2', label: '选项二' },
        ]}
        defaultValue="1"
        value="1"
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.setProps({ value: '2' });
    // jest.runAllTimers();
    wrapper.unmount();
  });

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
