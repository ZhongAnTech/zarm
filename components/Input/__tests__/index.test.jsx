import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Input from '../index';

describe('Input', () => {
  it('renders correctly', () => {
    const wrapper = render(<Input type="text" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('type is textarea renders correctly', () => {
    const wrapper = render(<Input type="textarea" rows={4} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('type is date renders correctly', () => {
    const wrapper = render(<Input type="date" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('autosize', () => {
    jest.useFakeTimers();
    const props = {
      autosize: true,
      type: 'textarea',
      rows: 4,
      value: 'foo',
      onChange: jest.fn(),
    };
    const wrapper = mount(<Input {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.find('textarea').simulate('change', { target: { value: 'this is a test!' } });
    expect(props.onChange).toBeCalledWith(expect.objectContaining({ target: { value: 'this is a test!' } }));
    jest.runAllTimers();
    wrapper.unmount();
  });

  it('type text has autosize', () => {
    jest.useFakeTimers();
    const wrapper = mount(<Input autosize type="text" />);
    wrapper.find('input').simulate('change', { target: { value: 'this is a test!' } });
    jest.runAllTimers();
  });

  it('showLength', () => {
    const wrapper = render(<Input showLength maxLength={100} type="textarea" rows={4} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
