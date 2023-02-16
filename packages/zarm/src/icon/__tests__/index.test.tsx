import React from 'react';
import { render } from '@testing-library/react';
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
  it('renders Icons using iconfont', () => {
    const MyIcon = Icon.createFromIconfont('//lf1-cdn-tos.bytegoofy.com/obj/iconpark/svg_20337_14.627ee457cf7594fbbce6d5e14b8c29ef.js');
    const wrapper = render(
      <>
        <MyIcon type="home" />
        <MyIcon type="user" />
      </>,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('renders Icons using svg component', () => {
    const wrapper = render(<Icon size="lg" theme="primary" component={Right} />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
