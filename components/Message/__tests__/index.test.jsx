import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Message from '../index';

describe('Message', () => {
  it('renders correctly', () => {
    const wrapper = render(<Message>foo</Message>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
