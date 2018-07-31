import React from 'react';
import { render, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Stepper from '../index';

describe('Stepper', () => {
  it('renders correctly', () => {
    const onChange = jest.fn();
    const wrapper = render(
      <Stepper onChange={onChange} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('defaultValue', () => {
    const wrapper = shallow(
      <Stepper defaultValue={2} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('receive new value', () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <Stepper onChange={onChange} />
    );
    wrapper.setProps({ value: 10 });
  });

  it('onChange and onInputChange', () => {
    const onChange = jest.fn();
    const onInputChange = jest.fn();
    const wrapper = shallow(
      <Stepper onChange={onChange} onInputChange={onInputChange} />
    );
    wrapper.find('input').simulate('change', { target: { value: 10 } });
    expect(onInputChange).toBeCalled();
    wrapper.find('input').simulate('blur');
    expect(onChange).toBeCalledWith(10);
    wrapper.find('.za-stepper-sub').simulate('click');
    expect(onChange).toBeCalledWith(9);
    wrapper.find('.za-stepper-plus').simulate('click');
    expect(onChange).toBeCalledWith(10);
  });
});
