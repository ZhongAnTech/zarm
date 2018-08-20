import React from 'react';
import { render, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Switch from '../index';

describe('Switch', () => {
  it('renders correctly', () => {
    const wrapper = render(<Switch />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('defaultChecked', () => {
    const wrapper = render(<Switch defaultChecked />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('onChange', () => {
    const onChange = jest.fn();
    const wrapper = shallow(<Switch checked onChange={onChange} />);
    wrapper.find('input').simulate('change', { target: { checked: false } });
    expect(onChange).toBeCalledWith(false);
  });

  it('receive new checked', () => {
    const wrapper = shallow(<Switch />);
    wrapper.setProps({ disabled: true });
    wrapper.setProps({ checked: true });
  });

  it('receive new checked when disabled', () => {
    const onChange = jest.fn();
    const wrapper = shallow(<Switch disabled onChange={onChange} />);
    wrapper.find('input').simulate('change', { target: { checked: true } });
    expect(onChange).not.toBeCalled();
  });

  // it('size', () => {
  //   const wrapper = render(<Switch size="small" />);
  //   expect(toJson(wrapper)).toMatchSnapshot();
  // });
});
