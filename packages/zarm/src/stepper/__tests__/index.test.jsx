import React from 'react';
import { mount, render, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Stepper from '../index';
import Input from '../../input';

describe('Stepper', () => {
  it('renders correctly', () => {
    const onChange = jest.fn();
    const wrapper = render(<Stepper onChange={onChange} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('defaultValue', () => {
    const wrapper = shallow(<Stepper defaultValue={2} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('disabled sub or plus click', () => {
    const onChange = jest.fn();

    const wrapper = mount(<Stepper max={2} min={0} onChange={onChange} />);

    wrapper.setProps({ value: 0 });
    wrapper.find('.za-stepper__sub').at(0).simulate('click');
    setTimeout(() => expect(wrapper.find(Input).at(0).props().value).toBe(0));

    wrapper.setProps({ value: 2 });
    wrapper.find('.za-stepper__plus').at(0).simulate('click');
    setTimeout(() => expect(wrapper.find(Input).at(0).props().value).toBe(2));
  });

  it('receive new value', () => {
    const onChange = jest.fn();
    const wrapper = shallow(<Stepper onChange={onChange} />);
    wrapper.setProps({ value: 10 });
  });

  it('onChange and onInputChange', () => {
    const onChange = jest.fn();
    const onInputChange = jest.fn();

    const wrapper = shallow(
      <Stepper min={null} max={null} onChange={onChange} onInputChange={onInputChange} />,
    );

    wrapper
      .find(Input)
      .at(0)
      .simulate('change', { target: { value: 10 } });
    expect(onInputChange).toBeCalled();

    wrapper.setProps({ value: 10 });
    wrapper.find('.za-stepper__sub').simulate('click');
    expect(onChange).toBeCalledWith(9);

    wrapper.setProps({ value: 9 });
    wrapper.find('.za-stepper__plus').simulate('click');
    expect(onChange).toBeCalledWith(10);
  });

  it('input value is NaN', () => {
    const onChange = jest.fn();
    const onInputChange = jest.fn();

    const wrapper = shallow(
      <Stepper min={0} max={20} value={10} onChange={onChange} onInputChange={onInputChange} />,
    );

    wrapper
      .find(Input)
      .at(0)
      .simulate('change', { target: { value: '你好' } });
    wrapper.find(Input).at(0).simulate('blur');
    expect(onChange).toBeCalledWith(10);
  });

  it('out of range', () => {
    const onChange = jest.fn();
    const onInputChange = jest.fn();
    const wrapper = mount(
      <Stepper min={0} max={20} onChange={onChange} onInputChange={onInputChange} />,
    );

    wrapper.setProps({ value: -2 });
    wrapper.find(Input).at(0).simulate('blur');
    setTimeout(() => expect(onChange).toBeCalledWith(0));

    wrapper.setProps({ value: 30 });
    wrapper.find(Input).at(0).simulate('blur');
    setTimeout(() => expect(onChange).toBeCalledWith(20));
  });

  it('decimal step', () => {
    const onChange = jest.fn();
    const onInputChange = jest.fn();
    const wrapper = mount(<Stepper onChange={onChange} onInputChange={onInputChange} />);

    wrapper.setProps({ value: 1 });
    wrapper.setProps({ step: 0.1 });
    wrapper.find('.za-stepper__sub').at(0).simulate('click');
    setTimeout(() => expect(wrapper.find(Input).at(0).props().value).toBe('0.9'));

    wrapper.setProps({ step: 0.2 });
    wrapper.find('.za-stepper__plus').at(0).simulate('click');
    setTimeout(() => expect(wrapper.find(Input).at(0).props().value).toBe('1.1'));
  });
});
