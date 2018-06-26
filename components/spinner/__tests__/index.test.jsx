import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Spinner from '../index';

describe('Spinner', () => {
  it('renders correctly', () => {
    const wrapper = render(<Spinner />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
