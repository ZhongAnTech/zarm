import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Popper from '../index';

describe('Popper', () => {
  it('renders correctly', () => {
    const onVisibleChange = jest.fn();

    const wrapper = mount(<Popper title="标题" onVisibleChange={onVisibleChange}><p>点我</p></Popper>);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
