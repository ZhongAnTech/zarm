import React, { useRef, useState } from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import useScroll from '..';

function TestComponent() {
  const container = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);
  const list = new Array(null).fill(null).map((_, idx) => <div key={`${+idx}`}>第{idx + 1}行</div>);

  useScroll({
    container,
    onScroll: (e: Event) => {
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
  test('test the scroll event and debounced ', async () => {
    const { getByTestId } = render(<TestComponent />);

    expect(getByTestId('scroll-top-value').textContent).toBe('0');

    fireEvent.scroll(getByTestId('scroll-container'), { target: { scrollTop: 200 } });

    expect(getByTestId('scroll-top-value').textContent).toBe('0');

    await waitFor(() => {
      expect(getByTestId('scroll-top-value').textContent).toBe('200');
    });
  });
});
