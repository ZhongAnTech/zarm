import React from 'react';
import { fireEvent, render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Toast from '../index';

jest.useFakeTimers();

describe('Toast', () => {
  test('should renders correctly', () => {
    const { asFragment, rerender } = render(<Toast visible content="foo" />);
    expect(asFragment().firstChild).toMatchSnapshot();
    rerender(<Toast visible={false} content="foo" />);
  });

  test('should show toast when call static method on Toast component', () => {
    const Demo = () => {
      const toast = Toast.useToast();
      return (
        <>
          <button onClick={() => toast.show('toast content')}>open</button>
          <button onClick={() => toast.hide()}>close</button>
        </>
      );
    };
    render(<Demo />);
    fireEvent.click(screen.getByRole('button', { name: 'open' }));
    expect(screen.getByText('toast content')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'close' }));
    expect(screen.queryByText('toast content')).not.toBeInTheDocument();
  });

  test('.show() static method should accepts toast props', () => {
    const Demo = () => {
      const toast = Toast.useToast();
      return (
        <>
          <button onClick={() => toast.show({ content: 'toast content' })}>open</button>
          <button onClick={() => toast.hide()}>close</button>
        </>
      );
    };
    render(<Demo />);
    fireEvent.click(screen.getByRole('button', { name: 'open' }));
    expect(screen.getByText('toast content')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'close' }));
    expect(screen.queryByText('toast content')).not.toBeInTheDocument();
  });

  test.skip('should close the Toast after 3 seconds by default', () => {
    render(<Toast visible content="foo" />);
    expect(screen.getByText('foo')).toBeInTheDocument();
    jest.advanceTimersByTime(2_000);
    expect(screen.getByText('foo')).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(1_000);
    });
    expect(screen.queryByText('foo')).not.toBeInTheDocument();
  });
});
