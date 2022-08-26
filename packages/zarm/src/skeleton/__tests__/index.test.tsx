import * as React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import Skeleton from '../index';

describe('Skeleton', () => {
  afterEach(cleanup);

  it('should render radius shape skeleton', () => {
    render(<Skeleton data-testid="skeleton-root" />);
    expect(screen.getByTestId('skeleton-root')).toBeTruthy();
    expect(screen.getByTestId('skeleton-root').className).toEqual(
      'za-skeleton za-skeleton--radius',
    );
  });

  test.each`
    className            | shape       | expected
    ${'custom-skeleton'} | ${'circle'} | ${'za-skeleton za-skeleton--circle custom-skeleton'}
    ${'custom-skeleton'} | ${'radius'} | ${'za-skeleton za-skeleton--radius custom-skeleton'}
    ${'custom-skeleton'} | ${'rect'}   | ${'za-skeleton za-skeleton--rect custom-skeleton'}
  `(
    'should render with className - $className and shape - $shape',
    ({ className, shape, expected }) => {
      render(<Skeleton data-testid="skeleton-root" className={className} shape={shape} />);
      expect(screen.getByTestId('skeleton-root').className).toEqual(expected);
    },
  );

  test('should render with default props', () => {
    const { container } = render(<Skeleton />);
    expect(container).toMatchSnapshot();
  });
});
