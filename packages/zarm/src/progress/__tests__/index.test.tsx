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
    const wrapper = render(<Progress percent={10}>foo</Progress>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('circle shape progress', () => {
    it('renders shape is circle correctly', () => {
      const wrapper = render(
        <Progress shape="circle" strokeShape="rect" percent={10}>
          foo
        </Progress>,
      );
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('renders shape is semi-circle correctly', () => {
      const wrapper = render(
        <Progress shape="semi-circle" percent={10}>
          foo
        </Progress>,
      );
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('renders percent correctly', () => {
      const wrapper = mount(
        <Progress shape="circle" percent={10}>
          foo
        </Progress>,
      );
      wrapper.setProps({ percent: 50 });
      expect(wrapper.props().percent).toEqual(50);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('line shape progress', () => {
    it('renders size is lg correctly', () => {
      const wrapper = mount(<Progress shape="line" percent={10} />);
      wrapper.setProps({ size: 'lg' });
      expect(wrapper.props().size).toEqual('lg');
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('renders size is md correctly', () => {
      const wrapper = mount(<Progress shape="line" percent={10} />);
      wrapper.setProps({ size: 'md' });
      expect(wrapper.props().size).toEqual('md');
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('renders size is sm correctly', () => {
      const wrapper = mount(<Progress shape="line" percent={10} />);
      wrapper.setProps({ size: 'sm' });
      expect(wrapper.props().size).toEqual('sm');
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});
