import React from 'react';
import { render, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Checkbox from '../index';

describe('Checkbox', () => {
  const props = {
    checked: true,
    children: 'foo',
    onChange: jest.fn(),
  };

  it('renders correctly', () => {
    const wrapper = render(<Checkbox {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('checked change false', () => {
    const wrapper = shallow(<Checkbox {...props} />);
    wrapper.find('input').simulate('change', { target: { checked: false } });
    expect(props.onChange).toBeCalledWith(false);
  });
});
