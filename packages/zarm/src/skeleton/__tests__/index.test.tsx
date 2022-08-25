import * as React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import skeleton from '../index';

describe('skeleton', () => {
  it('renders correctly', () => {
    const wrapper = render(<skeleton />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
