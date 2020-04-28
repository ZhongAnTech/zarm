import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import BackToTop from '../index';

describe('Badge', () => {
  it('renders correctly', () => {
    const wrapper = mount(<BackToTop>Up</BackToTop>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
