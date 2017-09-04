import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Progress from '../index';

describe('Progress', () => {
  it('renders correctly', () => {
    const wrapper = render(<Progress percent={10} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders has children correctly', () => {
    const wrapper = render(<Progress percent={10}>foo</Progress>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders shape is circle correctly', () => {
    const wrapper = render(<Progress shape="circle" percent={10}>foo</Progress>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
