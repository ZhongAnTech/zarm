import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { sleep } from '../../../tests/utils';
import Toast from '../index';

const waitForContentShow = async (content: string) => {
  await waitFor(() => {
    screen.getByText(content);
  });
};

describe('Toast', () => {
  test('string', async () => {
    const { getByText } = render(
      <button
        onClick={() => {
          Toast.show('content');
        }}
      >
        open
      </button>,
    );

    fireEvent.click(getByText('open'));
    await waitForContentShow('content');
    expect(getByText('content')).toBeInTheDocument();
  });

  test('with icon success', async () => {
    const { getByText } = render(
      <button
        onClick={() => {
          Toast.show({ icon: 'success', content: 'success' });
        }}
      >
        open
      </button>,
    );

    fireEvent.click(getByText('open'));
    await waitForContentShow('success');
    expect(getByText('success')).toBeInTheDocument();
  });

  test('with icon fail', async () => {
    const { getByText } = render(
      <button
        onClick={() => {
          Toast.show({ icon: 'fail', content: 'fail' });
        }}
      >
        open
      </button>,
    );

    fireEvent.click(getByText('open'));
    await waitForContentShow('fail');
    expect(getByText('fail')).toBeInTheDocument();
  });

  test('with icon loading', async () => {
    const { getByText } = render(
      <button
        onClick={() => {
          Toast.show({ icon: 'loading', content: 'loading' });
        }}
      >
        open
      </button>,
    );

    fireEvent.click(getByText('open'));
    await waitForContentShow('loading');
    expect(getByText('loading')).toBeInTheDocument();
  });

  test('custom icon', async () => {
    const { getByText } = render(
      <button
        onClick={() => {
          Toast.show({ icon: <div>custom icon</div> });
        }}
      >
        open
      </button>,
    );

    fireEvent.click(getByText('open'));
    await waitForContentShow('custom icon');
    expect(getByText('custom icon')).toBeInTheDocument();
  });

  test('config', async () => {
    Toast.config({ duration: 6000 });
    const { getByText } = render(
      <button
        onClick={() => {
          Toast.show({ icon: 'loading', content: 'loading' });
        }}
      >
        open
      </button>,
    );

    fireEvent.click(getByText('open'));
    await sleep(5000);
    expect(getByText('loading')).toBeInTheDocument();
  });

  test('clear', async () => {
    const { getByText } = render(
      <div>
        <button
          onClick={() => {
            // Toast.show({ icon: 'loading', content: 'loading-clear' });
            Toast.show({ icon: 'success', content: 'success-clear', className: 'clear-test' });
          }}
        >
          open-clear
        </button>
        <button
          onClick={() => {
            // Toast.show({ icon: 'loading', content: 'loading-clear' });
            Toast.clear();
          }}
        >
          clear
        </button>
      </div>,
    );
    fireEvent.click(getByText('open-clear'));
    await waitForContentShow('success-clear');
    fireEvent.click(getByText('clear'));
  });
});
