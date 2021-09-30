import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Icon from '../index';

const Right = (props) => (
  <svg
    viewBox="0 0 32 24"
    fill="currentColor"
    stroke="currentColor"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      d="M1 12.376l8.8 9.114L30.431 1.568"
      stroke="currentColor"
      strokeWidth={2.6}
      fill="none"
    />
  </svg>
);

describe('Icon', () => {
  it('renders all Icons', () => {
    const wrapper = render(
      <>
        <Icon theme="primary" type="add" />
        <Icon theme="primary" type="arrow-left" />
        <Icon theme="primary" type="arrow-bottom" />
        <Icon theme="primary" type="arrow-right" />
        <Icon theme="primary" type="broadcast" />
        <Icon theme="primary" type="date" />
        <Icon theme="primary" type="deletekey" />
        <Icon theme="primary" type="info-round" />
        <Icon theme="primary" type="info-round-fill" />
        <Icon theme="primary" type="keyboard" />
        <Icon theme="primary" type="minus" />
        <Icon theme="primary" type="question-round" />
        <Icon theme="primary" type="required" />
        <Icon theme="primary" type="right-round-fill" />
        <Icon theme="primary" type="right-round" />
        <Icon theme="primary" type="right" />
        <Icon theme="primary" type="search" />
        <Icon theme="primary" type="time-circle" />
        <Icon theme="primary" type="warning-round-fill" />
        <Icon theme="primary" type="wrong-round-fill" />
        <Icon theme="primary" type="wrong-round" />
        <Icon theme="primary" type="wrong" />
      </>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Icons of different theme correctly', () => {
    const wrapper = render(
      <>
        <Icon theme="primary" type="right" />
        <Icon theme="success" type="add" />
        <Icon theme="warning" type="info-round" />
        <Icon theme="danger" type="wrong-round-fill" />
      </>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Icons of different size correctly', () => {
    const wrapper = render(
      <>
        <Icon size="lg" theme="primary" type="broadcast" />
        <Icon size="md" theme="primary" type="broadcast" />
        <Icon size="sm" theme="primary" type="broadcast" />
      </>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Icons using iconfont', () => {
    const MyIcon = Icon.createFromIconfont('//at.alicdn.com/t/font_1340918_mk657pke2hj.js');
    const wrapper = render(
      <>
        <MyIcon type="home" />
        <MyIcon type="user" />
      </>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Icons using svg component', () => {
    const wrapper = render(<Icon size="lg" theme="primary" component={Right} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
