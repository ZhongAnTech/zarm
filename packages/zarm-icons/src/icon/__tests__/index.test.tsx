import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Icon from '../index';
import * as ReactIcon from '../../react';

describe('Icon', () => {
  it('renders all Icons', () => {
    const wrapper = render(
      <>
        {Object.keys(ReactIcon).map((item, index) =>
          React.createElement(ReactIcon[item], { key: +index }),
        )}
      </>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Icons of different theme correctly', () => {
    const wrapper = render(
      <>
        <ReactIcon.ArrowDown />
        <ReactIcon.ArrowDown theme="primary" />
        <ReactIcon.ArrowDown theme="success" />
        <ReactIcon.ArrowDown theme="warning" />
        <ReactIcon.ArrowDown theme="danger" />
      </>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Icons of different size correctly', () => {
    const wrapper = render(
      <>
        <ReactIcon.ArrowDown size="lg" />
        <ReactIcon.ArrowDown />
        <ReactIcon.ArrowDown size="sm" />
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
    const svg = (props) => (
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

    const wrapper = render(<Icon size="lg" theme="primary" component={svg} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Icons of custom classname', () => {
    const wrapper = render(
      <>
        <ReactIcon.ArrowDown />
        <ReactIcon.ArrowDown className="custom-arrow-down" />
      </>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
