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

  it('ghost', () => {
    const wrapper = render(<Button ghost>foo</Button>);
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
    const wrapper = render(
      <Button icon={<img alt="" src="https://zarm.design/images/logo.ce68565d.svg" />}>foo</Button>,
    );
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

  it('htmlType', () => {
    const wrapper = render(<Button htmlType="submit">foo</Button>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('onClick', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<Button onClick={onClick}>foo</Button>);
    wrapper.simulate('click');
    expect(onClick).toBeCalled();
  });

  it('onClick when disabled', () => {
    const onClick = jest.fn();
    const wrapper = shallow(
      <Button disabled onClick={onClick}>
        foo
      </Button>,
    );
    wrapper.simulate('click');
    expect(onClick).not.toBeCalled();
  });

  it('onTouchStart in NativeButton', () => {
    const wrapper = shallow(<Button>foo</Button>);
    wrapper.simulate('touchstart');
  });

  it('onTouchStart in AnchorButton', () => {
    const wrapper = shallow(<Button href="https://zarm.design">foo</Button>);
    wrapper.simulate('touchstart');
  });

  it('href and target', () => {
    const wrapper = render(
      <Button href="https://zarm.design" target="_blank">
        foo
      </Button>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
