import { fireEvent, render, waitFor } from '@testing-library/react';
import React, { MouseEvent, TouchEvent, useRef, useState } from 'react';
import useScroll from '..';

function TestComponent() {
  const container = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);
  const list = new Array(null).fill(null).map((_, idx) => <div key={`${+idx}`}>第{idx + 1}行</div>);

  useScroll({
    container,
    onScroll: (e: MouseEvent | TouchEvent) => {
      setScrollTop((e.target as HTMLElement).scrollTop);
    },
  });

  return (
    <>
      <div
        ref={container}
        style={{ height: '200px', overflowY: 'auto' }}
        data-testid="scroll-container"
      >
        {list}
      </div>
      <div data-testid="scroll-top-value">{scrollTop}</div>
    </>
  );
}

describe('useScroll', () => {
  test('should update scroll top of the container twice(invoking on leading and trailing edges)', async () => {
    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId('scroll-top-value').textContent).toBe('0');

    fireEvent.scroll(getByTestId('scroll-container'), { target: { scrollTop: 200 } });
    fireEvent.scroll(getByTestId('scroll-container'), { target: { scrollTop: 201 } });
    fireEvent.scroll(getByTestId('scroll-container'), { target: { scrollTop: 202 } });
    // invoking on the leading edge
    expect(getByTestId('scroll-top-value').textContent).toBe('200');

    await waitFor(() => {
      // invoking on the trailing edge
      // waiting 200 milliseconds then invoke the throttled scroll event handler
      expect(getByTestId('scroll-top-value').textContent).toBe('202');
    });
  });

  test('should update scroll top of the container twice(invoking on leading edge twice)', async () => {
    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId('scroll-top-value').textContent).toBe('0');

    // invoking on the leading edge
    fireEvent.scroll(getByTestId('scroll-container'), { target: { scrollTop: 200 } });
    setTimeout(() => {
      // wait for 201 milliseconds, then scroll again. Also invoking on the leading edge
      fireEvent.scroll(getByTestId('scroll-container'), { target: { scrollTop: 201 } });
    }, 201);
    expect(getByTestId('scroll-top-value').textContent).toBe('200');

    await waitFor(() => {
      expect(getByTestId('scroll-top-value').textContent).toBe('201');
    });
  });
});
