import * as React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import Skeleton from '../index';

describe('Skeleton', () => {
  afterEach(cleanup);

  test('should render with default props', () => {
    const { container } = render(<Skeleton />);
    expect(container).toMatchSnapshot();
  });

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

  it('should render animated skeleton', () => {
    render(<Skeleton animated data-testid="skeleton-root" />);
    expect(screen.getByTestId('skeleton-root')).toBeTruthy();
    expect(screen.getByTestId('skeleton-root').className).toEqual(
      'za-skeleton za-skeleton--radius za-skeleton--animated',
    );
  });

  it('should render Skeleton.Title', () => {
    render(<Skeleton.Title data-testid="skeleton-root" />);
    expect(screen.getByTestId('skeleton-root')).toBeTruthy();
    expect(screen.getByTestId('skeleton-root').className).toEqual(
      'za-skeleton za-skeleton--radius za-skeleton__title',
    );
  });

  it('should render rect Skeleton.Title', () => {
    render(<Skeleton.Title shape="rect" data-testid="skeleton-root" />);
    expect(screen.getByTestId('skeleton-root')).toBeTruthy();
    expect(screen.getByTestId('skeleton-root').className).toEqual(
      'za-skeleton za-skeleton--rect za-skeleton__title',
    );
  });

  it('should render animated Skeleton.Title', () => {
    render(<Skeleton.Title animated data-testid="skeleton-root" />);
    expect(screen.getByTestId('skeleton-root')).toBeTruthy();
    expect(screen.getByTestId('skeleton-root').className).toEqual(
      'za-skeleton za-skeleton--radius za-skeleton--animated za-skeleton__title',
    );
  });

  it('should render Skeleton.Paragraph', () => {
    render(<Skeleton.Paragraph lineCount={5} data-testid="skeleton-root" />);
    expect(screen.getByTestId('skeleton-root')).toBeTruthy();
    expect(screen.getByTestId('skeleton-root').className).toEqual('za-skeleton__paragraph');
    expect(screen.getByTestId('skeleton-root').firstElementChild!.className).toEqual(
      'za-skeleton za-skeleton--radius za-skeleton__line',
    );
    expect(screen.getByTestId('skeleton-root').childElementCount).toBe(5);
  });

  it('should render animated Skeleton.Paragraph', () => {
    render(<Skeleton.Paragraph animated data-testid="skeleton-root" />);
    expect(screen.getByTestId('skeleton-root')).toBeTruthy();
    expect(screen.getByTestId('skeleton-root').firstElementChild!.className).toEqual(
      'za-skeleton za-skeleton--radius za-skeleton--animated za-skeleton__line',
    );
  });

  it('should render rect Skeleton.Paragraph', () => {
    render(<Skeleton.Paragraph shape="rect" data-testid="skeleton-root" />);
    expect(screen.getByTestId('skeleton-root')).toBeTruthy();
    expect(screen.getByTestId('skeleton-root').firstElementChild!.className).toEqual(
      'za-skeleton za-skeleton--rect za-skeleton__line',
    );
  });
});
