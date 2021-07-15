import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import Badge from '../index';
import ConfigProvider from '../../n-config-provider';

describe('Badge', () => {
  afterEach(cleanup);

  it('should render dot shape badge', () => {
    render(<Badge data-testid="badge-root" />);
    expect(screen.getByTestId('badge-root')).toBeTruthy();
    expect(screen.getByTestId('badge-root').className).toEqual(
      'za-badge za-badge--danger za-badge--dot',
    );
  });

  it('should render rect shape badge with text', () => {
    render(<Badge shape="rect" text="免费" data-testid="badge-root" />);
    expect(screen.getByTestId('badge-root')).toBeTruthy();
    expect(screen.getByTestId('badge-root').className).toEqual(
      'za-badge za-badge--danger za-badge--rect',
    );
    expect(screen.getByText('免费')).toBeTruthy();
    expect(screen.getByTestId('badge-root').firstChild!.nodeName.toLowerCase()).toEqual('sup');
    expect(screen.getByText('免费').className).toEqual('za-badge__content');
  });

  it('should render radius shape badge with text', () => {
    render(<Badge shape="radius">foo</Badge>);
    expect(screen.getByText('foo')).toBeTruthy();
    expect(screen.getByText('foo').className).toEqual(
      'za-badge za-badge--danger za-badge--radius za-badge--sup',
    );
  });

  it('should render round shape badge with text', () => {
    render(<Badge shape="round" text="99+" />);
    expect(screen.getByText('99+')).toBeTruthy();
    expect(screen.getByText('99+').className).toEqual('za-badge__content');
    expect(screen.getByText('99+').parentElement!.className).toEqual(
      'za-badge za-badge--danger za-badge--round',
    );
  });

  test.each`
    theme        | className         | shape       | expected
    ${'primary'} | ${'custom-badge'} | ${'dot'}    | ${'za-badge custom-badge za-badge--primary za-badge--dot'}
    ${'success'} | ${'custom-badge'} | ${'round'}  | ${'za-badge custom-badge za-badge--success za-badge--round'}
    ${'warning'} | ${'custom-badge'} | ${'radius'} | ${'za-badge custom-badge za-badge--warning za-badge--radius'}
    ${'danger'}  | ${'custom-badge'} | ${'rect'}   | ${'za-badge custom-badge za-badge--danger za-badge--rect'}
  `(
    'should render with theme - $theme, className - $className and shape - $shape',
    ({ theme, className, shape, expected }) => {
      render(<Badge data-testid="badge-root" theme={theme} className={className} shape={shape} />);
      expect(screen.getByTestId('badge-root').className).toEqual(expected);
    },
  );

  test('should use prefixCls from context', () => {
    render(
      <ConfigProvider prefixCls="zarm">
        <Badge data-testid="badge-root" />
      </ConfigProvider>,
    );
    expect(screen.getByTestId('badge-root').className).toEqual(
      'zarm-badge zarm-badge--danger zarm-badge--dot',
    );
  });

  test('should forward ref from parent', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Badge ref={ref} />);
    expect(ref.current!.nodeName.toLowerCase()).toEqual('span');
  });

  test('should render with default props', () => {
    const { container } = render(<Badge />);
    expect(container).toMatchSnapshot();
  });
});
