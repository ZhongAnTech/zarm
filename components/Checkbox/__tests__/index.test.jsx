import React from 'react';
import { render, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Checkbox from '../index';

describe('Checkbox', () => {
  it('renders correctly', () => {
    const wrapper = render(<Checkbox checked>foo</Checkbox>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('checked change false', () => {
    const onChange = jest.fn();
    const wrapper = shallow(<Checkbox checked onChange={onChange}>foo</Checkbox>);
    wrapper.find('input').simulate('change', { target: { checked: false } });
    expect(onChange).toHaveBeenCalledWith(false);
  });
});
