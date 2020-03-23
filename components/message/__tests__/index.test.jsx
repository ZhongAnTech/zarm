import React from 'react';
import { render, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Message from '../index';

describe('Message', () => {
  it('renders correctly', () => {
    const wrapper = render(<Message>foo</Message>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('theme', () => {
    const wrapper = render(<Message theme="danger">foo</Message>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('icon', () => {
    const wrapper = render(<Message icon={<img alt="" src="\\static.zhongan.com/website/health/zarm/images/icons/state.png" />}>foo</Message>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('hasArrow', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<Message hasArrow onClick={onClick}>foo</Message>);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.simulate('click');
    expect(onClick).toBeCalled();
  });

  it('closable', () => {
    const wrapper = shallow(<Message closable>foo</Message>);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.find('Icon').simulate('click');
    expect(wrapper.state('visible')).toEqual(false);
  });
});
