import React from 'react';
import { render, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Input from '../index';

describe('Input', () => {
  it('renders correctly', () => {
    const wrapper = render(<Input type="text" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders type is textarea correctly', () => {
    const wrapper = render(<Input type="textarea" rows={4} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('autosize', () => {
    const onChange = jest.fn();
    const wrapper = shallow(<Input autosize type="textarea" rows={4} onChange={onChange} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.find('textarea').simulate('change', { target: { value: 'this is a test!' } });
    expect(onChange).toBeCalledWith(expect.objectContaining({
      target: {
        value: 'this is a test!',
      },
    }));
    wrapper.unmount();
  });

  it('showLength', () => {
    const wrapper = render(<Input showLength type="textarea" rows={4} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
