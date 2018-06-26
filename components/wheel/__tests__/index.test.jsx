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
});
