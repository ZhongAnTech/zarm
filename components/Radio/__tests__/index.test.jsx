import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Radio from '../index';

describe('Radio', () => {
  it('renders correctly', () => {
    const wrapper = render(<Radio checked>foo</Radio>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
