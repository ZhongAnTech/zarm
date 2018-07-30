import React from 'react';
import { render, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Mask from '../index';

describe('Mask', () => {
  it('renders correctly', () => {
    const wrapper = render(<Mask visible />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('type is transparent', () => {
    const wrapper = render(<Mask visible type="transparent" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('onClick', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<Mask visible onClick={onClick} />);
    wrapper.simulate('click');
    expect(onClick).toBeCalled();
  });
});
