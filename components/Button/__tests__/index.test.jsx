import React from 'react';
import { render, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Button from '../index';

describe('Button', () => {
  it('renders correctly', () => {
    const wrapper = render(<Button>foo</Button>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('theme', () => {
    const wrapper = render(<Button theme="primary">foo</Button>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('block', () => {
    const wrapper = render(<Button block>foo</Button>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('bordered', () => {
    const wrapper = render(<Button bordered>foo</Button>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('size', () => {
    const wrapper = render(<Button size="lg">foo</Button>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('shape is radius', () => {
    const wrapper = render(<Button shape="radius">foo</Button>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('icon', () => {
    const wrapper = render(<Button icon={<img alt="" src="https://zhongantecheng.github.io/zarm/images/state.18e78939.png" />}>foo</Button>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('loading', () => {
    const wrapper = render(<Button loading>foo</Button>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('disabled', () => {
    const wrapper = render(<Button disabled>foo</Button>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('onClick', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<Button onClick={onClick}>foo</Button>);
    wrapper.simulate('click');
    expect(onClick).toBeCalled();
  });
});
