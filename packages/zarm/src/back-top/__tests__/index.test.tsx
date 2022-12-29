import { fireEvent, render } from '@testing-library/react';
import * as React from 'react';
import { sleep } from '../../../tests/utils';
import BackTop from '../BackTop';

describe('BackTop', () => {
  it('renders correctly', () => {
    const wrapper = render(<BackTop />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('should scroll to top after click it', async () => {
    const mockFn = jest.fn();
    render(<BackTop mountContainer={document.body} onClick={mockFn} />);
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation((_, y) => {
      window.scrollY = y;
      window.pageYOffset = y;
      document.documentElement.scrollTop = y;
    });
    // jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => setTimeout(cb, 0));
    window.scrollTo(0, 500);

    fireEvent.scroll(window, { target: { y: 500 } });
    sleep(5000);
    fireEvent.click(document.body.querySelector('.za-back-top')!);
    expect(mockFn).toBeCalled();
    scrollToSpy.mockRestore();
  });
});
