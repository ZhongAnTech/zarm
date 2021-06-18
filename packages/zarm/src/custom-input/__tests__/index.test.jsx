import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import CustomInput from '../index';

describe('CustomInput', () => {
  it('renders correctly', () => {
    const wrapper = render(<CustomInput type="number" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders correctly if type isn't valid", () => {
    const wrapper = render(<CustomInput type="xxx" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('auto focus', () => {
    const id = String(Math.random());
    const wrapper = mount(<CustomInput id={id} autoFocus />);
    expect(wrapper.props().id).toEqual(id);
  });
});

describe('CustomInput.Number', () => {
  it('inputNumber value 0', () => {
    const wrapper = mount(<CustomInput clearable type="number" value={0} />);
    const input = wrapper.find('input[type="hidden"]');
    expect(input.instance().value).toEqual('0');
  });
});

describe('CustomInput.Price', () => {
  it('renders correctly', () => {
    const wrapper = mount(<CustomInput type="price" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

describe('CustomInput.Idcard', () => {
  it('renders correctly', () => {
    const wrapper = mount(<CustomInput type="idcard" maxLength={18} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
