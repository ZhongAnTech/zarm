import '@testing-library/jest-dom';
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
});
