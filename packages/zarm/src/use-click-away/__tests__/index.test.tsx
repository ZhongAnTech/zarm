import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import useClickAway from '..';

const TestDemo = ({ onClickAway, ...rest }) => {
  const ref = React.createRef<HTMLDivElement>();
  useClickAway(ref, onClickAway);

  return (
    <div {...rest}>
      <div title="child1" ref={ref} />
      <div title="child2" />
    </div>
  );
};

const TestDemo2 = ({ onClickAway, ...rest }) => {
  const ref = React.createRef<HTMLDivElement>();
  const ref1 = React.createRef<HTMLDivElement>();
  useClickAway([ref, ref1], onClickAway);

  return (
    <div {...rest}>
      <div title="child1" ref={ref} />
      <div title="child2" ref={ref1} />
      <div title="child3" />
    </div>
  );
};

const title = 'useClickAway';

describe('useClickAway', () => {
  test('useClickAway with one target', () => {
    const fn = jest.fn();
    render(<TestDemo title={title} onClickAway={fn} />);

    expect(fn).toBeCalledTimes(0);
    // trigger click away once
    fireEvent.click(screen.getByTitle('child2'));
    expect(fn).toBeCalledTimes(1);
    // trigger click away twice
    fireEvent.click(screen.getByTitle('child2'));
    expect(fn).toBeCalledTimes(2);
    // trigger click away three times
    fireEvent.click(screen.getByTitle('child2'));
    expect(fn).toBeCalledTimes(3);
  });

  test('useClickAway with more targets', () => {
    const fn = jest.fn();
    render(<TestDemo2 title={title} onClickAway={fn} />);

    expect(fn).toBeCalledTimes(0);
    // trigger click in targets
    fireEvent.click(screen.getByTitle('child1'));
    expect(fn).toBeCalledTimes(0);
    // trigger click in targets
    fireEvent.click(screen.getByTitle('child2'));
    expect(fn).toBeCalledTimes(0);
    // trigger click away
    fireEvent.click(screen.getByTitle('child3'));
    expect(fn).toBeCalledTimes(1);
    // trigger click away
    fireEvent.click(screen.getByTitle('child3'));
    expect(fn).toBeCalledTimes(2);
  });
});
