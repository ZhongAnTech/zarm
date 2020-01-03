import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Progress from '../index';

describe('Progress', () => {
  it('renders correctly', () => {
    const wrapper = render(<Progress percent={10} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders has children correctly', () => {
    const wrapper = render(<Progress percent={10} weight="thin">foo</Progress>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders shape is circle correctly', () => {
    const wrapper = render(<Progress type="circle" shape="rect" percent={10}>foo</Progress>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders shape is semi-circle correctly', () => {
    const wrapper = render(<Progress type="semi-circle" percent={10}>foo</Progress>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders percent correctly', () => {
    const wrapper = mount(<Progress type="circle" percent={10}>foo</Progress>);
    wrapper.setProps({ percent: 50 });
    expect(wrapper.props().percent).toEqual(50);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('size=lg & type=line & theme=primary as expected', () => {
    const wrapper = render(<Progress type="line" percent={10}>percentText</Progress>);
    wrapper.setProps({ size: 'lg' });
    expect(wrapper.props().size).toEqual('lg');
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
