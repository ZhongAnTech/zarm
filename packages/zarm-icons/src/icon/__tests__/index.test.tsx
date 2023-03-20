import { render } from '@testing-library/react';
import React from 'react';
import * as ReactIcon from '../../react';
import Icon from '../index';

describe('Icon', () => {
  it('renders all Icons', () => {
    const wrapper = render(
      <>
        {Object.keys(ReactIcon).map((item, index) =>
          React.createElement(ReactIcon[item], { key: +index }),
        )}
      </>,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
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
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('renders Icons of different size correctly', () => {
    const wrapper = render(
      <>
        <ReactIcon.ArrowDown size="lg" />
        <ReactIcon.ArrowDown />
        <ReactIcon.ArrowDown size="sm" />
      </>,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('renders Icons using iconfont', () => {
    const MyIcon = Icon.createFromIconfont(
      '//lf1-cdn-tos.bytegoofy.com/obj/iconpark/svg_20337_14.627ee457cf7594fbbce6d5e14b8c29ef.js',
    );
    const wrapper = render(
      <>
        <MyIcon type="home" />
        <MyIcon type="user" />
      </>,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
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
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('renders Icons of custom classname', () => {
    const wrapper = render(
      <>
        <ReactIcon.ArrowDown />
        <ReactIcon.ArrowDown className="custom-arrow-down" />
      </>,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
