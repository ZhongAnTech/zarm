import * as React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Rate from '../index';

describe('Rate', () => {
  it('renders correctly', () => {
    const wrapper = render(<Rate />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should emit change and value event when rate icon is clicked', () => {
    const onChange = jest.fn();
    const wrapper = mount(<Rate onChange={onChange} />);
    const item = wrapper.find('.za-rate__item');
    item.at(3).simulate('click');
    expect(onChange).toBeCalledWith(4);
  });
});
