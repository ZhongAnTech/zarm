import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Badge from '../index';

describe('Badge', () => {
  it('renders shape is dot correctly', () => {
    const wrapper = render(<Badge shape="dot" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('theme', () => {
    const wrapper = render(<Badge theme="warning" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('sup', () => {
    const wrapper = render(<Badge>foo</Badge>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('text', () => {
    const wrapper = render(<Badge shape="rect" text="99+" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
