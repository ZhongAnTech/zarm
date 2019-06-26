import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Icon from '../index';
import SvgCcomponent from '../component';

describe('Icon', () => {
  it('renders correctly', () => {
    const wrapper = render(<Icon type="arrow-right" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
