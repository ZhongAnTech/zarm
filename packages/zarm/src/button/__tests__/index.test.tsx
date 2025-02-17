import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Button from '../index';

describe('Button', () => {
  it('renders correctly', () => {
    const wrapper = render(<Button>foo</Button>);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('theme', () => {
    const wrapper = render(<Button theme="primary">foo</Button>);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('block', () => {
    const wrapper = render(<Button block>foo</Button>);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('ghost', () => {
    const wrapper = render(<Button ghost>foo</Button>);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('size', () => {
    const wrapper = render(<Button size="lg">foo</Button>);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('shape is radius', () => {
    const wrapper = render(<Button shape="radius">foo</Button>);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('icon', () => {
    const wrapper = render(
      <Button icon={<img alt="" src="https://zarm.design/images/logo.ce68565d.svg" />}>foo</Button>,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('loading', () => {
    const wrapper = render(<Button loading>foo</Button>);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('disabled', () => {
    const wrapper = render(<Button disabled>foo</Button>);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('htmlType', () => {
    const wrapper = render(<Button htmlType="submit">foo</Button>);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('onClick', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>button click</Button>);
    const btn = screen.getByText('button click');
    fireEvent.click(btn);
    expect(onClick).toBeCalled();
  });

  it('onClick when disabled', () => {
    const onClick = jest.fn();
    render(
      <div data-testid="za-btn">
        <Button disabled onClick={onClick}>
          button disable
        </Button>
      </div>,
    );
    const btn = screen.getByText('button disable');
    fireEvent.click(btn);
    expect(onClick).not.toBeCalled();
  });

  it('href and target', () => {
    const wrapper = render(
      <Button href="https://zarm.design" target="_blank">
        foo
      </Button>,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
