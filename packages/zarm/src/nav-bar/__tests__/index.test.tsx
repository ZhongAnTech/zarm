import React from 'react';
import { render, screen } from '@testing-library/react';
import { ArrowLeft, ArrowRight } from '@zarm-design/icons';
import NavBar from '../index';
import ConfigProvider from '../../config-provider';

describe('NavBar', () => {
  it('should renders correctly', () => {
    const { asFragment } = render(<NavBar />);
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('should renders correctly with title', () => {
    const { asFragment } = render(<NavBar title="这是标题" />);
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('renders correctly with left content', () => {
    const { asFragment } = render(<NavBar left={<ArrowLeft />} />);
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('renders correctly with right content', () => {
    const { asFragment } = render(<NavBar right={<ArrowRight />} />);
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('should render with custom prefix className ', () => {
    render(
      <ConfigProvider prefixCls="custom">
        <NavBar data-testid="navbar" />
      </ConfigProvider>,
    );
    expect(screen.queryByTestId('navbar')).toHaveClass('custom-nav-bar');
  });

  test('should add HTML attributes to root element', () => {
    const { asFragment } = render(<NavBar id="a" />);
    expect(asFragment().firstChild).toHaveAttribute('id', 'a');
  });
});
