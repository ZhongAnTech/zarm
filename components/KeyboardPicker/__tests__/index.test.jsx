import React from 'react';
import { render, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import KeyboardPicker from '../index';

describe('KeyboardPicker', () => {
  it('renders correctly', () => {
    const wrapper = render(<KeyboardPicker />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('visible', () => {
    const wrapper = shallow(<KeyboardPicker />);
    wrapper.setProps({ visible: true });
    wrapper.setProps({ visible: false });
  });
});
