import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Input from '../index';

describe('Input', () => {
  it('renders correctly', () => {
    const wrapper = render(<Input type="text" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('showLength', () => {
    const wrapper = render(<Input showLength maxLength={100} type="textarea" rows={4} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

describe('Input.Textarea', () => {
  it('renders correctly', () => {
    const wrapper = render(<Input type="textarea" rows={4} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('autoHeight', () => {
    jest.useFakeTimers();
    const props = {
      autoHeight: true,
      type: 'textarea',
      rows: 4,
      value: 'foo',
      onChange: jest.fn(),
    };
    const wrapper = mount(<Input {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.find('textarea').simulate('change', { target: { value: 'this is a test!' } });
    expect(props.onChange).toBeCalledWith('this is a test!');
    jest.runAllTimers();
    wrapper.unmount();
  });
});

describe('Input.Number', () => {
  it('renders correctly', () => {
    const wrapper = render(<Input type="number" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('enter number', () => {
    const onChange = jest.fn();
    const wrapper = mount(<Input type="number" onChange={onChange} />);
    wrapper.find('input').simulate('focus');
    const keys = wrapper.find('.za-keyboard-keys');
    keys.childAt(0).simulate('click');
    expect(onChange).toBeCalledWith('1');
    wrapper.unmount();
  });
});

describe('Input.Price', () => {
  it('renders correctly', () => {
    const wrapper = render(<Input type="price" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

describe('Input.Idcard', () => {
  it('renders correctly', () => {
    const wrapper = render(<Input type="idcard" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
