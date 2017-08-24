import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Button from '../index';

describe('Button', () => {
  it('renders correctly', () => {
    const wrapper = render(<Button>foo</Button>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
