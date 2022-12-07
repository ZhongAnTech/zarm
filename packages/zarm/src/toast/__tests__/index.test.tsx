import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Toast, { ToastHandler } from '../index';

jest.useFakeTimers();

describe('Toast', () => {
  test('should show toast when call static method on Toast component', () => {
    const Demo = () => {
      const ref = React.useRef<ToastHandler>();
      return (
        <>
          <button
            onClick={() => {
              ref.current = Toast.show('toast content');
            }}
          >
            open
          </button>
          <button onClick={() => ref.current?.close()}>close</button>
        </>
      );
    };
    render(<Demo />);
    fireEvent.click(screen.getByRole('button', { name: 'open' }));
    expect(screen.getAllByText('toast content')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'close' }));
    expect(screen.queryAllByText('toast content')).not.toBeInTheDocument();
  });

  test('.show() static method should accepts toast props', () => {
    const Demo = () => {
      const ref = React.useRef<ToastHandler>();
      return (
        <>
          <button
            onClick={() => {
              ref.current = Toast.show({ content: 'toast content' });
            }}
          >
            open
          </button>
          <button onClick={() => ref.current?.close()}>close</button>
        </>
      );
    };
    render(<Demo />);
    fireEvent.click(screen.getByRole('button', { name: 'open' }));
    expect(screen.getAllByText('toast content')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'close' }));
    expect(screen.queryAllByText('toast content')).not.toBeInTheDocument();
  });
});
