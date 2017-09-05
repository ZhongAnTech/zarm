import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Toast from '../index';

describe('Toast', () => {
  it('renders correctly', () => {
    const onMaskClick = jest.fn();

    const wrapper = shallow(
      <Toast onMaskClick={onMaskClick}>foo</Toast>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.setProps({ visible: true });
    wrapper.unmount();
  });

  it('duration', () => {
    const wrapper = shallow(
      <Toast duration={0}>foo</Toast>
    );
    wrapper.setProps({ visible: true });
  });
});
