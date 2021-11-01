import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Wheel from '../index';

function fakeTimers() {
  performance.timing = {};
  performance.timing.navigationStart = 0;
}
fakeTimers();

describe('Wheel', () => {
  it('Wheel render visible', () => {
    const wrapper = mount(
      <Wheel
        dataSource={[
          { value: '1', label: '选项一' },
          { value: '2', label: '选项二' },
        ]}
      />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Wheel set props value', () => {
    const wrapper = mount(
      <Wheel
        dataSource={[
          { value: '1', label: '选项一' },
          { value: '2', label: '选项二' },
        ]}
        defaultValue="1"
        value="1"
      />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.setProps({ value: '2' });
    wrapper.unmount();
  });

  it('Wheel render defaultValue', () => {
    const wrapper = mount(
      <Wheel
        dataSource={[
          { value: '1', label: '选项一' },
          { value: '2', label: '选项二' },
        ]}
        defaultValue="1"
      />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('Wheel disabled', () => {
    const wrapper = mount(
      <Wheel
        dataSource={[
          { value: '1', label: '选项一' },
          { value: '2', label: '选项二' },
        ]}
        disabled
      />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('Wheel set props disabled', () => {
    const wrapper = mount(
      <Wheel
        dataSource={[
          { value: '1', label: '选项一' },
          { value: '2', label: '选项二' },
        ]}
        defaultValue="1"
        value="1"
      />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.setProps({ disabled: true });
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
