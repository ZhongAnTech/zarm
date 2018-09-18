import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import NavBar from '../index';
import Icon from '../../icon';

describe('NavBar', () => {
  const props = {};

  it('renders correctly', () => {
    const wrapper = render(
      <NavBar {...props} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly with title', () => {
    props.title = '测试标题';
    const wrapper = render(
      <NavBar {...props} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly with only left prop', () => {
    props.left = true;
    const wrapper = render(
      <NavBar {...props} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly with left content', () => {
    props.left = <Icon type="arrow-left" />;
    const wrapper = render(
      <NavBar {...props} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly with right content', () => {
    props.right = <Icon type="arrow-right" />;
    const wrapper = render(
      <NavBar {...props} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly with multiple right icons', () => {
    props.right = <div><Icon type="arrow-right" /><Icon type="info-round" /></div>;
    const wrapper = render(
      <NavBar {...props} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
