import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import PickerView from '../index';

describe('PickerView', () => {
  const fakeTimers = () => {
    performance.timing = {};
    performance.timing.navigationStart = 0;
  };
  fakeTimers();

  it('PickerView render visible', () => {
    const wrapper = render(
      <PickerView
        dataSource={[
          { value: '1', label: '选项一' },
          { value: '2', label: '选项二' },
        ]}
        defaultValue="1"
        value="1"
      />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('PickerView disabled', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <PickerView
        disabled
        onChange={onChange}
        dataSource={[
          { value: '1', label: '选项一' },
          { value: '2', label: '选项二' },
        ]}
      />,
    );
    expect(onChange).not.toBeCalled();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  // it('touch event', () => {
  //   const onChange = jest.fn();
  //   const wrapper = mount(
  //     <PickerView
  //       dataSource={[
  //         { value: '1', label: '选项一' },
  //         { value: '2', label: '选项二' },
  //       ]}
  //       onChange={onChange}
  //       defaultValue="1"
  //       value="1"
  //     />
  //   ).find('.za-wheel').at(0);

  //   wrapper.simulate('touchStart', {
  //     touches: [0, 10],
  //   });
  //   wrapper.simulate('touchMove', {
  //     touches: [0, 50],
  //   });
  //   wrapper.simulate('touchEnd', {
  //     touches: [0, 100],
  //   });

  //   // expect(onChange).toBeCalled();
  // });
});
