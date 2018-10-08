import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Badge from '../index.native';

describe('Badge', () => {
  it('renders shape is dot correctly', () => {
    const wrapper = render(<Badge />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders shape is dot correctly', () => {
    const wrapper = render(<Badge shape="dot" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders shape is radius correctly', () => {
    const wrapper = render(<Badge shape="radius" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders shape is round correctly', () => {
    const wrapper = render(<Badge shape="round" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders shape is circle correctly', () => {
    const wrapper = render(<Badge shape="circle" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders shape is rectangle correctly', () => {
    const wrapper = render(<Badge shape="rect" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders shape is leaf correctly', () => {
    const wrapper = render(<Badge shape="leaf" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders dot display in the upper right corner', () => {
    const wrapper = render(<Badge sup shape="dot" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('theme', () => {
    const wrapper = render(<Badge sup theme="primary" shape="dot" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('text ', () => {
    const wrapper = render(<Badge sup text="999+" shape="leaf" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
