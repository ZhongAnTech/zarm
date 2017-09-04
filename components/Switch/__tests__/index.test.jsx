import React from 'react';
import { render, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Switch from '../index';

describe('Switch', () => {
  it('renders correctly', () => {
    const wrapper = render(<Switch checked />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('checked change false', () => {
    const onChange = jest.fn();
    const wrapper = shallow(<Switch checked onChange={onChange} />);
    wrapper.find('input').simulate('change', { target: { checked: false } });
    expect(onChange).toBeCalledWith(false);
  });
});
