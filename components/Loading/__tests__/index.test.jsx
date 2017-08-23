import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Loading from '../index';

describe('Confirm', () => {
  it('renders correctly', () => {
    const wrapper = render(<Loading visible />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
