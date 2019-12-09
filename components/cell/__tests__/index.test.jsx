import React from 'react';
import { render, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Cell from '../index';

describe('Cell', () => {
  it('renders correctly', () => {
    const wrapper = render(<Cell title="标题文字" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('description', () => {
    const wrapper = render(<Cell title="标题文字" description="描述文字" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('icon', () => {
    const wrapper = render(<Cell title="标题文字" description="描述文字" icon={<img alt="" src="\\static.zhongan.com/website/health/zarm/images/icons/state.png" />} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('children', () => {
    const wrapper = render(<Cell>this is children!</Cell>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('help', () => {
    const wrapper = render(<Cell title="标题文字" description="描述文字" help={<span>message</span>} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('onClick', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<Cell hasArrow title="标题文字" description="描述文字" onClick={onClick} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.simulate('click');
    expect(onClick).toBeCalled();
  });
});
